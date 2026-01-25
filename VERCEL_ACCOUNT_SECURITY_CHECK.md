# 🔒 Vercel Account Security Check Guide

## Step-by-Step Verification

### 1. Check Your Vercel Account
1. Go to: https://vercel.com/account
2. Check:
   - **Username/Email**: What account are you logged into?
   - **Profile Name**: Does it match "witaka" or something else?

### 2. Check Project Ownership
1. Go to: https://vercel.com/dashboard
2. Click on your **FlagSense/redflags** project
3. Go to **Settings** → **General**
4. Check:
   - **Project Name**: Should be your project
   - **Team**: Should show "Personal" (not a team)
   - **Connected Git Repository**: Should show `pusetsokings/redflags`

### 3. Check Team Members (Should be Empty)
1. In your project: **Settings** → **Team**
2. **Team Members**: Should be empty (just you)
3. If you see "witaka" here, that's the issue - remove them

### 4. Check Git Integration
1. In your project: **Settings** → **Git**
2. Check:
   - **Repository**: Should be `pusetsokings/redflags`
   - **Production Branch**: Should be `main`
   - **Deployment Protection**: Check if enabled

### 5. Check Deployment History
1. In your project: **Deployments** tab
2. Click on the latest deployment
3. Check:
   - **Created By**: Who triggered it?
   - **Git Commit Author**: Should show "imac" (from GitHub)

---

## If "witaka" Appears Anywhere

### Scenario A: "witaka" is Your Vercel Username
- **Action**: This is fine - it's just your Vercel account name
- **No action needed** - commits are still from "imac" on GitHub

### Scenario B: "witaka" is a Team Member
- **Action**: Remove them immediately
- **Steps**:
  1. Settings → Team
  2. Find "witaka"
  3. Click "Remove" or "Revoke Access"

### Scenario C: "witaka" is the Project Owner
- **Action**: Transfer project to your account
- **Steps**:
  1. Settings → General
  2. Scroll to "Transfer Project"
  3. Transfer to your account

---

## Make Project Private (Verify)

### Current Privacy Settings
1. Go to: **Settings** → **General**
2. Check:
   - **Visibility**: Should be "Private" (not "Public")
   - **Deployment Protection**: Consider enabling

### Additional Security
1. **Settings** → **Git**
   - Enable "Deployment Protection" if available
   - Require approval for deployments

2. **Settings** → **Environment Variables**
   - Verify only you can see/edit these
   - No shared access

---

## Quick Security Checklist

- [ ] Project is set to "Private"
- [ ] No team members added
- [ ] Only your GitHub account is connected
- [ ] Environment variables are secure
- [ ] Deployment protection enabled (optional)
- [ ] Your Vercel account email matches your GitHub email

---

## If You Find Unauthorized Access

1. **Immediately**:
   - Remove unauthorized team members
   - Change Vercel account password
   - Revoke and reconnect GitHub integration

2. **Verify**:
   - Check all deployments
   - Review environment variables
   - Check domain connections

3. **Secure**:
   - Enable 2FA on Vercel
   - Enable 2FA on GitHub
   - Review GitHub repository collaborators

---

## Need Help?

If you find "witaka" as a team member or owner and it's not you:
1. Take a screenshot of the settings
2. Remove their access immediately
3. Contact Vercel support if needed


