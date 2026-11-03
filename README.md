# Success Qube website

Next.js (App Router, JavaScript) + Tailwind CSS v4 + Framer Motion. 52 indexable pages, 3 form APIs, llms.txt, sitemap, robots.

## Run locally
```bash
npm install
cp .env.example .env.local     # fill in what you know; blanks are hidden, never faked
npm run dev                    # http://localhost:3000
npm run build && npm start     # production check
npm run verify                 # with `npm start` running: crawls every sitemap URL (status, title, canonical, JSON-LD, h1, links)
```
Node 20+ required (built and tested on Node 22).

## Where to edit
- `lib/site.js` + `.env.local`: business details (phone, WhatsApp, email, address, map, social, GA).
- `data/services.js`, `data/locations.js`, `data/blog.js`: page content. Pages, sitemap, llms.txt and footer update automatically.
- `data/portfolio.js`: demo projects. Replace with real work (`demo: false`) only with client permission.
- `data/team.js`: add real people to enable the Team page and Person schema.
- `components/home/Sections.js` → `<Testimonials items={[...]} />`: pass real, permissioned reviews.

## Forms and email
`/api/contact`, `/api/quote`, `/api/newsletter` validate with Zod, check origin, honeypot, minimum fill time and a per-instance rate limit, then send through Resend (`EMAIL_API_KEY`, `EMAIL_FROM`, `EMAIL_TO`). Without those variables the API returns 503 and the UI shows an error; it never pretends to succeed. For multi-instance production traffic, replace the in-memory rate limiter in `lib/formHandler.js` with Upstash/Redis.

## Deploy on Vercel
1. Push to GitHub. In Vercel: Add New Project, import the repo (framework auto-detected).
2. Add every variable from `.env.example` (Settings > Environment Variables). Set `NEXT_PUBLIC_SITE_URL` to the final https domain, then redeploy.
3. Domains: Settings > Domains > add `yourdomain.com` and `www`. At your registrar set `A 76.76.21.21` for the apex and `CNAME cname.vercel-dns.com` for `www` (use the exact values Vercel shows). Choose one as primary; the other redirects.
Preview deployments are automatically `noindex` (robots.js), production is indexable.

## Google Search Console
1. Add property (URL prefix with your https domain) > HTML tag method > copy the `content` token into `NEXT_PUBLIC_GSC_VERIFICATION`, redeploy, click Verify.
2. Sitemaps > submit `sitemap.xml`.
3. URL Inspection > request indexing for `/`, `/services`, `/contact`.

## Google Analytics 4
Create a GA4 property and web stream, put the `G-XXXX` ID in `NEXT_PUBLIC_GA_ID`. GA loads only after a visitor accepts the cookie banner. Events sent: `consultation_click`, `quote_request_click`, `phone_click`, `whatsapp_click`, `email_click`, `consultation_request`, `quote_request`, `newsletter_signup`, `generate_lead`. In GA4 mark `generate_lead`, `quote_request` and `consultation_request` as key events.

## Google Business Profile and Maps
Create/verify the profile with the same name, address and phone as `.env.local`. Set `NEXT_PUBLIC_GBP_URL` and `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL`.

## Launch checklist
- [ ] Real phone, email, address, WhatsApp set; same details on Google Business Profile
- [ ] `EMAIL_*` set and a real test submission of all three forms received
- [ ] `NEXT_PUBLIC_SITE_URL` is the final domain; `/robots.txt` shows Allow and the sitemap URL
- [ ] Privacy Policy and Terms reviewed by a legal professional
- [ ] Real photos added (about/team/office); portfolio demos replaced or kept labelled
- [ ] Lighthouse mobile and an accessibility audit run on the live URL
- [ ] GSC verified, sitemap submitted; GA4 receiving events after consent
- [ ] Social profile URLs set (they feed `sameAs` schema)
