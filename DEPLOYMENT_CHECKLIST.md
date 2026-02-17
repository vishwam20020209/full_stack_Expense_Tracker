# ✅ Deployment Checklist

Track your deployment progress with this checklist.

## Pre-Deployment ✅
- [x] Backend code complete
- [x] Frontend code complete  
- [x] All Java classes created
- [x] Backend builds successfully
- [x] pom.xml configured
- [x] .env.production created
- [ ] GitHub repository created
- [ ] Code pushed to GitHub

## Render Account Setup
- [ ] Render account created at https://render.com
- [ ] GitHub connected to Render

## Database Deployment
- [ ] PostgreSQL database created on Render
- [ ] Database name: `finomo-db`
- [ ] Database credentials copied:
  - [ ] Internal Database URL
  - [ ] Username
  - [ ] Password

## Backend Deployment
- [ ] Backend web service created
- [ ] Service name: `finomo-backend`
- [ ] GitHub repository connected
- [ ] Root directory set to: `backend`
- [ ] Build command: `./mvnw clean package -DskipTests`
- [ ] Start command: `java -jar target/expense-tracker-1.0.0.jar`
- [ ] Environment variables configured:
  - [ ] SPRING_DATASOURCE_URL
  - [ ] SPRING_DATASOURCE_USERNAME
  - [ ] SPRING_DATASOURCE_PASSWORD
  - [ ] SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT
  - [ ] SPRING_JPA_HIBERNATE_DDL_AUTO
- [ ] Backend deployed successfully
- [ ] Backend URL copied: ___________________________

## Frontend Deployment
- [ ] .env.production updated with backend URL
- [ ] Changes committed and pushed
- [ ] Static site created on Render
- [ ] Service name: `finomo-frontend`
- [ ] Root directory set to: `frontend`
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `dist`
- [ ] Environment variable added: VITE_API_URL
- [ ] Frontend deployed successfully
- [ ] Frontend URL copied: ___________________________

## Testing
- [ ] Frontend loads without errors
- [ ] Can add new expense
- [ ] Expenses display in list
- [ ] Category filter works
- [ ] Date sorting works
- [ ] Stats calculate correctly
- [ ] Toast notifications appear
- [ ] Mobile responsive design works
- [ ] No console errors

## Documentation
- [ ] GitHub README updated (if needed)
- [ ] Deployment URLs documented

## Ready to Share
- [ ] Frontend URL ready
- [ ] GitHub repository URL ready
- [ ] App fully tested

---

## 📝 Your Deployment URLs

**Frontend (Live App)**: 

_______________________________________________

**Backend API**: 

_______________________________________________

**GitHub Repository**: 

_______________________________________________

**Database**: PostgreSQL on Render (Internal)

---

## 📅 Deployment Timeline

**Started**: _______________________________________________

**Backend Deployed**: _______________________________________________

**Frontend Deployed**: _______________________________________________

**Testing Completed**: _______________________________________________

---

## 💡 Notes & Issues

Record any issues encountered or important notes:

_______________________________________________

_______________________________________________

_______________________________________________

_______________________________________________

---

## 🎉 Completion

- [ ] All checklist items completed
- [ ] App is live and accessible
- [ ] URLs shared for assessment

**Congratulations! Your fullstack app is deployed! 🚀**
