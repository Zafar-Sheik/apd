# APD — Parcel Deliveries & Mobile Car Wash

Marketing site for Aboo's Parcel Deliveries (bike & van courier) and APD Mobile Car Wash.
Built with Next.js (App Router), GSAP + ScrollTrigger and Lenis smooth scrolling.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
STATIC_EXPORT=1 npm run build   # static site in ./out
```

## What's on the page

- Preloader with a parcel riding the progress bar
- Kinetic hero ("Delivered. Detailed.") with a van and scooter driving in, pointer parallax and hopping letters
- Scroll-velocity marquees
- Two-crew services split (hover to expand)
- Pinned horizontal "How it works" ride with a scooter that drives as you scroll
- Fleet switcher: bike / van drive in and out
- Scroll-to-wash car: a squeegee wipes the mud off as you scroll, foam follows your cursor
- Wash packages with 3D tilt, booking builder that writes an Instagram DM for you
- Social links and a footer whose letters lean toward the cursor

## Content to confirm

Copy lives in `lib/brand.ts` and the section components. Instagram and TikTok were not reachable while
building, so services, package contents and wording are sensible placeholders based on the brand
(parcel delivery by bike and van + mobile car wash). No prices, phone numbers or service area are listed —
add them once confirmed.
