-- Migration: Add highlight_items table for admin-manageable highlight sections
-- Sections: menuSlider, specialtyDrinks, menuHighlights

-- 1. Create highlight_items join table
CREATE TABLE public.highlight_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  section text NOT NULL CHECK (section IN ('menuSlider','specialtyDrinks','menuHighlights')),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE (section, product_id)
);

CREATE INDEX idx_highlight_items_section ON public.highlight_items(section, display_order);

-- 2. RLS: public read, authenticated write
ALTER TABLE public.highlight_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read highlight_items" ON public.highlight_items
  FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert highlight_items" ON public.highlight_items
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update highlight_items" ON public.highlight_items
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete highlight_items" ON public.highlight_items
  FOR DELETE TO authenticated USING (true);

-- 3. Seed missing products that appear in slider/highlights but don't exist in DB yet

-- Hojicha Latte (hot drink)
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order, hot)
VALUES ('bebidas', 'Hojicha Latte', 'ほうじ茶ラテ', 'Té tostado japonés con notas ahumadas y dulces', '焙煎された日本茶のスモーキーで甘い風味', '4,00€', '', '🍵', 9, true);

-- Chocolate Caliente Mochi (hot drink)
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order, hot)
VALUES ('bebidas', 'Chocolate Caliente Mochi', '餅ホットチョコレート', 'Chocolate belga con malvaviscos mochi caseros', 'ベルギーチョコレートと自家製餅マシュマロ', '4,50€', '', '🍫', 10, true);

-- Mochis Artesanales (generic promo product)
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order)
VALUES ('mochis', 'Mochis Artesanales', '手作り餅', 'Suaves por fuera, cremosos por dentro. Hechos a mano cada día con ingredientes premium.', '外はもちもち、中はクリーミー。毎日厳選素材で一つ一つ手作り。', '3,50€', '/images/mochi-product-1.jpg', '🍡', 100);

-- Bubble Tea (generic promo)
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order, hot)
VALUES ('bebidas', 'Bubble Tea', 'バブルティー', 'Refrescante y divertido, con perlas de tapioca y sabores auténticos.', '爽やかで楽しい、タピオカパールと本格フレーバー。', '5,00€', '/images/bubble-tea.jpg', '🧋', 11, false);

-- Ramen Ukiyo
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order)
VALUES ('salados', 'Ramen Ukiyo', 'Ukiyo ラーメン', 'Caldo reconfortante con fideos artesanales y toppings tradicionales japoneses.', '心温まるスープに手作り麺と伝統的な日本のトッピング。', '9,50€', '/images/staff-product.jpg', '🍜', 8);

-- Pancakes Japoneses
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order)
VALUES ('postres', 'Pancakes Japoneses', 'ふわふわパンケーキ', 'Esponjosos y ligeros como una nube, con sirope de arce y frutas frescas.', '雲のように軽くてふわふわ、メープルシロップとフレッシュフルーツ添え。', '7,00€', '/images/mochi-lifestyle.jpg', '🥞', 0);

-- Ukiyo Combo
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order)
VALUES ('combos', 'Ukiyo Combo', 'Ukiyo コンボ', '2 mochis + bubble tea a elegir', '餅2個 + お好みのバブルティー', '9,90€', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop&q=80', '🎁', 0);

-- Add bestSeller tag to Ukiyo Combo
INSERT INTO public.product_tags (product_id, tag_name)
  SELECT id, 'bestSeller' FROM public.products WHERE title_es = 'Ukiyo Combo';

-- Add bestSeller tag to Mochis Artesanales (generic)
INSERT INTO public.product_tags (product_id, tag_name)
  SELECT id, 'bestSeller' FROM public.products WHERE title_es = 'Mochis Artesanales' AND type = 'mochis' AND display_order = 100;

-- 4. Seed highlight_items

-- menuSlider (6 items): Mochis Artesanales, Matcha Latte, Bubble Tea, Ramen Ukiyo, Pancakes Japoneses, Bocadillo de Pernil
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuSlider', id, 0 FROM public.products WHERE title_es = 'Mochis Artesanales' AND type = 'mochis' AND display_order = 100;
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuSlider', id, 1 FROM public.products WHERE title_es = 'Matcha Latte';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuSlider', id, 2 FROM public.products WHERE title_es = 'Bubble Tea' AND display_order = 11;
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuSlider', id, 3 FROM public.products WHERE title_es = 'Ramen Ukiyo';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuSlider', id, 4 FROM public.products WHERE title_es = 'Pancakes Japoneses';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuSlider', id, 5 FROM public.products WHERE title_es = 'Bocadillo de Pernil';

-- specialtyDrinks (8 items): 4 hot + 4 cold
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'specialtyDrinks', id, 0 FROM public.products WHERE title_es = 'Café Latte Ukiyo';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'specialtyDrinks', id, 1 FROM public.products WHERE title_es = 'Matcha Latte';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'specialtyDrinks', id, 2 FROM public.products WHERE title_es = 'Hojicha Latte';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'specialtyDrinks', id, 3 FROM public.products WHERE title_es = 'Chocolate Caliente Mochi';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'specialtyDrinks', id, 4 FROM public.products WHERE title_es = 'Bubble Tea Clásico';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'specialtyDrinks', id, 5 FROM public.products WHERE title_es = 'Taro Bubble Tea';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'specialtyDrinks', id, 6 FROM public.products WHERE title_es = 'Matcha Bubble Tea';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'specialtyDrinks', id, 7 FROM public.products WHERE title_es = 'Fresa Bubble Tea';

-- menuHighlights (3 items): Ukiyo Combo, Mochis Artesanales, Bocadillo de Pernil
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuHighlights', id, 0 FROM public.products WHERE title_es = 'Ukiyo Combo';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuHighlights', id, 1 FROM public.products WHERE title_es = 'Mochis Artesanales' AND type = 'mochis' AND display_order = 100;
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuHighlights', id, 2 FROM public.products WHERE title_es = 'Bocadillo de Pernil';
