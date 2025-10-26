import { NextRequest, NextResponse } from 'next/server'
import { sendNewSubmissionNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, testMessage } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    console.log('🧪 Testing email notification for:', email)
    
    // Test sending email notification
    await sendNewSubmissionNotification(email, 'test-ip')
    
    console.log('✅ Email notification sent successfully')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email notification sent successfully',
      email: email,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Error sending test email:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send email notification',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Email test endpoint',
    instructions: 'Use POST method with email in body to test email notifications',
    example: {
      method: 'POST',
      body: { email: 'test@example.com' }
    }
  })
}
