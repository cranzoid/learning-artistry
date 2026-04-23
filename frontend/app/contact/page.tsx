import type { Metadata } from 'next';
import ContactClient from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: 'Contact — The Learning Artistry',
  description:
    'Contact The Learning Artistry for individual enrolments, team training, and general enquiries.',
  openGraph: {
    title: 'Contact — The Learning Artistry',
    description: 'Email, phone, and office details for The Learning Artistry.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
