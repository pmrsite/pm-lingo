export type UserRole = 'student' | 'teacher' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
}

export interface StudentProfile {
  userId: string
  level: 'beginner' | 'elementary' | 'intermediate'
  primaryTeacherId: string | null
  secondaryTeacherId: string | null
  completedMissions: string[]
  totalXp: number
}

export interface TeacherProfile {
  userId: string
  bio: string
  completedSessions: number
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'master'
  teacherShare: number
  rating: number
  totalEarnings: number
}

export interface AITeacher {
  id: string
  name: string
  gender: 'female' | 'male'
  personality: string
  teachingStyle: string
  voiceStyle: string
  avatarPlaceholder: string
  speciality: string
}

export interface VocabItem {
  chinese: string
  pinyin: string
  english: string
  audioPlaceholder?: string
  slowAudioPlaceholder?: string
}

export interface DialogueLine {
  speaker: string
  chinese: string
  pinyin: string
  english: string
}

export interface QuizQuestion {
  id: string
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'sentence-order'
  question: string
  options?: string[]
  answer: string | string[]
  explanation: string
}

export interface RegionalNote {
  region: 'mainland' | 'taiwan' | 'malaysia' | 'international'
  note: string
}

export interface AssessmentCriteria {
  vocabularyScore: number
  listeningScore: number
  grammarScore: number
  speakingConfidenceScore: number
  overallScore: number
  aiFeedbackPlaceholder: string
  recommendation: string
}

export interface Mission {
  id: string
  slug: string
  number: number
  title: string
  subtitle: string
  objective: string
  imagePlaceholder: string
  vocabulary: VocabItem[]
  dialogue: DialogueLine[]
  grammarNotes: string[]
  regionalNotes: RegionalNote[]
  quiz: QuizQuestion[]
  assessment: AssessmentCriteria
  pdfPlaceholder: string
  estimatedMinutes: number
  xpReward: number
}

export interface Course {
  id: string
  slug: string
  title: string
  description: string
  totalMissions: number
  currentMissions: number
  level: string
  language: string
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  period: string
  description: string
  features: string[]
  highlighted: boolean
  ctaText: string
}

export interface Booking {
  id: string
  studentId: string
  teacherId: string
  date: string
  time: string
  duration: 30 | 60 | 90
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  zoomLinkPlaceholder: string
}

export interface TeacherPayout {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'master'
  sessionsRequired: string
  teacherShare: number
  platformShare: number
}
