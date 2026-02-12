-- Migration: Rename mochis→products, mochi_tags→product_tags, add type/hot/price_modifier columns,
-- create menu_categories table, seed static items from translations.ts

-- 1. Rename tables
ALTER TABLE public.mochis RENAME TO products;
ALTER TABLE public.mochi_tags RENAME TO product_tags;

-- 2. Add new columns to products
ALTER TABLE public.products
  ADD COLUMN type text NOT NULL DEFAULT 'mochis'
    CHECK (type IN ('mochis','bebidas','postres','raciones','salados','combos','otros')),
  ADD COLUMN hot boolean NOT NULL DEFAULT false,
  ADD COLUMN price_modifier text;

-- 3. Rename foreign key column in product_tags
ALTER TABLE public.product_tags RENAME COLUMN mochi_id TO product_id;

-- 4. Update tag constraint to add bestSeller
ALTER TABLE public.product_tags
  DROP CONSTRAINT mochi_tags_tag_name_check;
ALTER TABLE public.product_tags
  ADD CONSTRAINT product_tags_tag_name_check
    CHECK (tag_name IN ('nuevo','popular','seasonal','bestSeller'));

-- 5. Rename index
ALTER INDEX idx_mochi_tags_mochi_id RENAME TO idx_product_tags_product_id;

-- 6. Drop old RLS policies (they reference old table names internally)
DROP POLICY IF EXISTS "Public can read mochis" ON public.products;
DROP POLICY IF EXISTS "Authenticated can insert mochis" ON public.products;
DROP POLICY IF EXISTS "Authenticated can update mochis" ON public.products;
DROP POLICY IF EXISTS "Authenticated can delete mochis" ON public.products;

DROP POLICY IF EXISTS "Public can read mochi_tags" ON public.product_tags;
DROP POLICY IF EXISTS "Authenticated can insert mochi_tags" ON public.product_tags;
DROP POLICY IF EXISTS "Authenticated can update mochi_tags" ON public.product_tags;
DROP POLICY IF EXISTS "Authenticated can delete mochi_tags" ON public.product_tags;

-- 7. Recreate RLS policies with new names
CREATE POLICY "Public can read products" ON public.products
  FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert products" ON public.products
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update products" ON public.products
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete products" ON public.products
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Public can read product_tags" ON public.product_tags
  FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert product_tags" ON public.product_tags
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update product_tags" ON public.product_tags
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete product_tags" ON public.product_tags
  FOR DELETE TO authenticated USING (true);

-- 8. Create menu_categories table
CREATE TABLE public.menu_categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name_es text NOT NULL,
  name_ja text NOT NULL DEFAULT '',
  emoji text NOT NULL DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  enabled boolean NOT NULL DEFAULT true,
  product_types text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read menu_categories" ON public.menu_categories
  FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert menu_categories" ON public.menu_categories
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update menu_categories" ON public.menu_categories
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete menu_categories" ON public.menu_categories
  FOR DELETE TO authenticated USING (true);

-- 9. Seed menu_categories
INSERT INTO public.menu_categories (name_es, name_ja, emoji, display_order, product_types) VALUES
  ('Mochis & Sweet', '餅 & スイーツ', '🌸', 0, '{mochis,postres}'),
  ('Bubble Tea & Drinks', 'バブルティー & ドリンク', '🧋', 1, '{bebidas}'),
  ('Brunch & Salado', 'ブランチ & 食事', '🥯', 2, '{salados}'),
  ('Tapas', 'タパス', '🥟', 3, '{raciones}'),
  ('Combos', 'コンボ', '🎁', 4, '{combos}');

-- 10. Fix existing mochi tags: convert Oreo/Nutella from popular → bestSeller
UPDATE public.product_tags
  SET tag_name = 'bestSeller'
  WHERE tag_name = 'popular'
    AND product_id IN (
      SELECT id FROM public.products
      WHERE title_es IN ('Mochi de Oreo', 'Mochi de Nutella')
    );

-- 11. Set price_modifier on Lotus Biscoff
UPDATE public.products
  SET price_modifier = '+0,50€'
  WHERE title_es = 'Mochi de Lotus Biscoff';

-- 12. Seed bebidas (drinks)
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order, hot) VALUES
  ('bebidas', 'Bubble Tea Clásico', 'クラシックバブルティー', 'Té negro con leche, perlas de tapioca y azúcar morena', '紅茶とミルク、タピオカパール、黒糖', '5,00€', '', '🧋', 0, false),
  ('bebidas', 'Taro Bubble Tea', 'タロバブルティー', 'Crema de taro con perlas de tapioca y leche de coco', 'タロクリームとタピオカパール、ココナッツミルク', '5,50€', '', '🧋', 1, false),
  ('bebidas', 'Matcha Bubble Tea', '抹茶バブルティー', 'Matcha frío con leche de avena y perlas de mango', 'アイス抹茶とオーツミルク、マンゴーパール', '5,50€', '', '🍵', 2, false),
  ('bebidas', 'Fresa Bubble Tea', 'いちごバブルティー', 'Fresa natural con leche y boba de fresa', 'フレッシュいちごとミルク、いちごボバ', '5,00€', '', '🍓', 3, false),
  ('bebidas', 'Café Latte Ukiyo', 'Ukiyo カフェラテ', 'Espresso suave con leche cremosa y un toque de vainilla', 'なめらかなエスプレッソにクリーミーなミルクとバニラの香り', '3,50€', '', '☕', 4, true),
  ('bebidas', 'Matcha Latte', '抹茶ラテ', 'Té matcha ceremonial japonés con leche espumosa', '日本の茶道用抹茶とふわふわのミルク', '4,00€', '', '🍵', 5, true),
  ('bebidas', 'Espresso / Americano', 'エスプレッソ / アメリカーノ', 'Café de especialidad de tueste medio, intenso y aromático', 'ミディアムローストのスペシャルティコーヒー、力強い香り', '2,50€', '', '☕', 6, true),
  ('bebidas', 'Cappuccino', 'カプチーノ', 'Espresso con leche espumosa y un toque de cacao', 'エスプレッソにふわふわミルクとカカオの香り', '3,00€', '', '☕', 7, true),
  ('bebidas', 'Chai Latte', 'チャイラテ', 'Té chai especiado con leche cremosa y canela', 'スパイスの効いたチャイティーにクリーミーなミルクとシナモン', '4,00€', '', '☕', 8, true);

