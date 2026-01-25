# 🔍 Find Root Directory Setting in Vercel

## The Root Directory setting is NOT in General settings

It's in **Build & Development Settings**.

### Step 1: Go to Build Settings
1. **In Vercel Dashboard:**
   - Click: `redflagstracker` project
   - Click: **Settings** (top menu)
   - Click: **"Build & Development Settings"** (left sidebar)
   - **NOT** "General"

### Step 2: Find Root Directory
Look for:
- **"Root Directory"** field
- Should be near the top, with:
  - Framework Preset
  - Build Command
  - Output Directory
  - Install Command

### Step 3: Check/Update Root Directory
- **Current value:** What does it show?
  - Should be: `.` or empty
  - If it shows anything else (like a folder name), that's the problem
- **Set it to:** `.` (dot) or leave empty
- **Click:** "Save"

### Step 4: Also Check These Settings
While you're there, verify:
- **Framework Preset:** Should be "Other" (not "Vite")
- **Build Command:** `npm install && npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Step 5: Redeploy
1. **Go to:** Deployments tab
2. **Click:** "Redeploy" on latest deployment
3. **Or:** Wait for auto-deploy from new commit

---

## If You Can't Find "Build & Development Settings":

It might be called:
- "Build Settings"
- "Build & Output Settings"
- Or it might be in the main Settings page (scroll down)

Look for any section that has:
- Build Command
- Output Directory
- Framework Preset

The Root Directory should be in that same section.

---

**Go to Settings → Build & Development Settings and tell me what you see!**

