import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad del sitio web de Ukiyo Mochis & Coffee. Tienda de mochis artesanales en Madrid Norte.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicy() {
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <article className="text-black" style={{ fontSize: "16px", lineHeight: 1.3 }}>
          <h1 className="text-2xl font-bold mb-4">
            <span className="font-normal">🔒 POLÍTICA DE PRIVACIDAD</span>
          </h1>

          <p className="mb-4">
            <span>Última actualización: 8 de mayo del 2025</span>
          </p>

          <p className="mb-4">
            En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo
            y del Consejo (RGPD) y de la Ley Orgánica 3/2018 (LOPDGDD),
            informamos a los usuarios del presente sitio web sobre la política
            de privacidad relativa al tratamiento y protección de sus datos
            personales.
          </p>

          <h2 className="text-lg font-normal mt-8 mb-4">
            1. Responsable del tratamiento
          </h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Razón social: Brother Projects 1801 S.L.</li>
            <li>Nombre comercial: Ukiyo Mochis &amp; Coffee</li>
            <li>CIF: B19485432</li>
            <li>
              Domicilio fiscal y social: Calle Bruselas, Nº 35, Kiosco, 28232
              Las Rozas de Madrid (Madrid)
            </li>
            <li>
              Correo electrónico de contacto:{" "}
              <a
                href="mailto:hola@mochisukiyo.com"
                className="text-primary hover:underline"
              >
                hola@mochisukiyo.com
              </a>
            </li>
            <li>Teléfono: +34 605 43 86 63</li>
          </ul>

          <h2 className="text-lg font-normal mt-8 mb-4">
            2. Finalidades del tratamiento
          </h2>
          <p className="mb-4">
            Tus datos personales podrán ser utilizados con las siguientes
            finalidades:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>
              Gestionar las consultas, sugerencias o solicitudes realizadas a
              través de nuestros formularios de contacto.
            </li>
            <li>
              Gestionar reservas, pedidos o compras realizadas a través del sitio
              web.
            </li>
            <li>
              Enviar comunicaciones comerciales por medios electrónicos (solo si
              el usuario lo autoriza).
            </li>
            <li>
              Mejorar la experiencia de navegación mediante el uso de cookies,
              con consentimiento previo.
            </li>
          </ul>

          <h2 className="text-lg font-normal mt-8 mb-4">
            3. Legitimación del tratamiento
          </h2>
          <p className="mb-4">
            La base legal para el tratamiento de tus datos es:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>
              Consentimiento expreso del interesado para las finalidades
              indicadas.
            </li>
            <li>
              Ejecución de un contrato, en caso de realizar un pedido o reserva.
            </li>
            <li>
              Cumplimiento de obligaciones legales aplicables al responsable del
              tratamiento.
            </li>
          </ul>

          <h2 className="text-lg font-normal mt-8 mb-4">
            4. Conservación de los datos
          </h2>
          <p className="mb-4">Tus datos personales se conservarán:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Mientras exista una relación contractual o comercial.</li>
            <li>
              Mientras no se solicite su supresión por parte del interesado.
            </li>
            <li>
              Por el tiempo necesario para cumplir con las obligaciones legales y
              fiscales.
            </li>
          </ul>

          <h2 className="text-lg font-normal mt-8 mb-4">
            5. Destinatarios de los datos
          </h2>
          <p className="mb-4">Tus datos podrán ser comunicados a:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Proveedores externos que actúen como encargados del tratamiento
              (por ejemplo, servicios de alojamiento web, plataformas de
              marketing o pasarelas de pago).
            </li>
            <li>
              Administraciones públicas y autoridades competentes, en
              cumplimiento de obligaciones legales.
            </li>
          </ul>
          <p className="mb-8">
            No se realizarán transferencias internacionales de datos sin el
            consentimiento expreso del usuario, salvo obligación legal.
          </p>

          <h2 className="text-lg font-normal mt-8 mb-4">
            6. Derechos del interesado
          </h2>
          <p className="mb-4">Tienes derecho a:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Acceder a tus datos personales.</li>
            <li>Rectificarlos si son inexactos o están incompletos.</li>
            <li>
              Solicitar su supresión cuando ya no sean necesarios o retires el
              consentimiento.
            </li>
            <li>
              Limitar su tratamiento en determinadas circunstancias.
            </li>
            <li>Oponerte al tratamiento de tus datos.</li>
            <li>
              Solicitar la portabilidad de los mismos en formato estructurado.
            </li>
          </ul>
          <p className="mb-4">
            Puedes ejercer tus derechos enviando una solicitud a:
          </p>
          <p className="mb-4">
            Correo electrónico:{" "}
            <a
              href="mailto:hola@mochisukiyo.com"
              className="text-primary hover:underline"
            >
              hola@mochisukiyo.com
            </a>
          </p>
          <p className="mb-4">
            Adjuntando una copia de tu documento de identidad.
          </p>
          <p className="mb-8">
            También puedes presentar una reclamación ante la Agencia Española de
            Protección de Datos (AEPD) a través de su web:{" "}
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              www.aepd.es
            </a>
            .
          </p>

          <h2 className="text-lg font-normal mt-8 mb-4">
            7. Medidas de seguridad
          </h2>
          <p className="mb-4">
            Brother Projects 1801 S.L. ha adoptado las medidas técnicas y
            organizativas necesarias para garantizar la seguridad e integridad de
            los datos personales y evitar su pérdida, alteración o acceso no
            autorizado.
          </p>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
