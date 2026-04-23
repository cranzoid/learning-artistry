import type { Metadata } from 'next';
import LegalPageShell from '@/components/legal/LegalPageShell';

export const metadata: Metadata = {
  title: 'Terms & Conditions — The Learning Artistry',
  description:
    'Terms and conditions for using The Learning Artistry website, services, and enrolment processes.',
  openGraph: {
    title: 'Terms & Conditions — The Learning Artistry',
    description:
      'Terms and conditions for using The Learning Artistry website, services, and enrolment processes.',
  },
};

const sections = [
  {
    title: 'Acceptance of terms',
    paragraphs: [
      'These Terms & Conditions govern your access to thelearningartistry.com and any courses, enquiries, payments, or related services offered by The Learning Artistry.',
      'By using the website, submitting an enquiry, or purchasing a program, you agree to these terms. If you do not agree, please do not use the website or proceed with an enrolment.',
    ],
  },
  {
    title: 'Services and enrolments',
    paragraphs: [
      'The Learning Artistry provides professional training, certification preparation, and related learning services for individuals and teams. Program details, schedules, pricing, and availability may change from time to time.',
      'An enrolment is confirmed only after payment is received or, for team engagements, after written confirmation is provided by both parties. We may decline or defer enrolments where program capacity, payment status, or suitability requirements are not met.',
    ],
  },
  {
    title: 'Payments',
    paragraphs: [
      'Payments made through the website may be processed through third-party payment partners, including Razorpay. By making a payment, you also agree to the applicable terms and processing policies of that payment provider.',
      'You are responsible for ensuring that the billing details you provide are accurate and that you are authorised to use the selected payment method.',
    ],
  },
  {
    title: 'Use of course materials',
    paragraphs: [
      'All website content, course materials, worksheets, videos, slides, and related resources remain the intellectual property of The Learning Artistry unless stated otherwise.',
      'You may use materials provided to you for your own personal or internal team learning purposes. You may not reproduce, resell, share publicly, modify for redistribution, or publish them without prior written permission.',
    ],
  },
  {
    title: 'Website and learner conduct',
    paragraphs: [
      'You agree not to misuse the website, interfere with its operation, attempt unauthorised access, or submit false, abusive, or unlawful content through the forms or course environments.',
      'We may suspend access to a user, learner, or organisation where behaviour is disruptive, abusive, fraudulent, or materially inconsistent with safe and professional participation.',
    ],
  },
  {
    title: 'Cancellations and refunds',
    paragraphs: [
      'Refunds, cancellations, and rescheduling requests are handled in line with the Refunds page published on this website. That page forms part of these terms.',
      'Where a custom team engagement is governed by a separate signed proposal, statement of work, or commercial agreement, that agreement will take precedence over these website terms for that engagement.',
    ],
  },
  {
    title: 'Disclaimers and liability',
    paragraphs: [
      'We work to keep the website accurate and current, but we do not guarantee that every page, schedule, or program detail will always be complete, error-free, or continuously available.',
      'To the fullest extent permitted by applicable law, The Learning Artistry is not liable for indirect, incidental, or consequential loss arising from use of the website or services. Nothing in these terms excludes liability where it cannot legally be excluded.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'Questions about these Terms & Conditions can be sent to learning@thelearningartistry.com or support@thelearningartistry.com.',
      'Our primary office address is WeWork, Blue 1 Square, 246, Phase IV, Udyog Vihar, Sector 18, Gurugram, Haryana 122015.',
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPageShell
      eyebrow="§ Terms"
      title="Terms & Conditions"
      lead="These terms explain how the website, enquiries, purchases, and learning services of The Learning Artistry are intended to work."
      effectiveDate="April 22, 2026"
      sections={sections}
    />
  );
}
