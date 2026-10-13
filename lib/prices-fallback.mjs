/**
 * FSL live ticker prices. One module, byte-identical in every FSL ticker bar:
 * evidence.futuresystemslab.io (/js/prices-fallback.mjs), futuresystemslab.io (fsl-web lib/prices-fallback.mjs)
 * and console.futuresystemslab.io (/js/prices-fallback.mjs).
 *
 * Rule: the change shown is the ROLLING 24-HOUR change, labeled "24h", one window for every coin.
 *  - Change: CoinGecko usd_24h_change only (a rolling 24h window for every coin it lists).
 *  - Price:  CoinGecko; Kraken's last trade only for a coin CoinGecko returned no price for (CoinGecko down,
 *            or the coin missing from its answer). Kraken has no rolling-24h field (its "o" is today's 00:00 UTC
 *            open), so a Kraken-priced coin has change null.
 *  - Missing: a missing change is null and renders "—" in a neutral color, never 0. A missing price is null and
 *            renders "—". If no coin has a price the result is { unavailable: true } and every coin renders "—".
 * Successful results are cached for 60 seconds per page/process; bars refresh every 60 seconds.
 */

export const CACHE_MS = 60_000;
export const REFRESH_MS = 60_000;
export const CHANGE_WINDOW = "24h";

// sym → per-source identifiers. kraken: [request pair, result key]; null = Kraken does not list it.
export const COIN_IDS = {
  XRP:  { gecko: "ripple",            kraken: ["XRPUSD", "XXRPZUSD"] },
  XLM:  { gecko: "stellar",           kraken: ["XLMUSD", "XXLMZUSD"] },
  HBAR: { gecko: "hedera-hashgraph",  kraken: ["HBARUSD", "HBARUSD"] },
  ALGO: { gecko: "algorand",          kraken: ["ALGOUSD", "ALGOUSD"] },
  ADA:  { gecko: "cardano",           kraken: ["ADAUSD", "ADAUSD"] },
  ETH:  { gecko: "ethereum",          kraken: ["ETHUSD", "XETHZUSD"] },
  BTC:  { gecko: "bitcoin",           kraken: ["XBTUSD", "XXBTZUSD"] },
  HNT:  { gecko: "helium",            kraken: ["HNTUSD", "HNTUSD"] },
  XDC:  { gecko: "xdce-crowd-sale",   kraken: null },
  QNT:  { gecko: "quant-network",     kraken: null },
  IOTA: { gecko: "iota",              kraken: null },
};

export const GECKO_URL = `https://api.coingecko.com/api/v3/simple/price?ids=${Object.values(COIN_IDS).map((c) => c.gecko).join(",")}&vs_currencies=usd&include_24hr_change=true`;

const num = (v) => { const n = typeof v === "string" ? parseFloat(v) : v; return typeof n === "number" && Number.isFinite(n) ? n : null; };

