# Katch — Production Agency Website

A launch-ready React/Vite website for Katch, built to generate qualified project enquiries and present Katch as a premium web design and development agency.

## Included

- Conversion-focused agency homepage
- Editorial selected-work layout using captures of the four live projects
- Accessible, deep-linkable case study experiences (`?case=project-id`)
- Responsive navigation and polished mobile menu
- Services, principles, process, technology, CTA, and contact sections
- Validated project request form
- Vercel serverless contact endpoint with Resend delivery
- Honeypot, request-size validation, origin allowlist, and basic rate limiting
- Self-hosted fonts and optimized local project images
- Open Graph image, favicon, Apple touch icon, manifest, robots.txt, sitemap, and JSON-LD
- Reduced-motion support, semantic markup, visible focus states, and keyboard-friendly interactions

## Run locally

```bash
npm install
npm run dev
```

The local website runs on the URL Vite prints in the terminal.

## Production build

```bash
npm run audit:production
npm run preview
```

`audit:production` runs ESLint and creates the optimized Vite build.

## Make the contact form live

The frontend posts to `/api/contact` by default. `api/contact.js` is a deployable Vercel Function that sends project requests through Resend.

1. Create and verify a sending domain in Resend.
2. Copy `.env.example` to `.env.local` for local use, or configure the variables in the Vercel project settings.
3. Set:
   - `RESEND_API_KEY`
   - `KATCH_CONTACT_EMAIL` — the real inbox that should receive enquiries
   - `RESEND_FROM_EMAIL` — an address on the verified sending domain
   - `ALLOWED_ORIGINS` — the final production URL(s), comma-separated
4. Deploy to Vercel and submit a real test request.

Never commit `.env.local` or production credentials. If another provider is preferred, set `VITE_CONTACT_ENDPOINT` to a Formspree, Firebase, Supabase, or custom endpoint that accepts the same JSON payload.

## Before connecting the final domain

The SEO files currently use `https://katch.agency/` as the canonical production URL. If the final domain is different, replace it in:

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`

Then update `ALLOWED_ORIGINS` and run a fresh production build.

## Deployment

### Vercel (recommended)

1. Import this folder as a new Vercel project.
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add the contact environment variables listed above.
6. Deploy, connect the real domain, and submit a test project request.

`vercel.json` adds durable caching for fonts/project images and baseline security headers.

### Other hosts

The static site can deploy to Netlify, Cloudflare Pages, or another Vite-compatible platform. Recreate `api/contact.js` using that platform's function format, or set `VITE_CONTACT_ENDPOINT` to an existing production form service.

## Updating selected work

Project content is centralized in `src/data/projects.js`. Replace the project object and preview image there; the portfolio card and case study update together.

To recapture the current live project homepages:

```bash
npx playwright install chromium
npx playwright install-deps chromium
node scripts/capture-projects.mjs
python3 scripts/optimize-project-images.py
```

## Quality checks completed

- Viewport overflow checks at 320, 375, 390, 414, 768, 1024, 1280, 1440, and 1920 pixels
- Mobile menu open/close test
- Case study open/close and deep-link test
- Required form validation test
- Browser console/page error check
- ESLint and production build

Re-run `node scripts/audit-ui.mjs` while the dev server is running for the viewport and interaction audit.
