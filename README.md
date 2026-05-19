# RapidSite.design

A hand-coded, minimalist portfolio website for trade businesses.

## Setup

1. Open `index.html` in a browser to view the site, or run `python3 -m http.server 8000` from this folder.
2. For production deployment, upload these three files to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, etc.).

## Contact-first flow

There is no checkout, no shopping cart, no Stripe widget on this site. **Every CTA is a `mailto:` to `rapidsitedesigncalyvent@gmail.com`** with a pre-filled subject line and a body template that asks the prospect for their trade, business name, service area, phone, and services.

The four CTA entry points and the subject lines they fire are:

| Location | Subject line |
|---|---|
| Nav `Contact` | `New enquiry` |
| Hero `Start by saying hi` | `New enquiry` |
| Pricing card 1 | `Quick Launch enquiry ($250)` |
| Pricing card 2 | `Full Portfolio enquiry ($300)` |
| Pricing card 3 | `Managed Hosting enquiry ($300 + $20/mo)` |
| Footer email | `New enquiry` |

To change the destination email, search-and-replace `rapidsitedesigncalyvent@gmail.com` across `index.html`. To edit a body template, decode the URL-encoded `body=` parameter on the relevant `<a href="mailto:...">`, edit the plain text, then re-encode (use `encodeURIComponent` in the browser console).

## Sales sequence (off-site)

1. Prospect emails. You reply same day with 1-3 clarifying questions and a fixed quote.
2. Prospect approves the quote. You send a Stripe invoice (or any invoicing tool) for the agreed amount.
3. The moment you mark the invoice paid, you send the &ldquo;starting now&rdquo; email. The 48-hour clock begins from that timestamp.
4. You build, prospect previews, up to 3 revision rounds. Hand off code + screen-recording guide, or take it live on your hosting if they bought managed.

## Design System

**Palette (Construction-Grade Blueprint):**
- Blueprint Blue (#0A3161) - void
- Chalk White (#F5F5F0) - primary text
- Safety Orange (#FF6B35) - accent
- Pencil Graphite (#2C3E50) - secondary text
- Paper Warmth (#F8F4E8) - subtle warmth

**Typography:**
- Instrument Serif (display) - headlines
- Inter (technical) - body text

**Signature Elements:**
- Living texture: Blueprint grid background with radial gradient
- Custom cursor: Orange ring that expands on hover
- Elegant loader: Counting counter (00 → 100) with progress line
- Poetic transitions: Staggered fade-up animations on scroll
- Reactive environment: Section borders illuminate on scroll proximity

## Mobile Perfection

- Custom cursor disabled on touch devices
- Responsive typography with clamp()
- Stacked layouts on mobile
- Touch-friendly button targets (min 48px)
- Optimized viewport meta tag

## License

A Calyvent product.
