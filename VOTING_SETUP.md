# Voting System Setup Guide

## The Problem
The voting system is failing because the voting Supabase database doesn't have the required tables (`votes` and `vote_counts`).

## Solution
You need to run the SQL schema in your voting Supabase project.

## Step-by-Step Setup:

### 1. Go to Your Voting Supabase Project
- **URL**: https://rarfewohykkxciaerfvp.supabase.co
- **Dashboard**: https://supabase.com/dashboard/project/rarfewohykkxciaerfvp

### 2. Open SQL Editor
- In your Supabase dashboard, go to **SQL Editor**
- Click **"New Query"**

### 3. Run the Schema
- Copy the entire contents of `voting-schema.sql`
- Paste it into the SQL editor
- Click **"Run"**

### 4. Verify Tables Created
After running the SQL, you should see these tables in your **Table Editor**:
- ✅ `votes` - stores individual votes
- ✅ `vote_counts` - materialized view with vote counts per card

## What the Schema Creates:

### Tables:
- **`votes`**: Stores individual votes with card_id, vote_type, user_id
- **`vote_counts`**: Materialized view showing upvotes/downvotes per card

### Features:
- ✅ **Anonymous voting** (no user registration required)
- ✅ **Vote switching** (up → down, down → up)
- ✅ **Real-time updates** via Supabase realtime
- ✅ **Performance optimized** with indexes and materialized views
- ✅ **Row Level Security** enabled

### Security:
- ✅ **RLS policies** allow anonymous voting
- ✅ **Input validation** (vote_type must be 'up' or 'down')
- ✅ **Automatic timestamps** for audit trail

## Test the Voting System:
1. Go to `http://localhost:3002/pricing`
2. Try voting on any pricing card
3. Check browser console for success messages
4. Votes should update in real-time

## Troubleshooting:
- **"Insert failed: {}"** → Tables don't exist (run the SQL schema)
- **"Permission denied"** → RLS policies not set up (run the SQL schema)
- **"Materialized view doesn't exist"** → Run the complete SQL schema

The voting system will work perfectly once you run the SQL schema! 🚀
