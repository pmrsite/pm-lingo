import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { missionSlug } = await req.json()
  return NextResponse.json({
    downloadUrl: `/pdfs/mission-${missionSlug}.pdf`,
    message: 'PDF generation placeholder. In production, this will generate a PDF with vocabulary, dialogue, grammar notes, and quiz review.',
  })
}
