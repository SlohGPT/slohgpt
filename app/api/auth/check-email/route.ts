import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/supabase-auth'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }
    
    const user = await getUserByEmail(email)
    
    if (user) {
      return NextResponse.json({ 
        exists: true, 
        message: 'Email found. Please enter your password.' 
      })
    } else {
      return NextResponse.json({ 
        exists: false, 
        message: 'Email not found. Please create an account first.' 
      })
    }
  } catch (error) {
    console.error('Check email error:', error)
    return NextResponse.json({ error: 'Failed to check email' }, { status: 500 })
  }
}
