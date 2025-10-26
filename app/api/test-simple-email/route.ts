import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    console.log('🧪 Testing basic email sending to:', email)
    
    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Send simple test email
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: 'slohgpt@gmail.com',
      subject: 'Test Email from SlohGPT',
      text: `New email submission: ${email}`,
      html: `<p>New email submission: <strong>${email}</strong></p>`
    })

    console.log('✅ Test email sent:', info.messageId)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully',
      messageId: info.messageId,
      email: email
    })

  } catch (error) {
    console.error('❌ Error sending test email:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
