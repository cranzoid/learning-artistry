/* global React, Link, useRoute, COURSES, CourseCard, SectionHead, Eyebrow, Arrow, ArrowUpRight, Plus, Check, cx, fmtPrice, Mood */
const { useState: useStateCD, useMemo: useMemoCD, useEffect: useEffectCD } = React;

function CourseDetail() {
  const route = useRoute();
  const slug = route.path.replace(/^\/courses\//, "");
  const course = COURSES.find(c => c.slug === slug) || COURSES[0];
  const related = COURSES.filter(c => c.cat === course.cat && c.slug !== course.slug).slice(0, 3);
  const saved = course.compare ? Math.round((1 - course.price/course.compare) * 100) : 0;

  return (
    <>
      <CDHero course={course} saved={saved}/>
      <CDProof course={course}/>
      <CDOverview course={course}/>
      <CDSyllabus course={course}/>
      <CDDetails course={course}/>
      <CDAudience course={course}/>
      <CDPricing course={course} saved={saved}/>
      <CDFaq course={course}/>
      {related.length > 0 && <CDRelated related={related}/>}
    </>
  );
}

function CDHero({ course, saved }) {
  const seatsLeft = 7;
  const enrolled = 13;
  const startDate = "Mon 04 May 2026";

  return (
    <section className="cd-hero">
      <div className="wrap">
        <div className="cd-crumbs mono">
          <Link to="/courses">Catalog</Link>
          <span className="muted"> / </span>
          <Link to={`/courses?cat=${course.cat}`}>{course.catLabel}</Link>
          <span className="muted"> / </span>
          <span>{course.code}</span>
        </div>

        <div className="cd-hero-grid">
          <div className="cd-hero-left">
            <div className="cd-badges">
              <span className="chip chip-accent">{course.catLabel}</span>
              {course.cert && <span className="chip">Certification · {course.cert}</span>}
              <span className="chip">{course.level}</span>
              <span className="chip chip-dot">Enrolling now</span>
            </div>
            <h1 className="cd-title">{course.title.split(" —")[0]}</h1>
            {course.title.includes(" — ") && (
              <div className="cd-subtitle serif italic">— {course.title.split(" — ")[1]}</div>
            )}
            <p className="lead cd-lead">{course.short}</p>
            <div className="cd-proof-row">
              <div className="cd-stars">
                {Array.from({length: 5}).map((_, i) => (
                  <svg key={i} width="15" height="15" viewBox="0 0 14 14"><path d="M7 1 8.8 5.1 13.2 5.6 9.9 8.6 10.8 13 7 10.8 3.2 13 4.1 8.6 0.8 5.6 5.2 5.1z" fill="var(--accent)"/></svg>
                ))}
                <span className="mono cd-rating-n">{course.rating || 4.9}</span>
              </div>
              <span className="cd-sep"/>
              <span className="mono cd-proof-item">{course.cohorts.toLocaleString()} alumni</span>
              <span className="cd-sep"/>
              <span className="mono cd-proof-item">96% first-attempt pass</span>
            </div>
            <div className="cd-hero-meta">
              <div className="cd-meta-cell">
                <span className="mono muted">Duration</span>
                <span className="serif">{course.duration}</span>
              </div>
              <div className="cd-meta-cell">
                <span className="mono muted">Delivery</span>
                <span className="serif">{course.mode}</span>
              </div>
              <div className="cd-meta-cell">
                <span className="mono muted">Next cohort</span>
                <span className="serif">{startDate}</span>
              </div>
              <div className="cd-meta-cell">
                <span className="mono muted">Certification</span>
                <span className="serif">{course.cert || "Studio Cert."}</span>
              </div>
            </div>
          </div>

          <aside className="cd-hero-right">
            <div className="cd-frame" style={{ background: course.color }}>
              <div className="cd-frame-code mono">{course.code}</div>
              <div className="cd-frame-cert mono">{course.cert || "STUDIO CERT."}</div>
              <div className="cd-frame-title serif">{course.title.split(" —")[0]}</div>
              <div className="cd-frame-foot">
                <span className="mono">20-SEAT COHORT</span>
                <span className="mono">LIVE · INSTRUCTOR-LED</span>
              </div>
            </div>

            <div className="cd-buy">
              <div className="cd-urgency">
                <span className="ticker-dot"/>
                <span className="mono">Only <b style={{ color: "var(--accent)" }}>{seatsLeft} seats</b> left · starts {startDate}</span>
              </div>
              <div className="cd-price-row">
                <span className="cd-price serif">{fmtPrice(course.price)}</span>
                {course.compare && (
                  <div className="cd-price-save">
                    <span className="mono cd-compare">{fmtPrice(course.compare)}</span>
                    <span className="chip chip-accent">Save {saved}%</span>
                  </div>
                )}
              </div>
              <div className="mono muted cd-emi">or {fmtPrice(Math.round(course.price/12))}/mo · 0% interest · 12 months</div>
              <div className="cd-seats-bar">
                <div className="cd-seats-fill" style={{ width: (enrolled/20*100) + "%" }}/>
                <span className="mono">{enrolled} of 20 seats reserved</span>
              </div>
              <button className="btn btn-primary btn-lg cd-buy-cta" onClick={() => alert('→ Razorpay checkout')}>
                Reserve my seat <Arrow/>
              </button>
              <div className="cd-buy-alt">
                <Link to="/contact" className="btn btn-ghost">Talk to an advisor</Link>
                <button className="btn btn-ghost">Get syllabus PDF</button>
              </div>
              <div className="cd-buy-bullets">
                <div><Check/><span>Exam voucher included ({course.cert || "certification"})</span></div>
                <div><Check/><span>Pass guarantee — free retake if you don't</span></div>
                <div><Check/><span>7-day money-back on the cohort</span></div>
                <div><Check/><span>Corporate invoicing · team discounts for 3+</span></div>
              </div>
              <div className="cd-trust">
                <span className="mono muted">TRUSTED PAYMENT</span>
                <span className="mono">🔒 Razorpay · Stripe · Wire</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <style>{`
        .cd-hero { padding-block: var(--s-7) var(--s-9); border-bottom: 1px solid var(--line); }
        .cd-crumbs { font-size: 11px; padding-bottom: 22px; border-bottom: 1px solid var(--line); }
        .cd-crumbs a:hover { color: var(--accent); }
        .cd-hero-grid { margin-top: 56px; display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 100px; align-items: start; }
        .cd-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
        .cd-title { font-family: var(--ff-serif); font-weight: 400; font-size: clamp(44px, 6vw, 84px); line-height: 0.96; letter-spacing: -0.03em; margin: 0; max-width: 16ch; }
        .cd-subtitle { font-size: clamp(24px, 3vw, 40px); color: var(--ink-3); margin-top: 12px; letter-spacing: -0.02em; max-width: 24ch; }
        .cd-lead { margin-top: 28px; max-width: 56ch; font-size: 19px; }
        .cd-proof-row { margin-top: 28px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; padding: 16px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .cd-stars { display: flex; gap: 3px; align-items: center; }
        .cd-rating-n { margin-left: 8px; font-size: 12px; color: var(--ink); }
        .cd-sep { width: 1px; height: 12px; background: var(--line-2); }
        .cd-proof-item { font-size: 12px; color: var(--ink-3); }
        .cd-hero-meta { margin-top: 32px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .cd-meta-cell { display: flex; flex-direction: column; gap: 6px; }
        .cd-meta-cell .mono { font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; }
        .cd-meta-cell .serif { font-size: 18px; letter-spacing: -0.015em; line-height: 1.15; }

        .cd-hero-right { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 96px; }
        .cd-frame { aspect-ratio: 5/3; border-radius: 14px; padding: 22px; color: #fff; display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto 1fr auto; gap: 8px; position: relative; overflow: hidden; }
        .cd-frame::before { content:""; position:absolute; inset:0; background: radial-gradient(circle at 80% 20%, rgba(255,255,255,0.25), transparent 50%); }
        .cd-frame > * { position: relative; }
        .cd-frame-code { font-size: 11px; opacity: 0.85; }
        .cd-frame-cert { font-size: 10px; opacity: 0.75; text-align: right; }
        .cd-frame-title { font-size: clamp(20px, 1.8vw, 26px); line-height: 1.05; letter-spacing: -0.015em; grid-column: 1 / -1; align-self: end; max-width: 14ch; }
        .cd-frame-foot { grid-column: 1 / -1; display: flex; justify-content: space-between; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.25); font-size: 10px; opacity: 0.85; }

        .cd-buy { background: var(--surface); border: 1px solid var(--line); border-radius: 16px; padding: 24px; box-shadow: var(--shadow-2); }
        .cd-urgency { display: flex; align-items: center; gap: 10px; padding-bottom: 16px; margin-bottom: 18px; border-bottom: 1px solid var(--line); font-size: 12px; color: var(--ink-2); }
        .cd-price-row { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; }
        .cd-price { font-size: clamp(44px, 4.5vw, 56px); letter-spacing: -0.03em; line-height: 1; }
        .cd-price-save { display: flex; flex-direction: column; gap: 4px; }
        .cd-compare { color: var(--ink-4); text-decoration: line-through; font-size: 13px; }
        .cd-emi { font-size: 11px; margin-top: 6px; }
        .cd-seats-bar { margin-top: 16px; height: 6px; background: var(--bg-alt); border-radius: 3px; position: relative; overflow: hidden; }
        .cd-seats-fill { position: absolute; inset: 0; width: 65%; background: linear-gradient(90deg, var(--accent), var(--accent-2)); border-radius: 3px; }
        .cd-seats-bar .mono { position: absolute; top: -22px; right: 0; font-size: 10px; color: var(--ink-3); }
        .cd-buy-cta { width: 100%; justify-content: center; margin-top: 24px; padding: 18px 24px; }
        .cd-buy-alt { margin-top: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .cd-buy-alt .btn { width: 100%; justify-content: center; padding: 11px 12px; font-size: 13px; }
        .cd-buy-bullets { margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--line); display: flex; flex-direction: column; gap: 10px; font-size: 13px; color: var(--ink-2); }
        .cd-buy-bullets > div { display: flex; align-items: flex-start; gap: 10px; line-height: 1.4; }
        .cd-buy-bullets svg { color: var(--accent); flex-shrink: 0; margin-top: 2px; }
        .cd-trust { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; font-size: 10px; letter-spacing: 0.04em; color: var(--ink-4); }
        @media (max-width: 1060px) { .cd-hero-grid { grid-template-columns: 1fr; gap: 48px; } .cd-hero-right { position: static; } .cd-hero-meta { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </section>
  );
}

function CDProof({ course }) {
  return (
    <section className="cd-proof" aria-label="Social proof">
      <div className="wrap">
        <div className="cd-proof-grid">
          <div className="cd-proof-item-lg">
            <span className="serif">Engineers from</span>
            <div className="cd-proof-logos">
              {["NORTHWIND", "Meridian", "QUANTA", "Halcyon", "VOYAGER", "Helix"].map(n => (
                <span key={n} className="serif cd-logo">{n}</span>
              ))}
            </div>
            <span className="mono muted">have trained with us</span>
          </div>
        </div>
      </div>
      <style>{`
        .cd-proof { padding: 32px 0; background: var(--bg-alt); border-bottom: 1px solid var(--line); }
        .cd-proof-item-lg { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; justify-content: center; }
        .cd-proof-item-lg .serif { font-size: 16px; color: var(--ink-3); letter-spacing: -0.01em; }
        .cd-proof-item-lg .mono { font-size: 11px; }
        .cd-proof-logos { display: flex; gap: 36px; flex-wrap: wrap; justify-content: center; }
        .cd-logo { font-size: 20px !important; color: var(--ink-3) !important; letter-spacing: -0.015em; }
      `}</style>
    </section>
  );
}

function CDOverview({ course }) {
  const highlights = course.highlights || [
    "Live instructor-led sessions — twice weekly",
    "Hands-on labs on real production infrastructure",
    "Exam voucher included (on certification tracks)",
    "Pass guarantee — or retake the cohort free",
    "Private alumni community for one year",
    "1:1 career review with a senior practitioner",
  ];
  return (
    <section className="section-sm">
      <div className="wrap">
        <div className="cd-ov-grid">
          <div>
            <Eyebrow index="§ 01" label="Overview"/>
            <h2 className="h2 cd-ov-title">
              Built for the <span className="italic serif">practitioner</span> who's done reading about it.
            </h2>
          </div>
          <div>
            <p className="lead">
              This is a twelve-week studio — not a library of videos. Live sessions,
              hands-on labs, weekly critiques and a pass-focused exam sprint. You'll
              finish with a credential that means something and the muscle memory to
              back it up.
            </p>
            <div className="cd-hi">
              {highlights.map((h, i) => (
                <div key={i} className="cd-hi-row">
                  <Check/>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .cd-ov-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 100px; padding-top: 40px; border-top: 1px solid var(--line); }
        .cd-ov-title { margin-top: 24px; max-width: 16ch; }
        .cd-hi { margin-top: 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        .cd-hi-row { display: flex; gap: 12px; padding: 14px 0; border-top: 1px solid var(--line); font-size: 15px; color: var(--ink-2); align-items: flex-start; }
        .cd-hi-row:nth-child(-n+2) { border-top: 0; padding-top: 0; }
        .cd-hi-row svg { color: var(--accent); flex-shrink: 0; margin-top: 4px; }
        @media (max-width: 900px) { .cd-ov-grid { grid-template-columns: 1fr; gap: 40px; } .cd-hi { grid-template-columns: 1fr; } .cd-hi-row { border-top: 1px solid var(--line) !important; padding-top: 14px !important; } }
      `}</style>
    </section>
  );
}

function CDSyllabus({ course }) {
  const [active, setActive] = useStateCD(0);
  const modules = course.syllabus || [];
  const cur = modules[active] || { title: "Coming soon", items: [], hours: 0 };
  const total = modules.reduce((acc, m) => acc + (m.hours||0), 0);
  if (modules.length === 0) return null;

  return (
    <section className="section-sm" style={{ background: "var(--bg-alt)", borderBlock: "1px solid var(--line)" }}>
      <div className="wrap">
        <SectionHead
          index="§ 02"
          eyebrow="Syllabus"
          align="split"
          title={<>{modules.length} modules. <span className="italic serif">{total}</span> hours of structured craft.</>}
          sub="Each module is a week in the cohort. Click a module to see inside."
        />
        <div className="syl">
          <div className="syl-ribbon">
            {modules.map((m, i) => {
              const widthPct = (m.hours / total) * 100;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cx("syl-seg", i === active && "active")}
                  style={{ flexBasis: `${widthPct}%` }}>
                  <div className="syl-seg-top mono">M{String(i+1).padStart(2,"0")}</div>
                  <div className="syl-seg-title serif">{m.title}</div>
                  <div className="syl-seg-meta mono">{m.hours}h</div>
                  <div className="syl-seg-bar"/>
                </button>
              );
            })}
          </div>
          <div className="syl-stage">
            <div className="syl-stage-left">
              <div className="mono muted" style={{ fontSize: 11 }}>MODULE {String(active+1).padStart(2,"0")} / {String(modules.length).padStart(2,"0")}</div>
              <h3 className="serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.02em", lineHeight: 1.05, marginTop: 14, marginBottom: 20 }}>{cur.title}</h3>
              <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{cur.hours} hours · Week {active+1} of cohort</div>
              <div className="syl-controls">
                <button onClick={() => setActive(Math.max(0, active-1))} disabled={active===0} className="syl-btn"><Arrow size={14} className="rot180"/> Previous</button>
                <button onClick={() => setActive(Math.min(modules.length-1, active+1))} disabled={active===modules.length-1} className="syl-btn">Next <Arrow size={14}/></button>
              </div>
            </div>
            <div className="syl-stage-right">
              <ul className="syl-items">
                {cur.items.map((it, i) => (
                  <li key={i} className="syl-item">
                    <span className="mono muted">{String(i+1).padStart(2,"0")}</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .syl { margin-top: 56px; }
        .syl-ribbon { display: flex; border: 1px solid var(--line); border-radius: 14px; overflow: hidden; background: var(--surface); }
        .syl-seg { flex: 1 1 auto; min-width: 0; padding: 20px 18px 14px; border-right: 1px solid var(--line); text-align: left; display: flex; flex-direction: column; gap: 8px; transition: background .25s var(--ease); position: relative; min-height: 120px; }
        .syl-seg:last-child { border-right: 0; }
        .syl-seg:hover { background: var(--bg-alt); }
        .syl-seg.active { background: var(--ink); color: var(--bg); }
        .syl-seg-top { font-size: 10px; opacity: 0.6; }
        .syl-seg-title { font-size: 15px; line-height: 1.15; letter-spacing: -0.01em; min-height: 36px; }
        .syl-seg-meta { font-size: 10px; opacity: 0.6; margin-top: auto; }
        .syl-seg.active .syl-seg-top, .syl-seg.active .syl-seg-meta { color: var(--bg); opacity: 0.6; }
        .syl-seg-bar { height: 3px; background: var(--line); border-radius: 2px; }
        .syl-seg.active .syl-seg-bar { background: var(--accent); }
        .syl-stage { margin-top: 24px; background: var(--surface); border: 1px solid var(--line); border-radius: 16px; display: grid; grid-template-columns: 1fr 1.3fr; gap: 0; overflow: hidden; }
        .syl-stage-left { padding: 48px; border-right: 1px solid var(--line); display: flex; flex-direction: column; }
        .syl-controls { margin-top: auto; padding-top: 40px; display: flex; gap: 8px; }
        .syl-btn { padding: 10px 16px; border: 1px solid var(--line); border-radius: 999px; font-size: 13px; color: var(--ink-3); display: inline-flex; align-items: center; gap: 8px; }
        .syl-btn:hover:not([disabled]) { color: var(--ink); border-color: var(--ink); }
        .syl-btn[disabled] { opacity: 0.4; cursor: not-allowed; }
        .syl-btn .rot180 { transform: rotate(180deg); }
        .syl-stage-right { padding: 48px; }
        .syl-items { list-style: none; padding: 0; margin: 0; }
        .syl-item { display: grid; grid-template-columns: 40px 1fr; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--line); font-size: 15px; }
        .syl-item:last-child { border-bottom: 0; }
        .syl-item .mono { font-size: 11px; padding-top: 3px; }
        @media (max-width: 900px) {
          .syl-ribbon { flex-wrap: wrap; }
          .syl-seg { flex: 1 1 45% !important; border-bottom: 1px solid var(--line); }
          .syl-stage { grid-template-columns: 1fr; }
          .syl-stage-left { border-right: 0; border-bottom: 1px solid var(--line); padding: 32px; }
          .syl-stage-right { padding: 32px; }
        }
      `}</style>
    </section>
  );
}

function CDDetails({ course }) {
  const rows = [
    { k: "Duration", v: course.duration },
    { k: "Level", v: course.level },
    { k: "Delivery", v: course.mode },
    { k: "Certification", v: course.cert || "Studio Certificate" },
    { k: "Cohort size", v: "20 seats" },
    { k: "Next cohort", v: "Mon 04 May 2026" },
    { k: "Language", v: "English" },
    { k: "Commitment", v: "~8–10 hrs/week" },
  ];
  return (
    <section className="section-sm">
      <div className="wrap">
        <Eyebrow index="§ 03" label="The details"/>
        <div className="cd-det">
          {rows.map((r, i) => (
            <div key={i} className="cd-det-row">
              <span className="mono muted">{r.k}</span>
              <span className="serif">{r.v}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .cd-det { margin-top: 32px; display: grid; grid-template-columns: repeat(2, 1fr); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }
        .cd-det-row { display: grid; grid-template-columns: 160px 1fr; gap: 24px; padding: 22px 24px; border-bottom: 1px solid var(--line); border-right: 1px solid var(--line); align-items: baseline; font-size: 17px; }
        .cd-det-row .mono { font-size: 11px; }
        @media (max-width: 720px) { .cd-det { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

function CDAudience({ course }) {
  const who = course.audience || ["Practitioners levelling up", "Teams investing in benches", "Career changers with adjacent skills"];
  const outcomes = course.outcomes || ["Ship production-grade work", "Earn a recognised credential", "Advance into new scope"];
  return (
    <section className="section-sm" style={{ background: "var(--bg-alt)", borderBlock: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="cd-aud">
          <div>
            <Eyebrow index="§ 04" label="Who this is for"/>
            <h3 className="h2 cd-aud-title">Designed for a specific <span className="italic serif">practitioner</span>.</h3>
            <ul className="cd-list">
              {who.map((w, i) => <li key={i}><span className="mono muted">{String(i+1).padStart(2,"0")}</span>{w}</li>)}
            </ul>
          </div>
          <div>
            <Eyebrow index="§ 05" label="Outcomes"/>
            <h3 className="h2 cd-aud-title">What you'll <span className="italic serif">walk out</span> able to do.</h3>
            <ul className="cd-list">
              {outcomes.map((o, i) => <li key={i}><span className="mono muted">{String(i+1).padStart(2,"0")}</span>{o}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <style>{`
        .cd-aud { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
        .cd-aud-title { margin-top: 24px; max-width: 16ch; }
        .cd-list { list-style: none; padding: 0; margin: 32px 0 0; border-top: 1px solid var(--line); }
        .cd-list li { display: grid; grid-template-columns: 48px 1fr; gap: 16px; padding: 18px 0; border-bottom: 1px solid var(--line); font-size: 16px; color: var(--ink-2); }
        .cd-list .mono { font-size: 11px; padding-top: 3px; color: var(--ink-4); }
        @media (max-width: 820px) { .cd-aud { grid-template-columns: 1fr; gap: 48px; } }
      `}</style>
    </section>
  );
}

function CDPricing({ course, saved }) {
  return (
    <section className="section-sm">
      <div className="wrap">
        <Eyebrow index="§ 06" label="Take a seat"/>
        <div className="cd-buy2">
          <div className="cd-buy2-left">
            <div className="mono muted" style={{ fontSize: 11 }}>TUITION · SINGLE COHORT SEAT</div>
            <div className="cd-buy2-price">
              <span className="serif" style={{ fontSize: "clamp(72px, 10vw, 144px)", letterSpacing: "-0.035em", lineHeight: 0.9 }}>{fmtPrice(course.price)}</span>
              {course.compare && (
                <div style={{ display:"flex", flexDirection:"column", gap:4, paddingLeft: 20 }}>
                  <span className="mono muted" style={{ textDecoration: "line-through" }}>{fmtPrice(course.compare)}</span>
                  <span className="chip chip-accent">Save {saved}%</span>
                </div>
              )}
            </div>
            <div className="mono muted" style={{ fontSize: 12, marginTop: 10 }}>or {fmtPrice(Math.round(course.price/12))}/mo · 0% interest · 12 months</div>
            <div style={{ marginTop: 32, display:"flex", gap: 10, flexWrap: "wrap" }}>
              <button className="btn btn-primary btn-lg" onClick={() => alert('→ Razorpay checkout')}>Reserve my seat <Arrow/></button>
              <Link to="/contact" className="btn btn-ghost btn-lg">Request consultation</Link>
            </div>
          </div>
          <div className="cd-buy2-right">
            <div className="mono muted" style={{ fontSize: 11 }}>WHAT'S INCLUDED</div>
            <ul className="cd-inc">
              <li><Check/>Live cohort seat · instructor-led sessions</li>
              <li><Check/>All labs, recordings & materials (12-month access)</li>
              <li><Check/>Exam voucher on certification tracks</li>
              <li><Check/>Pass guarantee or free retake</li>
              <li><Check/>Alumni community · 12 months</li>
              <li><Check/>Corporate invoicing available</li>
            </ul>
          </div>
        </div>
      </div>
      <style>{`
        .cd-buy2 { margin-top: 40px; display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 80px; border-top: 1px solid var(--line); padding-top: 48px; }
        .cd-buy2-price { display: flex; align-items: flex-end; margin-top: 14px; flex-wrap: wrap; }
        .cd-inc { list-style: none; padding: 0; margin: 18px 0 0; display: flex; flex-direction: column; gap: 12px; font-size: 14px; }
        .cd-inc li { display: flex; gap: 10px; align-items: center; }
        .cd-inc svg { color: var(--accent); flex-shrink: 0; }
        @media (max-width: 820px) { .cd-buy2 { grid-template-columns: 1fr; gap: 40px; } }
      `}</style>
    </section>
  );
}

function CDFaq({ course }) {
  const items = course.faq || [
    { q: "Is the exam fee included?", a: "Yes — certification tracks include the exam voucher." },
    { q: "What if I miss a live session?", a: "All sessions are recorded and available within 24 hours." },
    { q: "How do refunds work?", a: "Full refund within the first 7 days of the cohort, no questions asked." },
  ];
  const [open, setOpen] = useStateCD(0);
  return (
    <section className="section-sm" style={{ background: "var(--bg-alt)", borderBlock: "1px solid var(--line)" }}>
      <div className="wrap">
        <SectionHead index="§ 07" eyebrow="Questions" align="split" title="The things you're likely to ask." sub="And if your question isn't here — send us a note. We answer within a business day."/>
        <div className="faq">
          {items.map((f, i) => (
            <button key={i} onClick={() => setOpen(open===i?-1:i)} className={cx("faq-row", open===i && "open")}>
              <span className="mono muted">{String(i+1).padStart(2,"0")}</span>
              <span className="faq-q">{f.q}</span>
              <span className="faq-ic"><Plus/></span>
              <div className="faq-a">{f.a}</div>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        .faq { margin-top: 48px; border-top: 1px solid var(--line); }
        .faq-row { display: grid; grid-template-columns: 48px 1fr 24px; gap: 20px; padding: 26px 0; border-bottom: 1px solid var(--line); text-align: left; width: 100%; align-items: baseline; }
        .faq-row .mono { font-size: 11px; }
        .faq-q { font-family: var(--ff-serif); font-size: clamp(22px, 2.2vw, 28px); letter-spacing: -0.015em; line-height: 1.2; }
        .faq-ic { color: var(--ink-3); transition: transform .3s var(--ease); }
        .faq-row.open .faq-ic { transform: rotate(45deg); color: var(--accent); }
        .faq-a { grid-column: 2; max-height: 0; overflow: hidden; transition: max-height .4s var(--ease), padding .3s var(--ease); color: var(--ink-3); font-size: 15px; line-height: 1.6; max-width: 60ch; }
        .faq-row.open .faq-a { max-height: 240px; padding-top: 18px; }
      `}</style>
    </section>
  );
}

function CDRelated({ related }) {
  return (
    <section className="section-sm">
      <div className="wrap">
        <SectionHead index="§ 08" eyebrow="Related" title="If this resonated, you might also like."/>
        <div className="cd-rel">
          {related.map(c => <CourseCard key={c.slug} course={c}/>)}
        </div>
      </div>
      <style>{`
        .cd-rel { margin-top: 48px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 900px) { .cd-rel { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

window.CourseDetail = CourseDetail;
