import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Test environment variables
    const envCheck = {
      SMTP_HOST: process.env.SMTP_HOST ? '✅ Set' : '❌ Missing',
      SMTP_PORT: process.env.SMTP_PORT ? '✅ Set' : '❌ Missing',
      SMTP_USER: process.env.SMTP_USER ? '✅ Set' : '❌ Missing',
      SMTP_PASS: process.env.SMTP_PASS ? '✅ Set' : '❌ Missing',
      FROM_EMAIL: process.env.FROM_EMAIL ? '✅ Set' : '❌ Missing',
    }

    // Test nodemailer import
    let nodemailerStatus = '❌ Failed'
    try {
      const nodemailer = require('nodemailer')
      nodemailerStatus = '✅ Available'
    } catch (error) {
      nodemailerStatus = `❌ Error: ${error instanceof Error ? error.message : 'Unknown'}`
    }

    return NextResponse.json({
      environment: envCheck,
      nodemailer: nodemailerStatus,
      timestamp: new Date().toISOString(),
      platform: 'Vercel'
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
