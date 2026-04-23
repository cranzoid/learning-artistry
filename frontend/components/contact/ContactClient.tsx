'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import { ArrowIcon, CheckIcon } from '@/components/ui/icons';
import { submitInquiry } from '@/lib/api';

type Interest = 'individual' | 'corporate' | 'press';

interface FormState {
  name: string;
  email: string;
  org: string;
  interest: Interest;
  message: string;
}

type Status = 'idle' | 'submitting' | 'sent' | 'error';

const OFFICE = {
  city: 'Gurugram',
  address: 'WeWork, Blue 1 Square, 246, Phase IV, Udyog Vihar, Sector 18, Gurugram, Haryana 122015',
  note: 'Primary office',
};

const INTEREST_OPTIONS: [Interest, string][] = [
  ['individual', 'Individual learner'],
  ['corporate', 'Company / team lead'],
  ['press', 'Press or partnerships'],
];

export default function ContactClient() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    org: '',
    interest: 'individual',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const setInterest = (v: Interest) => setForm((f) => ({ ...f, interest: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      await submitInquiry({
        name: form.name,
        email: form.email,
        organisation: form.org || undefined,
        inquiry_type: form.interest,
        message: form.message,
      });
      setStatus('sent');
      resetTimerRef.current = setTimeout(() => {
        setStatus('idle');
        setForm({ name: '', email: '', org: '', interest: 'individual', message: '' });
      }, 5000);
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const isSubmitting = status === 'submitting';
  const showSuccess = status === 'sent';
  const showError = status === 'error';

  const msgPlaceholder =
    form.interest === 'corporate'
      ? 'Tell us about your team — size, stack, timelines, outcomes you want.'
      : 'A question, a course, a career direction — anything.';

  return (
    <>
      {/* ── Page header ── */}
      <section
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) 0 0',
          borderBottom: '1px solid var(--color-line)',
        }}
      >
        <div className="wrap">
          <div
            className="mono"
            style={{
              fontSize: 11,
              paddingBottom: 20,
              borderBottom: '1px solid var(--color-line)',
              display: 'flex',
              gap: 20,
              color: 'var(--color-ink-4)',
              flexWrap: 'wrap',
            }}
          >
            <span>§ Contact</span>
            <span>Mon–Fri · Business hours IST · Responses within 1 business day</span>
          </div>
          <h1
            className="serif"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.035em',
              margin: '40px 0 24px',
            }}
          >
            Say <em>hello</em>.
          </h1>
          <p
            className="lead"
            style={{ maxWidth: '58ch', marginBottom: 60 }}
          >
            For individual enrolments, team training, or general enquiries, reach out and
            we&apos;ll guide you to the right next step.
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <section style={{ paddingBlock: 'clamp(3rem, 6vw, 5rem) clamp(4rem, 8vw, 7rem)' }}>
        <div className="wrap">
          <div className="ct-grid">
            {/* Form */}
            <form onSubmit={submit} className="ct-form" noValidate>
              <div
                style={{
                  paddingBottom: 8,
                  borderBottom: '1px solid var(--color-line)',
                  marginBottom: 8,
                }}
              >
                <Eyebrow index="§ 01" label="Write to us" />
              </div>

              {/* Interest selector */}
              <div className="ct-field">
                <span className="ct-label">I&apos;m writing as a…</span>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    gap: 10,
                    marginTop: 4,
                  }}
                >
                  {INTEREST_OPTIONS.map(([k, l]) => {
                    const isActive = form.interest === k;
                    return (
                      <button
                        type="button"
                        key={k}
                        onClick={() => setInterest(k)}
                        aria-pressed={isActive}
                        aria-label={l}
                        disabled={isSubmitting}
                        style={{
                          padding: '12px 16px',
                          border: `1px solid ${isActive ? 'var(--color-ink)' : 'var(--color-line)'}`,
                          borderRadius: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                          fontSize: 14,
                          fontFamily: 'inherit',
                          color: isActive ? 'var(--color-bg)' : 'var(--color-ink-3)',
                          background: isActive ? 'var(--color-ink)' : 'var(--color-surface)',
                          cursor: 'pointer',
                          transition: 'all .2s',
                          textAlign: 'center',
                          minHeight: 52,
                          lineHeight: 1.35,
                          boxShadow: isActive ? '0 8px 24px rgba(10,10,10,0.12)' : 'none',
                          opacity: isSubmitting ? 0.7 : 1,
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: isActive ? 'var(--color-accent)' : 'var(--color-line-2)',
                            flexShrink: 0,
                            transition: 'background .2s',
                          }}
                        />
                        <span>{l}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name + Email */}
              <div className="ct-row">
                <label className="ct-field">
                  <span className="ct-label">Your name</span>
                  <input
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Priya Raman"
                    required
                    disabled={isSubmitting}
                  />
                </label>
                <label className="ct-field">
                  <span className="ct-label">Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="you@company.com"
                    required
                    disabled={isSubmitting}
                  />
                </label>
              </div>

              {/* Org */}
              <label className="ct-field">
                <span className="ct-label">
                  {form.interest === 'individual' ? 'Company (optional)' : 'Company'}
                </span>
                <input
                  value={form.org}
                  onChange={set('org')}
                  placeholder={
                    form.interest === 'individual' ? 'Where you work' : 'Your organisation'
                  }
                  required={form.interest !== 'individual'}
                  disabled={isSubmitting}
                />
              </label>

              {/* Message */}
              <label className="ct-field">
                <span className="ct-label">What are you looking for?</span>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  placeholder={msgPlaceholder}
                  required
                  disabled={isSubmitting}
                />
              </label>

              {isSubmitting && (
                <div className="ct-status ct-status-pending" aria-live="polite">
                  Sending your message. Please keep this tab open for a moment.
                </div>
              )}

              {showSuccess && (
                <div className="ct-status ct-status-success" aria-live="polite">
                  Your message was sent successfully. A member of our team will reply
                  within one business day.
                </div>
              )}

              {showError && (
                <div
                  className="ct-status ct-status-error"
                  aria-live="polite"
                >
                  {errorMsg}
                </div>
              )}

              {/* Submit */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  marginTop: 8,
                  paddingTop: 20,
                  borderTop: '1px solid var(--color-line)',
                }}
              >
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={isSubmitting || showSuccess}
                  style={showSuccess ? { background: 'var(--color-ink)', borderColor: 'var(--color-ink)' } : {}}
                >
                  {isSubmitting ? (
                    'Sending…'
                  ) : showSuccess ? (
                    <>Sent. We&apos;ll be in touch. <CheckIcon /></>
                  ) : (
                    <>Send message <ArrowIcon /></>
                  )}
                </button>
                <span className="mono" style={{ fontSize: 11, color: 'var(--color-ink-4)' }}>
                  Replies within 1 business day
                </span>
              </div>
            </form>

            {/* Sidebar */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Direct contact */}
              <div className="ct-card">
                <Eyebrow index="§ 02" label="Direct" />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                  marginTop: 20,
                }}
              >
                {[
                    { label: 'EMAIL', href: 'mailto:learning@thelearningartistry.com', val: 'learning@thelearningartistry.com' },
                    { label: 'CALL', href: 'tel:+919211571166', val: '+91 9211571166' },
                  ].map(({ label, href, val }) => (
                    <div key={label}>
                      <div
                        className="mono"
                        style={{ fontSize: 11, color: 'var(--color-ink-4)', letterSpacing: '0.06em' }}
                      >
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          className="serif"
                          style={{
                            fontSize: 22,
                            letterSpacing: '-0.015em',
                            display: 'block',
                            marginTop: 4,
                            transition: 'color .2s',
                          }}
                          onMouseEnter={(e) =>
                            ((e.target as HTMLAnchorElement).style.color = 'var(--color-accent)')
                          }
                          onMouseLeave={(e) =>
                            ((e.target as HTMLAnchorElement).style.color = '')
                          }
                        >
                          {val}
                        </a>
                      ) : (
                        <div
                          className="serif"
                          style={{ fontSize: 22, letterSpacing: '-0.015em', marginTop: 4 }}
                        >
                          {val}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

              {/* Office */}
              <div className="ct-card">
                <Eyebrow index="§ 03" label="Office" />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    marginTop: 20,
                  }}
                >
                  <div>
                    <div
                      className="serif"
                      style={{ fontSize: 20, letterSpacing: '-0.015em' }}
                    >
                      {OFFICE.city}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--color-ink-3)', marginTop: 6, lineHeight: 1.6 }}>
                      {OFFICE.address}
                    </div>
                    <div
                      className="mono"
                      style={{ fontSize: 10, color: 'var(--color-ink-4)', marginTop: 8 }}
                    >
                      {OFFICE.note}
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation card (dark) */}
              <div
                className="ct-card"
                style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }}
              >
                <span
                  className="eyebrow"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  § 04 · Consultation
                </span>
                <div
                  className="serif"
                  style={{
                    fontSize: 28,
                    letterSpacing: '-0.02em',
                    marginTop: 14,
                    color: 'var(--color-bg)',
                    lineHeight: 1.1,
                  }}
                >
                  Need help choosing the
                  <br />
                  right program?
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.6)',
                    marginTop: 12,
                    lineHeight: 1.55,
                  }}
                >
                  Use the form to tell us what you&apos;re looking for and we&apos;ll help you find
                  the most relevant course or training path.
                </p>
                <Link
                  href="/courses"
                  className="btn btn-primary"
                  style={{ marginTop: 20, display: 'inline-flex' }}
                >
                  Browse programs <ArrowIcon />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        .ct-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.9fr;
          gap: 60px;
        }
        .ct-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .ct-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ct-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .ct-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-ink-4);
        }
        .ct-field input,
        .ct-field textarea {
          border: 0;
          border-bottom: 1px solid var(--color-line-2);
          padding: 12px 0 10px;
          font-size: 17px;
          background: transparent;
          color: var(--color-ink);
          outline: none;
          font-family: inherit;
          transition: border-color .3s;
          width: 100%;
        }
        .ct-field input:focus,
        .ct-field textarea:focus { border-bottom-color: var(--color-accent); }
        .ct-field textarea { resize: vertical; min-height: 120px; }
        .ct-field input:disabled,
        .ct-field textarea:disabled { opacity: 0.5; cursor: not-allowed; }
        .ct-status {
          padding: 14px 18px;
          border-radius: 10px;
          font-size: 14px;
          line-height: 1.5;
        }
        .ct-status-pending {
          background: color-mix(in oklab, var(--color-bg-alt) 82%, white);
          border: 1px solid var(--color-line);
          color: var(--color-ink-3);
        }
        .ct-status-success {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
        }
        .ct-status-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
        }
        .ct-card {
          padding: 28px;
          border: 1px solid var(--color-line);
          border-radius: 14px;
          background: var(--color-surface);
        }
        @media (max-width: 900px) {
          .ct-grid { grid-template-columns: 1fr; }
          .ct-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
