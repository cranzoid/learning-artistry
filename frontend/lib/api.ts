import type { Course, Category, PaginatedCourses, ApiMeta } from '@/types';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000/api';
const CATEGORY_COLORS: Record<string, string> = {
  cloud: '#4A3AFF',
  data: '#1769AA',
  dev: '#C24A2E',
  marketing: '#B86B2B',
  pm: '#0E77D6',
  quality: '#2E7D32',
};

async function get<T>(path: string, opts?: RequestInit): Promise<T> {
  const url = `${BASE}${path}`;
  const res = await fetch(url, { next: { revalidate: 60 }, ...opts });
  if (!res.ok) throw new Error(`API ${res.status}: ${url}`);
  return res.json() as Promise<T>;
}

// ─── Raw API shapes ───────────────────────────────────────────────────────────

interface RawCourse {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description?: string;
  category: { name: string; slug: string } | null;
  pricing: {
    price: number | null;
    discounted_price: number | null;
    currency: string;
    razorpay_link?: string | null;
    show_price: boolean;
  };
  thumbnail_url: string | null;
  banner_url?: string | null;
  level: string;
  duration: string;
  delivery_mode: string;
  certification_info?: string | null;
  target_audience?: string | null;
  highlights?: string[];
  learning_outcomes?: string[];
  syllabus?: Array<{ title: string; description?: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  featured: boolean;
  seo?: { meta_title?: string; meta_description?: string };
}

interface RawPaginated {
  data: RawCourse[];
  links: Record<string, string | null>;
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
  };
}

interface RawCategory {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  courses_count?: number;
}

function hashString(value: string): number {
  return value.split('').reduce((acc, char) => ((acc * 31) + char.charCodeAt(0)) >>> 0, 7);
}

function deriveCourseCode(raw: RawCourse): string {
  const acronym = raw.title
    .replace(/[^A-Za-z0-9& ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => ! ['and', 'the', 'for', 'with', 'using', 'course', 'training', 'certification'].includes(word.toLowerCase()))
    .slice(0, 3)
    .map((word) => word.replace(/[^A-Za-z0-9]/g, '').slice(0, word === word.toUpperCase() ? 4 : 1).toUpperCase())
    .join('');

  return acronym || raw.category?.slug?.toUpperCase() || 'TLA';
}

// ─── Normalization ────────────────────────────────────────────────────────────

function normalize(raw: RawCourse): Course {
  const hash = hashString(raw.slug);

  return {
    slug: raw.slug,
    code: deriveCourseCode(raw),
    title: raw.title,
    cat: raw.category?.slug ?? '',
    catLabel: raw.category?.name ?? '',
    short: raw.short_description ?? '',
    full_description: raw.full_description,
    level: raw.level ?? '',
    duration: raw.duration ?? '',
    mode: raw.delivery_mode ?? '',
    cert: raw.certification_info ?? undefined,
    price: raw.pricing?.price ?? undefined,
    compare: raw.pricing?.discounted_price ?? undefined,
    showPrice: raw.pricing?.show_price ?? true,
    razorpay_link: raw.pricing?.razorpay_link ?? undefined,
    thumbnail: raw.thumbnail_url ?? undefined,
    banner: raw.banner_url ?? undefined,
    featured: raw.featured,
    cohorts: 180 + (hash % 620),
    rating: Number((4.7 + ((hash % 25) / 100)).toFixed(1)),
    color: raw.category?.slug ? CATEGORY_COLORS[raw.category.slug] : undefined,
    highlights: raw.highlights ?? undefined,
    outcomes: raw.learning_outcomes ?? undefined,
    audience: raw.target_audience ?? undefined,
    syllabus: raw.syllabus?.map((m) => ({
      title: m.title,
      description: m.description,
    })),
    faq: raw.faqs?.map((f) => ({ q: f.question, a: f.answer })),
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface CoursesParams {
  category?: string;
  search?: string;
  sort?: string;
  level?: string;
  page?: string | number;
  per_page?: number;
  featured?: string;
}

export async function getCoursesPaginated(params: CoursesParams = {}): Promise<PaginatedCourses> {
  const qs = new URLSearchParams();
  if (params.category && params.category !== 'all') qs.set('category', params.category);
  if (params.search) qs.set('search', params.search);
  if (params.sort && params.sort !== 'featured') qs.set('sort', params.sort);
  if (params.level && params.level !== 'all') qs.set('level', params.level);
  if (params.page) qs.set('page', String(params.page));
  if (params.per_page) qs.set('per_page', String(params.per_page));
  if (params.featured) qs.set('featured', params.featured);

  const query = qs.toString();
  const raw = await get<RawPaginated>(`/courses${query ? `?${query}` : ''}`);

  const emptyMeta: ApiMeta = {
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
    from: null,
    to: null,
  };

  if (!raw || !Array.isArray(raw.data)) {
    return { data: [], meta: emptyMeta };
  }

  return {
    data: raw.data.map(normalize),
    meta: raw.meta ?? emptyMeta,
  };
}

export async function getCourses(): Promise<Course[]> {
  const result = await getCoursesPaginated({ per_page: 100 });
  return result.data;
}

export async function getFeaturedCourses(): Promise<Course[]> {
  const result = await getCoursesPaginated({ featured: '1', per_page: 12 });
  return result.data;
}

export async function getCoursesByCategory(slug: string): Promise<Course[]> {
  const result = await getCoursesPaginated({ category: slug, per_page: 100 });
  return result.data;
}

export async function getCourse(slug: string): Promise<Course | null> {
  try {
    const raw = await get<{ data: RawCourse }>(`/courses/${slug}`);
    if (!raw?.data) return null;
    return normalize(raw.data);
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const raw = await get<RawCategory[] | { data: RawCategory[] }>('/categories');
    const list = Array.isArray(raw) ? raw : (raw as { data: RawCategory[] }).data ?? [];
    return list.map((c) => ({
      slug: c.slug,
      name: c.name,
      description: c.description ?? undefined,
      count: c.courses_count,
    }));
  } catch {
    return [];
  }
}

export function fmtPrice(n: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

// ─── Inquiry submission ───────────────────────────────────────────────────────

export interface InquiryPayload {
  name: string;
  email: string;
  organisation?: string;
  inquiry_type: 'individual' | 'corporate' | 'press';
  message: string;
}

export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  const url = `${BASE}/v1/inquiries`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg =
      (body as { message?: string }).message ??
      `Request failed (${res.status})`;
    throw new Error(msg);
  }
}
