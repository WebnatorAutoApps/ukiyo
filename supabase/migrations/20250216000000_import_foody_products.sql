-- Migration: Import Foody Service products into Supabase
-- Replaces all non-mochi products with real catalog data from foodyservice.com/ukiyo
-- Adds Japanese translations and descriptions for every item

BEGIN;

-- =============================================
-- STEP 1: Clean highlight_items (rebuild later)
-- =============================================
DELETE FROM public.highlight_items;

-- =============================================
-- STEP 2: Clean all non-mochi products
-- (cascades to product_tags for deleted rows)
-- =============================================
DELETE FROM public.products WHERE type != 'mochis';

-- =============================================
-- STEP 3: Update existing mochis
-- =============================================

-- 3a. Delete mochis no longer on Foody
DELETE FROM public.products
WHERE title_es IN ('Mochi de Fresa', 'Mochi de Chocolate', 'Mochi de Lotus Biscoff')
  AND type = 'mochis';

-- 3b. Update prices: most mochis 3,50€ → 2,50€
UPDATE public.products SET price = '2,50€', updated_at = now()
WHERE title_es IN (
  'Mochi de Oreo',
  'Mochi de Nutella',
  'Mochi de Anko',
  'Mochi de Mango',
  'Mochi de Lemon Pie',
  'Mochi de Choco Coco',
  'Mochi de Maracuyá'
) AND type = 'mochis';

-- 3c. Tarta de Queso con Fresa: 3,50€ → 3,00€
UPDATE public.products SET price = '3,00€', updated_at = now()
WHERE title_es = 'Mochi Tarta de Queso con Fresa' AND type = 'mochis';

-- 3d. Frambuesa: 3,50€ → 3,00€ + update description
UPDATE public.products SET
  price = '3,00€',
  description_es = 'Mochi relleno de una mousse de chocolate blanco con frambuesa',
  description_ja = 'ホワイトチョコレートムースとラズベリーの餅',
  updated_at = now()
WHERE title_es = 'Mochi de Frambuesa' AND type = 'mochis';

-- 3e. Matcha & Calabaza: leave as-is (not on Foody but kept by request)

-- 3f. Add new mochis
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order) VALUES
  ('mochis', 'Mochi Pistacho', 'ピスタチオ餅', 'Crema de pistacho artesanal en mochi suave y delicado', '手作りピスタチオクリームの柔らかく繊細な餅', '2,50€', '', '🌰', 9),
  ('mochis', 'Mochi Duo', '餅デュオ', 'Escoge tus dos mochis favoritos', 'お気に入りの餅を2つ選んでね', '4,00€', '', '🍡', 10);


-- =============================================
-- STEP 4-5: Insert all Foody products
-- with descriptions & Japanese translations
-- =============================================

