import { useState, useEffect } from "react";

const COINS = [
  { symbol: "XRP",  id: "ripple",            base: 2.18 },
  { symbol: "XLM",  id: "stellar",           base: 0.42 },
  { symbol: "HBAR", id: "hedera-hashgraph",  base: 0.28 },
  { symbol: "ALGO", id: "algorand",          base: 0.38 },
  { symbol: "ADA",  id: "cardano",           base: 0.72 },
  { symbol: "ETH",  id: "ethereum",          base: 3400 },
];

const STIGMAS = [
  '"What if my employer finds out?"',
  '"What if the system uses my data against me?"',
  '"I\'ve been dismissed and medicated, not heard."',
  '"I\'m not ready to say it out loud."',
  '"What if they label me?"',
  '"I don\'t trust the system with this."',
  '"I can\'t afford to be judged."',
  '"My records were lost. Again."',
];

const PILLARS = [
  { icon: "\u{1F4C1}", title: "Own Your Sovereign Record", body: "Your wellness record is indexed to your wallet address and stored in FSL\u2019s database. You grant Guides access with a wallet signature and revoke it any time. Session attestations are recorded on Ethereum Sepolia testnet. Client-side encryption and IPFS-based storage \u2014 so that FSL cannot read your data \u2014 are scaffolded and specified as the Phase 5 doctoral contribution." },
  { icon: "\u{1F469}\u{1F3FD}\u{200D}\u{2695}\u{FE0F}", title: "Invite Your Sovereign Guides", body: "Choose who enters your record. Invite the Sovereign Guides you trust \u2014 naturopaths, functional medicine practitioners, hypnotherapists, and more. You grant access. You revoke it. On your terms." },
  { icon: "\u{1F9FE}", title: "Track & Verify on SovereignLedger", body: "Track and verify your wellness journey directly through SovereignLedger \u2014 our sovereign records infrastructure. Session attestations recorded on-chain. Your sessions, your data, your terms." },
  { icon: "\u{1F48E}", title: "Pay How You Choose", body: "Crypto and ISO 20022-aligned digital assets. No gatekeeping. No bank required. Sovereign payment paths built for the future of wellness." },
];

const CURRICULUM = [
  { icon: "\u{1F33F}", title: "Pattern Literacy", body: "Learn to read the connections between markers, feelings, cravings, and plant-based nutrition. The curriculum teaches orthomolecular frameworks from published literature \u2014 educational pattern recognition, not diagnosis." },
  { icon: "\u{1F3AE}", title: "Sovereign Exercises", body: "Interactive games that teach wellness concepts through play. Trace neural patterns, build nutrient-dense meals, explore your daily routine. Earn HNT sovereign wellness tokens as you learn." },
  { icon: "\u{1F311}", title: "Shadow Into Light", body: "Through AlchemistForge, shadow aspects become integration points \u2014 recorded on Ethereum Sepolia testnet. Client-side AES-256-GCM encrypted \u2014 your encryption keys, your journal, your eyes only." },
  { icon: "\u{1F91D}", title: "Sovereign Community", body: "Connect with Sovereign Guides who share evidence-informed wellness education, and a community of sovereign participants on their own journey. Pseudonymous by default." },
];

const WEB3_ROWS = [
  { old: "Records stored on a hospital server",      next: "Records access-gated to your wallet",  icon: "\u{1F3DB}\u{FE0F}" },
  { old: "A corporation decides who sees your data", next: "You decide who sees your data. Every time.",     icon: "\u{1F511}" },
  { old: "Your history can be used against you",     next: "Your history belongs only to you. Always.",      icon: "\u{1F6E1}\u{FE0F}" },
  { old: "A corporation controls your wellness records", next: "You own and verify your records through SovereignLedger", icon: "\u{1F9FE}" },
];

const STEPS = [
  { n: "01", title: "Connect Your Wallet",         body: "No name, no email, no social login \u2014 just your wallet signature. Your identity stays yours to reveal, on your terms, in your time. Pseudonymous by default." },
  { n: "02", title: "Learn",                        body: "Follow the curriculum: pattern literacy, orthomolecular frameworks, sovereign exercises. The system teaches \u2014 published literature, not personal interpretation. Track mood, nutrition, and energy as you go." },
  { n: "03", title: "Grow",                         body: "Earn HNT tokens. Invite a Sovereign Guide when you are ready. Your record builds over time \u2014 access-gated to your wallet, visible only to those you authorize." },
];

