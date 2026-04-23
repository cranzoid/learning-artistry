import Link from 'next/link';
import { HAS_DIRECT_CHECKOUT, RAZORPAY_CHECKOUT_URL } from '@/lib/site';

const LEARN_LINKS = [
  { href: '/courses', label: 'All courses' },
  { href: '/courses?category=cloud', label: 'Cloud & IT' },
  { href: '/courses?category=dev', label: 'Software Development' },
  { href: '/courses?category=pm', label: 'Project Management' },
  { href: '/courses?category=quality', label: 'Quality Management' },
  { href: '/courses?category=data', label: 'Data & AI' },
];

const COMPANY_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/corporate-training', label: 'For teams' },
  { href: '/contact', label: 'Contact' },
];

const LEGAL_LINKS = [
  { href: '/terms-and-conditions', label: 'Terms & Conditions' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/refunds', label: 'Refunds' },
];

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2.5 6h7M6.5 3l3 3-3 3" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-bg)] border-t border-[var(--color-line)] mt-[9rem]">
      {/* Big CTA block */}
      <div className="border-b border-[var(--color-line)] py-20 md:py-28">
        <div className="wrap flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div
            className="display text-[clamp(3.5rem,10vw,11rem)] leading-[0.85] tracking-[-0.04em] text-[var(--color-ink)]"
          >
            Training,<br />
            <span className="italic">mastered.</span>
          </div>
          <div className="flex flex-col gap-3 md:items-start">
            <div className="flex gap-3 flex-wrap">
              {HAS_DIRECT_CHECKOUT ? (
                <a
                  href={RAZORPAY_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  Pay Now <ArrowIcon />
                </a>
              ) : (
                <Link href="/contact" className="btn btn-primary btn-lg">
                  Enquire now <ArrowIcon />
                </Link>
              )}
              <Link href="/corporate-training" className="btn btn-ghost btn-lg">
                Talk to our team
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="wrap py-16 border-b border-[var(--color-line)]">
        <div className="grid gap-10" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          {/* Brand col */}
          <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-1" style={{ gridColumn: 'span 1' }}>
            <div className="eyebrow mb-2">Company</div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden>
                <rect x="1" y="1" width="30" height="30" rx="6" fill="var(--color-ink)" />
                <path d="M8 22V10" stroke="var(--color-bg)" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M8 22h6" stroke="var(--color-bg)" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M17 22 22 10l5 12" stroke="var(--color-bg)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19.2 18h5.6" stroke="var(--color-bg)" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="26.5" cy="5.5" r="1.1" fill="var(--color-accent)" />
              </svg>
              <span className="inline-flex items-baseline gap-1.5">
                <span className="serif italic text-[16px] text-[var(--color-ink-3)]">The</span>
                <span className="text-[15px] font-medium tracking-[-0.01em]">Learning Artistry</span>
              </span>
            </Link>
            <p className="text-[14px] text-[var(--color-ink-4)] leading-relaxed max-w-[260px]">
              Professional training and certification for individuals and teams who want practical, well-structured learning.
            </p>
          </div>

          {/* Learn col */}
          <div className="flex flex-col gap-2.5">
            <div className="eyebrow mb-2">Learn</div>
            {LEARN_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[14px] text-[var(--color-ink-3)] hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Company col */}
          <div className="flex flex-col gap-2.5">
            <div className="eyebrow mb-2">Company</div>
            {COMPANY_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[14px] text-[var(--color-ink-3)] hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact col */}
          <div className="flex flex-col gap-2.5">
            <div className="eyebrow mb-2">Contact</div>
            <a
              href="mailto:learning@thelearningartistry.com"
              className="text-[14px] text-[var(--color-ink-3)] hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              learning@thelearningartistry.com
            </a>
            <a
              href="mailto:support@thelearningartistry.com"
              className="text-[14px] text-[var(--color-ink-3)] hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              support@thelearningartistry.com
            </a>
            <span className="text-[14px] text-[var(--color-ink-4)]">+91 9211571166</span>
            <span className="text-[14px] text-[var(--color-ink-4)]">Mon–Fri · Business hours IST</span>
            <span className="text-[14px] text-[var(--color-ink-4)] mt-2">WeWork, Blue 1 Square, Udyog Vihar, Gurugram</span>
          </div>

          {/* Legal col */}
          <div className="flex flex-col gap-2.5">
            <div className="eyebrow mb-2">Legal</div>
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[14px] text-[var(--color-ink-3)] hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="wrap py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[12px]">
        <span className="mono text-[var(--color-ink-4)]">
          © {year} The Learning Artistry
        </span>
        <span className="mono text-[var(--color-ink-5)]">
          New Delhi roots · Gurugram office
        </span>
        <span className="mono text-[var(--color-ink-4)]">
          learning@thelearningartistry.com
        </span>
      </div>
    </footer>
  );
}
