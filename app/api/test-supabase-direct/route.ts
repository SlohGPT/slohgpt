import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({
      error: 'Missing Supabase credentials',
      supabaseUrl: supabaseUrl ? '✅ Set' : '❌ Missing',
      supabaseKey: supabaseKey ? '✅ Set' : '❌ Missing'
    })
  }

  try {
    // Test direct fetch to Supabase REST API
    const response = await fetch(`${supabaseUrl}/rest/v1/announcement_signups?select=count`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      return NextResponse.json({
        error: 'Supabase API request failed',
        status: response.status,
        statusText: response.statusText,
        url: supabaseUrl
      })
    }

    const data = await response.text()
    return NextResponse.json({
      success: true,
      message: 'Direct Supabase API call successful',
      data: data,
      url: supabaseUrl
    })

  } catch (error) {
    return NextResponse.json({
      error: 'Network error',
      details: error instanceof Error ? error.message : String(error),
      url: supabaseUrl
    })
  }
}
