export interface SyllabusModule {
  title: string;
  description?: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Course {
  slug: string;
  code?: string;
  title: string;
  cat: string;
  catLabel: string;
  short: string;
  level: string;
  duration: string;
  mode: string;
  cert?: string;
  price?: number;
  compare?: number;
  showPrice: boolean;
  cohorts?: number;
  rating?: number;
  color?: string;
  featured?: boolean;
  highlights?: string[];
  outcomes?: string[];
  audience?: string;
  syllabus?: SyllabusModule[];
  faq?: FAQ[];
  razorpay_link?: string;
  thumbnail?: string;
  banner?: string;
  full_description?: string;
}

export interface Category {
  slug: string;
  name: string;
  count?: number;
  description?: string;
}

export interface ApiMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

export interface PaginatedCourses {
  data: Course[];
  meta: ApiMeta;
}
