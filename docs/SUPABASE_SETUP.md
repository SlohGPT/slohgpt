# Supabase Setup Guide for SLOH GPT Voting System

## 🚀 Quick Setup (5 minutes)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Choose your organization
5. Name: `sloh-gpt-voting`
6. Database Password: Generate a strong password
7. Region: Choose closest to your users
8. Click "Create new project"

### 2. Get Your Credentials
1. Go to Project Settings → API
2. Copy your:
   - **Project URL** (looks like: `https://xyz.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

### 3. Set Environment Variables
Create `.env.local` file in your project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Set Up Database
1. Go to SQL Editor in Supabase dashboard
2. Copy the contents of `supabase-schema.sql`
3. Paste and run the SQL

### 5. Fix Security Issue (IMPORTANT!)
1. Go to SQL Editor in Supabase dashboard
2. Copy the contents of `fix-security-issue.sql`
3. Paste and run the SQL
4. This fixes the SECURITY DEFINER issue with the vote_counts view

### 6. Test the System
1. Restart your Next.js dev server: `npm run dev`
2. Go to `/pricing` page
3. Try voting on the "Coming Soon" cards
4. Check Supabase dashboard → Table Editor → `votes` to see votes

## 🔧 Advanced Features

### Real-time Updates
The system automatically updates vote counts in real-time when anyone votes.

### IP-based Voting
Each IP address can only vote once per card (prevents spam).

### Analytics
You can query vote data:
```sql
-- See all votes
SELECT * FROM votes ORDER BY created_at DESC;

-- See vote counts
SELECT * FROM vote_counts;

-- See voting trends
SELECT 
  card_id,
  DATE(created_at) as date,
  COUNT(*) as votes_today
FROM votes 
GROUP BY card_id, DATE(created_at)
ORDER BY date DESC;
```

## 💰 Pricing
- **Free tier**: 50,000 monthly active users, 500MB database
- **Pro tier**: $25/month for higher limits
- Perfect for your SaaS growth stage

## 🔒 Security Features
- Row Level Security enabled
- IP-based vote limiting
- Anonymous voting (no user accounts needed)
- Secure API keys

## 📊 Monitoring
Check your Supabase dashboard for:
- Real-time vote counts
- User engagement metrics
- Database performance
- API usage

## 🚨 Troubleshooting

### "Invalid API key" error
- Check your `.env.local` file
- Restart your dev server
- Verify keys in Supabase dashboard

### Votes not showing
- Check browser console for errors
- Verify database schema was created
- Check Supabase logs

### Real-time not working
- Check your internet connection
- Verify Supabase project is active
- Check browser console for WebSocket errors

## 🎯 Next Steps
1. Set up Supabase
2. Test voting system
3. Monitor user engagement
4. Use vote data to prioritize features
5. Scale as your user base grows

Need help? Check Supabase docs or reach out!