-- -----------------------------------------
-- BEBIDAS CALIENTES (type=bebidas, hot=true)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order, hot) VALUES
  ('bebidas', 'Café Latte', 'カフェラテ', 'Espresso suave con leche cremosa al vapor', 'エスプレッソにクリーミーなスチームミルク', '2,00€', '', '☕', 0, true),
  ('bebidas', 'Café Latte Grande', 'カフェラテ・グランデ', 'Café latte en tamaño grande para disfrutar más', 'たっぷり楽しめるラージサイズのカフェラテ', '2,50€', '', '☕', 1, true),
  ('bebidas', 'Café Latte Especial', 'カフェラテ・エスペシャル', 'Agrega un delicioso sirope de caramelo o avellana (de temporada)', 'キャラメルまたはヘーゼルナッツの美味しいシロップ付き（季節限定）', '2,50€', '', '☕', 2, true),
  ('bebidas', 'Americano', 'アメリカーノ', 'Espresso con agua caliente, intenso y aromático', 'お湯で割ったエスプレッソ、力強く香り豊か', '1,90€', '', '☕', 3, true),
  ('bebidas', 'Espresso', 'エスプレッソ', 'Shot de café concentrado de tueste medio', 'ミディアムローストの濃縮コーヒーショット', '1,80€', '', '☕', 4, true),
  ('bebidas', 'Espresso Doble', 'ダブルエスプレッソ', 'Doble shot de espresso para los más cafeteros', 'コーヒー好きのためのダブルショットエスプレッソ', '2,30€', '', '☕', 5, true),
  ('bebidas', 'Cortado', 'コルタード', 'Espresso cortado con un toque de leche', 'ミルクを少し加えたエスプレッソ', '1,90€', '', '☕', 6, true),
  ('bebidas', 'Capuccino', 'カプチーノ', 'Espresso con leche espumosa y espuma sedosa', 'エスプレッソにふわふわミルクとシルキーな泡', '3,00€', '', '☕', 7, true),
  ('bebidas', 'Mocca', 'モカ', 'Café con leche y jarabe de chocolate', 'コーヒーとミルクにチョコレートシロップ', '3,10€', '', '☕', 8, true),
  ('bebidas', 'Matcha Latte', '抹茶ラテ', 'Té matcha ceremonial japonés con leche espumosa', '日本の茶道用抹茶とふわふわのミルク', '3,60€', '', '🍵', 9, true),
  ('bebidas', 'Pink Latte', 'ピンクラテ', 'Latte de remolacha con un toque dulce y floral', 'ほんのり甘くフローラルなビーツラテ', '3,50€', '', '🌸', 10, true),
  ('bebidas', 'Chocolate', 'チョコレート', 'Chocolate caliente cremoso y reconfortante', 'クリーミーで心温まるホットチョコレート', '2,80€', '', '🍫', 11, true),
  ('bebidas', 'Cola-Cao', 'コラカオ', 'Clásico batido de cacao con leche caliente', '温かいミルクの定番ココアドリンク', '2,40€', '', '🍫', 12, true),
  ('bebidas', 'Tés e Infusiones', 'お茶・ハーブティー', 'Selección de tés e infusiones naturales', '厳選された天然茶葉とハーブティー', '2,70€', '', '🍵', 13, true),
  ('bebidas', 'Leche Caliente', 'ホットミルク', 'Leche cremosa calentita, perfecta para cualquier momento', 'いつでもぴったりな温かいクリーミーミルク', '1,60€', '', '🥛', 14, true),
  ('bebidas', 'Extra Café', 'エクストラコーヒー', 'Shot extra de café para tu bebida', 'ドリンクに追加するコーヒーショット', '0,50€', '', '☕', 15, true),
  ('bebidas', 'Ristretto', 'リストレット', 'Espresso corto y concentrado, máxima intensidad', '短く濃縮されたエスプレッソ、最大限の濃さ', '1,70€', '', '☕', 16, true),
  ('bebidas', 'Flat White', 'フラットホワイト', 'Espresso doble con leche microespumada sedosa', 'ダブルエスプレッソにシルキーなマイクロフォームミルク', '2,50€', '', '☕', 17, true),
  ('bebidas', 'Café Solo', 'カフェソロ', 'Café espresso simple, puro e intenso', 'シンプルで純粋な力強いエスプレッソ', '1,80€', '', '☕', 18, true),
  ('bebidas', 'Manchado', 'マンチャード', 'Leche caliente manchada con un toque de café', '温かいミルクにほんの少しのコーヒー', '2,00€', '', '☕', 19, true),
  ('bebidas', 'Bombón', 'ボンボン', 'Espresso con leche condensada, dulce e intenso', 'エスプレッソにコンデンスミルク、甘く濃厚', '2,50€', '', '☕', 20, true),
  ('bebidas', 'Chai Latte', 'チャイラテ', 'Té Masala Chai con leche', 'マサラチャイティーとミルク', '3,00€', '', '🍵', 21, true);

