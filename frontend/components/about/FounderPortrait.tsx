'use client';

import { useState } from 'react';

const PORTRAIT_SRC = '/founders/bhawna-lal.jpg';

export default function FounderPortrait() {
  const [showFallback, setShowFallback] = useState(false);

  if (showFallback) {
    return (
      <div
        style={{
          aspectRatio: '4 / 5',
          borderRadius: 16,
          border: '1px solid var(--color-line)',
          background:
            'linear-gradient(180deg, color-mix(in oklab, var(--color-bg-alt) 88%, white) 0%, var(--color-surface) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 10,
          padding: 24,
          textAlign: 'center',
        }}
      >
        <div
          className="serif"
          style={{
            fontSize: 'clamp(4rem, 9vw, 7rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: 'var(--color-ink)',
          }}
        >
          BL
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--color-ink-4)', letterSpacing: '0.06em' }}>
          Founder portrait
        </div>
      </div>
    );
  }

  return (
    <img
      src={PORTRAIT_SRC}
      alt="Bhawna Lal, founder of The Learning Artistry"
      onError={() => setShowFallback(true)}
      style={{
        width: '100%',
        height: '100%',
        aspectRatio: '4 / 5',
        objectFit: 'cover',
        borderRadius: 16,
        border: '1px solid var(--color-line)',
        background: 'var(--color-bg-alt)',
      }}
    />
  );
}
