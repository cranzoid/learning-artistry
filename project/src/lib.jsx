/* global React */
const { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } = React;

// ---------- Router ----------
const RouterCtx = createContext(null);

function useRoute() { return useContext(RouterCtx); }

function parseHash() {
  const h = (window.location.hash || "#/").replace(/^#/, "");
  // Split path and query
  const [pathRaw, queryRaw] = h.split("?");
  const path = pathRaw || "/";
  const query = {};
  if (queryRaw) {
    queryRaw.split("&").forEach(p => {
      const [k, v] = p.split("=");
      if (k) query[decodeURIComponent(k)] = decodeURIComponent(v || "");
    });
  }
  return { path, query };
}

function RouterProvider({ children }) {
  const [route, setRoute] = useState(parseHash());

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) window.location.hash = "#/";
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback((to) => {
    if (typeof to !== "string") return;
    if (!to.startsWith("#")) to = "#" + to;
    if (window.location.hash !== to) window.location.hash = to;
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <RouterCtx.Provider value={{ ...route, navigate }}>
      {children}
    </RouterCtx.Provider>
  );
}

function Link({ to, children, className, style, onClick }) {
  const { navigate } = useRoute();
  return (
    <a href={"#" + to}
       className={className}
       style={style}
       onClick={(e) => { e.preventDefault(); if (onClick) onClick(e); navigate(to); }}>
      {children}
    </a>
  );
}

// ---------- Tweaks (edit mode) ----------
const TweaksCtx = createContext(null);
function useTweaks() { return useContext(TweaksCtx); }

function TweaksProvider({ children }) {
  const defaults = window.__TWEAKS_DEFAULTS__ || {};
  const stored = (() => {
    try { return JSON.parse(localStorage.getItem("tla_tweaks") || "{}"); } catch { return {}; }
  })();
  const [tweaks, setTweaks] = useState({ ...defaults, ...stored });
  const [editMode, setEditMode] = useState(false);

  // Apply tweaks to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.mode = tweaks.mode || "light";
    root.dataset.accent = tweaks.accent || "indigo";
    root.dataset.density = tweaks.density || "spacious";
    root.dataset.type = tweaks.type_pair || "serif-grotesk";
    try { localStorage.setItem("tla_tweaks", JSON.stringify(tweaks)); } catch {}
  }, [tweaks]);

  // Edit-mode protocol
  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setEditMode(true);
      if (d.type === "__deactivate_edit_mode") setEditMode(false);
    };
    window.addEventListener("message", onMsg);
    window.parent && window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const set = useCallback((k, v) => {
    setTweaks(t => {
      const next = { ...t, [k]: v };
      try { window.parent && window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*"); } catch {}
      return next;
    });
  }, []);

  return (
    <TweaksCtx.Provider value={{ tweaks, set, editMode }}>
      {children}
    </TweaksCtx.Provider>
  );
}

// ---------- Misc helpers ----------
function cx(...parts) { return parts.filter(Boolean).join(" "); }

function fmtPrice(n) {
  return "$" + n.toLocaleString("en-US");
}

function Arrow({ size = 14, className }) {
  return (
    <svg className={className} viewBox="0 0 14 14" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ArrowUpRight({ size = 14, className }) {
  return (
    <svg className={className} viewBox="0 0 14 14" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 10 10 4M5 4h5v5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Plus({ size = 14, className }) {
  return (
    <svg className={className} viewBox="0 0 14 14" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 2v10M2 7h10" strokeLinecap="round"/>
    </svg>
  );
}

function Check({ size = 14, className }) {
  return (
    <svg className={className} viewBox="0 0 14 14" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M2.5 7.5 6 11l6-8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// IntersectionObserver hook for reveals
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

// Current time ticker
function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

Object.assign(window, {
  useRoute, RouterProvider, Link,
  useTweaks, TweaksProvider,
  cx, fmtPrice, useReveal, useClock,
  Arrow, ArrowUpRight, Plus, Check,
});
