#!/bin/bash

# Deployment preparation script for Finomo

echo "🚀 Preparing Finomo for deployment..."

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Finomo expense tracker"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if remote is set
if ! git remote | grep -q origin; then
    echo ""
    echo "⚠️  No remote repository found!"
    echo "Please create a GitHub repository and run:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/finomo-expense-tracker.git"
    echo "git push -u origin main"
else
    echo "✅ Remote repository configured"
    echo ""
    echo "📤 Current remote:"
    git remote -v
fi

echo ""
echo "📋 Deployment Checklist:"
echo "  1. ✅ pom.xml created for backend"
echo "  2. ✅ .env.production created for frontend"
echo "  3. ✅ DEPLOYMENT.md guide created"
echo ""
echo "📖 Next Steps:"
echo "  1. Push your code to GitHub (if not done)"
echo "  2. Follow the instructions in DEPLOYMENT.md"
echo "  3. Deploy to Render (free tier)"
echo ""
echo "📚 Read DEPLOYMENT.md for detailed instructions!"
