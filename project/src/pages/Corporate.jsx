/* global React, Link, CLIENTS, COURSES, SectionHead, Eyebrow, Arrow, ArrowUpRight, Check, Mood, cx */
const { useState: useStateCP } = React;

function Corporate() {
  return (
    <>
      <CPHero/>
      <CPClients/>
      <CPProof/>
      <CPBenefits/>
      <CPApproach/>
      <CPFormats/>
      <CPROI/>
      <CPCaseStudy/>
      <CPCta/>
    </>
  );
}

function CPHero() {
  return (
    <section className="cp-hero">
      <div className="wrap">
        <div className="cp-hero-meta">
          <span className="mono">§ For enterprise</span>
          <span className="mono muted">Training &amp; certification at scale</span>
          <span className="mono muted">312 programs delivered · 42 countries</span>
        </div>
        <div className="cp-hero-grid">
          <div>
            <div className="chip chip-accent" style={{ marginBottom: 24 }}>For CHROs, CTOs &amp; L&amp;D leaders</div>
            <h1 className="cp-hero-title">
              Build the <span className="italic serif">bench</span><br/>
              your next five<br/>
              years will need.
            </h1>
          </div>
          <div className="cp-hero-side">
            <p className="lead">
              We partner with engineering, operations and program leaders to build
              training that ladders into measurable capability. Curriculum design,
              baseline assessments, cohort delivery and 360° outcome reporting —
              one accountable partner, one measurable program, one standard of craft.
            </p>
            <div className="cp-hero-cta">
              <Link to="/contact" className="btn btn-primary btn-lg">Book a consultation <Arrow/></Link>
              <a className="btn btn-ghost btn-lg" href="#cp-approach">How we work</a>
            </div>
            <div className="cp-hero-trust mono">
              <Check/> SOC 2 Type II · ISO 27001 · GDPR-ready
            </div>
          </div>
        </div>
        <div className="cp-hero-stats">
          {[
            ["312","ENTERPRISE PROGRAMS","delivered across 42 countries"],
            ["2.4×","CAPABILITY LIFT","measured at 90-day outcome review"],
            ["68%","YEAR-TWO RENEWAL","clients who return for a second program"],
            ["96%","FIRST-ATTEMPT","certification pass rate, enterprise cohorts"],
          ].map(([v,l,s],i) => (
            <div key={i} className="cp-hero-stat">
              <div className="serif">{v}</div>
              <div className="mono" style={{ color: "var(--ink-2)", fontSize: 11, marginTop: 10 }}>{l}</div>
              <div className="mono muted" style={{ fontSize: 11, marginTop: 4 }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .cp-hero { padding-block: var(--s-8) var(--s-9); border-bottom: 1px solid var(--line); }
        .cp-hero-meta { display:flex; gap: 24px; padding-bottom: 22px; border-bottom: 1px solid var(--line); font-size: 11px; flex-wrap: wrap; }
        .cp-hero-grid { margin-top: 56px; display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 80px; align-items: flex-end; }
        .cp-hero-title { font-family: var(--ff-serif); font-weight: 400; font-size: clamp(64px, 9.5vw, 156px); line-height: 0.92; letter-spacing: -0.04em; margin: 0; }
        .cp-hero-side { padding-bottom: 16px; }
        .cp-hero-cta { display:flex; gap: 10px; margin-top: 32px; flex-wrap: wrap; }
        .cp-hero-trust { margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--line); font-size: 11px; color: var(--ink-3); display: flex; align-items: center; gap: 8px; letter-spacing: 0.04em; }
        .cp-hero-trust svg { color: var(--accent); }
        .cp-hero-stats { margin-top: 96px; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--line); }
        .cp-hero-stat { padding: 32px 28px 8px 0; border-right: 1px solid var(--line); display: flex; flex-direction: column; }
        .cp-hero-stat:last-child { border-right: 0; }
        .cp-hero-stat .serif { font-size: clamp(48px, 5.5vw, 88px); letter-spacing: -0.035em; line-height: 0.88; }
        .cp-hero-stat .mono { max-width: 24ch; line-height: 1.4; letter-spacing: 0.04em; }
        @media (max-width: 900px) { .cp-hero-grid { grid-template-columns: 1fr; } .cp-hero-stats { grid-template-columns: repeat(2,1fr); } .cp-hero-stat { border-bottom: 1px solid var(--line); padding-right: 16px; } }
      `}</style>
    </section>
  );
}

function CPClients() {
  return (
    <section style={{ padding: "48px 0", borderBottom: "1px solid var(--line)", background: "var(--bg-alt)" }}>
      <div className="wrap">
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-4)", textAlign: "center", marginBottom: 28 }}>Partnering with engineering &amp; program leaders at</div>
        <div style={{ display: "flex", gap: 56, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
          {CLIENTS.slice(0,8).map((c, i) => (
            <span key={i} className="serif" style={{ fontSize: 24, color: "var(--ink-3)", letterSpacing: "-0.01em" }}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CPProof() {
  return (
    <section className="cp-proof">
      <div className="wrap">
        <div className="cp-proof-grid">
          <div className="cp-proof-quote">
            <svg width="40" height="32" viewBox="0 0 40 32" fill="none" style={{ color: "var(--accent)", marginBottom: 24 }}>
              <path d="M0 32V20Q0 8 8 0H14Q8 8 8 20H16V32H0ZM24 32V20Q24 8 32 0H38Q32 8 32 20H40V32H24Z" fill="currentColor"/>
            </svg>
            <blockquote className="serif">
              We sent 140 engineers through the Kubernetes track in four months.
              Incident MTTR fell by 38%, and our on-call rotations stopped bleeding people.
              That's not a training outcome. That's a <span className="italic">business</span> outcome.
            </blockquote>
            <div className="cp-proof-by">
              <div>
                <div className="serif" style={{ fontSize: 17, letterSpacing: "-0.01em" }}>Martin Okafor</div>
                <div className="mono muted" style={{ fontSize: 11 }}>VP Engineering · Logistics platform</div>
              </div>
              <div className="cp-proof-metric">
                <div className="mono muted" style={{ fontSize: 10 }}>VERIFIED</div>
                <div className="serif" style={{ fontSize: 16 }}>140 engineers · 38% ↓ MTTR</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .cp-proof { padding-block: var(--s-9); }
        .cp-proof-grid { max-width: 900px; margin: 0 auto; }
        .cp-proof-quote blockquote { font-family: var(--ff-serif); font-weight: 400; font-size: clamp(28px, 3.4vw, 44px); line-height: 1.15; letter-spacing: -0.02em; margin: 0; max-width: 22ch; }
        .cp-proof-by { margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap; }
        .cp-proof-metric { text-align: right; }
      `}</style>
    </section>
  );
}

function CPBenefits() {
  const items = [
    { n: "I.", t: "Capability, not hours", d: "We measure what your team can do at week 0 and week 12. The delta is your ROI — not attendance, not NPS, not hours logged." },
    { n: "II.", t: "Curriculum that fits", d: "Every program is co-designed against your tech stack, certification targets and operating model. Labs run on your infrastructure where possible. Zero reused decks." },
    { n: "III.", t: "One accountable partner", d: "Program management, instructors, assessments, reporting — one point of contact, one accountable partner. We handle the rest." },
    { n: "IV.", t: "Built to renew", d: "68% of enterprise clients renew year two. Because year one worked — we baseline, measure and report outcomes your CFO can defend." },
  ];
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead index="§ 02" eyebrow="What's different" align="split" title={<>Four commitments that <span className="italic serif">change</span> outcomes.</>} sub="Enterprise training is littered with platforms that feel like compliance. We built the studio for leaders who answer to P&L — and who need training to show up on it."/>
        <div className="cpb">
          {items.map((b, i) => (
            <div key={i} className="cpb-row">
              <div className="cpb-n serif">{b.n}</div>
              <div className="cpb-t serif">{b.t}</div>
              <div className="cpb-d">{b.d}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .cpb { margin-top: 56px; border-top: 1px solid var(--line); }
        .cpb-row { display: grid; grid-template-columns: 80px 1.2fr 1.8fr; gap: 48px; padding: 40px 0; border-bottom: 1px solid var(--line); align-items: start; }
        .cpb-n { font-size: 48px; letter-spacing: -0.02em; color: var(--accent); line-height: 1; }
        .cpb-t { font-size: clamp(28px, 2.8vw, 40px); letter-spacing: -0.02em; line-height: 1.05; }
        .cpb-d { font-size: 16px; color: var(--ink-3); line-height: 1.6; max-width: 56ch; padding-top: 10px; }
        @media (max-width: 820px) { .cpb-row { grid-template-columns: 1fr; gap: 12px; padding: 32px 0; } }
      `}</style>
    </section>
  );
}

function CPApproach() {
  const steps = [
    { k: "Discover", d: "A 90-minute working session. We map roles, current capability, business outcomes you're after — and what would be measurably different in twelve months.", wk: "Week 0" },
    { k: "Design", d: "We build a syllabus against your stack, certifications, timezones. Dry-run with your stakeholders. Sign-off before kick-off.", wk: "Weeks 1–2" },
    { k: "Deliver", d: "Live cohorts, labs on your infrastructure, weekly critiques. Dedicated program manager embedded with your team throughout.", wk: "Weeks 3–14" },
    { k: "Measure", d: "Baseline vs. outcome assessment. Manager 360°. Certification pass rates. A dashboard you can take to your CFO with confidence.", wk: "Week 15" },
    { k: "Renew", d: "We meet at 90 days, 6 months and 12 months. Calibrate the next cohort. Widen or deepen the bench. Compound the capability.", wk: "Year 2" },
  ];
  return (
    <section id="cp-approach" className="section" style={{ background: "var(--ink)", color: "var(--bg)" }}>
      <div className="wrap">
        <div className="cpa-head">
          <Eyebrow index="§ 03" label="How we work"/>
          <div className="cpa-head-grid">
            <h2 className="h1" style={{ color: "var(--bg)", marginTop: 24, maxWidth: "18ch" }}>
              Five stages.<br/>One <span className="italic serif">accountable</span> partnership.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 17, lineHeight: 1.5, maxWidth: 52 + "ch", alignSelf: "flex-end", paddingBottom: 8 }}>
              A fixed-scope engagement model, the same every time, from the 90-minute working session
              to the twelve-month outcome review. Your team gets one partner. Your CFO gets numbers.
            </p>
          </div>
        </div>
        <div className="cpa-steps">
          {steps.map((s, i) => (
            <div key={i} className="cpa-step">
              <div className="cpa-step-top">
                <span className="mono">0{i+1}</span>
                <span className="mono" style={{ opacity: 0.5 }}>{s.wk}</span>
              </div>
              <div className="cpa-step-k serif">{s.k}</div>
              <div className="cpa-step-d">{s.d}</div>
              <div className="cpa-step-bar"/>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .cpa-head { padding-bottom: 56px; border-bottom: 1px solid rgba(255,255,255,0.12); }
        .cpa-head-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 80px; align-items: flex-end; }
        .cpa-steps { margin-top: 56px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; }
        .cpa-step { padding: 32px 28px 32px 0; border-right: 1px solid rgba(255,255,255,0.12); display: flex; flex-direction: column; gap: 12px; }
        .cpa-step:last-child { border-right: 0; padding-right: 0; }
        .cpa-step-top { display: flex; justify-content: space-between; font-size: 10px; letter-spacing: 0.06em; }
        .cpa-step-k { font-size: clamp(30px, 3vw, 42px); letter-spacing: -0.02em; color: var(--bg); }
        .cpa-step-d { font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.55; }
        .cpa-step-bar { height: 2px; background: var(--accent); margin-top: auto; width: 36px; }
        @media (max-width: 1000px) { .cpa-head-grid { grid-template-columns: 1fr; gap: 24px; } .cpa-steps { grid-template-columns: repeat(2, 1fr); } .cpa-step { border-bottom: 1px solid rgba(255,255,255,0.12); padding: 24px; } }
      `}</style>
    </section>
  );
}

function CPFormats() {
  const fmts = [
    { k: "Cohort program", s: "12–16 week structured track, live instruction, 20–40 seats.", ideal: "Engineering teams, certification drives, onboarding programs.", size: "20–40 seats", price: "From $89k" },
    { k: "Executive intensive", s: "1–2 week offsite. Small group. Senior leaders, high-intensity.", ideal: "Leadership transitions, new-scope prep, director+ cohorts.", size: "8–16 seats", price: "From $124k" },
    { k: "Custom bootcamp", s: "2–5 day immersive, on-site or hybrid. Labs on your stack.", ideal: "Migration accelerators, new stack introductions, reorgs.", size: "Up to 80 seats", price: "From $46k" },
    { k: "Fractional academy", s: "A standing program. We run it; you own the outcomes.", ideal: "Fortune-500 with recurring capability needs across functions.", size: "Unlimited", price: "Annual retainer" },
  ];
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead index="§ 04" eyebrow="Formats" align="split" title={<>Four formats. <span className="italic serif">Pick the one that fits.</span></>} sub="We start with your constraints — timezones, travel, budget, cohort size — and recommend the format that will compound in your org, not ours."/>
        <div className="cpf">
          {fmts.map((f, i) => (
            <div key={i} className="cpf-card">
              <div className="cpf-num mono">0{i+1}</div>
              <div className="cpf-k serif">{f.k}</div>
              <div className="cpf-s">{f.s}</div>
              <div className="cpf-stats">
                <div><span className="mono muted">Size</span><span>{f.size}</span></div>
                <div><span className="mono muted">Investment</span><span>{f.price}</span></div>
              </div>
              <div className="cpf-div"/>
              <div className="mono muted" style={{ fontSize: 10, letterSpacing: "0.08em" }}>IDEAL FOR</div>
              <div className="cpf-ideal">{f.ideal}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .cpf { margin-top: 56px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .cpf-card { padding: 32px 28px; border: 1px solid var(--line); border-radius: 16px; display: flex; flex-direction: column; gap: 12px; background: var(--surface); min-height: 360px; transition: border-color .3s var(--ease), transform .4s var(--ease-out); }
        .cpf-card:hover { border-color: var(--ink-5); transform: translateY(-2px); }
        .cpf-num { font-size: 11px; color: var(--accent); letter-spacing: 0.06em; }
        .cpf-k { font-size: 28px; letter-spacing: -0.02em; line-height: 1.1; }
        .cpf-s { font-size: 14px; color: var(--ink-3); line-height: 1.55; }
        .cpf-stats { margin-top: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px; }
        .cpf-stats > div { display: flex; flex-direction: column; gap: 2px; }
        .cpf-stats .mono { font-size: 10px; letter-spacing: 0.06em; }
        .cpf-stats > div > span:last-child { font-family: var(--ff-serif); font-size: 15px; letter-spacing: -0.01em; }
        .cpf-div { height: 1px; background: var(--line); margin-block: 10px 2px; }
        .cpf-ideal { font-size: 13px; color: var(--ink-2); line-height: 1.5; margin-top: auto; }
        @media (max-width: 1000px) { .cpf { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 580px) { .cpf { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

function CPROI() {
  return (
    <section className="section" style={{ background: "var(--bg-alt)", borderBlock: "1px solid var(--line)" }}>
      <div className="wrap">
        <SectionHead index="§ 05" eyebrow="Outcomes" align="split" title={<>The numbers we <span className="italic serif">report back</span> to CFOs.</>} sub="We track outcomes for twelve months post-program. These are a sample from last year's enterprise cohort — verified by client-side assessment."/>
        <div className="cpr">
          {[
            { v: "38%", l: "Incident MTTR reduction — logistics platform, 140 engineers through Kubernetes track.", c: "$4.8M infrastructure savings Y1" },
            { v: "$2.1M", l: "Annualised waste eliminated — CPG manufacturer, Six Sigma Black Belt capstone.", c: "6× program ROI in Y1" },
            { v: "94%", l: "First-attempt PMP pass rate — consulting firm, 60-person PMO uplift.", c: "$1.2M in billable uplift" },
            { v: "2.8×", l: "Increase in cloud-certified engineers in 12 months — fintech scale-up.", c: "Unblocked 3 strategic migrations" },
          ].map((s, i) => (
            <div key={i} className="cpr-row">
              <span className="serif cpr-v">{s.v}</span>
              <div className="cpr-body">
                <span className="cpr-l">{s.l}</span>
                <span className="mono cpr-c">{s.c}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .cpr { margin-top: 56px; border-top: 1px solid var(--line); }
        .cpr-row { display: grid; grid-template-columns: 240px 1fr; gap: 48px; padding: 40px 0; border-bottom: 1px solid var(--line); align-items: center; }
        .cpr-v { font-size: clamp(64px, 7vw, 104px); letter-spacing: -0.035em; line-height: 0.88; color: var(--accent); }
        .cpr-body { display: flex; flex-direction: column; gap: 12px; max-width: 58ch; }
        .cpr-l { font-size: clamp(19px, 1.9vw, 26px); color: var(--ink-2); line-height: 1.3; font-family: var(--ff-serif); letter-spacing: -0.015em; }
        .cpr-c { font-size: 11px; color: var(--ink-4); letter-spacing: 0.06em; }
        @media (max-width: 720px) { .cpr-row { grid-template-columns: 1fr; gap: 12px; } }
      `}</style>
    </section>
  );
}

function CPCaseStudy() {
  return (
    <section className="section">
      <div className="wrap">
        <Eyebrow index="§ 06" label="Illustrative engagement"/>
        <div className="cs-card">
          <div className="cs-left">
            <div className="mono muted" style={{ fontSize: 11, letterSpacing: "0.06em" }}>CLIENT PROFILE</div>
            <div className="serif cs-profile">Global fintech · 2,400 engineers · NY / London / Bangalore</div>
            <div className="cs-problem">
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.08em", color: "var(--accent)" }}>THE ASK</div>
              <p>Migrate 800 engineers from on-prem to AWS within 18 months. Existing
              training vendors were delivering attendance — not capability.</p>
            </div>
          </div>
          <div className="cs-right">
            <div className="mono muted" style={{ fontSize: 11, letterSpacing: "0.06em" }}>OUR RESPONSE · 14-MONTH ENGAGEMENT</div>
            <ul className="cs-steps">
              <li><span className="mono">01</span>Baseline assessment — 2,400 engineers, mapped against AWS Well-Architected.</li>
              <li><span className="mono">02</span>Cohort program built against the client's three Landing Zones and golden paths.</li>
              <li><span className="mono">03</span>24 cohorts of 20 delivered over 12 months across 3 timezones.</li>
              <li><span className="mono">04</span>90-day and 12-month outcome assessment with manager 360°.</li>
            </ul>
            <div className="cs-results">
              <div><div className="serif">89%</div><div className="mono muted">SAA-C03 first-attempt pass</div></div>
              <div><div className="serif">$8.4M</div><div className="mono muted">Y1 infrastructure savings</div></div>
              <div><div className="serif">26 mo</div><div className="mono muted">Migration completed early</div></div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .cs-card { margin-top: 40px; background: var(--surface); border: 1px solid var(--line); border-radius: 16px; display: grid; grid-template-columns: 0.8fr 1.2fr; overflow: hidden; }
        .cs-left { padding: 48px; background: var(--ink); color: var(--bg); display: flex; flex-direction: column; gap: 24px; justify-content: space-between; }
        .cs-left .mono.muted { color: rgba(255,255,255,0.55); }
        .cs-profile { font-size: clamp(22px, 2.4vw, 32px); letter-spacing: -0.02em; line-height: 1.15; color: var(--bg); max-width: 18ch; }
        .cs-problem { padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.15); display: flex; flex-direction: column; gap: 10px; }
        .cs-problem p { color: rgba(255,255,255,0.75); font-size: 15px; line-height: 1.55; margin: 0; max-width: 36ch; }
        .cs-right { padding: 48px; display: flex; flex-direction: column; gap: 20px; }
        .cs-steps { list-style: none; padding: 0; margin: 12px 0 0; display: flex; flex-direction: column; gap: 0; }
        .cs-steps li { display: grid; grid-template-columns: 48px 1fr; gap: 16px; padding: 16px 0; border-top: 1px solid var(--line); font-size: 15px; color: var(--ink-2); line-height: 1.5; }
        .cs-steps .mono { font-size: 11px; color: var(--accent); padding-top: 2px; }
        .cs-results { margin-top: 24px; padding-top: 28px; border-top: 1px solid var(--line); display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .cs-results > div { display: flex; flex-direction: column; gap: 6px; }
        .cs-results .serif { font-size: clamp(32px, 3.4vw, 48px); letter-spacing: -0.025em; line-height: 0.9; color: var(--accent); }
        .cs-results .mono { font-size: 11px; letter-spacing: 0.04em; }
        @media (max-width: 900px) { .cs-card { grid-template-columns: 1fr; } .cs-left, .cs-right { padding: 32px; } }
      `}</style>
    </section>
  );
}

function CPCta() {
  return (
    <section className="section-sm">
      <div className="wrap">
        <div className="cp-cta">
          <div>
            <Eyebrow index="§ 07" label="Next step"/>
            <div className="h1 cp-cta-title">Let's design a <span className="italic serif">program</span> around your team.</div>
            <p className="lead" style={{ marginTop: 20, maxWidth: "52ch" }}>
              A no-obligation 45-minute session with one of our senior engagement leads.
              We'll scope what's possible and send a written proposal within five business days.
            </p>
          </div>
          <div className="cp-cta-side">
            <div style={{ display:"flex", gap: 10, flexWrap: "wrap" }}>
              <Link to="/contact" className="btn btn-primary btn-lg">Book a consultation <Arrow/></Link>
              <a className="btn btn-ghost btn-lg" href="mailto:teams@learningartistry.com">teams@learningartistry.com</a>
            </div>
            <div className="cp-cta-bullets">
              <div><Check/>No-obligation, 45-minute working session</div>
              <div><Check/>Written proposal in 5 business days</div>
              <div><Check/>MSAs &amp; global invoicing available</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .cp-cta { padding: 56px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 80px; align-items: center; }
        .cp-cta-title { max-width: 18ch; margin-top: 20px; }
        .cp-cta-side { display: flex; flex-direction: column; gap: 24px; }
        .cp-cta-bullets { padding-top: 20px; border-top: 1px solid var(--line); display: flex; flex-direction: column; gap: 10px; font-size: 14px; color: var(--ink-3); }
        .cp-cta-bullets > div { display: flex; align-items: center; gap: 10px; }
        .cp-cta-bullets svg { color: var(--accent); }
        @media (max-width: 900px) { .cp-cta { grid-template-columns: 1fr; gap: 40px; } }
      `}</style>
    </section>
  );
}

window.Corporate = Corporate;
