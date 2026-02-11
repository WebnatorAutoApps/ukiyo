# Supabase Setup & Migration

## Overview

The mochis data is managed through Supabase as the single source of truth. This document covers the database schema, setup instructions, and migration process.

## Prerequisites

- A Supabase project (create one at [supabase.com](https://supabase.com))
- Supabase project URL and anon key (found in Project Settings > API)

## Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   These values can be retrieved from:
   - **Vercel**: `vercel env pull .env.local` (if project is linked)
   - **Supabase Dashboard**: Project Settings > API > Project URL and anon/public key

## Database Schema

### `mochis` table

| Column           | Type        | Description                        |
|------------------|-------------|------------------------------------|
| id               | UUID (PK)   | Auto-generated unique identifier   |
| title_es         | text        | Spanish title                      |
| title_ja         | text        | Japanese title                     |
| description_es   | text        | Spanish description                |
| description_ja   | text        | Japanese description               |
| price            | text        | Display price (e.g. "3,50€")      |
| image_url        | text        | URL to mochi image                 |
| emoji            | text        | Emoji representation               |
| display_order    | integer     | Sort order for display             |
| created_at       | timestamptz | Auto-set on creation               |
| updated_at       | timestamptz | Auto-updated via trigger           |

### `mochi_tags` table

| Column   | Type      | Description                                      |
|----------|-----------|--------------------------------------------------|
| id       | UUID (PK) | Auto-generated unique identifier                 |
| mochi_id | UUID (FK) | References mochis.id (cascade delete)            |
| tag_name | text      | One of: `nuevo`, `popular`, `seasonal`           |
| season   | text      | One of: `spring`, `summer`, `fall`, `winter` (nullable) |

### Row Level Security (RLS)

- **Public (anonymous)**: Read access to `mochis` and `mochi_tags`
- **Authenticated users**: Full CRUD on both tables

### Storage

- **Bucket**: `images` (public read access)
- **Path**: `mochis/{timestamp}-{random}.{ext}`
- **Authenticated users**: Upload and delete permissions

## Running the Migration

1. Open the Supabase SQL Editor for your project
2. Run the contents of `migration.sql`
3. Run the contents of `storage-setup.sql` to create the images storage bucket

The migration will:
- Create the `mochis` and `mochi_tags` tables
- Set up indexes for performance
- Enable RLS with appropriate policies
- Add an `updated_at` auto-update trigger
- Seed 12 initial mochis with their tags

## Application Architecture

### Data Flow

```
Supabase DB → src/lib/mochis.ts → src/hooks/useMochis.ts → Components
```

### Key Files

- `src/lib/supabase.ts` — Supabase client initialization (conditional on env vars)
- `src/lib/database.types.ts` — TypeScript types for database rows
- `src/lib/mochis.ts` — CRUD operations for mochis and image storage
- `src/hooks/useMochis.ts` — React hook for fetching mochis with loading/error states
- `src/components/MochiCounter.tsx` — Homepage mochi carousel
- `src/components/NuestroMenu.tsx` — Menu page with mochis from Supabase
- `src/components/AdminDashboard.tsx` — Admin panel for managing mochis

### Graceful Degradation

If Supabase credentials are not configured (`supabaseConfigured === false`), the application returns empty arrays instead of throwing errors. Components handle empty states gracefully.
