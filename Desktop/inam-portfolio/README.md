# Inam Ul Haq - Portfolio Website

A modern, full-stack portfolio website for showcasing Shopify development work with an admin panel for content management.

## 🚀 Features

- **Modern Frontend**: Built with Next.js 16, React 19, and Tailwind CSS
- **Dark Theme**: Professional dark UI with teal accent colors
- **Responsive Design**: Mobile-first design that works on all devices
- **Admin Dashboard**: Secure admin panel for managing all content
- **Database**: PostgreSQL with Neon hosting
- **Authentication**: JWT-based authentication for admin access
- **Content Management**: Manage portfolio, testimonials, services, blog posts, and site settings
- **Contact Form**: Email notifications for contact submissions
- **SEO Optimized**: Meta tags, Open Graph, and structured data

## 📋 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL (Neon)
- **Authentication**: JWT with HTTP-only cookies
- **Hosting**: Vercel
- **Email**: Nodemailer

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Neon account)
- npm or yarn

### 1. Clone & Install

```bash
git clone <repository-url>
cd inam-portfolio
npm install
```

### 2. Database Setup

Create a PostgreSQL database and get your connection string from Neon.

### 3. Environment Variables

Create a `.env.local` file:

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Email Configuration (optional, for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@inamulhaq.com
ADMIN_EMAIL=your@email.com

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Seed Sample Data

Populate the database with sample portfolio items, testimonials, services, and blog posts:

```bash
npm run seed
```

**Default Admin Credentials:**
- Email: `admin@inamulhaq.com`
- Password: `demo123456`

⚠️ **Important**: Change these credentials immediately in production!

### 5. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## 📱 Public Pages

- `/` - Homepage with hero, services, featured projects, testimonials
- `/portfolio` - All portfolio items with filtering
- `/portfolio/[slug]` - Individual project details
- `/services` - Services overview
- `/about` - About page with experience timeline
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog post
- `/contact` - Contact form

## 🔐 Admin Panel

- `/admin` - Login page
- `/admin/dashboard` - Dashboard overview
- `/admin/dashboard/portfolio` - Manage portfolio items
- `/admin/dashboard/testimonials` - Manage testimonials
- `/admin/dashboard/services` - Manage services
- `/admin/dashboard/blog` - Manage blog posts
- `/admin/dashboard/settings` - Site settings
- `/admin/dashboard/messages` - Contact messages

## 📊 Database Schema

### Users
- Admin authentication and credentials

### Portfolio Items
- Case studies and projects with challenge/solution/results

### Testimonials
- Client reviews and ratings

### Services
- Service offerings with descriptions

### Blog Posts
- Blog articles (published/draft)

### Site Settings
- Global site configuration (bio, contact info, social links)

### Contact Messages
- Submitted contact form messages

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Connect to Vercel

1. Go to https://vercel.com
2. Import your GitHub repository
3. Add environment variables from `.env.local`
4. Deploy

### 3. Database Setup on Vercel

1. Create a PostgreSQL database on Neon
2. Add `DATABASE_URL` to Vercel environment variables
3. Run database initialization

### 4. Custom Domain

1. Add your domain in Vercel project settings
2. Update DNS records as instructed
3. SSL certificate auto-provisioned

## 📝 Usage

### Adding a Portfolio Item

1. Login to admin panel (`/admin`)
2. Go to Portfolio section
3. Click "Add New"
4. Fill in details:
   - Title, slug, description
   - Challenge, solution, results
   - Live store link
   - Technologies used
   - Category and featured status
5. Save and it appears on website

### Adding a Testimonial

1. Go to Testimonials section
2. Click "Add New"
3. Fill in client info and quote
4. Mark as featured for homepage
5. Save

### Writing a Blog Post

1. Go to Blog section
2. Click "New Post"
3. Write content (supports HTML)
4. Mark as published to make it public
5. Save

### Managing Settings

1. Go to Settings
2. Update bio, email, social links, experience
3. Changes appear on homepage and footer

## 🔒 Security Notes

- Admin passwords are hashed with bcrypt
- JWT tokens stored in HTTP-only cookies (not accessible to JavaScript)
- All admin endpoints require authentication
- Environment variables are never exposed to client
- HTTPS is enforced on production

## 📧 Email Setup

To enable contact form email notifications:

1. Get an app password from Gmail
2. Add SMTP credentials to `.env.local`
3. Messages are also stored in database

## 🎨 Customization

### Colors

Modify color scheme in `tailwind.config.ts`:

```typescript
primary: {
  500: '#06b6d4', // Teal
}
```

### Typography

Fonts are defined in `app/layout.tsx` and `app/globals.css`

### Content

All homepage content is managed via admin panel and site settings

## 🐛 Troubleshooting

### Database Connection Error

- Verify `DATABASE_URL` is correct
- Check PostgreSQL is running
- Ensure network access is allowed

### Admin Login Issues

- Verify email/password are correct
- Check `JWT_SECRET` is set
- Clear cookies and try again

### Email Not Sending

- Verify SMTP credentials
- Check app-specific password for Gmail
- Review Nodemailer error logs

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Shopify Liquid Docs](https://shopify.dev/api/liquid)
- [Tailwind CSS](https://tailwindcss.com)
- [PostgreSQL](https://www.postgresql.org/docs/)

## 📄 License

Private - All rights reserved

## 👤 Author

Inam Ul Haq - Shopify Developer

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**
