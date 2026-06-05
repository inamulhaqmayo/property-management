# 🚀 Database Setup Guide

Your portfolio website is ready, but needs a PostgreSQL database connection.

## Quick Setup (5 minutes)

### Step 1: Create a Neon PostgreSQL Database

1. Go to **https://neon.tech**
2. Sign up (free account)
3. Create a new project
4. Copy your connection string (looks like: `postgresql://user:password@host/database`)

### Step 2: Add to Your .env.local File

Edit `/Users/inamulhaqmayo/Desktop/inam-portfolio/.env.local`

Add this line:
```
DATABASE_URL=postgresql://user:password@host/database
```

Replace with your actual Neon connection string.

### Step 3: Run Seed Script

```bash
npm run seed
```

This will:
- Create database tables
- Add sample portfolio items
- Add testimonials
- Add services
- Add blog posts
- Create admin user

### Step 4: Start Development

```bash
npm run dev
```

Then visit:
- **Homepage:** http://localhost:3000
- **Admin:** http://localhost:3000/admin
- **Login:** admin@inamulhaq.com / demo123456

---

## What is Neon?

Neon is a free PostgreSQL database hosting service:
- ✅ Free tier available
- ✅ Easy to setup
- ✅ Perfect for development
- ✅ Can scale later

## Still Having Issues?

1. **Connection refused?**
   - Make sure DATABASE_URL is set in .env.local
   - Make sure it's a valid Neon connection string

2. **Seed script errors?**
   - Run: `npm run seed` again
   - Check the error message

3. **Need help?**
   - See DEPLOYMENT.md troubleshooting section
   - Check DATABASE_URL format

---

**Once you have DATABASE_URL set, run: `npm run seed && npm run dev`**

Your website will be running at http://localhost:3000! 🎉
