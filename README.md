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

## Deploy (Mac Mini, native build)

```bash
rsync -avz --delete -e "ssh -o BatchMode=yes" ./ cyberal@69.133.124.51:docker/stillwater/
ssh cyberal@69.133.124.51 \
  'cd ~/docker/stillwater && docker build -t stillwater:latest . && \
   docker rm -f stillwater; docker run -d --name stillwater --network mac \
   -p 127.0.0.1:5000:5000 --restart unless-stopped stillwater:latest'
```

NPM proxy host: `stillwater.cyberalsolutions.com` → `stillwater:5000` (HTTP, SSL forced).
Wildcard DNS `*.cyberalsolutions.com` → 69.133.124.51 already exists.

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