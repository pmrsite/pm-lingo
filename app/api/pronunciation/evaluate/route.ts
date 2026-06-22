import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({
    score: 72,
    feedback: 'Pronunciation evaluation placeholder. Real AI will analyse tone accuracy and initial/final sounds.',
    toneAccuracy: 68,
    suggestions: ['Focus on the 3rd tone dip', 'The "zh" sound needs more tongue curl'],
  })
}
