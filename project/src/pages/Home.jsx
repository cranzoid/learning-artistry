/* global React, Link, useRoute, COURSES, CATEGORIES, CLIENTS, OUTCOMES, INSTRUCTORS,
   SectionHead, CourseCard, Stat, Mood, Placeholder, Arrow, ArrowUpRight, Plus, Eyebrow, useClock, useTweaks, cx */
const { useState: useStateH, useEffect: useEffectH } = React;

function Home() {
  const { tweaks } = useTweaks();
  const variant = tweaks.hero_variant || "editorial";
  return (
    <>
      {variant === "canvas" ? <HeroCanvas/> : variant === "index" ? <HeroIndex/> : <HeroEditorial/>}
      <TrustStrip/>
      <Categories/>
      <FeaturedCourses/>
      <WhyUs/>
      <LearningModes/>
      <CorporateBanner/>
      <Outcomes/>
      <FinalCta/>
    </>
  );
}

// ---------- HERO: Editorial ----------
function HeroEditorial() {
  const now = useClock();
  const [idx, setIdx] = useStateH(0);
  const featured = COURSES.filter(c => c.featured);

  useEffectH(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % featured.length), 4000);
    return () => clearInterval(id);
  }, [featured.length]);

  return (
    <section className="hero-ed">
      <div className="wrap">
        <div className="hero-ed-grid">
          <div className="hero-ed-left">
            <div className="hero-ed-meta">
              <span className="mono">TLA · Spring Catalog</span>
              <span className="mono muted">{now.toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" })}</span>
            </div>
            <h1 className="hero-ed-title">
              <span className="italic serif">Mastery</span>, taught<br/>
              with the care<br/>
              of a <span className="italic serif">studio</span>.
            </h1>
            <p className="hero-ed-lede lead">
              The Learning Artistry is a training and certification studio for professionals —
              and the teams they build. Cloud, development, project and quality disciplines,
              taught by practitioners who lived the work.
            </p>
            <div className="hero-ed-cta">
              <Link to="/courses" className="btn btn-ink btn-lg">For individuals <Arrow/></Link>
              <Link to="/corporate" className="btn btn-ghost btn-lg">For teams <Arrow/></Link>
            </div>
            <div className="hero-ed-stats">
              <div><div className="serif" style={{fontSize:32,letterSpacing:"-0.02em"}}>18k+</div><div className="mono muted" style={{fontSize:11}}>Alumni · 64 countries</div></div>
              <div><div className="serif" style={{fontSize:32,letterSpacing:"-0.02em"}}>96%</div><div className="mono muted" style={{fontSize:11}}>First-attempt pass rate</div></div>
              <div><div className="serif" style={{fontSize:32,letterSpacing:"-0.02em"}}>4.92</div><div className="mono muted" style={{fontSize:11}}>Average cohort rating</div></div>
            </div>
          </div>
          <div className="hero-ed-right">
            <div className="hero-ed-stage">
              <div className="hero-ed-frame">
                <Mood kind="rings" seed={idx+1} style={{ position:"absolute", inset:0 }}/>
                <div className="hero-ed-ticker">
                  <span className="ticker-dot"/>
                  <span className="mono">Live · 9 cohorts training now</span>
                </div>
                <div className="hero-ed-now">
                  <div className="mono muted" style={{fontSize:11}}>Now teaching</div>
                  <div className="serif" style={{fontSize:28, letterSpacing:"-0.02em", lineHeight:1.1}}>
                    {featured[idx].title.split(" —")[0]}
                  </div>
                  <div className="mono" style={{fontSize:11, color:"var(--ink-3)"}}>
                    {featured[idx].catLabel} · cohort #{featured[idx].cohorts}
                  </div>
                </div>
                <div className="hero-ed-dots">
                  {featured.map((_,i) => (
                    <button key={i} onClick={() => setIdx(i)} className={cx("hero-ed-dot", i === idx && "active")} aria-label={`Show ${i+1}`}/>
                  ))}
                </div>
              </div>
              <div className="hero-ed-index">
                {COURSES.slice(0,6).map((c,i) => (
                  <Link key={c.slug} to={`/courses/${c.slug}`} className="hero-ed-index-row">
                    <span className="mono muted">{String(i+1).padStart(2,"0")}</span>
                    <span className="hero-ed-index-title">{c.title.split(" —")[0]}</span>
                    <span className="mono">{c.duration}</span>
                    <ArrowUpRight size={12}/>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .hero-ed { padding-block: clamp(24px, 4vw, 56px) var(--s-9); position: relative; }
        .hero-ed-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 80px; align-items: start; }
        .hero-ed-meta { display: flex; gap: 18px; padding-bottom: 18px; border-bottom: 1px solid var(--line); font-size: 11px; }
        .hero-ed-title {
          font-family: var(--ff-serif);
          font-weight: 400;
          font-size: clamp(56px, 7.5vw, 104px);
          line-height: 0.95;
          letter-spacing: -0.035em;
          margin: 32px 0 24px;
        }
        .hero-ed-lede { margin-bottom: 32px; }
        .hero-ed-cta { display: flex; gap: 10px; flex-wrap: wrap; }
        .hero-ed-stats { margin-top: 56px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding-top: 24px; border-top: 1px solid var(--line); }
        .hero-ed-right { position: sticky; top: 96px; }
        .hero-ed-stage { display: grid; grid-template-rows: auto auto; gap: 16px; }
        .hero-ed-frame {
          position: relative;
          aspect-ratio: 4/5;
          background: var(--bg-alt);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--line);
        }
        .hero-ed-ticker {
          position: absolute; top: 16px; left: 16px;
          display: flex; align-items: center; gap: 8px;
          padding: 8px 14px;
          background: color-mix(in oklab, var(--bg) 90%, transparent);
          backdrop-filter: blur(10px);
          border: 1px solid var(--line);
          border-radius: 999px;
          font-size: 11px;
        }
        .hero-ed-now {
          position: absolute;
          left: 16px; right: 16px; bottom: 48px;
          padding: 18px 18px 20px;
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 12px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .hero-ed-dots { position: absolute; bottom: 18px; left: 0; right: 0; display: flex; justify-content: center; gap: 6px; }
        .hero-ed-dot { width: 18px; height: 3px; background: var(--ink-5); border-radius: 2px; transition: background .3s var(--ease); }
        .hero-ed-dot.active { background: var(--accent); }
        .hero-ed-index { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; background: var(--surface); }
        .hero-ed-index-row {
          display: grid;
          grid-template-columns: 32px 1fr auto 16px;
          gap: 14px;
          align-items: center;
          padding: 12px 16px;
          font-size: 13px;
          border-top: 1px solid var(--line);
          transition: background .2s var(--ease), padding-left .3s var(--ease);
        }
        .hero-ed-index-row:first-child { border-top: 0; }
        .hero-ed-index-row:hover { background: var(--bg-alt); padding-left: 22px; }
        .hero-ed-index-title { font-family: var(--ff-serif); font-size: 15px; letter-spacing: -0.01em; }
        @media (max-width: 980px) { .hero-ed-grid { grid-template-columns: 1fr; gap: 40px; } .hero-ed-right { position: static; } }
      `}</style>
    </section>
  );
}

// ---------- HERO: Canvas ----------
function HeroCanvas() {
  return (
    <section className="hero-c">
      <div className="wrap">
        <div className="hero-c-meta">
          <span className="mono">Volume 04 · Spring Catalog</span>
          <span className="mono muted">The Learning Artistry</span>
          <span className="mono muted">MMXXVI</span>
        </div>
        <h1 className="hero-c-title">
          Training,<br/><span className="italic">mastered.</span>
        </h1>
        <div className="hero-c-bottom">
          <p className="lead" style={{ maxWidth: 46 + "ch" }}>
            A certification studio for practitioners. Cohorts of twenty.
            Curricula rebuilt every season. Outcomes tracked for years.
          </p>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <Link to="/courses" className="btn btn-ink btn-lg">Browse 116 programs <Arrow/></Link>
            <Link to="/corporate" className="btn btn-ghost btn-lg">For teams</Link>
          </div>
        </div>
      </div>
      <style>{`
        .hero-c { padding-block: var(--s-8) var(--s-9); border-bottom: 1px solid var(--line); }
        .hero-c-meta { display: flex; gap: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--line); font-size: 11px; }
        .hero-c-title {
          font-family: var(--ff-serif);
          font-weight: 400;
          font-size: clamp(80px, 17vw, 280px);
          line-height: 0.85;
          letter-spacing: -0.04em;
          margin: 48px 0;
        }
        .hero-c-bottom { display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; flex-wrap: wrap; padding-top: 32px; border-top: 1px solid var(--line); }
      `}</style>
    </section>
  );
}

// ---------- HERO: Index ----------
function HeroIndex() {
  return (
    <section className="hero-i">
      <div className="wrap">
        <div className="hero-i-grid">
          <div className="hero-i-num mono">01</div>
          <div className="hero-i-label eyebrow eyebrow-ink">The Studio</div>
          <div className="hero-i-title">
            <div className="display">A practitioner's</div>
            <div className="display italic">certification studio.</div>
          </div>
          <div className="hero-i-side">
            <p className="lead">
              We teach four disciplines — Cloud, Development, Project and Quality — to
              individuals building their careers and companies building their benches.
            </p>
            <div style={{ marginTop: 24, display:"flex", gap:10, flexWrap:"wrap" }}>
              <Link to="/courses" className="btn btn-primary btn-lg">Browse catalog <Arrow/></Link>
              <Link to="/corporate" className="btn btn-ghost btn-lg">Corporate training</Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .hero-i { padding-block: var(--s-8) var(--s-9); }
        .hero-i-grid {
          display: grid;
          grid-template-columns: 80px 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 24px 40px;
        }
        .hero-i-num { font-size: 14px; color: var(--ink-4); padding-top: 12px; }
        .hero-i-label { padding-top: 12px; }
        .hero-i-title { grid-column: 2 / -1; margin-top: 24px; }
        .hero-i-side { grid-column: 2; padding-top: 32px; }
        @media (max-width: 900px) { .hero-i-grid { grid-template-columns: 1fr; } .hero-i-title, .hero-i-side { grid-column: 1; } }
      `}</style>
    </section>
  );
}

