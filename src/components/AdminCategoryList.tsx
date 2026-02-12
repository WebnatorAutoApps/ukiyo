"use client";

import { useState } from "react";
import type { MenuCategoryRow, ProductType } from "@/lib/database.types";

interface AdminCategoryListProps {
  categories: MenuCategoryRow[];
  onEdit: (category: MenuCategoryRow) => void;
  onDelete: (id: string) => Promise<void>;
  onAdd: () => void;
  onToggleEnabled: (id: string, enabled: boolean) => Promise<void>;
}

const TYPE_LABELS: Record<ProductType, string> = {
  mochis: "Mochis",
  bebidas: "Bebidas",
  postres: "Postres",
  raciones: "Raciones",
  salados: "Salados",
  combos: "Combos",
  otros: "Otros",
};

export default function AdminCategoryList({ categories, onEdit, onDelete, onAdd, onToggleEnabled }: AdminCategoryListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleToggle = async (cat: MenuCategoryRow) => {
    setTogglingId(cat.id);
    await onToggleEnabled(cat.id, !cat.enabled);
    setTogglingId(null);
  };

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
          Gestionar Categorías
        </h2>
        <button
          onClick={onAdd}
          className="rounded-xl bg-ukiyo-navy px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors font-heading"
        >
          + Añadir Categoría
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12 text-text-secondary">
          <p className="text-4xl mb-3">📂</p>
          <p>No hay categorías. Añade la primera.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`rounded-xl border p-4 shadow-cozy flex items-center gap-4 ${cat.enabled ? "bg-wood-light/60 border-soft-wood/30" : "bg-wood-light/30 border-soft-wood/20 opacity-60"}`}
            >
              {/* Emoji */}
              <span className="text-2xl flex-shrink-0">{cat.emoji}</span>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-foreground font-heading truncate">
                    {cat.name_es}
                  </h3>
                  {cat.name_ja && (
                    <span className="text-xs text-text-secondary">({cat.name_ja})</span>
                  )}
                  {!cat.enabled && (
                    <span className="inline-flex items-center rounded-full bg-gray-400/80 px-2 py-0.5 text-[10px] font-bold text-white">
                      Desactivado
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {cat.product_types.map((pt) => (
                    <span key={pt} className="inline-flex items-center rounded-full bg-ukiyo-navy/10 px-2 py-0.5 text-[10px] font-bold text-ukiyo-navy">
                      {TYPE_LABELS[pt as ProductType] ?? pt}
                    </span>
                  ))}
                </div>
              </div>

              {/* Order */}
              <span className="text-xs text-text-secondary flex-shrink-0 w-8 text-center">
                #{cat.display_order}
              </span>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleToggle(cat)}
                  disabled={togglingId === cat.id}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors font-heading disabled:opacity-50 ${cat.enabled ? "bg-gray-400/10 text-gray-600 hover:bg-gray-400/20" : "bg-green-500/10 text-green-700 hover:bg-green-500/20"}`}
                >
                  {togglingId === cat.id ? "..." : cat.enabled ? "Desactivar" : "Activar"}
                </button>
                <button
                  onClick={() => onEdit(cat)}
                  className="rounded-lg bg-ukiyo-navy/10 px-3 py-1.5 text-xs font-semibold text-ukiyo-navy hover:bg-ukiyo-navy/20 transition-colors font-heading"
                >
                  Editar
                </button>
                {confirmId === cat.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(cat.id)}
                      disabled={deletingId === cat.id}
                      className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition-colors font-heading disabled:opacity-50"
                    >
                      {deletingId === cat.id ? "..." : "Eliminar"}
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
                    onClick={() => setConfirmId(cat.id)}
                    className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-500/20 transition-colors font-heading"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
