# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Local dev server on :3000
npm run build        # Production build
npm run lint         # ESLint
npm test             # Build check (runs next build --webpack)
```

No unit test runner configured — `npm test` runs a build check only.

## Architecture

**Next.js 16 App Router** with React 19, Tailwind CSS 4, Supabase (PostgreSQL), and TypeScript.

### Key Directories

- `src/app/` — App Router pages (/, /menu, /tienda, /admin, /privacy-policy, /terms-and-conditions)
- `src/components/` — React components (all client-side with `"use client"`)
- `src/i18n/` — Bilingual i18n system (Spanish `es` + Japanese `ja`)
- `src/lib/` — Supabase client (`supabase.ts`), CRUD operations (`mochis.ts`), DB types (`database.types.ts`)
- `src/context/` — SeasonContext for seasonal product filtering
- `src/hooks/` — `useMochis` (fetches products), `useHeroLazyLoad`
- `supabase/` — SQL migration and seed files

### Import Alias

`@/*` → `src/*` (e.g., `import Footer from "@/components/Footer"`)

### Data Flow

- **Mochis** are stored in Supabase (`mochis` + `mochi_tags` tables). Components use `useMochis()` hook for client-side fetching with fallback to static data in `translations.ts`.
- **All other content** (drinks, savory, tapas, testimonials, FAQ) lives in `src/i18n/translations.ts`.
- **Seasons** are managed via `SeasonContext` — auto-resets on route change. Seasonal mochis are filtered by current season.

### Bilingual Requirement

ALL user-facing text must be translated in both `es` and `ja`. Translations live in `src/i18n/translations.ts` (1300+ lines). Components access translations via `useLanguage()` hook which provides `{ t, locale }`. The `Translations` interface must be updated when adding new keys.

### Supabase

- Tables: `mochis` (products) and `mochi_tags` (nuevo/popular/bestSeller/seasonal tags)
- RLS: public read, authenticated write
- Client in `src/lib/supabase.ts` gracefully degrades if credentials are missing (`supabaseConfigured` flag)
- CRUD in `src/lib/mochis.ts` — all operations return typed `MochiWithTags`
- Image uploads go to Supabase storage bucket "images"

### Styling

- Tailwind CSS v4 with theme in `src/app/globals.css` using `@theme inline`
- Color palette: warm cream (#FFF5E1), ukiyo navy (#5D5068), sakura pink (#FFD1DC), wood tones
- Fonts: Nunito, Quicksand, Varela Round (loaded in root layout)
- Custom animations in globals.css: petalFall, steamFloat, sparkle, float, vinylSpin, etc.
- `.shadow-cozy` for cards, `.bg-wood-texture` for backgrounds, `.seasonal-badge` for tags

### Admin System

`/admin` page — Supabase auth (email/password). Components: `AdminLogin`, `AdminDashboard`, `AdminMochiList`, `AdminMochiForm`.

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=<supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase-anon-key>
```

### Deployment

Vercel (configured in `vercel.json`). CI via GitHub Actions (`.github/workflows/ci.yml`) — runs build on push/PR to main.
