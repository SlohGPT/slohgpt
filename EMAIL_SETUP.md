# Email Setup Guide for SlohGPT

## Step 1: Create Environment File

Create a `.env.local` file in your project root with these variables:

```bash
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 2: Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `SMTP_PASS` (not your regular Gmail password)

## Step 3: Alternative Email Providers

### SendGrid
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Mailgun
```bash
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-smtp-username
SMTP_PASS=your-mailgun-smtp-password
```

## Step 4: Test the Setup

1. Start your development server: `npm run dev`
2. Try registering a new account
3. Check your email for the verification email
4. Try the "Forgot Password" flow
5. Check the console logs for email sending status

## Email Templates Included

- ✅ **Email Verification**: Sent when user registers
- ✅ **Password Reset**: Sent when user requests password reset
- ✅ **Password Changed**: Sent when password is successfully reset

## Troubleshooting

- **"Invalid login"**: Check your SMTP credentials
- **"Connection timeout"**: Check SMTP_HOST and SMTP_PORT
- **"Authentication failed"**: Use app password, not regular password
- **Emails not received**: Check spam folder, verify FROM_EMAIL

## Security Notes

- Never commit `.env.local` to version control
- Use app passwords, not regular passwords
- Consider using a dedicated email service for production
- Set up SPF/DKIM records for better deliverability
