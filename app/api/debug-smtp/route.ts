import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const envVars = {
    SMTP_HOST: process.env.SMTP_HOST || '❌ Missing',
    SMTP_PORT: process.env.SMTP_PORT || '❌ Missing', 
    SMTP_USER: process.env.SMTP_USER || '❌ Missing',
    SMTP_PASS: process.env.SMTP_PASS ? `✅ Set (${process.env.SMTP_PASS.length} chars)` : '❌ Missing',
    FROM_EMAIL: process.env.FROM_EMAIL || '❌ Missing',
  }

  return NextResponse.json({
    environment: envVars,
    timestamp: new Date().toISOString(),
    platform: process.env.VERCEL ? 'Vercel' : 'Local'
  })
}
