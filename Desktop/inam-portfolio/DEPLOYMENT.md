# Deployment Guide

## Quick Start Deployment to Vercel

### Step 1: Prepare Your Code

```bash
# Make sure everything is committed
git add .
git commit -m "Portfolio website - ready for deployment"
git push origin main
```

### Step 2: Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel to access your GitHub account

### Step 3: Deploy Your Repository

1. Click "New Project"
2. Import your GitHub repository
3. Configure project:
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Click "Deploy"

### Step 4: Set Up Environment Variables

After deployment starts:

1. Go to Project Settings → Environment Variables
2. Add all variables from your `.env.local`:

```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@inamulhaq.com
ADMIN_EMAIL=your@email.com
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

3. Redeploy after adding variables
4. Click "Redeploy"

### Step 5: Database Setup

1. Go to https://neon.tech
2. Sign up and create a new PostgreSQL database
3. Copy the connection string
4. Add to Vercel environment variables as `DATABASE_URL`

### Step 6: Connect Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., inamulhaq.com)
3. Follow DNS setup instructions
4. Wait for SSL certificate (usually instant)

### Step 7: Run Database Migrations

After first deployment, you need to initialize the database:

1. Open Vercel deployment logs
2. The database tables will be created on first API call
3. Or run seed script locally with production DB

## Production Checklist

Before going live, verify:

- [ ] Database is connected and tables are created
- [ ] Admin login works with test credentials
- [ ] Contact form emails are being sent
- [ ] All environment variables are set
- [ ] Custom domain is configured
- [ ] SSL certificate is active
- [ ] Portfolio items are visible
- [ ] Admin panel is accessible at `/admin`
- [ ] Dark mode toggle works
- [ ] Mobile responsive design is working

## Post-Deployment Tasks

### 1. Change Admin Credentials

**CRITICAL**: Change the default admin password immediately!

```bash
# Login to admin panel at /admin
# Go to Settings
# Note: Currently you need to change in database directly
```

To change password in database:

```sql
UPDATE users 
SET password_hash = 'new_hashed_password' 
WHERE email = 'admin@inamulhaq.com';
```

Or create a new admin user via API/script.

### 2. Configure Email

For Gmail:
1. Enable 2-factor authentication
2. Create App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character password as `SMTP_PASSWORD`

### 3. Add Your Content

1. Login to admin panel (`/admin`)
2. Add portfolio items with your real projects
3. Add testimonials from clients
4. Configure services
5. Write blog posts
6. Update site settings with your info

### 4. SEO Setup

1. Add Google Search Console: https://search.google.com/search-console
2. Add Sitemap (auto-generated at `/sitemap.xml`)
3. Verify domain ownership
4. Monitor search performance

### 5. Analytics (Optional)

Add Google Analytics:
1. Get tracking ID from Google Analytics
2. Add to environment variables or code
3. Or use Vercel Analytics

## Monitoring

### Check Deployment Status

```bash
vercel status
vercel logs
```

### Monitor Performance

- Vercel Dashboard: Deployment logs and metrics
- Core Web Vitals: https://pagespeed.web.dev
- Uptime: Set up monitoring at https://uptimerobot.com

## Troubleshooting Deployment

### Build Fails

```bash
# Check local build
npm run build

# Check logs in Vercel dashboard
# Look for missing environment variables
```

### Database Connection Error

```bash
# Verify DATABASE_URL is correct
# Check if Neon database is running
# Ensure IP whitelist includes Vercel's IPs
```

### Admin Login Doesn't Work

- Check `JWT_SECRET` is set
- Verify admin user exists in database
- Clear browser cookies and try again
- Check password hash in database

### Emails Not Sending

- Verify SMTP credentials
- Check Gmail app password (not account password)
- Verify `ADMIN_EMAIL` is set
- Check Nodemailer error logs in Vercel

## Scaling Considerations

As your traffic grows:

1. **Database**: Monitor Neon usage, upgrade if needed
2. **Vercel**: Automatic scaling, no action needed
3. **CDN**: Vercel handles edge caching
4. **Email**: Monitor SMTP rate limits

## Security Best Practices

1. ✅ Use strong JWT_SECRET (generate with `openssl rand -hex 32`)
2. ✅ Keep dependencies updated
3. ✅ Enable HTTPS (automatic on Vercel)
4. ✅ Regular database backups (Neon does this)
5. ✅ Monitor for suspicious activity
6. ✅ Change admin password regularly
7. ✅ Use environment variables for all secrets

## Rollback Strategy

If something goes wrong:

```bash
# Vercel keeps previous deployments
# Go to Deployments tab
# Click the previous deployment
# Click "Promote to Production"
```

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Neon Docs: https://neon.tech/docs
- PostgreSQL Docs: https://www.postgresql.org/docs/

---

**Your portfolio is now live! 🚀**

Monitor performance and make content updates regularly to keep your site fresh and engaging.
