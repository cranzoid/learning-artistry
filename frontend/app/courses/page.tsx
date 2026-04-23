import { Suspense } from 'react';
import { getCoursesPaginated, getCategories } from '@/lib/api';
import CoursesClient from '@/components/courses/CoursesClient';

export const metadata = {
  title: 'Course Catalog — The Learning Artistry',
  description:
    'Browse our full catalog of certification and professional development programs. Filter by discipline, level, or delivery mode.',
};

interface Props {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: string;
    level?: string;
    page?: string;
    view?: string;
  }>;
}

export default async function CoursesPage({ searchParams }: Props) {
  const sp = await searchParams;
  const category = sp.category ?? 'all';
  const search = sp.search ?? '';
  const requestedSort = sp.sort ?? 'featured';
  const level = sp.level ?? 'all';
  const page = sp.page ?? '1';

  const fetchCourses = (sort: string) =>
    getCoursesPaginated({
      category: category !== 'all' ? category : undefined,
      search: search || undefined,
      level: level !== 'all' ? level : undefined,
      sort: sort !== 'featured' ? sort : undefined,
      page,
      per_page: 18,
    }).catch(() => ({
      data: [],
      meta: { current_page: 1, last_page: 1, per_page: 18, total: 0, from: null, to: null },
    }));

  let sort = requestedSort;

  const [initialCourseResult, categories] = await Promise.all([
    fetchCourses(sort),
    getCategories().catch(() => []),
  ]);

  let { data: courses, meta } = initialCourseResult;

  if (
    ['price-asc', 'price-desc'].includes(sort) &&
    courses.some((course) => !course.showPrice)
  ) {
    sort = 'featured';
    ({ data: courses, meta } = await fetchCourses(sort));
  }

  return (
    <Suspense>
      <CoursesClient
        key={`${category}:${search}:${sort}:${level}:${page}:${sp.view ?? 'grid'}`}
        initialCourses={courses}
        meta={meta}
        categories={categories}
        initialFilters={{ category, search, sort, level, page, view: sp.view ?? 'grid' }}
      />
    </Suspense>
  );
}
