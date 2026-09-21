# Stillwater Meadows — Wedding & Event Venue Website

**Live:** https://stillwater.cyberalsolutions.com
**Repo:** rkweekley/stillwater-meadows (public)

Static marketing site for **Stillwater Meadows** — a wedding & private event venue on
42 acres at the foothills of the Blue Ridge Mountains in **Boomer, NC** (Wilkes County).

## Stack

- Static HTML/CSS/vanilla JS — no build step, no frameworks, zero external dependencies
  (fonts self-hosted, images self-hosted WebP)
- Served by `nginx:alpine` in Docker, behind Nginx Proxy Manager on the Mac Mini
- Multi-page for SEO: `index`, `venue`, `gallery`, `pricing`, `faq`, `contact`

## SEO implementation

- `LocalBusiness` + `WeddingVenue` JSON-LD on the homepage (address, geo, hours,
  capacity, amenities, sameAs → Eventective / The Knot / WeddingWire)
- `FAQPage` JSON-LD on `faq.html` (10 Q&As) — rich-result eligible
- `OfferCatalog` pricing schema on `pricing.html`; `BreadcrumbList` on inner pages
- Canonical URLs, Open Graph + Twitter cards (og-image.jpg), sitemap.xml, robots.txt
- Per-page titles/descriptions targeting: *wedding venue Boomer NC*, *event venue
  Wilkes County NC*, *Blue Ridge mountain wedding venue*, *affordable wedding venue NC*,
  *outdoor/barn wedding venue*
- NAP consistent everywhere: (206) 495-1410 · 1244laf@gmail.com · 823 Stillwater Road,
  Boomer, NC 28606 · open daily 9 AM–10 PM
- Honest content only — no fabricated reviews; venue facts from the venue's public
  Eventective / The Knot / WeddingWire listings

## Local dev

```bash
python3 -m http.server 8000   # serve repo root (index.html at /)
```

## Deploy (GitHub Actions → GHCR → Mac Mini auto-pull)

Push to `main` (or run the workflow manually) → Actions builds a multi-arch
(amd64 + arm64) image → pushes `ghcr.io/rkweekley/stillwater-meadows:latest` →
SSH-deploys to the Mac Mini: `docker pull` + recreate the `stillwater` container
on the `mac` network, then health-checks it from inside NPM.

Repo secrets: `MAC_MINI_HOST`, `DEPLOY_USER_PROD`, `DEPLOY_SSH_KEY_PROD`.
Package visibility is **public** (no token needed on the server to pull).

Container: `--name stillwater --network mac -p 127.0.0.1:5055:80 --restart unless-stopped`

## Notes

- **Canonical domain:** currently `stillwater.cyberalsolutions.com`. If/when the venue
  gets its own domain, update the canonicals, og:url, sitemap and JSON-LD `url` fields
  (grep for `stillwater.cyberalsolutions.com`).
- **Contact form:** composes a `mailto:` to 1244laf@gmail.com (no backend). If the venue
  wants form-to-email later, swap in a small API.
- **Photos:** venue's own publicity photos, sourced from its public Eventective listing
  (media.eventective.com), converted to WebP. OG image 1200×630.
- The venue's previous domain (stillwatermeadows.com) is parked/expired — worth
  mentioning when messaging the owner.