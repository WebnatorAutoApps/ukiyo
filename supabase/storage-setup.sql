-- Storage setup: Create images bucket and policies
-- Run this in the Supabase SQL Editor after migration.sql

-- Create public storage bucket for mochi images
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Public read access for images
create policy "Public read images" on storage.objects
  for select using (bucket_id = 'images');

-- Authenticated users can upload images
create policy "Authenticated upload images" on storage.objects
  for insert to authenticated with check (bucket_id = 'images');

-- Authenticated users can delete images
create policy "Authenticated delete images" on storage.objects
  for delete to authenticated using (bucket_id = 'images');
