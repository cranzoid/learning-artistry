import type { Metadata } from 'next';
import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHead from '@/components/ui/SectionHead';
import { ArrowIcon, CheckIcon } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Corporate Training — The Learning Artistry',
  description:
    'Custom training programs for teams that want practical, well-structured capability building.',
  openGraph: {
    title: 'Corporate Training — The Learning Artistry',
    description:
      'Custom team training with clear scope, practical delivery, and thoughtful follow-through.',
  },
};

const STATS = [
  { v: 'Custom', l: 'PROGRAM DESIGN', s: 'scoped around your audience, goals, and timelines' },
  { v: 'Applied', l: 'DELIVERY STYLE', s: 'live instruction, guided practice, and relevant exercises' },
  { v: 'Clear', l: 'PROGRESS REVIEWS', s: 'feedback, checkpoints, and follow-up recommendations' },
  { v: 'Single', l: 'POINT OF CONTACT', s: 'coordination across planning, delivery, and next steps' },
];

const CLIENTS = [
  'Engineering teams', 'Operations teams', 'Project offices', 'L&D leaders',
  'Technology teams', 'Quality teams', 'Delivery leaders', 'Internal academies',
];

const BENEFITS = [
  {
    n: 'I.',
    t: 'Capability, not hours',
    d: 'We measure what your team can do at week 0 and week 12. The delta is your ROI — not attendance, not NPS, not hours logged.',
  },
  {
    n: 'II.',
    t: 'Curriculum that fits',
    d: 'Every program is co-designed against your tech stack, certification targets and operating model. Labs run on your infrastructure where possible. Zero reused decks.',
  },
  {
    n: 'III.',
    t: 'One accountable partner',
    d: 'Program management, instructors, assessments, reporting — one point of contact, one accountable partner. We handle the rest.',
  },
  {
    n: 'IV.',
    t: 'Built to renew',
    d: 'We aim to make the next conversation obvious by delivering something useful, well run, and worth extending into the next team or capability area.',
  },
];

const APPROACH_STEPS = [
  { k: 'Discover', d: 'A 90-minute working session. We map roles, current capability, business outcomes you\'re after — and what would be measurably different in twelve months.', wk: 'Week 0' },
  { k: 'Design', d: 'We build a syllabus against your stack, certifications, timezones. Dry-run with your stakeholders. Sign-off before kick-off.', wk: 'Weeks 1–2' },
  { k: 'Deliver', d: 'Live cohorts, labs on your infrastructure, weekly critiques. Dedicated program manager embedded with your team throughout.', wk: 'Weeks 3–14' },
  { k: 'Measure', d: 'Baseline vs. outcome assessment. Manager 360°. Certification pass rates. A dashboard you can take to your CFO with confidence.', wk: 'Week 15' },
  { k: 'Renew', d: 'We meet at 90 days, 6 months and 12 months. Calibrate the next cohort. Widen or deepen the bench. Compound the capability.', wk: 'Year 2' },
];

const FORMATS = [
  { k: 'Cohort program', s: '12–16 week structured track, live instruction, 20–40 seats.', ideal: 'Engineering teams, certification drives, onboarding programs.', size: '20–40 seats', price: 'From $89k' },
  { k: 'Executive intensive', s: '1–2 week offsite. Small group. Senior leaders, high-intensity.', ideal: 'Leadership transitions, new-scope prep, director+ cohorts.', size: '8–16 seats', price: 'From $124k' },
  { k: 'Custom bootcamp', s: '2–5 day immersive, on-site or hybrid. Labs on your stack.', ideal: 'Migration accelerators, new stack introductions, reorgs.', size: 'Up to 80 seats', price: 'From $46k' },
  { k: 'Fractional academy', s: 'A standing program. We run it; you own the outcomes.', ideal: 'Fortune-500 with recurring capability needs across functions.', size: 'Unlimited', price: 'Annual retainer' },
];

