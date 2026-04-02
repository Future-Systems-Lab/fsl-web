export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Grid BG */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "linear-gradient(#00D9FF 1px, transparent 1px), linear-gradient(90deg, #00D9FF 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden px-4 pt-28 pb-24 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#00D9FF06_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-extrabold leading-[1.1] sm:text-6xl lg:text-7xl tracking-tight">
            Your Health Record.<br />
            <span className="bg-gradient-to-r from-[#00D9FF] to-[#7FFFD4] bg-clip-text text-transparent">Your Terms.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg text-gray-400 leading-relaxed">
            For the first time in history, your wellness record lives on-chain &mdash; owned by you, not a hospital, not an insurer, not a platform. You decide who sees it. You invite your practitioners in. You revoke access anytime.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="https://frontend-omega-six-b9szh0blg5.vercel.app/onboarding" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#00D9FF] px-10 py-4 text-sm font-bold text-gray-950 transition hover:bg-[#00D9FF]/90 shadow-lg shadow-[#00D9FF]/20">
              Claim Your Sovereign Record
            </a>
            <a href="https://frontend-omega-six-b9szh0blg5.vercel.app/participant/providers" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-gray-700 px-10 py-4 text-sm font-medium text-gray-300 transition hover:border-[#00D9FF]/50 hover:text-white">
              Find a Practitioner
            </a>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="border-t border-gray-800/50 px-4 py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#00D9FF]">How It Works</p>
          <h2 className="text-center text-3xl font-extrabold mb-16">Three steps. Permanent sovereignty.</h2>
          <div className="space-y-14">
            {[
              { n: "1", t: "Create Your Sovereign Wallet", d: "Your wallet is your identity. No username. No password. No third party holding your data. Your wallet address is your permanent, pseudonymous health ID." },
              { n: "2", t: "Build Your Health Record On-Chain", d: "Every wellness session, lab result, mood entry, and supplement protocol is recorded on ClaimChain \u2014 immutable, verifiable, yours. Not in a hospital database. Not on a server someone else controls. On-chain." },
              { n: "3", t: "Invite Your Practitioners", d: "You grant access. You revoke access. Your naturopath, nutritionist, or hypnosis practitioner sees only what you choose to share. They come into your record \u2014 your record doesn\u2019t go into theirs." },
            ].map(s => (
              <div key={s.n} className="flex gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#00D9FF]/30 bg-[#00D9FF]/10 text-xl font-bold text-[#00D9FF]">{s.n}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{s.t}</h3>
                  <p className="text-gray-400 leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY THIS IS THE FUTURE ═══ */}
      <section className="border-t border-gray-800/50 px-4 py-24 bg-gray-900/40">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-extrabold mb-4">Decentralized Care Is Not the Future.</h2>
          <p className="text-center text-3xl font-extrabold text-[#00D9FF] mb-14">It Is Now.</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-[#00D9FF]/10 bg-gray-950 p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#00D9FF]/10">
                <svg className="h-5 w-5 text-[#00D9FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Own Your Data</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Traditional healthcare stores your records in systems you cannot access or control. FSL puts your wellness record on a public blockchain \u2014 verifiable by you, portable with you, permanent.</p>
            </div>
            <div className="rounded-xl border border-[#00D9FF]/10 bg-gray-950 p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#00D9FF]/10">
                <svg className="h-5 w-5 text-[#00D9FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Sovereign Reimbursement</h3>
              <p className="text-sm text-gray-400 leading-relaxed">When your session ends, your superbill auto-generates from your on-chain record. You sign it with your wallet. You submit it to your insurer or HSA. FSL never touches your claim.</p>
            </div>
            <div className="rounded-xl border border-[#00D9FF]/10 bg-gray-950 p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#00D9FF]/10">
                <svg className="h-5 w-5 text-[#00D9FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Decentralized Practitioners</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Our provider network operates outside the traditional insurance system. Naturopathic doctors, holistic nutritionists, mental health nutrition specialists \u2014 credentialed, verified, and accessible directly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ECOSYSTEM ═══ */}
      <section className="border-t border-gray-800/50 px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#00D9FF]">The Ecosystem</p>
          <h2 className="mb-14 text-center text-3xl font-extrabold">One Sovereign Record. Five Platforms Working For You.</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "HypnoNeuro", desc: "27 browser-based wellness experiences. GABA, serotonin, dopamine, endorphin, and endocannabinoid support. Every session records to your chain.", url: "https://hypnoneuro-frontend.vercel.app", color: "#00FFD4" },
              { name: "EncryptHealth", desc: "Your clinical intelligence layer. Mood tracking, nutrition journaling, lab panels, and AI-powered wellness correlation \u2014 all sovereign, all yours.", url: "https://frontend-omega-six-b9szh0blg5.vercel.app", color: "#1E90FF" },
              { name: "ClaimChain", desc: "Sovereign health governance infrastructure. Session attestations, superbill generation, insurance navigation, and on-chain proof of every wellness interaction.", url: "https://claimchain-frontend.vercel.app", color: "#FF6B6B" },
              { name: "NeuroBalance Watch", desc: "Wearable sync coming. Compatible with Fitbit, Apple Watch, and Garmin. Your biometric data, on your chain.", url: "#", color: "#7FFFD4" },
              { name: "AlchemistForge", desc: "Shadow work and Jungian inner child healing \u2014 recorded on-chain as proof of your sovereign inner journey.", url: "https://eth-sepolia.blockscout.com/address/0xE092336F8f5082e57CcBb341A110C20ad186A324", color: "#9D4EDD" },
            ].map(e => (
              <a key={e.name} href={e.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl border bg-gray-900 p-6 transition hover:scale-[1.02]" style={{ borderColor: e.color + "15" }}>
                <h3 className="text-sm font-bold mb-2" style={{ color: e.color }}>{e.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{e.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOR PRACTITIONERS ═══ */}
      <section className="border-t border-gray-800/50 px-4 py-24 bg-gray-900/40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#FFD700]">For Practitioners</p>
          <h2 className="text-3xl font-extrabold mb-6">Join the Sovereign Wellness Network</h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
            You are invited into your participant&rsquo;s record &mdash; not the other way around. FSL provides you with a whitelabeled superbill, automated session documentation, and on-chain attestation for every session. You focus on the session. We handle everything else.
          </p>
          <a href="https://hypnoneuro-frontend.vercel.app/onboarding/provider" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg border border-[#FFD700]/40 bg-[#FFD700]/10 px-10 py-4 text-sm font-bold text-[#FFD700] transition hover:bg-[#FFD700]/20">
            Apply as a Provider
          </a>
        </div>
      </section>

      {/* ═══ XRPH SAVINGS ═══ */}
      <section className="border-t border-gray-800/50 px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-8 text-center">
            <h2 className="text-2xl font-extrabold mb-3">Reduce Your Medication Costs &mdash; Free</h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-6">
              While you build your sovereign wellness practice, reduce out-of-pocket prescription costs with the XRPH Prescription Savings Card. Accepted at 68,000+ pharmacies. No wallet required. No subscription. Free.
            </p>
            <a href="https://www.xrphealthcare.ai/XRPHSavingsCard" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg bg-emerald-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-emerald-500">
              Get Your Free Savings Card
            </a>
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="border-t border-gray-800/50 px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold mb-4">
            The healthcare system was not built for you.<br />
            <span className="text-[#00D9FF]">FSL was.</span>
          </h2>
          <p className="text-gray-400 mb-8">Sovereign health is not a trend. It is a right. Your record. Your practitioners. Your terms.</p>
          <a href="https://frontend-omega-six-b9szh0blg5.vercel.app/onboarding" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg bg-[#00D9FF] px-10 py-4 text-sm font-bold text-gray-950 transition hover:bg-[#00D9FF]/90 shadow-lg shadow-[#00D9FF]/20">
            Start Your Sovereign Journey
          </a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-gray-800/50 px-4 py-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold text-[#00D9FF] mb-1">Future Systems Lab LLC</p>
          <p className="text-xs text-gray-500 mb-4">Wyoming Entity</p>
          <p className="text-xs text-gray-600 mb-3">futuresystemslab.io &middot; hypnosispsych.com &middot; ClaimChain Sovereign Health Governance</p>
          <p className="text-[0.6rem] text-gray-700 max-w-lg mx-auto">
            Educational guidance only. FSL is not a healthcare provider. Provider listings are not endorsements. Not medical advice. FSL is not affiliated with the Walsh Research Institute.
          </p>
        </div>
      </footer>
    </div>
  );
}
