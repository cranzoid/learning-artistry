import Link from 'next/link';
import Image from 'next/image';
import { getCategories, getFeaturedCourses } from '@/lib/api';
import { HOME_LEARNING_MODES, HOME_TESTIMONIALS } from '@/lib/home-content';
import { HAS_DIRECT_CHECKOUT, RAZORPAY_CHECKOUT_URL } from '@/lib/site';
import CourseCard from '@/components/ui/CourseCard';
import SectionHead from '@/components/ui/SectionHead';
import Eyebrow from '@/components/ui/Eyebrow';
import HomeHero from '@/components/home/HomeHero';
import HomeTestimonials from '@/components/home/HomeTestimonials';
import { CATEGORY_COLORS } from '@/components/ui/CourseMood';
import { ArrowIcon, ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons';

// Flavour line per category slug; falls back to the CMS description.
const CATEGORY_BLURBS: Record<string, string> = {
  cloud: 'AWS, Azure, VMware, IoT, security',
  dev: 'Python, Selenium, Docker, MySQL',
  pm: 'PMP, PMI-ACP, Scrum, SAFe, MSP',
  quality: 'Six Sigma, Lean, process excellence',
  data: 'Big Data, Power BI, AI & deep learning',
  marketing: 'Digital marketing, strategy, growth',
};

const AUDIENCES = [
  'Cloud teams',
  'Software teams',
  'Project offices',
  'Quality teams',
  'Data teams',
  'Career changers',
  'Emerging leaders',
  'Internal academies',
];

const PILLARS = [
  {
    n: 'i.',
    title: 'Practical, not abstract',
    description:
      'Programs connect directly to the work learners are trying to do next — with examples, exercises, and guidance that stay usable long after the final session.',
  },
  {
    n: 'ii.',
    title: 'Cohorts of twenty, never a hundred',
    description:
      'Small enough that the instructor knows you by the second session. Peer critiques, 1:1 reviews, and a community that outlasts the course.',
  },
  {
    n: 'iii.',
    title: 'Curricula rebuilt every season',
    description:
      'Tool versions shift. Exam blueprints update. We rebuild the syllabus each cohort so you learn the version your company actually runs.',
  },
  {
    n: 'iv.',
    title: 'Progress that can be reviewed',
    description:
      'Reflection, feedback, and next-step recommendations matter more than vanity metrics. Every program ends with a clear view of what to build on.',
  },
];

const CORPORATE_STATS = [
  { value: 'Custom', label: 'Programs shaped to team goals' },
  { value: 'Applied', label: 'Practical learning tied to real work' },
  { value: 'Clear', label: 'Progress checkpoints and follow-up' },
];

const CRAFT_PHOTO =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop';
const CORPORATE_PHOTO =
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop';

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedCourses().catch(() => [] as Awaited<ReturnType<typeof getFeaturedCourses>>),
    getCategories().catch(() => [] as Awaited<ReturnType<typeof getCategories>>),
  ]);

  return (
    <>
      <HomeHero featured={featured} />

      {/* Quiet audience band */}
      <section className="band">
        <div className="wrap">
          <div className="band-items">
            {AUDIENCES.map((audience) => (
              <span key={audience} className="band-item">
                {audience}
              </span>
            ))}
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="section">
          <div className="wrap">
            <SectionHead
              eyebrow="Disciplines"
              align="split"
              title={
                <>
                  Every discipline.
                  <br />
                  <span className="italic">One standard of craft.</span>
                </>
              }
              sub="From cloud foundations to process excellence. Programs designed to stay practical, current, and useful in day-to-day work."
            />

            <div className="mt-12 grid gap-5 categories-grid">
              {categories.map((category, index) => {
                const color = CATEGORY_COLORS[category.slug] ?? 'var(--color-accent)';
                return (
                  <Link
                    key={category.slug}
                    href={`/courses?category=${category.slug}`}
                    className="group cat-card"
                  >
                    <div className="cat-card-top">
                      <span className="cat-card-index">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="cat-card-swatch" style={{ background: color }} />
                    </div>
                    <div className="cat-card-title">{category.name}</div>
                    <div className="max-w-[30ch] text-[14px] leading-relaxed text-[var(--color-ink-3)]">
                      {CATEGORY_BLURBS[category.slug] ?? category.description ?? ''}
                    </div>
                    <div
                      className="mt-auto flex items-center justify-between border-t border-[var(--color-line)] pt-4 text-[13px] font-semibold"
                      style={{ color: 'var(--color-ink-4)' }}
                    >
                      <span className="transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                        {category.count !== undefined ? `${category.count} programs` : 'View programs'}
                      </span>
                      <span className="transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent)]">
                        <ArrowUpRightIcon />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="section bg-[var(--color-bg-alt)] border-y border-[var(--color-line)]">
          <div className="wrap">
            <SectionHead
              eyebrow="Featured this season"
              align="split"
              title={
                <>
                  The courses shaping
                  <br />
                  <span className="italic">this cohort.</span>
                </>
              }
              sub="Flagship programs selected for enrolment this season. Live cohorts, limited seats."
              action={
                <Link href="/courses" className="btn-link">
                  View full catalog →
                </Link>
              }
            />

            <div className="mt-12 grid gap-6 featured-grid">
              {featured.slice(0, 3).map((course, index) => (
                <CourseCard key={course.slug} course={course} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Why the Studio"
            align="split"
            title={
              <>
                Four things we refuse
                <br />
                <span className="italic">to compromise.</span>
              </>
            }
            sub="These are the operating rules the studio was built around — the things we'd close the studio before breaking."
          />

          <div className="why-grid mt-14">
            <div className="why-media media-frame">
              <Image
                src={CRAFT_PHOTO}
                alt="Two learners working through a problem together"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              {PILLARS.map((pillar) => (
                <div key={pillar.n} className="why-row">
                  <div className="why-row-num">{pillar.n}</div>
                  <div>
                    <div className="serif why-row-title">{pillar.title}</div>
                    <div className="why-row-body">{pillar.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-deep">
        <div className="wrap">
          <div className="pb-12 border-b border-white/10">
            <Eyebrow label="Modes of learning" className="[&_.eyebrow]:text-[var(--color-gold)]" />
            <h2
              className="h1 mt-6 max-w-[20ch]"
              style={{ color: '#F6F2EA', fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)' }}
            >
              Three ways in.
              <br />
              <span className="italic" style={{ color: 'var(--color-gold)' }}>
                One standard.
              </span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 modes-grid">
            {HOME_LEARNING_MODES.map((mode) => (
              <div key={mode.title} className="mode-card">
                <div className="mode-card-num">{mode.number}</div>
                <span className="mode-card-title">{mode.title}</span>
                <span className="mode-card-body">{mode.description}</span>
                <span className="mode-card-tag">{mode.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="corporate-grid">
            <div>
              <Eyebrow label="For teams" />
              <h2 className="h1 mt-7 max-w-[18ch]">
                Train your bench.
                <br />
                <span className="italic">Measure the delta.</span>
              </h2>
              <p className="lead mt-6 max-w-[52ch]">
                We partner with engineering, ops, and program leaders to build cohort programs
                that ladder into real capability. Curriculum design, baseline assessments,
                and outcome reporting — under one roof.
              </p>
              <div className="mt-8 flex gap-3 flex-wrap">
                <Link href="/corporate-training" className="btn btn-primary btn-lg">
                  Corporate training <ArrowIcon />
                </Link>
                <Link href="/contact" className="btn btn-ghost btn-lg">
                  Book a consultation
                </Link>
              </div>
            </div>

            <div className="corporate-media media-frame">
              <Image
                src={CORPORATE_PHOTO}
                alt="A team reviewing work together in a meeting room"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="corporate-stat-card">
                {CORPORATE_STATS.map((item) => (
                  <div key={item.value} className="corporate-stat">
                    <span className="corporate-stat-v">{item.value}</span>
                    <span className="corporate-stat-l">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-bg-alt)] border-y border-[var(--color-line)]">
        <div className="wrap">
          <SectionHead
            eyebrow="Use cases"
            align="split"
            title={
              <>
                How professionals tend
                <br />
                <span className="italic">to use these programs.</span>
              </>
            }
            sub="A few common learner and team needs the catalog is built to support."
          />
          <HomeTestimonials items={HOME_TESTIMONIALS} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cta-panel">
            <div className="final-grid">
              <div>
                <span className="badge-dark">
                  <span className="ticker-dot" />
                  Take a seat
                </span>
                <div className="display mt-6 text-[clamp(2.75rem,6.5vw,5.75rem)]" style={{ color: '#F6F2EA' }}>
                  Explore the
                  <br />
                  <span className="cta-gold">current catalog.</span>
                </div>
              </div>
              <div className="pb-2">
                <p className="text-[1.0625rem] leading-[1.7]" style={{ color: 'rgba(246,242,234,0.8)' }}>
                  Browse current programs, compare formats, and get in touch if you want help
                  choosing the right next step for yourself or your team.
                </p>
                <div className="mt-7 flex gap-3 flex-wrap">
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
                  <Link href="/contact" className="btn btn-outline-light btn-lg">
                    Talk to our team
                  </Link>
                </div>
                <div
                  className="mt-10 flex flex-col gap-3 border-t pt-6 text-[14px]"
                  style={{ borderColor: 'rgba(246,242,234,0.15)', color: 'rgba(246,242,234,0.78)' }}
                >
                  {[
                    'Support available for individual and team enquiries',
                    'Certification-track details shared program by program',
                    'Team training proposals available on request',
                  ].map((line) => (
                    <div key={line} className="flex items-start gap-2.5">
                      <span className="mt-0.5 shrink-0" style={{ color: 'var(--color-gold)' }}>
                        <CheckIcon size={14} />
                      </span>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
