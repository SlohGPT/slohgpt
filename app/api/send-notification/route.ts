import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, ipAddress } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    console.log('📧 Sending notification for:', email)
    
    // Create transporter with working configuration
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

    const timestamp = new Date().toLocaleString('sk-SK', {
      timeZone: 'Europe/Bratislava',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    // Send simple email
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: 'slohgpt@gmail.com',
      subject: `🎉 New Email Submission: ${email}`,
      text: `New email submission: ${email}\n\nIP: ${ipAddress || 'unknown'}\nTime: ${timestamp}`,
      html: `<p>New email submission: <strong>${email}</strong></p><p>IP: ${ipAddress || 'unknown'}</p><p>Time: ${timestamp}</p>`
    })

    console.log('✅ Notification sent:', info.messageId)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Notification sent',
      messageId: info.messageId
    })

  } catch (error) {
    console.error('❌ Error sending notification:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send notification',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
