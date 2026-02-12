"use client";

import { useState } from "react";
import { translateToJapanese } from "@/lib/translate";
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
const TYPE_LABELS: Record<ProductType, string> = {
  mochis: "Mochis",
  bebidas: "Bebidas",
  postres: "Postres",
  raciones: "Raciones",
  salados: "Salados",
  combos: "Combos",
  otros: "Otros",
};

export default function AdminCategoryForm({ category, onSave, onCancel }: AdminCategoryFormProps) {
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
  const [translating, setTranslating] = useState(false);

  const toggleType = (pt: ProductType) => {
    setProductTypes((prev) =>
      prev.includes(pt) ? prev.filter((t) => t !== pt) : [...prev, pt]
    );
  };

  const handleTranslate = async () => {
    if (!nameEs.trim()) return;
    setTranslating(true);
    const result = await translateToJapanese(nameEs);
    setTranslating(false);
    if (result) {
      setNameJa(result);
    } else {
      setError("No se pudo traducir. Inténtalo de nuevo o traduce manualmente.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nameEs.trim()) {
      setError("El nombre (ES) es obligatorio");
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
      setError("Error al guardar categoría");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-foreground font-heading">
        {category ? "Editar Categoría" : "Añadir Categoría"}
      </h2>

      {/* Name fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nameEs" className="text-sm font-semibold text-foreground font-heading">
            Nombre (Español)
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
          <div className="flex items-center justify-between">
            <label htmlFor="nameJa" className="text-sm font-semibold text-foreground font-heading">
              Nombre (Japonés)
            </label>
            <button
              type="button"
              onClick={handleTranslate}
              disabled={translating || !nameEs.trim()}
              className="text-xs font-semibold text-ukiyo-navy hover:text-primary-hover disabled:opacity-40 disabled:cursor-not-allowed font-heading transition-colors"
            >
              {translating ? "Traduciendo..." : "Auto-traducir"}
            </button>
          </div>
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
            Emoji
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
            Orden
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
          Tipos de producto
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
              <span className="text-sm text-foreground">{TYPE_LABELS[pt]}</span>
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
            {enabled ? "Activado" : "Desactivado"}
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
          {saving ? "Guardando..." : "Guardar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-xl border border-border-color bg-background px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-wood-light transition-colors font-heading"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
