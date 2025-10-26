-- Add IP address tracking to announcement_signups table
ALTER TABLE announcement_signups 
ADD COLUMN IF NOT EXISTS ip_address INET;

-- Create index on IP address for faster lookups
CREATE INDEX IF NOT EXISTS idx_announcement_signups_ip_address ON announcement_signups(ip_address);

-- Create composite index for IP + created_at for rate limiting queries
CREATE INDEX IF NOT EXISTS idx_announcement_signups_ip_created ON announcement_signups(ip_address, created_at);
