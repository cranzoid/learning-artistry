'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const PAY_NOW_URL = 'https://rzp.io/l/thelearningartistry';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/about', label: 'About' },
  { href: '/corporate-training', label: 'Corporate' },
  { href: '/contact', label: 'Contact' },
];

function Logomark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="0.5" y="0.5" width="31" height="31" rx="8" fill="#1B1813" />
      <path d="M8 22V10" stroke="#FBF9F4" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 22h6" stroke="#FBF9F4" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 22 22 10l5 12" stroke="#FBF9F4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.2 18h5.6" stroke="#C29A4D" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-all duration-300',
        'backdrop-blur-[14px]',
        scrolled
          ? 'border-b border-[var(--color-line)] shadow-[0_4px_24px_-16px_rgba(27,24,19,0.18)]'
          : 'border-b border-transparent',
      ].join(' ')}
      style={{ background: 'color-mix(in oklab, var(--color-bg) 88%, transparent)' }}
    >
      <div className="wrap">
        <div className="relative grid items-center h-[78px]" style={{ gridTemplateColumns: 'auto 1fr auto' }}>

          {/* Wordmark */}
          <Link href="/" className="inline-flex items-center gap-3 group">
            <Logomark size={32} />
            <span className="flex flex-col leading-none">
              <span className="serif text-[17.5px] tracking-[-0.015em] text-[var(--color-ink)]">
                The Learning Artistry
              </span>
              <span className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-[var(--color-ink-4)]">
                Training · Certification
              </span>
            </span>
          </Link>

          {/* Center links */}
          <nav className="hidden lg:flex justify-center gap-0.5">
            {NAV.map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'relative px-4 py-2.5 rounded-full text-[14px] font-medium',
                    'transition-all duration-200',
                    active
                      ? 'text-[var(--color-ink)] bg-[var(--color-bg-alt)]'
                      : 'text-[var(--color-ink-3)] hover:text-[var(--color-ink)]',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/corporate-training"
              className="hidden lg:block text-[13.5px] font-medium text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors duration-200"
            >
              For teams
            </Link>
            <div className="hidden lg:flex">
              <a
                href={PAY_NOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Pay Now
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" />
                </svg>
              </a>
            </div>
            {/* Hamburger — visible below lg, 44×44 tap target */}
            <button
              className="lg:hidden absolute right-[calc(-1*clamp(1.25rem,5vw,3rem))] top-1/2 flex h-11 w-11 -translate-y-1/2 flex-col items-center justify-center gap-1.25 rounded-lg transition-colors duration-200 hover:bg-(--color-bg-alt)"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 w-5 rounded-full bg-(--color-ink) transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-1.75' : ''}`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-(--color-ink) transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-(--color-ink) transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-1.75' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-bg)]"
          >
            <div className="wrap py-4 flex flex-col gap-1">
              {NAV.map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      'flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium',
                      active
                        ? 'bg-[var(--color-bg-alt)] text-[var(--color-ink)]'
                        : 'text-[var(--color-ink-3)]',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-[var(--color-line)] flex gap-2">
                <a
                  href={PAY_NOW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex-1 justify-center"
                >
                  Pay Now
                </a>
                <Link
                  href="/corporate-training"
                  onClick={() => setMobileOpen(false)}
                  className="btn btn-ghost flex-1 justify-center"
                >
                  For teams
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
