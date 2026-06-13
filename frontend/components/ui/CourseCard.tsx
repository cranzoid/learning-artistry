import Link from 'next/link';
import Image from 'next/image';
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
          {hasVisiblePrice ? fmtPrice(displayPrice, course.currency) : 'Enquire now'}
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
            background: var(--color-surface);
            padding-inline: 16px;
          }
          .cc-list-code {
            font-size: 11px;
            color: var(--color-ink-4);
            letter-spacing: 0.05em;
          }
          .cc-list-title {
            font-size: 20px;
            letter-spacing: -0.012em;
            line-height: 1.18;
            color: var(--color-ink);
            min-width: 0;
          }
          .cc-list-meta {
            font-size: 12px;
            color: var(--color-ink-4);
          }
          .cc-list-price {
            font-size: 20px;
            letter-spacing: -0.015em;
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

  // ── Grid variant — editorial cover card ───────────────────────────────────
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="cc-port"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {course.thumbnail ? (
        <div className="cc-port-panel cc-port-photo">
          <Image
            src={course.thumbnail}
            alt={titleLead}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="cc-port-photo-shade" />
          <div className="cc-port-top">
            <span className="mono cc-port-code">{code}</span>
            <span className="mono cc-port-cat">{course.catLabel}</span>
          </div>
          <h3 className="serif cc-port-title">{titleLead}</h3>
        </div>
      ) : (
        <div className="cc-port-panel" style={{ background: color }}>
          <div className="cc-port-top">
            <span className="mono cc-port-code">{code}</span>
            <span className="mono cc-port-cat">{course.catLabel}</span>
          </div>
          <h3 className="serif cc-port-title">{titleLead}</h3>
          {course.cert && <span className="cc-port-cert">{course.cert}</span>}
        </div>
      )}

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
                <span className="serif">{fmtPrice(displayPrice, course.currency)}</span>
                {course.compare && saved > 0 && (
                  <span className="mono cc-port-compare">{fmtPrice(course.compare, course.currency)}</span>
                )}
              </>
            ) : (
              <span className="cc-port-enquire">
                Enquire <ArrowUpRight />
              </span>
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
          box-shadow: var(--shadow-card);
          transition: border-color .3s, transform .4s cubic-bezier(0.16,1,0.3,1), box-shadow .4s cubic-bezier(0.16,1,0.3,1);
          animation: cc-enter 460ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .cc-port:hover {
          border-color: var(--color-line-2);
          transform: translateY(-5px);
          box-shadow: var(--shadow-card-hover);
        }
        .cc-port-panel {
          position: relative;
          aspect-ratio: 4 / 3;
          padding: 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
          color: #FBF9F4;
          isolation: isolate;
          overflow: hidden;
        }
        .cc-port-panel:not(.cc-port-photo)::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: -1;
          background:
            radial-gradient(130% 90% at 12% 0%, rgba(251,249,244,0.14) 0%, rgba(251,249,244,0) 50%),
            linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.22) 100%);
        }
        .cc-port-photo img {
          z-index: -2;
        }
        .cc-port-photo-shade {
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(180deg, rgba(23,20,16,0.25) 0%, rgba(23,20,16,0.05) 35%, rgba(23,20,16,0.62) 100%);
        }
        .cc-port-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(251,249,244,0.28);
          font-size: 11px;
          line-height: 1.2;
        }
        .cc-port-code { letter-spacing: 0.05em; opacity: 0.9; }
        .cc-port-cat {
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.78;
          text-align: right;
        }
        .cc-port-title {
          font-weight: 540;
          font-size: clamp(21px, 2.1vw, 26px);
          line-height: 1.12;
          letter-spacing: -0.015em;
          margin: 0;
          max-width: 17ch;
          color: #FBF9F4;
        }
        .cc-port-cert {
          align-self: flex-start;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 5px 11px;
          border-radius: 999px;
          border: 1px solid rgba(251,249,244,0.35);
          color: rgba(251,249,244,0.92);
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
          line-height: 1.55;
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
          font-size: 20px;
          letter-spacing: -0.015em;
          color: var(--color-ink);
        }
        .cc-port-compare {
          font-size: 11px;
          color: var(--color-ink-4);
          text-decoration: line-through;
        }
        .cc-port-enquire {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--color-accent);
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
