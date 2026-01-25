# 🚀 Quick Deploy Guide - Vercel + Lemon Squeezy

## Step 1: Deploy to Vercel (15 minutes)

### 1.1 Install Vercel CLI
```bash
npm i -g vercel
```

### 1.2 Login
```bash
vercel login
```

### 1.3 Deploy
```bash
# From project root
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name? flagsense (or your choice)
# - Directory? ./
# - Override settings? No
```

### 1.4 Deploy to Production
```bash
vercel --prod
```

### 1.5 Configure Environment Variables (in Vercel Dashboard)
1. Go to your project on vercel.com
2. Settings → Environment Variables
3. Add:
   - `VITE_LEMONSQUEEZY_STORE_ID`
   - `VITE_LEMONSQUEEZY_VARIANT_MONTHLY`
   - `VITE_LEMONSQUEEZY_VARIANT_ANNUAL`
   - `VITE_LEMONSQUEEZY_VARIANT_REDUCED`

**Done! Your app is live! 🎉**

---

## Step 2: Set Up Lemon Squeezy (30 minutes)

### 2.1 Create Account
1. Go to [lemonsqueezy.com](https://lemonsqueezy.com)
2. Sign up (free)
3. Complete store setup

### 2.2 Create Products
Create 3 products:

**Product 1: Premium Monthly**
- Name: "FlagSense Premium - Monthly"
- Price: $4.99
- Billing: Recurring (Monthly)
- Copy the Variant ID

**Product 2: Premium Annual**
- Name: "FlagSense Premium - Annual"
- Price: $29.99
- Billing: Recurring (Yearly)
- Copy the Variant ID

**Product 3: Financial Hardship**
- Name: "FlagSense Premium - Financial Hardship"
- Price: $1.99
- Billing: Recurring (Monthly)
- Copy the Variant ID

### 2.3 Get Store ID
1. Go to Settings → Store
2. Copy your Store ID

### 2.4 Add to Vercel Environment Variables
Add all IDs to Vercel dashboard:
- `VITE_LEMONSQUEEZY_STORE_ID`
- `VITE_LEMONSQUEEZY_VARIANT_MONTHLY`
- `VITE_LEMONSQUEEZY_VARIANT_ANNUAL`
- `VITE_LEMONSQUEEZY_VARIANT_REDUCED`

### 2.5 Redeploy
```bash
vercel --prod
```

**Done! Payments are live! 💳**

---

## Step 3: Test Everything (15 minutes)

### Test Checklist
- [ ] App loads on Vercel URL
- [ ] PWA installs correctly
- [ ] Service worker works (offline mode)
- [ ] Upgrade modal opens
- [ ] Checkout links work
- [ ] Can complete test purchase
- [ ] Subscription status saves
- [ ] Premium features unlock after purchase

---

## Troubleshooting

### Build Fails on Vercel
- Check `vercel.json` is correct
- Ensure `package.json` has build script
- Check Node version (Vercel auto-detects)

### Payments Not Working
- Verify environment variables are set
- Check variant IDs are correct
- Test checkout URL manually
- Check browser console for errors

### PWA Not Installing
- Verify `manifest.json` exists
- Check service worker is registered
- Ensure HTTPS (Vercel provides automatically)

---

## Next Steps After Launch

1. **Monitor Analytics** (Vercel Analytics - free)
2. **Set Up Webhooks** (optional - for server-side verification)
3. **Add Custom Domain** (optional)
4. **Marketing** (share your app!)

---

**Total Time: ~1 hour**
**Cost: $0/month (until you scale)**

**You're ready to launch! 🚀**