const ROI_ITEMS = [
  { v: 'Cloud', l: 'Certification preparation aligned to role expectations, project context, and applied practice.', c: 'Useful for teams building shared technical confidence.' },
  { v: 'Ops', l: 'Programs shaped around process, quality, and execution improvements rather than classroom completion alone.', c: 'Best for teams that need learning to connect back to real operating work.' },
  { v: 'PM', l: 'Structured training for delivery and project teams building a common language, cadence, and baseline.', c: 'Helpful for PMOs, transformation teams, and internal capability building.' },
  { v: 'L&D', l: 'Clear participation, feedback, and next-step summaries for sponsors and people leaders.', c: 'Designed to support better decisions after the program ends.' },
];

export default function CorporateTrainingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          paddingBlock: 'clamp(4rem, 8vw, 7rem) clamp(4rem, 8vw, 7rem)',
          borderBottom: '1px solid var(--color-line)',
        }}
      >
        <div className="wrap">
          {/* Meta strip */}
          <div
            className="mono"
            style={{
              display: 'flex',
              gap: 24,
              paddingBottom: 22,
              borderBottom: '1px solid var(--color-line)',
              fontSize: 11,
              color: 'var(--color-ink-4)',
              flexWrap: 'wrap',
            }}
          >
            <span>§ For enterprise</span>
            <span>Custom training &amp; certification programs</span>
            <span>For teams that want practical, structured learning</span>
          </div>

          {/* Two-col hero */}
          <div className="cp-hero-grid">
            <div>
              <div
                className="chip chip-accent"
                style={{ marginBottom: 24, display: 'inline-flex' }}
              >
                For CHROs, CTOs &amp; L&amp;D leaders
              </div>
              <h1
                className="serif"
                style={{
                  fontWeight: 400,
                  fontSize: 'clamp(3.75rem, 9.5vw, 9.75rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.04em',
                  margin: 0,
                }}
              >
                Build the{' '}
                <em>bench</em>
                <br />
                your next five
                <br />
                years will need.
              </h1>
            </div>
            <div style={{ paddingBottom: 16 }}>
              <p className="lead">
                We partner with engineering, operations and program leaders to build training
                that ladders into measurable capability. Curriculum design, baseline assessments,
                cohort delivery and progress reporting, handled with one point of contact and a
                clear operating process.
              </p>
              <div
                style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}
              >
                <Link href="/contact" className="btn btn-primary btn-lg">
                  Book a consultation <ArrowIcon />
                </Link>
                <a href="#cp-approach" className="btn btn-ghost btn-lg">
                  How we work
                </a>
              </div>
              <div
                className="mono"
                style={{
                  marginTop: 28,
                  paddingTop: 20,
                  borderTop: '1px solid var(--color-line)',
                  fontSize: 11,
                  color: 'var(--color-ink-3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  letterSpacing: '0.04em',
                }}
              >
                <CheckIcon size={13} />
                Suitable for internal cohorts, private groups, and team capability programs
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="cp-stats">
            {STATS.map((s, i) => (
              <div key={i} className="cp-stat">
                <div
                  className="serif"
                  style={{
                    fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
                    letterSpacing: '-0.035em',
                    lineHeight: 0.88,
                  }}
                >
                  {s.v}
                </div>
                <div
                  className="mono"
                  style={{
                    color: 'var(--color-ink-2)',
                    fontSize: 11,
                    marginTop: 10,
                    letterSpacing: '0.04em',
                    lineHeight: 1.4,
                    maxWidth: '24ch',
                  }}
                >
                  {s.l}
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    marginTop: 4,
                    color: 'var(--color-ink-4)',
                    lineHeight: 1.4,
                  }}
                >
                  {s.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clients ── */}
      <section
        style={{
          padding: '48px 0',
          borderBottom: '1px solid var(--color-line)',
          background: 'var(--color-bg-alt)',
        }}
      >
        <div className="wrap">
          <div
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-ink-4)',
              textAlign: 'center',
              marginBottom: 28,
            }}
          >
            Built for teams led by
          </div>
          <div
            style={{
              display: 'flex',
              gap: 56,
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {CLIENTS.map((c, i) => (
              <span
                key={i}
                className="serif"
                style={{ fontSize: 24, color: 'var(--color-ink-3)', letterSpacing: '-0.01em' }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof / Quote ── */}
      <section style={{ paddingBlock: 'clamp(5rem, 9vw, 8rem)' }}>
        <div className="wrap">
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <svg
              width={40}
              height={32}
              viewBox="0 0 40 32"
              fill="none"
              style={{ color: 'var(--color-accent)', marginBottom: 24 }}
            >
              <path
                d="M0 32V20Q0 8 8 0H14Q8 8 8 20H16V32H0ZM24 32V20Q24 8 32 0H38Q32 8 32 20H40V32H24Z"
                fill="currentColor"
              />
            </svg>
            <blockquote
              className="serif"
              style={{
                fontWeight: 400,
                fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: 0,
                maxWidth: '22ch',
              }}
            >
              The strongest team programs start with the work people actually need to do next.
              That means relevant practice, thoughtful facilitation, and a clear plan for what
              happens after the final session.
            </blockquote>
            <div
              style={{
                marginTop: 40,
                paddingTop: 24,
                borderTop: '1px solid var(--color-line)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 24,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div
                  className="serif"
                  style={{ fontSize: 17, letterSpacing: '-0.01em' }}
                >
                  The Learning Artistry approach
                </div>
                <div
                  className="mono"
                  style={{ fontSize: 11, color: 'var(--color-ink-4)' }}
                >
                  Corporate training philosophy
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div
                  className="mono"
                  style={{ fontSize: 10, color: 'var(--color-ink-4)', letterSpacing: '0.06em' }}
                >
                  FOCUS
                </div>
                <div
                  className="serif"
                  style={{ fontSize: 16, letterSpacing: '-0.01em' }}
                >
                  Relevance, structure, and follow-through
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section
        className="section"
        style={{ borderTop: '1px solid var(--color-line)' }}
      >
        <div className="wrap">
          <SectionHead
            index="§ 02"
            eyebrow="What's different"
            align="split"
            title={
              <>
                Four commitments that <em className="serif">change</em> outcomes.
              </>
            }
            sub="Enterprise training often becomes generic too quickly. We focus on making the scope, delivery, and follow-up specific enough to be genuinely useful."
          />
          <div style={{ marginTop: 56, borderTop: '1px solid var(--color-line)' }}>
            {BENEFITS.map((b, i) => (
              <div key={i} className="benefit-row">
                <div
                  className="serif"
                  style={{
                    fontSize: 48,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                  }}
                >
                  {b.n}
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.05,
                  }}
                >
                  {b.t}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: 'var(--color-ink-3)',
                    lineHeight: 1.6,
                    maxWidth: '56ch',
                    paddingTop: 10,
                  }}
                >
                  {b.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Approach (dark section) ── */}
      <section
        id="cp-approach"
        className="section"
        style={{
          background: 'var(--color-ink)',
          color: 'var(--color-bg)',
          borderTop: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <div className="wrap">
          <div
            style={{
              paddingBottom: 56,
              borderBottom: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <Eyebrow
              index="§ 03"
              label="How we work"
              className="[&_.eyebrow]:text-white/50 [&_.mono]:text-white/30"
            />
            <div className="cp-approach-head">
              <h2
                className="serif h1"
                style={{
                  color: 'var(--color-bg)',
                  marginTop: 24,
                  maxWidth: '18ch',
                }}
              >
                Five stages.<br />One <em>accountable</em> partnership.
              </h2>
              <p
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 17,
                  lineHeight: 1.5,
                  maxWidth: '52ch',
                  alignSelf: 'flex-end',
                  paddingBottom: 8,
                }}
              >
                A fixed-scope engagement model, the same every time, from the 90-minute working
                session to the twelve-month outcome review. Your team gets one partner.
                Your CFO gets numbers.
              </p>
            </div>
          </div>
          <div className="approach-steps">
            {APPROACH_STEPS.map((s, i) => (
              <div key={i} className="approach-step">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.06em',
                  }}
                >
                  <span>0{i + 1}</span>
                  <span style={{ opacity: 0.5 }}>{s.wk}</span>
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: 'clamp(1.875rem, 3vw, 2.625rem)',
                    letterSpacing: '-0.02em',
                    color: 'var(--color-bg)',
                    marginTop: 12,
                  }}
                >
                  {s.k}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.55,
                    marginTop: 12,
                  }}
                >
                  {s.d}
                </div>
                <div
                  style={{
                    height: 2,
                    background: 'var(--color-accent)',
                    marginTop: 'auto',
                    paddingTop: 32,
                    width: 36,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formats ── */}
      <section className="section" style={{ borderBottom: '1px solid var(--color-line)' }}>
        <div className="wrap">
          <SectionHead
            index="§ 04"
            eyebrow="Formats"
            align="split"
            title={
              <>
                Four formats.{' '}
                <em className="serif">Pick the one that fits.</em>
              </>
            }
            sub="We start with your constraints — timezones, travel, budget, cohort size — and recommend the format that will compound in your org, not ours."
          />
          <div className="formats-grid">
            {FORMATS.map((f, i) => (
              <div key={i} className="format-card">
                <div
                  className="mono"
                  style={{ fontSize: 11, color: 'var(--color-accent)', letterSpacing: '0.06em' }}
                >
                  0{i + 1}
                </div>
                <div
                  className="serif"
                  style={{ fontSize: 28, letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: 8 }}
                >
                  {f.k}
                </div>
                <div
                  style={{ fontSize: 14, color: 'var(--color-ink-3)', lineHeight: 1.55, marginTop: 8 }}
                >
                  {f.s}
                </div>
                <div
                  style={{
                    marginTop: 16,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 8,
                    fontSize: 13,
                  }}
                >
                  {[['Size', f.size], ['Investment', f.price]].map(([label, val]) => (
                    <div
                      key={label}
                      style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                      <span
                        className="mono"
                        style={{ fontSize: 10, letterSpacing: '0.06em', color: 'var(--color-ink-4)' }}
                      >
                        {label}
                      </span>
                      <span
                        className="serif"
                        style={{ fontSize: 15, letterSpacing: '-0.01em' }}
                      >
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    height: 1,
                    background: 'var(--color-line)',
                    margin: '16px 0 8px',
                  }}
                />
                <div
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    color: 'var(--color-ink-4)',
                    textTransform: 'uppercase',
                  }}
                >
                  IDEAL FOR
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--color-ink-2)',
                    lineHeight: 1.5,
                    marginTop: 8,
                  }}
                >
                  {f.ideal}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI / Outcomes ── */}
      <section
        className="section"
        style={{
          background: 'var(--color-bg-alt)',
          borderBottom: '1px solid var(--color-line)',
        }}
      >
        <div className="wrap">
          <SectionHead
            index="§ 05"
            eyebrow="Outcomes"
            align="split"
            title={
              <>
                The areas we help teams <em className="serif">keep track of</em>.
              </>
            }
            sub="Sponsors usually care about readiness, relevance, participation, and what should happen next. These are the kinds of outcomes we help structure and report."
          />
          <div style={{ marginTop: 56, borderTop: '1px solid var(--color-line)' }}>
            {ROI_ITEMS.map((s, i) => (
              <div key={i} className="roi-row">
                <span
                  className="serif roi-value"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {s.v}
                </span>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: '58ch' }}
                >
                  <span
                    className="serif"
                    style={{
                      fontSize: 'clamp(1.1875rem, 1.9vw, 1.625rem)',
                      color: 'var(--color-ink-2)',
                      lineHeight: 1.3,
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {s.l}
                  </span>
                  <span
                    className="mono"
                    style={{ fontSize: 11, color: 'var(--color-ink-4)', letterSpacing: '0.06em' }}
                  >
                    {s.c}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Study ── */}
      <section className="section">
        <div className="wrap">
          <Eyebrow index="§ 06" label="Example engagement" />
          <div className="case-study">
            <div className="cs-left">
              <div
                className="mono"
                style={{ fontSize: 11, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.55)' }}
              >
                CLIENT PROFILE
              </div>
              <div
                className="serif"
                style={{
                  fontSize: 'clamp(1.375rem, 2.4vw, 2rem)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  color: 'var(--color-bg)',
                  maxWidth: '18ch',
                  marginTop: 8,
                }}
              >
                Mid-sized technology team · cross-functional group · India-based delivery context
              </div>
              <div
                style={{
                  marginTop: 24,
                  paddingTop: 20,
                  borderTop: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    color: 'var(--color-accent)',
                  }}
                >
                  THE ASK
                </div>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: 15,
                    lineHeight: 1.55,
                    margin: '10px 0 0',
                    maxWidth: '36ch',
                  }}
                >
                  Build a structured learning path for a team preparing for cloud adoption,
                  clearer role expectations, and stronger certification readiness.
                </p>
              </div>
            </div>
            <div className="cs-right">
              <div
                className="mono"
                style={{ fontSize: 11, letterSpacing: '0.06em', color: 'var(--color-ink-4)' }}
              >
                OUR RESPONSE · SCOPED DELIVERY PLAN
              </div>
              <ul className="cs-steps">
                {[
                  'Discovery workshop with sponsors to define audience, goals, and constraints.',
                  'Baseline review to understand current confidence, role expectations, and skill gaps.',
                  'Tailored cohort delivery with live sessions, guided practice, and manager visibility.',
                  'Post-program summary with observations, learner feedback, and recommended next steps.',
                ].map((step, i) => (
                  <li key={i}>
                    <span
                      className="mono"
                      style={{ fontSize: 11, color: 'var(--color-accent)', paddingTop: 2 }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      style={{
                        fontSize: 15,
                        color: 'var(--color-ink-2)',
                        lineHeight: 1.5,
                      }}
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="cs-results">
                {[
                  ['Aligned', 'Shared expectations across the cohort'],
                  ['Clearer', 'A better sense of next-step priorities'],
                  ['Useful', 'A program sponsors could build on'],
                ].map(([v, l]) => (
                  <div key={v}>
                    <div
                      className="serif"
                      style={{
                        fontSize: 'clamp(2rem, 3.4vw, 3rem)',
                        letterSpacing: '-0.025em',
                        lineHeight: 0.9,
                        color: 'var(--color-accent)',
                      }}
                    >
                      {v}
                    </div>
                    <div
                      className="mono"
                      style={{ fontSize: 11, letterSpacing: '0.04em', marginTop: 6 }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="section-sm"
        style={{ borderTop: '1px solid var(--color-line)' }}
      >
        <div className="wrap">
          <div className="cp-cta">
            <div>
              <Eyebrow index="§ 07" label="Next step" />
              <h2
                className="serif"
                style={{
                  fontWeight: 400,
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  lineHeight: 0.96,
                  letterSpacing: '-0.03em',
                  maxWidth: '18ch',
                  marginTop: 20,
                }}
              >
                Let&apos;s design a{' '}
                <em>program</em> around your team.
              </h2>
              <p
                className="lead"
                style={{ marginTop: 20, maxWidth: '52ch' }}
              >
                A no-obligation working session to understand your audience, goals, and
                constraints. We&apos;ll scope what&apos;s possible and follow up with a tailored
                proposal.
              </p>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
            >
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary btn-lg">
                  Book a consultation <ArrowIcon />
                </Link>
                <a
                  href="mailto:learning@thelearningartistry.com"
                  className="btn btn-ghost btn-lg"
                >
                  learning@thelearningartistry.com
                </a>
              </div>
              <div className="cta-bullets">
                {[
                  'No-obligation working session',
                  'Written proposal after discovery',
                  'Suitable for internal cohorts and team programmes',
                ].map((b) => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckIcon size={13} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .cp-hero-grid {
          margin-top: 56px;
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 80px;
          align-items: flex-end;
        }
        .cp-stats {
          margin-top: 96px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid var(--color-line);
        }
        .cp-stat {
          padding: 32px 28px 8px 0;
          border-right: 1px solid var(--color-line);
          display: flex;
          flex-direction: column;
        }
        .cp-stat:last-child { border-right: 0; }
        .benefit-row {
          display: grid;
          grid-template-columns: 80px 1.2fr 1.8fr;
          gap: 48px;
          padding: 40px 0;
          border-bottom: 1px solid var(--color-line);
          align-items: start;
        }
        .cp-approach-head {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 80px;
          align-items: flex-end;
          margin-top: 32px;
        }
        .approach-steps {
          margin-top: 56px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
        }
        .approach-step {
          padding: 32px 28px 32px 0;
          border-right: 1px solid rgba(255,255,255,0.12);
          display: flex;
          flex-direction: column;
          min-height: 220px;
        }
        .approach-step:last-child { border-right: 0; padding-right: 0; }
        .formats-grid {
          margin-top: 56px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .format-card {
          padding: 32px 28px;
          border: 1px solid var(--color-line);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          background: var(--color-surface);
          min-height: 360px;
          transition: border-color .3s, transform .4s;
        }
        .format-card:hover { border-color: var(--color-ink-3); transform: translateY(-2px); }
        .roi-row {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 48px;
          padding: 40px 0;
          border-bottom: 1px solid var(--color-line);
          align-items: center;
        }
        .roi-value {
          font-size: clamp(4rem, 7vw, 6.5rem);
          letter-spacing: -0.035em;
          line-height: 0.88;
        }
        .case-study {
          margin-top: 40px;
          background: var(--color-surface);
          border: 1px solid var(--color-line);
          border-radius: 16px;
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          overflow: hidden;
        }
        .cs-left {
          padding: 48px;
          background: var(--color-ink);
          color: var(--color-bg);
          display: flex;
          flex-direction: column;
          gap: 0;
          justify-content: space-between;
        }
        .cs-right {
          padding: 48px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .cs-steps {
          list-style: none;
          padding: 0;
          margin: 12px 0 0;
          display: flex;
          flex-direction: column;
        }
        .cs-steps li {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 16px;
          padding: 16px 0;
          border-top: 1px solid var(--color-line);
        }
        .cs-results {
          margin-top: 24px;
          padding-top: 28px;
          border-top: 1px solid var(--color-line);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .cp-cta {
          padding: 56px 0;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 80px;
          align-items: center;
        }
        .cta-bullets {
          padding-top: 20px;
          border-top: 1px solid var(--color-line);
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 14px;
          color: var(--color-ink-3);
        }
        @media (max-width: 1100px) {
          .formats-grid { grid-template-columns: repeat(2, 1fr); }
          .approach-steps { grid-template-columns: repeat(3, 1fr); }
          .approach-step { border-bottom: 1px solid rgba(255,255,255,0.12); padding: 24px; }
        }
        @media (max-width: 900px) {
          .cp-hero-grid { grid-template-columns: 1fr; }
          .cp-stats { grid-template-columns: repeat(2, 1fr); }
          .cp-stat { border-bottom: 1px solid var(--color-line); padding-right: 16px; }
          .benefit-row { grid-template-columns: 1fr; gap: 12px; padding: 32px 0; }
          .cp-approach-head { grid-template-columns: 1fr; gap: 24px; }
          .approach-steps { grid-template-columns: repeat(2, 1fr); }
          .roi-row { grid-template-columns: 1fr; gap: 12px; }
          .case-study { grid-template-columns: 1fr; }
          .cs-left, .cs-right { padding: 32px; }
          .cp-cta { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 580px) {
          .formats-grid { grid-template-columns: 1fr; }
          .approach-steps { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
