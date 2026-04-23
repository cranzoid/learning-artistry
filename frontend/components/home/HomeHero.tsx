'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { Course } from '@/types';
import CourseMood, { getCourseAccent, getCourseMoodKind } from '@/components/ui/CourseMood';
import { ArrowIcon, ArrowUpRightIcon } from '@/components/ui/icons';

interface Props {
  featured: Course[];
}

function formatToday() {
  return new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

const STATS = [
  { value: 'Live', label: 'Guided cohorts and structured practice' },
  { value: 'Small', label: 'Learning environments built for attention' },
  { value: 'Team', label: 'Options for individual and company enrolment' },
];

const FALLBACK_STAGE = {
  title: 'AWS Solutions Architect',
  catLabel: 'Cloud & IT',
  cohortNum: 312,
  color: '#4A3AFF',
};

export default function HomeHero({ featured }: Props) {
  const items = useMemo(() => featured.slice(0, 6), [featured]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (items.length < 2) return undefined;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [items]);

  const current = items[active];
  const stageTitle = current ? current.title.split(' —')[0] : FALLBACK_STAGE.title;
  const stageCat = current?.catLabel ?? FALLBACK_STAGE.catLabel;
  const stageCohort = current?.cohorts ?? FALLBACK_STAGE.cohortNum;
  const stageColor = current ? getCourseAccent(current) : FALLBACK_STAGE.color;

  return (
    <section className="hero-ed">
      <div className="wrap">
        <div className="hero-ed-grid">
          {/* Left column */}
          <div className="hero-ed-left">
            <div className="hero-ed-meta">
              <span className="mono">TLA · Current Programs</span>
              <span className="mono muted">{formatToday()}</span>
            </div>

            <h1 className="hero-ed-title serif">
              <span className="italic">Mastery</span>, taught
              <br />
              with the care
              <br />
              of a <span className="italic">studio</span>.
            </h1>

            <p className="hero-ed-lede lead">
              The Learning Artistry offers professional training and certification programs for
              individuals and teams across cloud, development, project management, quality, data,
              and leadership disciplines.
            </p>

            <div className="hero-ed-cta">
              <Link href="/courses" className="btn btn-ink btn-lg">
                For individuals <ArrowIcon />
              </Link>
              <Link href="/corporate-training" className="btn btn-ghost btn-lg">
                For teams <ArrowIcon />
              </Link>
            </div>

            <div className="hero-ed-stats">
              {STATS.map((item) => (
                <div key={item.value} className="hero-ed-stat">
                  <div className="serif hero-ed-stat-v">{item.value}</div>
                  <div className="mono hero-ed-stat-l">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="hero-ed-right">
            <div className="hero-ed-frame">
              {/* Background mood illustration */}
              <div className="absolute inset-0">
                <CourseMood
                  slug={current ? current.slug : 'hero-fallback'}
                  color={stageColor}
                  kind={current ? getCourseMoodKind(current.slug) : 'grid'}
                />
              </div>
              {/* Colour tint overlay */}
              <div
                className="absolute inset-0"
                style={{ background: stageColor, opacity: 0.08 }}
              />
              <div className="hero-ed-ticker">
                <span className="ticker-dot" />
                <span className="mono">Current course spotlight</span>
              </div>

              <div className="hero-ed-now">
                <div className="mono muted hero-ed-now-label">Now teaching</div>
                <div className="serif hero-ed-now-title">{stageTitle}</div>
                <div className="mono hero-ed-now-meta">
                  {stageCat} · cohort #{stageCohort}
                </div>
              </div>

              {items.length > 1 && (
                <div className="hero-ed-dots">
                  {items.map((item, i) => (
                    <button
                      key={item.slug}
                      type="button"
                      aria-label={`Show ${item.title}`}
                      className={i === active ? 'active' : ''}
                      onClick={() => setActive(i)}
                    />
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="hero-ed-index">
                {items.map((item, i) => (
                  <Link key={item.slug} href={`/courses/${item.slug}`} className="hero-ed-index-row">
                    <span className="mono muted">{String(i + 1).padStart(2, '0')}</span>
                    <span className="serif hero-ed-index-title">{item.title.split(' —')[0]}</span>
                    <span className="mono hero-ed-index-dur">{item.duration}</span>
                    <ArrowUpRightIcon size={12} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
