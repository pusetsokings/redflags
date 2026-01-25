# 🚨 Remove "witaka" Unauthorized Access - Step by Step

## What We Know:
✅ **Good News:** Vercel is blocking "witaka" from deploying (they're not a team member)
❌ **Bad News:** "witaka" has access to your GitHub repository and is trying to deploy

## IMMEDIATE ACTIONS:

### Step 1: Remove "witaka" from GitHub Repository (CRITICAL)

1. **Go to Repository Settings:**
   ```
   https://github.com/pusetsokings/redflags/settings/access
   ```

2. **Check Collaborators:**
   - Look for "witaka" in the list
   - Click the gear icon next to their name
   - Click "Remove [username]"
   - Confirm removal

3. **Check Teams (if any):**
   - Remove "witaka" from any teams
   - Or remove the entire team if it's unauthorized

4. **Check Deploy Keys:**
   - Go to: Settings → Deploy keys
   - Remove any keys you didn't create
   - Especially any created by "witaka"

### Step 2: Check All Your Repositories

"witaka" might have access to multiple repositories:

1. **Go to:** https://github.com/pusetsokings?tab=repositories
2. **For EACH repository:**
   - Click repository → Settings → Collaborators
   - Remove "witaka" if found
   - Check webhooks
   - Check deploy keys

### Step 3: Review GitHub Activity Log

1. **Go to:** https://github.com/settings/security-log
2. **Look for:**
   - Actions by "witaka"
   - When they were added as collaborator
   - What they accessed
   - Any suspicious activity

### Step 4: Check GitHub Webhooks

1. **Go to:** https://github.com/pusetsokings/redflags/settings/hooks
2. **Review all webhooks:**
   - Check who created them
   - Delete any created by "witaka"
   - Keep only legitimate webhooks (like your Vercel one)

### Step 5: Secure Your GitHub Account

1. **Change Password:**
   - https://github.com/settings/security
   - Use a strong, unique password

2. **Enable 2FA:**
   - Same page → Enable 2FA
   - Use authenticator app

3. **Review Authorized Applications:**
   - https://github.com/settings/applications
   - Revoke any unknown apps
   - Especially any OAuth apps you don't recognize

4. **Check Active Sessions:**
   - Sign out all unknown devices
   - Keep only your current session

### Step 6: Delete Unauthorized Vercel Projects

Even though "witaka" can't deploy, they created projects:

1. **In Vercel Dashboard:**
   - Delete `redflags-mkgl`
   - Delete `redflags-kblg`
   - Delete `redflags` (wheat one)

2. **Keep only:**
   - `redflagstracker` (your main project)
   - Your other legitimate projects

### Step 7: Verify Vercel Connection

1. **In your `redflagstracker` project:**
   - Settings → Git
   - Verify it's connected to YOUR GitHub account
   - Not "witaka's" account

---

## Why This Happened:

Most likely scenarios:
1. **You added "witaka" as collaborator** (maybe by mistake or they asked)
2. **GitHub account compromised** (weak password, no 2FA)
3. **OAuth app granted access** (third-party app got repository access)
4. **Shared repository link** (they got access through a link)

---

## Prevention:

1. ✅ **Never add collaborators you don't know**
2. ✅ **Always use 2FA**
3. ✅ **Review collaborators regularly**
4. ✅ **Use strong passwords**
5. ✅ **Review OAuth app access**
6. ✅ **Monitor repository activity**

---

## After Removing Access:

1. **Monitor for 24-48 hours:**
   - Check GitHub activity log
   - Watch for new unauthorized access
   - Check Vercel for new projects

2. **If "witaka" tries again:**
   - They'll be blocked (Vercel security working)
   - But remove their GitHub access immediately

---

## Quick Checklist:

- [ ] Remove "witaka" from GitHub collaborators
- [ ] Check all repositories for "witaka"
- [ ] Remove unauthorized webhooks
- [ ] Change GitHub password
- [ ] Enable 2FA on GitHub
- [ ] Delete unauthorized Vercel projects
- [ ] Review GitHub activity log
- [ ] Verify Vercel connection is yours

---

## Time Estimate: 15-20 minutes

Do this NOW to secure your account!

