export const DIRECT_CHECKOUT_URL = process.env.NEXT_PUBLIC_RAZORPAY_URL ?? null;

export const HAS_DIRECT_CHECKOUT = Boolean(DIRECT_CHECKOUT_URL);

export const RAZORPAY_CHECKOUT_URL = DIRECT_CHECKOUT_URL ?? '/contact';
