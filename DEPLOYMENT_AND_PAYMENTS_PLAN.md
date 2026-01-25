# 🚀 Deployment & Payment Integration Plan

## Current Status
✅ **App is feature-complete and ready for deployment**
✅ **UpgradeModal UI exists** (needs payment integration)
✅ **Pricing strategy defined** (Freemium with sliding scale)

---

## Phase 1: Vercel Deployment (30 minutes)

### Step 1: Prepare for Vercel
1. **Create `vercel.json`** (if needed for routing)
2. **Update build output** (Vite already configured)
3. **Test production build locally**

### Step 2: Deploy to Vercel
1. **Install Vercel CLI** (if not already)
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Configure Environment Variables** (if needed)
   - None required for basic deployment
   - Add Cohere API key as optional env var later

### Step 3: Custom Domain (Optional)
- Connect your domain in Vercel dashboard
- SSL automatically handled

**Estimated Time:** 30 minutes
**Cost:** Free tier (more than enough for launch)

---

## Phase 2: Lemon Squeezy Integration (2-3 hours)

### Why Lemon Squeezy?
✅ **Perfect for web apps** (no app store needed)
✅ **Handles subscriptions** (monthly/annual)
✅ **GDPR compliant**
✅ **Low fees** (3.5% + $0.30)
✅ **Easy integration** (API + checkout links)
✅ **Supports sliding scale pricing**

### Step 1: Set Up Lemon Squeezy Account
1. Sign up at [lemonsqueezy.com](https://lemonsqueezy.com)
2. Create products:
   - Premium Monthly ($4.99)
   - Premium Annual ($29.99)
   - Financial Hardship ($1.99)
3. Get API keys (Store API Key, Webhook Secret)

### Step 2: Install Lemon Squeezy SDK
```bash
npm install @lemonsqueezy/lemonsqueezy.js
```

### Step 3: Create Payment Service
Create `src/lib/payments.ts`:
- Handle checkout creation
- Verify webhooks
- Check subscription status
- Store subscription in localStorage (encrypted)

### Step 4: Update UpgradeModal
- Replace placeholder with real Lemon Squeezy checkout
- Add subscription status checking
- Handle webhook verification

### Step 5: Add Premium Feature Gating
- Check subscription status before premium features
- Show upgrade prompts gracefully
- Never block core safety features

**Estimated Time:** 2-3 hours
**Cost:** 3.5% + $0.30 per transaction

---

## Phase 3: Environment Setup

### Create `.env.example`
```env
# Lemon Squeezy
VITE_LEMONSQUEEZY_STORE_ID=your_store_id
VITE_LEMONSQUEEZY_API_KEY=your_api_key
VITE_LEMONSQUEEZY_WEBHOOK_SECRET=your_webhook_secret

# Cohere (Optional - for Enhanced AI)
VITE_COHERE_API_KEY=your_cohere_key
```

### Update `vite.config.ts`
```typescript
// Add env variable support
define: {
  'process.env.VITE_LEMONSQUEEZY_STORE_ID': JSON.stringify(process.env.VITE_LEMONSQUEEZY_STORE_ID),
}
```

---

## Phase 4: Webhook Handler (Optional - for server-side verification)

### Option A: Vercel Serverless Function
Create `api/webhook/lemonsqueezy.ts`:
- Verify webhook signature
- Update subscription status
- Store in database (if you add one later)

### Option B: Client-Side Only (Simpler)
- Use Lemon Squeezy's JavaScript SDK
- Check subscription status on app load
- Store subscription data in encrypted localStorage

**Recommendation:** Start with Option B, upgrade to Option A later if needed.

---

## Implementation Checklist

### Deployment (Vercel)
- [ ] Test production build: `npm run build`
- [ ] Install Vercel CLI
- [ ] Deploy to Vercel
- [ ] Configure custom domain (optional)
- [ ] Test PWA installation
- [ ] Verify service worker works
- [ ] Test offline mode
- [ ] Check all routes work

### Payment Integration (Lemon Squeezy)
- [ ] Create Lemon Squeezy account
- [ ] Create products (Monthly, Annual, Reduced)
- [ ] Get API keys
- [ ] Install `@lemonsqueezy/lemonsqueezy.js`
- [ ] Create `src/lib/payments.ts`
- [ ] Update `UpgradeModal.tsx` with real checkout
- [ ] Add subscription status checking
- [ ] Implement premium feature gating
- [ ] Test checkout flow
- [ ] Test subscription renewal
- [ ] Test cancellation flow
- [ ] Add "Restore Purchase" functionality

### Premium Features to Gate
- [ ] Advanced red flag patterns (beyond 8 basic ones)
- [ ] Unlimited AI chat (vs 5/day free)
- [ ] Advanced visualizations
- [ ] PDF export
- [ ] Relationship health assessments
- [ ] Disguised mode
- [ ] Biometric unlock (future)

### Testing
- [ ] Test free tier (all core features work)
- [ ] Test premium checkout
- [ ] Test subscription status persistence
- [ ] Test feature gating (premium features blocked for free users)
- [ ] Test restore purchase
- [ ] Test cancellation
- [ ] Test on mobile devices
- [ ] Test PWA installation

---

## Quick Start Commands

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Build for Production
```bash
npm run build
# Output in 'build' directory
```

### Test Production Build Locally
```bash
npm run build
npx serve build
```

---

## Cost Breakdown

### Vercel
- **Free Tier:** Perfect for launch
  - 100GB bandwidth/month
  - Unlimited deployments
  - Automatic SSL
  - Custom domain support

### Lemon Squeezy
- **Transaction Fee:** 3.5% + $0.30
- **Example:** $4.99 subscription = $0.47 fee
- **No monthly fees**
- **No setup costs**

### Total Monthly Costs
- **Vercel:** $0 (free tier)
- **Lemon Squeezy:** $0 (pay per transaction)
- **Total:** $0/month (until you need to scale)

---

## Next Steps Priority

1. **Deploy to Vercel** (30 min) - Get it live!
2. **Set up Lemon Squeezy** (1 hour) - Create account & products
3. **Integrate payments** (2 hours) - Connect checkout
4. **Test everything** (1 hour) - Full flow testing
5. **Launch!** 🚀

---

## Security Considerations

### Payment Data
- ✅ Lemon Squeezy handles all payment processing
- ✅ No credit card data touches your app
- ✅ PCI compliance handled by Lemon Squeezy

### Subscription Storage
- ✅ Store subscription status in encrypted localStorage
- ✅ Verify subscription on app load
- ✅ Handle subscription expiry gracefully

### Webhook Security
- ✅ Verify webhook signatures
- ✅ Use HTTPS for all webhook endpoints
- ✅ Validate webhook payloads

---

## Support & Documentation

### Lemon Squeezy Docs
- [Lemon Squeezy API Docs](https://docs.lemonsqueezy.com)
- [Checkout Integration](https://docs.lemonsqueezy.com/help/checkout)
- [Webhooks Guide](https://docs.lemonsqueezy.com/help/webhooks)

### Vercel Docs
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/concepts/projects/domains)

---

**Ready to deploy? Let's start with Vercel! 🚀**

