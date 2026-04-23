import type { Metadata } from 'next';
import Link from 'next/link';
import FounderPortrait from '@/components/about/FounderPortrait';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHead from '@/components/ui/SectionHead';
import { ArrowIcon } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'About — The Learning Artistry',
  description:
    'The Learning Artistry is a founder-led professional learning business built by Bhawna Lal, with roots in New Delhi and a practical, grounded approach to training.',
  openGraph: {
    title: 'About — The Learning Artistry',
    description:
      'Founder-led professional learning with roots in New Delhi and a focus on clarity, relevance, and credibility.',
  },
};

const MANIFESTO = [
  'We believe professional learning should be practical.',
  'We believe smaller groups create better attention and better questions.',
  'We believe preparation, clarity, and follow-through matter as much as curriculum.',
  'We believe credibility is earned by being useful, not by sounding impressive.',
  'We believe training should respect people\'s time, goals, and working reality.',
];

const FOUNDATION_POINTS = [
  {
    k: '01',
    t: 'Founder-led',
    d: 'The Learning Artistry is led by one founder, with decisions shaped deliberately around quality, clarity, and long-term trust.',
  },
  {
    k: '02',
    t: 'Rooted in New Delhi',
    d: 'The business carries perspective shaped by New Delhi and is built to serve professionals and teams looking for thoughtful, work-relevant learning.',
  },
  {
    k: '03',
    t: 'Built for practical progress',
    d: 'Programs are designed to help learners prepare carefully, build confidence, and apply what they learn with more structure in their day-to-day work.',
  },
];

const VALUES = [
  { k: 'Clarity', d: 'Clear positioning, clear communication, and no inflated promises.' },
  { k: 'Care', d: 'Thoughtful learner support before, during, and after a program.' },
  { k: 'Relevance', d: 'Learning that stays connected to the responsibilities people actually carry.' },
  { k: 'Professionalism', d: 'A dependable experience that respects time, attention, and trust.' },
];

