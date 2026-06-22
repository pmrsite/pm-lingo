import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { missionSlug } = await req.json()
  return NextResponse.json({
    quiz: [{ id: 'mock-1', type: 'multiple-choice', question: `[Generated quiz for ${missionSlug} — placeholder]`, options: ['A', 'B', 'C', 'D'], answer: 'A', explanation: 'Explanation placeholder.' }],
  })
}
