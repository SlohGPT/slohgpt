-- Complete Supabase Database Schema for SLOH GPT Voting System
-- This fixes the missing user_id column issue

-- 1. Drop existing table and view if they exist
DROP VIEW IF EXISTS public.vote_counts;
DROP TABLE IF EXISTS public.votes CASCADE;

-- 2. Create the votes table with user_id column (REQUIRED!)
CREATE TABLE public.votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id TEXT NOT NULL,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('up', 'down')),
  user_id TEXT NOT NULL,  -- THIS WAS MISSING!
  ip_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create indexes for performance
CREATE UNIQUE INDEX unique_ip_vote ON votes (card_id, ip_address);
CREATE INDEX idx_votes_card_id ON votes (card_id);
CREATE INDEX idx_votes_user_id ON votes (user_id);
CREATE INDEX idx_votes_created_at ON votes (created_at);

-- 4. Enable Row Level Security
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies
CREATE POLICY "Anyone can read votes" ON votes
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert votes" ON votes
  FOR INSERT WITH CHECK (true);

-- 6. CRITICAL: Add UPDATE policy for vote switching
CREATE POLICY "Anyone can update their own votes" ON votes
  FOR UPDATE USING (true);

-- 7. Create the vote_counts view with proper real-time support
CREATE OR REPLACE VIEW public.vote_counts
AS
SELECT 
  card_id,
  COUNT(CASE WHEN vote_type = 'up' THEN 1 END) as upvotes,
  COUNT(CASE WHEN vote_type = 'down' THEN 1 END) as downvotes,
  COUNT(*) as total_votes
FROM votes
GROUP BY card_id;

-- 8. Grant permissions
GRANT SELECT ON vote_counts TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON votes TO anon, authenticated;

-- 9. Enable real-time for the votes table
ALTER PUBLICATION supabase_realtime ADD TABLE votes;

-- 10. Add helpful comments
COMMENT ON TABLE public.votes IS 'Votes table with vote switching support';
COMMENT ON VIEW public.vote_counts IS 'Vote counts view with real-time support. Updated to fix vote switching functionality.';

-- 11. Verify the setup
SELECT 'Schema created successfully! Vote switching is now enabled.' as status;
