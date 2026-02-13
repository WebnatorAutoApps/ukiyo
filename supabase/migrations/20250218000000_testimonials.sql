-- Migration: Add testimonials table for admin-manageable testimonials

-- 1. Create testimonials table
CREATE TABLE public.testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  section text NOT NULL DEFAULT 'tienda' CHECK (section IN ('home', 'tienda')),
  name_es text NOT NULL,
  name_ja text NOT NULL DEFAULT '',
  quote_es text NOT NULL,
  quote_ja text NOT NULL DEFAULT '',
  avatar_url text NOT NULL DEFAULT '',
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_testimonials_section_order ON public.testimonials(section, display_order);

-- 2. RLS: public read, authenticated write
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read testimonials" ON public.testimonials
  FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert testimonials" ON public.testimonials
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update testimonials" ON public.testimonials
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete testimonials" ON public.testimonials
  FOR DELETE TO authenticated USING (true);

-- 3. Seed with existing testimonial content (bilingual)

-- Home page testimonial
INSERT INTO public.testimonials (section, name_es, name_ja, quote_es, quote_ja, avatar_url, rating, display_order) VALUES
(
  'home',
  'Lourdes López',
  'ルルデス・ロペス',
  'Los mochis de Ukiyo son una delicia, suaves y cremosos, perfectos para disfrutar con café. La mejor tienda de mochis de Madrid Norte.',
  'Ukiyoの餅は絶品です。柔らかくてクリーミーで、コーヒーと一緒に楽しむのに最適。マドリード北部で一番の餅屋さんです。',
  '/images/testimonial-avatar.jpg',
  5,
  0
);

-- Tienda page testimonials
INSERT INTO public.testimonials (section, name_es, name_ja, quote_es, quote_ja, avatar_url, rating, display_order) VALUES
(
  'tienda',
  'Sofía M.',
  'ソフィア M.',
  'Los mochis de Ukiyo son simplemente deliciosos, cada bocado es una experiencia única y satisfactoria.',
  'Ukiyoの餅は本当に美味しい。一口ごとがユニークで満足のいく体験です。',
  '/images/testimonial-sofia.jpg',
  5,
  0
),
(
  'tienda',
  'Carlos G.',
  'カルロス G.',
  'Me encantaron los sabores, especialmente el de maracuyá. El café complementó perfectamente esta deliciosa elección.',
  'フレーバーが大好きです。特にパッションフルーツが最高。コーヒーとの相性も抜群でした。',
  '/images/testimonial-carlos.jpg',
  5,
  1
),
(
  'tienda',
  'María R.',
  'マリア R.',
  'Los mejores mochis artesanales que he probado en Madrid. La textura es perfecta y los sabores son increíbles.',
  'マドリードで食べた中で最高の手作り餅。食感も完璧で味も素晴らしいです。',
  '/images/testimonial-maria.jpg',
  5,
  2
),
(
  'tienda',
  'Elena T.',
  'エレナ T.',
  'El brunch de Ukiyo es espectacular. La tostada de aguacate y el croissant de jamón y queso están riquísimos, y todo acompañado de un café increíble.',
  'Ukiyoのブランチは最高です。アボカドトーストとハムチーズクロワッサンがとても美味しくて、素晴らしいコーヒーと一緒に楽しめます。',
  '/images/testimonial-elena.jpg',
  5,
  3
),
(
  'tienda',
  'Javier P.',
  'ハビエル P.',
  'Los postres artesanales de Ukiyo son otra cosa. El mochi de Lotus Biscoff y el de chocolate belga son auténticas obras de arte, suaves y llenos de sabor.',
  'Ukiyoの手作りスイーツは格別です。ロータスビスコフ餅とベルギーチョコレート餅は芸術品のよう。柔らかくて風味豊かです。',
  '/images/testimonial-javier.jpg',
  5,
  4
),
(
  'tienda',
  'Lucía D.',
  'ルシア D.',
  'El matcha bubble tea es mi favorito absoluto. Cremoso, refrescante y con las perlas de mango que le dan un toque tropical perfecto. Vuelvo cada semana.',
  '抹茶バブルティーが一番のお気に入り。クリーミーで爽やかで、マンゴーパールのトロピカルな味わいが最高。毎週通っています。',
  '/images/testimonial-lucia.jpg',
  5,
  5
);
