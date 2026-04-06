import { useState, useEffect } from "react";

const COINS = [
  { symbol: "XRP",  base: 2.18 },
  { symbol: "XLM",  base: 0.112 },
  { symbol: "HBAR", base: 0.078 },
  { symbol: "ALGO", base: 0.19 },
  { symbol: "ADA",  base: 0.44 },
  { symbol: "ETH",  base: 1821.0 },
];

const STIGMAS = [
  '"What if my employer finds out?"',
  '"What if my insurance rates go up?"',
  '"I\'ve been dismissed and medicated, not heard."',
  '"I\'m not ready to say it out loud."',
  '"What if they label me?"',
  '"I don\'t trust the system with this."',
  '"I can\'t afford to be judged."',
  '"My records were lost. Again."',
];

const PILLARS = [
  { icon: "\u{1F4C1}", title: "Own Your Records", body: "Your health history lives in your sovereign wallet \u2014 encrypted, permanent, and controlled by you alone. No hospital server. No corporate database. No one can revoke your access." },
  { icon: "\u{1F469}\u{1F3FD}\u{200D}\u{2695}\u{FE0F}", title: "Invite Your Practitioners", body: "Choose who enters your record. Invite licensed naturopaths, functional medicine providers, hypnotherapists, and more. You grant access. You revoke it. On your terms." },
  { icon: "\u{1F9FE}", title: "Handle Your Own Claims", body: "Submit and track wellness claims directly through SovereignLedger \u2014 our sovereign claims infrastructure. For select practitioners, traditional insurance is also accepted. Your choice, always." },
  { icon: "\u{1F48E}", title: "Pay How You Choose", body: "Crypto, fiat, HSA/FSA, or ISO 20022-aligned digital assets. No gatekeeping. No bank required. Sovereign payment paths built for the future of health." },
];

const ESOTERIC = [
  { icon: "\u{1F33F}", title: "Plant Intelligence", body: "Before pharmaceutical patents, the earth was the pharmacy. FSL integrates plant-based nutrition, adaptogens, and phytonutrient data into your sovereign health record \u2014 honoring the original medicine." },
  { icon: "\u{1F52E}", title: "Your Body Already Knows", body: "Your body has been speaking through fatigue, cravings, patterns, and frequency. FSL gives you the data to finally remember \u2014 your correlations returned to you as evidence, not diagnosis." },
  { icon: "\u{1F311}", title: "Shadow Into Light", body: "True wellness includes what we haven\u2019t wanted to look at. Through AlchemistForge, shadow aspects become integration points \u2014 Jungian archetypes meet on-chain permanence. Your whole self, witnessed." },
  { icon: "\u{1F91D}", title: "Sovereign Community", body: "Healing was never meant to be solitary. Connect with practitioners who speak frequency, and a community of sovereign individuals on their own return-to-self journey. Anonymous when you need it." },
];

const WEB3_ROWS = [
  { old: "Records stored on a hospital server",      next: "Records live in your sovereign encrypted wallet", icon: "\u{1F3DB}\u{FE0F}" },
  { old: "A corporation decides who sees your data", next: "You decide who sees your data. Every time.",      icon: "\u{1F511}" },
  { old: "Your history can be used against you",     next: "Your history belongs only to you. Always.",       icon: "\u{1F6E1}\u{FE0F}" },
  { old: "Insurance company controls your claims",   next: "You submit and track claims through SovereignLedger", icon: "\u{1F9FE}" },
];

const STEPS = [
  { n: "01", title: "Arrive Sovereignly",          body: "Connect your Web3 wallet to begin. No name, no email, no social login \u2014 just your wallet signature. Your identity stays yours to reveal, on your terms, in your time." },
  { n: "02", title: "Build Your Sovereign Record", body: "Track mood, nutrition, energy, and patterns. Invite practitioners. Your data builds a living map of your frequency \u2014 visible only to you." },
  { n: "03", title: "Own Everything You\u2019ve Built", body: "Every entry encrypted and anchored to your sovereign wallet. Submit claims, manage payments, and share records on your terms. No middleman. No expiration." },
];

const PAY_LABELS = ["XRP","XLM","HBAR","ALGO","ADA","ETH","Fiat","HSA/FSA","Insurance*"];

function useFakePrices() {
  const [prices, setPrices] = useState(
    COINS.map((c) => ({ ...c, price: c.base, change: (Math.random() - 0.5) * 2 }))
  );
  useEffect(() => {
    const id = setInterval(() => {
      setPrices((prev) =>
        prev.map((c) => {
          const delta = (Math.random() - 0.48) * 0.007;
          const newPrice = c.price * (1 + delta);
          const change = ((newPrice - c.base) / c.base) * 100;
          return { ...c, price: newPrice, change };
        })
      );
    }, 2200);
    return () => clearInterval(id);
  }, []);
  return prices;
}

