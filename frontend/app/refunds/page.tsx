import type { Metadata } from 'next';
import LegalPageShell from '@/components/legal/LegalPageShell';

export const metadata: Metadata = {
  title: 'Refunds — The Learning Artistry',
  description:
    'Refund, cancellation, and rescheduling policy for programs purchased through The Learning Artistry.',
  openGraph: {
    title: 'Refunds — The Learning Artistry',
    description:
      'Refund, cancellation, and rescheduling policy for programs purchased through The Learning Artistry.',
  },
};

const sections = [
  {
    title: 'General policy',
    paragraphs: [
      'Refund requests should be sent in writing to learning@thelearningartistry.com or support@thelearningartistry.com. Please include the learner name, program name, payment date, and reason for the request.',
      'Refund eligibility may depend on the type of program purchased, the timing of the request, whether access has already been granted, and whether seats or scheduling commitments have already been reserved for you.',
    ],
  },
  {
    title: 'Individual enrolments',
    paragraphs: [
      'If you request cancellation within 7 calendar days of payment and before the program has started, you may request a full refund, less any non-recoverable payment processing charges where applicable.',
      'If you request cancellation after that period but before the program start date, we may offer a credit, transfer to a later cohort, or partial refund depending on the timing and seat commitments.',
    ],
  },
  {
    title: 'After course access or start',
    paragraphs: [
      'Once a live cohort has started, course access has been granted, or materials and scheduling have been meaningfully consumed, refunds are generally not guaranteed.',
      'In some cases we may, at our discretion, offer a transfer, partial credit, or alternative arrangement where there are documented exceptional circumstances.',
    ],
  },
  {
    title: 'Team and corporate engagements',
    paragraphs: [
      'Custom team programs, workshops, and corporate training engagements are usually governed by a separate proposal, invoice, or signed agreement. In those cases, the cancellation and refund terms in that agreement will apply.',
      'If no separate agreement exists, any refund or rescheduling request will be reviewed based on work already scoped, preparation completed, reserved delivery time, and third-party costs already incurred.',
    ],
  },
  {
    title: 'Rescheduling and transfers',
    paragraphs: [
      'Where possible, we will try to help learners move to a later cohort or alternative offering instead of cancelling entirely. Transfers are subject to seat availability and program suitability.',
      'If The Learning Artistry reschedules or cancels a program and a suitable alternative cannot be agreed, we will offer a refund or credit as appropriate for the unused portion of the booking.',
    ],
  },
  {
    title: 'Refund timing',
    paragraphs: [
      'Approved refunds are normally processed back to the original payment method. Timelines may vary depending on the payment provider, bank, or card issuer.',
      'If your payment was processed through Razorpay or another third-party service, settlement timing may also depend on that provider’s refund processing cycle.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'For refund or cancellation support, email learning@thelearningartistry.com or support@thelearningartistry.com.',
      'You can also reach us at +91 9211571166 during business hours IST.',
    ],
  },
];

export default function RefundsPage() {
  return (
    <LegalPageShell
      eyebrow="§ Refunds"
      title="Refunds"
      lead="This page outlines how refund, cancellation, rescheduling, and transfer requests are handled for purchases made through The Learning Artistry."
      effectiveDate="April 22, 2026"
      sections={sections}
    />
  );
}
