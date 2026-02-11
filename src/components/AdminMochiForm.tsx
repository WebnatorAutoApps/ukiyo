"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { uploadMochiImage } from "@/lib/mochis";
import type { MochiWithTags, TagName, SeasonValue } from "@/lib/database.types";

interface AdminMochiFormProps {
  mochi?: MochiWithTags | null;
  onSave: (data: {
    title_es: string;
    title_ja: string;
    description_es: string;
    description_ja: string;
    price: string;
    image_url: string;
    emoji: string;
    display_order: number;
    tags: { tag_name: TagName; season?: SeasonValue | null }[];
  }) => Promise<void>;
  onCancel: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function AdminMochiForm({ mochi, onSave, onCancel }: AdminMochiFormProps) {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [titleEs, setTitleEs] = useState(mochi?.title_es ?? "");
  const [titleJa, setTitleJa] = useState(mochi?.title_ja ?? "");
  const [descEs, setDescEs] = useState(mochi?.description_es ?? "");
  const [descJa, setDescJa] = useState(mochi?.description_ja ?? "");
  const [price, setPrice] = useState(mochi?.price ?? "3,50€");
  const [emoji, setEmoji] = useState(mochi?.emoji ?? "🍡");
  const [displayOrder, setDisplayOrder] = useState(mochi?.display_order ?? 0);
  const [imageUrl, setImageUrl] = useState(mochi?.image_url ?? "");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Tags
  const existingTags = mochi?.mochi_tags ?? [];
  const [hasNuevo, setHasNuevo] = useState(existingTags.some((t) => t.tag_name === "nuevo"));
  const [hasPopular, setHasPopular] = useState(existingTags.some((t) => t.tag_name === "popular"));
  const [hasSeasonal, setHasSeasonal] = useState(existingTags.some((t) => t.tag_name === "seasonal"));
  const seasonalTag = existingTags.find((t) => t.tag_name === "seasonal");
  const [season, setSeason] = useState<SeasonValue>(seasonalTag?.season ?? "spring");

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

    const url = await uploadMochiImage(file);
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

    if (!titleEs.trim() || !titleJa.trim()) {
      setError("Title is required in both languages");
      return;
    }

    if (!imageUrl && !imagePreview) {
      setError(t.admin.imageRequired);
      return;
    }

    const tags: { tag_name: TagName; season?: SeasonValue | null }[] = [];
    if (hasNuevo) tags.push({ tag_name: "nuevo" });
    if (hasPopular) tags.push({ tag_name: "popular" });
    if (hasSeasonal) tags.push({ tag_name: "seasonal", season });

    setSaving(true);
    try {
      await onSave({
        title_es: titleEs.trim(),
        title_ja: titleJa.trim(),
        description_es: descEs.trim(),
        description_ja: descJa.trim(),
        price: price.trim(),
        image_url: imageUrl,
        emoji: emoji.trim(),
        display_order: displayOrder,
        tags,
      });
    } catch {
      setError("Error saving mochi");
    } finally {
      setSaving(false);
    }
  };

  const displayImage = imagePreview ?? imageUrl;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-foreground font-heading">
        {mochi ? t.admin.editMochi : t.admin.addMochi}
      </h2>

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
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow"
            required
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

      {/* Price, Emoji, Order */}
      <div className="grid grid-cols-3 gap-4">
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
