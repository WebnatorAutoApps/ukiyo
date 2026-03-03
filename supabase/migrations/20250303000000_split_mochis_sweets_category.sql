-- Migration: Split "Mochis & Sweet" category into separate "Mochis" and "Sweets" categories
-- The old category combined product_types {mochis, postres} into one tab.
-- This migration creates two distinct categories for better navigation.

BEGIN;

-- 1. Remove the combined "Mochis & Sweet" category
DELETE FROM public.menu_categories
WHERE name_es = 'Mochis & Sweet';

-- 2. Shift existing categories up by 1 to make room for the new second category
UPDATE public.menu_categories
SET display_order = display_order + 1,
    updated_at = now()
WHERE display_order >= 1;

-- 3. Insert the two new separate categories
INSERT INTO public.menu_categories (name_es, name_ja, emoji, display_order, product_types) VALUES
  ('Mochis', '餅', '🍡', 0, '{mochis}'),
  ('Sweets', 'スイーツ', '🍰', 1, '{postres}');

COMMIT;
