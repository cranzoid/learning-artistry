/* global React, Link, useRoute, COURSES, CATEGORIES, Arrow, ArrowUpRight, Plus, Check, cx, fmtPrice, useTweaks */
const { useState: useStateAD, useEffect: useEffectAD } = React;

function Admin() {
  const route = useRoute();
  const sub = route.path.replace(/^\/admin\/?/, "").split("/").filter(Boolean);
  const [authed, setAuthed] = useStateAD(() => {
    try { return sessionStorage.getItem("tla_admin_auth") === "1"; } catch { return false; }
  });

  useEffectAD(() => {
    try { sessionStorage.setItem("tla_admin_auth", authed ? "1" : "0"); } catch {}
  }, [authed]);

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)}/>;

  // /admin, /admin/courses, /admin/courses/:slug
  if (sub[0] === "courses" && sub[1]) return <AdminEdit slug={sub[1]} onLogout={() => setAuthed(false)}/>;
  if (sub[0] === "courses") return <AdminCourses onLogout={() => setAuthed(false)}/>;
  return <AdminDashboard onLogout={() => setAuthed(false)}/>;
}

function AdminShell({ title, children, onLogout, tab }) {
  return (
    <div className="adm">
      <aside className="adm-side">
        <div className="adm-brand">
          <div className="mono muted" style={{ fontSize: 10 }}>THE LEARNING ARTISTRY</div>
          <div className="serif" style={{ fontSize: 22, letterSpacing: "-0.015em", marginTop: 4 }}>Admin</div>
        </div>
        <nav className="adm-nav">
          <Link to="/admin" className={cx("adm-nav-item", tab === "dash" && "active")}>
            <span>Dashboard</span><span className="mono">01</span>
          </Link>
          <Link to="/admin/courses" className={cx("adm-nav-item", tab === "courses" && "active")}>
            <span>Courses</span><span className="mono">02</span>
          </Link>
          <div className="adm-nav-item muted"><span>Orders</span><span className="mono">—</span></div>
          <div className="adm-nav-item muted"><span>Learners</span><span className="mono">—</span></div>
          <div className="adm-nav-item muted"><span>Settings</span><span className="mono">—</span></div>
        </nav>
        <div className="adm-user">
          <div className="adm-avatar">AK</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Aria Kapoor</div>
            <div className="mono muted" style={{ fontSize: 10 }}>admin@learningartistry.com</div>
          </div>
          <button onClick={onLogout} className="adm-logout" title="Logout">↩</button>
        </div>
      </aside>
      <main className="adm-main">
        <header className="adm-head">
          <div className="serif" style={{ fontSize: 32, letterSpacing: "-0.02em" }}>{title}</div>
          <div className="mono muted" style={{ fontSize: 11 }}>Last sync · 14:02 UTC</div>
        </header>
        <div className="adm-body">{children}</div>
      </main>

      <style>{`
        .adm { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; background: var(--bg-alt); }
        .adm-side { background: var(--surface); border-right: 1px solid var(--line); padding: 28px 20px; display: flex; flex-direction: column; gap: 24px; position: sticky; top: 0; height: 100vh; }
        .adm-brand { padding-bottom: 20px; border-bottom: 1px solid var(--line); }
        .adm-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; }
        .adm-nav-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border-radius: 8px; font-size: 14px; color: var(--ink-3); transition: background .2s var(--ease), color .2s var(--ease); }
        .adm-nav-item:hover { background: var(--bg-alt); color: var(--ink); }
        .adm-nav-item.active { background: var(--ink); color: var(--bg); }
        .adm-nav-item.active .mono { color: var(--accent); }
        .adm-nav-item .mono { font-size: 10px; color: var(--ink-4); }
        .adm-nav-item.muted { opacity: 0.4; pointer-events: none; }
        .adm-user { display: flex; align-items: center; gap: 10px; padding-top: 16px; border-top: 1px solid var(--line); }
        .adm-avatar { width: 34px; height: 34px; border-radius: 999px; background: var(--accent); color: var(--accent-ink); font-size: 11px; font-weight: 600; display: grid; place-items: center; }
        .adm-logout { width: 28px; height: 28px; border: 1px solid var(--line); border-radius: 6px; color: var(--ink-4); }
        .adm-logout:hover { color: var(--ink); border-color: var(--ink); }
        .adm-main { background: var(--bg-alt); }
        .adm-head { background: var(--bg-alt); padding: 24px 32px; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 2; backdrop-filter: blur(10px); }
        .adm-body { padding: 32px; }
        @media (max-width: 900px) { .adm { grid-template-columns: 1fr; } .adm-side { position: static; height: auto; } }
      `}</style>
    </div>
  );
}

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useStateAD("admin@learningartistry.com");
  const [pwd, setPwd] = useStateAD("••••••••••");
  return (
    <div className="al">
      <div className="al-left">
        <Link to="/" className="mono muted" style={{ fontSize: 11 }}>← Back to site</Link>
        <div className="al-form">
          <div className="mono muted" style={{ fontSize: 11 }}>§ Studio Admin</div>
          <h1 className="serif" style={{ fontSize: "clamp(44px, 5vw, 64px)", letterSpacing: "-0.025em", lineHeight: 1, margin: "16px 0 10px" }}>Sign in.</h1>
          <p style={{ color: "var(--ink-3)", fontSize: 15, marginBottom: 36 }}>
            Welcome back. For demo purposes any credentials work — click Sign in to continue.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="al-fields">
            <label className="ct-field">
              <span className="ct-label">Email</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label className="ct-field">
              <span className="ct-label">Password</span>
              <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)}/>
            </label>
            <div className="al-row">
              <label className="al-check">
                <input type="checkbox" defaultChecked/><span>Remember me</span>
              </label>
              <a className="mono muted" style={{ fontSize: 11 }}>Forgot?</a>
            </div>
            <button type="submit" className="btn btn-ink btn-lg" style={{ width: "100%" }}>Sign in <Arrow/></button>
          </form>
        </div>
        <div className="mono muted" style={{ fontSize: 11 }}>© 2026 · The Learning Artistry, Ltd.</div>
      </div>
      <div className="al-right">
        <div className="al-quote">
          <div className="serif" style={{ fontSize: "clamp(28px, 3vw, 44px)", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            “The tools of craft belong to the people doing the work.”
          </div>
          <div className="mono muted" style={{ marginTop: 24, fontSize: 11 }}>— Studio operating principles, 2019</div>
        </div>
      </div>
      <style>{`
        .al { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
        .al-left { padding: 40px 56px; display: flex; flex-direction: column; justify-content: space-between; gap: 40px; background: var(--bg); }
        .al-form { max-width: 420px; width: 100%; }
        .al-fields { display: flex; flex-direction: column; gap: 22px; }
        .al-row { display: flex; justify-content: space-between; align-items: center; }
        .al-check { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--ink-3); }
        .al-right { background: var(--ink); color: var(--bg); padding: 56px; display: flex; align-items: center; position: relative; overflow: hidden; }
        .al-right::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 30% 40%, rgba(74,58,255,0.3), transparent 60%); }
        .al-quote { position: relative; max-width: 28ch; }
        @media (max-width: 900px) { .al { grid-template-columns: 1fr; } .al-right { display: none; } }
      `}</style>
    </div>
  );
}

