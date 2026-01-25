# 🔧 Fix DNS Configuration for flagsense.site

## Current Status
- ✅ Domains added in Vercel: `flagsense.site` and `www.flagsense.site`
- ❌ **Invalid Configuration** - DNS records not set up yet

---

## Step 1: Get DNS Records from Vercel

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Click on `flagsense.site` (the one showing "Invalid Configuration")
3. You'll see DNS configuration instructions
4. Copy the records shown

**Vercel typically shows one of these options:**

### Option A: Use Vercel Nameservers (Easiest)
```
Nameservers:
- ns1.vercel-dns.com
- ns2.vercel-dns.com
```

### Option B: Use DNS Records (Keep Hostinger Nameservers)
```
A Record:
@ → 76.76.21.21 (or IP shown by Vercel)

CNAME Record:
www → cname.vercel-dns.com
```

---

## Step 2: Configure in Hostinger

### If Using Vercel Nameservers (Recommended):

1. **Login to Hostinger**
2. **Go to:** Domains → `flagsense.site` → Manage
3. **Click:** DNS / Nameservers
4. **Select:** Custom Nameservers
5. **Enter:**
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
6. **Save**

**Wait 24-48 hours for DNS propagation**

---

### If Using Hostinger DNS (Keep Hostinger Nameservers):

1. **Login to Hostinger**
2. **Go to:** Domains → `flagsense.site` → Manage
3. **Click:** DNS / Name Servers → DNS Zone Editor
4. **Add/Edit Records:**

   **A Record (Root Domain):**
   - **Type:** A
   - **Name:** @ (or leave blank)
   - **Points to:** `76.76.21.21` (use the IP Vercel shows)
   - **TTL:** 3600 (or default)
   - **Save**

   **CNAME Record (www subdomain):**
   - **Type:** CNAME
   - **Name:** www
   - **Points to:** `cname.vercel-dns.com`
   - **TTL:** 3600 (or default)
   - **Save**

---

## Step 3: Verify DNS Propagation

### Check DNS Status:
1. **In Vercel:** Settings → Domains
   - Status should change from "Invalid Configuration" to "Valid Configuration"
   - This may take 24-48 hours

2. **Check DNS Propagation:**
   - Visit: https://dnschecker.org
   - Enter: `flagsense.site`
   - Check A record points to Vercel's IP

---

## Step 4: SSL Certificate (Automatic)

- Vercel automatically issues SSL certificate after DNS is configured
- Usually takes 24-48 hours after DNS propagates
- No manual setup needed

---

## Troubleshooting

### Still showing "Invalid Configuration" after 48 hours?

1. **Verify DNS records in Hostinger:**
   - Check A record points to correct IP
   - Check CNAME record is correct
   - Ensure no conflicting records

2. **Check Vercel Dashboard:**
   - Click on domain → See what it expects
   - Compare with what you added in Hostinger

3. **Clear DNS Cache:**
   - Your browser: Hard refresh (Cmd+Shift+R)
   - System: `sudo dscacheutil -flushcache` (Mac)

4. **Contact Support:**
   - Vercel support if DNS looks correct
   - Hostinger support if DNS records won't save

---

## Quick Checklist

- [ ] Got DNS records from Vercel dashboard
- [ ] Added nameservers OR DNS records in Hostinger
- [ ] Saved changes in Hostinger
- [ ] Waiting for DNS propagation (24-48 hours)
- [ ] Checked DNS status in Vercel
- [ ] Verified SSL certificate issued

---

## Expected Timeline

- **DNS Propagation:** 24-48 hours
- **SSL Certificate:** Automatic after DNS propagates
- **Status Change:** "Invalid" → "Valid Configuration"

---

**Once DNS propagates, your app will be live at:**
- `https://flagsense.site` (redirects to www)
- `https://www.flagsense.site` (main URL)

