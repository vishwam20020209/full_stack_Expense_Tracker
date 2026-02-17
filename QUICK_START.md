# 🎯 Quick Start - Deploy Finomo

## ✅ Backend is Ready!

Your backend has been successfully built and all missing Java classes have been created:
- ✅ **Expense.java** - JPA Entity model
- ✅ **ExpenseRequest.java** - Request DTO
- ✅ **ExpenseResponse.java** - Response DTO
- ✅ **ExpenseService.java** - Business logic with idempotency
- ✅ **ExpenseController.java** - REST API endpoints
- ✅ **pom.xml** - Maven configuration

**Build Status**: ✅ SUCCESS

---

## 🚀 Deploy to Render (Free - Recommended)

### Step 1: Push to GitHub (5 min)

```bash
# If not already done, create a GitHub repo at: https://github.com/new
# Name it: finomo-expense-tracker

# Then push your code:
git add .
git commit -m "Complete fullstack expense tracker"
git remote add origin https://github.com/YOUR_USERNAME/finomo-expense-tracker.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend (10 min)

1. **Sign up at [Render](https://render.com)** (use GitHub login)

2. **Create PostgreSQL Database**:
   - Click "New +" → "PostgreSQL"
   - Name: `finomo-db`
   - Plan: **Free**
   - Click "Create Database"
   - **Copy the Internal Database URL**

3. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Settings:
     - **Name**: `finomo-backend`
     - **Root Directory**: `backend`
     - **Build Command**: `./mvnw clean package -DskipTests`
     - **Start Command**: `java -jar target/expense-tracker-1.0.0.jar`
     - **Plan**: **Free**
   
4. **Add Environment Variables**:
   ```
   SPRING_DATASOURCE_URL=<Internal Database URL from step 2>
   SPRING_DATASOURCE_USERNAME=<from database page>
   SPRING_DATASOURCE_PASSWORD=<from database page>
   SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
   SPRING_JPA_HIBERNATE_DDL_AUTO=update
   ```

5. Click "Create Web Service" and wait ~10 minutes

6. **Copy your backend URL**: `https://finomo-backend-xxxx.onrender.com`

### Step 3: Deploy Frontend (5 min)

1. **Update frontend/.env.production**:
   ```env
   VITE_API_URL=https://finomo-backend-xxxx.onrender.com/api
   ```

2. **Commit and push**:
   ```bash
   git add frontend/.env.production
   git commit -m "Update production API URL"
   git push
   ```

3. **Create Static Site on Render**:
   - Click "New +" → "Static Site"
   - Connect your GitHub repo
   - Settings:
     - **Name**: `finomo-frontend`
     - **Root Directory**: `frontend`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`
   - Environment Variable:
     ```
     VITE_API_URL=https://finomo-backend-xxxx.onrender.com/api
     ```

4. Click "Create Static Site" and wait ~5 minutes

5. **Your app is live!** 🎉

---

## 🌐 Alternative: Deploy to Railway (Also Free)

### Quick Deploy:
1. Sign up at [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repo
4. Railway will auto-detect Spring Boot and React
5. Add PostgreSQL from Railway marketplace
6. Set environment variables
7. Done!

---

## 📝 After Deployment

### Test Your App:
- ✅ Add an expense
- ✅ Filter by category
- ✅ Sort expenses
- ✅ Check stats display

### Share for Assessment:
- **Live App**: `https://finomo-frontend-xxxx.onrender.com`
- **GitHub**: `https://github.com/YOUR_USERNAME/finomo-expense-tracker`

---

## ⚡ Free Tier Notes

**Render Free Tier**:
- Backend spins down after 15 min inactivity
- First request after sleep takes ~30-60 seconds
- Subsequent requests are fast
- Database: 90-day expiration (can recreate)

**Tip**: Use [UptimeRobot](https://uptimerobot.com) to ping your backend every 10 minutes to keep it awake.

---

## 🆘 Need Detailed Instructions?

See `DEPLOYMENT.md` for:
- Step-by-step screenshots
- Troubleshooting guide
- Alternative deployment options
- CORS configuration details

---

## ✅ You're Ready!

Everything is prepared and tested. Just follow the steps above to deploy! 🚀

**Estimated Total Time**: 20-25 minutes
**Cost**: $0.00
