import { NextRequest, NextResponse } from 'next/server'
import { resetPasswordWithToken } from '@/lib/supabase-auth'
import { sendPasswordChangedEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()
    
    // Validate input
    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password are required' }, { status: 400 })
    }
    
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }
    
    // Reset password
    const user = await resetPasswordWithToken(token, password)
    
    // Send password changed confirmation email
    try {
      await sendPasswordChangedEmail(user.email, user.name || 'User')
    } catch (emailError) {
      console.error('Failed to send password changed email:', emailError)
      // Don't fail the request if email fails
    }
    
    return NextResponse.json({ 
      message: 'Password reset successfully',
      user: { id: user.id, email: user.email }
    })
    
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to reset password' 
    }, { status: 400 })
  }
}
