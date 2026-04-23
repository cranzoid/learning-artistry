'use client';

import { useState } from 'react';
import type { HomeTestimonial } from '@/lib/home-content';

interface Props {
  items: HomeTestimonial[];
}

export default function HomeTestimonials({ items }: Props) {
  const [active, setActive] = useState(0);
  const current = items[active];

  if (!current) return null;

  return (
    <div className="tt-outer mt-12 grid items-stretch gap-6" style={{ gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,0.9fr)' }}>
      {/* Quote card */}
      <div
        className="flex flex-col justify-between gap-8 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-10"
        style={{ minHeight: '300px' }}
      >
        <div className="relative pt-2">
          <span
            className="serif pointer-events-none absolute select-none leading-none text-[var(--color-accent)]"
            style={{ left: '-0.25rem', top: '-1.5rem', fontSize: 'clamp(72px,10vw,112px)' }}
            aria-hidden
          >
            &ldquo;
          </span>
          <blockquote
            className="serif m-0 font-normal leading-[1.3] tracking-[-0.015em] text-[var(--color-ink)]"
            style={{ fontSize: 'clamp(1.2rem,2vw,1.75rem)', maxWidth: '38ch' }}
          >
            {current.quote}
          </blockquote>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-[var(--color-line)] pt-6">
          <div>
            <div className="serif text-[1.125rem] tracking-[-0.015em]">{current.name}</div>
            <div className="mono mt-0.5 text-[12px] text-[var(--color-ink-4)]">
              {current.role} · {current.org}
            </div>
          </div>
          <div className="text-right">
            <div className="mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-ink-4)]">
              Program Focus
            </div>
            <div className="serif mt-1 text-[1.125rem] tracking-[-0.01em]">{current.metric}</div>
          </div>
        </div>
      </div>

      {/* Selector list */}
      <div className="flex flex-col border-t border-[var(--color-line)]">
        {items.map((item, index) => (
          <button
            key={`${item.name}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            className={[
              'grid items-baseline gap-3 border-b border-[var(--color-line)] py-4 pl-1 pr-1 text-left transition-all duration-200',
              index === active
                ? 'bg-[var(--color-surface)] pl-3'
                : 'hover:bg-[var(--color-surface)] hover:pl-3',
            ].join(' ')}
            style={{ gridTemplateColumns: '28px minmax(0,1fr) auto' }}
          >
            <span className="mono text-[11px] text-[var(--color-ink-4)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className={[
                'serif min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[1.125rem] tracking-[-0.015em]',
                index === active ? 'text-[var(--color-accent)]' : 'text-[var(--color-ink)]',
              ].join(' ')}
            >
              {item.name}
            </span>
            <span className="mono hidden text-[11px] text-[var(--color-ink-4)] sm:block">
              {item.org}
            </span>
          </button>
        ))}
      </div>

      {/* Responsive: stack on narrow screens */}
      <style>{`
        @media (max-width: 860px) {
          .tt-outer { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
