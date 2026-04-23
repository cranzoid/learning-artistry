'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Course, Category, ApiMeta } from '@/types';
import CourseCard from '@/components/ui/CourseCard';
import { SearchIcon, ArrowIcon } from '@/components/ui/icons';

interface Filters {
  category: string;
  search: string;
  sort: string;
  level: string;
  page: string;
  view: string;
}

interface Props {
  initialCourses: Course[];
  meta: ApiMeta;
  categories: Category[];
  initialFilters: Filters;
}

const LEVELS = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Executive'];
const SORTS = [
  { value: 'featured', label: 'Featured first' },
  { value: 'price-asc', label: 'Price: low → high' },
  { value: 'price-desc', label: 'Price: high → low' },
];

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <rect x="1" y="1" width="5" height="5" fill="currentColor" rx="1" />
      <rect x="8" y="1" width="5" height="5" fill="currentColor" rx="1" />
      <rect x="1" y="8" width="5" height="5" fill="currentColor" rx="1" />
      <rect x="8" y="8" width="5" height="5" fill="currentColor" rx="1" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <rect x="1" y="2" width="12" height="1.5" fill="currentColor" rx="0.75" />
      <rect x="1" y="6.25" width="12" height="1.5" fill="currentColor" rx="0.75" />
      <rect x="1" y="10.5" width="12" height="1.5" fill="currentColor" rx="0.75" />
    </svg>
  );
}

