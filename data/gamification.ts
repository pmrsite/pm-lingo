import type {
  BadgeDefinition,
  LingoLevel,
  DailyMissionTemplate,
  StreakConfig,
  MasteryConfig,
} from '@/types'

// ── Default mastery thresholds (configurable per-mission in missions.ts) ──────

export const DEFAULT_MASTERY: MasteryConfig = {
  completionRequired: true,
  reviewThreshold: 70,   // % to earn 2nd mastery star
  assessThreshold: 85,   // % to earn 3rd mastery star
}

// ── Badges ────────────────────────────────────────────────────────────────────

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  { id: 'first-hello',      name: 'First Hello',      icon: '👋', description: 'Completed your very first mission.' },
  { id: 'food-explorer',    name: 'Food Explorer',    icon: '🍜', description: 'Completed the Ordering Food mission.' },
  { id: 'city-navigator',   name: 'City Navigator',   icon: '🗺️', description: 'Completed the Finding a Toilet mission.' },
  { id: 'travel-ready',     name: 'Travel Ready',     icon: '✈️', description: 'Completed the Taking a Taxi mission.' },
  { id: 'sharp-ears',       name: 'Sharp Ears',       icon: '👂', description: 'Completed a listening activity.' },
  { id: 'speak-up',         name: 'Speak Up',         icon: '🎤', description: 'Completed a speaking/pronunciation activity.' },
  { id: 'word-collector',   name: 'Word Collector',   icon: '📖', description: 'Studied 50 vocabulary items.' },
  { id: 'perfect-mission',  name: 'Perfect Mission',  icon: '⭐', description: 'Achieved 3-star mastery on any mission.' },
  { id: '3-day-spark',      name: '3-Day Spark',      icon: '🔥', description: 'Maintained a 3-day learning streak.' },
  { id: '7-day-streak',     name: '7-Day Streak',     icon: '🔥🔥', description: 'Maintained a 7-day learning streak.' },
  { id: '30-day-habit',     name: '30-Day Habit',     icon: '🏆', description: 'Maintained a 30-day learning streak.' },
]

// ── Lingo Levels ──────────────────────────────────────────────────────────────
// Game progression levels — NOT official language proficiency ratings.

export const LINGO_LEVELS: LingoLevel[] = [
  { level: 1, name: 'New Explorer',          xpRequired: 0 },
  { level: 2, name: 'First Words',           xpRequired: 200 },
  { level: 3, name: 'Conversation Starter',  xpRequired: 500 },
  { level: 4, name: 'Everyday Explorer',     xpRequired: 1000 },
  { level: 5, name: 'Mandarin Traveller',    xpRequired: 2000 },
  { level: 6, name: 'Confident Communicator', xpRequired: 3500 },
]

export function getLingoLevel(xp: number): LingoLevel {
  let current = LINGO_LEVELS[0]
  for (const lvl of LINGO_LEVELS) {
    if (xp >= lvl.xpRequired) current = lvl
  }
  return current
}

// ── Streak config ─────────────────────────────────────────────────────────────
// A streak increments only when a qualifying learning activity is completed.

export const STREAK_CONFIG: StreakConfig = {
  qualifyingActivities: [
    'lesson-complete',
    'review-complete',
    'assess-complete',
    'listening-complete',
    'speaking-complete',
    'daily-mission-complete',
  ],
}

// ── Daily Mission templates ───────────────────────────────────────────────────

export const DAILY_MISSION_TEMPLATES: DailyMissionTemplate[] = [
  {
    id: 'daily-listen',
    icon: '🎧',
    description: 'Complete one listening activity',
    xpReward: 20,
    qualifyingActivity: 'listening-complete',
  },
  {
    id: 'daily-review',
    icon: '📚',
    description: 'Review one lesson',
    xpReward: 20,
    qualifyingActivity: 'review-complete',
  },
  {
    id: 'daily-section',
    icon: '⭐',
    description: 'Complete one mission section',
    xpReward: 30,
    qualifyingActivity: 'lesson-complete',
  },
]

export const DAILY_COMPLETION_BONUS_XP = 30
