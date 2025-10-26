import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
  }

  let supabaseStatus = '❌ Not Available'
  let connectionTest = '❌ Failed'
  
  try {
    // Try to import and initialize Supabase
    const { supabase } = await import('@/lib/supabase')
    
    if (supabase) {
      supabaseStatus = '✅ Available'
      
      // Try a simple query to test connection
      const { data, error } = await supabase
        .from('announcement_signups')
        .select('count')
        .limit(1)
      
      if (error) {
        connectionTest = `❌ Query Error: ${error.message}`
      } else {
        connectionTest = '✅ Connected'
      }
    } else {
      supabaseStatus = '❌ Client not initialized'
    }
  } catch (e) {
    supabaseStatus = `❌ Error: ${e instanceof Error ? e.message : String(e)}`
  }

  return NextResponse.json({
    environment: envVars,
    supabase: supabaseStatus,
    connection: connectionTest,
    timestamp: new Date().toISOString(),
    platform: process.env.VERCEL ? 'Vercel' : 'Local'
  })
}
