export type Locale = "es" | "ja";

export const translations: Record<Locale, Translations> = {
  es: {
    // Navigation
    nav: {
      aboutUs: "Sobre Nosotros",
      faq: "FAQ",
      buyNow: "Compra Ahora",
      home: "Inicio",
      store: "Tienda",
      ourPolicies: "Nuestras políticas",
      termsAndConditions: "Términos y Condiciones",
      privacyPolicy: "Política de Privacidad",
      toggleMenu: "Toggle menu",
    },

    // Hero
    hero: {
      tagline: "~ El mundo flotante ~",
      title: "Mochis Artesanales y Café",
      titleAccent: "de Especialidad",
      imageAlt:
        "Ukiyo Mochis and Coffee - Fachada estilo anime de nuestra tienda de mochis artesanales y café en Madrid Norte",
    },

    // Product Categories
    categories: {
      sectionTitle: "Nuestras Delicias",
      card1Title: "Momentos de dulzura,",
      card1Subtitle: "sabores únicos",
      card1Desc:
        "Descubre nuestros mochis artesanales elaborados a mano en Madrid Norte con ingredientes de primera calidad e inspiración japonesa.",
      card1ImageAlt:
        "Mochis artesanales japoneses en Madrid Norte - Ukiyo Mochis & Coffee Fuencarral",
      card2Title: "Bubble Tea",
      card2Desc:
        "Refrescantes bubble teas con sabores auténticos y toppings únicos. Boba tea artesanal en Madrid Norte.",
      card2ImageAlt:
        "Bubble tea artesanal en Madrid Norte - Boba tea y té de burbujas en Ukiyo",
      card3Title: "Sabores únicos disponibles",
      card3Desc:
        "Variedad de sabores que combinan tradición japonesa con toques creativos. Anko, matcha, maracuyá y más en Madrid Norte.",
      card3ImageAlt:
        "Variedad de mochis y sabores japoneses en Madrid Norte - anko, matcha y más",
      explore: "Explorar",
    },

    // Specialty Drinks
    drinks: {
      sectionTitle: "Bebidas de Especialidad",
      subtitle: "Café, matcha, bubble tea y más — preparados con amor",
      hot: "Caliente",
      cold: "Frío / Bubble Tea",
      switchToCold: "Cambiar a bebidas frías",
      switchToHot: "Cambiar a bebidas calientes",
      hotDrinks: [
        {
          name: "Café Latte Ukiyo",
          description:
            "Espresso suave con leche cremosa y un toque de vainilla",
        },
        {
          name: "Matcha Latte",
          description: "Té matcha ceremonial japonés con leche espumosa",
        },
        {
          name: "Hojicha Latte",
          description: "Té tostado japonés con notas ahumadas y dulces",
        },
        {
          name: "Chocolate Caliente Mochi",
          description: "Chocolate belga con malvaviscos mochi caseros",
        },
      ],
      coldDrinks: [
        {
          name: "Bubble Tea Clásico",
          description:
            "Té negro con leche, perlas de tapioca y azúcar morena",
        },
        {
          name: "Taro Bubble Tea",
          description:
            "Crema de taro con perlas de tapioca y leche de coco",
        },
        {
          name: "Matcha Bubble Tea",
          description: "Matcha frío con leche de avena y perlas de mango",
        },
        {
          name: "Fresa Bubble Tea",
          description: "Fresa natural con leche y boba de fresa",
        },
      ],
    },

    // About
    about: {
      heading: "Repostería japonesa artesanal en Madrid Norte",
      quote:
        "Ukiyo — el mundo flotante, donde cada momento es para saborear",
      paragraph1:
        "En Ukiyo Mochis & Coffee, somos la tienda de referencia de mochis artesanales en Madrid Norte. Desde nuestro local en Fuencarral-El Pardo, elaboramos a mano dulces japoneses que combinan tradición y creatividad, acompañados de café de especialidad y bubble tea.",
      paragraph2:
        "Cada mochi es preparado uno a uno con ingredientes de primera calidad, cuidando su textura, sabor y estética. Ofrecemos sabores como anko, matcha, maracuyá, fresa y chocolate, fusionando lo mejor de la repostería japonesa con un toque moderno y madrileño.",
      buyButton: "Comprar",
      imageAlt:
        "Elaboración de mochis artesanales en Ukiyo Mochis & Coffee Madrid Norte",
    },

    // Testimonial (home page)
    testimonial: {
      quote:
        "Los mochis de Ukiyo son una delicia, suaves y cremosos, perfectos para disfrutar con café. La mejor tienda de mochis de Madrid Norte.",
      name: "Lourdes López",
    },

    // Location
    location: {
      heading: "Visítanos en Madrid Norte",
      address:
        "Santiago de Compostela 36, Fuencarral-El Pardo, 28034 Madrid",
      hours:
        "Horario: Lun-Vie 10:00-20:00 · Sáb 10:00-21:00 · Dom 11:00-19:00",
      openInWaze: "Abrir en Waze",
      imageAlt:
        "Tienda Ukiyo Mochis & Coffee en Madrid Norte - Santiago de Compostela 36, Fuencarral-El Pardo",
    },

    // FAQ
    faq: {
      sectionTitle: "Preguntas frecuentes",
      subtitle:
        "Todo lo que necesitas saber sobre nuestros mochis artesanales, bubble tea y café de especialidad en Madrid Norte",
      items: [
        {
          question:
            "¿Dónde está Ukiyo Mochis & Coffee en Madrid Norte?",
          answer:
            "Nuestra tienda está ubicada en Santiago de Compostela 36, en el barrio de Fuencarral-El Pardo, 28034 Madrid Norte. Estamos en una zona muy accesible con transporte público y fácil aparcamiento. ¡Te esperamos!",
        },
        {
          question: "¿Qué son los mochis artesanales de Ukiyo?",
          answer:
            "Los mochis son un dulce tradicional japonés elaborado con masa de arroz glutinoso. En Ukiyo, elaboramos cada mochi a mano con ingredientes de primera calidad, combinando la tradición japonesa con sabores creativos y contemporáneos. Ofrecemos variedades con rellenos como matcha, fresa, maracuyá, chocolate y muchos más.",
        },
        {
          question: "¿Qué es el bubble tea y qué sabores tenéis?",
          answer:
            "El bubble tea (también conocido como boba tea o té de burbujas) es una bebida de origen asiático que combina té con leche y perlas de tapioca. En Ukiyo Madrid Norte ofrecemos una amplia variedad de sabores refrescantes con toppings únicos, perfectos para cualquier momento del día.",
        },
        {
          question:
            "¿Hacéis envíos de mochis a domicilio en Madrid?",
          answer:
            "Sí, puedes pedir nuestros mochis artesanales a domicilio a través de Glovo. También puedes hacer pedidos por WhatsApp al +34 605 43 86 63 o visitarnos directamente en nuestra tienda de Madrid Norte en Fuencarral-El Pardo.",
        },
        {
          question:
            "¿Cuál es el horario de Ukiyo Mochis en Madrid Norte?",
          answer:
            "Nuestro horario es de lunes a viernes de 10:00 a 20:00, sábados de 10:00 a 21:00 y domingos de 11:00 a 19:00. Te recomendamos visitarnos para descubrir todos nuestros sabores de mochis y bubble tea.",
        },
        {
          question:
            "¿Tenéis opciones sin gluten o para alérgicos?",
          answer:
            "Los mochis tradicionales están elaborados con harina de arroz glutinoso, que es naturalmente libre de gluten de trigo. Sin embargo, te recomendamos consultar con nuestro equipo sobre los ingredientes específicos de cada variedad si tienes alergias alimentarias.",
        },
        {
          question:
            "¿Se pueden hacer pedidos para eventos o celebraciones?",
          answer:
            "¡Por supuesto! Ofrecemos packs especiales de mochis artesanales ideales para cumpleaños, bodas, eventos corporativos y cualquier celebración. Contáctanos por email a hola@mochisukiyo.com o por WhatsApp para personalizar tu pedido.",
        },
        {
          question:
            "¿Qué hace especial a los mochis de Ukiyo frente a otros en Madrid?",
          answer:
            "En Ukiyo Mochis & Coffee cada mochi es preparado a mano, uno a uno, con ingredientes de alta calidad importados y locales. No somos una franquicia ni usamos producción industrial. Nuestra pasión por la repostería japonesa y nuestro enfoque artesanal nos diferencia como la tienda de referencia de mochis en Madrid Norte.",
        },
      ],
    },

    // Footer
    footer: {
      brandDescription:
        "Mochis artesanales, bubble tea y café de especialidad en Madrid Norte",
      policiesTitle: "Nuestras Políticas",
      contactTitle: "Contacto",
      newsletterTitle:
        "¿Quieres estar enterado de nuestros sabores?",
      newsletterButton: "Quiero enterarme de los nuevos sabores",
      emailPlaceholder: "Ingresa tu correo electrónico",
      allRightsReserved: "All rights reserved.",
    },

    // Tienda Hero
    tiendaHero: {
      tagline: "~ Tienda Online ~",
      heading:
        "Pide Mochis Artesanales a Domicilio en Madrid Norte",
      description:
        "Disfruta de nuestros packs de mochis japoneses, bubble tea y café de especialidad. ¡Haz tu pedido ahora con Glovo!",
      orderButton: "Ordenar con Glovo",
      starRating: "5 estrellas de satisfacción",
      imageAlt:
        "Tienda de mochis artesanales y bubble tea en Madrid Norte - Pide con Glovo desde Fuencarral-El Pardo",
    },

    // Tienda Products
    tiendaProducts: {
      sectionTitle: "Nuestros productos",
      available: "Disponible",
      viewProduct: "Ver producto",
      products: [
        {
          name: "Mochis artesanales Ukiyo",
          description:
            "Descubre nuestros mochis artesanales, inspirados en la tradición japonesa. Elaborados diariamente a mano, suaves por fuera y cremosos por dentro, con sabores como oreo, nutella, maracuyá y más.",
        },
        {
          name: "Mochis artesanales de Ukiyo",
          description:
            "Mochis artesanales inspirados en la tradición japonesa. Cada bocado es suave por fuera y cremoso por dentro, con sabores como oreo, nutella, maracuyá y más. Elaborados a mano con ingredientes de alta calidad.",
        },
      ],
    },

    // Tienda Testimonials
    tiendaTestimonials: {
      prevLabel: "Testimonio anterior",
      nextLabel: "Siguiente testimonio",
      goToLabel: "Ir al testimonio",
      items: [
        {
          name: "Sofía M.",
          text: "Los mochis de Ukiyo son simplemente deliciosos, cada bocado es una experiencia única y satisfactoria.",
        },
        {
          name: "Carlos G.",
          text: "Me encantaron los sabores, especialmente el de maracuyá. El café complementó perfectamente esta deliciosa elección.",
        },
        {
          name: "María R.",
          text: "Los mejores mochis artesanales que he probado en Madrid. La textura es perfecta y los sabores son increíbles.",
        },
      ],
    },

    // Breadcrumbs
    breadcrumbs: {
      home: "Inicio",
      homeSubtitle: "Mochis y Café en Madrid Norte",
      store: "Tienda",
      storeSubtitle: "Mochis y Bubble Tea en Madrid Norte",
    },

    // WhatsApp
    whatsapp: {
      ariaLabel: "Contactar por WhatsApp",
    },

    // Logo alt
    logoAlt:
      "Ukiyo Mochis & Coffee - Mochis artesanales y café en Madrid Norte",
  },

  ja: {
    // Navigation
    nav: {
      aboutUs: "私たちについて",
      faq: "よくある質問",
      buyNow: "今すぐ購入",
      home: "ホーム",
      store: "ショップ",
      ourPolicies: "ポリシー",
      termsAndConditions: "利用規約",
      privacyPolicy: "プライバシーポリシー",
      toggleMenu: "メニュー切替",
    },

    // Hero
    hero: {
      tagline: "～ 浮世 ～",
      title: "職人の餅とスペシャルティ",
      titleAccent: "コーヒー",
      imageAlt:
        "Ukiyo Mochis and Coffee - マドリード北部の職人餅とコーヒーショップのアニメ風外観",
    },

    // Product Categories
    categories: {
      sectionTitle: "こだわりの逸品",
      card1Title: "甘いひととき、",
      card1Subtitle: "唯一無二の味わい",
      card1Desc:
        "マドリード北部で一つ一つ手作りされた職人の餅をお楽しみください。厳選素材と日本のインスピレーションから生まれた逸品です。",
      card1ImageAlt:
        "マドリード北部の手作り和風餅 - Ukiyo Mochis & Coffee フエンカラル",
      card2Title: "バブルティー",
      card2Desc:
        "本格的なフレーバーとユニークなトッピングの爽やかなバブルティー。マドリード北部の手作りボバティー。",
      card2ImageAlt:
        "マドリード北部の手作りバブルティー - Ukiyoのボバティーとタピオカティー",
      card3Title: "ユニークなフレーバー",
      card3Desc:
        "日本の伝統とクリエイティブなアレンジが融合した多彩なフレーバー。あんこ、抹茶、パッションフルーツなど。",
      card3ImageAlt:
        "マドリード北部の和風餅と日本のフレーバー各種 - あんこ、抹茶など",
      explore: "詳しく見る",
    },

    // Specialty Drinks
    drinks: {
      sectionTitle: "スペシャルティドリンク",
      subtitle: "コーヒー、抹茶、バブルティーなど — 心を込めて",
      hot: "ホット",
      cold: "コールド / バブルティー",
      switchToCold: "コールドドリンクに切り替え",
      switchToHot: "ホットドリンクに切り替え",
      hotDrinks: [
        {
          name: "Ukiyo カフェラテ",
          description: "なめらかなエスプレッソにクリーミーなミルクとバニラの香り",
        },
        {
          name: "抹茶ラテ",
          description: "日本の茶道用抹茶とふわふわのミルク",
        },
        {
          name: "ほうじ茶ラテ",
          description: "焙煎された日本茶のスモーキーで甘い風味",
        },
        {
          name: "餅ホットチョコレート",
          description: "ベルギーチョコレートと自家製餅マシュマロ",
        },
      ],
      coldDrinks: [
        {
          name: "クラシックバブルティー",
          description: "紅茶とミルク、タピオカパール、黒糖",
        },
        {
          name: "タロバブルティー",
          description: "タロクリームとタピオカパール、ココナッツミルク",
        },
        {
          name: "抹茶バブルティー",
          description: "アイス抹茶とオーツミルク、マンゴーパール",
        },
        {
          name: "いちごバブルティー",
          description: "フレッシュいちごとミルク、いちごボバ",
        },
      ],
    },

    // About
    about: {
      heading: "マドリード北部の手作り和菓子",
      quote:
        "浮世 — 移ろいゆく世界、一瞬一瞬を味わうところ",
      paragraph1:
        "Ukiyo Mochis & Coffeeは、マドリード北部を代表する手作り餅の専門店です。フエンカラル・エル・パルドの店舗から、伝統と創造性を融合させた日本のスイーツを一つ一つ手作りし、スペシャルティコーヒーやバブルティーとともにお届けしています。",
      paragraph2:
        "一つ一つの餅を最高品質の素材で丁寧に仕上げ、食感、味わい、美しさにこだわっています。あんこ、抹茶、パッションフルーツ、いちご、チョコレートなど、和菓子の伝統にモダンなマドリードのエッセンスを加えたフレーバーをご用意しています。",
      buyButton: "購入する",
      imageAlt:
        "Ukiyo Mochis & Coffee マドリード北部での手作り餅の製造風景",
    },

    // Testimonial (home page)
    testimonial: {
      quote:
        "Ukiyoの餅は絶品です。柔らかくてクリーミーで、コーヒーと一緒に楽しむのに最適。マドリード北部で一番の餅屋さんです。",
      name: "ルルデス・ロペス",
    },

    // Location
    location: {
      heading: "マドリード北部の店舗へお越しください",
      address:
        "Santiago de Compostela 36, Fuencarral-El Pardo, 28034 Madrid",
      hours:
        "営業時間: 月～金 10:00-20:00 · 土 10:00-21:00 · 日 11:00-19:00",
      openInWaze: "Wazeで開く",
      imageAlt:
        "Ukiyo Mochis & Coffee マドリード北部店 - Santiago de Compostela 36, Fuencarral-El Pardo",
    },

    // FAQ
    faq: {
      sectionTitle: "よくある質問",
      subtitle:
        "マドリード北部の手作り餅、バブルティー、スペシャルティコーヒーについて知っておきたいこと",
      items: [
        {
          question:
            "マドリード北部のUkiyo Mochis & Coffeeはどこにありますか？",
          answer:
            "当店はフエンカラル・エル・パルド地区のSantiago de Compostela 36番地、28034マドリード北部にあります。公共交通機関でのアクセスが良く、駐車場も近くにあります。お待ちしております！",
        },
        {
          question: "Ukiyoの手作り餅とは何ですか？",
          answer:
            "餅は、もち米の生地で作る日本の伝統的なスイーツです。Ukiyoでは、最高品質の素材を使い一つ一つ手作りし、日本の伝統とクリエイティブで現代的なフレーバーを融合させています。抹茶、いちご、パッションフルーツ、チョコレートなど様々な味をご用意しています。",
        },
        {
          question:
            "バブルティーとは何ですか？どんなフレーバーがありますか？",
          answer:
            "バブルティー（ボバティーやタピオカティーとも呼ばれます）は、紅茶にミルクとタピオカパールを加えたアジア発祥の飲み物です。Ukiyoマドリード北部では、ユニークなトッピングの爽やかなフレーバーを豊富にご用意しています。",
        },
        {
          question:
            "マドリードへの餅の配達はできますか？",
          answer:
            "はい、Glovoを通じて手作り餅をご自宅にお届けできます。WhatsApp（+34 605 43 86 63）でのご注文や、マドリード北部フエンカラル・エル・パルドの店舗への直接のご来店も承っております。",
        },
        {
          question:
            "マドリード北部のUkiyo Mochisの営業時間は？",
          answer:
            "営業時間は月曜日から金曜日の10:00～20:00、土曜日の10:00～21:00、日曜日の11:00～19:00です。ぜひお越しいただき、餅やバブルティーの全フレーバーをお試しください。",
        },
        {
          question:
            "グルテンフリーやアレルギー対応のオプションはありますか？",
          answer:
            "伝統的な餅はもち米粉で作られており、小麦グルテンは含まれていません。ただし、食物アレルギーのある方は、各種の具体的な原材料について当店スタッフにご確認いただくことをお勧めします。",
        },
        {
          question:
            "イベントやお祝いの注文はできますか？",
          answer:
            "もちろんです！誕生日、結婚式、企業イベントなど、あらゆるお祝いに最適な手作り餅の特別パックをご用意しています。hola@mochisukiyo.comまたはWhatsAppでお気軽にご連絡ください。",
        },
        {
          question:
            "マドリードの他の餅と比べてUkiyoの餅の特長は？",
          answer:
            "Ukiyo Mochis & Coffeeでは、輸入素材と地元素材を厳選し、一つ一つ手作りで仕上げています。フランチャイズでも工業生産でもありません。和菓子への情熱と職人のこだわりが、マドリード北部を代表する餅専門店としての強みです。",
        },
      ],
    },

    // Footer
    footer: {
      brandDescription:
        "マドリード北部の手作り餅、バブルティー、スペシャルティコーヒー",
      policiesTitle: "ポリシー",
      contactTitle: "お問い合わせ",
      newsletterTitle: "新しいフレーバー情報をお届けしますか？",
      newsletterButton: "新フレーバーの情報を受け取る",
      emailPlaceholder: "メールアドレスを入力",
      allRightsReserved: "All rights reserved.",
    },

    // Tienda Hero
    tiendaHero: {
      tagline: "～ オンラインショップ ～",
      heading: "マドリード北部へ手作り餅をお届け",
      description:
        "手作り餅パック、バブルティー、スペシャルティコーヒーをお楽しみください。Glovoで今すぐ注文！",
      orderButton: "Glovoで注文",
      starRating: "満足度5つ星",
      imageAlt:
        "マドリード北部の手作り餅とバブルティーショップ - Glovoでフエンカラル・エル・パルドから注文",
    },

    // Tienda Products
    tiendaProducts: {
      sectionTitle: "商品ラインナップ",
      available: "在庫あり",
      viewProduct: "商品を見る",
      products: [
        {
          name: "Ukiyo 手作り餅",
          description:
            "日本の伝統にインスピレーションを得た手作り餅。毎日一つ一つ手作りで、外はもちもち中はクリーミー。オレオ、ヌテラ、パッションフルーツなどの味をご用意。",
        },
        {
          name: "Ukiyo 手作り餅セット",
          description:
            "日本の伝統にインスピレーションを得た手作り餅。一口ごとに外はもちもち中はクリーミー。オレオ、ヌテラ、パッションフルーツなど。厳選素材で手作り。",
        },
      ],
    },

    // Tienda Testimonials
    tiendaTestimonials: {
      prevLabel: "前のレビュー",
      nextLabel: "次のレビュー",
      goToLabel: "レビューに移動",
      items: [
        {
          name: "ソフィア M.",
          text: "Ukiyoの餅は本当に美味しい。一口ごとがユニークで満足のいく体験です。",
        },
        {
          name: "カルロス G.",
          text: "フレーバーが大好きです。特にパッションフルーツが最高。コーヒーとの相性も抜群でした。",
        },
        {
          name: "マリア R.",
          text: "マドリードで食べた中で最高の手作り餅。食感も完璧で味も素晴らしいです。",
        },
      ],
    },

    // Breadcrumbs
    breadcrumbs: {
      home: "ホーム",
      homeSubtitle: "マドリード北部の餅とコーヒー",
      store: "ショップ",
      storeSubtitle: "マドリード北部の餅とバブルティー",
    },

    // WhatsApp
    whatsapp: {
      ariaLabel: "WhatsAppでお問い合わせ",
    },

    // Logo alt
    logoAlt:
      "Ukiyo Mochis & Coffee - マドリード北部の手作り餅とコーヒー",
  },
};

