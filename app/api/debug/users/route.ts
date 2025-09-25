import { NextRequest, NextResponse } from 'next/server'
import { getAllUsers } from '@/lib/supabase-auth'

export async function GET(request: NextRequest) {
  try {
    const users = await getAllUsers()
    return NextResponse.json({ users })
  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({ error: 'Debug failed' }, { status: 500 })
  }
}
