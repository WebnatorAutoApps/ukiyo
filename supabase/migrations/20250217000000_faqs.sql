-- Migration: Add faqs table for admin-manageable FAQ entries

-- 1. Create faqs table
CREATE TABLE public.faqs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question_es text NOT NULL,
  question_ja text NOT NULL DEFAULT '',
  answer_es text NOT NULL,
  answer_ja text NOT NULL DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_faqs_display_order ON public.faqs(display_order);

-- 2. RLS: public read, authenticated write
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read faqs" ON public.faqs
  FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert faqs" ON public.faqs
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update faqs" ON public.faqs
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete faqs" ON public.faqs
  FOR DELETE TO authenticated USING (true);

-- 3. Seed with existing FAQ content (bilingual)
INSERT INTO public.faqs (question_es, question_ja, answer_es, answer_ja, display_order) VALUES
(
  '¿Dónde está Ukiyo Mochis & Coffee en Madrid Norte?',
  'マドリード北部のUkiyo Mochis & Coffeeはどこにありますか？',
  'Nuestra tienda está ubicada en Santiago de Compostela 36, en el barrio de Fuencarral-El Pardo, 28034 Madrid Norte. Estamos en una zona muy accesible con transporte público y fácil aparcamiento. ¡Te esperamos!',
  '当店はフエンカラル・エル・パルド地区のSantiago de Compostela 36番地、28034マドリード北部にあります。公共交通機関でのアクセスが良く、駐車場も近くにあります。お待ちしております！',
  0
),
(
  '¿Qué son los mochis artesanales de Ukiyo?',
  'Ukiyoの手作り餅とは何ですか？',
  'Los mochis son un dulce tradicional japonés elaborado con masa de arroz glutinoso. En Ukiyo, elaboramos cada mochi a mano con ingredientes de primera calidad, combinando la tradición japonesa con sabores creativos y contemporáneos. Ofrecemos variedades con rellenos como matcha, fresa, maracuyá, chocolate y muchos más.',
  '餅は、もち米の生地で作る日本の伝統的なスイーツです。Ukiyoでは、最高品質の素材を使い一つ一つ手作りし、日本の伝統とクリエイティブで現代的なフレーバーを融合させています。抹茶、いちご、パッションフルーツ、チョコレートなど様々な味をご用意しています。',
  1
),
(
  '¿Qué es el bubble tea y qué sabores tenéis?',
  'バブルティーとは何ですか？どんなフレーバーがありますか？',
  'El bubble tea (también conocido como boba tea o té de burbujas) es una bebida de origen asiático que combina té con leche y perlas de tapioca. En Ukiyo Madrid Norte ofrecemos una amplia variedad de sabores refrescantes con toppings únicos, perfectos para cualquier momento del día.',
  'バブルティー（ボバティーやタピオカティーとも呼ばれます）は、紅茶にミルクとタピオカパールを加えたアジア発祥の飲み物です。Ukiyoマドリード北部では、ユニークなトッピングの爽やかなフレーバーを豊富にご用意しています。',
  2
),
(
  '¿Hacéis envíos de mochis a domicilio en Madrid?',
  'マドリードへの餅の配達はできますか？',
  'Sí, puedes pedir nuestros mochis artesanales a domicilio a través de Glovo. También puedes hacer pedidos por WhatsApp al +34 605 43 86 63 o visitarnos directamente en nuestra tienda de Madrid Norte en Fuencarral-El Pardo.',
  'はい、Glovoを通じて手作り餅をご自宅にお届けできます。WhatsApp（+34 605 43 86 63）でのご注文や、マドリード北部フエンカラル・エル・パルドの店舗への直接のご来店も承っております。',
  3
),
(
  '¿Cuál es el horario de Ukiyo Mochis en Madrid Norte?',
  'マドリード北部のUkiyo Mochisの営業時間は？',
  'Nuestro horario es de lunes a viernes de 10:00 a 20:00, sábados de 10:00 a 21:00 y domingos de 11:00 a 19:00. Te recomendamos visitarnos para descubrir todos nuestros sabores de mochis y bubble tea.',
  '営業時間は月曜日から金曜日の10:00～20:00、土曜日の10:00～21:00、日曜日の11:00～19:00です。ぜひお越しいただき、餅やバブルティーの全フレーバーをお試しください。',
  4
),
(
  '¿Tenéis opciones sin gluten o para alérgicos?',
  'グルテンフリーやアレルギー対応のオプションはありますか？',
  'Los mochis tradicionales están elaborados con harina de arroz glutinoso, que es naturalmente libre de gluten de trigo. Sin embargo, te recomendamos consultar con nuestro equipo sobre los ingredientes específicos de cada variedad si tienes alergias alimentarias.',
  '伝統的な餅はもち米粉で作られており、小麦グルテンは含まれていません。ただし、食物アレルギーのある方は、各種の具体的な原材料について当店スタッフにご確認いただくことをお勧めします。',
  5
),
(
  '¿Se pueden hacer pedidos para eventos o celebraciones?',
  'イベントやお祝いの注文はできますか？',
  '¡Por supuesto! Ofrecemos packs especiales de mochis artesanales ideales para cumpleaños, bodas, eventos corporativos y cualquier celebración. Contáctanos por email a hola@mochisukiyo.com o por WhatsApp para personalizar tu pedido.',
  'もちろんです！誕生日、結婚式、企業イベントなど、あらゆるお祝いに最適な手作り餅の特別パックをご用意しています。hola@mochisukiyo.comまたはWhatsAppでお気軽にご連絡ください。',
  6
),
(
  '¿Qué hace especial a los mochis de Ukiyo frente a otros en Madrid?',
  'マドリードの他の餅と比べてUkiyoの餅の特長は？',
  'En Ukiyo Mochis & Coffee cada mochi es preparado a mano, uno a uno, con ingredientes de alta calidad importados y locales. No somos una franquicia ni usamos producción industrial. Nuestra pasión por la repostería japonesa y nuestro enfoque artesanal nos diferencia como la tienda de referencia de mochis en Madrid Norte.',
  'Ukiyo Mochis & Coffeeでは、輸入素材と地元素材を厳選し、一つ一つ手作りで仕上げています。フランチャイズでも工業生産でもありません。和菓子への情熱と職人のこだわりが、マドリード北部を代表する餅専門店としての強みです。',
  7
);