-- -----------------------------------------
-- BEBIDAS FRÍAS (type=bebidas, hot=false)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order, hot) VALUES
  ('bebidas', 'Iced Latte', 'アイスラテ', 'Café con leche ya preparado en vaso con hielo', '氷入りグラスのアイスカフェラテ', '2,50€', '', '🧊', 22, false),
  ('bebidas', 'Iced Matcha Latte', 'アイス抹茶ラテ', 'Matcha ceremonial frío con leche y hielo', '冷たい茶道用抹茶とミルク、氷入り', '4,10€', '', '🍵', 23, false),
  ('bebidas', 'Iced Pink Latte', 'アイスピンクラテ', 'Latte de remolacha frío con hielo, dulce y refrescante', 'ビーツの冷たいラテ、甘くて爽やか', '4,00€', '', '🌸', 24, false),
  ('bebidas', 'Iced Mocca', 'アイスモカ', 'Café con leche y jarabe de chocolate con hielo', 'コーヒーとミルクにチョコレートシロップ、氷入り', '4,00€', '', '🧊', 25, false),
  ('bebidas', 'Coca Cola Original', 'コカ・コーラ', 'Refresco de cola clásico', '定番コーラドリンク', '3,00€', '', '🥤', 26, false),
  ('bebidas', 'Coca Cola Zero', 'コカ・コーラ ゼロ', 'Refresco de cola sin azúcar', 'ゼロシュガーコーラ', '3,00€', '', '🥤', 27, false),
  ('bebidas', 'Coca Cola Zero-Zero', 'コカ・コーラ ゼロゼロ', 'Cola sin azúcar ni cafeína', 'シュガーフリー・カフェインフリーコーラ', '3,00€', '', '🥤', 28, false),
  ('bebidas', 'Aquarius Limón', 'アクエリアス レモン', 'Bebida isotónica sabor limón', 'レモン味のスポーツドリンク', '3,00€', '', '🥤', 29, false),
  ('bebidas', 'Aquarius Naranja', 'アクエリアス オレンジ', 'Bebida isotónica sabor naranja', 'オレンジ味のスポーツドリンク', '3,00€', '', '🥤', 30, false),
  ('bebidas', 'Zumo de Naranja', 'オレンジジュース', 'Zumo de naranja natural', '天然オレンジジュース', '3,00€', '', '🍊', 31, false),
  ('bebidas', 'Agua Mineral', 'ミネラルウォーター', 'Agua mineral natural', '天然ミネラルウォーター', '2,00€', '', '💧', 32, false),
  ('bebidas', 'Agua con Gas', '炭酸水', 'Agua mineral con gas refrescante', 'スパークリングミネラルウォーター', '3,00€', '', '💧', 33, false),
  ('bebidas', 'Fuze Tea', 'フューズティー', 'Té frío con sabor frutal', 'フルーティーなアイスティー', '3,00€', '', '🍵', 34, false),
  ('bebidas', 'Sprite', 'スプライト', 'Refresco de lima-limón', 'ライムレモンソーダ', '3,00€', '', '🥤', 35, false),
  ('bebidas', 'Zumo de Melocotón', 'ピーチジュース', 'Zumo de melocotón natural', '天然ピーチジュース', '2,20€', '', '🍑', 36, false),
  ('bebidas', 'Agua Tónica', 'トニックウォーター', 'Agua tónica con burbujas y toque amargo', '苦みと泡のトニックウォーター', '2,50€', '', '💧', 37, false),
  ('bebidas', 'Fanta Limón', 'ファンタレモン', 'Refresco de limón con gas', 'レモン炭酸ドリンク', '3,00€', '', '🥤', 38, false),
  ('bebidas', 'Zumo de Tomate', 'トマトジュース', 'Zumo de tomate natural', '天然トマトジュース', '2,20€', '', '🍅', 39, false),
  ('bebidas', 'Bitter Kas', 'ビターカス', 'Refresco amargo sin alcohol', 'ノンアルコールのビタードリンク', '2,90€', '', '🥤', 40, false),
  ('bebidas', 'Monster Zero', 'モンスター ゼロ', 'Bebida energizante cero calorías', 'ゼロカロリーのエナジードリンク', '3,00€', '', '⚡', 41, false),
  ('bebidas', 'Bebida Sabor Uva', 'グレープドリンク', 'Bebida japonesa con sabor a uva', 'ぶどう味のドリンク', '3,50€', '', '🍇', 42, false),
  ('bebidas', 'Bebida Sabor Melocotón', 'ピーチドリンク', 'Bebida japonesa con sabor a melocotón', '桃味のドリンク', '3,50€', '', '🍑', 43, false),
  ('bebidas', 'Té Negro Sabor Limón', 'レモンティー（紅茶）', 'Té negro frío con sabor a limón', 'レモン風味の冷たい紅茶', '3,50€', '', '🍵', 44, false),
  ('bebidas', 'Té Verde Sabor Limón', 'レモンティー（緑茶）', 'Té verde frío con sabor a limón', 'レモン風味の冷たい緑茶', '3,50€', '', '🍵', 45, false),
  ('bebidas', 'Té Oolong Sabor Limón', 'レモンウーロン茶', 'Té oolong frío con sabor a limón', 'レモン風味の冷たいウーロン茶', '3,50€', '', '🍵', 46, false);

