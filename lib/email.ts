import nodemailer from 'nodemailer'

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Email verification template
const getVerificationEmailTemplate = (name: string, verificationUrl: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email - SlohGPT</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 800;">SlohGPT</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 16px;">AI-powered writing assistant</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; font-weight: 700;">Welcome to SlohGPT!</h2>
          
          <p style="color: #6b7280; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
            Hi ${name},
          </p>
          
          <p style="color: #6b7280; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
            Thank you for signing up! Please click the button below to verify your email address and complete your account setup.
          </p>
          
          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);">
              Verify Email Address
            </a>
          </div>
          
          <p style="color: #9ca3af; margin: 30px 0 0 0; font-size: 14px; line-height: 1.6;">
            If the button doesn't work, copy and paste this link into your browser:
          </p>
          <p style="color: #8b5cf6; margin: 8px 0 0 0; font-size: 14px; word-break: break-all;">
            ${verificationUrl}
          </p>
          
          <div style="border-top: 1px solid #e5e7eb; margin: 30px 0; padding-top: 20px;">
            <p style="color: #9ca3af; margin: 0 0 8px 0; font-size: 14px;">
              This link will expire in 24 hours for security reasons.
            </p>
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">
              Best regards,<br>The SlohGPT Team
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// Password reset template
const getPasswordResetEmailTemplate = (name: string, resetUrl: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password - SlohGPT</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 800;">SlohGPT</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 16px;">AI-powered writing assistant</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; font-weight: 700;">Reset Your Password</h2>
          
          <p style="color: #6b7280; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
            Hi ${name},
          </p>
          
          <p style="color: #6b7280; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
            You requested to reset your password. Click the button below to set a new password for your SlohGPT account.
          </p>
          
          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);">
              Reset Password
            </a>
          </div>
          
          <p style="color: #9ca3af; margin: 30px 0 0 0; font-size: 14px; line-height: 1.6;">
            If the button doesn't work, copy and paste this link into your browser:
          </p>
          <p style="color: #8b5cf6; margin: 8px 0 0 0; font-size: 14px; word-break: break-all;">
            ${resetUrl}
          </p>
          
          <div style="border-top: 1px solid #e5e7eb; margin: 30px 0; padding-top: 20px;">
            <p style="color: #9ca3af; margin: 0 0 8px 0; font-size: 14px;">
              This link will expire in 24 hours for security reasons.
            </p>
            <p style="color: #9ca3af; margin: 0 0 8px 0; font-size: 14px;">
              If you didn't request this password reset, please ignore this email.
            </p>
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">
              Best regards,<br>The SlohGPT Team
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// Password changed confirmation template
const getPasswordChangedEmailTemplate = (name: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Changed - SlohGPT</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 800;">SlohGPT</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 16px;">AI-powered writing assistant</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; font-weight: 700;">Password Successfully Changed</h2>
          
          <p style="color: #6b7280; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
            Hi ${name},
          </p>
          
          <p style="color: #6b7280; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
            Your password has been successfully changed. Your account is now secure with your new password.
          </p>
          
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 30px 0;">
            <p style="color: #166534; margin: 0; font-size: 16px; font-weight: 600;">
              ✅ Password changed successfully
            </p>
          </div>
          
          <p style="color: #6b7280; margin: 30px 0 0 0; font-size: 16px; line-height: 1.6;">
            If you didn't make this change, please contact our support team immediately.
          </p>
          
          <div style="border-top: 1px solid #e5e7eb; margin: 30px 0; padding-top: 20px;">
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">
              Best regards,<br>The SlohGPT Team
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// Send verification email
export async function sendVerificationEmail(email: string, token: string, name: string) {
  try {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'}/api/auth/verify-email?token=${token}`
  
    const transporter = createTransporter()
    
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Verify Your Email - SlohGPT',
      html: getVerificationEmailTemplate(name, verificationUrl)
    }
    
    await transporter.sendMail(mailOptions)
    console.log('✅ Verification email sent to:', email)
    
  } catch (error) {
    console.error('❌ Failed to send verification email:', error)
    throw new Error('Failed to send verification email')
  }
}

// Send password reset email
export async function sendPasswordResetEmail(email: string, token: string, name: string) {
  try {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password.html?token=${token}`
    
    const transporter = createTransporter()
    
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Reset Your Password - SlohGPT',
      html: getPasswordResetEmailTemplate(name, resetUrl)
    }
    
    await transporter.sendMail(mailOptions)
    console.log('✅ Password reset email sent to:', email)
    
  } catch (error) {
    console.error('❌ Failed to send password reset email:', error)
    throw new Error('Failed to send password reset email')
  }
}

// Send password changed confirmation email
export async function sendPasswordChangedEmail(email: string, name: string) {
  try {
    const transporter = createTransporter()
    
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Password Changed - SlohGPT',
      html: getPasswordChangedEmailTemplate(name)
    }
    
    await transporter.sendMail(mailOptions)
    console.log('✅ Password changed confirmation sent to:', email)
    
  } catch (error) {
    console.error('❌ Failed to send password changed email:', error)
    throw new Error('Failed to send password changed email')
  }
}