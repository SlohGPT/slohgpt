import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing Supabase connection...')
    
    if (!supabase) {
      return NextResponse.json({
        error: 'Supabase client not initialized',
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
      }, { status: 500 })
    }

    // Test basic connection
    console.log('🧪 Testing basic Supabase query...')
    const { data, error } = await supabase
      .from('announcement_signups')
      .select('count')
      .limit(1)

    if (error) {
      console.error('❌ Supabase query error:', error)
      return NextResponse.json({
        error: 'Supabase query failed',
        details: error.message,
        code: error.code,
        hint: error.hint
      }, { status: 500 })
    }

    // Test table structure
    console.log('🧪 Testing table structure...')
    const { data: structureData, error: structureError } = await supabase
      .from('announcement_signups')
      .select('id, email, created_at, ip_address')
      .limit(1)

    if (structureError) {
      console.error('❌ Table structure error:', structureError)
      return NextResponse.json({
        error: 'Table structure issue',
        details: structureError.message,
        code: structureError.code,
        hint: structureError.hint
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection working',
      tableStructure: 'All columns accessible',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Database test error:', error)
    return NextResponse.json({
      error: 'Database test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
