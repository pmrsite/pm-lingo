import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { scores } = await req.json()
  return NextResponse.json({
    overallFeedback: 'Assessment feedback placeholder. AI will provide personalised recommendations based on your quiz performance.',
    recommendation: 'Practice mission dialogue aloud 3 times before moving on.',
    scores,
  })
}
