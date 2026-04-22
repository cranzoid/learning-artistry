/* global React, Link, INSTRUCTORS, SectionHead, Eyebrow, Arrow, ArrowUpRight, Placeholder, Mood, cx */

function About() {
  return (
    <>
      <AHero/>
      <AManifesto/>
      <AMilestones/>
      <ATeam/>
      <AValues/>
      <ACta/>
    </>
  );
}

function AHero() {
  return (
    <section style={{ padding: "var(--s-8) 0 var(--s-9)", borderBottom: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="mono" style={{ fontSize: 11, paddingBottom: 20, borderBottom: "1px solid var(--line)", display: "flex", gap: 20 }}>
          <span>§ About</span>
          <span className="muted">Est. 2019 · London · Singapore · Austin</span>
        </div>
        <h1 style={{ fontFamily: "var(--ff-serif)", fontWeight: 400, fontSize: "clamp(64px, 10vw, 168px)", lineHeight: 0.92, letterSpacing: "-0.04em", marginTop: 40 }}>
          A studio,<br/>not a <span className="italic">platform</span>.
        </h1>
        <p className="lead" style={{ marginTop: 32, maxWidth: "58ch" }}>
          The Learning Artistry was founded by four practitioners who'd each spent a decade teaching on the side —
          and who agreed, one night in London, that what the training industry rewarded and what learners actually needed had drifted too far apart.
          We started the studio to close the gap.
        </p>
      </div>
    </section>
  );
}

function AManifesto() {
  const lines = [
    "We believe mastery takes time.",
    "We believe the best teachers are still practitioners.",
    "We believe cohorts of twenty learn more than cohorts of two hundred.",
    "We believe certifications are a beginning, not an end.",
    "We believe a studio — small, craft-obsessed, accountable — is the right shape for this work.",
  ];
  return (
    <section className="section" style={{ background: "var(--bg-alt)", borderBottom: "1px solid var(--line)" }}>
      <div className="wrap">
        <Eyebrow index="§ 01" label="Manifesto"/>
        <div style={{ marginTop: 40 }}>
          {lines.map((l, i) => (
            <div key={i} className="a-line">
              <span className="mono">{String(i+1).padStart(2,"0")}</span>
              <span className="serif">{l}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .a-line { display: grid; grid-template-columns: 60px 1fr; gap: 30px; padding: 28px 0; border-top: 1px solid var(--line); align-items: baseline; }
        .a-line:last-child { border-bottom: 1px solid var(--line); }
        .a-line .mono { font-size: 12px; color: var(--accent); padding-top: 14px; }
        .a-line .serif { font-size: clamp(28px, 4vw, 52px); letter-spacing: -0.02em; line-height: 1.1; }
      `}</style>
    </section>
  );
}

function AMilestones() {
  const ms = [
    { y: "2019", t: "Founded in London", d: "Four practitioners, four courses, a rented back room above a bookshop in Clerkenwell." },
    { y: "2021", t: "First enterprise cohort", d: "A fintech asked us to train forty engineers on AWS. We said yes, rebuilt the program three times, and learned what we were actually good at." },
    { y: "2023", t: "Singapore studio opens", d: "Asia-Pacific cohorts grew past 40% of enrolments. We followed the learners." },
    { y: "2025", t: "Austin studio opens", d: "The Americas studio, hired from our own alumni. Full loop." },
    { y: "2026", t: "18,000 alumni · 312 programs", d: "Today. Still the same four founders. Still the same operating rules." },
  ];
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead index="§ 02" eyebrow="Story" align="split" title="Seven years. Four founders. One standard."/>
        <div className="ams">
          {ms.map((m, i) => (
            <div key={i} className="ams-row">
              <div className="ams-y serif">{m.y}</div>
              <div className="ams-t serif">{m.t}</div>
              <div className="ams-d">{m.d}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .ams { margin-top: 40px; border-top: 1px solid var(--line); }
        .ams-row { display: grid; grid-template-columns: 140px 1fr 1.5fr; gap: 40px; padding: 32px 0; border-bottom: 1px solid var(--line); align-items: baseline; }
        .ams-y { font-size: 40px; letter-spacing: -0.02em; color: var(--accent); }
        .ams-t { font-size: clamp(24px, 2.5vw, 32px); letter-spacing: -0.02em; line-height: 1.05; }
        .ams-d { font-size: 15px; color: var(--ink-3); line-height: 1.55; max-width: 52ch; }
        @media (max-width: 820px) { .ams-row { grid-template-columns: 1fr; gap: 8px; } }
      `}</style>
    </section>
  );
}

function ATeam() {
  return (
    <section className="section" style={{ background: "var(--bg-alt)", borderBlock: "1px solid var(--line)" }}>
      <div className="wrap">
        <SectionHead index="§ 03" eyebrow="Instructors" align="split" title={<>The <span className="italic serif">practitioners</span> you'll learn from.</>} sub="A curated faculty of senior operators — most still shipping, all still learning. You'll meet them in the first week of any cohort."/>
        <div className="team">
          {INSTRUCTORS.map((p, i) => (
            <div key={i} className="team-card">
              <div className="team-img">
                <Placeholder label="portrait" meta={`06${i+1}`} ratio="4/5"/>
              </div>
              <div className="team-body">
                <div className="mono muted" style={{ fontSize: 11 }}>{p.focus}</div>
                <div className="serif" style={{ fontSize: 22, letterSpacing: "-0.015em", marginTop: 4 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 4 }}>{p.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .team { margin-top: 40px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .team-card { display: flex; flex-direction: column; gap: 16px; }
        .team-img { border-radius: 12px; overflow: hidden; border: 1px solid var(--line); }
        .team-body { padding: 0 4px; }
        @media (max-width: 900px) { .team { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .team { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

function AValues() {
  const vs = [
    ["Craft", "The thing we optimise for, above speed, above scale."],
    ["Restraint", "Fewer programs, made better. Fewer seats, filled carefully."],
    ["Accountability", "We sign up to outcomes. If we miss, we rebuild — on us."],
    ["Curiosity", "Every season, we throw out a chapter and write a new one."],
  ];
  return (
    <section className="section">
      <div className="wrap">
        <Eyebrow index="§ 04" label="Operating values"/>
        <div className="av">
          {vs.map(([k,d],i) => (
            <div key={i} className="av-card">
              <div className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>0{i+1}</div>
              <div className="serif" style={{ fontSize: 32, letterSpacing: "-0.02em", marginTop: 8 }}>{k}</div>
              <div style={{ fontSize: 15, color: "var(--ink-3)", marginTop: 8, lineHeight: 1.5 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .av { margin-top: 40px; display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; }
        .av-card { padding: 36px 28px; border-right: 1px solid var(--line); min-height: 200px; }
        .av-card:last-child { border-right: 0; }
        @media (max-width: 900px) { .av { grid-template-columns: repeat(2, 1fr); } .av-card { border-bottom: 1px solid var(--line); } }
      `}</style>
    </section>
  );
}

function ACta() {
  return (
    <section className="section-sm">
      <div className="wrap" style={{ textAlign: "center", padding: "80px 0" }}>
        <h2 className="display" style={{ fontSize: "clamp(56px, 8vw, 120px)" }}>
          Come <span className="italic">study</span> with us.
        </h2>
        <div style={{ marginTop: 32, display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          <Link to="/courses" className="btn btn-primary btn-lg">See the catalog <Arrow/></Link>
          <Link to="/contact" className="btn btn-ghost btn-lg">Talk to us</Link>
        </div>
      </div>
    </section>
  );
}

window.About = About;
