import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { message } = await req.json()
  return NextResponse.json({
    response: `[AI Tutor — placeholder] You said: "${message}". In a real integration, your AI teacher would respond here with personalised Chinese coaching.`,
    timestamp: new Date().toISOString(),
  })
}
