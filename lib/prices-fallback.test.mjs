// node --test prices-fallback.test.mjs
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { getPrices, _resetCache, CACHE_MS, CHANGE_WINDOW, GECKO_URL, fmtChange, fmtPrice, tickerItem } from "./prices-fallback.mjs";

const SYMS = ["XRP", "ETH", "BTC"];
const ok = (body) => ({ ok: true, status: 200, json: async () => body });
const fail = (status = 403) => ({ ok: false, status, json: async () => ({}) });
const gecko = { ripple: { usd: 1.5, usd_24h_change: 2.1 }, ethereum: { usd: 2700, usd_24h_change: -1.2 }, bitcoin: { usd: 83000, usd_24h_change: 0.4 } };
// Kraken "o" is today's 00:00 UTC open, NOT a 24h-ago price; the module must never turn it into a change.
const kraken = { error: [], result: { XXRPZUSD: { c: ["1.50", "1"], o: "1.45" }, XETHZUSD: { c: ["2692.2", "1"], o: "2687.48" }, XXBTZUSD: { c: ["83619.1", "1"], o: "83462.7" } } };

function mock(plan) {
  const calls = [];
  const f = async (url) => {
    const host = new URL(url).hostname; calls.push(host);
    const r = plan[host]; if (r === undefined) throw new Error("unexpected host " + host);
    if (r instanceof Error) throw r; return r;
  };
  f.calls = calls; return f;
}

beforeEach(() => _resetCache());

test("every bar requests the same canonical CoinGecko URL, whatever coins it shows", async () => {
  const urls = [];
  const f = async (url) => { urls.push(url); return ok(gecko); };
  await getPrices(["XRP"], { fetchImpl: f }); _resetCache(); await getPrices(["BTC", "XDC", "QNT"], { fetchImpl: f });
  assert.equal(urls.length, 2); assert.equal(urls[0], urls[1]); assert.equal(urls[0], GECKO_URL);
  assert.match(GECKO_URL, /ids=ripple,stellar,hedera-hashgraph,algorand,cardano,ethereum,bitcoin,helium,xdce-crowd-sale,quant-network,iota&vs_currencies=usd&include_24hr_change=true$/);
});

test("CoinGecko OK → price and rolling 24h change from CoinGecko; Kraken not called", async () => {
  const f = mock({ "api.coingecko.com": ok(gecko) });
  const r = await getPrices(SYMS, { fetchImpl: f });
  assert.equal(r.unavailable, false); assert.equal(r.window, "24h");
  assert.deepEqual(r.prices.XRP, { usd: 1.5, change24h: 2.1, priceSource: "coingecko" });
  assert.deepEqual(r.prices.ETH, { usd: 2700, change24h: -1.2, priceSource: "coingecko" });
  assert.deepEqual(f.calls, ["api.coingecko.com"]);
});

test("Kraken up, CoinGecko down → Kraken price, change null (never the UTC-open change, never 0)", async () => {
  for (const g of [fail(429), new Error("network"), ok({})]) {
    _resetCache();
    const f = mock({ "api.coingecko.com": g, "api.kraken.com": ok(kraken) });
    const r = await getPrices(SYMS, { fetchImpl: f });
    assert.equal(r.unavailable, false);
    assert.deepEqual(r.prices.XRP, { usd: 1.5, change24h: null, priceSource: "kraken" });
    assert.equal(r.prices.BTC.usd, 83619.1); assert.equal(r.prices.BTC.change24h, null);
    assert.deepEqual(tickerItem("XRP", r.prices.XRP), { sym: "XRP", price: "$1.50", change: "—", tone: "none", window: "24h" });
  }
});

test("both down → unavailable; every coin renders '—' price and '—' change", async () => {
  const f = mock({ "api.coingecko.com": fail(500), "api.kraken.com": fail(503) });
  const r = await getPrices(SYMS, { fetchImpl: f });
  assert.equal(r.unavailable, true);
  for (const s of SYMS) {
    assert.deepEqual(r.prices[s], { usd: null, change24h: null, priceSource: null });
    assert.deepEqual(tickerItem(s, r.prices[s]), { sym: s, price: "—", change: "—", tone: "none", window: "24h" });
  }
  assert.deepEqual(f.calls, ["api.coingecko.com", "api.kraken.com"]);
});

test("missing change (absent, null, NaN, string garbage) → null → '—' neutral, never 0.00%", async () => {
  const g = { ripple: { usd: 1.5 }, ethereum: { usd: 2700, usd_24h_change: null }, bitcoin: { usd: 83000, usd_24h_change: "n/a" } };
  const r = await getPrices(SYMS, { fetchImpl: mock({ "api.coingecko.com": ok(g) }) });
  for (const s of SYMS) {
    assert.equal(r.prices[s].change24h, null, s);
    const t = tickerItem(s, r.prices[s]);
    assert.equal(t.change, "—"); assert.equal(t.tone, "none"); assert.notEqual(t.change, "0.00%");
  }
});

