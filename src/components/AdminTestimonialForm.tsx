"use client";

import Image from "next/image";
import { useState } from "react";
import { translateToJapanese } from "@/lib/translate";
import { uploadTestimonialAvatar } from "@/lib/testimonials";
import type { TestimonialRow, TestimonialSection } from "@/lib/database.types";

interface AdminTestimonialFormProps {
  testimonial?: TestimonialRow | null;
  onSave: (data: {
    section: TestimonialSection;
    name_es: string;
    name_ja: string;
    quote_es: string;
    quote_ja: string;
    avatar_url: string;
    rating: number;
    display_order: number;
  }) => Promise<void>;
  onCancel: () => void;
}

export default function AdminTestimonialForm({
  testimonial,
  onSave,
  onCancel,
}: AdminTestimonialFormProps) {
  const [section, setSection] = useState<TestimonialSection>(testimonial?.section ?? "tienda");
  const [nameEs, setNameEs] = useState(testimonial?.name_es ?? "");
  const [nameJa, setNameJa] = useState(testimonial?.name_ja ?? "");
  const [quoteEs, setQuoteEs] = useState(testimonial?.quote_es ?? "");
  const [quoteJa, setQuoteJa] = useState(testimonial?.quote_ja ?? "");
  const [avatarUrl, setAvatarUrl] = useState(testimonial?.avatar_url ?? "");
  const [rating, setRating] = useState(testimonial?.rating ?? 5);
  const [displayOrder, setDisplayOrder] = useState(testimonial?.display_order ?? 0);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [translatingName, setTranslatingName] = useState(false);
  const [translatingQuote, setTranslatingQuote] = useState(false);

  const handleTranslateName = async () => {
    if (!nameEs.trim()) return;
    setTranslatingName(true);
    const result = await translateToJapanese(nameEs);
    setTranslatingName(false);
    if (result) {
      setNameJa(result);
    } else {
      setError("No se pudo traducir el nombre. Inténtalo de nuevo o traduce manualmente.");
    }
  };

  const handleTranslateQuote = async () => {
    if (!quoteEs.trim()) return;
    setTranslatingQuote(true);
    const result = await translateToJapanese(quoteEs);
    setTranslatingQuote(false);
    if (result) {
      setQuoteJa(result);
    } else {
      setError("No se pudo traducir el testimonio. Inténtalo de nuevo o traduce manualmente.");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    const url = await uploadTestimonialAvatar(file);
    setUploading(false);

    if (url) {
      setAvatarUrl(url);
    } else {
      setError("Error al subir la imagen. Inténtalo de nuevo.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nameEs.trim()) {
      setError("El nombre (ES) es obligatorio");
      return;
    }
    if (!quoteEs.trim()) {
      setError("El testimonio (ES) es obligatorio");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        section,
        name_es: nameEs.trim(),
        name_ja: nameJa.trim(),
        quote_es: quoteEs.trim(),
        quote_ja: quoteJa.trim(),
        avatar_url: avatarUrl.trim(),
        rating,
        display_order: displayOrder,
      });
    } catch {
      setError("Error al guardar el testimonio");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-foreground font-heading">
        {testimonial ? "Editar Testimonio" : "Añadir Testimonio"}
      </h2>

      {/* Section selector */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="section" className="text-sm font-semibold text-foreground font-heading">
          Sección
        </label>
        <select
          id="section"
          value={section}
          onChange={(e) => setSection(e.target.value as TestimonialSection)}
          className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow max-w-[200px]"
        >
          <option value="home">Inicio</option>
          <option value="tienda">Tienda</option>
        </select>
      </div>

      {/* Name fields */}
      <div className="space-y-4">
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
              onClick={handleTranslateName}
              disabled={translatingName || !nameEs.trim()}
              className="text-xs font-semibold text-ukiyo-navy hover:text-primary-hover disabled:opacity-40 disabled:cursor-not-allowed font-heading transition-colors"
            >
              {translatingName ? "Traduciendo..." : "Auto-traducir"}
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

      {/* Quote fields */}
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="quoteEs" className="text-sm font-semibold text-foreground font-heading">
            Testimonio (Español)
          </label>
          <textarea
            id="quoteEs"
            value={quoteEs}
            onChange={(e) => setQuoteEs(e.target.value)}
            rows={4}
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow resize-y"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="quoteJa" className="text-sm font-semibold text-foreground font-heading">
              Testimonio (Japonés)
            </label>
            <button
              type="button"
              onClick={handleTranslateQuote}
              disabled={translatingQuote || !quoteEs.trim()}
              className="text-xs font-semibold text-ukiyo-navy hover:text-primary-hover disabled:opacity-40 disabled:cursor-not-allowed font-heading transition-colors"
            >
              {translatingQuote ? "Traduciendo..." : "Auto-traducir"}
            </button>
          </div>
          <textarea
            id="quoteJa"
            value={quoteJa}
            onChange={(e) => setQuoteJa(e.target.value)}
            rows={4}
            placeholder={quoteEs || undefined}
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow resize-y"
          />
        </div>
      </div>

      {/* Avatar upload */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-foreground font-heading">
          Avatar
        </label>
        <div className="flex items-center gap-4">
          {avatarUrl && (
            <Image
              src={avatarUrl}
              alt="Avatar preview"
              width={48}
              height={48}
              className="rounded-full object-cover ring-2 ring-sakura-pink"
            />
          )}
          <div className="flex flex-col gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="text-sm text-text-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-ukiyo-navy/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-ukiyo-navy hover:file:bg-ukiyo-navy/20 file:transition-colors file:cursor-pointer disabled:opacity-50"
            />
            {uploading && (
              <span className="text-xs text-text-secondary">Subiendo imagen...</span>
            )}
            {avatarUrl && (
              <input
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="URL del avatar"
                className="rounded-xl border border-border-color bg-background px-4 py-2 text-xs text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow"
              />
            )}
          </div>
        </div>
      </div>

      {/* Rating and order */}
      <div className="flex gap-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rating" className="text-sm font-semibold text-foreground font-heading">
            Valoración
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-0.5"
              >
                <svg
                  className={`w-6 h-6 transition-colors ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1.5 max-w-[200px]">
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
