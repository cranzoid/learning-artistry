import type { Metadata } from 'next';
import LegalPageShell from '@/components/legal/LegalPageShell';

export const metadata: Metadata = {
  title: 'Privacy Policy — The Learning Artistry',
  description:
    'Privacy policy for The Learning Artistry covering personal information, enquiries, payments, and communications.',
  openGraph: {
    title: 'Privacy Policy — The Learning Artistry',
    description:
      'Privacy policy for The Learning Artistry covering personal information, enquiries, payments, and communications.',
  },
};

const sections = [
  {
    title: 'Information we collect',
    paragraphs: [
      'We may collect information you provide directly to us, including your name, email address, phone number, organisation name, enquiry details, and any message or course-related information you submit through the website.',
      'We may also receive payment-related information through our payment partners and limited technical information such as browser, device, and usage data that helps us operate and improve the website.',
    ],
  },
  {
    title: 'How we use information',
    paragraphs: [
      'We use personal information to respond to enquiries, manage enrolments, deliver programs, send service-related communications, process payments, and provide learner or customer support.',
      'We may also use information to improve the website, understand demand for programs, maintain security, and send relevant updates where you have requested or reasonably expect those communications.',
    ],
  },
  {
    title: 'Sharing and third parties',
    paragraphs: [
      'We do not sell personal information. We may share information with service providers who support website hosting, communication, payment processing, or operational delivery where that sharing is necessary to provide the service.',
      'Payment transactions may be processed by third-party partners such as Razorpay. Those providers handle payment information under their own privacy and compliance obligations.',
    ],
  },
  {
    title: 'Retention and security',
    paragraphs: [
      'We keep personal information only for as long as it is reasonably required for operational, contractual, support, accounting, or legal purposes.',
      'We use reasonable administrative and technical measures to protect the information we hold. No online transmission or storage method can be guaranteed to be completely secure.',
    ],
  },
  {
    title: 'Your choices',
    paragraphs: [
      'You may contact us to request access to, correction of, or deletion of personal information we hold about you, subject to any legal, operational, or contractual requirements that allow or require us to retain certain records.',
      'If you no longer want to receive non-essential communications, you can contact us and ask to be removed from those updates.',
    ],
  },
  {
    title: 'Cookies and analytics',
    paragraphs: [
      'The website may use cookies or similar technologies that help with website functionality, performance monitoring, and understanding how visitors use the site.',
      'You can manage cookie settings through your browser, although disabling certain cookies may affect how parts of the website function.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'For privacy-related questions or requests, contact learning@thelearningartistry.com or support@thelearningartistry.com.',
      'Our primary office address is WeWork, Blue 1 Square, 246, Phase IV, Udyog Vihar, Sector 18, Gurugram, Haryana 122015.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      eyebrow="§ Privacy"
      title="Privacy Policy"
      lead="This page explains what information The Learning Artistry may collect, how it is used, and how you can contact us about privacy-related questions."
      effectiveDate="April 22, 2026"
      sections={sections}
    />
  );
}
