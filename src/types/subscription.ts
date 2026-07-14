export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
export interface Subscription {
  id: string
  status: SubscriptionStatus
  plan: 'FREE' | 'PRO' | 'ENTERPRISE'
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
}
