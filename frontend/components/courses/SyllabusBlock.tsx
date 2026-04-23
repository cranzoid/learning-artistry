'use client';

import { useState } from 'react';
import type { SyllabusModule } from '@/types';
import { PlusIcon } from '@/components/ui/icons';

interface Props {
  modules: SyllabusModule[];
}

export default function SyllabusBlock({ modules }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  if (modules.length === 0) return null;

  return (
    <div
      style={{
        marginTop: 48,
        border: '1px solid var(--color-line)',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      {modules.map((m, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              borderBottom: i < modules.length - 1 ? '1px solid var(--color-line)' : 'none',
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`syllabus-panel-${i}`}
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '48px 1fr 24px',
                gap: 20,
                padding: '24px 28px',
                textAlign: 'left',
                background: isOpen ? 'var(--color-bg-alt)' : 'var(--color-surface)',
                transition: 'background .2s',
                cursor: 'pointer',
                alignItems: 'center',
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: 10,
                  color: isOpen ? 'var(--color-accent)' : 'var(--color-ink-5)',
                  letterSpacing: '0.06em',
                  transition: 'color .2s',
                }}
              >
                M{String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="serif"
                style={{
                  fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.2,
                  color: isOpen ? 'var(--color-ink)' : 'var(--color-ink-2)',
                  transition: 'color .2s',
                }}
              >
                {m.title}
              </span>
              <span
                style={{
                  color: isOpen ? 'var(--color-accent)' : 'var(--color-ink-4)',
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                  transition: 'transform .3s cubic-bezier(0.16, 1, 0.3, 1), color .2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PlusIcon size={14} />
              </span>
            </button>

            {/* CSS max-height transition — always mounted, collapses via height */}
            <div
              id={`syllabus-panel-${i}`}
              style={{
                overflow: 'hidden',
                maxHeight: isOpen ? '500px' : '0',
                transition: 'max-height .4s cubic-bezier(0.16, 1, 0.3, 1)',
                background: 'var(--color-surface)',
              }}
            >
              <div
                style={{
                  padding: '4px 28px 28px 96px',
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: 'var(--color-ink-3)',
                  maxWidth: '72ch',
                }}
              >
                {m.description ? (
                  m.description
                ) : (
                  <span style={{ color: 'var(--color-ink-5)', fontStyle: 'italic' }}>
                    Detailed module content coming soon.
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