function fmt(n) {
  if (n >= 100) return n.toFixed(2);
  if (n >= 1)   return n.toFixed(3);
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
  const prices = useFakePrices();
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
            const up = c.change >= 0;
            return (
              <span key={idx} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.72rem", letterSpacing: "0.06em" }}>
                <span style={{ color: cyan, fontWeight: "bold" }}>{c.symbol}</span>
                <span style={{ color: white }}>${fmt(c.price)}</span>
                <span style={{ color: up ? "#00E676" : "#FF5252", fontSize: "0.65rem" }}>{up ? "\u25B2" : "\u25BC"} {Math.abs(c.change).toFixed(2)}%</span>
                <span style={{ color: "rgba(0,217,255,0.25)", marginLeft: "0.5rem" }}>\u25C6</span>
              </span>
            );
          })}
          <span style={{ color: "rgba(0,217,255,0.4)", fontSize: "0.63rem", letterSpacing: "0.12em" }}>ISO 20022-ALIGNED SOVEREIGN PAYMENTS \u25C6</span>
        </div>
      </div>

      {/* NAV */}
      <nav style={{ display: "flex", alignItems: "center", padding: "1rem 1.5rem", borderBottom: "1px solid rgba(0,217,255,0.08)", position: "sticky", top: 0, zIndex: 100, background: "rgba(3,11,15,0.95)", backdropFilter: "blur(12px)" }}>
        <span style={{ color: cyan, fontSize: "0.85rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>Future Systems Lab</span>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "88vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "3rem 1.5rem 2rem", background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,217,255,0.07) 0%, transparent 70%)" }}>
        <span style={{ ...eyebrow, marginBottom: "1.2rem", opacity: heroIn ? 1 : 0, transition: "opacity 1s" }}>The First Decentralized Sovereign Wellness Platform</span>
        <h1 style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)", lineHeight: 1.12, fontWeight: "normal", marginBottom: "1.2rem", maxWidth: "820px", opacity: heroIn ? 1 : 0, transform: heroIn ? "none" : "translateY(24px)", transition: "all 1.1s ease 0.15s" }}>
          Your health records.<br />Your practitioners.<br />Your claims.<br />
          <span style={{ color: cyan, fontStyle: "italic" }}>Your sovereignty.</span>
        </h1>
        <p style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)", color: body, maxWidth: "560px", lineHeight: 1.75, marginBottom: "2rem", opacity: heroIn ? 1 : 0, transition: "all 1.1s ease 0.3s" }}>
          Own your encrypted health record. Invite the practitioners you trust. Submit and track your own claims. Pay with crypto, fiat, or insurance &mdash; anonymously, without shame, without surveillance.
        </p>
        <p style={{ fontSize: "0.72rem", color: muted, letterSpacing: "0.08em", opacity: heroIn ? 1 : 0, transition: "opacity 1.1s ease 0.45s" }}>Wallet connection only &middot; No email required &middot; Your data never leaves your control</p>
      </section>

      <div style={divLine} />

      {/* PILLARS */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <span style={eyebrow}>What FSL Actually Is</span>
        <h2 style={h2base}>A platform where you hold<br />every key.</h2>
        <p style={{ color: body, fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", marginBottom: "3rem" }}>
          FSL is not a wellness app. It is sovereign infrastructure &mdash; a place where your health data, your care team, your claims, and your payments are controlled entirely by you. For the first time.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {PILLARS.map((p) => (
            <div key={p.title} style={cardStyle}>
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
          <strong style={{ color: white }}>FSL was built for exactly this moment.</strong>
        </p>
      </section>

      <div style={divLine} />

      {/* ESOTERIC */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <span style={eyebrow}>The Original Medicine</span>
        <h2 style={h2base}>Sovereignty is not new.<br />We are simply remembering.</h2>
        <p style={{ color: body, fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", marginBottom: "3rem" }}>
          Before pharmaceutical patents. Before insurance codes. Before the system decided what was wrong with <em>us</em> &mdash; there was plant intelligence, community healing, and the radical knowing that you were never broken. FSL honors that lineage and equips it with sovereign technology.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {ESOTERIC.map((e) => (
            <div key={e.title} style={cardStyle}>
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
            With traditional health apps, you are renting space in someone else&rsquo;s building. The landlord &mdash; the corporation &mdash; sets the rules. They can sell your data, share it with insurers, or simply shut the doors.{" "}
            <strong style={{ color: white }}>With FSL, you own the deed.</strong> Decentralized technology means no single company holds your records. No one can revoke your access. No algorithm uses your truth against you.
          </p>
          {WEB3_ROWS.map((r) => (
            <div key={r.old} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0.75rem", alignItems: "center", padding: "1.2rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
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
        <h2 style={h2base}>Three steps. No jargon. No compromise.</h2>
        {STEPS.map((s) => (
          <div key={s.n} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", padding: "1.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
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
          <h2 style={{ ...h2base, color: gold }}>Pay how you choose.<br />That is sovereignty.</h2>
          <p style={{ color: body, fontSize: "0.9rem", marginBottom: "2rem" }}>ISO 20022-aligned digital assets, fiat, or HSA/FSA. Insurance accepted for select practitioners.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", justifyContent: "center" }}>
            {PAY_LABELS.map((p, i) => {
              const active = i === payIdx;
              return (
                <span key={p} style={{ border: `1px solid ${active ? gold : "rgba(212,175,55,0.25)"}`, color: active ? gold : "rgba(212,175,55,0.55)", padding: "0.5rem 1.2rem", borderRadius: "100px", fontSize: "0.85rem", background: active ? "rgba(212,175,55,0.08)" : "transparent", transition: "all 0.4s ease" }}>{p}</span>
              );
            })}
          </div>
          <p style={{ color: muted, fontSize: "0.72rem", marginTop: "1.25rem" }}>*Insurance accepted for licensed practitioners on select plans via SovereignLedger</p>
        </div>
      </section>

      <div style={divLine} />

      {/* MANIFESTO */}
      <section style={{ textAlign: "center", padding: "7rem 1.5rem", background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,217,255,0.05) 0%, transparent 70%)" }}>
        <p style={{ fontSize: "clamp(1.4rem, 4vw, 2.5rem)", fontStyle: "italic", fontWeight: "normal", lineHeight: 1.45, maxWidth: "780px", margin: "0 auto 1.75rem", color: white }}>
          &ldquo;This is not treatment.<br />This is not a diagnosis.<br />This is your frequency,<br /><span style={{ color: cyan }}>returned to you.</span>&rdquo;
        </p>
        <p style={{ color: body, fontSize: "0.95rem", maxWidth: "560px", margin: "0 auto 2rem", lineHeight: 1.8 }}>
          FSL is a platform for connection, education, and empowerment. We do not prescribe. We do not diagnose. We give you the data, the community, and the sovereign infrastructure to make your own informed decisions about your own sacred body.
        </p>
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.22em", color: "rgba(0,217,255,0.5)", textTransform: "uppercase" }}>
          Where Mental Wellness Meets Metaverse &middot; Future Systems Lab
        </span>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: dark, borderTop: "1px solid rgba(0,217,255,0.12)", padding: "6rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ ...h2base, fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}>You have always been<br />your own medicine.</h2>
        <p style={{ color: body, fontSize: "1rem", maxWidth: "480px", margin: "0 auto 2.5rem", lineHeight: 1.78 }}>
          Come home to yourself. Anonymously, safely, sovereignly. The record has always been yours &mdash; we just built a place to keep it.
        </p>
        <button style={{ background: cyan, color: dark, border: "none", padding: "1.1rem 3rem", fontSize: "0.88rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", fontFamily: "Georgia,serif", fontWeight: "bold" }}>
          Claim Your Sovereign Record
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2.5rem 1.5rem", textAlign: "center", color: muted, fontSize: "0.75rem", letterSpacing: "0.07em", lineHeight: 2.1 }}>
        <div style={{ color: cyan, marginBottom: "0.4rem", letterSpacing: "0.15em", fontSize: "0.7rem" }}>FUTURE SYSTEMS LAB</div>
        <div>Built by Dr. Meg Monta&ntilde;ez-Davenport</div>
        <div style={{ color: body, fontSize: "0.72rem", marginTop: "0.25rem" }}>
          D.N.Psy. &mdash; Doctor of Naturopathic Psychology &nbsp;&middot;&nbsp;
          BCHN &mdash; Board Certified in Holistic Nutrition &nbsp;&middot;&nbsp;
          CBHP &mdash; Certified Blockchain Healthcare Professional
        </div>
        <div>Pioneering decentralized Web3 sovereign wellness infrastructure</div>
        <div style={{ marginTop: "1rem", fontSize: "0.68rem", color: "rgba(122,155,168,0.55)", maxWidth: "600px", margin: "1rem auto 0" }}>
          FSL is a wellness education and empowerment platform &mdash; not a medical provider, not a treatment service. All AI outputs use wellness language only and are never diagnostic. Your data. Your sovereignty. Always.
        </div>
      </footer>

    </div>
  );
}