interface DrinkItem {
  name: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface TestimonialItem {
  name: string;
  text: string;
}

interface ProductItem {
  name: string;
  description: string;
}

export interface Translations {
  nav: {
    aboutUs: string;
    faq: string;
    buyNow: string;
    home: string;
    store: string;
    ourPolicies: string;
    termsAndConditions: string;
    privacyPolicy: string;
    toggleMenu: string;
  };
  hero: {
    tagline: string;
    title: string;
    titleAccent: string;
    imageAlt: string;
  };
  categories: {
    sectionTitle: string;
    card1Title: string;
    card1Subtitle: string;
    card1Desc: string;
    card1ImageAlt: string;
    card2Title: string;
    card2Desc: string;
    card2ImageAlt: string;
    card3Title: string;
    card3Desc: string;
    card3ImageAlt: string;
    explore: string;
  };
  drinks: {
    sectionTitle: string;
    subtitle: string;
    hot: string;
    cold: string;
    switchToCold: string;
    switchToHot: string;
    hotDrinks: DrinkItem[];
    coldDrinks: DrinkItem[];
  };
  about: {
    heading: string;
    quote: string;
    paragraph1: string;
    paragraph2: string;
    buyButton: string;
    imageAlt: string;
  };
  testimonial: {
    quote: string;
    name: string;
  };
  location: {
    heading: string;
    address: string;
    hours: string;
    openInWaze: string;
    imageAlt: string;
  };
  faq: {
    sectionTitle: string;
    subtitle: string;
    items: FaqItem[];
  };
  footer: {
    brandDescription: string;
    policiesTitle: string;
    contactTitle: string;
    newsletterTitle: string;
    newsletterButton: string;
    emailPlaceholder: string;
    allRightsReserved: string;
  };
  tiendaHero: {
    tagline: string;
    heading: string;
    description: string;
    orderButton: string;
    starRating: string;
    imageAlt: string;
  };
  tiendaProducts: {
    sectionTitle: string;
    available: string;
    viewProduct: string;
    products: ProductItem[];
  };
  tiendaTestimonials: {
    prevLabel: string;
    nextLabel: string;
    goToLabel: string;
    items: TestimonialItem[];
  };
  breadcrumbs: {
    home: string;
    homeSubtitle: string;
    store: string;
    storeSubtitle: string;
  };
  whatsapp: {
    ariaLabel: string;
  };
  logoAlt: string;
}
