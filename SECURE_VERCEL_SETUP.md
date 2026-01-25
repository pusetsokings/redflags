# 🔒 Secure Vercel Setup Guide

## ✅ Step 1: Code Pushed to GitHub (COMPLETE)
- ✅ Repository: https://github.com/pusetsokings/redflags
- ✅ All files committed and pushed
- ✅ Git configured with secure email

---

## 🔐 Step 2: Connect to Vercel (Do This Now)

### Option A: Via Vercel Dashboard (Recommended - More Secure)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Make sure you're logged in with YOUR account (not Witaka's)

2. **Create New Project**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Select: `pusetsokings/redflags`
   - Click "Import"

3. **Configure Project Settings**
   - **Project Name**: `flagsense` (or your choice)
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Security Settings** ⚠️ IMPORTANT
   - Scroll down to "Environment Variables" (we'll add these later if needed)
   - **DO NOT** add any collaborators yet
   - Click "Deploy"

5. **Verify Deployment**
   - Wait for build to complete (~1-2 minutes)
   - Check that deployment shows YOUR account as creator
   - Test the production URL

---

### Option B: Via Vercel CLI (Alternative)

If you prefer CLI, run:
```bash
cd "/Users/imac/Documents/Improve Red Flags Tracker App"
vercel
```

Then follow prompts:
- Set up and deploy? **Yes**
- Which scope? **Your account** (not any team)
- Link to existing project? **No**
- Project name? **flagsense**
- Directory? **./**
- Override settings? **No**

Then deploy to production:
```bash
vercel --prod
```

---

## 🔒 Step 3: Verify Security Settings

After deployment, verify these security settings:

1. **Go to Project Settings**
   - Vercel Dashboard → Your Project → Settings

2. **Check Git Integration**
   - Settings → Git
   - Verify it shows: `pusetsokings/redflags`
   - Verify "Connected by" shows YOUR account

3. **Check Team/Collaborators**
   - Settings → General → Team
   - Should show only YOUR account
   - If you see "Witaka" or anyone else, remove them immediately

4. **Check Deployment Protection**
   - Settings → Git → Deployment Protection
   - Enable "Require approval for deployments" if you want extra security
   - This prevents unauthorized deployments

5. **Check Environment Variables**
   - Settings → Environment Variables
   - Should be empty (unless you add API keys later)
   - These are private and secure

---

## 🚫 Step 4: Remove Any Unauthorized Access

If you see "Witaka" or any unauthorized users:

1. **Remove from Team**
   - Settings → General → Team
   - Click "..." next to unauthorized user
   - Click "Remove from Team"

2. **Check Git Repository Access**
   - Go to: https://github.com/pusetsokings/redflags/settings/access
   - Verify only YOUR account has access
   - Remove any unauthorized collaborators

3. **Revoke Vercel Access** (if needed)
   - Go to: https://github.com/settings/applications
   - Find "Vercel" in authorized applications
   - Click "Revoke" if it was authorized by someone else
   - Re-authorize with YOUR account

---

## ✅ Step 5: Verify Everything Works

1. **Test Production URL**
   - Visit your Vercel deployment URL
   - Test all features
   - Verify app loads correctly

2. **Check Deployment History**
   - Vercel Dashboard → Deployments
   - Verify all deployments show YOUR account
   - No deployments from "Witaka"

3. **Test Auto-Deploy**
   - Make a small change
   - Push to GitHub: `git push`
   - Verify Vercel auto-deploys
   - Check deployment shows YOUR account

---

## 🔐 Security Best Practices

### ✅ DO:
- ✅ Use YOUR GitHub account only
- ✅ Use YOUR Vercel account only
- ✅ Keep `.vercel` folder in `.gitignore` (already done)
- ✅ Use environment variables for secrets (never commit them)
- ✅ Enable 2FA on both GitHub and Vercel
- ✅ Regularly check team/collaborator settings

### ❌ DON'T:
- ❌ Share Vercel project access with unauthorized users
- ❌ Commit `.vercel` folder to git
- ❌ Commit API keys or secrets
- ❌ Use shared accounts
- ❌ Skip security checks

---

## 📝 Quick Commands Reference

```bash
# Check git status
git status

# Push changes
git add .
git commit -m "Your message"
git push

# Deploy manually (if needed)
vercel --prod

# Check Vercel projects
vercel ls
```

---

## 🆘 If You See "Witaka" or Unauthorized Access

1. **Immediately remove from Vercel**
   - Settings → General → Team → Remove user

2. **Check GitHub repository**
   - https://github.com/pusetsokings/redflags/settings/access
   - Remove unauthorized collaborators

3. **Revoke and re-authorize Vercel**
   - GitHub Settings → Applications → Revoke Vercel
   - Re-connect in Vercel Dashboard

4. **Verify new deployments**
   - All new deployments should show YOUR account

---

## ✅ Success Checklist

- [ ] Code pushed to GitHub successfully
- [ ] Vercel project created with YOUR account
- [ ] Git integration connected to YOUR repo
- [ ] No unauthorized users in team/collaborators
- [ ] Deployment successful and working
- [ ] Production URL accessible
- [ ] Auto-deploy working (test with a push)

---

**Your app is now secure and ready! 🎉**