export default function CoursesClient({
  initialCourses,
  meta,
  categories,
  initialFilters,
}: Props) {
  const [searchInput, setSearchInput] = useState(initialFilters.search);
  const pathname = '/courses';
  const { category, sort, level, view } = initialFilters;
  const allCount = meta.total;
  const hasEnquiryOnlyCourses = initialCourses.some((course) => !course.showPrice);
  const availableSorts = hasEnquiryOnlyCourses
    ? SORTS.filter((entry) => entry.value === 'featured')
    : SORTS;

  const buildHref = useMemo(() => {
    return (updates: Partial<Filters>) => {
      const merged = { ...initialFilters, ...updates };
      const shouldResetPage =
        updates.page === undefined &&
        ('category' in updates || 'search' in updates || 'sort' in updates || 'level' in updates);

      if (shouldResetPage) {
        merged.page = '1';
      }

      const params = new URLSearchParams();

      if (merged.category !== 'all') params.set('category', merged.category);
      if (merged.search.trim()) params.set('search', merged.search.trim());
      if (merged.sort !== 'featured') params.set('sort', merged.sort);
      if (merged.level !== 'all') params.set('level', merged.level);
      if (merged.page !== '1') params.set('page', merged.page);
      if (merged.view !== 'grid') params.set('view', merged.view);

      const query = params.toString();

      return `${pathname}${query ? `?${query}` : ''}`;
    };
  }, [initialFilters]);

  return (
    <div>
      <section
        style={{
          paddingBlock: 'clamp(3rem, 6vw, 5rem) clamp(2.5rem, 4vw, 4rem)',
          borderBottom: '1px solid var(--color-line)',
        }}
      >
        <div className="wrap">
          <div
            style={{
              display: 'flex',
              gap: 20,
              paddingBottom: 20,
              borderBottom: '1px solid var(--color-line)',
              fontSize: 11,
            }}
          >
            <span className="mono text-[var(--color-ink-4)]">§ Catalog</span>
            <span className="mono text-[var(--color-ink-5)]">Spring · 2026</span>
            {allCount > 0 && (
              <span className="mono text-[var(--color-ink-5)]">{allCount} programs</span>
            )}
          </div>

          <h1
            className="serif"
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: '-0.035em',
              marginTop: 32,
              maxWidth: '20ch',
            }}
          >
            The catalog.
            <br />
            <span className="italic">Choose your craft.</span>
          </h1>
          <p className="lead" style={{ marginTop: 20, maxWidth: '54ch' }}>
            Every course listed is enrolling. Filter by discipline, level or mode —
            or type what you&apos;re trying to learn.
          </p>
        </div>
      </section>

      <div
        style={{
          position: 'sticky',
          top: 68,
          zIndex: 20,
          background: 'color-mix(in oklab, var(--color-bg) 94%, transparent)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-line)',
          paddingBlock: 18,
        }}
      >
        <div className="wrap">
          <form action={pathname} method="get" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {category !== 'all' && <input type="hidden" name="category" value={category} />}
            {view !== 'grid' && <input type="hidden" name="view" value={view} />}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-line)',
                borderRadius: 12,
                color: 'var(--color-ink-4)',
              }}
            >
              <SearchIcon size={15} />
              <input
                name="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder='Try "kubernetes", "PMP exam prep", or "LLM"…'
                style={{
                  flex: 1,
                  border: 0,
                  background: 'transparent',
                  outline: 'none',
                  fontSize: 14,
                  color: 'var(--color-ink)',
                }}
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  className="mono"
                  style={{ fontSize: 11, color: 'var(--color-ink-4)' }}
                >
                  clear
                </button>
              )}
              <button type="submit" className="btn btn-ghost" style={{ paddingInline: 14 }}>
                Search
              </button>
              <span className="mono" style={{ fontSize: 10, color: 'var(--color-ink-5)' }}>
                {allCount} result{allCount === 1 ? '' : 's'}
              </span>
            </div>

            {categories.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  overflowX: 'auto',
                  paddingBottom: 4,
                  scrollbarWidth: 'none',
                }}
              >
                <CategoryChip href={buildHref({ category: 'all' })} label="All" count={allCount} active={category === 'all'} />
                {categories.map((c) => (
                  <CategoryChip
                    key={c.slug}
                    href={buildHref({ category: c.slug })}
                    label={c.name}
                    count={c.count}
                    active={category === c.slug}
                  />
                ))}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                flexWrap: 'wrap',
              }}
            >
              <ToolSelect
                label="Level"
                name="level"
                value={level}
                options={LEVELS.map((entry) => ({
                  value: entry === 'all' ? '' : entry,
                  label: entry === 'all' ? 'All levels' : entry,
                }))}
              />
              <ToolSelect
                label="Sort"
                name="sort"
                value={sort === 'featured' ? '' : sort}
                options={availableSorts.map((entry) => ({
                  value: entry.value === 'featured' ? '' : entry.value,
                  label: entry.label,
                }))}
              />
              {hasEnquiryOnlyCourses && (
                <span className="mono" style={{ fontSize: 10, color: 'var(--color-ink-5)' }}>
                  Price sorting is hidden while enquiry-only courses are in this result set.
                </span>
              )}
              <button type="submit" className="btn btn-ghost">
                Apply filters
              </button>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 0 }}>
                <ViewToggle href={buildHref({ view: 'grid' })} active={view === 'grid'} label="Grid view">
                  <GridIcon />
                </ViewToggle>
                <ViewToggle href={buildHref({ view: 'list' })} active={view === 'list'} label="List view">
                  <ListIcon />
                </ViewToggle>
              </div>
            </div>
          </form>
        </div>
      </div>

      <section style={{ paddingBlock: 'clamp(3rem, 5vw, 4.5rem)' }}>
        <div className="wrap">
          {initialCourses.length === 0 ? (
            <div
              style={{
                padding: '80px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                alignItems: 'flex-start',
              }}
            >
              <div
                className="serif"
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.02em' }}
              >
                No matches — yet.
              </div>
              <p className="lead">
                Try broadening your filters, or{' '}
                <Link className="btn-link" href={pathname}>
                  reset everything
                </Link>
                .
              </p>
            </div>
          ) : view === 'list' ? (
            <div style={{ borderBottom: '1px solid var(--color-line)' }}>
              {initialCourses.map((course, index) => (
                <CourseCard key={course.slug} course={course} variant="list" index={index} />
              ))}
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 20,
              }}
            >
              {initialCourses.map((course, index) => (
                <CourseCard key={course.slug} course={course} index={index} />
              ))}
            </div>
          )}

          {meta.last_page > 1 && (
            <Pagination meta={meta} buildHref={buildHref} />
          )}
        </div>
      </section>

      <section
        style={{
          paddingBlock: 'clamp(3rem, 5vw, 5rem)',
          borderTop: '1px solid var(--color-line)',
          background: 'var(--color-bg-alt)',
        }}
      >
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) minmax(0,auto)',
              gap: 48,
              alignItems: 'center',
            }}
          >
            <div>
              <div
                className="serif"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  fontWeight: 400,
                  lineHeight: 0.96,
                  letterSpacing: '-0.03em',
                }}
              >
                Can&apos;t find what<br />
                <span className="italic">you&apos;re looking for?</span>
              </div>
              <p className="lead" style={{ marginTop: 20, maxWidth: '44ch' }}>
                Our advisors help professionals find the right program. No pressure — just a conversation.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link href="/contact" className="btn btn-primary btn-lg">
                Talk to an advisor <ArrowIcon />
              </Link>
              <Link href="/corporate-training" className="btn btn-ghost btn-lg">
                Corporate programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryChip({
  href,
  label,
  count,
  active,
}: {
  href: string;
  label: string;
  count?: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        gap: 8,
        alignItems: 'center',
        padding: '7px 14px',
        border: `1px solid ${active ? 'var(--color-ink)' : 'var(--color-line)'}`,
        borderRadius: 999,
        fontSize: 13,
        color: active ? 'var(--color-bg)' : 'var(--color-ink-3)',
        background: active ? 'var(--color-ink)' : 'var(--color-surface)',
        whiteSpace: 'nowrap',
        transition: 'all .2s',
      }}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className="mono"
          style={{
            fontSize: 10,
            color: active ? 'var(--color-accent)' : 'var(--color-ink-5)',
          }}
        >
          {count}
        </span>
      )}
    </Link>
  );
}

