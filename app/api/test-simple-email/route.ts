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
    
    // Create transporter with alternative Gmail settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
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
