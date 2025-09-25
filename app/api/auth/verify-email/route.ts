import { NextRequest, NextResponse } from 'next/server'
import { verifyEmail } from '@/lib/supabase-auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    
    if (!token) {
      // Redirect to verify page with error
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'}/verify.html?error=missing_token`)
    }
    
    // Verify email
    const user = await verifyEmail(token)
    
    // Redirect to dashboard on success
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'}/dashboard`)
    
  } catch (error) {
    console.error('Email verification error:', error)
    // Redirect to verify page with error
    const errorMessage = error instanceof Error ? error.message : 'Verification failed'
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'}/verify.html?error=${encodeURIComponent(errorMessage)}`)
  }
}
