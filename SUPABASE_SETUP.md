# Supabase Setup for Voting System

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Wait for the project to be ready (usually takes 1-2 minutes)

## 2. Set up Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase-schema.sql` into the editor
4. Click **Run** to execute the schema

## 3. Get Project Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 4. Create Environment File

Create a file called `.env.local` in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Replace the values with your actual Supabase credentials!**

## 5. Restart Development Server

After creating the `.env.local` file:

```bash
npm run dev
```

## 6. Test Voting System

1. Go to `/pricing` page
2. Scroll down to the AI Coach card
3. Click the voting buttons (Áno/Nie)
4. You should see:
   - Confetti animation on upvote
   - Vote counts updating in real-time
   - Database entries in Supabase

## Troubleshooting

- **"Missing Supabase environment variables"**: Make sure `.env.local` exists and has correct values
- **Voting not working**: Check browser console for errors
- **Database errors**: Verify the schema was created correctly in Supabase
- **Real-time not working**: Check Supabase project status and network connection

## Database Tables Created

- `votes`: Stores individual votes with card_id, vote_type, ip_address
- `vote_counts`: View that aggregates vote counts per card
- Real-time subscriptions enabled for live updates