-- Tags for bebidas
INSERT INTO public.product_tags (product_id, tag_name)
  SELECT id, 'bestSeller' FROM public.products WHERE title_es = 'Bubble Tea Clásico';
INSERT INTO public.product_tags (product_id, tag_name)
  SELECT id, 'popular' FROM public.products WHERE title_es = 'Chai Latte';

-- 13. Seed salados (savory/brunch)
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order) VALUES
  ('salados', 'Bocadillo de Pernil', 'ペルニルサンド', 'Jamón asado artesanal en pan crujiente recién horneado', '焼き上げハムの手作りサンドイッチ', '7,50€', '', '🥖', 0),
  ('salados', 'Tostada de Aguacate', 'アボカドトースト', 'Aguacate fresco sobre pan artesanal con semillas', '新鮮なアボカドと種子のアルチザンパン', '6,50€', '', '🥑', 1),
  ('salados', 'Croissant de Jamón y Queso', 'ハムチーズクロワッサン', 'Croissant mantequilla con jamón y queso fundido', 'バタークロワッサンにハムと溶けるチーズ', '4,50€', '', '🥐', 2),
  ('salados', 'Bagel de Salmón', 'サーモンベーグル', 'Salmón ahumado con queso crema y alcaparras', 'スモークサーモンとクリームチーズ、ケッパー', '7,00€', '', '🥯', 3),
  ('salados', 'Trío de Baos', 'バオ三種盛り', 'Tres baos al vapor rellenos de cerdo, pollo y vegetales con salsa hoisin', '豚肉、鶏肉、野菜の3種類の蒸しバオにホイシンソース添え', '7,50€', '', '🥟', 4),
  ('salados', 'Tosta de Salmón', 'サーモントースト', 'Salmón ahumado sobre tosta crujiente con queso crema y eneldo', 'スモークサーモンのカリカリトーストにクリームチーズとディル', '7,00€', '', '🐟', 5),
  ('salados', 'Gyozas Variadas', 'ミックス餃子', 'Mix de gyozas de pollo, gambas y verduras a la plancha', 'チキン、エビ、野菜の鉄板焼き餃子ミックス', '6,50€', '', '🥟', 6),
  ('salados', 'Tequeños', 'テケーニョス', 'Palitos crujientes de masa rellenos de queso fundido con salsa de guayaba', 'チーズたっぷりのカリカリ揚げスティック、グアバソース添え', '5,50€', '', '🧀', 7);

-- Tags for salados
INSERT INTO public.product_tags (product_id, tag_name)
  SELECT id, 'nuevo' FROM public.products WHERE title_es = 'Bocadillo de Pernil';
INSERT INTO public.product_tags (product_id, tag_name)
  SELECT id, 'nuevo' FROM public.products WHERE title_es = 'Bagel de Salmón';
INSERT INTO public.product_tags (product_id, tag_name)
  SELECT id, 'popular' FROM public.products WHERE title_es = 'Trío de Baos';
INSERT INTO public.product_tags (product_id, tag_name)
  SELECT id, 'nuevo' FROM public.products WHERE title_es = 'Tosta de Salmón';
INSERT INTO public.product_tags (product_id, tag_name)
  SELECT id, 'nuevo' FROM public.products WHERE title_es = 'Tequeños';

-- 14. Seed raciones (tapas)
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order) VALUES
  ('raciones', 'Gyozas de Pollo', 'チキン餃子', 'Empanadillas japonesas de pollo a la plancha', '鉄板焼きチキン餃子', '6,50€', '', '🥟', 0),
  ('raciones', 'Edamame con Sal', '枝豆塩味', 'Vainas de soja al vapor con sal marina', '蒸し枝豆の海塩添え', '4,00€', '', '🫛', 1),
  ('raciones', 'Takoyaki', 'たこ焼き', 'Bolitas crujientes de pulpo estilo Osaka', '大阪スタイルのカリカリたこ焼き', '6,00€', '', '🐙', 2),
  ('raciones', 'Dim Sum Variado', '点心盛り合わせ', 'Selección de dim sum al vapor y frito', '蒸しと揚げの点心セレクション', '7,50€', '', '🥟', 3);

-- Tags for raciones
INSERT INTO public.product_tags (product_id, tag_name)
  SELECT id, 'popular' FROM public.products WHERE title_es = 'Gyozas de Pollo';
INSERT INTO public.product_tags (product_id, tag_name)
  SELECT id, 'nuevo' FROM public.products WHERE title_es = 'Takoyaki';
