import { PricingPlan, TeacherPayout } from '@/types'

export const pricingPlans: PricingPlan[] = [
  {
    id: 'trial',
    name: 'Free Trial',
    price: 0,
    period: '14 days',
    description: 'Experience the full program with no commitment.',
    features: [
      'Access to Missions 1–3',
      'AI Tutor (limited)',
      '3 quiz attempts per mission',
      'No credit card required',
    ],
    highlighted: false,
    ctaText: 'Start Free Trial',
  },
  {
    id: 'monthly',
    name: 'Monthly',
    price: 9.99,
    period: 'per month',
    description: 'Full access, cancel anytime.',
    features: [
      'All 50 missions (when released)',
      'Unlimited AI Tutor access',
      'Smart Pinyin Lab',
      'PDF downloads',
      'Progress tracking',
      'Priority support',
    ],
    highlighted: false,
    ctaText: 'Start Monthly',
  },
  {
    id: 'annual',
    name: 'Annual',
    price: 99,
    period: 'per year',
    description: 'Best value. Save over 17% vs monthly.',
    features: [
      'Everything in Monthly',
      '2 free teacher sessions',
      'Certificate of completion',
      'Early access to new missions',
      'Community access',
    ],
    highlighted: true,
    ctaText: 'Start Annual — Best Value',
  },
]

export const payoutTiers: TeacherPayout[] = [
  { tier: 'bronze', sessionsRequired: '0–99 sessions', teacherShare: 60, platformShare: 40 },
  { tier: 'silver', sessionsRequired: '100–199 sessions', teacherShare: 70, platformShare: 30 },
  { tier: 'gold', sessionsRequired: '200–299 sessions', teacherShare: 80, platformShare: 20 },
  { tier: 'platinum', sessionsRequired: '300–499 sessions', teacherShare: 85, platformShare: 15 },
  { tier: 'master', sessionsRequired: '500+ sessions', teacherShare: 90, platformShare: 10 },
]
