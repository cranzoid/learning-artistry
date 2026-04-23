import Link from 'next/link';
import { getFeaturedCourses } from '@/lib/api';
import { HOME_LEARNING_MODES, HOME_TESTIMONIALS } from '@/lib/home-content';
import { HAS_DIRECT_CHECKOUT, RAZORPAY_CHECKOUT_URL } from '@/lib/site';
import CourseCard from '@/components/ui/CourseCard';
import CourseMood from '@/components/ui/CourseMood';
import SectionHead from '@/components/ui/SectionHead';
import Eyebrow from '@/components/ui/Eyebrow';
import HomeHero from '@/components/home/HomeHero';
import HomeTestimonials from '@/components/home/HomeTestimonials';
import { ArrowIcon, ArrowUpRightIcon } from '@/components/ui/icons';

const CATEGORIES = [
  { key: 'cloud', label: 'Cloud & IT', count: 24, blurb: 'AWS, Azure, GCP, Kubernetes, SRE' },
  { key: 'dev', label: 'Software Development', count: 31, blurb: 'Full-stack, systems, architecture' },
  { key: 'pm', label: 'Project Management', count: 18, blurb: 'PMP, Agile, PRINCE2, Scrum' },
  { key: 'quality', label: 'Quality Management', count: 12, blurb: 'Six Sigma, ISO, Lean' },
  { key: 'data', label: 'Data & AI', count: 22, blurb: 'ML, LLM ops, analytics' },
  { key: 'leadership', label: 'Leadership', count: 9, blurb: 'Executive, product, people' },
];

const CLIENTS = [
  'Cloud teams',
  'Software teams',
  'Project offices',
  'Operations leaders',
  'Quality teams',
  'Data teams',
  'People managers',
  'Career changers',
  'Emerging leaders',
  'Internal academies',
];

const PILLARS = [
  {
    n: 'A.',
    title: 'Practical, not abstract',
    description:
      'Programs are designed to connect directly to the work learners are trying to do next, with examples, exercises, and guidance that stay usable outside the classroom.',
  },
  {
    n: 'B.',
    title: 'Cohorts of twenty, never a hundred',
    description:
      'Small enough that the instructor knows you by the second session. Peer critiques, 1:1 reviews, and a community that outlasts the course.',
  },
  {
    n: 'C.',
    title: 'Curricula rebuilt every season',
    description:
      'Tool versions shift. Exam blueprints update. We rebuild the syllabus each cohort so you learn the version your company actually runs.',
  },
  {
    n: 'D.',
    title: 'Progress that can be reviewed',
    description:
      'We care about whether a program was clear, relevant, and worth building on. Reflection, feedback, and next-step recommendations matter more than inflated vanity metrics.',
  },
];

const CORPORATE_STATS = [
  { value: 'Custom', label: 'Programs shaped to team goals' },
  { value: 'Applied', label: 'Practical learning tied to real work' },
  { value: 'Clear', label: 'Progress checkpoints and follow-up' },
];

