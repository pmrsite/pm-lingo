import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { scenario, userInput } = await req.json()
  return NextResponse.json({
    aiResponse: `[Roleplay — placeholder] Scenario: ${scenario}. User said: "${userInput}". AI roleplay response will appear here.`,
    translation: '[Translation placeholder]',
    feedback: '[Pronunciation feedback placeholder]',
  })
}
