import type { Course } from '@/types';

export const CATEGORY_COLORS: Record<string, string> = {
  cloud: '#4A3AFF',
  dev: '#C24A2E',
  pm: '#0E77D6',
  quality: '#2E7D32',
  data: '#7B3AED',
  leadership: '#1A1A1A',
  marketing: '#D4763B',
  finance: '#1E6B55',
};

export type CourseMoodKind = 'grid' | 'rings' | 'bars';

export function getCourseAccent(course: Pick<Course, 'cat' | 'color'>) {
  return course.color || CATEGORY_COLORS[course.cat] || 'var(--color-accent)';
}

export function getCourseMoodKind(slug: string): CourseMoodKind {
  const seed = slug.length + (slug.charCodeAt(0) || 0);
  if (seed % 3 === 0) return 'grid';
  if (seed % 3 === 1) return 'rings';
  return 'bars';
}

function MoodGrid({ slug, color }: { slug: string; color: string }) {
  const seed = slug.length + (slug.charCodeAt(0) || 0);

  return (
    <svg
      viewBox="0 0 400 240"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden
    >
      <defs>
        <pattern id={`tla-grid-${slug}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M20 0 L0 0 0 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.12"
          />
        </pattern>
      </defs>
      <rect width="400" height="240" fill={`url(#tla-grid-${slug})`} />
      <circle cx={100 + (seed % 5) * 10} cy="120" r={68} fill={color} opacity="0.88" />
      <rect
        x={210 + (seed % 4) * 6}
        y={44}
        width="116"
        height="116"
        fill="var(--color-ink)"
        opacity="0.82"
      />
      <circle
        cx="315"
        cy="185"
        r="24"
        fill="var(--color-bg)"
        stroke="var(--color-ink)"
        strokeWidth="1.2"
        opacity="0.9"
      />
    </svg>
  );
}

function MoodRings({ slug, color }: { slug: string; color: string }) {
  const seed = slug.length + (slug.charCodeAt(0) || 0);
  const cx = 200 + (seed % 3) * 12;

  return (
    <svg
      viewBox="0 0 400 240"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden
    >
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <circle
          key={i}
          cx={cx}
          cy="120"
          r={16 + i * 20}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.1"
        />
      ))}
      <circle cx={cx} cy="120" r="13" fill={color} opacity="0.9" />
      <circle cx="338" cy="56" r="5" fill="var(--color-ink)" opacity="0.55" />
      <circle cx="68" cy="185" r="3.5" fill="var(--color-ink)" opacity="0.4" />
    </svg>
  );
}

function MoodBars({ slug, color }: { slug: string; color: string }) {
  const seed = slug.length + (slug.charCodeAt(0) || 0);

  return (
    <svg
      viewBox="0 0 400 240"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden
    >
      {Array.from({ length: 16 }, (_, i) => {
        const h = 36 + Math.abs(Math.sin(i * 0.75 + seed * 0.1)) * 155;
        return (
          <rect
            key={i}
            x={i * 24 + 8}
            y={220 - h}
            width="16"
            height={h}
            fill={i % 4 === 0 ? color : 'var(--color-ink)'}
            opacity={i % 4 === 0 ? 0.85 : 0.72}
          />
        );
      })}
    </svg>
  );
}

export default function CourseMood({
  slug,
  color,
  kind = getCourseMoodKind(slug),
}: {
  slug: string;
  color: string;
  kind?: CourseMoodKind;
}) {
  if (kind === 'grid') return <MoodGrid slug={slug} color={color} />;
  if (kind === 'rings') return <MoodRings slug={slug} color={color} />;
  return <MoodBars slug={slug} color={color} />;
}
