"use client";

import { useState } from "react";
import type { ProductWithTags, HighlightItemRow, HighlightSection } from "@/lib/database.types";

interface SectionConfig {
  key: HighlightSection;
  title: string;
  description: string;
  filterType: string | null; // null = all types
}

const SECTIONS: SectionConfig[] = [
  {
    key: "menuSlider",
    title: "Carrusel de Productos",
    description: "Slider horizontal en la parte superior del menú",
    filterType: null,
  },
  {
    key: "specialtyDrinks",
    title: "Bebidas Destacadas",
    description: "Sección de bebidas de especialidad. Solo bebidas.",
    filterType: "bebidas",
  },
  {
    key: "menuHighlights",
    title: "Tarjetas Destacadas",
    description: "Las tarjetas destacadas debajo del título del menú",
    filterType: null,
  },
];

interface AdminHighlightManagerProps {
  products: ProductWithTags[];
  highlightItems: HighlightItemRow[];
  onAdd: (section: HighlightSection, productId: string, order: number) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
  onReorder: (section: HighlightSection, items: { product_id: string; display_order: number }[]) => Promise<void>;
}

export default function AdminHighlightManager({
  products,
  highlightItems,
  onAdd,
  onRemove,
  onReorder,
}: AdminHighlightManagerProps) {
  const [adding, setAdding] = useState<HighlightSection | null>(null);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [saving, setSaving] = useState(false);

  const getItemsForSection = (section: HighlightSection) =>
    highlightItems
      .filter((item) => item.section === section)
      .sort((a, b) => a.display_order - b.display_order);

  const getProduct = (productId: string) =>
    products.find((p) => p.id === productId);

  const getAvailableProducts = (config: SectionConfig) => {
    const sectionItems = getItemsForSection(config.key);
    const usedIds = new Set(sectionItems.map((item) => item.product_id));
    return products.filter((p) => {
      if (usedIds.has(p.id)) return false;
      if (config.filterType && p.type !== config.filterType) return false;
      return true;
    });
  };

  const handleAdd = async (section: HighlightSection) => {
    if (!selectedProductId) return;
    setSaving(true);
    const sectionItems = getItemsForSection(section);
    const maxOrder = sectionItems.length > 0
      ? Math.max(...sectionItems.map((i) => i.display_order))
      : -1;
    await onAdd(section, selectedProductId, maxOrder + 1);
    setAdding(null);
    setSelectedProductId("");
    setSaving(false);
  };

  const handleMoveUp = async (section: HighlightSection, index: number) => {
    if (index === 0) return;
    const items = getItemsForSection(section);
    const reordered = [...items];
    [reordered[index - 1], reordered[index]] = [reordered[index], reordered[index - 1]];
    await onReorder(
      section,
      reordered.map((item, i) => ({ product_id: item.product_id, display_order: i }))
    );
  };

  const handleMoveDown = async (section: HighlightSection, index: number) => {
    const items = getItemsForSection(section);
    if (index >= items.length - 1) return;
    const reordered = [...items];
    [reordered[index], reordered[index + 1]] = [reordered[index + 1], reordered[index]];
    await onReorder(
      section,
      reordered.map((item, i) => ({ product_id: item.product_id, display_order: i }))
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground font-heading">Destacados</h2>
      </div>

      {SECTIONS.map((config) => {
        const sectionItems = getItemsForSection(config.key);
        const available = getAvailableProducts(config);

        return (
          <div
            key={config.key}
            className="rounded-2xl bg-wood-light p-6 shadow-cozy"
          >
            <div className="mb-4">
              <h3 className="text-lg font-bold text-foreground font-heading">
                {config.title}
              </h3>
              <p className="text-sm text-text-secondary">{config.description}</p>
            </div>

            {/* Current items */}
            {sectionItems.length === 0 ? (
              <p className="text-sm text-text-secondary italic mb-4">
                No hay productos en esta sección
              </p>
            ) : (
              <div className="space-y-2 mb-4">
                {sectionItems.map((item, index) => {
                  const product = getProduct(item.product_id);
                  if (!product) return null;

                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-xl bg-background/60 border border-border-color p-3"
                    >
                      <span className="text-sm text-text-secondary font-mono w-6 text-center">
                        {index + 1}
                      </span>
                      <span className="text-lg" aria-hidden="true">
                        {product.emoji}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-foreground">
                          {product.title_es}
                        </span>
                        <span className="ml-2 text-xs text-text-secondary bg-soft-wood/30 px-2 py-0.5 rounded-full">
                          {product.type}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-ukiyo-navy">
                        {product.price}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveUp(config.key, index)}
                          disabled={index === 0}
                          className="p-1 rounded hover:bg-soft-wood/30 disabled:opacity-30 transition-colors"
                          aria-label="Mover arriba"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M8 12V4M4 8l4-4 4 4" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleMoveDown(config.key, index)}
                          disabled={index === sectionItems.length - 1}
                          className="p-1 rounded hover:bg-soft-wood/30 disabled:opacity-30 transition-colors"
                          aria-label="Mover abajo"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M8 4v8M4 8l4 4 4-4" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="p-1 rounded hover:bg-red-100 text-red-500 transition-colors"
                          aria-label="Eliminar"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4l8 8M12 4l-8 8" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Add product */}
            {adding === config.key ? (
              <div className="flex items-center gap-3">
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="flex-1 rounded-xl border border-border-color bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sakura-pink"
                >
                  <option value="">Seleccionar producto...</option>
                  {available.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.emoji} {p.title_es} — {p.type} — {p.price}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleAdd(config.key)}
                  disabled={!selectedProductId || saving}
                  className="rounded-xl bg-ukiyo-navy px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover transition-colors disabled:opacity-50 font-heading"
                >
                  {saving ? "..." : "Añadir"}
                </button>
                <button
                  onClick={() => { setAdding(null); setSelectedProductId(""); }}
                  className="rounded-xl border border-border-color px-4 py-2 text-xs font-semibold text-text-secondary hover:text-foreground transition-colors font-heading"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setAdding(config.key); setSelectedProductId(""); }}
                className="rounded-xl border-2 border-dashed border-soft-wood/50 px-4 py-2 text-sm text-text-secondary hover:border-ukiyo-navy hover:text-ukiyo-navy transition-colors font-heading font-semibold"
              >
                + Añadir producto
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
