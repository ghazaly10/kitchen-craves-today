# 🚀 Deployment Guide for Kitchen Craves Today

## GitHub Repository Setup

1. **Initialize Git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Kitchen Craves Today with Supabase integration"
   ```

2. **Add GitHub Repository:**
   ```bash
   git remote add origin https://github.com/ghazaly10/kitchen-craves-today.git
   git branch -M main
   git push -u origin main
   ```

## Vercel Deployment

### Option 1: Deploy Button (Recommended)
1. Click this button to deploy directly:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ghazaly10/kitchen-craves-today)

### Option 2: Manual Deployment
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub: `ghazaly10/kitchen-craves-today`
4. Configure settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Environment Variables for Production

In Vercel dashboard, add these environment variables:

```
VITE_SUPABASE_URL=https://rrhfikcdctegkcxihfqc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyaGZpa2NkY3RlZ2tjeGloZnFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExOTc5MjMsImV4cCI6MjA2Njc3MzkyM30.nmgiYyjS6Kh24ggWOYYBCQLzobsWz_Fa-9kBA6cRAbA
```

## Supabase Configuration for Production

### 1. Update Authentication Settings
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **Authentication > Settings**
3. Update **Site URL** to your Vercel domain:
   ```
   https://kitchen-craves-today.vercel.app
   ```
4. Add **Redirect URLs**:
   ```
   https://kitchen-craves-today.vercel.app
   https://kitchen-craves-today.vercel.app/**
   ```

### 2. Database Setup (if not done already)
Run these SQL files in your Supabase SQL Editor:
1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_seed_data.sql`
3. `supabase/migrations/003_auth_setup.sql`

## Custom Domain (Optional)

### In Vercel:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### In Supabase:
Update the Site URL and Redirect URLs to your custom domain.

## Testing Deployment

After deployment:
1. ✅ Test user registration and login
2. ✅ Test adding/removing pantry items
3. ✅ Test recipe browsing and filtering
4. ✅ Test database admin panel
5. ✅ Test responsive design on mobile

## Monitoring

### Vercel Analytics
Enable analytics in your Vercel dashboard to monitor:
- Page views
- User engagement
- Performance metrics

### Supabase Monitoring
Monitor in Supabase dashboard:
- Database usage
- Authentication metrics
- API requests
- Storage usage

## Troubleshooting

### Common Issues:

1. **Build Fails**: Check environment variables are set correctly
2. **Auth Not Working**: Verify Site URL in Supabase Auth settings
3. **Database Errors**: Ensure all migration files have been run
4. **CORS Issues**: Check Supabase CORS settings

### Environment Variables Checklist:
- ✅ `VITE_SUPABASE_URL` - Your Supabase project URL
- ✅ `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## Security Notes

🔒 **Important**: 
- Never commit `.env.local` to Git
- Use environment variables for all sensitive data
- Keep your Supabase keys secure
- Enable RLS policies for data protection

## Post-Deployment

1. **Update GitHub README** with live demo link
2. **Share your app** with friends and family
3. **Monitor performance** and user feedback
4. **Plan future features** and improvements

Your Kitchen Craves Today app is now live! 🎉

**Live URL**: https://kitchen-craves-today.vercel.app
