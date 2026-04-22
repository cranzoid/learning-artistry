/* global React, Link, useRoute, useTweaks, useClock, NAV, Arrow, ArrowUpRight, cx */
const { useState: useStateC, useEffect: useEffectC, useRef: useRefC } = React;

// ---------- Logo mark ----------
function Logomark({ size = 28 }) {
  // Original mark: interlocking "LA" using two overlapping geometric forms
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="1" y="1" width="30" height="30" rx="6" fill="var(--ink)" />
      <path d="M8 22V10" stroke="var(--bg)" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M8 22h6" stroke="var(--bg)" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M17 22 22 10l5 12" stroke="var(--bg)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.2 18h5.6" stroke="var(--bg)" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="26.5" cy="5.5" r="1.1" fill="var(--accent)"/>
    </svg>
  );
}

function Wordmark() {
  return (
    <Link to="/" className="wm">
      <Logomark size={26}/>
      <span className="wm-text">
        <span className="wm-the">The</span>
        <span className="wm-la">Learning Artistry</span>
      </span>
      <style>{`
        .wm { display:inline-flex; align-items:center; gap:10px; }
        .wm-text { display:inline-flex; align-items:baseline; gap:6px; line-height:1; }
        .wm-the { font-family: var(--ff-serif); font-style: italic; font-size:17px; color: var(--ink-3); }
        .wm-la { font-family: var(--ff-sans); font-size:16px; font-weight:500; letter-spacing:-0.01em; color: var(--ink); }
      `}</style>
    </Link>
  );
}

// ---------- Top nav ----------
function TopNav() {
  const { path, navigate } = useRoute();
  const [scrolled, setScrolled] = useStateC(false);
  const now = useClock();

  useEffectC(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <>
      <div className="topstrip">
        <div className="wrap topstrip-inner">
          <span className="mono"><span className="ticker-dot" /> Spring cohorts open · Next start Monday</span>
          <span className="mono muted">Global · Training & Certification · Est. 2019</span>
          <span className="mono">{time} UTC</span>
        </div>
      </div>
      <header className={cx("nav", scrolled && "nav-scrolled")}>
        <div className="wrap nav-inner">
          <Wordmark/>
          <nav className="nav-links">
            {NAV.map(n => {
              const active = (n.to === "/" ? path === "/" : path.startsWith(n.to));
              return (
                <Link key={n.to} to={n.to} className={cx("nav-link", active && "active")}>
                  <span className="nav-link-text">{n.label}</span>
                  <span className="nav-link-num">{String(NAV.indexOf(n) + 1).padStart(2,"0")}</span>
                </Link>
              );
            })}
          </nav>
          <div className="nav-cta">
            <Link to="/corporate" className="nav-quiet">For teams</Link>
            <Link to="/courses" className="btn btn-ink">Browse courses <Arrow/></Link>
          </div>
        </div>
      </header>
      <style>{`
        .topstrip {
          border-bottom: 1px solid var(--line);
          background: var(--bg);
          font-size: 11px;
          color: var(--ink-3);
        }
        .topstrip-inner {
          display: flex; justify-content: space-between; align-items: center;
          height: 32px; font-size: 11px; letter-spacing: 0.02em;
        }
        .nav {
          position: sticky; top: 0; z-index: 50;
          backdrop-filter: blur(14px);
          background: color-mix(in oklab, var(--bg) 82%, transparent);
          border-bottom: 1px solid transparent;
          transition: border-color .3s var(--ease), background .3s var(--ease);
        }
        .nav-scrolled { border-bottom-color: var(--line); }
        .nav-inner {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 40px;
          height: 72px;
        }
        .nav-links { display: flex; gap: 4px; justify-self: center; }
        .nav-link {
          position: relative;
          padding: 10px 14px;
          font-size: 14px;
          font-weight: 500;
          color: var(--ink-3);
          display: inline-flex;
          align-items: baseline;
          gap: 6px;
          border-radius: 999px;
          transition: color .3s var(--ease), background .3s var(--ease);
        }
        .nav-link:hover { color: var(--ink); }
        .nav-link.active { color: var(--ink); background: var(--bg-alt); }
        .nav-link-num {
          font-family: var(--ff-mono);
          font-size: 10px;
          color: var(--ink-4);
          letter-spacing: 0.04em;
        }
        .nav-link.active .nav-link-num { color: var(--accent); }
        .nav-cta { display: flex; align-items: center; gap: 16px; }
        .nav-quiet { font-size: 14px; color: var(--ink-3); }
        .nav-quiet:hover { color: var(--ink); }
        @media (max-width: 880px) {
          .nav-links { display:none; }
          .nav-inner { grid-template-columns: auto 1fr; }
          .topstrip-inner > :nth-child(2) { display:none; }
        }
      `}</style>
    </>
  );
}

