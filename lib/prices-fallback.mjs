/**
 * Crypto price fetch with a source fallback chain: CoinGecko → CoinCap → Kraken.
 * Shared by encrypthealth.io (/api/prices), futuresystemslab.io and the evidence site.
 *
 * A source counts as failed on a non-2xx status, unparseable JSON, a thrown network
 * error, or zero usable prices. If every source fails the result is
 * { unavailable: true, prices: {} } — callers show "prices unavailable", never
 * placeholder values. Successful results are cached for 60 seconds per process/page.
 *
 * Kraken reports no 24h change; its change is computed from today's opening price
 * (00:00 UTC), so it is "change since UTC open".
 */

export const CACHE_MS = 60_000;

// sym → per-source identifiers. Coins a source does not list are simply absent from its result.
export const COIN_IDS = {
  XRP:  { gecko: "ripple",            coincap: "xrp",               kraken: ["XRPUSD", "XXRPZUSD"] },
  XLM:  { gecko: "stellar",           coincap: "stellar",           kraken: ["XLMUSD", "XXLMZUSD"] },
  HBAR: { gecko: "hedera-hashgraph",  coincap: "hedera-hashgraph",  kraken: ["HBARUSD", "HBARUSD"] },
  ALGO: { gecko: "algorand",          coincap: "algorand",          kraken: ["ALGOUSD", "ALGOUSD"] },
  ADA:  { gecko: "cardano",           coincap: "cardano",           kraken: ["ADAUSD", "ADAUSD"] },
  ETH:  { gecko: "ethereum",          coincap: "ethereum",          kraken: ["ETHUSD", "XETHZUSD"] },
  BTC:  { gecko: "bitcoin",           coincap: "bitcoin",           kraken: ["XBTUSD", "XXBTZUSD"] },
  HNT:  { gecko: "helium",            coincap: "helium",            kraken: ["HNTUSD", "HNTUSD"] },
  XDC:  { gecko: "xdce-crowd-sale",   coincap: "xinfin-network",    kraken: null },
  QNT:  { gecko: "quant-network",     coincap: "quant",             kraken: null },
  IOTA: { gecko: "iota",              coincap: "iota",              kraken: null },
};

const num = (v) => { const n = typeof v === "string" ? parseFloat(v) : v; return Number.isFinite(n) ? n : null; };

async function getJson(fetchImpl, url, timeoutMs) {
  const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const t = ctrl ? setTimeout(() => ctrl.abort(), timeoutMs) : null;
  try {
    const res = await fetchImpl(url, { headers: { Accept: "application/json" }, signal: ctrl ? ctrl.signal : undefined });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally { if (t) clearTimeout(t); }
}

export const SOURCES = [
  {
    name: "coingecko",
    async fetch(syms, fetchImpl, timeoutMs) {
      const ids = syms.map((s) => COIN_IDS[s]?.gecko).filter(Boolean);
      const d = await getJson(fetchImpl, `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(",")}&vs_currencies=usd&include_24hr_change=true`, timeoutMs);
      const out = {};
      for (const s of syms) {
        const r = d?.[COIN_IDS[s]?.gecko]; const usd = num(r?.usd);
        if (usd !== null && usd > 0) out[s] = { usd, change24h: num(r.usd_24h_change) ?? 0 };
      }
      return out;
    },
  },
  {
    name: "coincap",
    async fetch(syms, fetchImpl, timeoutMs) {
      const ids = syms.map((s) => COIN_IDS[s]?.coincap).filter(Boolean);
      const d = await getJson(fetchImpl, `https://api.coincap.io/v2/assets?ids=${ids.join(",")}`, timeoutMs);
      const byId = Object.fromEntries((d?.data || []).map((a) => [a.id, a]));
      const out = {};
      for (const s of syms) {
        const a = byId[COIN_IDS[s]?.coincap]; const usd = num(a?.priceUsd);
        if (usd !== null && usd > 0) out[s] = { usd, change24h: num(a.changePercent24Hr) ?? 0 };
      }
      return out;
    },
  },
  {
    name: "kraken",
    async fetch(syms, fetchImpl, timeoutMs) {
      const listed = syms.filter((s) => COIN_IDS[s]?.kraken);
      if (!listed.length) return {};
      const d = await getJson(fetchImpl, `https://api.kraken.com/0/public/Ticker?pair=${listed.map((s) => COIN_IDS[s].kraken[0]).join(",")}`, timeoutMs);
      if (d?.error?.length) throw new Error(d.error.join(";"));
      const out = {};
      for (const s of listed) {
        const [req, key] = COIN_IDS[s].kraken; const r = d?.result?.[key] || d?.result?.[req];
        const last = num(r?.c?.[0]); const open = num(r?.o);
        if (last !== null && last > 0) out[s] = { usd: last, change24h: open ? ((last - open) / open) * 100 : 0 };
      }
      return out;
    },
  },
];

let cache = { key: "", ts: 0, value: null };

/**
 * @param {string[]} syms e.g. ["XRP","ETH"]
 * @param {{fetchImpl?: typeof fetch, now?: number, timeoutMs?: number, sources?: typeof SOURCES}} [opts]
 * @returns {Promise<{source: string|null, prices: Record<string,{usd:number,change24h:number}>, unavailable: boolean, fetchedAt: number}>}
 */
export async function getPrices(syms, opts = {}) {
  const fetchImpl = opts.fetchImpl || fetch;
  const now = opts.now ?? Date.now();
  const key = syms.join(",");
  if (cache.value && cache.key === key && now - cache.ts < CACHE_MS) return cache.value;
  for (const src of opts.sources || SOURCES) {
    try {
      const prices = await src.fetch(syms, fetchImpl, opts.timeoutMs ?? 8000);
      if (Object.keys(prices).length > 0) {
        const value = { source: src.name, prices, unavailable: false, fetchedAt: now };
        cache = { key, ts: now, value };
        return value;
      }
    } catch { /* fall through to the next source */ }
  }
  return { source: null, prices: {}, unavailable: true, fetchedAt: now };
}

export function _resetCache() { cache = { key: "", ts: 0, value: null }; }