const PAY_LABELS = ["XRP","XLM","HBAR","ALGO","ADA","ETH"];

function useLivePrices() {
  const [prices, setPrices] = useState(
    COINS.map((c) => ({ ...c, price: null, change: null }))
  );
  useEffect(() => {
    const ids = COINS.map((c) => c.id).join(",");
    const fetchPrices = () => {
      fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`)
        .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then((d) => {
          setPrices(
            COINS.map((c) => {
              const info = d[c.id];
              if (!info || info.usd == null) return { ...c, price: null, change: null };
              return { ...c, price: info.usd, change: info.usd_24h_change || 0 };
            })
          );
        })
        .catch((e) => { console.warn('[ticker] price fetch failed:', e.message); });
    };
    fetchPrices();
    const id = setInterval(fetchPrices, 120000);
    return () => clearInterval(id);
  }, []);
  return prices;
}

function fmt(n) {
  if (n >= 100) return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (n >= 1)   return n.toFixed(2);
  return n.toFixed(4);
}

const cyan  = "#00D9FF";
const gold  = "#D4AF37";
const dark  = "#030B0F";
const body  = "#C0D8E0";
const white = "#E8F4F8";
const muted = "#7A9BA8";

const eyebrow  = { fontSize: "0.65rem", letterSpacing: "0.28em", color: cyan, textTransform: "uppercase", display: "block", marginBottom: "1rem" };
const h2base   = { fontSize: "clamp(1.6rem, 4vw, 2.6rem)", fontWeight: "normal", marginBottom: "0.75rem", color: white };
const divLine  = { height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.3), transparent)", margin: "0 1.5rem" };
const cardStyle = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,217,255,0.1)", borderRadius: "4px", padding: "1.75rem" };

export default function FSLLandingPage() {
  const prices = useLivePrices();
  const [stigmaIdx, setStigmaIdx] = useState(0);
  const [stigmaVis, setStigmaVis] = useState(true);
  const [payIdx,    setPayIdx]    = useState(0);
  const [heroIn,    setHeroIn]    = useState(false);

  useEffect(() => { setTimeout(() => setHeroIn(true), 80); }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setStigmaVis(false);
      setTimeout(() => { setStigmaIdx((i) => (i + 1) % STIGMAS.length); setStigmaVis(true); }, 500);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setPayIdx((i) => (i + 1) % PAY_LABELS.length), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ background: dark, color: white, fontFamily: "Georgia,'Times New Roman',serif", overflowX: "hidden", minHeight: "100vh" }}>

      {/* TICKER */}
      <div style={{ background: "#060F14", borderBottom: "1px solid rgba(0,217,255,0.15)", overflow: "hidden", whiteSpace: "nowrap", padding: "0.4rem 0" }}>
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .ticker-inner { display: inline-flex; gap: 3rem; animation: marquee 28s linear infinite; }
          .ticker-inner:hover { animation-play-state: paused; }
        `}</style>
        <div className="ticker-inner">
          {[...prices, ...prices].map((c, idx) => {
            const live = c.price != null;
            const up = c.change >= 0;
            return (
              <span key={idx} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.72rem", letterSpacing: "0.06em" }}>
                <span style={{ color: cyan, fontWeight: "bold" }}>{c.symbol}</span>
                <span style={{ color: white }}>{live ? `$${fmt(c.price)}` : "—"}</span>
                {live && c.change != null && <span style={{ color: up ? "#00E676" : "#FF5252", fontSize: "0.65rem" }}>{up ? "▲" : "▼"} {Math.abs(c.change).toFixed(2)}%</span>}
                <span style={{ color: "rgba(0,217,255,0.6)", marginLeft: "0.5rem" }}>◆</span>
              </span>
            );
          })}
          <span style={{ color: "rgba(0,217,255,0.8)", fontSize: "0.63rem", letterSpacing: "0.12em" }}>ISO 20022-ALIGNED SOVEREIGN PAYMENTS ◆</span>
        </div>
      </div>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", borderBottom: "1px solid rgba(0,217,255,0.08)", position: "sticky", top: 0, zIndex: 100, background: "rgba(3,11,15,0.95)", backdropFilter: "blur(12px)" }}>
        <span style={{ color: cyan, fontSize: "0.85rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>Future Systems Lab</span>
        <button onClick={() => window.open("https://encrypthealth.io", "_blank")} style={{ background: cyan, color: dark, border: "none", padding: "0.55rem 1.2rem", borderRadius: "2px", fontFamily: "Georgia,serif", fontSize: "0.78rem", letterSpacing: "0.06em", cursor: "pointer", fontWeight: "bold" }}>Begin Learning</button>
      </nav>

      {/* DEMO BANNER */}
      <div style={{ margin: "0 auto", maxWidth: 1100, padding: "0.75rem 1.5rem 0" }}>
        <div style={{ border: "1px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.04)", borderRadius: 6, padding: "0.6rem 1rem", textAlign: "center" }}>
          <p style={{ color: gold, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", margin: 0 }}>PROOF-OF-CONCEPT DEMONSTRATION</p>
          <p style={{ color: "rgba(212,175,55,0.6)", fontSize: "0.6rem", margin: "0.2rem 0 0" }}>Ethereum Sepolia testnet. All data simulated — no real health information.</p>
        </div>
      </div>

      {/* HERO */}
      <section style={{ minHeight: "88vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "3rem 1.5rem 2rem", background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,217,255,0.07) 0%, transparent 70%)" }}>
        <span style={{ ...eyebrow, marginBottom: "1.2rem", opacity: heroIn ? 1 : 0, transition: "opacity 1s" }}>Decentralized Infrastructure for Sovereign Wellness Education</span>
        <h1 style={{ fontSize: "clamp(1.6rem, 6vw, 3.2rem)", lineHeight: 1.2, fontWeight: "normal", marginBottom: "1.2rem", maxWidth: "820px", opacity: heroIn ? 1 : 0, transform: heroIn ? "none" : "translateY(24px)", transition: "all 1.1s ease 0.15s" }}>
          A Sovereign Guide can only work with one person at a time. A system that teaches their method can outlive them and reach everyone they never could &mdash;{" "}
          <span style={{ color: cyan, fontStyle: "italic" }}>this system is the solution to that.</span>
        </h1>
        <p style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)", color: body, maxWidth: "560px", lineHeight: 1.75, marginBottom: "2rem", opacity: heroIn ? 1 : 0, transition: "all 1.1s ease 0.3s" }}>
          Self-serve wellness education. Sovereign data. Human care.
        </p>
        <p style={{ fontSize: "0.72rem", color: muted, letterSpacing: "0.08em", opacity: heroIn ? 1 : 0, transition: "opacity 1.1s ease 0.45s" }}>Wallet connection only &middot; No email required &middot; Pseudonymous by default</p>
      </section>

      <div style={divLine} />

      {/* DOCĒRE THESIS */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
        <span style={{ ...eyebrow, color: gold }}>The Original Meaning of Doctor</span>
        <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.15rem)", color: body, lineHeight: 1.85, marginBottom: "0" }}>
          The word <em style={{ color: white }}>doctor</em> comes from the Latin <em style={{ color: gold }}>doc&#275;re</em>&mdash;to teach. EncryptHealth was built on that original meaning. Rather than centering healthcare around appointments, it centers healthcare around education. Knowledge can be shared. Wisdom can be scaled. A teaching system can reach millions while remaining grounded in evidence-informed wellness methodologies. Participants learn, practice, earn, and grow toward greater health sovereignty. A practitioner who teaches rather than treats is doing something different enough to need a different name. That is why we call them Sovereign Guides.
        </p>
      </section>

      <div style={divLine} />

      {/* WHAT FSL BUILDS */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <span style={eyebrow}>What FSL Builds</span>
        <h2 style={h2base}>Decentralized infrastructure for<br />sovereign wellness education</h2>
        <p style={{ color: body, fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", marginBottom: "3rem" }}>
          FSL is a deployed hybrid Web3 infrastructure where an automated layer teaches and human Sovereign Guides provide all real care. <strong style={{ color: cyan }}>EncryptHealth</strong> is the wellness education platform built on this infrastructure &mdash; a sovereign wellness school, not a clinic. Your wellness record is indexed to your wallet address. Session attestations are recorded on Ethereum Sepolia testnet. IPFS-based decentralized storage is scaffolded. FSL is designed to operate outside HIPAA scope under stated deployment assumptions: it holds zero protected health information by architectural design.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {PILLARS.map((p, i) => (
            <div key={i} style={cardStyle}>
              <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.75rem" }}>{p.icon}</span>
              <div style={{ fontSize: "1rem", color: cyan, marginBottom: "0.6rem" }}>{p.title}</div>
              <p style={{ fontSize: "0.88rem", color: body, lineHeight: 1.72 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={divLine} />

      {/* STIGMA */}
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <span style={eyebrow}>You are not alone in this</span>
        <h2 style={{ ...h2base, textAlign: "center", margin: "0 auto 2rem" }}>Have you ever thought...</h2>
        <div style={{ background: "rgba(0,217,255,0.04)", border: "1px solid rgba(0,217,255,0.12)", borderRadius: "4px", padding: "2.5rem 2rem", maxWidth: "680px", margin: "0 auto 2rem" }}>
          <p style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)", fontStyle: "italic", color: white, opacity: stigmaVis ? 1 : 0, transform: stigmaVis ? "none" : "translateY(8px)", transition: "all 0.45s ease", minHeight: "2.2rem" }}>
            {STIGMAS[stigmaIdx]}
          </p>
        </div>
        <p style={{ color: body, fontSize: "1rem", maxWidth: "580px", margin: "0 auto", lineHeight: 1.78 }}>
          These are not weaknesses. They are the rational response of someone who has learned the system cannot be trusted with their truth.{" "}
          <strong style={{ color: white }}>FSL was built for exactly this moment.</strong> The system teaches. Care stays human. Your data stays yours.
        </p>
      </section>

      <div style={divLine} />

      {/* CURRICULUM */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <span style={eyebrow}>The Curriculum</span>
        <h2 style={h2base}>Learn. Practice. Earn. Grow.</h2>
        <p style={{ color: body, fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", marginBottom: "3rem" }}>
          EncryptHealth is a sovereign wellness school. The system teaches pattern literacy, orthomolecular frameworks, and plant-based nutrition from published literature &mdash; educational self-assessment, never diagnosis. AI surfaces educational information only. A qualified Sovereign Guide provides all real care.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {CURRICULUM.map((e, i) => (
            <div key={i} style={cardStyle}>
              <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.75rem" }}>{e.icon}</span>
              <div style={{ fontSize: "1rem", color: cyan, marginBottom: "0.6rem" }}>{e.title}</div>
              <p style={{ fontSize: "0.88rem", color: body, lineHeight: 1.72 }}>{e.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={divLine} />

      {/* WEB3 */}
      <section style={{ padding: "5rem 1.5rem", background: "rgba(0,217,255,0.02)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <span style={eyebrow}>What is Web3 and why does it protect you?</span>
          <h2 style={h2base}>Think of it like owning your home.</h2>
          <p style={{ color: body, fontSize: "1rem", lineHeight: 1.78, maxWidth: "620px", marginBottom: "2.5rem" }}>
            With traditional health apps, you are renting space in someone else&rsquo;s building. The landlord &mdash; the corporation &mdash; sets the rules. They can sell your data, share it with third parties, or simply shut the doors.{" "}
            <strong style={{ color: white }}>With FSL, you hold the key.</strong> Your wallet &mdash; not an email and password an operator can reset &mdash; controls who reaches your record. Access is granted and revoked by your signature, and every grant is recorded. FSL still operates the database today; client-side encryption, so that FSL cannot read your data even in principle, is scaffolded and specified as the Phase 5 doctoral contribution. What is already true: no algorithm profiles you, no data is sold, and no protected health information is stored at all.
          </p>
          {WEB3_ROWS.map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0.75rem", alignItems: "center", padding: "1.2rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ color: muted, fontSize: "0.88rem", textDecoration: "line-through", textDecorationColor: "rgba(255,80,80,0.4)" }}>{r.old}</div>
              <div style={{ color: cyan, fontSize: "1.1rem", textAlign: "center" }}>{r.icon}&rarr;</div>
              <div style={{ color: white, fontSize: "0.88rem", fontWeight: "bold" }}>{r.next}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={divLine} />

      {/* HOW IT WORKS */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "900px", margin: "0 auto" }}>
        <span style={eyebrow}>How It Works</span>
        <h2 style={h2base}>Three steps.</h2>
        {STEPS.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", padding: "1.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: "2.5rem", color: "rgba(0,217,255,0.18)", fontStyle: "italic", lineHeight: 1, minWidth: "52px" }}>{s.n}</div>
            <div>
              <div style={{ fontSize: "1rem", color: cyan, marginBottom: "0.4rem" }}>{s.title}</div>
              <p style={{ fontSize: "0.9rem", color: body, lineHeight: 1.72 }}>{s.body}</p>
            </div>
          </div>
        ))}
      </section>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)", margin: "0 1.5rem" }} />

      {/* PAYMENT PATHS */}
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "4px", padding: "3rem 2rem", maxWidth: "860px", margin: "0 auto" }}>
          <span style={{ ...eyebrow, color: gold }}>Sovereign Payment Paths</span>
          <h2 style={{ ...h2base, color: gold }}>Pay how you choose.</h2>
          <p style={{ color: body, fontSize: "0.9rem", marginBottom: "2rem" }}>ISO 20022-aligned digital assets. Payment paths coordinated through your Sovereign Guide.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", justifyContent: "center" }}>
            {PAY_LABELS.map((p, i) => {
              const active = i === payIdx;
              return (
                <span key={p} style={{ border: `1px solid ${active ? gold : "rgba(212,175,55,0.25)"}`, color: active ? gold : "rgba(212,175,55,0.55)", padding: "0.5rem 1.2rem", borderRadius: "100px", fontSize: "0.85rem", background: active ? "rgba(212,175,55,0.08)" : "transparent", transition: "all 0.4s ease" }}>{p}</span>
              );
            })}
          </div>
          <p style={{ color: muted, fontSize: "0.72rem", marginTop: "1.25rem" }}>SovereignLedger records session attestations on-chain. All billing flows between you and your Sovereign Guide remain private to that relationship.</p>
        </div>
      </section>

      <div style={divLine} />

      {/* IDENTITY + HIPAA */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
        <span style={eyebrow}>Privacy by Architecture</span>
        <h2 style={h2base}>Designed outside HIPAA scope.</h2>
        <p style={{ color: body, fontSize: "1rem", lineHeight: 1.85, marginBottom: "1.5rem" }}>
          FSL is designed to operate outside HIPAA scope under stated deployment assumptions. It holds zero protected health information by architectural design &mdash; not by compliance, but by the structural impossibility of storing PHI. FSL is not a medical provider and does not offer treatment, diagnosis, or clinical assessment. All AI outputs are educational only.
        </p>
        <p style={{ color: muted, fontSize: "0.85rem", lineHeight: 1.75 }}>
          Wallet connection only. No email. No name. No PII collected. Pseudonymous by default &mdash; your identity is yours to reveal, on your terms.
        </p>
      </section>

      <div style={divLine} />

      {/* FINAL CTA */}
      <section style={{ background: dark, borderTop: "1px solid rgba(0,217,255,0.12)", padding: "6rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ ...h2base, fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}>Begin your sovereign<br />wellness education.</h2>
        <p style={{ color: body, fontSize: "1rem", maxWidth: "480px", margin: "0 auto 2.5rem", lineHeight: 1.78 }}>
          The system teaches. Care stays human. Your data stays yours.
        </p>
        <button onClick={() => window.open("https://encrypthealth.io", "_blank")} style={{ background: cyan, color: dark, border: "none", padding: "1.1rem 3rem", fontSize: "0.88rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", fontFamily: "Georgia,serif", fontWeight: "bold" }}>
          Begin Learning
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2.5rem 1.5rem", textAlign: "center", color: muted, fontSize: "0.75rem", letterSpacing: "0.07em", lineHeight: 2.1 }}>
        <div style={{ color: cyan, marginBottom: "0.4rem", letterSpacing: "0.15em", fontSize: "0.7rem" }}>FUTURE SYSTEMS LAB</div>
        <div>Built by Margarita Monta&ntilde;ez Davenport</div>
        <div style={{ color: body, fontSize: "0.72rem", marginTop: "0.25rem" }}>
          D.N.Psy. &mdash; Doctor of Naturopathic Psychology &nbsp;&middot;&nbsp;
          BCHN &mdash; Board Certified in Holistic Nutrition &nbsp;&middot;&nbsp;
          CBHP &mdash; Certified Blockchain Healthcare Professional
        </div>
        <div>Decentralized infrastructure for sovereign wellness education</div>
        <div style={{ marginTop: "1rem", fontSize: "0.68rem", color: "rgba(122,155,168,0.55)", maxWidth: "600px", margin: "1rem auto 0" }}>
          FSL is decentralized infrastructure for sovereign wellness education &mdash; not a medical provider, not a treatment service. The system teaches; human Sovereign Guides provide all real care. All AI outputs are educational only. Your data. Your sovereignty. Always.
        </div>
      </footer>

    </div>
  );
}
