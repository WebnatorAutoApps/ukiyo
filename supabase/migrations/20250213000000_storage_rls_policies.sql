-- Migration: Add RLS policies for the images storage bucket
-- Allows public read and authenticated write/update/delete

-- Public read access (images are public product photos)
CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

-- Authenticated users can upload images
CREATE POLICY "Authenticated users can upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Authenticated users can update images
CREATE POLICY "Authenticated users can update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Authenticated users can delete images
CREATE POLICY "Authenticated users can delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'images' AND auth.role() = 'authenticated');
