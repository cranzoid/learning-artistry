import Link from 'next/link';
import type { Course } from '@/types';
import { fmtPrice } from '@/lib/api';
import { getCourseAccent } from '@/components/ui/CourseMood';

interface CourseCardProps {
  course: Course;
  variant?: 'grid' | 'list';
  index?: number;
}

function ArrowUpRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 9L9 3M9 3H4M9 3v5" />
    </svg>
  );
}

function shortCodeFor(course: Course) {
  if (course.code) return course.code;
  const letters = (course.catLabel || 'TLA').replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || 'TLA';
  return `${letters} · 000`;
}

export default function CourseCard({ course, variant = 'grid', index = 0 }: CourseCardProps) {
  const color = getCourseAccent(course);
  const code = shortCodeFor(course);
  const displayPrice = typeof course.price === 'number' ? course.price : undefined;
  const hasVisiblePrice = course.showPrice && displayPrice !== undefined;
  const saved = hasVisiblePrice && course.compare
    ? Math.round((1 - displayPrice / course.compare) * 100)
    : 0;
  const titleLead = course.title.split(' —')[0];

  // ── List variant ──────────────────────────────────────────────────────────
  if (variant === 'list') {
    return (
      <Link
        href={`/courses/${course.slug}`}
        className="cc-list"
        style={{ animationDelay: `${index * 40}ms` }}
      >
        <span className="cc-list-code mono">{code}</span>
        <span className="cc-list-title serif">{titleLead}</span>
        <span className="cc-list-meta mono">
          {course.catLabel} · {course.duration} · {course.level}
        </span>
        <span className="cc-list-price serif">
          {hasVisiblePrice ? fmtPrice(displayPrice) : 'Enquire now'}
        </span>
        <span className="cc-list-arrow">
          <ArrowUpRight />
        </span>

        <style>{`
          .cc-list {
            display: grid;
            grid-template-columns: 110px minmax(0, 1fr) minmax(0, auto) auto 24px;
            gap: 24px;
            align-items: center;
            padding: 22px 4px;
            border-top: 1px solid var(--color-line);
            transition: background .3s, padding .3s;
            animation: cc-enter 420ms cubic-bezier(0.16, 1, 0.3, 1) both;
          }
          .cc-list:hover {
            background: var(--color-bg-alt);
            padding-inline: 16px;
          }
          .cc-list-code {
            font-size: 11px;
            color: var(--color-ink-4);
            letter-spacing: 0.05em;
          }
          .cc-list-title {
            font-size: 20px;
            letter-spacing: -0.015em;
            line-height: 1.15;
            color: var(--color-ink);
            min-width: 0;
          }
          .cc-list-meta {
            font-size: 12px;
            color: var(--color-ink-4);
          }
          .cc-list-price {
            font-size: 22px;
            letter-spacing: -0.02em;
            color: var(--color-ink);
          }
          .cc-list-arrow {
            color: var(--color-ink-3);
            transition: transform .3s, color .3s;
            display: inline-flex;
          }
          .cc-list:hover .cc-list-arrow {
            transform: translate(3px, -3px);
            color: var(--color-accent);
          }
          @keyframes cc-enter {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: none; }
          }
          @media (max-width: 820px) {
            .cc-list {
              grid-template-columns: minmax(0, 1fr) auto;
              row-gap: 6px;
              column-gap: 16px;
            }
            .cc-list-code { grid-column: 1 / 2; grid-row: 1; }
            .cc-list-title { grid-column: 1 / -1; grid-row: 2; }
            .cc-list-meta { grid-column: 1 / -1; grid-row: 3; }
            .cc-list-price { grid-column: 1; grid-row: 4; }
            .cc-list-arrow { grid-column: 2; grid-row: 1 / 5; align-self: center; }
          }
        `}</style>
      </Link>
    );
  }

  // ── Default colored portrait card ─────────────────────────────────────────
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="cc-port"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="cc-port-panel" style={{ background: color }}>
        <div className="cc-port-top">
          <span className="mono cc-port-code">{code}</span>
          <span className="mono cc-port-cat">{course.catLabel}</span>
        </div>
        <h3 className="serif cc-port-title">{titleLead}</h3>
        {course.cert && <span className="mono cc-port-cert">{course.cert}</span>}
      </div>

      <div className="cc-port-body">
        <p className="cc-port-short">{course.short}</p>
        <div className="cc-port-foot">
          <div className="cc-port-meta">
            <span className="mono">{course.duration}</span>
            <span className="mono">·</span>
            <span className="mono">{course.level}</span>
          </div>
          <div className="cc-port-price">
            {hasVisiblePrice ? (
              <>
                <span className="serif">{fmtPrice(displayPrice)}</span>
                {course.compare && (
                  <span className="mono cc-port-compare">{fmtPrice(course.compare)}</span>
                )}
                {saved > 0 && <span className="chip chip-accent cc-port-save">-{saved}%</span>}
              </>
            ) : (
              <span className="serif">Enquire now</span>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .cc-port {
          display: flex;
          flex-direction: column;
          background: var(--color-surface);
          border: 1px solid var(--color-line);
          border-radius: 16px;
          overflow: hidden;
          height: 100%;
          transition: border-color .3s, transform .4s cubic-bezier(0.16,1,0.3,1), box-shadow .4s cubic-bezier(0.16,1,0.3,1);
          animation: cc-enter 460ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .cc-port:hover {
          border-color: var(--color-ink-5);
          transform: translateY(-3px);
          box-shadow: 0 24px 48px -28px rgba(10,10,10,0.22), 0 2px 6px rgba(10,10,10,0.04);
        }
        .cc-port-panel {
          position: relative;
          aspect-ratio: 4 / 3;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
          color: #fff;
          isolation: isolate;
          overflow: hidden;
        }
        .cc-port-panel::before,
        .cc-port-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: -1;
        }
        .cc-port-panel::before {
          background:
            radial-gradient(120% 80% at 10% 0%, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0) 45%),
            linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.30) 100%);
        }
        .cc-port-panel::after {
          background:
            radial-gradient(60% 60% at 90% 100%, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0) 65%);
          mix-blend-mode: multiply;
        }
        .cc-port-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          font-size: 11px;
          line-height: 1.2;
          opacity: 0.95;
        }
        .cc-port-code { letter-spacing: 0.05em; }
        .cc-port-cat {
          letter-spacing: 0.05em;
          text-transform: uppercase;
          opacity: 0.78;
          text-align: right;
        }
        .cc-port-title {
          font-weight: 400;
          font-size: clamp(22px, 2.2vw, 28px);
          line-height: 1.08;
          letter-spacing: -0.02em;
          margin: 0;
          max-width: 16ch;
          color: #fff;
        }
        .cc-port-cert {
          align-self: flex-start;
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.28);
          backdrop-filter: blur(6px);
        }
        .cc-port-body {
          padding: 20px 22px 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
        }
        .cc-port-short {
          font-size: 14px;
          color: var(--color-ink-3);
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .cc-port-foot {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--color-line);
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
          flex-wrap: wrap;
        }
        .cc-port-meta {
          display: flex;
          gap: 6px;
          font-size: 11px;
          color: var(--color-ink-4);
        }
        .cc-port-price {
          display: inline-flex;
          align-items: baseline;
          gap: 8px;
          flex-wrap: wrap;
        }
        .cc-port-price .serif {
          font-size: 22px;
          letter-spacing: -0.02em;
          color: var(--color-ink);
        }
        .cc-port-compare {
          font-size: 11px;
          color: var(--color-ink-4);
          text-decoration: line-through;
        }
        .cc-port-save {
          font-size: 10px;
          padding: 3px 8px;
        }
        @keyframes cc-enter {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: none; }
        }
        @media (max-width: 520px) {
          .cc-port-panel { aspect-ratio: 16 / 10; padding: 18px; }
          .cc-port-body { padding: 18px 18px 20px; }
        }
      `}</style>
    </Link>
  );
}