export default async function HomePage() {
  const featured = await getFeaturedCourses().catch(
    () => [] as Awaited<ReturnType<typeof getFeaturedCourses>>,
  );

  return (
    <>
      <HomeHero featured={featured} />

      <section className="py-12 border-y border-[var(--color-line)] bg-[var(--color-bg-alt)]">
        <div className="wrap">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span className="eyebrow">Built for</span>
            <span className="mono text-[var(--color-ink-4)]">
              Individuals and teams looking for practical, structured learning
            </span>
          </div>
          <div className="marquee mt-5 py-4">
            <div className="marquee-track">
              {[...CLIENTS, ...CLIENTS].map((client, index) => (
                <span
                  key={`${client}-${index}`}
                  className="serif text-[1.5rem] tracking-[-0.015em] text-[var(--color-ink-3)]"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            index="§ 02"
            eyebrow="Disciplines"
            align="split"
            title="Six disciplines. One standard of craft."
            sub="From cloud foundations to executive leadership. Programs designed to stay practical, current, and useful in day-to-day work."
          />

          <div className="mt-12 grid border-t border-l border-[var(--color-line)] categories-grid">
            {CATEGORIES.map((category, index) => (
              <Link
                key={category.key}
                href={`/courses?category=${category.key}`}
                className="group flex min-h-[220px] flex-col gap-2.5 border-r border-b border-[var(--color-line)] px-7 py-8 transition-colors duration-300 hover:bg-[var(--color-bg-alt)]"
              >
                <div className="mono text-[var(--color-ink-4)]">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="serif text-[1.75rem] leading-[1.05] tracking-[-0.02em]">
                  {category.label}
                </div>
                <div className="max-w-[30ch] text-[14px] text-[var(--color-ink-3)]">
                  {category.blurb}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-[var(--color-line)] pt-5 text-[11px] text-[var(--color-ink-4)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                  <span className="mono">{category.count} programs</span>
                  <ArrowUpRightIcon />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section border-y border-[var(--color-line)] bg-[var(--color-bg-alt)]">
          <div className="wrap">
            <SectionHead
              index="§ 03"
              eyebrow="Featured this season"
              align="split"
              title="The courses shaping this cohort."
              sub="Four flagships, selected for enrolment this season. Live cohorts, limited seats."
              action={
                <Link href="/courses" className="btn-link">
                  View full catalog →
                </Link>
              }
            />

            <div className="mt-12 grid gap-5 featured-grid">
              {featured.slice(0, 4).map((course, index) => (
                <CourseCard key={course.slug} course={course} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <SectionHead
            index="§ 04"
            eyebrow="Why the Studio"
            align="split"
            title="Four things we refuse to compromise."
            sub="These are the operating rules we built the studio around and the things we'd close the studio before breaking."
          />

          <div className="mt-12 border-t border-[var(--color-line)]">
            {PILLARS.map((pillar) => (
              <div key={pillar.n} className="why-row">
                <div className="mono why-row-num">{pillar.n}</div>
                <div className="serif why-row-title">{pillar.title}</div>
                <div className="why-row-body">{pillar.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--color-ink)] text-[var(--color-bg)]">
        <div className="wrap">
          <div className="pb-12 border-b border-white/12">
            <Eyebrow
              index="§ 05"
              label="Modes of learning"
              className="[&_span:last-child]:text-white/50 [&_span:first-child]:text-white/30"
            />
            <h2
              className="h1 mt-6 max-w-[18ch] text-[var(--color-bg)]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              <span className="italic">Three</span> ways in.
              <br />
              One standard.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 modes-grid">
            {HOME_LEARNING_MODES.map((mode) => (
              <div
                key={mode.title}
                className="overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.03] flex flex-col"
              >
                <div className="relative aspect-[16/10] bg-white/5 overflow-hidden">
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      color: 'rgba(255,255,255,0.5)',
                      filter: 'invert(0.92) hue-rotate(180deg)',
                    }}
                  >
                    <CourseMood slug={mode.title} color="var(--color-accent)" kind={mode.mood} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-6">
                  <span className="mono text-white/55" style={{ fontSize: 11 }}>
                    Mode {mode.number}
                  </span>
                  <span className="serif text-[1.75rem] leading-[1.05] tracking-[-0.02em] text-[var(--color-bg)]">
                    {mode.title}
                  </span>
                  <span className="max-w-[36ch] text-[14px] leading-relaxed text-white/60">
                    {mode.description}
                  </span>
                  <span className="mt-auto border-t border-white/10 pt-4 mono uppercase tracking-[0.08em] text-[var(--color-accent)]">
                    {mode.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="corporate-grid">
            <div>
              <Eyebrow index="§ 06" label="For teams" />
              <h2 className="h1 mt-7 max-w-[18ch]">
                Train your bench.
                <br />
                <span className="italic">Measure</span> the delta.
              </h2>
              <p className="lead mt-6 max-w-[52ch]">
                We partner with engineering, ops, and program leaders to build cohort programs
                that ladder into real capability. Curriculum design, baseline assessments,
                360° outcome reporting, under one roof.
              </p>
              <div className="mt-8 flex gap-2.5 flex-wrap">
                <Link href="/corporate-training" className="btn btn-primary btn-lg">
                  Corporate training <ArrowIcon />
                </Link>
                <Link href="/contact" className="btn btn-ghost btn-lg">
                  Book a consultation
                </Link>
              </div>
            </div>

            <div className="corporate-stats">
              {CORPORATE_STATS.map((item) => (
                <div key={item.value}>
                  <div className="serif text-[clamp(3rem,6vw,4.5rem)] leading-[0.9] tracking-[-0.03em]">
                    {item.value}
                  </div>
                  <div className="mono mt-2 text-[var(--color-ink-4)]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section border-y border-[var(--color-line)] bg-[var(--color-bg-alt)]">
        <div className="wrap">
          <SectionHead
            index="§ 07"
            eyebrow="Use cases"
            align="split"
            title="How professionals tend to use these programs."
            sub="A few common learner and team needs the catalog is built to support."
          />
          <HomeTestimonials items={HOME_TESTIMONIALS} />
        </div>
      </section>

      <section
        className="section border-t border-[var(--color-line)] bg-[var(--color-bg-alt)]"
        style={{ paddingBottom: '5rem' }}
      >
        <div className="wrap">
          <div className="final-grid">
            <div>
              <Eyebrow index="§ 08" label="Take a seat" />
              <div className="display mt-6 text-[clamp(3.5rem,8vw,8.75rem)]">
                Explore the
                <br />
                <span className="italic">current catalog.</span>
              </div>
            </div>
            <div className="pb-2">
              <p className="lead">
                Browse current programs, compare formats, and get in touch if you want help
                choosing the right next step for yourself or your team.
              </p>
              <div className="mt-7 flex gap-2.5 flex-wrap">
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
                <Link href="/contact" className="btn btn-ghost btn-lg">
                  Talk to our team
                </Link>
              </div>
              <div className="mt-10 flex flex-col gap-2 border-t border-[var(--color-line)] pt-6 text-[14px] text-[var(--color-ink-3)]">
                <div>
                  <span className="mono mr-3 text-[var(--color-ink-4)]">01</span>
                  Support available for individual and team enquiries
                </div>
                <div>
                  <span className="mono mr-3 text-[var(--color-ink-4)]">02</span>
                  Certification-track details shared program by program
                </div>
                <div>
                  <span className="mono mr-3 text-[var(--color-ink-4)]">03</span>
                  Team training proposals available on request
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