test("coins only one source lists: XDC/QNT/IOTA from CoinGecko only; a CoinGecko gap falls back to Kraken per coin", async () => {
  const syms = ["XRP", "XDC", "QNT", "HNT"];
  const g = { ripple: { usd: 1.37, usd_24h_change: 0.48 }, "xdce-crowd-sale": { usd: 0.0342, usd_24h_change: -1.72 }, "quant-network": { usd: 221.08, usd_24h_change: -3.38 } };
  const k = { error: [], result: { HNTUSD: { c: ["2.10", "1"], o: "2.00" } } };
  const f = mock({ "api.coingecko.com": ok(g), "api.kraken.com": ok(k) });
  const r = await getPrices(syms, { fetchImpl: f });
  assert.equal(r.prices.XDC.change24h, -1.72); assert.equal(r.prices.QNT.priceSource, "coingecko");
  assert.deepEqual(r.prices.HNT, { usd: 2.1, change24h: null, priceSource: "kraken" });
  assert.deepEqual(f.calls, ["api.coingecko.com", "api.kraken.com"]);
  // CoinGecko down: Kraken does not list XDC/QNT → "—"; HNT/XRP priced by Kraken without change.
  _resetCache();
  const k2 = { error: [], result: { XXRPZUSD: { c: ["1.36", "1"], o: "1.34" }, HNTUSD: { c: ["2.10", "1"], o: "2.00" } } };
  const r2 = await getPrices(syms, { fetchImpl: mock({ "api.coingecko.com": fail(503), "api.kraken.com": ok(k2) }) });
  assert.deepEqual(tickerItem("XDC", r2.prices.XDC), { sym: "XDC", price: "—", change: "—", tone: "none", window: "24h" });
  assert.equal(r2.prices.QNT.usd, null); assert.equal(r2.prices.XRP.usd, 1.36); assert.equal(r2.prices.XRP.change24h, null);
});

test("Kraken error payload / garbage price for a gap coin → that coin '—', others unaffected", async () => {
  const g = { ripple: { usd: 1.5, usd_24h_change: 2.1 } };
  for (const k of [ok({ error: ["EService:Unavailable"], result: {} }), new Error("network"), ok({ error: [], result: { XETHZUSD: { c: ["nope"] } } })]) {
    _resetCache();
    const r = await getPrices(["XRP", "ETH"], { fetchImpl: mock({ "api.coingecko.com": ok(g), "api.kraken.com": k }) });
    assert.equal(r.prices.XRP.change24h, 2.1); assert.equal(r.prices.ETH.usd, null); assert.equal(tickerItem("ETH", r.prices.ETH).price, "—");
  }
});

test("formatting: one window label, sign → tone, real zero stays a real zero", () => {
  assert.equal(CHANGE_WINDOW, "24h");
  assert.deepEqual(fmtChange(2.234), { text: "▲ 2.23%", tone: "up" });
  assert.deepEqual(fmtChange(-0.4749), { text: "▼ 0.47%", tone: "down" });
  assert.deepEqual(fmtChange(0), { text: "0.00%", tone: "flat" });
  assert.deepEqual(fmtChange(0.004), { text: "0.00%", tone: "flat" });
  assert.deepEqual(fmtChange(undefined), { text: "—", tone: "none" });
  assert.equal(fmtPrice(83129.4), "$83,129"); assert.equal(fmtPrice(1.369), "$1.37"); assert.equal(fmtPrice(0.19212), "$0.1921");
  assert.equal(fmtPrice(null), "—"); assert.equal(fmtPrice(0), "—");
});

test("60s cache: second call within 60s makes no requests; after 60s refetches", async () => {
  const f = mock({ "api.coingecko.com": ok(gecko) });
  await getPrices(SYMS, { fetchImpl: f, now: 1_000_000 });
  await getPrices(SYMS, { fetchImpl: f, now: 1_000_000 + CACHE_MS - 1 });
  assert.equal(f.calls.length, 1);
  await getPrices(SYMS, { fetchImpl: f, now: 1_000_000 + CACHE_MS + 1 });
  assert.equal(f.calls.length, 2);
});

test("unavailable results are not cached", async () => {
  const bad = mock({ "api.coingecko.com": fail(), "api.kraken.com": fail() });
  assert.equal((await getPrices(SYMS, { fetchImpl: bad, now: 5 })).unavailable, true);
  const good = mock({ "api.coingecko.com": ok(gecko) });
  assert.equal((await getPrices(SYMS, { fetchImpl: good, now: 6 })).prices.XRP.change24h, 2.1);
});
