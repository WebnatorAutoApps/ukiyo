"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { ProductWithTags, ProductType } from "@/lib/database.types";

interface AdminProductListProps {
  products: ProductWithTags[];
  onEdit: (product: ProductWithTags) => void;
  onDelete: (id: string) => Promise<void>;
  onAdd: () => void;
  onToggleEnabled: (id: string, enabled: boolean) => Promise<void>;
}

const TYPE_COLORS: Record<ProductType, string> = {
  mochis: "bg-sakura-pink text-foreground",
  bebidas: "bg-blue-400/20 text-blue-700",
  postres: "bg-pink-400/20 text-pink-700",
  raciones: "bg-orange-400/20 text-orange-700",
  salados: "bg-amber-400/20 text-amber-700",
  combos: "bg-purple-400/20 text-purple-700",
  otros: "bg-gray-400/20 text-gray-700",
};

function TagBadges({ product, t }: { product: ProductWithTags; t: ReturnType<typeof useLanguage>["t"] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {product.product_tags.map((tag) => {
        if (tag.tag_name === "nuevo") {
          return (
            <span key={tag.id} className="inline-flex items-center rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] font-bold text-white">
              {t.admin.tagNuevo}
            </span>
          );
        }
        if (tag.tag_name === "popular") {
          return (
            <span key={tag.id} className="inline-flex items-center rounded-full bg-sakura-pink px-2 py-0.5 text-[10px] font-bold text-foreground">
              {t.admin.tagPopular}
            </span>
          );
        }
        if (tag.tag_name === "bestSeller") {
          return (
            <span key={tag.id} className="inline-flex items-center rounded-full bg-ukiyo-navy/90 px-2 py-0.5 text-[10px] font-bold text-white">
              {t.admin.tagBestSeller}
            </span>
          );
        }
        if (tag.tag_name === "seasonal") {
          return (
            <span key={tag.id} className="seasonal-badge text-[10px]">
              {t.admin.tagSeasonal}
              {tag.season && ` (${tag.season})`}
            </span>
          );
        }
        return null;
      })}
    </div>
  );
}

export default function AdminProductList({ products, onEdit, onDelete, onAdd, onToggleEnabled }: AdminProductListProps) {
  const { t, locale } = useLanguage();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<ProductType | "all">("all");

  const filteredProducts = typeFilter === "all"
    ? products
    : products.filter((p) => p.type === typeFilter);

  const handleToggle = async (product: ProductWithTags) => {
    setTogglingId(product.id);
    await onToggleEnabled(product.id, !product.enabled);
    setTogglingId(null);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
    setConfirmId(null);
  };

  const typeLabels: Record<ProductType, string> = {
    mochis: t.admin.typeMochis,
    bebidas: t.admin.typeBebidas,
    postres: t.admin.typePostres,
    raciones: t.admin.typeRaciones,
    salados: t.admin.typeSalados,
    combos: t.admin.typeCombos,
    otros: t.admin.typeOtros,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground font-heading">
          {t.admin.productsTitle}
        </h2>
        <button
          onClick={onAdd}
          className="rounded-xl bg-ukiyo-navy px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors font-heading"
        >
          + {t.admin.addProduct}
        </button>
      </div>

      {/* Type filter */}
      <div className="mb-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as ProductType | "all")}
          className="rounded-xl border border-border-color bg-background px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow"
        >
          <option value="all">{t.admin.allTypes}</option>
          {(Object.keys(typeLabels) as ProductType[]).map((type) => (
            <option key={type} value={type}>{typeLabels[type]}</option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-text-secondary">
          <p className="text-4xl mb-3">📦</p>
          <p>{t.admin.noProducts}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`rounded-xl border p-4 shadow-cozy flex items-center gap-4 ${product.enabled ? "bg-wood-light/60 border-soft-wood/30" : "bg-wood-light/30 border-soft-wood/20 opacity-60"}`}
            >
              {/* Image */}
              <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-border-color">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={locale === "ja" && product.title_ja ? product.title_ja : product.title_es}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-sakura-pink/30">
                    <span className="text-2xl">{product.emoji}</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm">{product.emoji}</span>
                  <h3 className="text-sm font-bold text-foreground font-heading truncate">
                    {locale === "ja" && product.title_ja ? product.title_ja : product.title_es}
                  </h3>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${TYPE_COLORS[product.type]}`}>
                    {typeLabels[product.type]}
                  </span>
                  <TagBadges product={product} t={t} />
                  {!product.enabled && (
                    <span className="inline-flex items-center rounded-full bg-gray-400/80 px-2 py-0.5 text-[10px] font-bold text-white">
                      {t.admin.disabled}
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-secondary mt-0.5 truncate">
                  {locale === "ja" && product.description_ja ? product.description_ja : product.description_es}
                </p>
              </div>

              {/* Price */}
              <span className="text-sm font-bold text-ukiyo-navy font-heading flex-shrink-0">
                {product.price}
              </span>

              {/* Order */}
              <span className="text-xs text-text-secondary flex-shrink-0 w-8 text-center">
                #{product.display_order}
              </span>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleToggle(product)}
                  disabled={togglingId === product.id}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors font-heading disabled:opacity-50 ${product.enabled ? "bg-gray-400/10 text-gray-600 hover:bg-gray-400/20" : "bg-green-500/10 text-green-700 hover:bg-green-500/20"}`}
                >
                  {togglingId === product.id ? "..." : product.enabled ? t.admin.disableProduct : t.admin.enableProduct}
                </button>
                <button
                  onClick={() => onEdit(product)}
                  className="rounded-lg bg-ukiyo-navy/10 px-3 py-1.5 text-xs font-semibold text-ukiyo-navy hover:bg-ukiyo-navy/20 transition-colors font-heading"
                >
                  {t.admin.editProduct}
                </button>
                {confirmId === product.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                      className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition-colors font-heading disabled:opacity-50"
                    >
                      {deletingId === product.id ? "..." : t.admin.deleteProduct}
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
                    onClick={() => setConfirmId(product.id)}
                    className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-500/20 transition-colors font-heading"
                  >
                    {t.admin.deleteProduct}
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
