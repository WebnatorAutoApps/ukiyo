"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { MenuCategoryRow, ProductType } from "@/lib/database.types";

interface AdminCategoryFormProps {
  category?: MenuCategoryRow | null;
  onSave: (data: {
    name_es: string;
    name_ja: string;
    emoji: string;
    display_order: number;
    enabled: boolean;
    product_types: ProductType[];
  }) => Promise<void>;
  onCancel: () => void;
}

const ALL_PRODUCT_TYPES: ProductType[] = ["mochis", "bebidas", "postres", "raciones", "salados", "combos", "otros"];

export default function AdminCategoryForm({ category, onSave, onCancel }: AdminCategoryFormProps) {
  const { t } = useLanguage();

  const [nameEs, setNameEs] = useState(category?.name_es ?? "");
  const [nameJa, setNameJa] = useState(category?.name_ja ?? "");
  const [emoji, setEmoji] = useState(category?.emoji ?? "");
  const [displayOrder, setDisplayOrder] = useState(category?.display_order ?? 0);
  const [enabled, setEnabled] = useState(category?.enabled ?? true);
  const [productTypes, setProductTypes] = useState<ProductType[]>(
    (category?.product_types as ProductType[]) ?? []
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const typeLabels: Record<ProductType, string> = {
    mochis: t.admin.typeMochis,
    bebidas: t.admin.typeBebidas,
    postres: t.admin.typePostres,
    raciones: t.admin.typeRaciones,
    salados: t.admin.typeSalados,
    combos: t.admin.typeCombos,
    otros: t.admin.typeOtros,
  };

  const toggleType = (pt: ProductType) => {
    setProductTypes((prev) =>
      prev.includes(pt) ? prev.filter((t) => t !== pt) : [...prev, pt]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nameEs.trim()) {
      setError("Name (ES) is required");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        name_es: nameEs.trim(),
        name_ja: nameJa.trim(),
        emoji: emoji.trim(),
        display_order: displayOrder,
        enabled,
        product_types: productTypes,
      });
    } catch {
      setError("Error saving category");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-foreground font-heading">
        {category ? t.admin.editCategory : t.admin.addCategory}
      </h2>

      {/* Name fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nameEs" className="text-sm font-semibold text-foreground font-heading">
            {t.admin.categoryNameEs}
          </label>
          <input
            id="nameEs"
            type="text"
            value={nameEs}
            onChange={(e) => setNameEs(e.target.value)}
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nameJa" className="text-sm font-semibold text-foreground font-heading">
            {t.admin.categoryNameJa}
          </label>
          <input
            id="nameJa"
            type="text"
            value={nameJa}
            onChange={(e) => setNameJa(e.target.value)}
            placeholder={nameEs || undefined}
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow"
          />
        </div>
      </div>

      {/* Emoji & Order */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="emoji" className="text-sm font-semibold text-foreground font-heading">
            {t.admin.emoji}
          </label>
          <input
            id="emoji"
            type="text"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow text-center text-lg"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="displayOrder" className="text-sm font-semibold text-foreground font-heading">
            {t.admin.displayOrder}
          </label>
          <input
            id="displayOrder"
            type="number"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow"
          />
        </div>
      </div>

      {/* Product Types */}
      <div>
        <label className="block text-sm font-semibold text-foreground font-heading mb-3">
          {t.admin.categoryTypes}
        </label>
        <div className="flex flex-wrap gap-3">
          {ALL_PRODUCT_TYPES.map((pt) => (
            <label key={pt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={productTypes.includes(pt)}
                onChange={() => toggleType(pt)}
                className="w-4 h-4 rounded accent-ukiyo-navy"
              />
              <span className="text-sm text-foreground">{typeLabels[pt]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Enabled toggle */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="w-4 h-4 rounded accent-ukiyo-navy"
          />
          <span className="text-sm font-semibold text-foreground font-heading">
            {enabled ? t.admin.enabled : t.admin.disabled}
          </span>
        </label>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500" role="alert">{error}</p>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-ukiyo-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors font-heading disabled:opacity-50"
        >
          {saving ? t.admin.saving : t.admin.save}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-xl border border-border-color bg-background px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-wood-light transition-colors font-heading"
        >
          {t.admin.cancel}
        </button>
      </div>
    </form>
  );
}
