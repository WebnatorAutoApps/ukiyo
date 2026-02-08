export default function LocalBusinessSchema() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": "https://www.mochisukiyo.com/#localbusiness",
    name: "Ukiyo Mochis & Coffee",
    alternateName: ["Ukiyo Mochis", "Mochisukiyo"],
    description:
      "Tienda de mochis artesanales, bubble tea y café de especialidad en Madrid Norte. Elaboramos mochis japoneses a mano con ingredientes de primera calidad en el barrio de Fuencarral-El Pardo.",
    url: "https://www.mochisukiyo.com",
    telephone: "+34605438663",
    email: "hola@mochisukiyo.com",
    image: "https://www.mochisukiyo.com/images/hero-banner.png",
    logo: "https://www.mochisukiyo.com/images/logo-ukiyo.png",
    priceRange: "€€",
    servesCuisine: ["Japonesa", "Repostería japonesa", "Café de especialidad"],
    menu: "https://www.mochisukiyo.com/tienda",
    acceptsReservations: false,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Santiago de Compostela 36",
      addressLocality: "Madrid",
      addressRegion: "Comunidad de Madrid",
      postalCode: "28034",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.4893,
      longitude: -3.7086,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Madrid",
      },
      {
        "@type": "Place",
        name: "Madrid Norte",
      },
      {
        "@type": "Place",
        name: "Fuencarral-El Pardo",
      },
    ],
    sameAs: [
      "https://www.instagram.com/ukiyomochis/",
      "https://www.tiktok.com/@ukiyomochisandcoffee",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "11:00",
        closes: "19:00",
      },
    ],
    hasMap:
      "https://www.waze.com/ul?ll=40.4893,-3.7086&navigate=yes",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "4",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Lourdes López" },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Los mochis de Ukiyo son una delicia, suaves y cremosos, perfectos para disfrutar con café.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Sofía M." },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Los mochis de Ukiyo son simplemente deliciosos, cada bocado es una experiencia única y satisfactoria.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Carlos G." },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Me encantaron los sabores, especialmente el de maracuyá. El café complementó perfectamente esta deliciosa elección.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "María R." },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Los mejores mochis artesanales que he probado en Madrid. La textura es perfecta y los sabores son increíbles.",
      },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.mochisukiyo.com/#organization",
    name: "Ukiyo Mochis & Coffee",
    legalName: "Brother Projects 1801 S.L.",
    taxID: "B19485432",
    url: "https://www.mochisukiyo.com",
    logo: "https://www.mochisukiyo.com/images/logo-ukiyo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+34605438663",
      contactType: "customer service",
      email: "hola@mochisukiyo.com",
      availableLanguage: ["Spanish", "English"],
    },
    sameAs: [
      "https://www.instagram.com/ukiyomochis/",
      "https://www.tiktok.com/@ukiyomochisandcoffee",
    ],
  };

  const productSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Mochis Artesanales",
      description:
        "Mochis artesanales elaborados a mano con ingredientes de primera calidad, inspirados en la tradición japonesa con sabores creativos y contemporáneos. Disponibles en Madrid Norte.",
      brand: {
        "@type": "Brand",
        name: "Ukiyo Mochis & Coffee",
      },
      image: "https://www.mochisukiyo.com/images/mochi-product-1.jpg",
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Ukiyo Mochis & Coffee",
        },
        areaServed: {
          "@type": "Place",
          name: "Madrid Norte",
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "4",
        bestRating: "5",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Bubble Tea",
      description:
        "Bubble tea refrescante con sabores auténticos y toppings únicos. Boba tea artesanal disponible en nuestra tienda de Madrid Norte, Fuencarral-El Pardo.",
      brand: {
        "@type": "Brand",
        name: "Ukiyo Mochis & Coffee",
      },
      image: "https://www.mochisukiyo.com/images/bubble-tea.jpg",
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Ukiyo Mochis & Coffee",
        },
        areaServed: {
          "@type": "Place",
          name: "Madrid Norte",
        },
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {productSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}
