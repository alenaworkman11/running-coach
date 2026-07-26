# Lena Bogdanova — Running Coach Website

Premium Next.js landing page with 3D hero, parallax photography, i18n, and light/dark themes.

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS 4**
- **Framer Motion** — scroll & section animations
- **Three.js / React Three Fiber** — 3D hero scene
- **Lenis** — smooth scrolling
- **next-intl** — EN (default), RU, DE, JA, TR
- **next-themes** — light / dark mode

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Replace Photos

Drop your images into `public/img/` with these filenames:

| File | Section |
|------|---------|
| `hero.svg` → your photo | Hero portrait |
| `intro.svg` | Intro section |
| `story-1.svg`, `story-2.svg`, `story-3.svg` | My Story timeline |
| `coaching.svg` | Coaching sticky sidebar |
| `philosophy.svg` | Philosophy |
| `contact.svg` | Contact |

Update file extensions in component files if using `.jpg` / `.webp`.

## Locales

- `/` — English (default)
- `/ru` — Russian
- `/de` — German
- `/ja` — Japanese
- `/tr` — Turkish

## Backend

Contact form is UI-only. Connect your API in `src/components/sections/Contact.tsx` when ready.

## Build

```bash
npm run build
npm start
```
