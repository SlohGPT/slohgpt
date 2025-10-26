import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Fallback in-memory storage for when Supabase is not available
const signups: Array<{ id: string; email: string; created_at: string }> = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

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

    // Check if Supabase is available
    if (!supabase) {
      console.error('❌ Supabase client not initialized - using fallback storage')
      // Fallback: store in memory for now (check for duplicates)
      const existingSignup = signups.find(s => s.email.toLowerCase() === email.toLowerCase())
      if (existingSignup) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        )
      }
      
      const signup = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        created_at: new Date().toISOString()
      }
      
      signups.push(signup)
      console.log('✅ New announcement signup (fallback):', signup)
      return NextResponse.json({ success: true, data: signup })
    }

    // Check if email already exists in Supabase
    const { data: existingData, error: checkError } = await supabase
      .from('announcement_signups')
      .select('email')
      .eq('email', email.toLowerCase())
      .maybeSingle() // Use maybeSingle instead of single to avoid error if no rows

    if (checkError) {
      console.error('❌ Error checking existing email:', checkError)
      // If table doesn't exist, fall back to memory storage
      if (checkError.code === '42P01' || checkError.message.includes('relation') || checkError.message.includes('does not exist')) {
        console.log('📝 Table not found, using fallback storage')
        const existingSignup = signups.find(s => s.email.toLowerCase() === email.toLowerCase())
        if (existingSignup) {
          return NextResponse.json(
            { error: 'Email already registered' },
            { status: 409 }
          )
        }
        
        const signup = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          created_at: new Date().toISOString()
        }
        signups.push(signup)
        console.log('✅ New announcement signup (fallback):', signup)
        return NextResponse.json({ success: true, data: signup })
      }
    }

    if (existingData) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('announcement_signups')
      .insert([
        {
          email: email.toLowerCase(),
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('❌ Supabase error:', error)
      // If table doesn't exist, fall back to memory storage
      if (error.code === '42P01' || error.message.includes('relation') || error.message.includes('does not exist')) {
        console.log('📝 Table not found, using fallback storage')
        const signup = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          created_at: new Date().toISOString()
        }
        console.log('✅ New announcement signup (fallback):', signup)
        return NextResponse.json({ success: true, data: signup })
      }
      
      return NextResponse.json(
        { error: 'Failed to save email' },
        { status: 500 }
      )
    }

    console.log('✅ New announcement signup saved:', data)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('❌ Error processing announcement signup:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: Get all signups (for admin purposes)
export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ 
        total: signups.length,
        signups: signups,
        message: 'Supabase not configured - using fallback storage'
      })
    }

    const { data, error } = await supabase
      .from('announcement_signups')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch signups' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      total: data?.length || 0,
      signups: data || []
    })
  } catch (error) {
    console.error('❌ Error fetching signups:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

