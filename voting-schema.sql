-- Voting System Database Schema
-- Run this in your voting Supabase project: https://rarfewohykkxciaerfvp.supabase.co

-- Create votes table
CREATE TABLE IF NOT EXISTS votes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    card_id TEXT NOT NULL,
    vote_type TEXT NOT NULL CHECK (vote_type IN ('up', 'down')),
    user_id TEXT NOT NULL,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vote_counts view (materialized view for performance)
CREATE MATERIALIZED VIEW IF NOT EXISTS vote_counts AS
SELECT 
    card_id,
    COUNT(CASE WHEN vote_type = 'up' THEN 1 END) as upvotes,
    COUNT(CASE WHEN vote_type = 'down' THEN 1 END) as downvotes,
    COUNT(*) as total_votes
FROM votes
GROUP BY card_id;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_votes_card_id ON votes(card_id);
CREATE INDEX IF NOT EXISTS idx_votes_user_id ON votes(user_id);
CREATE INDEX IF NOT EXISTS idx_votes_ip_address ON votes(ip_address);
CREATE INDEX IF NOT EXISTS idx_votes_card_user ON votes(card_id, user_id);

-- Create function to refresh vote counts
CREATE OR REPLACE FUNCTION refresh_vote_counts()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW vote_counts;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-refresh vote counts when votes change
CREATE OR REPLACE FUNCTION trigger_refresh_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
    REFRESH MATERIALIZED VIEW vote_counts;
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS votes_insert_trigger ON votes;
DROP TRIGGER IF EXISTS votes_update_trigger ON votes;
DROP TRIGGER IF EXISTS votes_delete_trigger ON votes;

CREATE TRIGGER votes_insert_trigger
    AFTER INSERT ON votes
    FOR EACH ROW
    EXECUTE FUNCTION trigger_refresh_vote_counts();

CREATE TRIGGER votes_update_trigger
    AFTER UPDATE ON votes
    FOR EACH ROW
    EXECUTE FUNCTION trigger_refresh_vote_counts();

CREATE TRIGGER votes_delete_trigger
    AFTER DELETE ON votes
    FOR EACH ROW
    EXECUTE FUNCTION trigger_refresh_vote_counts();

-- Enable Row Level Security (RLS)
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous voting
CREATE POLICY "Allow anonymous voting" ON votes
    FOR ALL USING (true);

-- Grant permissions
GRANT ALL ON votes TO anon;
GRANT ALL ON vote_counts TO anon;
GRANT EXECUTE ON FUNCTION refresh_vote_counts() TO anon;
