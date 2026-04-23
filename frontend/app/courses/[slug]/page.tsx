import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getCourse, getCoursesPaginated, fmtPrice } from '@/lib/api';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHead from '@/components/ui/SectionHead';
import CourseCard from '@/components/ui/CourseCard';
import { getCourseAccent } from '@/components/ui/CourseMood';
import SyllabusBlock from '@/components/courses/SyllabusBlock';
import FAQAccordion from '@/components/courses/FAQAccordion';
import BuyCard from '@/components/courses/BuyCard';
import { ArrowIcon, CheckIcon } from '@/components/ui/icons';

function hashString(value: string): number {
  return value.split('').reduce((acc, char) => ((acc * 33) + char.charCodeAt(0)) >>> 0, 17);
}

function getEnrollmentMeta(slug: string) {
  const hash = hashString(slug);
  const cohortSize = 20;
  const seatsLeft = 4 + (hash % 5);
  const seatsReserved = cohortSize - seatsLeft;
  const startOffsets = [13, 20, 27];
  const nextStartDate = new Date(Date.UTC(2026, 4, startOffsets[hash % startOffsets.length]));
  const nextStart = new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(nextStartDate);

  return { cohortSize, seatsLeft, seatsReserved, nextStart };
}

function certificationBadge(cert?: string) {
  if (!cert) return null;

  if (cert.startsWith('Certificate of completion from The Learning Artistry')) {
    return 'Completion Certificate';
  }

  return cert.length > 40 ? `${cert.slice(0, 37)}...` : cert;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return { title: 'Course Not Found — The Learning Artistry' };
  return {
    title: `${course.title} — The Learning Artistry`,
    description: course.short,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          textAlign: 'center',
          padding: '4rem 2rem',
        }}
      >
        <span className="mono" style={{ fontSize: 11, color: 'var(--color-ink-5)' }}>
          404
        </span>
        <h1
          className="serif"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 400,
            lineHeight: 0.96,
            letterSpacing: '-0.035em',
          }}
        >
          Course not<br />
          <span className="italic">found.</span>
        </h1>
        <p className="lead" style={{ maxWidth: '40ch' }}>
          That program may have moved, been retired, or the link might be wrong.
        </p>
        <Link href="/courses" className="btn btn-primary btn-lg">
          Browse catalog <ArrowIcon />
        </Link>
      </div>
    );
  }

  const displayPrice = typeof course.price === 'number' ? course.price : undefined;
  const showPrice = course.showPrice && displayPrice !== undefined;
  const saved = showPrice && course.compare
    ? Math.round((1 - displayPrice / course.compare) * 100)
    : 0;
  const { cohortSize, seatsLeft, seatsReserved, nextStart } = getEnrollmentMeta(course.slug);
  const certBadge = certificationBadge(course.cert);
  const accentColor = getCourseAccent(course);

  // Related courses (same category, excluding current)
  const related = await getCoursesPaginated({
    category: course.cat,
    per_page: 3,
  })
    .then((r) => r.data.filter((c) => c.slug !== course.slug).slice(0, 3))
    .catch(() => []);

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
          borderBottom: '1px solid var(--color-line)',
        }}
      >
        <div className="wrap">
          {/* Breadcrumb */}
          <nav
            className="mono"
            style={{
              fontSize: 11,
              paddingBottom: 20,
              borderBottom: '1px solid var(--color-line)',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              color: 'var(--color-ink-4)',
            }}
          >
            <Link href="/courses" style={{ transition: 'color .15s' }}>
              Catalog
            </Link>
            <span style={{ color: 'var(--color-ink-5)' }}>/</span>
            {course.catLabel && (
              <>
                <Link
                  href={`/courses?category=${course.cat}`}
                  style={{ transition: 'color .15s' }}
                >
                  {course.catLabel}
                </Link>
                <span style={{ color: 'var(--color-ink-5)' }}>/</span>
              </>
            )}
            <span style={{ color: 'var(--color-ink-3)' }}>
              {course.title.split(' —')[0]}
            </span>
          </nav>

          {/* Hero grid */}
          <div
            style={{
              marginTop: 52,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)',
              gap: 'clamp(3rem, 6vw, 7rem)',
              alignItems: 'start',
            }}
            className="cd-hero-grid"
          >
            {/* Left */}
            <div>
              {/* Badges */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                {course.catLabel && (
                  <span className="chip chip-accent">{course.catLabel}</span>
                )}
                {certBadge && (
                  <span className="chip">Certification · {certBadge}</span>
                )}
                {course.level && <span className="chip">{course.level}</span>}
                <span className="chip chip-dot">Enrolling now</span>
              </div>

              <h1
                className="serif"
                style={{
                  fontSize: 'clamp(2.75rem, 6vw, 5.25rem)',
                  fontWeight: 400,
                  lineHeight: 0.96,
                  letterSpacing: '-0.03em',
                  maxWidth: '16ch',
                }}
              >
                {course.title}
              </h1>

              <p
                className="lead"
                style={{ marginTop: 24, maxWidth: '56ch', fontSize: 19 }}
              >
                {course.short}
              </p>

              {/* Meta grid */}
              <div
                style={{
                  marginTop: 32,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 20,
                  paddingTop: 28,
                  borderTop: '1px solid var(--color-line)',
                }}
                className="cd-meta-grid"
              >
                {[
                  { k: 'Duration', v: course.duration },
                  { k: 'Delivery', v: course.mode },
                  { k: 'Next cohort', v: nextStart },
                  { k: 'Certification', v: certBadge || 'Studio Certificate' },
                ].map((m) => (
                  <div key={m.k} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span
                      className="mono"
                      style={{
                        fontSize: 10,
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                        color: 'var(--color-ink-4)',
                      }}
                    >
                      {m.k}
                    </span>
                    <span
                      className="serif"
                      style={{
                        fontSize: 17,
                        letterSpacing: '-0.015em',
                        lineHeight: 1.2,
                      }}
                    >
                      {m.v}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mobile buy CTA (hidden on desktop) */}
              <div className="cd-mobile-buy">
                <div
                  style={{
                    marginTop: 32,
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 14,
                    flexWrap: 'wrap',
                  }}
                >
                  {showPrice ? (
                    <>
                      <span
                        className="serif"
                        style={{ fontSize: '2.5rem', letterSpacing: '-0.03em', lineHeight: 1 }}
                      >
                        {fmtPrice(displayPrice)}
                      </span>
                      {course.compare && saved > 0 && (
                        <span
                          className="mono"
                          style={{
                            fontSize: 13,
                            color: 'var(--color-ink-4)',
                            textDecoration: 'line-through',
                          }}
                        >
                      {fmtPrice(course.compare)}
                        </span>
                      )}
                    </>
                  ) : (
                    <span
                      className="serif"
                      style={{ fontSize: '2rem', letterSpacing: '-0.03em', lineHeight: 1.08 }}
                    >
                      Enquire now
                    </span>
                  )}
                </div>
                {showPrice && course.razorpay_link ? (
                  <a
                    href={course.razorpay_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                    style={{ marginTop: 16, justifyContent: 'center' }}
                  >
                    Buy Now <ArrowIcon />
                  </a>
                ) : (
                  <Link href="/contact" className="btn btn-ghost btn-lg" style={{ marginTop: 16 }}>
                    {showPrice ? 'Enquire about this course' : 'Enquire now'}
                  </Link>
                )}
              </div>
            </div>

            {/* Right — sticky buy card */}
            <div className="cd-sidebar">
              {/* Banner image or color card */}
              {course.banner ? (
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    borderRadius: 14,
                    overflow: 'hidden',
                    marginBottom: 16,
                  }}
                >
                  <Image
                    src={course.banner}
                    alt={course.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 1060px) 100vw, 40vw"
                    priority
                  />
                </div>
              ) : course.thumbnail ? (
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    borderRadius: 14,
                    overflow: 'hidden',
                    marginBottom: 16,
                  }}
                >
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 1060px) 100vw, 40vw"
                    priority
                  />
                </div>
              ) : (
                <div
                  style={{
                    aspectRatio: '5/3',
                    borderRadius: 14,
                    background: accentColor,
                    padding: 22,
                    color: '#fff',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gridTemplateRows: 'auto 1fr auto',
                    gap: 8,
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.22) 0%, transparent 55%)',
                    }}
                  />
                  <div className="mono" style={{ fontSize: 10, opacity: 0.75, position: 'relative' }}>
                    {course.code ? `${course.code} · ${course.catLabel || 'TLA'}` : course.catLabel || 'The Learning Artistry'}
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 10,
                      opacity: 0.72,
                      textAlign: 'right',
                      position: 'relative',
                    }}
                  >
                    {cohortSize}-SEAT COHORT
                    <br />
                    LIVE · INSTRUCTOR-LED
                  </div>
                  <div
                    className="serif"
                    style={{
                      fontSize: 'clamp(1.25rem, 1.8vw, 1.6rem)',
                      lineHeight: 1.05,
                      letterSpacing: '-0.015em',
                      gridColumn: '1 / -1',
                      alignSelf: 'end',
                      maxWidth: '14ch',
                      position: 'relative',
                    }}
                  >
                    {course.title.split(' —')[0]}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingTop: 12,
                      borderTop: '1px solid rgba(255,255,255,0.16)',
                      position: 'relative',
                      gridColumn: '1 / -1',
                    }}
                  >
                    <span className="mono" style={{ fontSize: 10, opacity: 0.8 }}>
                      {seatsLeft} SEATS LEFT
                    </span>
                    <span className="mono" style={{ fontSize: 10, opacity: 0.8 }}>
                      STARTS {nextStart.toUpperCase()}
                    </span>
                  </div>
                </div>
              )}

              <BuyCard
                title={course.title}
                code={course.code}
                categoryLabel={course.catLabel}
                price={course.price}
                compare={course.compare}
                razorpay_link={course.razorpay_link}
                showPrice={showPrice}
                duration={course.duration}
                level={course.level}
                mode={course.mode}
                cert={course.cert}
                saved={saved}
                seatsLeft={seatsLeft}
                seatsReserved={seatsReserved}
                cohortSize={cohortSize}
                nextStart={nextStart}
              />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 1060px) {
            .cd-hero-grid { grid-template-columns: 1fr !important; }
            .cd-sidebar { display: none !important; }
            .cd-meta-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (min-width: 1061px) {
            .cd-mobile-buy { display: none !important; }
          }
        `}</style>
      </section>

      {/* ── Social proof strip ── */}
      <section
        style={{
          padding: '28px 0',
          background: 'var(--color-bg-alt)',
          borderBottom: '1px solid var(--color-line)',
        }}
      >
        <div className="wrap">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(1.5rem, 3vw, 3rem)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <span className="serif" style={{ fontSize: 15, color: 'var(--color-ink-3)' }}>
              Engineers from
            </span>
            {['NORTHWIND', 'Meridian', 'QUANTA', 'Halcyon', 'VOYAGER', 'Helix'].map((n) => (
              <span
                key={n}
                className="serif"
                style={{ fontSize: 18, color: 'var(--color-ink-3)', letterSpacing: '-0.01em' }}
              >
                {n}
              </span>
            ))}
            <span className="mono" style={{ fontSize: 11, color: 'var(--color-ink-5)' }}>
              have trained with us
            </span>
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      {(course.full_description || (course.highlights && course.highlights.length > 0)) && (
        <section className="section-sm">
          <div className="wrap">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
                gap: 'clamp(3rem, 7vw, 7rem)',
                paddingTop: 40,
                borderTop: '1px solid var(--color-line)',
              }}
              className="cd-ov-grid"
            >
              <div>
                <Eyebrow index="§ 01" label="Overview" />
                <h2
                  className="h2"
                  style={{ marginTop: 24, maxWidth: '16ch' }}
                >
                  Built for the{' '}
                  <span className="italic serif">practitioner</span>{' '}
                  who&apos;s done reading about it.
                </h2>
              </div>
              <div>
                {course.full_description && (
                  <div
                    className="prose-content lead"
                    dangerouslySetInnerHTML={{ __html: course.full_description }}
                  />
                )}
                {course.highlights && course.highlights.length > 0 && (
                  <div
                    style={{
                      marginTop: course.full_description ? 32 : 0,
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 0,
                    }}
                    className="cd-hi-grid"
                  >
                    {course.highlights.map((h, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          gap: 12,
                          padding: '14px 0',
                          borderTop: i >= 2 ? '1px solid var(--color-line)' : 'none',
                          fontSize: 15,
                          color: 'var(--color-ink-2)',
                          alignItems: 'flex-start',
                        }}
                      >
                        <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 3 }}>
                          <CheckIcon size={14} />
                        </span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <style>{`
              @media (max-width: 900px) {
                .cd-ov-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
                .cd-hi-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
          </div>
        </section>
      )}

      {/* ── Syllabus ── */}
      {course.syllabus && course.syllabus.length > 0 && (
        <section
          id="syllabus"
          className="section-sm"
          style={{
            background: 'var(--color-bg-alt)',
            borderTop: '1px solid var(--color-line)',
            borderBottom: '1px solid var(--color-line)',
          }}
        >
          <div className="wrap">
            <SectionHead
              index="§ 02"
              eyebrow="Syllabus"
              align="split"
              title={
                <>
                  {course.syllabus.length} modules.{' '}
                  <span className="italic serif">Structured craft.</span>
                </>
              }
              sub="Each module builds on the last. Click to read what's inside."
            />
            <SyllabusBlock modules={course.syllabus} />
          </div>
        </section>
      )}

      {/* ── Course details ── */}
      <section className="section-sm">
        <div className="wrap">
          <Eyebrow index="§ 03" label="The details" />
          <div
            style={{
              marginTop: 32,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              borderTop: '1px solid var(--color-line)',
              borderLeft: '1px solid var(--color-line)',
            }}
            className="cd-details-grid"
          >
            {[
              { k: 'Duration', v: course.duration },
              { k: 'Level', v: course.level },
              { k: 'Delivery mode', v: course.mode },
              { k: 'Certification', v: course.cert || 'Studio Certificate' },
              { k: 'Language', v: 'English' },
              { k: 'Commitment', v: '~8–10 hrs/week' },
            ]
              .filter((r) => r.v)
              .map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '160px 1fr',
                    gap: 24,
                    padding: '22px 24px',
                    borderBottom: '1px solid var(--color-line)',
                    borderRight: '1px solid var(--color-line)',
                    alignItems: 'baseline',
                    fontSize: 17,
                  }}
                >
                  <span
                    className="mono"
                    style={{ fontSize: 11, color: 'var(--color-ink-4)' }}
                  >
                    {r.k}
                  </span>
                  <span className="serif" style={{ letterSpacing: '-0.01em' }}>
                    {r.v}
                  </span>
                </div>
              ))}
          </div>
          <style>{`
            @media (max-width: 720px) {
              .cd-details-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ── Audience + Outcomes ── */}
      {((course.audience) || (course.outcomes && course.outcomes.length > 0)) && (
        <section
          className="section-sm"
          style={{
            background: 'var(--color-bg-alt)',
            borderTop: '1px solid var(--color-line)',
            borderBottom: '1px solid var(--color-line)',
          }}
        >
          <div className="wrap">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(3rem, 6vw, 6rem)',
              }}
              className="cd-aud-grid"
            >
              {course.audience && (
                <div>
                  <Eyebrow index="§ 04" label="Who this is for" />
                  <h3
                    className="h2"
                    style={{ marginTop: 24, maxWidth: '16ch' }}
                  >
                    Designed for a specific{' '}
                    <span className="italic serif">practitioner</span>.
                  </h3>
                  <div
                    style={{
                      marginTop: 24,
                      fontSize: 16,
                      lineHeight: 1.7,
                      color: 'var(--color-ink-2)',
                    }}
                  >
                    {course.audience}
                  </div>
                </div>
              )}
              {course.outcomes && course.outcomes.length > 0 && (
                <div>
                  <Eyebrow index="§ 05" label="Learning outcomes" />
                  <h3
                    className="h2"
                    style={{ marginTop: 24, maxWidth: '16ch' }}
                  >
                    What you&apos;ll{' '}
                    <span className="italic serif">walk out</span> able to do.
                  </h3>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '32px 0 0',
                      borderTop: '1px solid var(--color-line)',
                    }}
                  >
                    {course.outcomes.map((o, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '48px 1fr',
                          gap: 16,
                          padding: '18px 0',
                          borderBottom: '1px solid var(--color-line)',
                          fontSize: 16,
                          color: 'var(--color-ink-2)',
                        }}
                      >
                        <span
                          className="mono"
                          style={{ fontSize: 11, paddingTop: 3, color: 'var(--color-ink-5)' }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <style>{`
              @media (max-width: 820px) {
                .cd-aud-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
              }
            `}</style>
          </div>
        </section>
      )}

      {/* ── Full pricing block ── */}
      <section className="section-sm">
        <div className="wrap">
          <Eyebrow index="§ 06" label="Take a seat" />
          <div
            style={{
              marginTop: 40,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.7fr)',
              gap: 'clamp(3rem, 5vw, 6rem)',
              borderTop: '1px solid var(--color-line)',
              paddingTop: 48,
            }}
            className="cd-pricing-grid"
          >
            <div>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  color: 'var(--color-ink-5)',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                }}
              >
                {showPrice ? 'Tuition · Single cohort seat' : 'Admissions · Talk to us'}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  marginTop: 14,
                  flexWrap: 'wrap',
                  gap: 16,
                }}
              >
                {showPrice ? (
                  <>
                    <span
                      className="serif"
                      style={{
                        fontSize: 'clamp(4rem, 8vw, 9rem)',
                        letterSpacing: '-0.035em',
                        lineHeight: 0.9,
                      }}
                    >
                      {fmtPrice(displayPrice)}
                    </span>
                    {course.compare && saved > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 6,
                          paddingBottom: 8,
                        }}
                      >
                        <span
                          className="mono"
                          style={{
                            color: 'var(--color-ink-4)',
                            textDecoration: 'line-through',
                            fontSize: 14,
                          }}
                        >
                          {fmtPrice(course.compare)}
                        </span>
                        <span className="chip chip-accent">Save {saved}%</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ maxWidth: '28ch' }}>
                    <div
                      className="serif"
                      style={{
                        fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                        letterSpacing: '-0.035em',
                        lineHeight: 0.95,
                      }}
                    >
                      Enquire now
                    </div>
                    <p className="lead" style={{ marginTop: 18, maxWidth: '44ch' }}>
                      We&apos;ll share the latest pricing, next cohort details, and whether this course is the right fit.
                    </p>
                  </div>
                )}
              </div>
              {showPrice && saved > 0 && (
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: 'var(--color-accent)',
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    marginTop: 8,
                  }}
                >
                  Limited-time price
                </div>
              )}
              {showPrice && (
                <div
                  className="mono"
                  style={{ fontSize: 12, color: 'var(--color-ink-4)', marginTop: 10 }}
                >
                  or {fmtPrice(Math.round(displayPrice / 12))}/mo · 0% interest · 12 months
                </div>
              )}
              <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {showPrice && course.razorpay_link ? (
                  <a
                    href={course.razorpay_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                  >
                    Buy Now <ArrowIcon />
                  </a>
                ) : (
                  <Link href="/contact" className="btn btn-primary btn-lg">
                    Enquire now <ArrowIcon />
                  </Link>
                )}
                <Link href="/contact" className="btn btn-ghost btn-lg">
                  {showPrice ? 'Request consultation' : 'Talk to an advisor'}
                </Link>
              </div>
            </div>

            <div>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  color: 'var(--color-ink-5)',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                }}
              >
                What&apos;s included
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '20px 0 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  fontSize: 14,
                }}
              >
                {(
                  showPrice
                    ? [
                        'Live cohort seat · instructor-led sessions',
                        'All labs, recordings & materials (12-month access)',
                        'Exam voucher on certification tracks',
                        'Pass guarantee or free retake',
                        'Alumni community · 12 months',
                        `${seatsLeft} seats currently left in the next cohort`,
                        'Corporate invoicing available',
                      ]
                    : [
                        'Get current pricing and available cohort options',
                        'Discuss the right delivery format for your goals',
                        'Receive advisor guidance before enrolment',
                        `${seatsLeft} seats currently left in the next cohort`,
                        'Corporate invoicing available',
                      ]
                ).map((b) => (
                  <li
                    key={b}
                    style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'var(--color-ink-2)' }}
                  >
                    <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>
                      <CheckIcon size={14} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <style>{`
            @media (max-width: 820px) {
              .cd-pricing-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ── FAQ ── */}
      {course.faq && course.faq.length > 0 && (
        <section
          className="section-sm"
          style={{
            background: 'var(--color-bg-alt)',
            borderTop: '1px solid var(--color-line)',
            borderBottom: '1px solid var(--color-line)',
          }}
        >
          <div className="wrap">
            <SectionHead
              index="§ 07"
              eyebrow="Questions"
              align="split"
              title="The things you're likely to ask."
              sub="And if your question isn't here — send us a note. We answer within a business day."
            />
            <FAQAccordion items={course.faq} />
          </div>
        </section>
      )}

      {/* ── Related courses ── */}
      {related.length > 0 && (
        <section className="section-sm">
          <div className="wrap">
            <SectionHead
              index="§ 08"
              eyebrow="Related"
              title="If this resonated, you might also like."
            />
            <div
              style={{
                marginTop: 48,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 20,
              }}
            >
              {related.map((c, i) => (
                <CourseCard key={c.slug} course={c} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <section
        className="section"
        style={{
          background: 'var(--color-ink)',
          color: 'var(--color-bg)',
        }}
      >
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.6fr)',
              gap: 'clamp(3rem, 6vw, 8rem)',
              alignItems: 'end',
            }}
            className="cd-cta-grid"
          >
            <div>
              <div
                className="serif italic"
                style={{
                  fontSize: 'clamp(3rem, 7vw, 7rem)',
                  fontWeight: 400,
                  lineHeight: 0.93,
                  letterSpacing: '-0.035em',
                  color: 'var(--color-bg)',
                }}
              >
                Ready to<br />take your seat?
              </div>
            </div>
            <div style={{ paddingBottom: 8 }}>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: 'rgba(255,255,255,0.6)', marginBottom: 28 }}>
                Limited seats per cohort. Next intake opens soon — reserve your place before it fills.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {showPrice && course.razorpay_link ? (
                  <a
                    href={course.razorpay_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                    style={{ justifyContent: 'center' }}
                  >
                    Buy Now · {fmtPrice(displayPrice)} <ArrowIcon />
                  </a>
                ) : (
                  <Link href="/contact" className="btn btn-primary btn-lg" style={{ justifyContent: 'center' }}>
                    Enquire now <ArrowIcon />
                  </Link>
                )}
                <Link
                  href="/contact"
                  className="btn"
                  style={{
                    justifyContent: 'center',
                    borderColor: 'rgba(255,255,255,0.2)',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  {showPrice ? 'Talk to an advisor' : 'Request a callback'}
                </Link>
              </div>
            </div>
          </div>
          <style>{`
            @media (max-width: 820px) {
              .cd-cta-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            }
          `}</style>
        </div>
      </section>
    </>
  );
}