function ToolSelect({
  label,
  name,
  value,
  options,
}: {
  label: string;
  name: string;
  value: string;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
      <span className="mono" style={{ color: 'var(--color-ink-4)', fontSize: 11 }}>
        {label}
      </span>
      <select
        name={name}
        defaultValue={value}
        style={{
          padding: '7px 12px',
          border: '1px solid var(--color-line)',
          borderRadius: 8,
          background: 'var(--color-surface)',
          fontSize: 13,
          color: 'var(--color-ink)',
          cursor: 'pointer',
        }}
      >
        {options.map((option) => (
          <option key={`${name}-${option.value || 'default'}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ViewToggle({
  href,
  active,
  label,
  children,
}: {
  href: string;
  active: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 10px',
        border: '1px solid var(--color-line)',
        background: active ? 'var(--color-ink)' : 'transparent',
        color: active ? 'var(--color-bg)' : 'var(--color-ink-4)',
        transition: 'all .15s',
        borderRadius: 8,
        marginLeft: -1,
      }}
    >
      {children}
    </Link>
  );
}

function Pagination({
  meta,
  buildHref,
}: {
  meta: ApiMeta;
  buildHref: (updates: Partial<Filters>) => string;
}) {
  const pages = Array.from({ length: meta.last_page }, (_, i) => i + 1);
  const visible = pages.filter(
    (page) =>
      page === 1 ||
      page === meta.last_page ||
      Math.abs(page - meta.current_page) <= 1
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 48,
        paddingTop: 24,
        borderTop: '1px solid var(--color-line)',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      <span className="mono" style={{ fontSize: 11, color: 'var(--color-ink-4)' }}>
        {meta.from}–{meta.to} of {meta.total} programs
      </span>
      <div style={{ display: 'flex', gap: 6 }}>
        <PaginationBtn href={buildHref({ page: String(meta.current_page - 1) })} disabled={meta.current_page === 1}>
          ←
        </PaginationBtn>
        {visible.map((page, index) => {
          const previous = visible[index - 1];

          return (
            <React.Fragment key={page}>
              {previous && page - previous > 1 && (
                <span
                  style={{ padding: '6px 4px', color: 'var(--color-ink-5)', fontSize: 13 }}
                >
                  …
                </span>
              )}
              <PaginationBtn href={buildHref({ page: String(page) })} active={page === meta.current_page}>
                {page}
              </PaginationBtn>
            </React.Fragment>
          );
        })}
        <PaginationBtn href={buildHref({ page: String(meta.current_page + 1) })} disabled={meta.current_page === meta.last_page}>
          →
        </PaginationBtn>
      </div>
    </div>
  );
}

function PaginationBtn({
  href,
  children,
  active,
  disabled,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}) {
  const sharedStyles = {
    minWidth: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--color-line)',
    borderRadius: 8,
    fontSize: 13,
    transition: 'all .15s',
  } as const;

  if (disabled) {
    return (
      <span
        className="mono"
        aria-disabled="true"
        style={{
          ...sharedStyles,
          color: 'var(--color-ink-5)',
          opacity: 0.4,
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="mono"
      style={{
        ...sharedStyles,
        background: active ? 'var(--color-ink)' : 'transparent',
        color: active ? 'var(--color-bg)' : 'var(--color-ink-3)',
      }}
    >
      {children}
    </Link>
  );
}
