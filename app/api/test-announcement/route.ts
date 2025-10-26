import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body
    const clientIP = 'test-ip' // Simplified for testing

    console.log('🧪 Test API - Email submission:', email)

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Simple success response without email notifications
    const signup = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      ip_address: clientIP,
      created_at: new Date().toISOString()
    }

    console.log('✅ Test API - Signup successful:', signup)

    return NextResponse.json({ 
      success: true, 
      data: signup,
      message: 'Test API working - no email notifications'
    })
  } catch (error) {
    console.error('❌ Test API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    )
  }
}
