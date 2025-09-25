import { createClient } from '@supabase/supabase-js'

// This is for the voting system (separate from authentication)
// You'll need to create a separate Supabase project for voting or use the same one with different tables

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_VOTING
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_VOTING

// Create Supabase client for voting only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Types for voting system
export interface VoteCount {
  card_id: string
  upvotes: number
  downvotes: number
  total_votes: number
}

export interface VoteInsert {
  card_id: string
  vote_type: 'up' | 'down'
  user_id: string
  ip_address?: string
}

// Generate anonymous user ID for voting
export const getAnonymousUserId = (): string => {
  let userId = localStorage.getItem('anonymous_user_id')
  if (!userId) {
    userId = 'anon_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
    localStorage.setItem('anonymous_user_id', userId)
  }
  return userId
}

export default supabase
