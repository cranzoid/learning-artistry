'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_PAY_NOW_URL = 'https://rzp.io/l/thelearningartistry';

const NAV = [
  { href: '/', label: 'Home', num: '01' },
  { href: '/courses', label: 'Courses', num: '02' },
  { href: '/about', label: 'About', num: '03' },
  { href: '/corporate-training', label: 'Corporate', num: '04' },
  { href: '/contact', label: 'Contact', num: '05' },
];

function Logomark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="1" y="1" width="30" height="30" rx="6" fill="var(--color-ink)" />
      <path d="M8 22V10" stroke="var(--color-bg)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 22h6" stroke="var(--color-bg)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17 22 22 10l5 12" stroke="var(--color-bg)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.2 18h5.6" stroke="var(--color-bg)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="26.5" cy="5.5" r="1.1" fill="var(--color-accent)" />
    </svg>
  );
}

function formatUtcTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  });
}

function Clock() {
  const [time, setTime] = useState(formatUtcTime);
  useEffect(() => {
    const id = setInterval(() => setTime(formatUtcTime()), 10_000);
    return () => clearInterval(id);
  }, []);
  return <span className="mono text-[var(--color-ink-4)]">{time} UTC</span>;
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
    <>
      {/* Top strip */}
      <div className="border-b border-[var(--color-line)] bg-[var(--color-bg)]">
        <div className="wrap flex items-center justify-between h-8 text-[11px] text-[var(--color-ink-3)]">
          <span className="mono flex items-center gap-2">
            <span className="ticker-dot" />
            Current programs open for enquiries
          </span>
          <span className="mono hidden sm:block text-[var(--color-ink-4)]">
            Professional learning for individuals &amp; teams
          </span>
          <Clock />
        </div>
      </div>

      {/* Main nav */}
      <header
        className={[
          'sticky top-0 z-50 transition-all duration-300',
          'backdrop-blur-[14px]',
          scrolled
            ? 'border-b border-[var(--color-line)] bg-[color-mix(in_oklab,var(--color-bg)_88%,transparent)]'
            : 'border-b border-transparent bg-[color-mix(in_oklab,var(--color-bg)_82%,transparent)]',
        ].join(' ')}
      >
        <div className="wrap">
          <div className="relative grid items-center h-[72px]" style={{ gridTemplateColumns: 'auto 1fr auto' }}>

            {/* Wordmark */}
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <Logomark size={26} />
              <span className="inline-flex items-baseline gap-1.5 leading-none">
                <span className="serif italic text-[17px] text-[var(--color-ink-3)] group-hover:text-[var(--color-ink)] transition-colors duration-200">
                  The
                </span>
                <span
                  className="text-[16px] font-medium tracking-[-0.01em] text-[var(--color-ink)]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Learning Artistry
                </span>
              </span>
            </Link>

            {/* Center links */}
            <nav className="hidden lg:flex justify-center gap-1">
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
                      'relative px-3.5 py-2.5 rounded-full text-[14px] font-medium',
                      'inline-flex items-baseline gap-1.5 transition-all duration-200',
                      active
                        ? 'text-[var(--color-ink)] bg-[var(--color-bg-alt)]'
                        : 'text-[var(--color-ink-3)] hover:text-[var(--color-ink)]',
                    ].join(' ')}
                  >
                    {item.label}
                    <span
                      className={[
                        'mono text-[10px]',
                        active ? 'text-[var(--color-accent)]' : 'text-[var(--color-ink-4)]',
                      ].join(' ')}
                    >
                      {item.num}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-4">
              <Link
                href="/corporate-training"
                className="hidden lg:block text-[14px] text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors duration-200"
              >
                For teams
              </Link>
              <div className="hidden lg:flex">
                <a
                  href={NAV_PAY_NOW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ink"
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
                  className={`block h-px w-5 bg-(--color-ink) transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-1.75' : ''}`}
                />
                <span
                  className={`block h-px w-5 bg-(--color-ink) transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
                />
                <span
                  className={`block h-px w-5 bg-(--color-ink) transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-1.75' : ''}`}
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
                      <span className="mono text-[10px] text-[var(--color-ink-4)]">{item.num}</span>
                    </Link>
                  );
                })}
                <div className="pt-3 mt-2 border-t border-[var(--color-line)] flex gap-2">
                  <a
                    href={NAV_PAY_NOW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ink flex-1 justify-center"
                  >
                    Pay Now
                  </a>
                  <Link href="/corporate-training" className="btn btn-ghost flex-1 justify-center">
                    For teams
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
