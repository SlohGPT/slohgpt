import { NextRequest, NextResponse } from 'next/server'
import { createUser } from '@/lib/supabase-auth'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()
    
    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }
    
    // Validate password length
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }
    
    // Create user
    const { user, verificationToken } = await createUser(email, password, name)
    
    // Send verification email
    await sendVerificationEmail(email, verificationToken, name)
    
    return NextResponse.json({ 
      message: 'User created successfully. Please check your email to verify your account.',
      userId: user.id 
    })
    
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
