# Katch — Production Agency Website

A launch-ready React/Vite website for Katch, built to generate qualified project enquiries and present Katch as a premium web design and development agency.

## Architecture

- React + Vite static frontend
- React Router multi-page client experience
- Data-driven projects and services
- Optimized local WebP assets and self-hosted fonts
- Optional Vercel Function for contact delivery through Resend
- No database or unnecessary backend infrastructure

## Routes

- `/` — conversion-focused homepage
- `/demos` — complete live demo gallery
- `/demos/smash-burger`
- `/demos/bta3-7awa4y`
- `/demos/raw`
- `/demos/refined-artistry`
- `/services` — complete service directory
- `/process` — detailed four-stage process
- `/about` — positioning, beliefs, and technology approach
- `/contact` — lead-generation form
- Unmatched client routes — branded 404 page

Production rewrites are configured in `vercel.json`; `public/_redirects` provides the equivalent SPA fallback for compatible static hosts.

## Included

- Mobile-first responsive layouts from 320px through 1920px
- Portal-based mobile navigation that is independent of header stacking contexts
- Body scroll locking and exact scroll restoration when menus close
- Escape, outside-click, navigation-link, and repeated-open handling
- Keyboard focus trapping and clear active navigation states
- Editorial demo grid using captures of the four live Katch demos
- Dedicated, refresh-safe demo-detail routes
- Structured services, process, about, contact, and 404 pages
- Validated project request form with honeypot protection
- Vercel/Resend contact endpoint with size validation, origin allowlist, and rate limiting
- Route-specific titles, descriptions, canonical URLs, Open Graph metadata, and robots directives
- Structured data, sitemap, robots.txt, favicon, Apple touch icon, and web manifest
- Reduced-motion support, semantic markup, visible focus states, and responsive touch targets

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run audit:production
npm run preview
```

`audit:production` runs ESLint and creates the optimized Vite build.

## Automated production QA

With the local site running on port 5173:

```bash
npm run qa
```

To test another server:

```bash
QA_BASE_URL=https://your-preview-domain.com npm run qa
```

The QA matrix covers every primary route at 320, 360, 375, 390, 414, 768, 820, 1024, 1280, 1440, and 1920 pixels; all demo-detail routes; direct refresh; 404 behavior; horizontal overflow; broken images; console errors; mobile menu behavior at four scroll positions; body scroll restoration; focus trapping; Escape/outside click; browser history; exact budget selection; form validation; and success UI.

## Make the contact form live

The frontend posts to `/api/contact` by default. `api/contact.js` is a deployable Vercel Function that sends project requests through Resend.

1. Create and verify a sending domain in Resend.
2. Copy `.env.example` to `.env.local` for local use, or configure the variables in the Vercel project settings.
3. Set:
   - `RESEND_API_KEY`
   - `KATCH_CONTACT_EMAIL` — the real inbox that should receive enquiries
   - `RESEND_FROM_EMAIL` — an address on the verified sending domain
   - `ALLOWED_ORIGINS` — the final production URL(s), comma-separated
4. Deploy and submit a real end-to-end test request.

Never commit `.env.local` or production credentials. To use another provider, set `VITE_CONTACT_ENDPOINT` to a production endpoint that accepts the same JSON payload.

## Before connecting the final domain

The SEO files currently use `https://katch.agency/`. If the final domain is different, replace it in:

- `index.html`
- `src/components/PageMeta.jsx`
- `public/robots.txt`
- `public/sitemap.xml`

Then update `ALLOWED_ORIGINS` and run a fresh production build.

## Vercel deployment

1. Import this folder as a new Vercel project.
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add the contact environment variables.
6. Deploy, connect the real domain, refresh every route directly, and submit a live form test.

`vercel.json` contains route rewrites, immutable asset caching, and baseline security headers.

## Updating content

- Demo content and detail narratives: `src/data/projects.js`
- Services and process: `src/data/services.js`
- Route pages: `src/pages/`
- Shared components: `src/components/`

To recapture and optimize project homepages:

```bash
npx playwright install chromium
npx playwright install-deps chromium
node scripts/capture-projects.mjs
python3 scripts/optimize-project-images.py
```

To regenerate brand assets after replacing the supplied source artwork:

```bash
python3 scripts/prepare-logo.py
node scripts/generate-brand-assets.mjs
```
