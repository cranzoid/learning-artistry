/* global React, Link, Eyebrow, Arrow, Check, cx */
const { useState: useStateCT } = React;

function Contact() {
  const [form, setForm] = useStateCT({ name: "", email: "", org: "", interest: "individual", message: "" });
  const [sent, setSent] = useStateCT(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <section style={{ padding: "var(--s-8) 0 0", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="mono" style={{ fontSize: 11, paddingBottom: 20, borderBottom: "1px solid var(--line)", display: "flex", gap: 20 }}>
            <span>§ Contact</span>
            <span className="muted">Mon–Fri · 8a–8p GMT · Responses within 1 business day</span>
          </div>
          <h1 style={{ fontFamily: "var(--ff-serif)", fontWeight: 400, fontSize: "clamp(56px, 8vw, 112px)", lineHeight: 0.95, letterSpacing: "-0.035em", margin: "40px 0 24px" }}>
            Say <span className="italic">hello</span>.
          </h1>
          <p className="lead" style={{ maxWidth: "58ch", marginBottom: 60 }}>
            For individuals, corporate programs, press or partnerships — a real human replies to every message. Choose a path below.
          </p>
        </div>
      </section>

      <section className="ct">
        <div className="wrap">
          <div className="ct-grid">
            <form onSubmit={submit} className="ct-form">
              <div className="ct-form-head">
                <Eyebrow index="§ 01" label="Write to us"/>
              </div>
              <div className="ct-field ct-radios">
                <span className="ct-label">I'm writing as a…</span>
                <div className="ct-radio-row">
                  {[
                    ["individual", "Individual learner"],
                    ["corporate", "Company / team lead"],
                    ["press", "Press or partnerships"],
                  ].map(([k, l]) => (
                    <button type="button" key={k} onClick={() => setForm({ ...form, interest: k })} className={cx("ct-radio", form.interest === k && "active")}>
                      <span className="ct-radio-dot"/>
                      <span>{l}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="ct-row">
                <label className="ct-field">
                  <span className="ct-label">Your name</span>
                  <input value={form.name} onChange={set("name")} placeholder="Priya Raman" required/>
                </label>
                <label className="ct-field">
                  <span className="ct-label">Email</span>
                  <input type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" required/>
                </label>
              </div>
              <label className="ct-field">
                <span className="ct-label">{form.interest === "individual" ? "Company (optional)" : "Company"}</span>
                <input value={form.org} onChange={set("org")} placeholder={form.interest === "individual" ? "Where you work" : "Your organisation"} required={form.interest !== "individual"}/>
              </label>
              <label className="ct-field">
                <span className="ct-label">What are you looking for?</span>
                <textarea rows="5" value={form.message} onChange={set("message")} placeholder={form.interest === "corporate" ? "Tell us about your team — size, stack, timelines, outcomes you want." : "A question, a course, a career direction — anything."} required/>
              </label>
              <div className="ct-submit">
                <button type="submit" className={cx("btn btn-primary btn-lg", sent && "ct-sent")} disabled={sent}>
                  {sent ? <>Sent. We'll be in touch. <Check/></> : <>Send message <Arrow/></>}
                </button>
                <span className="mono muted" style={{ fontSize: 11 }}>Replies within 1 business day</span>
              </div>
            </form>

            <aside className="ct-side">
              <div className="ct-card">
                <Eyebrow index="§ 02" label="Direct"/>
                <div className="ct-direct">
                  <div>
                    <div className="mono muted" style={{ fontSize: 11 }}>INDIVIDUALS</div>
                    <a className="serif" style={{ fontSize: 22, letterSpacing: "-0.015em" }} href="mailto:hello@learningartistry.com">hello@learningartistry.com</a>
                  </div>
                  <div>
                    <div className="mono muted" style={{ fontSize: 11 }}>CORPORATE</div>
                    <a className="serif" style={{ fontSize: 22, letterSpacing: "-0.015em" }} href="mailto:teams@learningartistry.com">teams@learningartistry.com</a>
                  </div>
                  <div>
                    <div className="mono muted" style={{ fontSize: 11 }}>PRESS</div>
                    <a className="serif" style={{ fontSize: 22, letterSpacing: "-0.015em" }} href="mailto:press@learningartistry.com">press@learningartistry.com</a>
                  </div>
                  <div>
                    <div className="mono muted" style={{ fontSize: 11 }}>CALL</div>
                    <div className="serif" style={{ fontSize: 22, letterSpacing: "-0.015em" }}>+1 (415) 555 — 0142</div>
                  </div>
                </div>
              </div>
              <div className="ct-card">
                <Eyebrow index="§ 03" label="Studios"/>
                <div className="ct-studios">
                  {[
                    ["London", "14 Exmouth Market, EC1R", "HQ · founded 2019"],
                    ["Singapore", "71 Ayer Rajah Crescent", "APAC studio"],
                    ["Austin", "1203 E 6th Street", "Americas studio"],
                  ].map(([c, a, n], i) => (
                    <div key={i} className="ct-studio">
                      <div className="serif" style={{ fontSize: 20, letterSpacing: "-0.015em" }}>{c}</div>
                      <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>{a}</div>
                      <div className="mono muted" style={{ fontSize: 10, marginTop: 4 }}>{n}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ct-card" style={{ background: "var(--ink)", color: "var(--bg)" }}>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>§ 04 · Consultation</span>
                <div className="serif" style={{ fontSize: 28, letterSpacing: "-0.02em", marginTop: 14, color: "var(--bg)" }}>
                  Book a 30-minute<br/>career consultation.
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 12 }}>
                  A no-pressure conversation with one of our advisors about where you are, where you're heading, and which program fits.
                </p>
                <Link to="/contact" className="btn btn-primary" style={{ marginTop: 20 }}>Book a call <Arrow/></Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        .ct { padding-block: var(--s-7) var(--s-9); }
        .ct-grid { display: grid; grid-template-columns: 1.3fr 0.9fr; gap: 60px; }
        .ct-form { display: flex; flex-direction: column; gap: 24px; }
        .ct-form-head { padding-bottom: 8px; border-bottom: 1px solid var(--line); }
        .ct-field { display: flex; flex-direction: column; gap: 10px; }
        .ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .ct-label { font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-4); }
        .ct-field input, .ct-field textarea {
          border: 0;
          border-bottom: 1px solid var(--line-2);
          padding: 12px 0 10px;
          font-size: 17px;
          background: transparent;
          color: var(--ink);
          outline: none;
          font-family: inherit;
          transition: border-color .3s var(--ease);
        }
        .ct-field input:focus, .ct-field textarea:focus { border-bottom-color: var(--accent); }
        .ct-field textarea { resize: vertical; min-height: 120px; }
        .ct-radio-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .ct-radio { padding: 10px 16px; border: 1px solid var(--line); border-radius: 999px; display: inline-flex; align-items: center; gap: 8px; font-size: 14px; color: var(--ink-3); transition: all .2s var(--ease); }
        .ct-radio-dot { width: 10px; height: 10px; border-radius: 999px; border: 1px solid var(--ink-5); transition: background .2s var(--ease); }
        .ct-radio.active { border-color: var(--ink); color: var(--ink); }
        .ct-radio.active .ct-radio-dot { background: var(--accent); border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
        .ct-submit { display: flex; align-items: center; gap: 20px; margin-top: 8px; padding-top: 20px; border-top: 1px solid var(--line); }
        .ct-sent { background: var(--ink) !important; }
        .ct-side { display: flex; flex-direction: column; gap: 16px; }
        .ct-card { padding: 28px; border: 1px solid var(--line); border-radius: 14px; background: var(--surface); }
        .ct-direct { display: flex; flex-direction: column; gap: 16px; margin-top: 20px; }
        .ct-direct a:hover { color: var(--accent); }
        .ct-studios { display: flex; flex-direction: column; gap: 16px; margin-top: 20px; }
        .ct-studio { padding-bottom: 14px; border-bottom: 1px solid var(--line); }
        .ct-studio:last-child { border-bottom: 0; padding-bottom: 0; }
        @media (max-width: 900px) { .ct-grid { grid-template-columns: 1fr; } .ct-row { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}

window.Contact = Contact;
