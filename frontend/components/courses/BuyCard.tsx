'use client';

import Link from 'next/link';
import { ArrowIcon, CheckIcon } from '@/components/ui/icons';
import { fmtPrice } from '@/lib/api';
import { HAS_DIRECT_CHECKOUT, RAZORPAY_CHECKOUT_URL } from '@/lib/site';

interface Props {
  title: string;
  code?: string;
  categoryLabel?: string;
  price?: number;
  compare?: number;
  razorpay_link?: string;
  showPrice: boolean;
  duration: string;
  level: string;
  mode: string;
  cert?: string;
  saved: number;
  seatsLeft: number;
  seatsReserved: number;
  cohortSize: number;
  nextStart: string;
}

export default function BuyCard({
  title,
  code,
  categoryLabel,
  price,
  compare,
  razorpay_link,
  showPrice,
  duration,
  level,
  mode,
  cert,
  saved,
  seatsLeft,
  seatsReserved,
  cohortSize,
  nextStart,
}: Props) {
  const progress = Math.max(20, Math.min(100, Math.round((seatsReserved / cohortSize) * 100)));
  const certLabel = cert && cert.length > 36 ? 'Completion certificate' : cert;
  const checkoutUrl = razorpay_link || RAZORPAY_CHECKOUT_URL;
  const hasVisiblePrice = showPrice && typeof price === 'number';
  const hasDirectCheckout = hasVisiblePrice && (Boolean(razorpay_link) || HAS_DIRECT_CHECKOUT);

  return (
    <aside
      style={{
        position: 'sticky',
        top: 100,
        background: 'var(--color-surface)',
        color: 'var(--color-ink)',
        border: '1px solid var(--color-line)',
        borderRadius: 20,
        padding: 28,
        boxShadow: '0 18px 44px rgba(10,10,10,0.08)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 100% 0%, rgba(74,58,255,0.08) 0%, transparent 44%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 12,
            paddingBottom: 18,
            marginBottom: 18,
            borderBottom: '1px solid var(--color-line)',
          }}
        >
          <div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--color-ink-4)' }}>
              {code ? `${code} · ${categoryLabel ?? 'TLA'}` : categoryLabel ?? 'The Learning Artistry'}
            </div>
            <div
              className="serif"
              style={{
                fontSize: 24,
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                marginTop: 10,
                maxWidth: '14ch',
                color: 'var(--color-ink)',
              }}
            >
              {title.split(' —')[0]}
            </div>
          </div>
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--color-ink-4)',
              textAlign: 'right',
              alignSelf: 'start',
            }}
          >
            LIVE
            <br />
            INSTRUCTOR-LED
          </div>
        </div>

      {/* Urgency strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            paddingBottom: 16,
            marginBottom: 20,
            borderBottom: '1px solid var(--color-line)',
            fontSize: 12,
            color: 'var(--color-ink-3)',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#22c55e',
              flexShrink: 0,
              animation: 'pulse-dot 2s ease-in-out infinite',
            }}
          />
          <span className="mono">
            Only <b style={{ color: 'var(--color-accent)' }}>{seatsLeft} seats</b> left · starts {nextStart}
          </span>
        </div>

      {/* Price / enquiry */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 14,
            flexWrap: 'wrap',
          }}
        >
          {hasVisiblePrice ? (
            <>
              <span
                className="serif"
                style={{
                  fontSize: 'clamp(2.6rem, 4vw, 3.35rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  color: 'var(--color-ink)',
                }}
              >
                {fmtPrice(price)}
              </span>
              {compare && saved > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingBottom: 4 }}>
                  <span
                    className="mono"
                    style={{
                      fontSize: 12,
                      color: 'var(--color-ink-4)',
                      textDecoration: 'line-through',
                    }}
                  >
                    {fmtPrice(compare)}
                  </span>
                  <span className="chip chip-accent">Save {saved}%</span>
                </div>
              )}
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span
                className="serif"
                style={{
                  fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.02,
                  color: 'var(--color-ink)',
                }}
              >
                Enquire now
              </span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--color-ink-4)' }}>
                We&apos;ll share cohort options, pricing, and the right fit for your goals.
              </span>
            </div>
          )}
        </div>
        {hasVisiblePrice && saved > 0 && (
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--color-accent)',
              letterSpacing: '0.06em',
              marginTop: 6,
              textTransform: 'uppercase',
            }}
          >
            Limited-time price
          </div>
        )}

        <div style={{ marginTop: 18 }}>
          <div
            style={{
              height: 6,
              borderRadius: 999,
              background: 'var(--color-bg-alt)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #4A3AFF 0%, #8AA1FF 100%)',
                borderRadius: 999,
              }}
            />
          </div>
          <div
            className="mono"
            style={{
              marginTop: 8,
              fontSize: 10,
              color: 'var(--color-ink-4)',
            }}
          >
            {seatsReserved} of {cohortSize} seats reserved
          </div>
        </div>

        {!hasVisiblePrice && (
          <div
            style={{
              marginTop: 18,
              padding: '14px 16px',
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-line)',
              borderRadius: 14,
              fontSize: 13,
              lineHeight: 1.6,
              color: 'var(--color-ink-3)',
            }}
          >
            Talk with the admissions team about schedule, pricing, and whether this cohort is the right match.
          </div>
        )}

      {/* Course facts */}
        <div
          style={{
            margin: '20px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            paddingBottom: 20,
            borderBottom: '1px solid var(--color-line)',
          }}
        >
          {[
            { k: 'Duration', v: duration },
            { k: 'Level', v: level },
            { k: 'Delivery', v: mode },
            ...(certLabel ? [{ k: 'Cert.', v: certLabel }] : []),
          ].map((row) => (
            <div
              key={row.k}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
                fontSize: 13,
                alignItems: 'flex-start',
              }}
            >
              <span className="mono" style={{ color: 'var(--color-ink-4)', fontSize: 11 }}>
                {row.k}
              </span>
              <span
                style={{
                  color: 'var(--color-ink-2)',
                  textAlign: 'right',
                  maxWidth: '65%',
                  whiteSpace: 'normal',
                  lineHeight: 1.45,
                }}
              >
                {row.v}
              </span>
            </div>
          ))}
        </div>

      {/* CTA */}
        {hasDirectCheckout ? (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ink btn-lg"
            style={{
              width: '100%',
              justifyContent: 'center',
              fontSize: 16,
              padding: '16px 20px',
              background: 'var(--color-ink)',
              color: 'var(--color-bg)',
              borderColor: 'var(--color-ink)',
            }}
          >
            Reserve my seat <ArrowIcon />
          </a>
        ) : (
          <Link
            href="/contact"
            className="btn btn-ink btn-lg"
            style={{
              width: '100%',
              justifyContent: 'center',
              fontSize: 16,
              padding: '16px 20px',
              background: 'var(--color-ink)',
              color: 'var(--color-bg)',
              borderColor: 'var(--color-ink)',
            }}
          >
            {hasVisiblePrice ? 'Enquire to enrol' : 'Enquire now'} <ArrowIcon />
          </Link>
        )}

        <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Link
            href="/contact"
            className="btn"
            style={{
              justifyContent: 'center',
              fontSize: 13,
              borderColor: 'var(--color-line-2)',
              color: 'var(--color-ink-3)',
            }}
          >
            Team pricing
          </Link>
          <a
            href="#syllabus"
            className="btn"
            style={{
              justifyContent: 'center',
              fontSize: 13,
              borderColor: 'var(--color-line-2)',
              color: 'var(--color-ink-3)',
            }}
          >
            View syllabus
          </a>
        </div>

      {/* Trust bullets */}
        <div
          style={{
            marginTop: 20,
            paddingTop: 20,
            borderTop: '1px solid var(--color-line)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            fontSize: 13,
            color: 'var(--color-ink-3)',
          }}
        >
          {(
            hasVisiblePrice
              ? [
                  'Exam voucher included on certification tracks',
                  'Pass guarantee with guided retake support',
                  'Corporate invoicing and team discounts for 3+',
                ]
              : [
                  'Get current pricing and upcoming cohort options',
                  'Talk through team enrolment and invoicing support',
                  'Receive advisor guidance before you commit',
                ]
          ).map((b) => (
            <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }}>
                <CheckIcon size={13} />
              </span>
              <span style={{ lineHeight: 1.5 }}>{b}</span>
            </div>
          ))}
        </div>

      {/* Trust footer */}
        <div
          style={{
            marginTop: 16,
            paddingTop: 14,
            borderTop: '1px solid var(--color-line)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span className="mono" style={{ fontSize: 10, color: 'var(--color-ink-5)', letterSpacing: '0.05em' }}>
            {hasVisiblePrice ? 'TRUSTED PAYMENT' : 'ADMISSIONS SUPPORT'}
          </span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--color-ink-4)' }}>
            {hasVisiblePrice ? 'Razorpay · Secure checkout' : 'Replies within one business day'}
          </span>
        </div>
      </div>
    </aside>
  );
}