async function getJson(fetchImpl, url, timeoutMs) {
  const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const t = ctrl ? setTimeout(() => ctrl.abort(), timeoutMs) : null;
  try {
    const res = await fetchImpl(url, { headers: { Accept: "application/json" }, signal: ctrl ? ctrl.signal : undefined });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally { if (t) clearTimeout(t); }
}

/** CoinGecko: price + rolling 24h change. Returns { SYM: { usd, change24h } } for coins with a price. */
export async function fromCoinGecko(syms, fetchImpl, timeoutMs) {
  if (!syms.some((s) => COIN_IDS[s]?.gecko)) return {};
  // One canonical URL (every COIN_IDS coin, fixed order) on every bar, so all bars read the same CoinGecko snapshot.
  const d = await getJson(fetchImpl, GECKO_URL, timeoutMs);
  const out = {};
  for (const s of syms) {
    const r = d?.[COIN_IDS[s]?.gecko]; const usd = num(r?.usd);
    if (usd !== null && usd > 0) out[s] = { usd, change24h: num(r?.usd_24h_change) };
  }
  return out;
}

/** Kraken: last trade price only (no rolling 24h change exists in its ticker). Returns { SYM: { usd } }. */
export async function fromKraken(syms, fetchImpl, timeoutMs) {
  const listed = syms.filter((s) => COIN_IDS[s]?.kraken);
  if (!listed.length) return {};
  const d = await getJson(fetchImpl, `https://api.kraken.com/0/public/Ticker?pair=${listed.map((s) => COIN_IDS[s].kraken[0]).join(",")}`, timeoutMs);
  if (d?.error?.length) throw new Error(d.error.join(";"));
  const out = {};
  for (const s of listed) {
    const [req, key] = COIN_IDS[s].kraken; const r = d?.result?.[key] || d?.result?.[req];
    const last = num(r?.c?.[0]);
    if (last !== null && last > 0) out[s] = { usd: last };
  }
  return out;
}

let cache = { key: "", ts: 0, value: null };

/**
 * @param {string[]} syms e.g. ["XRP","ETH"]
 * @param {{fetchImpl?: typeof fetch, now?: number, timeoutMs?: number}} [opts]
 * @returns {Promise<{prices: Record<string,{usd:number|null,change24h:number|null,priceSource:string|null}>, unavailable: boolean, window: string, fetchedAt: number}>}
 */
export async function getPrices(syms, opts = {}) {
  const fetchImpl = opts.fetchImpl || fetch;
  const now = opts.now ?? Date.now();
  const timeoutMs = opts.timeoutMs ?? 8000;
  const key = syms.join(",");
  if (cache.value && cache.key === key && now - cache.ts < CACHE_MS) return cache.value;
  let gecko = {};
  try { gecko = await fromCoinGecko(syms, fetchImpl, timeoutMs); } catch { gecko = {}; }
  const missing = syms.filter((s) => !gecko[s]);
  let kraken = {};
  if (missing.length) { try { kraken = await fromKraken(missing, fetchImpl, timeoutMs); } catch { kraken = {}; } }
  const prices = {};
  for (const s of syms) {
    if (gecko[s]) prices[s] = { usd: gecko[s].usd, change24h: gecko[s].change24h, priceSource: "coingecko" };
    else if (kraken[s]) prices[s] = { usd: kraken[s].usd, change24h: null, priceSource: "kraken" };
    else prices[s] = { usd: null, change24h: null, priceSource: null };
  }
  const unavailable = !syms.some((s) => prices[s].usd !== null);
  const value = { prices, unavailable, window: CHANGE_WINDOW, fetchedAt: now };
  if (!unavailable) cache = { key, ts: now, value };
  return value;
}

/** "$83,129" / "$1.37" / "$0.1921"; null → "—". */
export function fmtPrice(p) {
  const n = num(p);
  if (n === null || n <= 0) return "—";
  return n >= 100 ? "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 }) : n >= 1 ? "$" + n.toFixed(2) : "$" + n.toFixed(4);
}

/** Rolling 24h change → { text: "▲ 2.23%" | "▼ 0.47%" | "0.00%" | "—", tone: "up" | "down" | "flat" | "none" }. */
export function fmtChange(ch) {
  const n = num(ch);
  if (n === null) return { text: "—", tone: "none" };
  const r = Math.round(n * 100) / 100;
  if (r === 0) return { text: "0.00%", tone: "flat" };
  return r > 0 ? { text: "▲ " + r.toFixed(2) + "%", tone: "up" } : { text: "▼ " + Math.abs(r).toFixed(2) + "%", tone: "down" };
}

/** Everything a ticker bar renders for one coin. Every bar uses this, so equal inputs give equal output. */
export function tickerItem(sym, info) {
  const c = fmtChange(info ? info.change24h : null);
  return { sym, price: fmtPrice(info ? info.usd : null), change: c.text, tone: c.tone, window: CHANGE_WINDOW };
}

export function _resetCache() { cache = { key: "", ts: 0, value: null }; }
