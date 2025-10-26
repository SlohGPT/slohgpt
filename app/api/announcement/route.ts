import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendNewSubmissionNotification } from '@/lib/email'

// Fallback in-memory storage for when Supabase is not available
const signups: Array<{ id: string; email: string; ip_address: string; created_at: string }> = []

// Helper function to get client IP address
function getClientIP(request: NextRequest): string {
  // Check various headers for the real IP
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  // Fallback to unknown if no IP headers found
  return 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body
    const clientIP = getClientIP(request)

    console.log('📧 New signup attempt:', { email, ip: clientIP })

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
      
      // Check for duplicate email in fallback storage
      const existingSignup = signups.find(s => s.email.toLowerCase() === email.toLowerCase())
      if (existingSignup) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        )
      }
      
      // Check for IP rate limiting in fallback storage (1 week = 7 days)
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      const recentSignupFromIP = signups.find(s => 
        s.ip_address === clientIP && 
        new Date(s.created_at) > oneWeekAgo
      )
      
      if (recentSignupFromIP) {
        return NextResponse.json(
          { error: 'Only one email per IP address per week allowed' },
          { status: 429 }
        )
      }
      
      const signup = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        ip_address: clientIP,
        created_at: new Date().toISOString()
      }
      
      signups.push(signup)
      console.log('✅ New announcement signup (fallback):', signup)
      
      // Send notification email (temporarily disabled for debugging)
      // sendNewSubmissionNotification(email, clientIP).catch(err => 
      //   console.error('Failed to send notification:', err)
      // )
      
      return NextResponse.json({ success: true, data: signup })
    }

    // Check for duplicate email in Supabase
    const { data: existingData, error: checkError } = await supabase
      .from('announcement_signups')
      .select('email')
      .eq('email', email.toLowerCase())
      .maybeSingle()

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
          ip_address: clientIP,
          created_at: new Date().toISOString()
        }
        signups.push(signup)
        console.log('✅ New announcement signup (fallback):', signup)
        
        // Send notification email (temporarily disabled for debugging)
        // sendNewSubmissionNotification(email, clientIP).catch(err => 
        //   console.error('Failed to send notification:', err)
        // )
        
        return NextResponse.json({ success: true, data: signup })
      }
    }

    if (existingData) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Check for IP rate limiting in Supabase (1 week = 7 days)
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const { data: recentSignupFromIP, error: ipCheckError } = await supabase
      .from('announcement_signups')
      .select('id, created_at')
      .eq('ip_address', clientIP)
      .gt('created_at', oneWeekAgo)
      .maybeSingle()

    if (ipCheckError) {
      console.error('❌ Error checking IP rate limit:', ipCheckError)
      // If IP column doesn't exist yet, skip rate limiting for now
      console.log('📝 IP column may not exist, skipping rate limit check')
    } else if (recentSignupFromIP) {
      console.log('🚫 Rate limit exceeded for IP:', clientIP)
      return NextResponse.json(
        { error: 'Only one email per IP address per week allowed' },
        { status: 429 }
      )
    }

    // Check if Supabase is available
    if (!supabase) {
      console.log('📝 Supabase not available, using fallback storage')
      const signup = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        ip_address: clientIP,
        created_at: new Date().toISOString()
      }
      console.log('✅ New announcement signup (fallback):', signup)
      
      // Send notification email
      sendNewSubmissionNotification(email, clientIP).catch(err => 
        console.error('Failed to send notification:', err)
      )
      
      return NextResponse.json({ success: true, data: signup })
    }

    // Save to Supabase
    console.log('💾 Attempting to save to Supabase with correct URL:', { email: email.toLowerCase(), ip_address: clientIP })
    
    try {
      const { data, error } = await supabase
        .from('announcement_signups')
        .insert([
          {
            email: email.toLowerCase(),
            ip_address: clientIP,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single()

      if (error) {
        console.error('❌ Supabase error:', error)
        console.error('❌ Error details:', {
          message: error.message,
          code: error.code,
          hint: error.hint,
          details: error.details
        })
        
        // If table doesn't exist, fall back to memory storage
        if (error.code === '42P01' || error.message.includes('relation') || error.message.includes('does not exist')) {
          console.log('📝 Table not found, using fallback storage')
          const signup = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            ip_address: clientIP,
            created_at: new Date().toISOString()
          }
          console.log('✅ New announcement signup (fallback):', signup)
          
          // Send notification email
          sendNewSubmissionNotification(email, clientIP).catch(err => 
            console.error('Failed to send notification:', err)
          )
          
          return NextResponse.json({ success: true, data: signup })
        }
        
        return NextResponse.json(
          { 
            error: 'Failed to save email',
            details: error.message,
            code: error.code,
            hint: error.hint
          },
          { status: 500 }
        )
      }
    } catch (networkError) {
      console.error('❌ Network error connecting to Supabase:', networkError)
      console.log('📝 Network error, using fallback storage')
      
      const signup = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        ip_address: clientIP,
        created_at: new Date().toISOString()
      }
      console.log('✅ New announcement signup (fallback):', signup)
      
      // Send notification email
      sendNewSubmissionNotification(email, clientIP).catch(err => 
        console.error('Failed to send notification:', err)
      )
      
      return NextResponse.json({ success: true, data: signup })
    }

    console.log('✅ New announcement signup saved:', data)

    // Send notification email (temporarily disabled for debugging)
    // sendNewSubmissionNotification(email, clientIP).catch(err => 
    //   console.error('Failed to send notification:', err)
    // )

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