export default function AboutPage() {
  return (
    <>
      <section
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) 0 clamp(4rem, 6vw, 6rem)',
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
              flexWrap: 'wrap',
              color: 'var(--color-ink-4)',
            }}
          >
            <span>§ About</span>
            <span>Founder-led · New Delhi roots</span>
          </div>
          <h1
            className="serif"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(3.5rem, 10vw, 10.5rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              marginTop: 40,
            }}
          >
            Professional learning,
            <br />
            built with <em>care</em>.
          </h1>
          <p className="lead" style={{ marginTop: 32, maxWidth: '58ch' }}>
            The Learning Artistry was founded to offer a more grounded approach to training:
            clear communication, practical programs, and a learning experience that feels
            professional from the first conversation onward.
          </p>
        </div>
      </section>

      <section
        className="section"
        style={{
          background: 'var(--color-bg-alt)',
          borderBottom: '1px solid var(--color-line)',
        }}
      >
        <div className="wrap">
          <Eyebrow index="§ 01" label="Principles" />
          <div style={{ marginTop: 40 }}>
            {MANIFESTO.map((line, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr',
                  gap: 30,
                  padding: '28px 0',
                  borderTop: '1px solid var(--color-line)',
                  alignItems: 'baseline',
                  ...(i === MANIFESTO.length - 1
                    ? { borderBottom: '1px solid var(--color-line)' }
                    : {}),
                }}
              >
                <span
                  className="mono"
                  style={{ fontSize: 12, color: 'var(--color-accent)', paddingTop: 12 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="serif"
                  style={{
                    fontSize: 'clamp(1.75rem, 4vw, 3.25rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }}
                >
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            index="§ 02"
            eyebrow="Approach"
            align="split"
            title="A clear point of view, applied carefully."
            sub="The business is intentionally small in voice and disciplined in how it presents itself, communicates value, and supports learners."
          />
          <div
            style={{
              marginTop: 40,
              borderTop: '1px solid var(--color-line)',
            }}
          >
            {FOUNDATION_POINTS.map((point) => (
              <div key={point.k} className="milestone-row">
                <div
                  className="serif"
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                    letterSpacing: '-0.02em',
                    color: 'var(--color-accent)',
                  }}
                >
                  {point.k}
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.05,
                  }}
                >
                  {point.t}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: 'var(--color-ink-3)',
                    lineHeight: 1.55,
                    maxWidth: '52ch',
                  }}
                >
                  {point.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section"
        style={{
          background: 'var(--color-bg-alt)',
          borderTop: '1px solid var(--color-line)',
          borderBottom: '1px solid var(--color-line)',
        }}
      >
        <div className="wrap">
          <SectionHead
            index="§ 03"
            eyebrow="Founder"
            align="split"
            title={
              <>
                Meet <em className="serif">Bhawna Lal</em>.
              </>
            }
            sub="Founder of The Learning Artistry, with roots in New Delhi and a practical, professional approach to how learning businesses should operate."
          />
          <div className="founder-grid">
            <FounderPortrait />
            <div className="founder-copy">
              <div className="mono founder-meta">Founder · New Delhi</div>
              <div className="serif founder-name">Bhawna Lal</div>
              <p className="founder-paragraph">
                Bhawna Lal founded The Learning Artistry to build a learning business that feels
                more credible, more considered, and more useful than the usual marketing-heavy
                training experience.
              </p>
              <p className="founder-paragraph">
                Her focus is on making the business clear in what it offers, careful in how it
                communicates, and consistent in the quality of the learner experience. The aim is
                simple: professional training that earns trust by being relevant, well-structured,
                and worth recommending.
              </p>
              <div className="founder-points">
                {[
                  'Founder-led and intentionally scoped',
                  'Grounded in clarity, professionalism, and learner trust',
                  'Designed for both individual and team learning needs',
                ].map((item, index) => (
                  <div key={item} className="founder-point">
                    <span className="mono founder-point-num">{String(index + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Eyebrow index="§ 04" label="Operating values" />
          <div className="values-grid">
            {VALUES.map(({ k, d }, i) => (
              <div key={i} className="values-card">
                <div className="mono" style={{ fontSize: 11, color: 'var(--color-accent)' }}>
                  0{i + 1}
                </div>
                <div
                  className="serif"
                  style={{ fontSize: 32, letterSpacing: '-0.02em', marginTop: 8 }}
                >
                  {k}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: 'var(--color-ink-3)',
                    marginTop: 8,
                    lineHeight: 1.5,
                  }}
                >
                  {d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: '80px 0',
          borderTop: '1px solid var(--color-line)',
          borderBottom: '1px solid var(--color-line)',
        }}
      >
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2
            className="serif"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
              lineHeight: 0.93,
              letterSpacing: '-0.035em',
            }}
          >
            Explore the <em>programs</em>.
          </h2>
          <div
            style={{
              marginTop: 32,
              display: 'flex',
              gap: 10,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/courses" className="btn btn-primary btn-lg">
              View courses <ArrowIcon />
            </Link>
            <Link href="/contact" className="btn btn-ghost btn-lg">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .milestone-row {
          display: grid;
          grid-template-columns: 140px 1fr 1.5fr;
          gap: 40px;
          padding: 32px 0;
          border-bottom: 1px solid var(--color-line);
          align-items: baseline;
        }
        .founder-grid {
          margin-top: 40px;
          display: grid;
          grid-template-columns: minmax(320px, 0.85fr) minmax(0, 1.15fr);
          gap: 40px;
          align-items: stretch;
        }
        .founder-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 8px 0;
        }
        .founder-meta {
          font-size: 11px;
          color: var(--color-accent);
          letter-spacing: 0.06em;
        }
        .founder-name {
          font-size: clamp(2.4rem, 4vw, 4rem);
          letter-spacing: -0.03em;
          line-height: 0.98;
          margin-top: 10px;
        }
        .founder-paragraph {
          margin: 20px 0 0;
          font-size: 15px;
          line-height: 1.65;
          color: var(--color-ink-3);
          max-width: 60ch;
        }
        .founder-points {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--color-line);
          color: var(--color-ink-3);
          font-size: 14px;
        }
        .founder-point {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          line-height: 1.5;
        }
        .founder-point-num {
          font-size: 12px;
          color: var(--color-accent);
          line-height: 1.4;
        }
        .values-grid {
          margin-top: 40px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid var(--color-line);
          border-radius: 14px;
          overflow: hidden;
        }
        .values-card {
          padding: 36px 28px;
          border-right: 1px solid var(--color-line);
          min-height: 200px;
        }
        .values-card:last-child { border-right: 0; }
        @media (max-width: 980px) {
          .milestone-row { grid-template-columns: 1fr; gap: 8px; }
          .founder-grid { grid-template-columns: 1fr; }
          .values-grid { grid-template-columns: repeat(2, 1fr); }
          .values-card { border-bottom: 1px solid var(--color-line); }
        }
        @media (max-width: 560px) {
          .values-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
