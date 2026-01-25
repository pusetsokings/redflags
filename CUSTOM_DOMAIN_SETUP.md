# 🌐 Custom Domain Setup: flagsense.site

## Step 1: Add Domain in Vercel (5 minutes)

### In Vercel Dashboard:
1. Go to your project
2. Click **Settings** → **Domains**
3. Click **Add Domain**
4. Enter: `flagsense.site`
5. Click **Add**

Vercel will show you DNS records to add.

---

## Step 2: Configure DNS in Hostinger (10 minutes)

### Option A: Use Vercel's Nameservers (Recommended - Easiest)

1. **Get Vercel Nameservers:**
   - In Vercel → Settings → Domains
   - Click on `flagsense.site`
   - Copy the nameservers (usually `ns1.vercel-dns.com` and `ns2.vercel-dns.com`)

2. **Update in Hostinger:**
   - Login to Hostinger
   - Go to **Domains** → **flagsense.site**
   - Click **Manage** → **DNS / Nameservers**
   - Change to **Custom Nameservers**
   - Paste Vercel's nameservers
   - Save

**Wait 24-48 hours for DNS propagation**

---

### Option B: Use Hostinger DNS (Keep Hostinger Nameservers)

If you want to keep Hostinger's nameservers, add these DNS records:

#### A Record (Root Domain)
- **Type:** A
- **Name:** @ (or leave blank)
- **Value:** `76.76.21.21` (Vercel's IP - check Vercel dashboard for current IP)
- **TTL:** 3600

#### CNAME Record (www subdomain)
- **Type:** CNAME
- **Name:** www
- **Value:** `cname.vercel-dns.com`
- **TTL:** 3600

**Note:** Vercel will show you the exact records needed in the dashboard.

---

## Step 3: Verify Domain (Automatic)

1. Vercel will automatically detect DNS changes
2. SSL certificate will be issued automatically (Let's Encrypt)
3. Domain will be active when DNS propagates (usually 24-48 hours)

---

## Step 4: Update Manifest & PWA (Optional)

After domain is active, you can update:
- `manifest.json` - Update start URL if needed
- Service worker - Already configured for any domain

---

## Quick Checklist

- [ ] Domain added in Vercel dashboard
- [ ] DNS records configured in Hostinger
- [ ] Wait for DNS propagation (24-48 hours)
- [ ] Verify SSL certificate issued (automatic)
- [ ] Test `https://flagsense.site` works
- [ ] Test `https://www.flagsense.site` works (if configured)

---

## Troubleshooting

### Domain not working after 48 hours?
1. Check DNS propagation: https://dnschecker.org
2. Verify records in Hostinger match Vercel's requirements
3. Check Vercel dashboard for any errors

### SSL certificate not issued?
- Usually takes 24-48 hours after DNS propagates
- Vercel handles this automatically
- Check Vercel dashboard → Domains for status

### Want to force HTTPS?
- Vercel automatically redirects HTTP → HTTPS
- No additional configuration needed

---

## After Domain is Active

1. **Update any hardcoded URLs** (if any)
2. **Test PWA installation** with custom domain
3. **Update social media links** to use `flagsense.site`
4. **Share your app!** 🚀

---

**Your app will be live at: `https://flagsense.site`**

