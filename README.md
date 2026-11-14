# Thandrangi's · Harsha & Jayasree — Engagement Invitation

A luxury digital engagement invitation: envelope opening, royal Telugu styling,
live countdown to **Sunday, 22 November 2026, 9:31 AM IST**, couple portraits, family
invitation, event card, venue with a pinned map, landmark and directions, photo gallery, final
blessings and WhatsApp sharing.

Built with **React 19 + TypeScript + Vite**, fully static, and deployed to **GitHub Pages**
with GitHub Actions. No backend, no API keys, no paid services.

---

## 1 · Edit content

Every name, date, address, phone number, photo and link lives in **one file**:

```
src/data/weddingConfig.ts
```

Things you will most likely update:

| What | Field |
| --- | --- |
| House pin used by the map and every Directions button | `venue.coordinates` |
| Nearby landmarks with an optional photo (shown on both map views) | `venue.landmarks` |
| Illustrated couple artwork | `coupleIllustration` |
| Invocation line at the top | `invocation` |
| Gallery photos (section hidden while empty) | `gallery` |
| Optional music (never autoplays) | `music.src` |
| Published URL used in WhatsApp shares | `siteUrl` (blank = automatic) |

### Adding photos

1. Put images in `public/images/gallery/` (resize to ~1280 px wide, `.webp` or `.jpg`).
2. Add an entry to `gallery` in the config, with `width`/`height` and a real `alt` text.

### Illustrated portraits

See **`docs/AVATAR_PROMPTS.md`** for the generation brief and where to save the files.
Until then, the real photographs are shown in the portrait frames.

---

## 2 · Run locally

Requires Node.js **20.19+** (22 recommended).

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # TypeScript checks
npm run build      # production build in dist/
npm run preview    # serve the production build
```

---

## 3 · Deploy to GitHub Pages

1. Create a repository on GitHub (any name, e.g. `harsha-jayasree`) and push this
   project to the **`main`** branch.
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` installs, type-checks, builds and
   deploys automatically on every push to `main`. You can also run it manually from the
   **Actions** tab.
4. The site will be live at `https://<your-username>.github.io/<repo-name>/`.

Notes:

- `vite.config.ts` uses `base: './'` (relative paths), so the build works under **any**
  repository name — no base-path editing needed.
- The workflow passes the Pages URL as `SITE_URL`, which fills the Open Graph tags so
  WhatsApp/Facebook previews show the invitation image.
- It is a single page with in-page anchors only, so refreshing never produces a 404.
- After the first successful `npm install`, commit the generated `package-lock.json`
  for reproducible builds (the workflow then uses `npm ci`).
- WhatsApp caches link previews. If you change the preview image after sharing,
  re-share the link or append `?v=2` to it.

---

## 4 · Project structure

```
.github/workflows/deploy.yml   GitHub Pages build & deploy
docs/AVATAR_PROMPTS.md         Illustrated-portrait brief
index.html                     SEO + Open Graph metadata, fonts
public/
  favicon.svg, apple-touch-icon.png
  images/couple/               Illustrated couple artwork (720 / 1388 px)
  images/gallery/              Optional gallery images (gallery hidden while empty)
  images/og/og-image.jpg       Social preview card (1200×630)
  music/                       Optional background track
src/
  data/weddingConfig.ts        ← all content
  components/
    InvitationEnvelope.tsx     Section 1 · envelope opening
    HeroSection.tsx, Countdown.tsx, GoldParticles.tsx
    CouplePortraits.tsx        Section 3
    FamilyInvitation.tsx       Section 4
    EventDetails.tsx           Section 5
    VenueSection.tsx           Section 6 · address, copy, maps, call
    LocationOverview.tsx       Map view 1 · embedded map
    DirectionsSection.tsx      Map view 2 · getting there
    PhotoGallery.tsx           Masonry + full-screen lightbox (swipe/keys)
    Footer.tsx                 Final blessings
    WhatsAppShare.tsx, MusicToggle.tsx
    Ornaments.tsx              SVG toran, jasmine, lamp, mandapam, kolam
    Icons.tsx, LazyFrame.tsx, SectionHeading.tsx
  hooks/useReveal.ts           Scroll-reveal animations
  lib/links.ts                 Maps / WhatsApp / clipboard helpers
  styles/global.css            Design system
```

Images live in `public/` rather than `src/assets/` so they can be swapped by editing the
config file alone, without touching any component imports.

---

## 5 · Design notes

- **Palette:** warm ivory, antique gold, deep maroon, champagne, emerald accents.
- **Type:** Cinzel (titles), Cormorant Garamond (names, invitation text), Jost (details),
  Pinyon Script (ampersands, signature), Noto Serif Telugu (blessing line).
- **Ornaments** are all hand-built SVG: mango-leaf toran with marigolds, jasmine strands,
  brass kuthu-vilakku lamps with flickering flames, a temple mandapam arch, kolam corners,
  lotus dividers, wax-seal monogram and drifting gold dust.
- Animations are CSS-driven and switch off for visitors who prefer reduced motion.
- Maps use Google's keyless embed URLs and the official Maps URLs (`/maps/search/?api=1`,
  `/maps/dir/?api=1`), so no API key is exposed.
