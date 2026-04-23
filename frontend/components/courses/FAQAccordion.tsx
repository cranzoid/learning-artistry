'use client';

import { useState } from 'react';
import type { FAQ } from '@/types';
import { PlusIcon } from '@/components/ui/icons';

interface Props {
  items: FAQ[];
}

export default function FAQAccordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ marginTop: 48, borderTop: '1px solid var(--color-line)' }}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderBottom: '1px solid var(--color-line)' }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '48px 1fr 24px',
                gap: 20,
                padding: '26px 0',
                textAlign: 'left',
                cursor: 'pointer',
                alignItems: 'center',
                background: 'transparent',
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: 11,
                  color: isOpen ? 'var(--color-accent)' : 'var(--color-ink-5)',
                  transition: 'color .2s',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="serif"
                style={{
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.625rem)',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.2,
                  color: 'var(--color-ink)',
                }}
              >
                {f.q}
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

            {/* CSS max-height transition — always mounted */}
            <div
              id={`faq-panel-${i}`}
              style={{
                overflow: 'hidden',
                maxHeight: isOpen ? '400px' : '0',
                transition: 'max-height .4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div
                style={{
                  paddingLeft: 68,
                  paddingBottom: 28,
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: 'var(--color-ink-3)',
                  maxWidth: '64ch',
                }}
              >
                {f.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
