'use client';
import { useState, useEffect, useRef } from 'react';

const COINS = ['XRP', 'XLM', 'HBAR', 'ALGO', 'ADA', 'ETH', 'BTC'];

interface CoinPrice { usd: number; change24h: number }

export default function FSLTicker() {
  const [prices, setPrices] = useState<Record<string, CoinPrice>>({});
  const prev = useRef<Record<string, CoinPrice>>({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch('https://encrypthealth.io/api/prices');
        if (!res.ok) return;
        const d: Record<string, CoinPrice> = await res.json();
        if (d && !d.error) {
          prev.current = { ...prev.current, ...d };
          setPrices(d);
        }
      } catch (err) {
        console.warn('[ticker] fetch failed, using cached');
      }
    };
    fetchPrices();
    const iv = setInterval(fetchPrices, 60000);
    return () => clearInterval(iv);
  }, []);

  const fmt = (n: number) => {
    if (n >= 100) return `$${n.toFixed(2)}`;
    if (n >= 1) return `$${n.toFixed(3)}`;
    return `$${n.toFixed(4)}`;
  };

  const buildHtml = () => {
    const items = COINS.map(c => {
      const p = prices[c] || prev.current[c];
      if (!p || !p.usd) return `<span style="display:inline-block;padding:0 1.5rem"><span style="color:#00D9FF">${c}:</span> <span style="color:#fff">—</span></span>`;
      const ch = p.change24h || 0;
      const arrow = ch > 0 ? '▲' : ch < 0 ? '▼' : '';
      const color = ch > 0 ? '#00FF88' : ch < 0 ? '#FF4444' : '#7A9BA8';
      return `<span style="display:inline-block;padding:0 1.5rem"><span style="color:#00D9FF">${c}:</span> <span style="color:#fff">${fmt(p.usd)}</span> <span style="color:${color}">${arrow} ${Math.abs(ch).toFixed(1)}%</span></span>`;
    }).join('');

    return items + '<span style="display:inline-block;padding:0 1.5rem"><span style="color:#FFD700">HNT</span></span> ';
  };

  return (
    <div className="relative z-20 w-full h-9 bg-[#0A0A0A] border-b border-[#00D9FF]/10 overflow-hidden" style={{ fontFamily: "'Chakra Petch', monospace" }}>
      <style>{`@keyframes ehTickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      <div
        style={{ display: 'inline-block', whiteSpace: 'nowrap', lineHeight: '36px', animation: 'ehTickerScroll 30s linear infinite', fontSize: '0.7rem', letterSpacing: '0.06em' }}
        dangerouslySetInnerHTML={{ __html: buildHtml() + buildHtml() }}
      />
    </div>
  );
}
