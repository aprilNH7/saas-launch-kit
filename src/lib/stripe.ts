import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
})

export const PLANS = {
  FREE: {
    name: "Free",
    description: "For individuals and small projects",
    price: { monthly: 0, yearly: 0 },
    stripePriceId: { monthly: null, yearly: null },
    limits: {
      members: 3,
      projects: 5,
      apiCalls: 1_000,
      storage: "500MB",
    },
    features: [
      "Up to 3 team members",
      "5 projects",
      "1,000 API calls/month",
      "500MB storage",
      "Community support",
      "Basic analytics",
    ],
  },
  PRO: {
    name: "Pro",
    description: "For growing teams and businesses",
    price: { monthly: 29, yearly: 290 },
    stripePriceId: {
      monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
      yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID,
    },
    limits: {
      members: 20,
      projects: 50,
      apiCalls: 50_000,
      storage: "10GB",
    },
    features: [
      "Up to 20 team members",
      "50 projects",
      "50,000 API calls/month",
      "10GB storage",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
      "Webhook events",
    ],
  },
  ENTERPRISE: {
    name: "Enterprise",
    description: "For large organizations with advanced needs",
    price: { monthly: 99, yearly: 990 },
    stripePriceId: {
      monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID,
      yearly: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID,
    },
    limits: {
      members: -1, // unlimited
      projects: -1,
      apiCalls: -1,
      storage: "Unlimited",
    },
    features: [
      "Unlimited team members",
      "Unlimited projects",
      "Unlimited API calls",
      "Unlimited storage",
      "24/7 dedicated support",
      "Advanced analytics & reporting",
      "Custom integrations",
      "Webhook events",
      "SSO / SAML",
      "Audit logs",
      "Custom contracts",
      "SLA guarantee",
    ],
  },
} as const

export type PlanKey = keyof typeof PLANS

export async function createCheckoutSession(teamId: string, priceId: string, customerId?: string) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId || undefined,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=true`,
    metadata: { teamId },
  })
  return session
}

export async function createCustomerPortal(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
  })
  return session
}
