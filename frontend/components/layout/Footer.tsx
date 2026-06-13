import Link from 'next/link';
import { HAS_DIRECT_CHECKOUT, RAZORPAY_CHECKOUT_URL } from '@/lib/site';

const LEARN_LINKS = [
  { href: '/courses', label: 'All courses' },
  { href: '/courses?category=cloud', label: 'Cloud & Infrastructure' },
  { href: '/courses?category=dev', label: 'Software Development' },
  { href: '/courses?category=pm', label: 'Project Management & Agile' },
  { href: '/courses?category=quality', label: 'Quality Management' },
  { href: '/courses?category=data', label: 'Data, Analytics & AI' },
  { href: '/courses?category=marketing', label: 'Digital Marketing' },
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
    <footer className="mt-[7rem]">
      {/* Closing CTA panel */}
      <div className="wrap">
        <div className="cta-panel">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div className="display text-[clamp(2.75rem,7vw,6.5rem)] text-[#F6F2EA]">
              Training,<br />
              <span className="cta-gold">mastered.</span>
            </div>
            <div className="flex flex-col gap-4 md:items-start md:pb-3">
              <p className="max-w-[38ch] text-[15px] leading-relaxed text-[#F6F2EA]/75">
                Join the next cohort, or build a program for your whole team.
                Either way, it starts with one conversation.
              </p>
              <div className="flex gap-3 flex-wrap">
                {HAS_DIRECT_CHECKOUT ? (
                  <a
                    href={RAZORPAY_CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-on-dark btn-lg"
                  >
                    Pay Now <ArrowIcon />
                  </a>
                ) : (
                  <Link href="/contact" className="btn btn-on-dark btn-lg">
                    Enquire now <ArrowIcon />
                  </Link>
                )}
                <Link href="/corporate-training" className="btn btn-outline-light btn-lg">
                  Talk to our team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="wrap py-16 mt-12 border-t border-[var(--color-line)]">
        <div className="grid gap-10" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          {/* Brand col */}
          <div className="flex flex-col gap-3" style={{ gridColumn: 'span 1' }}>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
                <rect x="0.5" y="0.5" width="31" height="31" rx="8" fill="#1B1813" />
                <path d="M8 22V10" stroke="#FBF9F4" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M8 22h6" stroke="#FBF9F4" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M17 22 22 10l5 12" stroke="#FBF9F4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19.2 18h5.6" stroke="#C29A4D" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="serif text-[16px] tracking-[-0.015em]">The Learning Artistry</span>
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
                className="text-[14px] font-medium text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors duration-200"
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
                className="text-[14px] font-medium text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors duration-200"
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
              className="text-[14px] font-medium text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors duration-200"
            >
              learning@thelearningartistry.com
            </a>
            <a
              href="mailto:support@thelearningartistry.com"
              className="text-[14px] font-medium text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors duration-200"
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
                className="text-[14px] font-medium text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-line)]">
        <div className="wrap py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[12.5px] font-medium text-[var(--color-ink-4)]">
          <span>© {year} The Learning Artistry</span>
          <span className="text-[var(--color-ink-5)]">New Delhi roots · Gurugram office</span>
          <span>learning@thelearningartistry.com</span>
        </div>
      </div>
    </footer>
  );
}