// ---------- Footer ----------
function Footer() {
  const now = new Date();
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-mark">
            <div className="display" style={{ fontSize: "clamp(64px, 12vw, 180px)", lineHeight: 0.85, letterSpacing: "-0.035em" }}>
              Training,<br/><span className="italic">mastered.</span>
            </div>
            <div className="foot-cta">
              <Link to="/courses" className="btn btn-primary btn-lg">Explore programs <Arrow/></Link>
              <Link to="/corporate" className="btn btn-ghost btn-lg">Talk to our team</Link>
            </div>
          </div>
        </div>
        <div className="foot-grid">
          <div className="foot-col">
            <div className="eyebrow">Studio</div>
            <Wordmark/>
            <p className="muted" style={{ marginTop: 12, maxWidth: 260, fontSize: 14, lineHeight: 1.55 }}>
              A training and certification studio for professionals and teams taking their craft seriously.
            </p>
          </div>
          <div className="foot-col">
            <div className="eyebrow">Learn</div>
            <Link to="/courses">All courses</Link>
            <Link to="/courses?cat=cloud">Cloud & IT</Link>
            <Link to="/courses?cat=dev">Software Development</Link>
            <Link to="/courses?cat=pm">Project Management</Link>
            <Link to="/courses?cat=quality">Quality Management</Link>
            <Link to="/courses?cat=data">Data & AI</Link>
          </div>
          <div className="foot-col">
            <div className="eyebrow">Studio</div>
            <Link to="/about">About</Link>
            <Link to="/corporate">For teams</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/admin">Admin</Link>
          </div>
          <div className="foot-col">
            <div className="eyebrow">Contact</div>
            <a href="mailto:hello@learningartistry.com">hello@learningartistry.com</a>
            <a>+1 (415) 555 — 0142</a>
            <span className="muted">Mon–Fri · 8a–8p GMT</span>
            <span className="muted" style={{ marginTop: 8 }}>Studios in London · Singapore · Austin</span>
          </div>
        </div>
        <div className="foot-bottom">
          <span className="mono">© {now.getFullYear()} The Learning Artistry, Ltd.</span>
          <span className="mono muted">Designed with restraint in London</span>
          <span className="mono">v 4.2 · Catalog Spring ‘26</span>
        </div>
      </div>
      <style>{`
        .foot { background: var(--bg); border-top: 1px solid var(--line); margin-top: var(--s-10); }
        .foot-top { padding-block: var(--s-9) var(--s-8); border-bottom: 1px solid var(--line); }
        .foot-mark { display: flex; align-items: flex-end; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
        .foot-cta { display: flex; gap: 12px; flex-wrap: wrap; }
        .foot-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 40px;
          padding-block: var(--s-8);
          border-bottom: 1px solid var(--line);
        }
        .foot-col { display: flex; flex-direction: column; gap: 10px; font-size: 14px; }
        .foot-col .eyebrow { margin-bottom: 10px; }
        .foot-col a { color: var(--ink-2); transition: color .2s var(--ease); }
        .foot-col a:hover { color: var(--accent); }
        .foot-bottom {
          display: flex; justify-content: space-between; align-items: center;
          padding-block: var(--s-5);
          font-size: 12px;
        }
        @media (max-width: 820px) {
          .foot-grid { grid-template-columns: 1fr 1fr; }
          .foot-bottom { flex-direction: column; align-items: flex-start; gap: 8px; }
        }
      `}</style>
    </footer>
  );
}

