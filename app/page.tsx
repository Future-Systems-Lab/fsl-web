"use client";

import { useState, useEffect } from "react";

const SUBS = ["Own your data.", "Earn from wellness.", "No middlemen.", "Sovereign. Forever."];

const FEATURES = [
  { title: "Own Your Records", desc: "Encrypted on Filecoin. Anchored on-chain. Only your wallet key unlocks them.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { title: "Earn HNT Tokens", desc: "Complete wellness sessions and earn HypnoNeuro Tokens. Redeem for discounts with any FSL provider.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Sovereign Wallet", desc: "Your health identity lives in your wallet. Not a hospital database. Not an insurance portal. Yours.", icon: "M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 110-6h5.25A2.25 2.25 0 0121 6v6zm0 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V6" },
  { title: "Grant & Revoke Access", desc: "Share records with practitioners for a session. Revoke with one toggle. Cryptographically enforced.", icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" },
  { title: "On-Chain Attestations", desc: "Every session, every milestone, every lab result \u2014 permanently timestamped on the blockchain.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { title: "Insurance Navigation", desc: "Use your verifiable wellness history to navigate coverage gaps and fund alternative therapies.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const ECO = [
  { name: "HypnoNeuro", desc: "27 browser-based wellness games", url: "https://hypnoneuro-frontend.vercel.app", color: "#00FFD4" },
  { name: "EncryptHealth", desc: "Clinical intelligence + AI protocols", url: "https://frontend-omega-six-b9szh0blg5.vercel.app", color: "#1E90FF" },
  { name: "ClaimChain", desc: "On-chain session governance", url: "https://claimchain-frontend.vercel.app", color: "#FF6B6B" },
  { name: "AlchemistForge", desc: "Shadow work on the blockchain", url: "https://eth-sepolia.blockscout.com/address/0xE092336F8f5082e57CcBb341A110C20ad186A324", color: "#9D4EDD" },
  { name: "NeuroBalance", desc: "Neurotransmitter tracking", url: "https://neurobalance-deploy.vercel.app", color: "#7FFFD4" },
];

const TIERS = [
  { name: "Free Trial", price: "Free", features: ["9 Level 1 wellness games", "Basic mood tracking", "Community support", "Sovereign wallet setup"], cta: "Start Free \u2014 No wallet required", href: "https://frontend-omega-six-b9szh0blg5.vercel.app/onboarding" },
  { name: "Wellness", price: "$19/mo", hl: true, features: ["All 27 games", "Wellness Sovereignty Center", "Nutrition correlation", "EncryptHealth tracking", "Full data portability"] },
  { name: "Sovereign", price: "$49/mo", features: ["Everything in Wellness", "Insurance Navigator + Coverage Gap", "ClaimChain on-chain records", "Priority provider booking", "HNT token rewards", "AI orthomolecular insights"] },
];

const PROMISES = [
  "We never sell your data. Ever.",
  "We never read your encrypted files. Only you hold the key.",
  "You can export all your data anytime. One click.",
  "You can delete your platform account. Your blockchain records remain yours.",
  "If FSL shuts down tomorrow, your Filecoin data persists. Forever.",
];

export default function Home() {
  const [subIdx, setSubIdx] = useState(0);
  const [showPayment, setShowPayment] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setSubIdx((i) => (i + 1) % SUBS.length), 2500);
    return () => clearInterval(t);
  }, []);

  const Ic = ({ d }: { d: string }) => (
    <svg className="h-5 w-5 text-[#00D9FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Grid BG */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#00D9FF 1px, transparent 1px), linear-gradient(90deg, #00D9FF 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden px-4 pt-24 pb-20 sm:pt-36 sm:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#00D9FF08_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#00D9FF]">Future Systems Lab</p>
          <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
            The Future of Healthcare<br />
            <span className="bg-gradient-to-r from-[#00D9FF] via-[#7FFFD4] to-[#FFD700] bg-clip-text text-transparent">Has Arrived</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">Own your health data. Earn from your wellness. Build your sovereign health record on the blockchain.</p>
          <p className="mt-3 h-7 text-xl font-bold text-[#00D9FF] transition-all duration-500">{SUBS[subIdx]}</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="https://frontend-omega-six-b9szh0blg5.vercel.app" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#00D9FF] px-10 py-4 text-sm font-bold text-gray-950 transition hover:bg-[#00D9FF]/90 shadow-lg shadow-[#00D9FF]/20">
              Start Your Sovereign Health Journey
            </a>
            <a href="https://hypnoneuro-frontend.vercel.app/onboarding/provider" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-gray-700 px-10 py-4 text-sm font-medium text-gray-300 transition hover:border-[#00D9FF]/50 hover:text-white">
              For Providers
            </a>
          </div>
        </div>
      </section>

      {/* ═══ WHAT IS WEB3 HEALTH? ═══ */}
      <section className="border-t border-gray-800/50 px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-extrabold sm:text-4xl mb-4">Web3 is the internet where <span className="text-[#00D9FF]">YOU</span> own your data.</h2>
          <p className="text-center text-gray-500 mb-14">Not corporations. Not insurers. You.</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Old Way */}
            <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-7">
              <div className="text-3xl mb-4">&#x26D3;&#xFE0F;</div>
              <h3 className="text-lg font-bold text-red-400 mb-3">The Old Way</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Your health records live on hospital servers</li>
                <li>Insurance companies access and profit from your data</li>
                <li>You need permission to see your own records</li>
                <li>Switch providers and your history disappears</li>
              </ul>
            </div>
            {/* What Changed */}
            <div className="rounded-xl border border-[#00D9FF]/15 bg-[#00D9FF]/5 p-7">
              <div className="text-3xl mb-4">&#x26A1;</div>
              <h3 className="text-lg font-bold text-[#00D9FF] mb-3">What Changed</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><b className="text-white">Blockchain:</b> permanent, tamper-proof records</li>
                <li><b className="text-white">Decentralized storage:</b> no single company server</li>
                <li><b className="text-white">Crypto wallet:</b> your personal digital identity key</li>
                <li><b className="text-white">Smart contracts:</b> no middleman needed</li>
              </ul>
            </div>
            {/* FSL Way */}
            <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-7">
              <div className="text-3xl mb-4">&#x1F6E1;&#xFE0F;</div>
              <h3 className="text-lg font-bold text-emerald-400 mb-3">The FSL Way</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Records encrypted on Filecoin \u2014 permanent, decentralized</li>
                <li>Your wallet is your identity \u2014 no login, no password</li>
                <li>Providers get temporary access \u2014 you revoke anytime</li>
                <li>Every session anchored on-chain \u2014 proof that belongs to you</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW YOUR WALLET WORKS ═══ */}
      <section className="border-t border-gray-800/50 px-4 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold mb-4">Your wallet is your health passport.</h2>
          <p className="text-center text-gray-500 mb-14">Here&rsquo;s how it works in 3 steps.</p>
          <div className="space-y-10">
            {[
              { n: "1", title: "Create Your Wallet (2 minutes)", desc: "MetaMask is a free browser extension that generates your unique wallet address. Think of it as a safety deposit box that only you have the key to.", detail: "You get a 12-word phrase \u2014 write it down, keep it safe. That\u2019s your master key.", btn: "Install MetaMask Free", href: "https://metamask.io/download" },
              { n: "2", title: "Connect to FSL", desc: "Connect your wallet to FSL with one click. No username. No password. Your wallet IS your identity.", detail: "Your wallet address becomes your sovereign health ID \u2014 pseudonymous, private, permanent." },
              { n: "3", title: "Own Everything", desc: "Every session, every lab result, every wellness milestone is anchored to your wallet. It\u2019s yours. Forever. Even if FSL shuts down tomorrow.", detail: "Your data lives on Filecoin \u2014 a decentralized network of computers worldwide. No single point of failure." },
            ].map((s) => (
              <div key={s.n} className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#00D9FF]/40 bg-[#00D9FF]/10 text-lg font-bold text-[#00D9FF]">{s.n}</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{s.desc}</p>
                  <p className="text-xs text-gray-500 mb-3">{s.detail}</p>
                  {s.btn && <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/30 px-5 py-2 text-xs font-medium text-[#00D9FF] transition hover:bg-[#00D9FF]/20">{s.btn}</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW CRYPTO PAYMENT WORKS ═══ */}
      <section className="border-t border-gray-800/50 px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-extrabold mb-14">Pay with crypto, earn crypto, own your financial health sovereignty.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-7">
              <h3 className="text-lg font-bold text-white mb-4">How to Pay</h3>
              <p className="text-sm text-gray-400 mb-4">Pay with ETH or HNT directly from your wallet. No credit card. No bank. No processing delays.</p>
              <ol className="space-y-3 text-sm text-gray-400 list-decimal list-inside mb-4">
                <li>Book a session \u2192 payment request appears in MetaMask</li>
                <li>Review amount \u2192 click Confirm</li>
                <li>Payment executes on blockchain \u2192 provider receives instantly</li>
                <li>Transaction recorded permanently \u2014 your receipt lives on-chain forever</li>
              </ol>
              <p className="text-xs text-gray-500">About 30 seconds. No chargebacks. Cryptographically verified.</p>
            </div>
            <div className="rounded-xl border border-[#FFD700]/15 bg-[#FFD700]/5 p-7">
              <h3 className="text-lg font-bold text-[#FFD700] mb-4">How You Earn</h3>
              <p className="text-sm text-gray-400 mb-4">Complete wellness sessions \u2192 earn HNT tokens \u2192 redeem for discounts.</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><b className="text-white">HNT</b> \u2014 FSL&rsquo;s wellness currency. Earned only \u2014 never purchasable.</li>
                <li>Complete Level 1 games \u2192 earn HNT</li>
                <li>Complete all Level 1 \u2192 earn MindMasteryNFT \u2192 <b className="text-[#FFD700]">10% off</b> all provider sessions forever</li>
                <li>HNT is yours. In your wallet. Portable. Permanent.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <section className="border-t border-gray-800/50 px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Your health data is being sold.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">Insurance companies profit from your records. Practitioners don&rsquo;t own their attestations. You have no proof of your wellness journey.</p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { t: "Data Harvested", d: "Wellness apps collect and sell your health data to insurers and advertisers." },
              { t: "Coverage Denied", d: "Your own health records used against you by insurance algorithms." },
              { t: "No Proof", d: "Years of wellness work with nothing to show for it. No verifiable record." },
            ].map((p) => (
              <div key={p.t} className="rounded-xl border border-red-500/15 bg-red-500/5 p-6">
                <h3 className="text-lg font-bold text-red-400">{p.t}</h3>
                <p className="mt-2 text-sm text-gray-400">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY THIS MATTERS ═══ */}
      <section className="border-t border-gray-800/50 px-4 py-24 bg-gray-900/50">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-3xl font-extrabold">Healthcare is broken. We built the alternative.</h2>
          <div className="space-y-3 text-lg text-gray-500">
            <p>&ldquo;$30 billion worth of health data is sold every year. None of it goes to you.&rdquo;</p>
            <p>&ldquo;Insurance companies denied 17% of in-network claims in 2023.&rdquo;</p>
            <p>&ldquo;The average American has health records scattered across 11 different providers.&rdquo;</p>
          </div>
          <div className="pt-6 space-y-2 text-lg">
            <p className="text-[#00D9FF] font-bold">FSL changes all of this. Not someday. Today.</p>
            <p className="text-gray-400">Your first session creates a permanent, sovereign health record.</p>
            <p className="text-gray-400">Your first lab upload is encrypted on a decentralized network forever.</p>
            <p className="text-gray-400">Your first HNT token is proof that your wellness generates value.</p>
          </div>
          <p className="pt-4 text-2xl font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#FFD700] bg-clip-text text-transparent">This is not an app. This is infrastructure.</p>
        </div>
      </section>

      {/* ═══ FSL SOLUTION ═══ */}
      <section className="border-t border-gray-800/50 px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-[#00D9FF]">The FSL Solution</p>
          <h2 className="text-center text-3xl font-extrabold mb-12">Sovereign health infrastructure. Governed by you.</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-[#00D9FF]/10 bg-gray-900 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#00D9FF]/10"><Ic d={f.icon} /></div>
                <h3 className="text-base font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ECOSYSTEM ═══ */}
      <section className="border-t border-gray-800/50 px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-[#00D9FF]">The Ecosystem</p>
          <h2 className="mb-12 text-center text-3xl font-extrabold">Five Platforms. One Sovereign Stack.</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ECO.map((e) => (
              <a key={e.name} href={e.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl border bg-gray-900 p-5 transition hover:scale-[1.02]" style={{ borderColor: e.color + "22" }}>
                <h3 className="text-sm font-bold mb-2" style={{ color: e.color }}>{e.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{e.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="border-t border-gray-800/50 px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-[#00D9FF]">Pricing</p>
          <h2 className="mb-12 text-center text-3xl font-extrabold">Start Free. Scale Sovereign.</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {TIERS.map((t) => (
              <div key={t.name} className={`rounded-xl border p-6 ${t.hl ? "border-[#00D9FF]/40 bg-[#00D9FF]/5" : "border-gray-800 bg-gray-900"}`}>
                <h3 className="text-lg font-bold text-white">{t.name}</h3>
                <p className="mt-1 text-2xl font-bold text-[#00D9FF]">{t.price}</p>
                <ul className="mt-5 space-y-2">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#00D9FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                {t.href ? (
                  <a href={t.href} target="_blank" rel="noopener noreferrer" className="mt-6 block rounded-lg bg-[#00D9FF] py-2.5 text-center text-sm font-bold text-gray-950 transition hover:bg-[#00D9FF]/90">{t.cta}</a>
                ) : (
                  <button onClick={() => setShowPayment(t.name)} className={`mt-6 w-full rounded-lg py-2.5 text-sm font-medium transition ${t.hl ? "bg-[#00D9FF] text-gray-950 hover:bg-[#00D9FF]/90" : "border border-gray-700 text-gray-300 hover:border-gray-500"}`}>Get Started</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOVEREIGNTY PROMISE ═══ */}
      <section className="border-t border-gray-800/50 px-4 py-24 bg-gray-900/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold mb-10">We built FSL on one principle:<br /><span className="text-[#00D9FF]">your health data belongs to you.</span></h2>
          <div className="space-y-4 mb-10">
            {PROMISES.map((p) => (
              <div key={p} className="flex items-center gap-4 rounded-xl border border-[#00D9FF]/10 bg-gray-950 px-6 py-4">
                <svg className="h-5 w-5 shrink-0 text-[#00D9FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <p className="text-sm text-gray-300 text-left">{p}</p>
              </div>
            ))}
          </div>
          <p className="text-sm font-bold text-gray-500">Future Systems Lab LLC \u2014 Wyoming | Sovereign Health Infrastructure</p>
        </div>
      </section>

      {/* ═══ COVERAGE EDUCATION ═══ */}
      <section className="border-t border-gray-800/50 px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold">Navigate Your Coverage Options</h2>
          <p className="mt-3 text-gray-400">Many FSL wellness modalities may qualify for HSA reimbursement, supplemental coverage, or disability support. Book a complimentary coverage education session to understand your options.</p>
          <a href="https://calendly.com/future-systems-lab-proton/45-minute-insurance-strategy" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-lg border border-[#00D9FF]/30 bg-[#00D9FF]/10 px-8 py-3 text-sm font-bold text-[#00D9FF] transition hover:bg-[#00D9FF]/20">
            Book Coverage Education Session
          </a>
          <p className="mt-3 text-[0.6rem] text-gray-600">Educational guidance only. Not insurance advice or solicitation.</p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-gray-800/50 px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 text-center">
            <p className="text-lg font-bold text-[#00D9FF]">Future Systems Lab</p>
            <p className="text-xs text-gray-500">Where Mental Wellness Meets Metaverse</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 mb-4">
            {["HypnoNeuro", "EncryptHealth", "ClaimChain", "AlchemistForge", "NeuroBalance", "For Providers", "For Employers", "Insurance Navigator"].map((l) => (
              <span key={l} className="hover:text-gray-300 cursor-pointer transition">{l}</span>
            ))}
          </div>
          <p className="text-center text-[0.6rem] text-gray-600 mb-2">Powered by Ethereum &middot; Filecoin &middot; IPFS &middot; MetaMask</p>
          <p className="text-center text-[0.6rem] text-gray-700 max-w-2xl mx-auto">Not medical advice. Educational purposes only. FSL is not affiliated with the Walsh Research Institute.</p>
          <p className="mt-2 text-center text-[0.55rem] text-gray-700">&copy; 2026 Future Systems Lab LLC \u2014 Wyoming | Sovereign Health Infrastructure</p>
        </div>
      </footer>

      {/* ═══ PAYMENT MODAL ═══ */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setShowPayment(null)}>
          <div className="w-full max-w-sm rounded-2xl border border-gray-800 bg-gray-950 p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white mb-1">{showPayment}</h3>
            <p className="text-2xl font-bold text-[#00D9FF] mb-5">{TIERS.find((t) => t.name === showPayment)?.price}</p>
            <div className="space-y-3">
              <button className="w-full rounded-lg bg-[#00D9FF] py-3 text-sm font-bold text-gray-950 transition hover:bg-[#00D9FF]/90">Pay with MetaMask</button>
              <button className="w-full rounded-lg border border-gray-700 py-3 text-sm font-medium text-gray-300 transition hover:border-gray-500">Pay with Card (Stripe)</button>
            </div>
            <p className="mt-4 text-center text-[0.6rem] text-gray-600">Crypto payment on Ethereum Sepolia testnet during beta. Mainnet coming soon.</p>
          </div>
        </div>
      )}
    </div>
  );
}
