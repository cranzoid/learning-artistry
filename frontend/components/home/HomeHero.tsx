'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Course } from '@/types';
import { ArrowIcon, ArrowUpRightIcon } from '@/components/ui/icons';

interface Props {
  featured: Course[];
}

const HERO_PHOTO =
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1400&auto=format&fit=crop';

const PROOF = [
  { value: 'Live cohorts', label: 'Instructor-led, with structured practice' },
  { value: '20 seats', label: 'Small groups built for real attention' },
  { value: 'Six tracks', label: 'Cloud, dev, PM, quality, data & marketing' },
];

const FALLBACK_STAGE = {
  title: 'Explore the current catalog',
  catLabel: 'Programs',
  meta: 'Live · instructor-led',
};

export default function HomeHero({ featured }: Props) {
  const items = useMemo(() => featured.slice(0, 5), [featured]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (items.length < 2) return undefined;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [items]);

  const current = items[active];
  const stageTitle = current ? current.title.split(' —')[0] : FALLBACK_STAGE.title;
  const stageMeta = current
    ? [current.catLabel, current.duration, current.level].filter(Boolean).join(' · ') ||
      FALLBACK_STAGE.meta
    : FALLBACK_STAGE.meta;

  return (
    <section className="hero-e">
      <div className="wrap">
        <div className="hero-e-grid">
          {/* Left — copy */}
          <div>
            <span className="badge-soft">
              <span className="ticker-dot" />
              Cohorts enrolling now
            </span>

            <h1 className="hero-e-title">
              Professional skills,
              <br />
              taught with <span className="italic">artistry</span>.
            </h1>

            <p className="hero-e-lede">
              Training and certification programs for individuals and teams — across
              cloud, development, project management, quality, data, and marketing.
              Practical, current, and built around the work you actually do.
            </p>

            <div className="hero-e-cta">
              <Link href="/courses" className="btn btn-primary btn-lg">
                Explore courses <ArrowIcon />
              </Link>
              <Link href="/corporate-training" className="btn btn-ghost btn-lg">
                Training for teams
              </Link>
            </div>

            <div className="hero-e-proof">
              {PROOF.map((item) => (
                <div key={item.value}>
                  <div className="hero-e-proof-v">{item.value}</div>
                  <div className="hero-e-proof-l">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — photography + spotlight card */}
          <div className="hero-e-media">
            <div className="hero-e-photo">
              <Image
                src={HERO_PHOTO}
                alt="A live training session in progress"
                fill
                priority
                sizes="(max-width: 960px) 100vw, 46vw"
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div className="hero-e-card">
              <span className="hero-e-card-label">Now enrolling</span>
              <div className="hero-e-card-title">{stageTitle}</div>
              <div className="hero-e-card-meta">{stageMeta}</div>

              {items.length > 1 && (
                <div className="hero-e-dots">
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

              <Link
                href={current ? `/courses/${current.slug}` : '/courses'}
                className="hero-e-card-link"
              >
                <span style={{ flex: 1 }}>
                  {current ? 'View this program' : 'View all programs'}
                </span>
                <ArrowUpRightIcon size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