// ---------- Trust strip ----------
function TrustStrip() {
  return (
    <section className="trust">
      <div className="wrap">
        <div className="trust-head">
          <span className="eyebrow">Trusted by teams at</span>
          <span className="mono muted">312 enterprise clients · 18,000+ individuals</span>
        </div>
        <div className="marquee" style={{ marginTop: 18, paddingBlock: 20 }}>
          <div className="marquee-track">
            {[...CLIENTS, ...CLIENTS].map((c,i) => (
              <span key={i} className="serif" style={{ fontSize: 28, letterSpacing: "-0.015em", color: "var(--ink-3)" }}>{c}</span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .trust { padding-block: var(--s-7); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: var(--bg-alt); }
        .trust-head { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
      `}</style>
    </section>
  );
}

// ---------- Categories ----------
function Categories() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          index="§ 02"
          eyebrow="Disciplines"
          align="split"
          title="Six disciplines. One standard of craft."
          sub="From cloud foundations to executive leadership — every program rebuilt every season by practitioners who use these tools in production."
        />
        <div className="cats">
          {CATEGORIES.map((c, i) => (
            <Link key={c.key} to={`/courses?cat=${c.key}`} className="cat">
              <div className="cat-num mono muted">{String(i+1).padStart(2,"0")}</div>
              <div className="cat-title serif">{c.label}</div>
              <div className="cat-blurb">{c.blurb}</div>
              <div className="cat-foot">
                <span className="mono">{c.count} programs</span>
                <ArrowUpRight size={14}/>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .cats {
          margin-top: 48px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid var(--line);
          border-left: 1px solid var(--line);
        }
        .cat {
          display: flex; flex-direction: column; gap: 10px;
          padding: 32px 28px 28px;
          border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          min-height: 220px;
          transition: background .3s var(--ease);
        }
        .cat:hover { background: var(--bg-alt); }
        .cat-num { font-size: 11px; }
        .cat-title { font-size: 28px; letter-spacing: -0.02em; line-height: 1.05; }
        .cat-blurb { font-size: 14px; color: var(--ink-3); max-width: 30ch; }
        .cat-foot { margin-top: auto; display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid var(--line); font-size: 11px; color: var(--ink-4); }
        .cat:hover .cat-foot { color: var(--accent); }
        @media (max-width: 900px) { .cats { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 580px) { .cats { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

// ---------- Featured courses ----------
function FeaturedCourses() {
  const featured = COURSES.filter(c => c.featured).concat(COURSES.filter(c => !c.featured).slice(0,1)).slice(0,4);
  return (
    <section className="section" style={{ background: "var(--bg-alt)", borderBlock: "1px solid var(--line)" }}>
      <div className="wrap">
        <SectionHead
          index="§ 03"
          eyebrow="Featured this season"
          align="split"
          title="The courses shaping this cohort."
          sub="Four flagships, selected for enrolment this season. Live cohorts, limited seats."
          action={<Link to="/courses" className="btn-link">View full catalog →</Link>}
        />
        <div className="feat">
          {featured.map(c => <CourseCard key={c.slug} course={c}/>)}
        </div>
      </div>
      <style>{`
        .feat { margin-top: 48px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        @media (max-width: 1100px) { .feat { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 580px) { .feat { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

// ---------- Why us ----------
function WhyUs() {
  const pillars = [
    { n: "A.", t: "Practitioners, not professors", d: "Every instructor runs — or ran — the work they teach. You'll meet a former principal architect, a master black belt, a kubernetes maintainer. Not an evangelist in sight." },
    { n: "B.", t: "Cohorts of twenty, never a hundred", d: "Small enough that the instructor knows you by the second session. Peer critiques, 1:1 reviews, and a community that outlasts the course." },
    { n: "C.", t: "Curricula rebuilt every season", d: "Tool versions shift. Exam blueprints update. We rebuild the syllabus each cohort so you learn the version your company actually runs." },
    { n: "D.", t: "Outcomes tracked for years", d: "We follow up at 90 days, 1 year, 3 years. Our first-attempt pass rate is 96%. Our median alumnus reports a 34% compensation lift within 18 months." },
  ];
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          index="§ 04"
          eyebrow="Why the Studio"
          align="split"
          title="Four things we refuse to compromise."
          sub="These aren't marketing pillars. They're the operating rules we built the studio around — and the things we'd close the studio before breaking."
        />
        <div className="why">
          {pillars.map((p, i) => (
            <div key={i} className="why-row">
              <div className="why-n mono">{p.n}</div>
              <div className="why-t serif">{p.t}</div>
              <div className="why-d">{p.d}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .why { margin-top: 48px; border-top: 1px solid var(--line); }
        .why-row {
          display: grid;
          grid-template-columns: 60px 1.3fr 1.7fr;
          gap: 40px;
          padding: 40px 0;
          border-bottom: 1px solid var(--line);
          align-items: start;
        }
        .why-n { font-size: 12px; color: var(--accent); padding-top: 8px; }
        .why-t { font-size: clamp(28px, 3vw, 40px); letter-spacing: -0.02em; line-height: 1.05; }
        .why-d { font-size: 16px; color: var(--ink-3); line-height: 1.55; max-width: 52ch; padding-top: 8px; }
        @media (max-width: 820px) {
          .why-row { grid-template-columns: 1fr; gap: 12px; padding: 28px 0; }
        }
      `}</style>
    </section>
  );
}

// ---------- Learning modes ----------
function LearningModes() {
  const modes = [
    { k: "Live cohort", d: "Instructor-led sessions, twice weekly. Community, office hours, live labs. 20-seat cap.", tag: "Most popular", mood: "grid" },
    { k: "Self-paced", d: "The full cohort recording plus graded exercises. Move at the speed your life allows.", tag: "Flexible", mood: "bars" },
    { k: "Blended", d: "Six weekends of live, plus asynchronous work between. The format most teams choose.", tag: "Teams prefer", mood: "rings" },
  ];
  return (
    <section className="section" style={{ background: "var(--ink)", color: "var(--bg)", borderRadius: 0 }}>
      <div className="wrap">
        <div className="lm-head">
          <Eyebrow index="§ 05" label="Modes of learning"/>
          <h2 className="h1" style={{ color: "var(--bg)", maxWidth: "18ch", marginTop: 24 }}>
            <span className="italic serif">Three</span> ways in.<br/>One standard.
          </h2>
        </div>
        <div className="lm">
          {modes.map((m, i) => (
            <div key={i} className="lm-card">
              <div className="lm-card-media">
                <Mood kind={m.mood} seed={i+2} style={{ position:"absolute", inset:0, filter: "invert(0.92) hue-rotate(180deg)" }}/>
              </div>
              <div className="lm-card-body">
                <div className="mono" style={{ fontSize: 11, opacity: 0.55 }}>Mode 0{i+1}</div>
                <div className="lm-card-title serif">{m.k}</div>
                <div className="lm-card-d">{m.d}</div>
                <div className="lm-card-tag mono">{m.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .lm-head { padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,0.12); }
        .lm { margin-top: 56px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .lm-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; }
        .lm-card-media { position: relative; aspect-ratio: 16/10; background: rgba(255,255,255,0.05); }
        .lm-card-body { padding: 24px; display: flex; flex-direction: column; gap: 10px; }
        .lm-card-title { font-size: 28px; letter-spacing: -0.02em; color: var(--bg); }
        .lm-card-d { font-size: 14px; color: rgba(255,255,255,0.6); max-width: 36ch; }
        .lm-card-tag { font-size: 11px; color: var(--accent); letter-spacing: 0.06em; text-transform: uppercase; margin-top: auto; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); }
        @media (max-width: 900px) { .lm { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

// ---------- Corporate banner ----------
function CorporateBanner() {
  return (
    <section className="cb">
      <div className="wrap">
        <div className="cb-grid">
          <div className="cb-left">
            <Eyebrow index="§ 06" label="For teams"/>
            <h2 className="h1" style={{ maxWidth: "18ch", marginTop: 28 }}>
              Train your bench.<br/><span className="italic serif">Measure</span> the delta.
            </h2>
            <p className="lead" style={{ marginTop: 24 }}>
              We partner with engineering, ops, and program leaders to build cohort programs
              that ladder into real capability. Curriculum design, baseline assessments,
              360° outcome reporting — under one roof.
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link to="/corporate" className="btn btn-primary btn-lg">Corporate training <Arrow/></Link>
              <Link to="/contact" className="btn btn-ghost btn-lg">Book a consultation</Link>
            </div>
          </div>
          <div className="cb-right">
            <div className="cb-stats">
              <div className="cb-stat">
                <div className="serif" style={{ fontSize: 72, letterSpacing:"-0.03em", lineHeight: 0.9 }}>312</div>
                <div className="mono muted" style={{ fontSize: 11, marginTop: 8 }}>Enterprise programs delivered</div>
              </div>
              <div className="cb-stat">
                <div className="serif" style={{ fontSize: 72, letterSpacing:"-0.03em", lineHeight: 0.9 }}>2.4×</div>
                <div className="mono muted" style={{ fontSize: 11, marginTop: 8 }}>Median capability lift, measured</div>
              </div>
              <div className="cb-stat">
                <div className="serif" style={{ fontSize: 72, letterSpacing:"-0.03em", lineHeight: 0.9 }}>68%</div>
                <div className="mono muted" style={{ fontSize: 11, marginTop: 8 }}>Of clients return for year two</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .cb { padding-block: var(--s-9); }
        .cb-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 80px; align-items: center; }
        .cb-stats { display: flex; flex-direction: column; gap: 32px; border-left: 1px solid var(--line); padding-left: 40px; }
        .cb-stat { display: flex; flex-direction: column; }
        @media (max-width: 900px) { .cb-grid { grid-template-columns: 1fr; gap: 40px; } .cb-stats { border-left: 0; padding-left: 0; border-top: 1px solid var(--line); padding-top: 32px; } }
      `}</style>
    </section>
  );
}

// ---------- Outcomes ----------
function Outcomes() {
  const [active, setActive] = useStateH(0);
  const cur = OUTCOMES[active];
  return (
    <section className="section" style={{ background: "var(--bg-alt)", borderBlock: "1px solid var(--line)" }}>
      <div className="wrap">
        <SectionHead
          index="§ 07"
          eyebrow="Case studies"
          align="split"
          title="What mastery looks like, twelve months on."
          sub="Four of our alumni, in their own words. Outcomes verified at one-year follow-up."
        />
        <div className="out">
          <div className="out-list">
            {OUTCOMES.map((o, i) => (
              <button key={i} onClick={() => setActive(i)} className={cx("out-row", i === active && "active")}>
                <span className="mono out-n">{String(i+1).padStart(2,"0")}</span>
                <span className="out-name">{o.name}</span>
                <span className="out-meta mono">{o.org}</span>
              </button>
            ))}
          </div>
          <div className="out-stage">
            <div className="out-quote">
              <span className="serif out-open">“</span>
              <blockquote className="serif">{cur.quote}</blockquote>
            </div>
            <div className="out-foot">
              <div>
                <div className="out-name2 serif">{cur.name}</div>
                <div className="mono muted" style={{ fontSize: 12 }}>{cur.role} · {cur.org}</div>
              </div>
              <div className="out-metric">
                <div className="mono muted" style={{ fontSize: 10 }}>VERIFIED OUTCOME</div>
                <div className="serif" style={{ fontSize: 20, letterSpacing:"-0.01em", marginTop: 2 }}>{cur.metric}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .out { margin-top: 48px; display: grid; grid-template-columns: 0.9fr 1.6fr; gap: 48px; }
        .out-list { display: flex; flex-direction: column; border-top: 1px solid var(--line); }
        .out-row {
          display: grid; grid-template-columns: 32px 1fr auto; gap: 14px;
          padding: 18px 4px; text-align: left;
          border-bottom: 1px solid var(--line);
          transition: padding-left .3s var(--ease), background .2s var(--ease);
          align-items: baseline;
        }
        .out-row:hover { background: var(--bg); padding-left: 12px; }
        .out-row.active { background: var(--bg); padding-left: 12px; }
        .out-n { font-size: 11px; color: var(--ink-4); }
        .out-name { font-family: var(--ff-serif); font-size: 20px; letter-spacing: -0.015em; }
        .out-meta { font-size: 11px; color: var(--ink-4); }
        .out-row.active .out-name { color: var(--accent); }
        .out-stage { background: var(--bg); border: 1px solid var(--line); border-radius: 16px; padding: 48px; display: flex; flex-direction: column; justify-content: space-between; gap: 40px; min-height: 360px; }
        .out-quote { position: relative; }
        .out-open { position: absolute; left: -12px; top: -36px; font-size: 120px; color: var(--accent); line-height: 1; }
        .out-quote blockquote { margin: 0; font-size: clamp(22px, 2.2vw, 32px); line-height: 1.25; letter-spacing: -0.015em; max-width: 32ch; }
        .out-foot { display: flex; justify-content: space-between; align-items: flex-end; padding-top: 24px; border-top: 1px solid var(--line); gap: 20px; flex-wrap: wrap; }
        .out-name2 { font-size: 20px; letter-spacing: -0.015em; }
        @media (max-width: 900px) { .out { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

// ---------- Final CTA ----------
function FinalCta() {
  return (
    <section className="fc">
      <div className="wrap">
        <div className="fc-grid">
          <div>
            <Eyebrow index="§ 08" label="Take a seat"/>
            <h2 className="display" style={{ fontSize: "clamp(56px, 9vw, 140px)", marginTop: 24 }}>
              Next cohort<br/><span className="italic">opens Monday.</span>
            </h2>
          </div>
          <div className="fc-side">
            <p className="lead">
              Twenty seats. Seven disciplines to choose from. Twelve weeks from
              first class to certification — and a career that won't look the same.
            </p>
            <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link to="/courses" className="btn btn-primary btn-lg">Browse catalog <Arrow/></Link>
              <Link to="/contact" className="btn btn-ghost btn-lg">Talk to an advisor</Link>
            </div>
            <div className="fc-bullets">
              <div><span className="mono muted">01</span> Pay-later, 0% EMI options available</div>
              <div><span className="mono muted">02</span> Exam vouchers included on certification tracks</div>
              <div><span className="mono muted">03</span> Money-back pass guarantee on PMP, AWS, Azure</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .fc { padding-block: var(--s-9) var(--s-8); }
        .fc-grid { display: grid; grid-template-columns: 1fr 0.7fr; gap: 80px; align-items: end; }
        .fc-bullets { margin-top: 40px; display: flex; flex-direction: column; gap: 8px; font-size: 14px; color: var(--ink-3); padding-top: 24px; border-top: 1px solid var(--line); }
        @media (max-width: 900px) { .fc-grid { grid-template-columns: 1fr; gap: 40px; } }
      `}</style>
    </section>
  );
}

window.Home = Home;
