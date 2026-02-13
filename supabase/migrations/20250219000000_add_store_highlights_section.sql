-- Migration: Add 'storeHighlights' to highlight_items section check constraint
-- Fixes constraint violation error (23514) when adding store highlight items

-- Drop the existing check constraint and recreate it with 'storeHighlights' included
ALTER TABLE public.highlight_items
  DROP CONSTRAINT highlight_items_section_check;

ALTER TABLE public.highlight_items
  ADD CONSTRAINT highlight_items_section_check
  CHECK (section IN ('menuSlider', 'specialtyDrinks', 'menuHighlights', 'storeHighlights'));
