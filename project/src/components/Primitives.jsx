/* global React, Link, cx, fmtPrice, Arrow, ArrowUpRight, Plus, Check, useTweaks */

// ---------- Section header ----------
function SectionHead({ eyebrow, index, title, sub, align = "left", action }) {
  return (
    <div className={cx("sh", align === "split" && "sh-split")}>
      <div className="sh-meta">
        {index && <span className="mono muted">{index}</span>}
        {eyebrow && <span className="eyebrow eyebrow-ink">{eyebrow}</span>}
      </div>
      <h2 className="sh-title h1">{title}</h2>
      {sub && <p className="sh-sub lead">{sub}</p>}
      {action && <div className="sh-action">{action}</div>}
      <style>{`
        .sh { display: flex; flex-direction: column; gap: 18px; padding-block: var(--s-4); }
        .sh-meta { display: flex; gap: 16px; align-items: center; padding-bottom: 20px; border-bottom: 1px solid var(--line); }
        .sh-title { max-width: 22ch; }
        .sh-sub { margin-top: 6px; }
        .sh-split { display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px; align-items: end; }
        .sh-split .sh-title { grid-column: 1; }
        .sh-split .sh-meta { grid-column: 1 / -1; }
        .sh-split .sh-sub { grid-column: 2; margin: 0; }
        .sh-action { margin-top: 20px; }
        @media (max-width: 800px) { .sh-split { grid-template-columns: 1fr; gap: 20px; } }
      `}</style>
    </div>
  );
}

// ---------- Placeholder imagery ----------
function Placeholder({ label = "image", meta, ratio = "4/3", tint, className, style }) {
  return (
    <div
      className={cx("placeholder", className)}
      data-label={label}
      data-meta={meta || ""}
      style={{ aspectRatio: ratio, background: tint, ...style }}>
    </div>
  );
}

// ---------- Abstract mood panel (CSS-only composition) ----------
function Mood({ kind = "grid", seed = 1, style }) {
  if (kind === "grid") {
    return (
      <div className="mood" style={style}>
        <svg viewBox="0 0 400 300" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}>
          <defs>
            <pattern id={`grid-${seed}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0 L0 0 0 20" fill="none" stroke="var(--ink-5)" strokeWidth="0.4"/>
            </pattern>
          </defs>
          <rect width="400" height="300" fill={`url(#grid-${seed})`} opacity="0.9"/>
          <circle cx={120 + seed*10} cy="150" r={88} fill="var(--accent)" opacity="0.9"/>
          <rect x={200 + seed*6} y={60} width="140" height="140" fill="var(--ink)" />
          <circle cx={300} cy={210} r={32} fill="var(--bg)" stroke="var(--ink)" strokeWidth="1.5"/>
        </svg>
      </div>
    );
  }
  if (kind === "rings") {
    return (
      <div className="mood" style={style}>
        <svg viewBox="0 0 400 400" style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}>
          {[0,1,2,3,4,5,6,7,8].map(i => (
            <circle key={i} cx="200" cy="200" r={20 + i*22} fill="none" stroke="var(--ink-5)" strokeWidth="0.6"/>
          ))}
          <circle cx="200" cy="200" r="14" fill="var(--accent)"/>
          <circle cx="340" cy="120" r="5" fill="var(--ink)"/>
          <circle cx="80"  cy="240" r="3" fill="var(--ink)"/>
        </svg>
      </div>
    );
  }
  if (kind === "bars") {
    return (
      <div className="mood" style={style}>
        <svg viewBox="0 0 400 300" style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}>
          {Array.from({length: 18}).map((_,i) => {
            const h = 40 + Math.abs(Math.sin(i*0.7 + seed))*200;
            return <rect key={i} x={i*22 + 8} y={260-h} width="14" height={h} fill={i%5===0 ? "var(--accent)" : "var(--ink)"} opacity={i%5===0 ? 1 : 0.9}/>;
          })}
        </svg>
      </div>
    );
  }
  return <div className="mood" style={style}/>;
}

