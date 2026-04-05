'use client'

import { useState, useEffect } from 'react'

const CRYPTOCOMPARE = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=XRP,XLM,HBAR,ALGO,ADA,ETH&tsyms=USD'
const FALLBACK: Record<string, number> = { xrp: 2.15, xlm: 0.38, hbar: 0.18, algo: 0.22, ada: 0.72, eth: 3400 }

export default function Home() {
  const [prices, setPrices] = useState(FALLBACK)

  useEffect(() => {
    fetch(CRYPTOCOMPARE).then(r => r.json()).then(d => {
      if (d.XRP?.USD) setPrices({ xrp: d.XRP.USD, xlm: d.XLM?.USD, hbar: d.HBAR?.USD, algo: d.ALGO?.USD, ada: d.ADA?.USD, eth: d.ETH?.USD })
    }).catch(() => {})
    const iv = setInterval(() => {
      fetch(CRYPTOCOMPARE).then(r => r.json()).then(d => {
        if (d.XRP?.USD) setPrices({ xrp: d.XRP.USD, xlm: d.XLM?.USD, hbar: d.HBAR?.USD, algo: d.ALGO?.USD, ada: d.ADA?.USD, eth: d.ETH?.USD })
      }).catch(() => {})
    }, 60000)
    return () => clearInterval(iv)
  }, [])

  const fmt = (v: number, d = 4) => v ? v.toFixed(d) : '—'
  const ticker = `XRP: $${fmt(prices.xrp)} ◆ XLM: $${fmt(prices.xlm)} ◆ HBAR: $${fmt(prices.hbar)} ◆ ALGO: $${fmt(prices.algo)} ◆ ADA: $${fmt(prices.ada)} ◆ ETH: $${fmt(prices.eth, 0)} ◆ HNT: SOVEREIGN WELLNESS TOKEN ◆ WHERE MENTAL WELLNESS MEETS METAVERSE ◆ `

  const PLATFORMS = [
    { name: 'HypnoNeuro', icon: '🧠', color: '#00FFD4', desc: '27 sovereign frequency portals. Adjunct wellness tool integrating plant intelligence, orthomolecular support, and Bashar thought reprogramming.', url: 'https://hypnoneuro-frontend.vercel.app', label: 'Games + Reprogramming' },
    { name: 'EncryptHealth', icon: '🔐', color: '#1E90FF', desc: 'Your sovereign frequency intelligence — mood mapping, nutrition journaling, Walsh biotype engine, and lab results. All encrypted. All yours.', url: 'https://frontend-omega-six-b9szh0blg5.vercel.app', label: 'Orthomolecular Intelligence' },
    { name: 'SovereignLedger', icon: '⛓️', color: '#FF6B6B', desc: 'On-chain session attestation, sovereign superbills, and participant-controlled access grants. The blockchain is the accountant.', url: 'https://sovereignledger.vercel.app', label: 'On-Chain Health Records' },
    { name: 'AlchemistForge', icon: '⚗️', color: '#9D4EDD', desc: 'Shadow work and Jungian inner-child sovereign reflection. Document anchoring to IPFS. Permanent sovereign backup archive.', url: 'https://hypnoneuro-frontend.vercel.app', label: 'Shadow Work + Archive' },
    { name: 'NeuroBalance', icon: '🧬', color: '#7FFFD4', desc: 'Biosensor data sovereignty. Sync wearable data — heart rate, HRV, sleep, SpO2 — and anchor your biomarkers on-chain.', url: 'https://neurobalance-labs.vercel.app', label: 'Biosensor Data' },
  ]

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>

      {/* ═══ CRYPTO TICKER ═══ */}
      <div className="relative z-20 w-full h-9 bg-[#050505] border-b border-[#00D9FF]/10 overflow-hidden">
        <style>{`@keyframes fslTicker { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
        <div style={{ display: 'inline-block', whiteSpace: 'nowrap', lineHeight: '36px', animation: 'fslTicker 50s linear infinite', fontSize: '0.7rem', letterSpacing: '0.06em', color: '#00D9FF' }}>
          {ticker}{ticker}
        </div>
      </div>

      {/* ═══ 1. PIONEER HERO ═══ */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(0,217,255,0.06) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(0,255,212,0.04) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-[#00D9FF]/60 mb-4">Future Systems Lab Presents</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6 px-2">
            <span className="bg-gradient-to-r from-[#00D9FF] to-white bg-clip-text text-transparent">
              The First Decentralized Web3 Sovereign Wellness Platform on Mother Earth
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto leading-relaxed mb-8 px-4">
            Your wellness sessions anchored on IPFS. Your records verified on Ethereum. Your identity sovereign via Unstoppable Domains. No corporation controls your frequency.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://frontend-omega-six-b9szh0blg5.vercel.app" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#00D9FF] px-10 py-4 text-sm font-bold text-gray-950 transition hover:bg-[#00D9FF]/85 shadow-[0_0_30px_rgba(0,217,255,0.2)]">
              Claim Your Sovereign Record
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 2. HOW SOVEREIGN WELLNESS WORKS ═══ */}
      <section className="py-16 px-4 border-t border-gray-800/30">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#00D9FF] mb-3">The Sovereignty Layer</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '⛓️', title: 'On-Chain Verification', desc: 'Every session attested on Ethereum. Every consent grant recorded immutably. Every superbill verifiable on Blockscout. The blockchain is the accountant.' },
              { icon: '🌐', title: 'IPFS Permanent Storage', desc: '17 governance documents on the InterPlanetary File System. Decentralized, censorship-resistant, permanent. Your sovereign record exists beyond any single server.' },
              { icon: '🛡️', title: 'Unstoppable Access', desc: 'Access platforms via Unstoppable Domains — hypnoneuro.pw, encrypthealth.pw, sovereignledger.pw. No registrar can revoke. No government can seize. Sovereign.' },
            ].map(s => (
              <div key={s.title} className="rounded-xl border border-[#00D9FF]/10 bg-white/[0.02] p-5 text-center">
                <div className="text-2xl mb-3">{s.icon}</div>
                <h3 className="text-sm font-bold text-[#00D9FF] mb-2">{s.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. FIVE SOVEREIGN PLATFORMS ═══ */}
      <section className="py-16 px-4 border-t border-gray-800/30">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#00D9FF] mb-3">The Ecosystem</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Five Sovereign Platforms. One Network.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLATFORMS.map(p => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="rounded-xl border p-5 transition-all hover:-translate-y-1" style={{ borderColor: `${p.color}20`, background: `${p.color}05` }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: p.color }}>{p.name}</h3>
                    <p className="text-[0.6rem] text-gray-500">{p.label}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. PRACTITIONER INVITATION + INSURANCE ═══ */}
      <section className="py-16 px-4 border-t border-gray-800/30">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[#00D9FF]/15 bg-[#00D9FF]/5 p-6 text-center">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="text-lg font-bold text-white mb-2">Invite Your Practitioner</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">Your record belongs to you. Invite a sovereign wellness practitioner to view only what you choose to share. Revoke access instantly — on-chain.</p>
            <a href="https://frontend-omega-six-b9szh0blg5.vercel.app/participant/providers" target="_blank" rel="noopener noreferrer" className="inline-block rounded-lg border border-[#00D9FF]/30 bg-[#00D9FF]/10 px-6 py-2 text-xs font-medium text-[#00D9FF] transition hover:bg-[#00D9FF]/20">View Practitioners</a>
          </div>
          <div className="rounded-xl border border-[#FFD700]/15 bg-[#FFD700]/5 p-6 text-center">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="text-lg font-bold text-white mb-2">Navigate Your Coverage</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">Licensed A&H guidance for sovereign wellness coverage. HSA/FSA optimization. Out-of-network reimbursement. Auto-generated CMS-1500 superbills.</p>
            <a href="https://frontend-omega-six-b9szh0blg5.vercel.app/insurance-navigator" target="_blank" rel="noopener noreferrer" className="inline-block rounded-lg border border-[#FFD700]/30 bg-[#FFD700]/10 px-6 py-2 text-xs font-medium text-[#FFD700] transition hover:bg-[#FFD700]/20">Check Coverage</a>
          </div>
        </div>
      </section>

      {/* ═══ 5. YOU CONTROL WHO SEES YOUR RECORD ═══ */}
      <section className="py-16 px-4 border-t border-gray-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">You Control Who Sees Your Record</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '🔗', title: 'You Sign Up', desc: 'Connect your wallet. Your wallet IS your identity — no passwords, no email, no intermediary.' },
              { step: '02', icon: '📨', title: 'You Invite', desc: 'Choose your practitioner. Set exactly what they can see — mood data, labs, session notes. You decide the scope.' },
              { step: '03', icon: '🛡️', title: 'You Revoke', desc: 'Remove access instantly. No 30-day waiting period. No form. One click — sovereignty intact.' },
            ].map(s => (
              <div key={s.step} className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl border border-[#00D9FF]/20 bg-[#00D9FF]/5 flex items-center justify-center text-2xl">{s.icon}</div>
                <div className="text-[#00D9FF] text-xs font-bold tracking-[0.2em]">{s.step}</div>
                <h3 className="text-base font-bold">{s.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-gray-500 max-w-lg mx-auto">No clinic owns your data. No insurance company decides your care. Just you, your wellness record, and the practitioners you trust.</p>
        </div>
      </section>

      {/* ═══ 6. ISO 20022 PAYMENT PATHS ═══ */}
      <section className="py-14 px-4 border-t border-gray-800/30">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#FFD700] mb-3">Sovereign Payment Paths</h3>
          <p className="text-xs text-gray-400 mb-5">Pay with ISO 20022-aligned digital assets, fiat, or HSA/FSA. Your choice. Your sovereignty.</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['XRP', 'XLM', 'HBAR', 'ALGO', 'ADA', 'ETH', 'Fiat', 'HSA/FSA'].map(c => (
              <span key={c} className="text-xs px-3 py-1 rounded-full border border-[#FFD700]/25 text-[#FFD700] bg-[#FFD700]/5 font-medium">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. BENEVOLENCE FUND ═══ */}
      <section className="py-16 px-4 border-t border-gray-800/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700] mb-3">Community Treasury</p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">The Sovereign Benevolence Fund</h2>
          <p className="text-sm text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">3% of every session — automatic, on-chain, transparent. Distributed annually to the practitioners whose participants achieve the highest frequency growth.</p>
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-6">
            {[
              { medal: '🥇', place: '1st', pct: '50%', color: '#FFD700' },
              { medal: '🥈', place: '2nd', pct: '30%', color: '#C0C0C0' },
              { medal: '🥉', place: '3rd', pct: '20%', color: '#CD7F32' },
            ].map(r => (
              <div key={r.place} className="rounded-xl border p-3 text-center" style={{ borderColor: `${r.color}30`, background: `${r.color}08` }}>
                <div className="text-xl">{r.medal}</div>
                <p className="text-xs text-gray-400 mt-1">{r.place}</p>
                <p className="text-sm font-bold" style={{ color: r.color }}>{r.pct}</p>
              </div>
            ))}
          </div>
          <a href="https://eth-sepolia.blockscout.com/address/0xbe710a0a5a80dfa3ca7dfadc959176d545b18271" target="_blank" rel="noopener noreferrer" className="text-xs text-[#00D9FF] hover:underline">View fund transparency on Blockscout →</a>
        </div>
      </section>

      {/* ═══ 8. FREE TRIAL CTA ═══ */}
      <section className="py-20 px-4 border-t border-gray-800/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start Your 3-Day Sovereign Trial</h2>
          <p className="text-gray-400 text-sm mb-8">No credit card. No diagnosis. No gatekeepers. Just wellness on your terms.</p>
          <a href="https://hypnoneuro-frontend.vercel.app/onboarding/participant" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 rounded-xl bg-[#00D9FF] text-gray-950 text-sm font-bold hover:bg-[#00D9FF]/85 transition shadow-[0_0_30px_rgba(0,217,255,0.2)]">Begin Free Trial</a>
          <p className="text-gray-500 text-xs mt-6">After trial: Wellness $19/mo · Sovereign $49/mo</p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-gray-800/50 px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {PLATFORMS.map(p => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium transition hover:text-white" style={{ color: p.color + 'aa' }}>{p.name}</a>
            ))}
          </div>
          <p className="text-xs text-gray-600 mb-1">Built by Future Systems Lab LLC — Wyoming Entity</p>
          <p className="text-xs text-gray-700">Where Mental Wellness Meets Metaverse</p>
          <p className="text-[0.6rem] text-gray-800 mt-4">&copy; 2026 Future Systems Lab. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
