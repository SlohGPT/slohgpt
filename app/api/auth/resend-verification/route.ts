import { NextRequest, NextResponse } from 'next/server'
import { resendVerificationEmail } from '@/lib/supabase-auth'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Resend verification email
    const userData = await resendVerificationEmail(email)
    
    // Send the actual email
    await sendVerificationEmail(
      userData.email,
      userData.verificationToken,
      userData.name
    )

    return NextResponse.json({
      message: 'Verification email sent successfully',
      email: userData.email
    })

  } catch (error: any) {
    console.error('Resend verification error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to resend verification email' },
      { status: 400 }
    )
  }
}
