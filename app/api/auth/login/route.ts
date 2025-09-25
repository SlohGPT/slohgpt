import { NextRequest, NextResponse } from 'next/server'
import { loginUser } from '@/lib/supabase-auth'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }
    
    // Login user
    const user = await loginUser(email, password)
    
    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'slohgpt_super_secret_jwt_key_2024_secure_random_string_here',
      { expiresIn: '7d' }
    )
    
    // Set cookie
    const response = NextResponse.json({ 
      message: 'Login successful',
      user: { id: user.id, email: user.email, name: user.name }
    })
    
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })
    
    return response
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Login failed' }, { status: 401 })
  }
}
