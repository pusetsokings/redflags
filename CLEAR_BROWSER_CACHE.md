# 🔧 Clear Browser Cache - Fix Cached JavaScript Errors

## The Problem:
Your browser (and service worker) is caching old JavaScript files, causing:
- `allEntries is not defined` errors
- `payload` errors in charts
- "Loading forever" when switching tabs

## ✅ LATEST FIXES (Deployed):
1. **Added 3-second timeout** to prevent hanging
2. **Added loading indicator** so you know something is happening
3. **Changed service worker** to use "network-first" for JavaScript files (always gets latest version)

## SOLUTION: Clear Cache & Unregister Service Worker

### Method 1: Unregister Service Worker (RECOMMENDED)

1. **Open DevTools:**
   - Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)

2. **Go to Application Tab:**
   - Click "Application" (or "Storage" in some browsers)

3. **Unregister Service Worker:**
   - Click "Service Workers" in left sidebar
   - Find the service worker for `flagsense.site`
   - Click "Unregister"

4. **Clear Cache:**
   - Click "Cache Storage" in left sidebar
   - Right-click each cache (flagsense-v1, flagsense-runtime-v1)
   - Click "Delete"
   - Or click "Clear site data" button at top

5. **Hard Refresh:**
   - Press `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

### Method 2: Clear All Site Data

1. **Open DevTools** (F12)
2. **Application Tab** → **Storage** section
3. **Click "Clear site data"** button
4. **Refresh** the page

### Method 3: Browser Settings

**Chrome/Edge:**
1. Settings → Privacy → Clear browsing data
2. Select "Cached images and files"
3. Time range: "All time"
4. Clear data

**Firefox:**
1. Settings → Privacy & Security
2. Cookies and Site Data → Clear Data
3. Check "Cached Web Content"
4. Clear

**Safari:**
1. Develop → Empty Caches
2. Or: Safari → Clear History → All History

---

## After Clearing Cache:

1. **Wait 1-2 minutes** for new deployment (commit `951ed1f`)
2. **Refresh** https://flagsense.site
3. **Errors should be gone!**

---

## If Errors Persist:

The new deployment should have:
- Fixed `allEntries` scope issue
- Fixed chart `payload` issue
- Updated service worker cache version (v2)

If you still see errors after clearing cache, the new deployment might not be ready yet. Wait 2-3 minutes and try again.

