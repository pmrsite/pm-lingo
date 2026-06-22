import { AITeacher } from '@/types'

export const aiTeachers: AITeacher[] = [
  {
    id: 'mei',
    name: 'Teacher Mei',
    gender: 'female',
    personality: 'Warm, encouraging, and patient. Great for beginners who need confidence.',
    teachingStyle: 'Structured and methodical. Focuses on clear pronunciation and repetition.',
    voiceStyle: 'Soft, clear, standard Mandarin',
    avatarPlaceholder: '/avatars/mei.png',
    speciality: 'Pronunciation & Tones',
  },
  {
    id: 'lin',
    name: 'Teacher Lin',
    gender: 'female',
    personality: 'Energetic and conversational. Makes learning feel like chatting with a friend.',
    teachingStyle: 'Immersive and situational. Loves roleplay and real-life scenarios.',
    voiceStyle: 'Bright, expressive, modern Taipei accent',
    avatarPlaceholder: '/avatars/lin.png',
    speciality: 'Conversational Fluency',
  },
  {
    id: 'jun',
    name: 'Teacher Jun',
    gender: 'male',
    personality: 'Precise and analytical. Perfect for learners who love grammar and structure.',
    teachingStyle: 'Explanation-first. Deep dives into grammar patterns and character structure.',
    voiceStyle: 'Clear, neutral, Beijing standard',
    avatarPlaceholder: '/avatars/jun.png',
    speciality: 'Grammar & Writing',
  },
  {
    id: 'kai',
    name: 'Teacher Kai',
    gender: 'male',
    personality: 'Relaxed and practical. Focuses on what you actually need to survive daily life.',
    teachingStyle: 'Mission-based and goal-oriented. No fluff, just useful Chinese.',
    voiceStyle: 'Casual, friendly, Southern Mandarin tone',
    avatarPlaceholder: '/avatars/kai.png',
    speciality: 'Practical Daily Chinese',
  },
]
