-- Create announcement_signups table
CREATE TABLE IF NOT EXISTS announcement_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_announcement_signups_email ON announcement_signups(email);
CREATE INDEX IF NOT EXISTS idx_announcement_signups_created_at ON announcement_signups(created_at);

-- Enable RLS
ALTER TABLE announcement_signups ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Allow all operations on announcement_signups" ON announcement_signups
  FOR ALL USING (true);

-- Add IP address tracking to announcement_signups table
ALTER TABLE announcement_signups 
ADD COLUMN IF NOT EXISTS ip_address INET;

-- Create index on IP address for faster lookups
CREATE INDEX IF NOT EXISTS idx_announcement_signups_ip_address ON announcement_signups(ip_address);

-- Create composite index for IP + created_at for rate limiting queries
CREATE INDEX IF NOT EXISTS idx_announcement_signups_ip_created ON announcement_signups(ip_address, created_at);