-- -----------------------------------------
-- BUBBLE TEA (type=bebidas, hot=false)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order, hot) VALUES
  ('bebidas', 'Bubble Tea', 'バブルティー', 'Bebida refrescante con base cremosa o de té, perlas de tapioca y sabores irresistibles. Elige entre: Matcha, Taro, Clásico u Oreo', 'クリーミーまたはティーベースの爽やかなドリンク。タピオカパールとたまらないフレーバー。抹茶、タロ、クラシック、オレオから選べます', '5,00€', '', '🧋', 47, false);

-- -----------------------------------------
-- CERVEZAS Y VINOS (type=bebidas, hot=false)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order, hot) VALUES
  ('bebidas', 'Barril Alhambra (Doble)', 'アルハンブラ生ビール（ダブル）', 'Cerveza de barril Alhambra, tamaño doble', 'アルハンブラ生ビール、ダブルサイズ', '3,50€', '', '🍺', 48, false),
  ('bebidas', 'Barril Alhambra (Jarra)', 'アルハンブラ生ビール（ジョッキ）', 'Cerveza de barril Alhambra en jarra', 'アルハンブラ生ビール、ジョッキ', '4,50€', '', '🍺', 49, false),
  ('bebidas', 'Cerveza Tercio Mahou Verde', 'マオウ・グリーン瓶ビール', 'Cerveza Mahou cinco estrellas en botella tercio', 'マオウ五つ星の瓶ビール', '3,50€', '', '🍺', 50, false),
  ('bebidas', 'Copa de Vino', 'ワイングラス', 'Copa de vino tinto o blanco', '赤または白ワインのグラス', '3,20€', '', '🍷', 51, false),
  ('bebidas', 'Caña', 'カーニャ', 'Cerveza de barril en vaso pequeño', '小グラスの生ビール', '2,50€', '', '🍺', 52, false),
  ('bebidas', 'Vermut', 'ベルムット', 'Vermut clásico español de grifo', 'スペイン伝統の生ベルムット', '3,30€', '', '🍷', 53, false),
  ('bebidas', 'Cerveza Tercio Mahou Roja', 'マオウ・レッド瓶ビール', 'Cerveza Mahou especial en botella tercio', 'マオウ・スペシャルの瓶ビール', '3,50€', '', '🍺', 54, false),
  ('bebidas', 'Cerveza Tostada 0.0', 'ノンアルコールビール', 'Cerveza tostada sin alcohol', 'ノンアルコールのトーストビール', '3,50€', '', '🍺', 55, false),
  ('bebidas', 'Tinto Verano', 'ティントデベラーノ', 'Vino tinto con gaseosa, refrescante clásico español', '赤ワインのソーダ割り、スペインの爽やかな定番', '3,40€', '', '🍷', 56, false);

-- -----------------------------------------
-- COPEO (type=bebidas, hot=false)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order, hot) VALUES
  ('bebidas', 'Ginebra', 'ジン', 'Copa de ginebra premium con tónica', 'プレミアムジンのジントニック', '6,90€', '', '🥃', 57, false),
  ('bebidas', 'Ron', 'ラム', 'Copa de ron selecto con refresco', '厳選ラム酒のソーダ割り', '6,90€', '', '🥃', 58, false),
  ('bebidas', 'Whisky', 'ウイスキー', 'Copa de whisky selecto', '厳選ウイスキー', '6,90€', '', '🥃', 59, false);

