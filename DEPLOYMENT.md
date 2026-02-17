# 🚀 Deployment Guide - Finomo Expense Tracker

This guide will walk you through deploying the Finomo expense tracker to **Render** (free tier).

## 📋 Prerequisites

1. **GitHub Account** - [Sign up](https://github.com)
2. **Render Account** - [Sign up](https://render.com) (free tier available)
3. **Git installed** on your local machine

---

## 🔧 Step 1: Prepare Your Repository

### 1.1 Initialize Git Repository (if not already done)

```bash
cd /Users/adarshsinghai/Downloads/Finomo
git init
git add .
git commit -m "Initial commit - Finomo expense tracker"
```

### 1.2 Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `finomo-expense-tracker`
3. **Don't** initialize with README (we already have one)
4. Click "Create repository"

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/finomo-expense-tracker.git
git branch -M main
git push -u origin main
```

---

## 🗄️ Step 2: Deploy Backend (Spring Boot API)

### 2.1 Create PostgreSQL Database on Render

1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `finomo-db`
   - **Database**: `finomo`
   - **User**: (auto-generated)
   - **Region**: Choose closest to you
   - **Plan**: **Free**
4. Click **"Create Database"**
5. **Save the Internal Database URL** (you'll need it in the next step)

### 2.2 Deploy Backend Web Service

1. In Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `finomo-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Java`
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/expense-tracker-1.0.0.jar`
   - **Plan**: **Free**

4. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):

   ```
   SPRING_DATASOURCE_URL=<Your Internal Database URL from Step 2.1>
   SPRING_DATASOURCE_USERNAME=<Database username>
   SPRING_DATASOURCE_PASSWORD=<Database password>
   SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
   SPRING_JPA_HIBERNATE_DDL_AUTO=update
   APP_CORS_ALLOWED_ORIGINS=https://your-frontend-app.onrender.com
   ```

   **Note**: You'll update `APP_CORS_ALLOWED_ORIGINS` after deploying the frontend.

5. Click **"Create Web Service"**

6. **Wait for deployment** (5-10 minutes for first deploy)

7. **Copy your backend URL**: `https://finomo-backend.onrender.com`

---

## 🎨 Step 3: Deploy Frontend (React + Vite)

### 3.1 Update Frontend Environment Variable

Before deploying, update the production API URL:

```bash
cd frontend
```

Edit `.env.production`:
```env
VITE_API_URL=https://finomo-backend.onrender.com/api
```

Commit this change:
```bash
git add .env.production
git commit -m "Update production API URL"
git push
```

### 3.2 Deploy Frontend Static Site

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `finomo-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Add Environment Variable**:
   ```
   VITE_API_URL=https://finomo-backend.onrender.com/api
   ```

5. Click **"Create Static Site"**

6. **Wait for deployment** (3-5 minutes)

7. **Copy your frontend URL**: `https://finomo-frontend.onrender.com`

---

## 🔄 Step 4: Update CORS Configuration

Now that you have your frontend URL, update the backend CORS settings:

1. Go to your backend service in Render Dashboard
2. Navigate to **"Environment"**
3. Update `APP_CORS_ALLOWED_ORIGINS`:
   ```
   APP_CORS_ALLOWED_ORIGINS=https://finomo-frontend.onrender.com
   ```
4. Click **"Save Changes"**
5. The backend will automatically redeploy

---

## ✅ Step 5: Test Your Deployment

1. Visit your frontend URL: `https://finomo-frontend.onrender.com`
2. Try adding an expense
3. Verify filtering and sorting work
4. Check that stats update correctly

---

## 🎯 Important Notes

### Free Tier Limitations

- **Backend**: Spins down after 15 minutes of inactivity
  - First request after inactivity may take 30-60 seconds
  - Subsequent requests are fast
  
- **Database**: 
  - 90-day expiration (free tier)
  - 1GB storage limit
  - Automatic backups not included

- **Frontend**: Always available (static site)

### Keeping Backend Alive (Optional)

To prevent backend from spinning down, you can use a service like [UptimeRobot](https://uptimerobot.com) to ping your backend every 10 minutes.

---

## 🔧 Troubleshooting

### Backend Won't Start

1. Check logs in Render Dashboard
2. Verify all environment variables are set correctly
3. Ensure database URL is the **Internal Database URL**

### Frontend Can't Connect to Backend

1. Check browser console for CORS errors
2. Verify `VITE_API_URL` in frontend environment variables
3. Ensure `APP_CORS_ALLOWED_ORIGINS` includes your frontend URL

### Database Connection Issues

1. Verify database is running in Render Dashboard
2. Check that `SPRING_DATASOURCE_URL` uses the internal URL
3. Ensure PostgreSQL dialect is set correctly

---

## 🔄 Updating Your App

### After Making Changes

```bash
git add .
git commit -m "Your commit message"
git push
```

Render will automatically detect the push and redeploy both services.

---

## 📊 Alternative Free Deployment Options

If you prefer other platforms:

### Option 2: Railway.app
- **Backend**: Railway (free tier)
- **Frontend**: Vercel or Netlify
- **Database**: Railway PostgreSQL

### Option 3: Fly.io
- **Backend**: Fly.io (free tier)
- **Frontend**: Vercel
- **Database**: Fly.io PostgreSQL

---

## 🎉 You're Done!

Your expense tracker is now live and accessible from anywhere!

**Share your deployment URLs**:
- Frontend: `https://finomo-frontend.onrender.com`
- Backend API: `https://finomo-backend.onrender.com/api`

---

## 📝 Post-Deployment Checklist

- [ ] Test adding expenses
- [ ] Test filtering by category
- [ ] Test sorting functionality
- [ ] Verify stats calculations
- [ ] Check mobile responsiveness
- [ ] Share URLs for assessment

---

**Need Help?** Check Render's [documentation](https://render.com/docs) or their community forum.
