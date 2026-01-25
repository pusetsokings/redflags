# 🔍 Check Integrations & Vercel Access

## Current Status:
✅ **GitHub Collaborators:** No "witaka" found (good!)
❌ **Issue:** "witaka" is still trying to deploy to Vercel

## This Means:
"witaka" has access through:
1. **GitHub Integration** (Vercel/Netlify/Bolt.new)
2. **Vercel Account Access** (team member or shared account)
3. **OAuth App** (through one of the integrations)
4. **Webhook** (configured by them)

## IMMEDIATE CHECKS:

### Step 1: Check GitHub Integrations (CRITICAL)
1. **Go to:** https://github.com/settings/installations
2. **Check each integration:**
   - **Vercel** - Click "Configure"
     - Check "Repository access"
     - See if it's shared with other accounts
     - Check "witaka" access
   - **Netlify** - Same check
   - **Bolt.new** - Same check
   - **ChatGPT Codex Connector** - Same check

3. **For Vercel specifically:**
   - Click "Configure" on Vercel integration
   - Check "Repository access" section
   - See if "witaka" is listed
   - If found, remove them

### Step 2: Check Vercel Account Access
1. **Go to:** https://vercel.com/dashboard
2. **Check your account:**
   - Settings → Team (we already checked - empty)
   - But check if "witaka" is in your personal account somehow

3. **Check each project:**
   - `redflagstracker` → Settings → Team
   - `redflags-mkgl` → Settings → Team (if still exists)
   - `redflags-kblg` → Settings → Team (if still exists)
   - See if "witaka" is listed anywhere

### Step 3: Check GitHub Webhooks
1. **Go to:** https://github.com/pusetsokings/redflags/settings/hooks
2. **Review all webhooks:**
   - Check destination URLs
   - Check who created them
   - Look for any pointing to "witaka's" Vercel account
   - Delete suspicious ones

### Step 4: Check OAuth Apps
1. **Go to:** https://github.com/settings/applications
2. **Check:**
   - Authorized OAuth Apps
   - Authorized GitHub Apps
   - Look for any you don't recognize
   - Especially check Vercel-related apps

### Step 5: Review Vercel Integration Settings
1. **In Vercel Dashboard:**
   - Settings → Git
   - Check which GitHub account is connected
   - Verify it's YOUR account, not "witaka's"

2. **Check Integration Permissions:**
   - See if integration is shared
   - Check repository access levels

---

## Most Likely Scenarios:

### Scenario 1: Vercel Integration is Shared
- **Check:** GitHub Settings → Installations → Vercel → Configure
- **Action:** Restrict to only your account
- **Why:** Integration might be shared with "witaka"

### Scenario 2: "witaka" Has Vercel Account Access
- **Check:** Vercel Dashboard → Each project → Settings → Team
- **Action:** Remove from all projects
- **Why:** They might have been added to specific projects

### Scenario 3: Webhook Points to "witaka's" Vercel
- **Check:** GitHub → Repository → Settings → Webhooks
- **Action:** Delete suspicious webhooks
- **Why:** Webhook might be triggering deployments to their account

### Scenario 4: OAuth App Grants Access
- **Check:** GitHub Settings → Applications
- **Action:** Revoke suspicious apps
- **Why:** OAuth app might grant "witaka" access

---

## Action Plan:

### Priority 1: Check Vercel Integration (5 minutes)
```
https://github.com/settings/installations
→ Find "Vercel" → Configure
→ Check repository access
→ Restrict if needed
```

### Priority 2: Check Vercel Projects (3 minutes)
```
Vercel Dashboard → Each project → Settings → Team
→ Remove "witaka" if found
```

### Priority 3: Check Webhooks (2 minutes)
```
https://github.com/pusetsokings/redflags/settings/hooks
→ Review all webhooks
→ Delete suspicious ones
```

### Priority 4: Check OAuth Apps (2 minutes)
```
https://github.com/settings/applications
→ Review authorized apps
→ Revoke suspicious ones
```

---

## Why This Is Happening:

Since "witaka" is NOT a GitHub collaborator, they must have access through:
1. **Integration sharing** (most likely)
2. **Vercel account access** (team member on projects)
3. **Webhook configuration** (pointing to their Vercel)
4. **OAuth app** (granting them access)

---

## Next Steps:

1. **Check GitHub Integrations FIRST** (Vercel integration)
2. **Check Vercel project teams** (each project)
3. **Review webhooks** (suspicious ones)
4. **Check OAuth apps** (revoke suspicious)

Start with checking the Vercel integration in GitHub Settings → Installations.