-- -----------------------------------------
-- COMBOS (type=combos)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order) VALUES
  ('combos', 'Combo Croissant Mantequilla', 'コンボ バタークロワッサン', 'Croissant de mantequilla + bebida caliente', 'バタークロワッサン＋ホットドリンク', '3,90€', '', '🥐', 0),
  ('combos', 'Combo Croissant Mixto', 'コンボ ミックスクロワッサン', 'Croissant mixto + bebida caliente', 'ミックスクロワッサン＋ホットドリンク', '5,80€', '', '🥐', 1),
  ('combos', 'Combo Sandwich Mixto', 'コンボ ミックスサンド', 'Sandwich mixto + bebida caliente', 'ミックスサンドイッチ＋ホットドリンク', '4,60€', '', '🥪', 2),
  ('combos', 'Combo Tostada', 'コンボ トスターダ', 'Tostada completa + bebida caliente', 'トースト＋ホットドリンク', '3,90€', '', '🍞', 3),
  ('combos', 'Combo 1/2 Tostada', 'コンボ ハーフトースト', 'Media tostada + bebida caliente', 'ハーフトースト＋ホットドリンク', '3,50€', '', '🍞', 4),
  ('combos', 'Combo Napo Choco', 'コンボ チョコナポリタン', 'Napolitana de chocolate + bebida caliente', 'チョコナポリタン＋ホットドリンク', '3,90€', '', '🍫', 5),
  ('combos', 'Combo 2 Mochis', 'コンボ 餅2個', 'Dos mochis a elegir + bebida caliente', 'お好みの餅2個＋ホットドリンク', '5,50€', '', '🍡', 6),
  ('combos', 'Combo 3 Mini Croissant', 'コンボ ミニクロワッサン3個', 'Tres mini croissants a elegir + bebida caliente', 'お好みのミニクロワッサン3個＋ホットドリンク', '3,00€', '', '🥐', 7),
  ('combos', 'Combo San Valentín', 'バレンタインコンボ', 'Mochi de tarta de queso con fresa más dos bebidas', 'いちごチーズケーキ餅＋ドリンク2杯', '7,90€', '', '💝', 8),
  ('combos', 'Combo Bubble Tea', 'コンボ バブルティー', 'Un bubble tea + 2 mochis de tu elección', 'バブルティー1杯＋お好みの餅2個', '7,50€', '', '🧋', 9);

-- -----------------------------------------
-- BOLLERÍA / TARTAS (type=postres)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order) VALUES
  ('postres', 'Cookie Clásica', 'クラシッククッキー', 'Galleta artesanal crujiente recién horneada', '焼きたてのサクサク手作りクッキー', '2,50€', '', '🍪', 0),
  ('postres', 'Napolitana Chocolate', 'チョコナポリタン', 'Hojaldre crujiente relleno de chocolate', 'サクサクのパイ生地にチョコレート', '2,30€', '', '🍫', 1),
  ('postres', 'Porción Tarta Zanahoria', 'キャロットケーキ', 'Porción de tarta de zanahoria casera con frosting de queso crema', 'クリームチーズフロスティングの自家製キャロットケーキ', '4,00€', '', '🥕', 2),
  ('postres', 'Bizcocho de Limón', 'レモンケーキ', 'Bizcocho esponjoso de limón recién horneado', '焼きたてのふわふわレモンケーキ', '2,90€', '', '🍋', 3),
  ('postres', 'Tarta de Limón', 'レモンタルト', 'Tradicional tarta de limón con merengue italiano, hecha en casa', 'イタリアンメレンゲの伝統的なレモンタルト、自家製', '4,90€', '', '🍋', 4),
  ('postres', 'Tarta de Queso', 'チーズケーキ', 'Tarta de queso hecha en casa', '自家製チーズケーキ', '4,49€', '', '🧀', 5);

-- -----------------------------------------
-- TORTITAS / GOFRES (type=postres)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order) VALUES
  ('postres', 'Tortita', 'パンケーキ', 'Tortita esponjosa con un sirope y una fruta a elegir', 'ふわふわパンケーキ、お好みのシロップとフルーツ付き', '5,50€', '', '🥞', 6),
  ('postres', 'Gofres', 'ワッフル', 'Gofre crujiente por fuera, esponjoso por dentro', '外はカリカリ、中はふわふわのワッフル', '5,50€', '', '🧇', 7);

-- -----------------------------------------
-- DORAYAKIS (type=postres)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order) VALUES
  ('postres', 'Dorayaki', 'どら焼き', 'Clásico dulce japonés: dos bizcochos esponjosos rellenos de anko', '日本の定番おやつ：ふわふわの生地にあんこを挟んだどら焼き', '5,10€', '', '🥞', 8);