// ---------- Stat block ----------
function Stat({ value, label, sub }) {
  return (
    <div className="stat">
      <div className="stat-v serif">{value}</div>
      <div className="stat-l">{label}</div>
      {sub && <div className="stat-sub mono muted">{sub}</div>}
      <style>{`
        .stat { display: flex; flex-direction: column; gap: 4px; }
        .stat-v { font-size: clamp(56px, 6vw, 88px); line-height: 0.9; letter-spacing: -0.03em; }
        .stat-l { font-size: 14px; color: var(--ink-3); margin-top: 8px; max-width: 24ch; }
        .stat-sub { margin-top: 2px; font-size: 11px; }
      `}</style>
    </div>
  );
}

// ---------- Course Card ----------
function CourseCard({ course, variant }) {
  const { tweaks } = useTweaks();
  const v = variant || tweaks.card_style || "editorial";
  const saved = course.compare ? Math.round((1 - course.price/course.compare) * 100) : 0;

  if (v === "list") {
    return (
      <Link to={`/courses/${course.slug}`} className="cc cc-list">
        <div className="cc-list-num mono">{course.code}</div>
        <div className="cc-list-title h3">{course.title}</div>
        <div className="cc-list-meta mono muted">{course.catLabel} · {course.duration} · {course.level}</div>
        <div className="cc-list-price serif">{fmtPrice(course.price)}</div>
        <div className="cc-list-arrow"><ArrowUpRight size={16}/></div>
        <style>{`
          .cc-list {
            display: grid;
            grid-template-columns: 120px 1fr auto auto 40px;
            gap: 24px;
            align-items: center;
            padding: 22px 4px;
            border-top: 1px solid var(--line);
            transition: background .3s var(--ease), padding-left .3s var(--ease);
          }
          .cc-list:hover { background: var(--bg-alt); padding-left: 16px; padding-right: 16px; }
          .cc-list-num { font-size: 11px; color: var(--ink-4); letter-spacing: 0.05em; }
          .cc-list-meta { font-size: 12px; }
          .cc-list-price { font-size: 22px; letter-spacing: -0.02em; }
          .cc-list-arrow { color: var(--ink-3); transition: transform .3s var(--ease), color .3s var(--ease); }
          .cc-list:hover .cc-list-arrow { transform: translate(3px, -3px); color: var(--accent); }
          @media (max-width: 720px) {
            .cc-list { grid-template-columns: auto 1fr auto; }
            .cc-list-meta, .cc-list-arrow { display: none; }
          }
        `}</style>
      </Link>
    );
  }

  if (v === "portrait") {
    return (
      <Link to={`/courses/${course.slug}`} className="cc cc-port card">
        <div className="cc-port-img" style={{ background: course.color }}>
          <div className="cc-port-code mono">{course.code}</div>
          <div className="cc-port-cat mono">{course.catLabel}</div>
          <div className="cc-port-title serif">{course.title.split(" —")[0]}</div>
        </div>
        <div className="cc-port-body">
          <div className="cc-port-meta mono muted">{course.duration} · {course.level} · {course.mode}</div>
          <div className="cc-port-price">
            <span className="serif" style={{ fontSize: 28 }}>{fmtPrice(course.price)}</span>
            {course.compare && <span className="mono muted" style={{ textDecoration: "line-through", marginLeft: 8 }}>{fmtPrice(course.compare)}</span>}
            {saved > 0 && <span className="chip chip-accent" style={{ marginLeft: 8 }}>Save {saved}%</span>}
          </div>
        </div>
        <style>{`
          .cc-port { overflow: hidden; display: flex; flex-direction: column; }
          .cc-port:hover { transform: translateY(-3px); box-shadow: var(--shadow-hover); }
          .cc-port-img {
            aspect-ratio: 4/5;
            padding: 20px;
            display: flex; flex-direction: column; justify-content: space-between;
            color: #fff;
            position: relative;
          }
          .cc-port-img::before {
            content: ""; position: absolute; inset: 0;
            background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.25) 100%);
          }
          .cc-port-code { position: relative; font-size: 11px; opacity: 0.8; }
          .cc-port-cat { position: relative; font-size: 10px; opacity: 0.75; }
          .cc-port-title { position: relative; font-size: 24px; line-height: 1.05; letter-spacing: -0.02em; max-width: 14ch; }
          .cc-port-body { padding: 18px 20px 22px; display: flex; flex-direction: column; gap: 10px; }
          .cc-port-meta { font-size: 11px; }
          .cc-port-price { display: flex; align-items: baseline; flex-wrap: wrap; }
        `}</style>
      </Link>
    );
  }

  // Default editorial card
  return (
    <Link to={`/courses/${course.slug}`} className="cc cc-ed">
      <div className="cc-ed-head">
        <span className="mono">{course.code}</span>
        <span className="chip chip-dot">{course.catLabel}</span>
      </div>
      <div className="cc-ed-media">
        <Mood kind={["grid","rings","bars"][(course.slug.length) % 3]} seed={course.slug.length} />
        <div className="cc-ed-badge">
          {course.cert && <span className="mono">{course.cert}</span>}
        </div>
      </div>
      <h3 className="cc-ed-title">{course.title}</h3>
      <p className="cc-ed-short">{course.short}</p>
      <div className="cc-ed-foot">
        <div className="cc-ed-meta">
          <span className="mono">{course.duration}</span>
          <span className="mono">·</span>
          <span className="mono">{course.level}</span>
        </div>
        <div className="cc-ed-price">
          <span className="serif">{fmtPrice(course.price)}</span>
          {course.compare && <span className="mono muted" style={{ textDecoration: "line-through", fontSize: 12 }}>{fmtPrice(course.compare)}</span>}
        </div>
      </div>
      <style>{`
        .cc-ed {
          display: flex; flex-direction: column; gap: 14px;
          padding: 22px;
          border: 1px solid var(--line);
          background: var(--surface);
          border-radius: 14px;
          transition: border-color .3s var(--ease), transform .4s var(--ease-out), box-shadow .4s var(--ease-out);
          height: 100%;
        }
        .cc-ed:hover { border-color: var(--ink-5); transform: translateY(-2px); box-shadow: var(--shadow-2); }
        .cc-ed-head { display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--ink-4); }
        .cc-ed-media {
          position: relative;
          aspect-ratio: 16/10;
          border-radius: 8px;
          overflow: hidden;
          margin-inline: -4px;
        }
        .cc-ed-badge {
          position: absolute; top: 10px; right: 10px;
          padding: 4px 8px;
          background: color-mix(in oklab, var(--bg) 85%, transparent);
          border: 1px solid var(--line);
          border-radius: 999px;
          font-size: 10px; letter-spacing: 0.04em;
          color: var(--ink-2);
          backdrop-filter: blur(8px);
        }
        .cc-ed-title {
          font-family: var(--ff-serif);
          font-weight: 400;
          font-size: 22px;
          line-height: 1.1;
          letter-spacing: -0.015em;
          margin: 0;
          max-width: 22ch;
        }
        .cc-ed-short { font-size: 14px; color: var(--ink-3); margin: 0; max-width: 38ch; line-height: 1.45; }
        .cc-ed-foot {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--line);
          display: flex; justify-content: space-between; align-items: baseline;
        }
        .cc-ed-meta { display: flex; gap: 8px; font-size: 11px; color: var(--ink-4); }
        .cc-ed-price { display: flex; gap: 8px; align-items: baseline; }
        .cc-ed-price .serif { font-size: 22px; letter-spacing: -0.02em; }
      `}</style>
    </Link>
  );
}

// ---------- Page transitions wrapper ----------
function Page({ children, keyId }) {
  return <main key={keyId} className="page-enter">{children}</main>;
}

// ---------- Small bits ----------
function Eyebrow({ index, label, style }) {
  return (
    <div className="eyebrow-row" style={style}>
      {index && <span className="mono muted">{index}</span>}
      <span className="eyebrow eyebrow-ink">{label}</span>
      <style>{`.eyebrow-row { display:flex; gap:14px; align-items:center; }`}</style>
    </div>
  );
}

Object.assign(window, {
  SectionHead, Placeholder, Mood, Stat, CourseCard, Page, Eyebrow,
});
