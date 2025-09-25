import { NextRequest, NextResponse } from 'next/server'
import { requestPasswordReset } from '@/lib/supabase-auth'
import { sendPasswordResetEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    // Validate input
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    
    // Request password reset
    const { user, resetToken } = await requestPasswordReset(email)
    
    // Send password reset email
    await sendPasswordResetEmail(user.email, resetToken, user.name)
    
    return NextResponse.json({ 
      message: 'Password reset email sent successfully'
    })
    
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to send reset email' 
    }, { status: 400 })
  }
}