-- -----------------------------------------
-- CROISSANTS / BAGELS (type=salados)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order) VALUES
  ('salados', 'Croissant Mantequilla', 'バタークロワッサン', 'Croissant de mantequilla artesanal recién horneado', '焼きたての手作りバタークロワッサン', '2,30€', '', '🥐', 0),
  ('salados', 'Croissant Cereales', 'シリアルクロワッサン', 'Croissant de cereales crujiente y aromático', '香ばしいサクサクのシリアルクロワッサン', '2,30€', '', '🥐', 1),
  ('salados', 'Croissant Mixto', 'ミックスクロワッサン', 'Con pechuga de pavo y queso', 'ターキーブレストとチーズ', '4,30€', '', '🥐', 2),
  ('salados', 'Croissant de Salmón', 'サーモンクロワッサン', 'Croissant de cereales con salmón ahumado, aguacate y queso crema', 'シリアルクロワッサンにスモークサーモン、アボカド、クリームチーズ', '5,50€', '', '🥐', 3),
  ('salados', 'Micro Croissant Natural', 'ミニクロワッサン プレーン', 'Mini croissant de mantequilla, crujiente y delicado', 'バターのミニクロワッサン、サクサクで繊細', '0,50€', '', '🥐', 4),
  ('salados', 'Micro Croissant Nutella', 'ミニクロワッサン ヌテラ', 'Mini croissant relleno de Nutella', 'ヌテラ入りミニクロワッサン', '0,50€', '', '🥐', 5),
  ('salados', 'Micro Croissant Pistacho', 'ミニクロワッサン ピスタチオ', 'Mini croissant relleno de crema de pistacho', 'ピスタチオクリーム入りミニクロワッサン', '0,50€', '', '🥐', 6),
  ('salados', 'Micro Croissant Lotus', 'ミニクロワッサン ロータス', 'Mini croissant relleno de crema Lotus Biscoff', 'ロータスビスコフクリーム入りミニクロワッサン', '0,50€', '', '🥐', 7),
  ('salados', 'Croffle', 'クロッフル', 'Croissant prensado en gofrera, crujiente y mantecoso', 'ワッフルメーカーで焼いたクロワッサン、サクサクでバター風味', '3,90€', '', '🧇', 8),
  ('salados', 'Bagel de Salmón', 'サーモンベーグル', 'Bagel con salmón, aguacate y queso crema', 'ベーグルにサーモン、アボカド、クリームチーズ', '6,60€', '', '🥯', 9),
  ('salados', 'Bagel de Semillas', 'シードベーグル', 'Bagel de semillas, acompáñalo con tus favoritos', 'シードベーグル、お好みのトッピングでどうぞ', '2,80€', '', '🥯', 10);

-- -----------------------------------------
-- TOSTADAS (type=salados)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order) VALUES
  ('salados', 'Media Tostada', 'ハーフトースト', 'Con aceite, tomate, mantequilla o mermelada', 'オイル、トマト、バター、ジャム付き', '1,80€', '', '🍞', 11),
  ('salados', 'Tostada', 'トースト', 'Con aceite, tomate, mantequilla o mermelada', 'オイル、トマト、バター、ジャム付き', '2,30€', '', '🍞', 12);

-- -----------------------------------------
-- BOCADILLOS (type=salados)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order) VALUES
  ('salados', 'Bocadillo Atún con Pimientos', 'ツナとピーマンのボカディージョ', 'Atún con pimientos y AOVE', 'ツナとピーマン、エキストラバージンオリーブオイル', '4,70€', '', '🥖', 13),
  ('salados', 'Bocadillo de Pollo', 'チキンボカディージョ', 'Pollo, queso y aguacate', 'チキン、チーズ、アボカド', '5,70€', '', '🥖', 14),
  ('salados', 'Bocadillo Granjero', 'グランヘロサンド', 'Pollo, lechuga, tomate, cebolla morada y mayonesa', 'チキン、レタス、トマト、紫玉ねぎ、マヨネーズ', '5,50€', '', '🥖', 15),
  ('salados', 'Bocadillo de Pierna', 'ピエルナサンド', 'Pierna de cerdo asada en pan crujiente', 'カリカリのパンにローストポーク', '5,90€', '', '🥖', 16);

