# 🚨 Remove "witaka" from Deployments

## Current Problem:
- "witaka" appears in "All authors" filter
- This means they're still connected to the Git integration
- They can still trigger deployments

## SOLUTION: Disconnect & Reconnect Git Integration

### Step 1: Disconnect Current Git Integration
1. **Go to:** https://vercel.com/dashboard
2. **Click:** `redflagstracker` project
3. **Click:** Settings → Git
4. **Find:** "Disconnect" or "Remove Git Repository" button
5. **Click:** Disconnect
6. **Confirm** the disconnection

### Step 2: Check Project Members (IMPORTANT!)
Before reconnecting, check if "witaka" has project access:

1. **Still in Settings**
2. **Click:** "Team" or "Members" (left sidebar)
3. **Check:** Is "witaka" listed as a team member?
   - If YES: Remove them immediately
   - If NO: Continue to Step 3

### Step 3: Reconnect with YOUR Account
1. **In Settings → Git**
2. **Click:** "Connect Git Repository"
3. **Select:** GitHub
4. **IMPORTANT:** When authorizing:
   - Check the GitHub username shown
   - Make sure it's YOUR account (`pusetsokings`)
   - NOT "witaka"
5. **Select Repository:** `pusetsokings/redflags`
6. **Select Branch:** `main`
7. **Configure:**
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
8. **Click:** "Deploy"

### Step 4: Verify New Deployment
1. **Wait 1-2 minutes** for deployment
2. **Go to:** Deployments tab
3. **Click:** "All authors" filter
4. **Check:** "witaka" should NOT appear anymore
5. **New deployment should show:** YOUR account

---

## Alternative: Check Vercel GitHub App Integration

"witaka" might have access through the Vercel GitHub App:

1. **Go to:** https://github.com/settings/installations
2. **Find:** "Vercel" in the list
3. **Click:** "Configure"
4. **Check:** Which repositories are connected?
   - Should only be: `pusetsokings/redflags`
   - Remove any other repositories
5. **Check:** "Repository access"
   - Should be: "Only select repositories"
   - NOT "All repositories"

---

## After Reconnecting:

✅ **"witaka" will disappear from "All authors"**  
✅ **Only YOUR account will create deployments**  
✅ **Future deployments will show YOUR account**  
✅ **"witaka" won't be able to trigger deployments**

---

## Quick Checklist:

- [ ] Disconnect Git integration in Vercel
- [ ] Check Project Members - remove "witaka" if present
- [ ] Reconnect Git with YOUR GitHub account
- [ ] Verify "witaka" no longer appears in "All authors"
- [ ] Check Vercel GitHub App integration settings
- [ ] Test new deployment shows YOUR account

---

## Time Estimate: 5 minutes

**Do this now to completely remove "witaka" access!**

