export interface HomeTestimonial {
  quote: string;
  name: string;
  role: string;
  org: string;
  metric: string;
}

export interface LearningMode {
  number: string;
  title: string;
  description: string;
  tag: string;
  mood: 'grid' | 'rings' | 'bars';
}

export const HOME_TESTIMONIALS: HomeTestimonial[] = [
  {
    quote:
      'Structured support for professionals who want certification preparation that stays connected to real work, not just exam technique.',
    name: 'Certification prep',
    role: 'Individual learners',
    org: 'Typical use case',
    metric: 'Exam readiness + applied practice',
  },
  {
    quote:
      'Useful for teams that need a common baseline, shared language, and guided practice before a larger capability shift.',
    name: 'Team enablement',
    role: 'Managers and sponsors',
    org: 'Typical use case',
    metric: 'Shared baseline + aligned delivery',
  },
  {
    quote:
      'A practical option for professionals moving into new responsibilities and looking for more structure, accountability, and confidence.',
    name: 'Role transitions',
    role: 'Working professionals',
    org: 'Typical use case',
    metric: 'Confidence + structured progression',
  },
  {
    quote:
      'Best suited to learners and teams who want training to end with clear next steps, not a stack of slides and a forgotten recording.',
    name: 'Applied follow-through',
    role: 'Individuals and teams',
    org: 'Typical use case',
    metric: 'Practical next steps',
  },
];

export const HOME_LEARNING_MODES: LearningMode[] = [
  {
    number: '01',
    title: 'Live cohort',
    description:
      'Instructor-led sessions, twice weekly. Community, office hours, live labs. 20-seat cap.',
    tag: 'Most popular',
    mood: 'grid',
  },
  {
    number: '02',
    title: 'Self-paced',
    description:
      'The full cohort recording plus graded exercises. Move at the speed your life allows.',
    tag: 'Flexible',
    mood: 'bars',
  },
  {
    number: '03',
    title: 'Blended',
    description:
      'Six weekends of live, plus asynchronous work between. The format most teams choose.',
    tag: 'Teams prefer',
    mood: 'rings',
  },
];
