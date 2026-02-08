import Image from "next/image";

export default function Testimonial() {
  return (
    <section className="w-full py-16 px-5 bg-primary-light">
      <div className="mx-auto max-w-3xl text-center">
        <div className="rounded-2xl bg-white p-8 md:p-12 shadow-sm">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-lg md:text-xl text-text-body leading-relaxed italic">
            &ldquo;Los mochis de Ukiyo son una delicia, suaves y cremosos,
            perfectos para disfrutar con café. La mejor tienda de mochis de Madrid Norte.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Image
              src="/images/testimonial-avatar.jpg"
              alt="Lourdes López"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <span className="text-sm font-bold text-foreground">
              Lourdes López
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
