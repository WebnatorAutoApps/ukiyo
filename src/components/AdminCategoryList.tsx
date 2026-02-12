"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { MenuCategoryRow, ProductType } from "@/lib/database.types";

interface AdminCategoryListProps {
  categories: MenuCategoryRow[];
  onEdit: (category: MenuCategoryRow) => void;
  onDelete: (id: string) => Promise<void>;
  onAdd: () => void;
  onToggleEnabled: (id: string, enabled: boolean) => Promise<void>;
}

export default function AdminCategoryList({ categories, onEdit, onDelete, onAdd, onToggleEnabled }: AdminCategoryListProps) {
  const { t, locale } = useLanguage();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const typeLabels: Record<ProductType, string> = {
    mochis: t.admin.typeMochis,
    bebidas: t.admin.typeBebidas,
    postres: t.admin.typePostres,
    raciones: t.admin.typeRaciones,
    salados: t.admin.typeSalados,
    combos: t.admin.typeCombos,
    otros: t.admin.typeOtros,
  };

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
          {t.admin.categoriesTitle}
        </h2>
        <button
          onClick={onAdd}
          className="rounded-xl bg-ukiyo-navy px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors font-heading"
        >
          + {t.admin.addCategory}
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12 text-text-secondary">
          <p className="text-4xl mb-3">📂</p>
          <p>{t.admin.noCategories}</p>
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
                    {locale === "ja" && cat.name_ja ? cat.name_ja : cat.name_es}
                  </h3>
                  {!cat.enabled && (
                    <span className="inline-flex items-center rounded-full bg-gray-400/80 px-2 py-0.5 text-[10px] font-bold text-white">
                      {t.admin.disabled}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {cat.product_types.map((pt) => (
                    <span key={pt} className="inline-flex items-center rounded-full bg-ukiyo-navy/10 px-2 py-0.5 text-[10px] font-bold text-ukiyo-navy">
                      {typeLabels[pt as ProductType] ?? pt}
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
                  {togglingId === cat.id ? "..." : cat.enabled ? t.admin.disableProduct : t.admin.enableProduct}
                </button>
                <button
                  onClick={() => onEdit(cat)}
                  className="rounded-lg bg-ukiyo-navy/10 px-3 py-1.5 text-xs font-semibold text-ukiyo-navy hover:bg-ukiyo-navy/20 transition-colors font-heading"
                >
                  {t.admin.editCategory}
                </button>
                {confirmId === cat.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(cat.id)}
                      disabled={deletingId === cat.id}
                      className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition-colors font-heading disabled:opacity-50"
                    >
                      {deletingId === cat.id ? "..." : t.admin.deleteCategory}
                    </button>
                    <button
                      onClick={() => setConfirmId(null)}
                      className="rounded-lg bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-wood-light transition-colors font-heading border border-border-color"
                    >
                      {t.admin.cancel}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmId(cat.id)}
                    className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-500/20 transition-colors font-heading"
                  >
                    {t.admin.deleteCategory}
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
