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
    
    // Fetch logo and convert to base64
    let logoBase64 = ''
    try {
      const logoResponse = await fetch('https://res.cloudinary.com/dng0qhxe8/image/upload/v1758658677/logo-slohgpt-white_wrmid9.png')
      const logoBuffer = await logoResponse.arrayBuffer()
      logoBase64 = Buffer.from(logoBuffer).toString('base64')
      console.log('✅ Logo fetched and converted to base64')
    } catch (err) {
      console.log('⚠️ Could not fetch logo, using alt text')
    }
    
    // Get location from IP address
    let location = 'Unknown'
    if (ipAddress && ipAddress !== 'unknown') {
      try {
        const geoResponse = await fetch(`http://ip-api.com/json/${ipAddress}?fields=city,regionName,country`)
        const geoData = await geoResponse.json()
        if (geoData.city) {
          location = `${geoData.city}, ${geoData.regionName}, ${geoData.country}`
        }
      } catch (err) {
        console.log('Could not fetch location for IP')
      }
    }
    
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

    // Beautiful HTML email template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 40px 20px; text-align: center;">
                    <img src="data:image/png;base64,${logoBase64}" alt="SlohGPT" style="max-width: 200px; height: auto; margin-bottom: 15px;" />
                    <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-size: 18px; font-weight: 600;">🎉 New Email Signup!</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; font-weight: 700;">Someone signed up for early access!</h2>
                    
                    <p style="color: #6b7280; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                      A new person has submitted their email for early access to SlohGPT!
                    </p>
                    
                    <!-- Details Card -->
                    <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 10px; padding: 25px; margin: 30px 0;">
                      <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">📧 Submission Details</h3>
                      
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                            <strong style="color: #374151; font-size: 14px; display: block; margin-bottom: 5px;">Email Address:</strong>
                            <span style="color: #8b5cf6; font-size: 15px; font-weight: 600;">${email}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                            <strong style="color: #374151; font-size: 14px; display: block; margin-bottom: 5px;">📍 Location:</strong>
                            <span style="color: #6b7280; font-size: 15px;">${location}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                            <strong style="color: #374151; font-size: 14px; display: block; margin-bottom: 5px;">🌐 IP Address:</strong>
                            <span style="color: #6b7280; font-size: 15px; font-family: monospace;">${ipAddress || 'Unknown'}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0;">
                            <strong style="color: #374151; font-size: 14px; display: block; margin-bottom: 5px;">🕐 Time Submitted:</strong>
                            <span style="color: #6b7280; font-size: 15px;">${timestamp}</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                    
                    <!-- Success Badge -->
                    <div style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%); border-radius: 8px; padding: 15px; margin: 30px 0; text-align: center;">
                      <p style="color: #ffffff; margin: 0; font-size: 15px; font-weight: 600;">
                        ✅ Successfully added to announcement list
                      </p>
                    </div>
                    
                    <!-- Footer -->
                    <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px; text-align: center;">
                      <p style="color: #9ca3af; margin: 0; font-size: 13px;">
                        This person will receive a free sloh when SlohGPT launches!
                      </p>
                      <p style="color: #9ca3af; margin: 10px 0 0 0; font-size: 13px;">
                        SlohGPT Notification System
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `

    // Send beautiful email
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: 'slohgpt@gmail.com',
      subject: `🎉 New Signup: ${email}`,
      text: `New email submission: ${email}\n\nLocation: ${location}\nIP: ${ipAddress || 'unknown'}\nTime: ${timestamp}`,
      html: htmlTemplate
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
