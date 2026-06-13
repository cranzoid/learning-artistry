import Link from 'next/link';
import { ArrowIcon } from '@/components/ui/icons';

export const metadata = {
  title: 'Page Not Found — The Learning Artistry',
};

export default function NotFound() {
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
          fontWeight: 540,
          lineHeight: 1.04,
          letterSpacing: '-0.02em',
        }}
      >
        Page not<br />
        <span className="italic">found.</span>
      </h1>
      <p className="lead" style={{ maxWidth: '40ch' }}>
        That page may have moved, been retired, or the link might be wrong.
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/courses" className="btn btn-primary btn-lg">
          Browse catalog <ArrowIcon />
        </Link>
        <Link href="/" className="btn btn-ghost btn-lg">
          Back home
        </Link>
      </div>
    </div>
  );
}
