"use client";

import { useState } from "react";
import type { FaqRow } from "@/lib/database.types";

interface AdminFaqListProps {
  faqs: FaqRow[];
  onEdit: (faq: FaqRow) => void;
  onDelete: (id: string) => Promise<void>;
  onAdd: () => void;
}

export default function AdminFaqList({ faqs, onEdit, onDelete, onAdd }: AdminFaqListProps) {
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
          Gestionar Preguntas Frecuentes
        </h2>
        <button
          onClick={onAdd}
          className="rounded-xl bg-ukiyo-navy px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors font-heading"
        >
          + Añadir Pregunta
        </button>
      </div>

      {faqs.length === 0 ? (
        <div className="text-center py-12 text-text-secondary">
          <p className="text-4xl mb-3">❓</p>
          <p>No hay preguntas frecuentes. Añade la primera.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-xl border p-4 shadow-cozy bg-wood-light/60 border-soft-wood/30"
            >
              <div className="flex items-start gap-4">
                {/* Order badge */}
                <span className="text-xs text-text-secondary flex-shrink-0 w-8 text-center mt-1">
                  #{faq.display_order}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-foreground font-heading">
                    {faq.question_es}
                  </h3>
                  {faq.question_ja && (
                    <p className="text-xs text-text-secondary mt-0.5">{faq.question_ja}</p>
                  )}
                  <p className="text-xs text-text-body mt-2 line-clamp-2">
                    {faq.answer_es}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => onEdit(faq)}
                    className="rounded-lg bg-ukiyo-navy/10 px-3 py-1.5 text-xs font-semibold text-ukiyo-navy hover:bg-ukiyo-navy/20 transition-colors font-heading"
                  >
                    Editar
                  </button>
                  {confirmId === faq.id ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDelete(faq.id)}
                        disabled={deletingId === faq.id}
                        className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition-colors font-heading disabled:opacity-50"
                      >
                        {deletingId === faq.id ? "..." : "Eliminar"}
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
                      onClick={() => setConfirmId(faq.id)}
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