-- -----------------------------------------
-- BAOS (type=salados)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order) VALUES
  ('salados', 'Bao Bacon con Queso', 'ベーコンチーズ包', 'Bao al vapor con bacon y queso gouda', '蒸し包にベーコンとゴーダチーズ', '4,50€', '', '🥟', 17),
  ('salados', 'Bao Salmón', 'サーモン包', 'Salmón ahumado, queso crema y rúcula', 'スモークサーモン、クリームチーズ、ルッコラ', '4,80€', '', '🥟', 18),
  ('salados', 'Bao de Pollo', 'チキン包', 'Pollo, queso crema y aguacate', 'チキン、クリームチーズ、アボカド', '4,50€', '', '🥟', 19),
  ('salados', 'Trío de Baos', '包三種盛り', 'Los tres baos: bacon, salmón y pollo', '3種の包：ベーコン、サーモン、チキン', '12,40€', '', '🥟', 20);

-- -----------------------------------------
-- TOSTAS (type=salados)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order) VALUES
  ('salados', 'Tosta Atún con Pimientos', 'ツナとピーマンのトスタ', 'Tosta crujiente con atún y pimientos asados', 'カリカリトーストにツナと焼きピーマン', '6,10€', '', '🍞', 21),
  ('salados', 'Tosta Jamón Serrano', 'ハモンセラーノのトスタ', 'Tosta con jamón serrano de calidad premium', 'プレミアムハモンセラーノのトースト', '8,50€', '', '🍞', 22),
  ('salados', 'Tosta Salmón', 'サーモンのトスタ', 'Tosta con salmón ahumado y queso crema', 'スモークサーモンとクリームチーズのトースト', '9,50€', '', '🍞', 23),
  ('salados', '1/2 Tosta Atún con Pimientos', 'ハーフ ツナとピーマンのトスタ', 'Media tosta con atún y pimientos asados', 'ハーフサイズのツナと焼きピーマンのトースト', '3,05€', '', '🍞', 24),
  ('salados', '1/2 Tosta Jamón Serrano', 'ハーフ ハモンセラーノのトスタ', 'Media tosta con jamón serrano premium', 'ハーフサイズのプレミアムハモンセラーノトースト', '4,25€', '', '🍞', 25),
  ('salados', '1/2 Tosta Salmón', 'ハーフ サーモンのトスタ', 'Media tosta con salmón ahumado y queso crema', 'ハーフサイズのスモークサーモンとクリームチーズトースト', '4,75€', '', '🍞', 26);

-- -----------------------------------------
-- + SALADOS (type=salados)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order) VALUES
  ('salados', 'Sandwich Mixto', 'ミックスサンドイッチ', 'Con pechuga de pavo y queso gouda', 'ターキーブレストとゴーダチーズ', '3,00€', '', '🥪', 27),
  ('salados', 'Sandwich Ukiyo', 'Ukiyo サンドイッチ', 'Pechuga de pavo, gouda, cebolla morada y aderezo de la casa', 'ターキーブレスト、ゴーダ、紫玉ねぎ、自家製ドレッシング', '3,20€', '', '🥪', 28),
  ('salados', 'Ramen', 'ラーメン', 'Ramen japonés con caldo reconfortante y toppings variados', '心温まるスープと様々なトッピングの日本のラーメン', '11,50€', '', '🍜', 29),
  ('salados', 'Tortilla Francesa', 'フレンチオムレツ', 'Tortilla francesa con dos huevos, pechuga de pavo y queso gouda', '卵2個のフレンチオムレツ、ターキーブレストとゴーダチーズ', '5,49€', '', '🍳', 30),
  ('salados', 'Napolitana Mixta', 'ミックスナポリタン', 'Hojaldre relleno con jamón york y queso', 'ハムとチーズ入りのパイ生地', '2,80€', '', '🥐', 31),
  ('salados', 'Empanada Atún y Tomate', 'ツナとトマトのエンパナーダ', 'Empanada crujiente rellena de atún y tomate', 'ツナとトマトのサクサクエンパナーダ', '2,80€', '', '🥟', 32);

-- -----------------------------------------
-- PAN BARRAS (type=salados)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order) VALUES
  ('salados', 'Barra Natural', 'ナチュラルバゲット', 'Barra de pan natural recién horneada', '焼きたてのナチュラルバゲット', '1,20€', '', '🥖', 33),
  ('salados', 'Barra Cereales', 'シリアルバゲット', 'Barra de pan de cereales crujiente', 'サクサクのシリアルバゲット', '1,40€', '', '🥖', 34),
  ('salados', 'Barra Integral', '全粒粉バゲット', 'Barra de pan integral nutritiva', '栄養たっぷりの全粒粉バゲット', '1,40€', '', '🥖', 35);

