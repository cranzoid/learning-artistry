/* global React, Link, useRoute, COURSES, CATEGORIES, CourseCard, SectionHead, Eyebrow, Arrow, ArrowUpRight, cx, fmtPrice, useTweaks */
const { useState: useStateC2, useMemo: useMemoC2, useEffect: useEffectC2 } = React;

function Courses() {
  const route = useRoute();
  const initialCat = route.query.cat || "all";
  const [cat, setCat] = useStateC2(initialCat);
  const [level, setLevel] = useStateC2("all");
  const [q, setQ] = useStateC2("");
  const [sort, setSort] = useStateC2("featured");
  const [view, setView] = useStateC2("grid"); // grid | list

  useEffectC2(() => { setCat(route.query.cat || "all"); }, [route.query.cat]);

  const levels = ["all", "Intermediate", "Advanced", "Executive"];

  const filtered = useMemoC2(() => {
    let list = COURSES.slice();
    if (cat !== "all") list = list.filter(c => c.cat === cat);
    if (level !== "all") list = list.filter(c => c.level === level);
    if (q.trim()) {
      const needle = q.toLowerCase();
      list = list.filter(c => c.title.toLowerCase().includes(needle) || c.catLabel.toLowerCase().includes(needle) || (c.short||"").toLowerCase().includes(needle));
    }
    if (sort === "price-asc") list.sort((a,b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a,b) => b.price - a.price);
    if (sort === "rating") list.sort((a,b) => (b.rating||0) - (a.rating||0));
    if (sort === "featured") list.sort((a,b) => (b.featured?1:0) - (a.featured?1:0));
    return list;
  }, [cat, level, q, sort]);

  return (
    <>
      <section className="cs-hero">
        <div className="wrap">
          <div className="cs-hero-meta">
            <span className="mono">§ Catalog</span>
            <span className="mono muted">Spring · 2026</span>
            <span className="mono muted">{COURSES.length} programs</span>
          </div>
          <h1 className="h1" style={{ fontSize: "clamp(56px, 8vw, 104px)", lineHeight: 0.95, letterSpacing: "-0.035em", marginTop: 32, maxWidth: "20ch" }}>
            The catalog.<br/>
            <span className="italic serif">Choose your craft.</span>
          </h1>
          <p className="lead" style={{ marginTop: 24, maxWidth: "56ch" }}>
            Every course listed is enrolling. Filter by discipline, level or mode —
            or type what you're trying to learn and we'll find it.
          </p>
        </div>
      </section>

      <section className="cs-filters">
        <div className="wrap">
          <div className="cs-search">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="5"/><path d="m11 11 3 3" strokeLinecap="round"/></svg>
            <input
              placeholder='Try "kubernetes", "PMP exam prep", or "LLM"…'
              value={q}
              onChange={e => setQ(e.target.value)}
            />
            <span className="mono muted" style={{ fontSize: 11 }}>{filtered.length} / {COURSES.length}</span>
          </div>
          <div className="cs-chips">
            <button onClick={() => setCat("all")} className={cx("cs-chip", cat === "all" && "active")}>
              <span>All</span><span className="mono">{COURSES.length}</span>
            </button>
            {CATEGORIES.map(c => (
              <button key={c.key} onClick={() => setCat(c.key)} className={cx("cs-chip", cat === c.key && "active")}>
                <span>{c.label}</span><span className="mono">{c.count}</span>
              </button>
            ))}
          </div>
          <div className="cs-tools">
            <div className="cs-tool">
              <span className="mono muted">Level</span>
              <select value={level} onChange={e => setLevel(e.target.value)}>
                {levels.map(l => <option key={l} value={l}>{l === "all" ? "All levels" : l}</option>)}
              </select>
            </div>
            <div className="cs-tool">
              <span className="mono muted">Sort</span>
              <select value={sort} onChange={e => setSort(e.target.value)}>
                <option value="featured">Featured first</option>
                <option value="rating">Highest rated</option>
                <option value="price-asc">Price: low → high</option>
                <option value="price-desc">Price: high → low</option>
              </select>
            </div>
            <div className="cs-tool">
              <span className="mono muted">View</span>
              <div className="cs-view">
                <button onClick={() => setView("grid")} className={cx(view==="grid" && "active")} aria-label="Grid">
                  <svg width="14" height="14" viewBox="0 0 14 14"><rect x="1" y="1" width="5" height="5" fill="currentColor"/><rect x="8" y="1" width="5" height="5" fill="currentColor"/><rect x="1" y="8" width="5" height="5" fill="currentColor"/><rect x="8" y="8" width="5" height="5" fill="currentColor"/></svg>
                </button>
                <button onClick={() => setView("list")} className={cx(view==="list" && "active")} aria-label="List">
                  <svg width="14" height="14" viewBox="0 0 14 14"><rect x="1" y="2" width="12" height="1.5" fill="currentColor"/><rect x="1" y="6.5" width="12" height="1.5" fill="currentColor"/><rect x="1" y="11" width="12" height="1.5" fill="currentColor"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-results">
        <div className="wrap">
          {filtered.length === 0 ? (
            <div className="cs-empty">
              <div className="serif" style={{ fontSize: 44, letterSpacing: "-0.02em" }}>No matches — yet.</div>
              <p className="lead">Try broadening your filters, or <button className="btn-link" onClick={() => { setCat("all"); setLevel("all"); setQ(""); }}>reset everything</button>.</p>
            </div>
          ) : view === "list" ? (
            <div className="cs-list">
              {filtered.map(c => <CourseCard key={c.slug} course={c} variant="list"/>)}
            </div>
          ) : (
            <div className="cs-grid">
              {filtered.map(c => <CourseCard key={c.slug} course={c}/>)}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .cs-hero { padding-block: var(--s-8) var(--s-7); border-bottom: 1px solid var(--line); }
        .cs-hero-meta { display: flex; gap: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--line); font-size: 11px; }
        .cs-filters { position: sticky; top: 72px; z-index: 20; background: color-mix(in oklab, var(--bg) 92%, transparent); backdrop-filter: blur(10px); border-bottom: 1px solid var(--line); padding-block: 20px; }
        .cs-search { display: flex; align-items: center; gap: 12px; padding: 14px 18px; background: var(--surface); border: 1px solid var(--line); border-radius: 12px; color: var(--ink-4); }
        .cs-search input { flex: 1; border: 0; background: transparent; outline: none; font-size: 15px; color: var(--ink); }
        .cs-chips { display: flex; gap: 8px; margin-top: 14px; overflow-x: auto; padding-bottom: 4px; }
        .cs-chip {
          display: inline-flex; gap: 8px; align-items: center;
          padding: 8px 14px; border: 1px solid var(--line); border-radius: 999px;
          font-size: 13px; color: var(--ink-3); background: var(--surface); white-space: nowrap;
          transition: all .2s var(--ease);
        }
        .cs-chip .mono { font-size: 10px; color: var(--ink-4); }
        .cs-chip:hover { border-color: var(--ink-4); color: var(--ink); }
        .cs-chip.active { background: var(--ink); color: var(--bg); border-color: var(--ink); }
        .cs-chip.active .mono { color: var(--accent); }
        .cs-tools { display: flex; gap: 24px; margin-top: 14px; flex-wrap: wrap; }
        .cs-tool { display: flex; align-items: center; gap: 10px; font-size: 13px; }
        .cs-tool select {
          padding: 8px 12px; border: 1px solid var(--line); border-radius: 8px;
          background: var(--surface); font-size: 13px; color: var(--ink);
        }
        .cs-view { display: flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
        .cs-view button { padding: 8px 10px; color: var(--ink-4); }
        .cs-view button.active { background: var(--ink); color: var(--bg); }
        .cs-results { padding-block: var(--s-8); }
        .cs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 1050px) { .cs-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .cs-grid { grid-template-columns: 1fr; } }
        .cs-list { display: flex; flex-direction: column; border-bottom: 1px solid var(--line); }
        .cs-empty { padding: 80px 0; display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
      `}</style>
    </>
  );
}

window.Courses = Courses;
