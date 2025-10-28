-- Drop existing table if it exists to recreate with proper structure
DROP TABLE IF EXISTS announcement_signups CASCADE;

-- Create announcement_signups table with proper structure
CREATE TABLE announcement_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  ip_address VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_announcement_signups_email ON announcement_signups(email);
CREATE INDEX idx_announcement_signups_created_at ON announcement_signups(created_at);
CREATE INDEX idx_announcement_signups_ip_address ON announcement_signups(ip_address);
CREATE INDEX idx_announcement_signups_ip_created ON announcement_signups(ip_address, created_at);

-- Enable RLS
ALTER TABLE announcement_signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations
CREATE POLICY "Allow all operations on announcement_signups" 
ON announcement_signups 
FOR ALL 
USING (true);


