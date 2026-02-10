import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso del sitio web de Ukiyo Mochis & Coffee. Tienda de mochis artesanales en Madrid Norte.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

export default function TermsAndConditions() {
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <article className="text-black" style={{ fontSize: "16px", lineHeight: 1.3 }}>
          <h1 className="text-2xl font-bold mb-4">
            TÉRMINOS Y CONDICIONES DE USO
          </h1>

          <p className="mb-4">
            <strong>Última actualización:</strong> 08/05/2025
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            1. Información general
          </h2>
          <p className="mb-4">
            El presente sitio web es propiedad de{" "}
            <strong>Brother Projects 1801 S.L.</strong>, con domicilio en{" "}
            <strong>
              Calle Bruselas, Nº 35, Kiosco, 28232 Las Rozas de Madrid
              (Madrid)
            </strong>{" "}
            y CIF <strong>B19485432</strong>, en adelante{" "}
            <strong>Ukiyo Mochis &amp; Coffee</strong>.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">2. Objeto</h2>
          <p className="mb-4">
            Estos Términos y Condiciones regulan el acceso, navegación y uso del
            sitio web{" "}
            <strong>
              <a
                href="http://www.mochisukiyo.com"
                className="text-primary hover:underline"
              >
                www.mochisukiyo.com
              </a>
            </strong>
            , así como las responsabilidades derivadas de la utilización de sus
            contenidos.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            3. Condiciones de acceso y uso
          </h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              El acceso al sitio web es gratuito, sin perjuicio del coste de
              conexión que deba soportar el usuario.
            </li>
            <li>
              El usuario se compromete a utilizar el sitio de forma legal, ética
              y conforme a estos términos.
            </li>
            <li>
              Queda prohibido el uso del sitio con fines ilícitos o que puedan
              dañar, inutilizar o sobrecargar la plataforma o los sistemas
              informáticos de terceros.
            </li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">
            4. Propiedad intelectual e industrial
          </h2>
          <p className="mb-4">
            Todos los contenidos del sitio web, incluyendo textos, imágenes,
            logotipos, diseño gráfico, código fuente, vídeos, sonidos, y demás
            materiales, son propiedad exclusiva de Ukiyo Mochis &amp; Coffee o
            de terceros autorizados, y están protegidos por las leyes de
            propiedad intelectual e industrial
          </p>
          <p className="mb-4">
            Queda prohibida su reproducción, distribución, comunicación pública
            o transformación, sin autorización expresa del titular de los
            derechos.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            5. Responsabilidad
          </h2>
          <p className="mb-4">
            Ukiyo Mochis &amp; Coffee no se hace responsable de los daños o
            perjuicios que puedan derivarse del uso del sitio, incluyendo los
            ocasionados por virus, interrupciones del servicio o inexactitudes
            en los contenidos.
          </p>
          <p className="mb-4">
            No se garantiza la disponibilidad continua del sitio web ni la
            ausencia de errores en sus contenidos.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            6. Modificaciones
          </h2>
          <p className="mb-4">
            Brother Projects 1801 S.L. se reserva el derecho a modificar en
            cualquier momento, y sin necesidad de previo aviso, la presentación,
            configuración y contenidos del sitio web, así como los presentes
            Términos y Condiciones.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            7. Enlaces externos
          </h2>
          <p className="mb-4">
            Este sitio web puede contener enlaces a sitios web de terceros.
            Ukiyo Mochis &amp; Coffee no asume ninguna responsabilidad sobre sus
            contenidos, servicios, políticas de privacidad o prácticas.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            8. Legislación aplicable y jurisdicción
          </h2>
          <p className="mb-4">
            Los presentes Términos y Condiciones se rigen por la legislación
            española. Cualquier conflicto derivado del acceso o uso del sitio
            web será sometido a los Juzgados y Tribunales de{" "}
            <strong>Madrid</strong>, salvo disposición legal en contrario.
          </p>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
