-- Migration: Create mochis and mochi_tags tables
-- Run this in the Supabase SQL Editor

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Create mochis table
create table if not exists public.mochis (
  id uuid default uuid_generate_v4() primary key,
  title_es text not null,
  title_ja text not null,
  description_es text not null,
  description_ja text not null,
  price text not null,
  image_url text not null default '',
  emoji text not null default '🍡',
  display_order integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create mochi_tags table
create table if not exists public.mochi_tags (
  id uuid default uuid_generate_v4() primary key,
  mochi_id uuid not null references public.mochis(id) on delete cascade,
  tag_name text not null check (tag_name in ('nuevo', 'popular', 'seasonal')),
  season text check (season is null or season in ('spring', 'summer', 'fall', 'winter'))
);

-- Create index on mochi_tags for faster lookups
create index if not exists idx_mochi_tags_mochi_id on public.mochi_tags(mochi_id);

-- Auto-update updated_at on mochis row changes
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger mochis_updated_at
  before update on public.mochis
  for each row execute function public.update_updated_at();

-- Enable Row Level Security
alter table public.mochis enable row level security;
alter table public.mochi_tags enable row level security;

-- Public read access for mochis
create policy "Public can read mochis" on public.mochis
  for select using (true);

-- Public read access for mochi_tags
create policy "Public can read mochi_tags" on public.mochi_tags
  for select using (true);

-- Authenticated users can manage mochis
create policy "Authenticated can insert mochis" on public.mochis
  for insert to authenticated with check (true);

create policy "Authenticated can update mochis" on public.mochis
  for update to authenticated using (true) with check (true);

create policy "Authenticated can delete mochis" on public.mochis
  for delete to authenticated using (true);

-- Authenticated users can manage mochi_tags
create policy "Authenticated can insert mochi_tags" on public.mochi_tags
  for insert to authenticated with check (true);

create policy "Authenticated can update mochi_tags" on public.mochi_tags
  for update to authenticated using (true) with check (true);

create policy "Authenticated can delete mochi_tags" on public.mochi_tags
  for delete to authenticated using (true);

-- Seed data: existing mochis from translations
insert into public.mochis (title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order) values
  ('Mochi de Oreo', 'オレオ餅', 'Crujiente galleta Oreo envuelta en suave mochi artesanal', 'サクサクのオレオクッキーを柔らかい手作り餅で包みました', '3,50€', '/images/mochi-oreo.jpg', '🍪', 0),
  ('Mochi de Nutella', 'ヌテラ餅', 'Irresistible Nutella cremosa dentro de un mochi suave y esponjoso', 'たまらないクリーミーなヌテラを柔らかくふわふわの餅で', '3,50€', '/images/mochi-nutella.jpg', '🍫', 1),
  ('Mochi de Anko', 'あんこ餅', 'Tradicional pasta de judía roja azuki en mochi artesanal japonés', '伝統的な小豆あんを職人手作りの餅で包んだ和の逸品', '3,50€', '/images/mochi-anko.jpg', '🫘', 2),
  ('Mochi de Matcha', '抹茶餅', 'Auténtico matcha japonés en un mochi cremoso y delicado', '本格的な日本の抹茶をクリーミーで繊細な餅で', '3,50€', '/images/mochi-matcha.jpg', '🍵', 3),
  ('Mochi de Mango', 'マンゴー餅', 'Explosión tropical de mango maduro en mochi esponjoso', '完熟マンゴーのトロピカルな味わいがふわふわ餅に', '3,50€', '/images/mochi-mango.jpg', '🥭', 4),
  ('Mochi de Lemon Pie', 'レモンパイ餅', 'Cremoso lemon curd con merengue tostado en mochi artesanal', 'クリーミーなレモンカードと焼きメレンゲの手作り餅', '3,50€', '/images/mochi-lemon-pie.jpg', '🍋', 5),
  ('Mochi de Choco Coco', 'チョコココ餅', 'Intenso chocolate con coco rallado en un mochi suave y esponjoso', '濃厚チョコレートとココナッツフレークの柔らかふわふわ餅', '3,50€', '/images/mochi-choco-coco.jpg', '🥥', 6),
  ('Mochi de Maracuyá', 'パッションフルーツ餅', 'Exótica pulpa de maracuyá tropical en mochi suave y artesanal', 'エキゾチックなパッションフルーツの柔らかい手作り餅', '3,50€', '/images/mochi-maracuya.jpg', '🍈', 7),
  ('Mochi Tarta de Queso con Fresa', 'いちごチーズケーキ餅', 'Cremosa tarta de queso con fresa natural en mochi artesanal', 'クリーミーなチーズケーキとフレッシュいちごの手作り餅', '3,50€', '/images/mochi-tarta-queso-fresa.jpg', '🍓', 8),
  ('Mochi de Calabaza', 'かぼちゃ餅', 'Cremosa calabaza especiada de temporada en mochi artesanal suave', '季節限定のクリーミーなスパイスかぼちゃの柔らかい手作り餅', '3,50€', '/images/mochi-pumpkin.jpg', '🎃', 9),
  ('Mochi de Frambuesa', 'ラズベリー餅', 'Frambuesas frescas en un mochi artesanal suave y cremoso', 'フレッシュラズベリーの柔らかくクリーミーな手作り餅', '3,50€', '/images/mochi-raspberry.jpg', '🫐', 10),
  ('Mochi de Lotus Biscoff', 'ロータスビスコフ餅', 'Crema de galleta Lotus en mochi crujiente', 'ロータスクッキークリームのサクサク餅', '4,00€', '/images/mochi-oreo.jpg', '🍪', 11);

-- Add tags for seeded mochis
-- Oreo - bestSeller (mapped as popular for our tag system)
insert into public.mochi_tags (mochi_id, tag_name)
  select id, 'popular' from public.mochis where title_es = 'Mochi de Oreo';

-- Nutella - bestSeller
insert into public.mochi_tags (mochi_id, tag_name)
  select id, 'popular' from public.mochis where title_es = 'Mochi de Nutella';

-- Matcha - popular
insert into public.mochi_tags (mochi_id, tag_name)
  select id, 'popular' from public.mochis where title_es = 'Mochi de Matcha';

-- Calabaza - seasonal autumn
insert into public.mochi_tags (mochi_id, tag_name, season)
  select id, 'seasonal', 'fall' from public.mochis where title_es = 'Mochi de Calabaza';

-- Frambuesa - seasonal winter
insert into public.mochi_tags (mochi_id, tag_name, season)
  select id, 'seasonal', 'winter' from public.mochis where title_es = 'Mochi de Frambuesa';

-- Lotus Biscoff - nuevo
insert into public.mochi_tags (mochi_id, tag_name)
  select id, 'nuevo' from public.mochis where title_es = 'Mochi de Lotus Biscoff';
