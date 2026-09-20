# Deploying CaterPillar

The site is a Next.js App Router app. Production hosting is Vercel. The custom domain is registered at GoDaddy. The exact `.in` hostname is supplied through environment variables and is **not connected until you verify it in Vercel**.

Do not put API keys, tokens, or passwords in this file.

## Flow

Local → Git repository → Vercel → Environment variables → Custom domain → GoDaddy DNS → SSL → Production QA

## 1. Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Production simulation:

```bash
npm run build
npm run start
```

Do not run `next build` in the same folder while `next dev` is still using `.next`.

## 2. Git repository

Push the project to the Git host Vercel will import. Keep `.env`, `.env.local`, and real credentials out of git.

## 3. Deploy to Vercel

1. Import the repository in Vercel.
2. Framework preset: Next.js.
3. Build command: `npm run build`
4. Output: Next.js default (no static export).
5. Deploy the production branch.

Vercel issues a `*.vercel.app` URL first. That is not the final custom domain.

## 4. Production environment variables

Set these in the Vercel project for Production (and Preview if needed):

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes, after the domain is chosen | Canonical origin, including `https`. Example: `https://www.your-domain.in` |
| `NEXT_PUBLIC_API_URL` | Only when a live backend exists | Public API origin. Never a `localhost` or private-network address. |
| `NEXT_PUBLIC_MATERIALS_PATH` | Only when documented | Path appended to the API origin. |
| `NEXT_PUBLIC_PICKUPS_PATH` | Only when documented | Path appended to the API origin. |
| `NEXT_PUBLIC_SERVICEABILITY_PATH` | Only when documented | Path for pincode checks. |
| `NEXT_PUBLIC_BOOKING_URL` | No | Leave empty to keep `/book`. |
| `NEXT_PUBLIC_ANDROID_APP_URL` | No | Leave empty until the Play Store listing exists. |
| `NEXT_PUBLIC_IOS_APP_URL` | No | Leave empty until the App Store listing exists. |

Do **not** set `NEXT_PUBLIC_USE_MOCK_API=true` in Production. The app ignores it there anyway.

This website does not currently need server-only secrets. If a later backend requires one, add it in Vercel without the `NEXT_PUBLIC_` prefix.

Redeploy after changing environment variables.

## 5. Add the custom domain in Vercel

1. Open the Vercel project → Settings → Domains.
2. Add the root domain and `www` if you want both.
3. Choose the Vercel-recommended redirect (usually `www` → apex, or apex → `www`).
4. Copy the DNS records Vercel shows. Do not invent records.

DNS is configured in GoDaddy, not in this repository.

## 6. Configure DNS in GoDaddy

Typical Vercel records (confirm against the current Vercel UI):

- Apex / root: `A` record to the Vercel IP Vercel displays, or the `ALIAS`/`ANAME` it recommends.
- `www`: `CNAME` to `cname.vercel-dns.com` (or the host Vercel shows).

TTL can stay at the GoDaddy default. DNS changes can take minutes to hours.

## 7. Verify SSL

Vercel provisions the certificate after DNS resolves.

In Vercel Domains, wait until the domain shows as valid and HTTPS is active. Do not announce the custom domain as live before that check passes.

## 8. Set `NEXT_PUBLIC_SITE_URL`

Once the chosen hostname is valid, set:

```txt
NEXT_PUBLIC_SITE_URL=https://www.your-domain.in
```

or the root hostname if that is the canonical host. Then redeploy so sitemap, robots, Open Graph, and canonical URLs use that origin.

## 9. Production QA

On the Vercel URL first, then on the custom domain after SSL is valid:

- Homepage loads
- How it works / Product / FAQ anchors work
- Book a pickup opens `/book`
- Booking form validation and error copy
- Footer store rows stay “Coming soon” until real store URLs are set
- `/robots.txt` and `/sitemap.xml` use the production origin
- Favicon and Open Graph image resolve
- No `localhost` or mock-mode banners

## Analytics

No analytics vendor is installed. `lib/analytics.js` only forwards allowed event names to `window.__caterpillarTrack` if you attach one later. Events never include phone, address, name, or tokens.
