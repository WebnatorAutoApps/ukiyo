"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { uploadProductImage } from "@/lib/products";
import type { ProductWithTags, ProductType, TagName, SeasonValue } from "@/lib/database.types";

interface AdminProductFormProps {
  product?: ProductWithTags | null;
  onSave: (data: {
    type: ProductType;
    title_es: string;
    title_ja: string;
    description_es: string;
    description_ja: string;
    price: string;
    image_url: string;
    emoji: string;
    display_order: number;
    enabled: boolean;
    hot: boolean;
    price_modifier: string | null;
    tags: { tag_name: TagName; season?: SeasonValue | null }[];
  }) => Promise<void>;
  onCancel: () => void;
}

const PRODUCT_TYPES: ProductType[] = ["mochis", "bebidas", "postres", "raciones", "salados", "combos", "otros"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function AdminProductForm({ product, onSave, onCancel }: AdminProductFormProps) {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [type, setType] = useState<ProductType>(product?.type ?? "mochis");
  const [titleEs, setTitleEs] = useState(product?.title_es ?? "");
  const [titleJa, setTitleJa] = useState(product?.title_ja ?? "");
  const [descEs, setDescEs] = useState(product?.description_es ?? "");
  const [descJa, setDescJa] = useState(product?.description_ja ?? "");
  const [price, setPrice] = useState(product?.price ?? "3,50€");
  const [emoji, setEmoji] = useState(product?.emoji ?? "🍡");
  const [displayOrder, setDisplayOrder] = useState(product?.display_order ?? 0);
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [enabled, setEnabled] = useState(product?.enabled ?? true);
  const [hot, setHot] = useState(product?.hot ?? false);
  const [priceModifier, setPriceModifier] = useState(product?.price_modifier ?? "");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Tags
  const existingTags = product?.product_tags ?? [];
  const [hasNuevo, setHasNuevo] = useState(existingTags.some((t) => t.tag_name === "nuevo"));
  const [hasPopular, setHasPopular] = useState(existingTags.some((t) => t.tag_name === "popular"));
  const [hasBestSeller, setHasBestSeller] = useState(existingTags.some((t) => t.tag_name === "bestSeller"));
  const [hasSeasonal, setHasSeasonal] = useState(existingTags.some((t) => t.tag_name === "seasonal"));
  const seasonalTag = existingTags.find((t) => t.tag_name === "seasonal");
  const [season, setSeason] = useState<SeasonValue>(seasonalTag?.season ?? "spring");

  const typeLabels: Record<ProductType, string> = {
    mochis: t.admin.typeMochis,
    bebidas: t.admin.typeBebidas,
    postres: t.admin.typePostres,
    raciones: t.admin.typeRaciones,
    salados: t.admin.typeSalados,
    combos: t.admin.typeCombos,
    otros: t.admin.typeOtros,
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError(t.admin.allowedFormats);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(t.admin.maxFileSize);
      return;
    }

    setError("");
    setImagePreview(URL.createObjectURL(file));
    setUploading(true);

    const url = await uploadProductImage(file);
    setUploading(false);

    if (url) {
      setImageUrl(url);
    } else {
      setError("Error uploading image");
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!titleEs.trim()) {
      setError("Title (ES) is required");
      return;
    }

    const tags: { tag_name: TagName; season?: SeasonValue | null }[] = [];
    if (hasNuevo) tags.push({ tag_name: "nuevo" });
    if (hasPopular) tags.push({ tag_name: "popular" });
    if (hasBestSeller) tags.push({ tag_name: "bestSeller" });
    if (hasSeasonal) tags.push({ tag_name: "seasonal", season });

    setSaving(true);
    try {
      await onSave({
        type,
        title_es: titleEs.trim(),
        title_ja: titleJa.trim(),
        description_es: descEs.trim(),
        description_ja: descJa.trim(),
        price: price.trim(),
        image_url: imageUrl,
        emoji: emoji.trim(),
        display_order: displayOrder,
        enabled,
        hot,
        price_modifier: priceModifier.trim() || null,
        tags,
      });
    } catch {
      setError("Error saving product");
    } finally {
      setSaving(false);
    }
  };

  const displayImage = imagePreview ?? imageUrl;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-foreground font-heading">
        {product ? t.admin.editProduct : t.admin.addProduct}
      </h2>

      {/* Product Type */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="productType" className="text-sm font-semibold text-foreground font-heading">
          {t.admin.productType}
        </label>
        <select
          id="productType"
          value={type}
          onChange={(e) => setType(e.target.value as ProductType)}
          className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow max-w-xs"
        >
          {PRODUCT_TYPES.map((pt) => (
            <option key={pt} value={pt}>{typeLabels[pt]}</option>
          ))}
        </select>
      </div>

      {/* Image upload */}
      <div>
        <label className="block text-sm font-semibold text-foreground font-heading mb-2">
          {t.admin.image}
        </label>
        <div className="flex items-start gap-4">
          {displayImage && (
            <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-border-color">
              <Image
                src={displayImage}
                alt="Preview"
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="rounded-xl bg-ukiyo-navy px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors font-heading disabled:opacity-50"
            >
              {uploading ? "..." : displayImage ? t.admin.changeImage : t.admin.uploadImage}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleImageChange}
            />
            <p className="text-xs text-text-secondary">
              {t.admin.maxFileSize} · {t.admin.allowedFormats}
            </p>
          </div>
        </div>
      </div>

      {/* Title fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="titleEs" className="text-sm font-semibold text-foreground font-heading">
            {t.admin.titleEs}
          </label>
          <input
            id="titleEs"
            type="text"
            value={titleEs}
            onChange={(e) => setTitleEs(e.target.value)}
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="titleJa" className="text-sm font-semibold text-foreground font-heading">
            {t.admin.titleJa}
          </label>
          <input
            id="titleJa"
            type="text"
            value={titleJa}
            onChange={(e) => setTitleJa(e.target.value)}
            placeholder={titleEs || undefined}
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow"
          />
        </div>
      </div>

      {/* Description fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="descEs" className="text-sm font-semibold text-foreground font-heading">
            {t.admin.descriptionEs}
          </label>
          <textarea
            id="descEs"
            value={descEs}
            onChange={(e) => setDescEs(e.target.value)}
            rows={3}
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow resize-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="descJa" className="text-sm font-semibold text-foreground font-heading">
            {t.admin.descriptionJa}
          </label>
          <textarea
            id="descJa"
            value={descJa}
            onChange={(e) => setDescJa(e.target.value)}
            rows={3}
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow resize-none"
          />
        </div>
      </div>

      {/* Price, Emoji, Order, Price Modifier */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="price" className="text-sm font-semibold text-foreground font-heading">
            {t.admin.price}
          </label>
          <input
            id="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow"
          />
        </div>
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
        <div className="flex flex-col gap-1.5">
          <label htmlFor="priceModifier" className="text-sm font-semibold text-foreground font-heading">
            {t.admin.priceModifier}
          </label>
          <input
            id="priceModifier"
            type="text"
            value={priceModifier}
            onChange={(e) => setPriceModifier(e.target.value)}
            placeholder="+0,50€"
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow"
          />
        </div>
      </div>

      {/* Hot drink toggle */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={hot}
            onChange={(e) => setHot(e.target.checked)}
            className="w-4 h-4 rounded accent-ukiyo-navy"
          />
          <span className="text-sm font-semibold text-foreground font-heading">
            {t.admin.hotDrink}
          </span>
        </label>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-semibold text-foreground font-heading mb-3">
          {t.admin.tags}
        </label>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasNuevo}
              onChange={(e) => setHasNuevo(e.target.checked)}
              className="w-4 h-4 rounded accent-ukiyo-navy"
            />
            <span className="inline-flex items-center rounded-full bg-red-500/90 px-2.5 py-0.5 text-[11px] font-bold text-white tracking-wide">
              {t.admin.tagNuevo}
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasPopular}
              onChange={(e) => setHasPopular(e.target.checked)}
              className="w-4 h-4 rounded accent-ukiyo-navy"
            />
            <span className="inline-flex items-center rounded-full bg-sakura-pink px-2.5 py-0.5 text-[11px] font-bold text-foreground tracking-wide">
              {t.admin.tagPopular}
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasBestSeller}
              onChange={(e) => setHasBestSeller(e.target.checked)}
              className="w-4 h-4 rounded accent-ukiyo-navy"
            />
            <span className="inline-flex items-center rounded-full bg-ukiyo-navy/90 px-2.5 py-0.5 text-[11px] font-bold text-white tracking-wide">
              {t.admin.tagBestSeller}
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasSeasonal}
              onChange={(e) => setHasSeasonal(e.target.checked)}
              className="w-4 h-4 rounded accent-ukiyo-navy"
            />
            <span className="seasonal-badge text-[11px]">
              {t.admin.tagSeasonal}
            </span>
          </label>
        </div>

        {/* Season selector */}
        {hasSeasonal && (
          <div className="mt-3 flex flex-col gap-1.5">
            <label htmlFor="season" className="text-sm font-semibold text-foreground font-heading">
              {t.admin.season}
            </label>
            <select
              id="season"
              value={season}
              onChange={(e) => setSeason(e.target.value as SeasonValue)}
              className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow max-w-xs"
            >
              <option value="spring">{t.admin.seasonSpring}</option>
              <option value="summer">{t.admin.seasonSummer}</option>
              <option value="fall">{t.admin.seasonFall}</option>
              <option value="winter">{t.admin.seasonWinter}</option>
            </select>
          </div>
        )}
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
          disabled={saving || uploading}
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
