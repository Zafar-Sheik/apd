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

## Aceternity UI components

Interactive pieces in `components/ui/` follow Aceternity UI (Tailwind CSS v4 + Motion + `cn`):
Spotlight, Flip Words, Moving Border, Hover Border Gradient, Floating Dock, Card Hover Effect,
3D Card, Infinite Moving Cards, Background Beams, Text Generate Effect and animated Tabs.
The Aceternity registry couldn't be reached from the build environment, so they were written by hand
in the same structure as the originals.

## What's on the page

- Short preloader, then a "We deliver. We wash." hero with a spotlight, flip words and a van and scooter driving in
- Service cards for parcel delivery and the car wash, plus a moving strip of what we deliver
- Pinned horizontal "How delivery works" section with a scooter that rides as you scroll
- Bike / van switcher with animated tabs
- Scroll-to-clean car wash, then 3D-tilt wash packages
- "Why APD" hover grid
- Booking form that writes an Instagram message: copy it, open Instagram, paste
- Floating dock of quick links once you scroll past the hero

## Content to confirm

Copy lives in `lib/brand.ts` and the section components. Instagram and TikTok were not reachable while
building, so services, package contents and wording are sensible placeholders based on the brand
(parcel delivery by bike and van + mobile car wash). No prices, phone numbers or service area are listed —
add them once confirmed.
