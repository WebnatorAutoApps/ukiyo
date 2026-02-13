"use client";

import Image from "next/image";
import { useState } from "react";
import type { TestimonialRow } from "@/lib/database.types";

interface AdminTestimonialListProps {
  testimonials: TestimonialRow[];
  onEdit: (testimonial: TestimonialRow) => void;
  onDelete: (id: string) => Promise<void>;
  onAdd: () => void;
}

export default function AdminTestimonialList({
  testimonials,
  onEdit,
  onDelete,
  onAdd,
}: AdminTestimonialListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
    setConfirmId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground font-heading">
          Gestionar Testimonios
        </h2>
        <button
          onClick={onAdd}
          className="rounded-xl bg-ukiyo-navy px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors font-heading"
        >
          + Añadir Testimonio
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-12 text-text-secondary">
          <p className="text-4xl mb-3">💬</p>
          <p>No hay testimonios. Añade el primero.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-xl border p-4 shadow-cozy bg-wood-light/60 border-soft-wood/30"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {testimonial.avatar_url ? (
                    <Image
                      src={testimonial.avatar_url}
                      alt={testimonial.name_es}
                      width={40}
                      height={40}
                      className="rounded-full object-cover ring-2 ring-sakura-pink"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-sakura-pink/30 flex items-center justify-center text-sm">
                      👤
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-foreground font-heading">
                      {testimonial.name_es}
                    </h3>
                    <span className="text-xs text-text-secondary">
                      #{testimonial.display_order}
                    </span>
                  </div>
                  {testimonial.name_ja && (
                    <p className="text-xs text-text-secondary">{testimonial.name_ja}</p>
                  )}
                  <p className="text-xs text-text-body mt-1 line-clamp-2 italic">
                    &ldquo;{testimonial.quote_es}&rdquo;
                  </p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-3 h-3 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => onEdit(testimonial)}
                    className="rounded-lg bg-ukiyo-navy/10 px-3 py-1.5 text-xs font-semibold text-ukiyo-navy hover:bg-ukiyo-navy/20 transition-colors font-heading"
                  >
                    Editar
                  </button>
                  {confirmId === testimonial.id ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        disabled={deletingId === testimonial.id}
                        className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition-colors font-heading disabled:opacity-50"
                      >
                        {deletingId === testimonial.id ? "..." : "Eliminar"}
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="rounded-lg bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-wood-light transition-colors font-heading border border-border-color"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmId(testimonial.id)}
                      className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-500/20 transition-colors font-heading"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