// ---------- Tweaks panel ----------
function TweaksPanel() {
  const { tweaks, set, editMode } = useTweaks();
  if (!editMode) return null;

  const Opt = ({ k, val, label }) => (
    <button
      onClick={() => set(k, val)}
      className={cx("tw-opt", tweaks[k] === val && "active")}>
      {label}
    </button>
  );

  return (
    <div className="tweaks">
      <div className="tweaks-head">
        <span className="eyebrow eyebrow-ink">Tweaks</span>
        <span className="mono muted">Studio Panel</span>
      </div>
      <div className="tw-row">
        <span className="tw-label">Mode</span>
        <div className="tw-opts">
          <Opt k="mode" val="light" label="Light"/>
          <Opt k="mode" val="dark" label="Dark"/>
        </div>
      </div>
      <div className="tw-row">
        <span className="tw-label">Accent</span>
        <div className="tw-opts">
          <Opt k="accent" val="indigo" label="Indigo"/>
          <Opt k="accent" val="ink" label="Ink"/>
          <Opt k="accent" val="ember" label="Ember"/>
        </div>
      </div>
      <div className="tw-row">
        <span className="tw-label">Density</span>
        <div className="tw-opts">
          <Opt k="density" val="spacious" label="Spacious"/>
          <Opt k="density" val="compact" label="Compact"/>
        </div>
      </div>
      <div className="tw-row">
        <span className="tw-label">Type</span>
        <div className="tw-opts">
          <Opt k="type_pair" val="serif-grotesk" label="Serif + Sans"/>
          <Opt k="type_pair" val="grotesk" label="All Sans"/>
          <Opt k="type_pair" val="serif-mono" label="Serif + Mono"/>
          <Opt k="type_pair" val="humanist" label="Humanist"/>
        </div>
      </div>
      <div className="tw-row">
        <span className="tw-label">Hero</span>
        <div className="tw-opts">
          <Opt k="hero_variant" val="editorial" label="Editorial"/>
          <Opt k="hero_variant" val="canvas" label="Canvas"/>
          <Opt k="hero_variant" val="index" label="Index"/>
        </div>
      </div>
      <div className="tw-row">
        <span className="tw-label">Card</span>
        <div className="tw-opts">
          <Opt k="card_style" val="editorial" label="Editorial"/>
          <Opt k="card_style" val="portrait" label="Portrait"/>
          <Opt k="card_style" val="list" label="List"/>
        </div>
      </div>
      <style>{`
        .tweaks {
          position: fixed;
          right: 16px; bottom: 16px;
          width: 300px;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 14px;
          box-shadow: var(--shadow-2);
          padding: 14px;
          z-index: 100;
          display: flex; flex-direction: column; gap: 10px;
        }
        .tweaks-head { display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid var(--line); }
        .tw-row { display: flex; flex-direction: column; gap: 6px; }
        .tw-label { font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-4); }
        .tw-opts { display: flex; flex-wrap: wrap; gap: 4px; }
        .tw-opt {
          padding: 6px 10px;
          border: 1px solid var(--line);
          border-radius: 999px;
          font-size: 12px;
          color: var(--ink-3);
          transition: all .2s var(--ease);
        }
        .tw-opt:hover { border-color: var(--ink-4); color: var(--ink); }
        .tw-opt.active { background: var(--ink); color: var(--bg); border-color: var(--ink); }
      `}</style>
    </div>
  );
}

Object.assign(window, { Logomark, Wordmark, TopNav, Footer, TweaksPanel });
