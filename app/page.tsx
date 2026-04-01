const FEATURES = [
  { title: "Own Your Records", desc: "Encrypted on Filecoin. Anchored on-chain. Only your wallet key unlocks them.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { title: "Earn HNT Tokens", desc: "Complete wellness sessions and earn HypnoNeuro Tokens. Redeem for discounts with any FSL provider.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Sovereign Wallet", desc: "Your health identity lives in your wallet. Not a hospital database. Not an insurance portal. Yours.", icon: "M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 110-6h5.25A2.25 2.25 0 0121 6v6zm0 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V6" },
  { title: "Grant & Revoke Access", desc: "Share records with practitioners for a session. Revoke with one toggle. Cryptographically enforced.", icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" },
  { title: "On-Chain Attestations", desc: "Every session, every milestone, every lab result \u2014 permanently timestamped on the blockchain.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { title: "Insurance Navigation", desc: "Use your verifiable wellness history to navigate coverage gaps and fund alternative therapies.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const ECOSYSTEM = [
  { name: "HypnoNeuro", desc: "27 browser-based wellness games across hypnotherapy, orthomolecular, and inner child healing", url: "https://hypnoneuro-frontend.vercel.app", color: "#00FFD4" },
  { name: "EncryptHealth", desc: "Clinical intelligence layer. Mood tracking, nutrition correlation, AI orthomolecular protocols, lab management.", url: "https://frontend-omega-six-b9szh0blg5.vercel.app", color: "#1E90FF" },
  { name: "ClaimChain", desc: "Sovereign health governance. On-chain session billing, provider attestations, wallet-linked records.", url: "https://claimchain-frontend.vercel.app", color: "#FF6B6B" },
  { name: "AlchemistForge", desc: "Shadow work on the blockchain. Jungian archetypes meet Web3 attestation.", url: "https://eth-sepolia.blockscout.com/address/0xE092336F8f5082e57CcBb341A110C20ad186A324", color: "#9D4EDD" },
  { name: "NeuroBalance", desc: "Neurotransmitter tracking and orthomolecular wellness intelligence.", url: "https://neurobalance-deploy.vercel.app", color: "#7FFFD4" },
];

const TIERS = [
  { name: "Free Trial", price: "Free", features: ["9 Level 1 wellness games", "Basic mood tracking", "Community support", "Sovereign wallet setup"] },
  { name: "Wellness", price: "$19/mo", hl: true, features: ["All 27 games", "Wellness Sovereignty Center", "Nutrition correlation", "EncryptHealth tracking", "Full data portability"] },
  { name: "Sovereign", price: "$49/mo", features: ["Everything in Wellness", "Insurance Navigator + Coverage Gap", "ClaimChain on-chain records", "Priority provider booking", "HNT token rewards", "AI orthomolecular insights"] },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#00D9FF08_0%,_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#00D9FF 1px, transparent 1px), linear-gradient(90deg, #00D9FF 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#00D9FF]">Future Systems Lab</p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            The Future of Healthcare{" "}<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#00D9FF] to-[#7FFFD4] bg-clip-text text-transparent">Has Arrived</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed">
            Own your health data. Earn from your wellness. Build your sovereign health record on the blockchain.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="https://hypnoneuro-frontend.vercel.app" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#00D9FF] px-8 py-3.5 text-sm font-bold text-gray-950 transition hover:bg-[#00D9FF]/90">
              Start Your Sovereign Health Journey
            </a>
            <a href="https://hypnoneuro-frontend.vercel.app/onboarding/provider" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-gray-700 px-8 py-3.5 text-sm font-medium text-gray-300 transition hover:border-gray-500 hover:text-white">
              For Providers
            </a>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="border-t border-gray-800/50 px-4 py-20">
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

      {/* The FSL Solution */}
      <section className="border-t border-gray-800/50 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-[#00D9FF]">The FSL Solution</p>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Sovereign health infrastructure.<br className="hidden sm:block" /> Powered by blockchain. Governed by you.</h2>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-[#00D9FF]/10 bg-gray-900 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#00D9FF]/10">
                  <svg className="h-5 w-5 text-[#00D9FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="border-t border-gray-800/50 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-[#00D9FF]">The Ecosystem</p>
          <h2 className="mb-12 text-center text-2xl font-bold sm:text-3xl">Five Platforms. One Sovereign Stack.</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ECOSYSTEM.map((e) => (
              <a key={e.name} href={e.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl border bg-gray-900 p-5 transition hover:scale-[1.02]" style={{ borderColor: e.color + "22" }}>
                <h3 className="text-sm font-bold mb-2" style={{ color: e.color }}>{e.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{e.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* For Participants */}
      <section className="border-t border-gray-800/50 px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#00D9FF]">For Participants</p>
          <h2 className="text-2xl font-bold sm:text-3xl">Three Steps to Health Sovereignty</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {["Create Your Sovereign Wallet", "Complete Wellness Sessions", "Own Your Health Record Forever"].map((s, i) => (
              <div key={s} className="rounded-xl border border-[#00D9FF]/15 bg-gray-900 p-6">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/10 text-sm font-bold text-[#00D9FF]">{i + 1}</div>
                <p className="text-sm text-gray-300">{s}</p>
              </div>
            ))}
          </div>
          <a href="https://hypnoneuro-frontend.vercel.app" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-lg bg-[#00D9FF] px-8 py-3 text-sm font-bold text-gray-950 transition hover:bg-[#00D9FF]/90">
            Start Free 3-Day Trial
          </a>
        </div>
      </section>

      {/* For Providers */}
      <section className="border-t border-gray-800/50 px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#FFD700]">For Providers</p>
          <h2 className="text-2xl font-bold sm:text-3xl">Sovereign Practice Infrastructure</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { t: "Earn HNT", d: "Every session earns HypnoNeuro Tokens deposited to your practice wallet." },
              { t: "On-Chain Credentials", d: "Verified credentials anchored on-chain. No middleman. No expiration surprise." },
              { t: "Sovereign Practice", d: "Your attestations, your participants, your reputation \u2014 all wallet-portable." },
            ].map((b) => (
              <div key={b.t} className="rounded-xl border border-[#FFD700]/15 bg-gray-900 p-6">
                <h3 className="text-sm font-bold text-[#FFD700]">{b.t}</h3>
                <p className="mt-2 text-xs text-gray-400">{b.d}</p>
              </div>
            ))}
          </div>
          <a href="https://hypnoneuro-frontend.vercel.app/onboarding/provider" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-lg border border-[#FFD700]/40 bg-[#FFD700]/10 px-8 py-3 text-sm font-bold text-[#FFD700] transition hover:bg-[#FFD700]/20">
            Join the FSL Provider Network
          </a>
        </div>
      </section>

      {/* For Employers */}
      <section className="border-t border-gray-800/50 px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#00D9FF]">For Employers</p>
          <h2 className="text-2xl font-bold sm:text-3xl">Give Your Team Sovereign Health Benefits</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { t: "Verified Engagement", d: "On-chain attestations prove real wellness participation." },
              { t: "Privacy First", d: "Aggregate outcomes only. Never individual data." },
              { t: "Real Outcomes", d: "Correlate wellness engagement with measurable results." },
            ].map((b) => (
              <div key={b.t} className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="text-sm font-bold text-white">{b.t}</h3>
                <p className="mt-2 text-xs text-gray-400">{b.d}</p>
              </div>
            ))}
          </div>
          <a href="https://calendly.com/future-systems-lab-proton" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-lg bg-[#00D9FF] px-8 py-3 text-sm font-bold text-gray-950 transition hover:bg-[#00D9FF]/90">
            Schedule a Demo
          </a>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-gray-800/50 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-[#00D9FF]">Pricing</p>
          <h2 className="mb-12 text-center text-2xl font-bold sm:text-3xl">Start Free. Scale Sovereign.</h2>
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
                <a href="https://hypnoneuro-frontend.vercel.app" target="_blank" rel="noopener noreferrer" className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-medium transition ${t.hl ? "bg-[#00D9FF] text-gray-950 hover:bg-[#00D9FF]/90" : "border border-gray-700 text-gray-300 hover:border-gray-500"}`}>
                  {t.price === "Free" ? "Start Free" : "Get Started"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <p className="text-lg font-bold text-[#00D9FF]">Future Systems Lab</p>
            <p className="text-xs text-gray-500">Where Mental Wellness Meets Metaverse</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 mb-6">
            {["HypnoNeuro", "EncryptHealth", "ClaimChain", "AlchemistForge", "NeuroBalance", "For Providers", "For Employers", "Insurance Navigator"].map((l) => (
              <span key={l} className="hover:text-gray-300 cursor-pointer transition">{l}</span>
            ))}
          </div>
          <p className="text-center text-[0.65rem] text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Not medical advice. Educational purposes only. FSL is not affiliated with the Walsh Research Institute. Nutritional insights do not constitute diagnosis or treatment.
          </p>
          <p className="mt-3 text-center text-[0.6rem] text-gray-700">
            &copy; 2026 Future Systems Lab LLC &mdash; Wyoming | Sovereign Health Infrastructure
          </p>
        </div>
      </footer>
    </div>
  );
}