function AdminDashboard({ onLogout }) {
  return (
    <AdminShell title="Dashboard" onLogout={onLogout} tab="dash">
      <div className="adm-stats">
        {[
          ["$184,320", "MTD revenue", "+12.4%"],
          ["247", "New enrolments", "+8.1%"],
          ["1,284", "Active learners", "—"],
          ["96%", "First-attempt pass rate", "+1.2%"],
        ].map(([v, l, d], i) => (
          <div key={i} className="adm-stat">
            <div className="mono muted" style={{ fontSize: 10 }}>{l}</div>
            <div className="serif" style={{ fontSize: 44, letterSpacing: "-0.025em", lineHeight: 1, marginTop: 10 }}>{v}</div>
            <div className="mono" style={{ fontSize: 11, color: d.startsWith("+") ? "var(--accent)" : "var(--ink-4)", marginTop: 8 }}>{d} vs prev</div>
          </div>
        ))}
      </div>
      <div className="adm-grid2" style={{ marginTop: 24 }}>
        <div className="adm-card">
          <div className="adm-card-head">
            <div className="serif" style={{ fontSize: 20 }}>Recent orders</div>
            <a className="mono muted" style={{ fontSize: 11 }}>View all →</a>
          </div>
          <div className="adm-table">
            {[
              ["#29184", "Priya R.", "AWS Solutions Architect", "$1,495", "Paid"],
              ["#29183", "Marcus O.", "Kubernetes CKA", "$1,195", "Paid"],
              ["#29182", "Ana L.", "PMP Exam Prep", "$995", "Pending"],
              ["#29181", "Jun W.", "LLM Engineering", "$1,195", "Paid"],
              ["#29180", "Sarah K.", "Full-Stack TypeScript", "$1,295", "Paid"],
            ].map((r, i) => (
              <div key={i} className="adm-trow">
                <span className="mono">{r[0]}</span>
                <span>{r[1]}</span>
                <span style={{ color: "var(--ink-3)" }}>{r[2]}</span>
                <span className="serif" style={{ fontSize: 16 }}>{r[3]}</span>
                <span className={cx("adm-status", r[4].toLowerCase())}>{r[4]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="adm-card">
          <div className="adm-card-head">
            <div className="serif" style={{ fontSize: 20 }}>Top courses · 30d</div>
            <a className="mono muted" style={{ fontSize: 11 }}>Report →</a>
          </div>
          <div className="adm-bars">
            {COURSES.slice(0, 5).map((c, i) => {
              const w = 100 - i * 14;
              return (
                <div key={c.slug} className="adm-bar">
                  <div className="adm-bar-label">{c.title.split(" —")[0].split(" (")[0]}</div>
                  <div className="adm-bar-track"><div className="adm-bar-fill" style={{ width: w + "%", background: c.color || "var(--accent)" }}/></div>
                  <div className="mono" style={{ fontSize: 11 }}>{100 - i * 14}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .adm-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .adm-stat { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 22px; }
        .adm-grid2 { display: grid; grid-template-columns: 1.4fr 1fr; gap: 16px; }
        .adm-card { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
        .adm-card-head { padding: 18px 22px; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; }
        .adm-table { padding: 4px 0; }
        .adm-trow { display: grid; grid-template-columns: 80px 120px 1fr 80px 80px; gap: 16px; padding: 14px 22px; border-bottom: 1px solid var(--line); font-size: 14px; align-items: center; }
        .adm-trow:last-child { border-bottom: 0; }
        .adm-trow .mono { font-size: 11px; }
        .adm-status { font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; text-align: center; }
        .adm-status.paid { background: var(--accent-soft); color: var(--accent); }
        .adm-status.pending { background: rgba(200, 150, 50, 0.15); color: #A67015; }
        .adm-bars { padding: 20px 22px; display: flex; flex-direction: column; gap: 14px; }
        .adm-bar { display: grid; grid-template-columns: 1fr 120px 30px; gap: 14px; align-items: center; font-size: 13px; }
        .adm-bar-track { height: 6px; background: var(--bg-alt); border-radius: 3px; overflow: hidden; }
        .adm-bar-fill { height: 100%; border-radius: 3px; }
        @media (max-width: 1100px) { .adm-stats, .adm-grid2 { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 700px) { .adm-stats, .adm-grid2 { grid-template-columns: 1fr; } .adm-trow { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </AdminShell>
  );
}

function AdminCourses({ onLogout }) {
  const [q, setQ] = useStateAD("");
  const list = COURSES.filter(c => !q || c.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <AdminShell title="Courses" onLogout={onLogout} tab="courses">
      <div className="adm-toolbar">
        <div className="adm-search">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="5"/><path d="m11 11 3 3" strokeLinecap="round"/></svg>
          <input placeholder="Search courses…" value={q} onChange={e => setQ(e.target.value)}/>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost">Export CSV</button>
          <Link to={`/admin/courses/${COURSES[0].slug}`} className="btn btn-ink">+ New course</Link>
        </div>
      </div>
      <div className="adm-card" style={{ marginTop: 16 }}>
        <div className="adm-ct-head">
          <span>Code</span><span>Title</span><span>Category</span><span>Price</span><span>Status</span><span></span>
        </div>
        {list.map(c => (
          <Link key={c.slug} to={`/admin/courses/${c.slug}`} className="adm-ct-row">
            <span className="mono" style={{ fontSize: 11 }}>{c.code}</span>
            <span style={{ fontFamily: "var(--ff-serif)", fontSize: 15, letterSpacing: "-0.01em" }}>{c.title.split(" —")[0]}</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{c.catLabel}</span>
            <span className="serif" style={{ fontSize: 16 }}>{fmtPrice(c.price)}</span>
            <span className="adm-status paid">Published</span>
            <span style={{ color: "var(--ink-3)" }}><ArrowUpRight size={14}/></span>
          </Link>
        ))}
      </div>
      <style>{`
        .adm-toolbar { display: flex; justify-content: space-between; gap: 16px; align-items: center; }
        .adm-search { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; flex: 1; max-width: 420px; color: var(--ink-4); }
        .adm-search input { flex: 1; border: 0; background: transparent; outline: none; font-size: 14px; color: var(--ink); }
        .adm-ct-head, .adm-ct-row { display: grid; grid-template-columns: 80px 1fr 160px 100px 110px 40px; gap: 16px; align-items: center; padding: 14px 22px; border-bottom: 1px solid var(--line); }
        .adm-ct-head { font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-4); background: var(--bg-alt); }
        .adm-ct-row { transition: background .2s var(--ease); }
        .adm-ct-row:hover { background: var(--bg-alt); }
        .adm-ct-row:last-child { border-bottom: 0; }
      `}</style>
    </AdminShell>
  );
}

function AdminEdit({ slug, onLogout }) {
  const initial = COURSES.find(c => c.slug === slug) || COURSES[0];
  const [f, setF] = useStateAD({
    title: initial.title,
    description: initial.short || "",
    price: initial.price,
    discount: initial.compare ? Math.round((1 - initial.price / initial.compare) * 100) : 0,
    category: initial.cat,
    published: true,
  });
  const upd = (k, v) => setF({ ...f, [k]: v });

  return (
    <AdminShell title={"Edit · " + (initial.code)} onLogout={onLogout} tab="courses">
      <div className="adm-edit">
        <div className="adm-edit-main">
          <div className="adm-card" style={{ padding: 28 }}>
            <div className="mono muted" style={{ fontSize: 10 }}>COURSE · {initial.code}</div>
            <div className="adm-e-fields">
              <label className="ct-field">
                <span className="ct-label">Title</span>
                <input value={f.title} onChange={e => upd("title", e.target.value)} style={{ fontSize: 22, fontFamily: "var(--ff-serif)", letterSpacing: "-0.015em" }}/>
              </label>
              <label className="ct-field">
                <span className="ct-label">Short description</span>
                <textarea rows="3" value={f.description} onChange={e => upd("description", e.target.value)}/>
              </label>
              <div className="adm-e-row">
                <label className="ct-field">
                  <span className="ct-label">Category</span>
                  <select value={f.category} onChange={e => upd("category", e.target.value)} className="adm-e-select">
                    {CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                  </select>
                </label>
                <label className="ct-field">
                  <span className="ct-label">Price (USD)</span>
                  <input type="number" value={f.price} onChange={e => upd("price", +e.target.value)}/>
                </label>
                <label className="ct-field">
                  <span className="ct-label">Discount (%)</span>
                  <input type="number" value={f.discount} onChange={e => upd("discount", +e.target.value)}/>
                </label>
              </div>
              <div className="ct-field">
                <span className="ct-label">Cover image</span>
                <div className="adm-upload">
                  <div className="adm-upload-swatch" style={{ background: initial.color || "var(--accent)" }}>
                    <span className="mono" style={{ fontSize: 10, color: "#fff" }}>{initial.code}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14 }}>cover-{initial.slug}.webp</div>
                    <div className="mono muted" style={{ fontSize: 11 }}>1600 × 1000 · 284 KB · uploaded 12 Mar</div>
                  </div>
                  <button className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 13 }}>Replace</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="adm-edit-side">
          <div className="adm-card" style={{ padding: 22 }}>
            <div className="mono muted" style={{ fontSize: 10 }}>PUBLISH</div>
            <div className="adm-toggle-row">
              <span style={{ fontSize: 14 }}>Course is {f.published ? "live" : "hidden"}</span>
              <button onClick={() => upd("published", !f.published)} className={cx("adm-toggle", f.published && "on")}>
                <span className="adm-toggle-dot"/>
              </button>
            </div>
            <div className="adm-save-row">
              <button className="btn btn-ink" style={{ width: "100%" }}>Save changes <Check/></button>
              <button className="btn btn-ghost" style={{ width: "100%", marginTop: 8 }}>Preview</button>
            </div>
          </div>

          <div className="adm-card" style={{ padding: 22 }}>
            <div className="mono muted" style={{ fontSize: 10 }}>PRICE PREVIEW</div>
            <div className="serif" style={{ fontSize: 44, letterSpacing: "-0.025em", marginTop: 10 }}>{fmtPrice(f.price)}</div>
            {f.discount > 0 && (
              <div className="mono" style={{ marginTop: 4, color: "var(--ink-3)" }}>
                <span style={{ textDecoration: "line-through" }}>{fmtPrice(Math.round(f.price / (1 - f.discount/100)))}</span>
                <span style={{ color: "var(--accent)", marginLeft: 8 }}>Save {f.discount}%</span>
              </div>
            )}
          </div>

          <div className="adm-card" style={{ padding: 22 }}>
            <div className="mono muted" style={{ fontSize: 10 }}>METADATA</div>
            <div className="adm-meta">
              <div><span className="mono muted">Slug</span><span className="mono">{initial.slug}</span></div>
              <div><span className="mono muted">Created</span><span className="mono">12 Jan 2025</span></div>
              <div><span className="mono muted">Enrolments</span><span className="mono">{initial.cohorts}</span></div>
              <div><span className="mono muted">Rating</span><span className="mono">{initial.rating || "—"}</span></div>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .adm-edit { display: grid; grid-template-columns: 1.6fr 1fr; gap: 16px; }
        .adm-edit-side { display: flex; flex-direction: column; gap: 16px; }
        .adm-e-fields { display: flex; flex-direction: column; gap: 22px; margin-top: 16px; }
        .adm-e-row { display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 16px; }
        .adm-e-select { padding: 12px 0; border: 0; border-bottom: 1px solid var(--line-2); background: transparent; font-size: 16px; color: var(--ink); font-family: inherit; outline: none; }
        .adm-upload { margin-top: 10px; display: flex; align-items: center; gap: 16px; padding: 12px; background: var(--bg-alt); border: 1px dashed var(--line-2); border-radius: 10px; }
        .adm-upload-swatch { width: 56px; height: 56px; border-radius: 8px; display: grid; place-items: center; }
        .adm-toggle-row { display: flex; justify-content: space-between; align-items: center; margin: 16px 0; padding: 14px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .adm-toggle { width: 42px; height: 24px; border-radius: 999px; background: var(--line-2); position: relative; transition: background .3s var(--ease); }
        .adm-toggle.on { background: var(--accent); }
        .adm-toggle-dot { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; background: var(--surface); border-radius: 999px; transition: left .3s var(--ease); }
        .adm-toggle.on .adm-toggle-dot { left: 21px; }
        .adm-save-row { margin-top: 14px; }
        .adm-meta { display: flex; flex-direction: column; gap: 10px; margin-top: 12px; font-size: 12px; }
        .adm-meta > div { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid var(--line); }
        .adm-meta > div:last-child { border-bottom: 0; }
        @media (max-width: 1000px) { .adm-edit { grid-template-columns: 1fr; } .adm-e-row { grid-template-columns: 1fr; } }
      `}</style>
    </AdminShell>
  );
}

window.Admin = Admin;