-- -----------------------------------------
-- RACIONES (type=raciones)
-- -----------------------------------------
INSERT INTO public.products (type, title_es, title_ja, description_es, description_ja, price, image_url, emoji, display_order) VALUES
  ('raciones', 'Ración 5 Tequeños', 'テケーニョス5本', 'Cinco palitos crujientes de masa rellenos de queso', 'チーズたっぷりの揚げスティック5本', '6,90€', '', '🧀', 0),
  ('raciones', 'Ración 10 Tequeños', 'テケーニョス10本', 'Diez palitos crujientes de masa rellenos de queso', 'チーズたっぷりの揚げスティック10本', '10,90€', '', '🧀', 1),
  ('raciones', 'Patatas Fritas', 'フライドポテト', 'Patatas gajo fritas', 'ウェッジカットフライドポテト', '3,90€', '', '🍟', 2),
  ('raciones', 'Patatas Bravas', 'パタタスブラバス', 'Patatas fritas con salsa brava y alioli', 'フライドポテトにブラバソースとアリオリ', '7,90€', '', '🍟', 3),
  ('raciones', 'Gyozas', '餃子', 'Ración de 8 gyozas con salsa de la casa', '自家製ソース付き餃子8個', '6,90€', '', '🥟', 4),
  ('raciones', 'Mini Baos con Pernil (6 uds.)', 'ミニ包ペルニル6個', 'Baos en versión ración rellenos de cerdo horneado lentamente', 'じっくりローストした豚肉入りのミニ包', '7,90€', '', '🥟', 5),
  ('raciones', 'Extra Patatas Fritas (de bolsa)', 'ポテトチップス追加', 'Bolsa de patatas fritas como acompañamiento', 'サイドメニューの袋入りポテトチップス', '1,00€', '', '🍟', 6);


-- =============================================
-- STEP 6: Rebuild highlight_items
-- =============================================

-- menuSlider (6 items)
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuSlider', id, 0 FROM public.products
  WHERE title_es = 'Mochis Artesanales' AND type = 'mochis' AND display_order = 100;
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuSlider', id, 1 FROM public.products
  WHERE title_es = 'Matcha Latte' AND type = 'bebidas';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuSlider', id, 2 FROM public.products
  WHERE title_es = 'Bubble Tea' AND type = 'bebidas';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuSlider', id, 3 FROM public.products
  WHERE title_es = 'Ramen' AND type = 'salados';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuSlider', id, 4 FROM public.products
  WHERE title_es = 'Croffle' AND type = 'salados';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuSlider', id, 5 FROM public.products
  WHERE title_es = 'Combo Bubble Tea' AND type = 'combos';

-- specialtyDrinks: 4 hot + 4 cold
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'specialtyDrinks', id, 0 FROM public.products
  WHERE title_es = 'Café Latte' AND type = 'bebidas';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'specialtyDrinks', id, 1 FROM public.products
  WHERE title_es = 'Matcha Latte' AND type = 'bebidas';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'specialtyDrinks', id, 2 FROM public.products
  WHERE title_es = 'Chai Latte' AND type = 'bebidas';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'specialtyDrinks', id, 3 FROM public.products
  WHERE title_es = 'Pink Latte' AND type = 'bebidas';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'specialtyDrinks', id, 4 FROM public.products
  WHERE title_es = 'Iced Latte' AND type = 'bebidas';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'specialtyDrinks', id, 5 FROM public.products
  WHERE title_es = 'Iced Matcha Latte' AND type = 'bebidas';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'specialtyDrinks', id, 6 FROM public.products
  WHERE title_es = 'Iced Pink Latte' AND type = 'bebidas';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'specialtyDrinks', id, 7 FROM public.products
  WHERE title_es = 'Bubble Tea' AND type = 'bebidas';

-- menuHighlights (3 items)
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuHighlights', id, 0 FROM public.products
  WHERE title_es = 'Combo Bubble Tea' AND type = 'combos';
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuHighlights', id, 1 FROM public.products
  WHERE title_es = 'Mochis Artesanales' AND type = 'mochis' AND display_order = 100;
INSERT INTO public.highlight_items (section, product_id, display_order)
  SELECT 'menuHighlights', id, 2 FROM public.products
  WHERE title_es = 'Tarta de Limón' AND type = 'postres';

COMMIT;
