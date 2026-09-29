// node --test prices-fallback.test.mjs
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { getPrices, _resetCache, CACHE_MS } from "./prices-fallback.mjs";

const SYMS = ["XRP", "ETH", "BTC"];
const ok = (body) => ({ ok: true, status: 200, json: async () => body });
const fail = (status = 403) => ({ ok: false, status, json: async () => ({}) });
const gecko = { ripple: { usd: 1.5, usd_24h_change: 2.1 }, ethereum: { usd: 2700, usd_24h_change: -1.2 }, bitcoin: { usd: 83000, usd_24h_change: 0.4 } };
const coincap = { data: [{ id: "xrp", priceUsd: "1.49", changePercent24Hr: "1.9" }, { id: "ethereum", priceUsd: "2690.5", changePercent24Hr: "-1.0" }, { id: "bitcoin", priceUsd: "82950", changePercent24Hr: "0.3" }] };
const kraken = { error: [], result: { XXRPZUSD: { c: ["1.50", "1"], o: "1.45" }, XETHZUSD: { c: ["2692.2", "1"], o: "2687.48" }, XXBTZUSD: { c: ["83619.1", "1"], o: "83462.7" } } };

function mock(plan) {
  const calls = [];
  const f = async (url) => {
    const host = new URL(url).hostname; calls.push(host);
    const r = plan[host]; if (r instanceof Error) throw r; return r;
  };
  f.calls = calls; return f;
}
const assertNumbers = (prices) => { for (const [s, p] of Object.entries(prices)) { assert.ok(Number.isFinite(p.usd) && p.usd > 0, `${s} usd`); assert.ok(Number.isFinite(p.change24h), `${s} change`); } };

beforeEach(() => _resetCache());

test("CoinGecko OK → CoinGecko used", async () => {
  const f = mock({ "api.coingecko.com": ok(gecko) });
  const r = await getPrices(SYMS, { fetchImpl: f });
  assert.equal(r.source, "coingecko"); assert.equal(r.unavailable, false); assert.equal(r.prices.ETH.usd, 2700); assertNumbers(r.prices);
  assert.deepEqual(f.calls, ["api.coingecko.com"]);
});

test("CoinGecko fails (403) → CoinCap used", async () => {
  const f = mock({ "api.coingecko.com": fail(403), "api.coincap.io": ok(coincap) });
  const r = await getPrices(SYMS, { fetchImpl: f });
  assert.equal(r.source, "coincap"); assert.equal(r.prices.XRP.usd, 1.49); assertNumbers(r.prices);
});

test("CoinGecko + CoinCap fail → Kraken used (change since UTC open)", async () => {
  const f = mock({ "api.coingecko.com": new Error("network"), "api.coincap.io": fail(404), "api.kraken.com": ok(kraken) });
  const r = await getPrices(SYMS, { fetchImpl: f });
  assert.equal(r.source, "kraken"); assert.equal(r.prices.BTC.usd, 83619.1);
  assert.ok(Math.abs(r.prices.XRP.change24h - ((1.5 - 1.45) / 1.45) * 100) < 1e-9); assertNumbers(r.prices);
});

test("empty/garbage body counts as failure → next source", async () => {
  const f = mock({ "api.coingecko.com": ok({}), "api.coincap.io": ok({ data: [{ id: "xrp", priceUsd: "not-a-number" }] }), "api.kraken.com": ok(kraken) });
  const r = await getPrices(SYMS, { fetchImpl: f });
  assert.equal(r.source, "kraken");
});

test("all sources fail → unavailable, no values", async () => {
  const f = mock({ "api.coingecko.com": fail(403), "api.coincap.io": fail(500), "api.kraken.com": ok({ error: ["EService:Unavailable"], result: {} }) });
  const r = await getPrices(SYMS, { fetchImpl: f });
  assert.equal(r.unavailable, true); assert.equal(r.source, null); assert.deepEqual(r.prices, {});
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
  const bad = mock({ "api.coingecko.com": fail(), "api.coincap.io": fail(), "api.kraken.com": fail() });
  assert.equal((await getPrices(SYMS, { fetchImpl: bad, now: 5 })).unavailable, true);
  const good = mock({ "api.coingecko.com": ok(gecko) });
  assert.equal((await getPrices(SYMS, { fetchImpl: good, now: 6 })).source, "coingecko");
});
