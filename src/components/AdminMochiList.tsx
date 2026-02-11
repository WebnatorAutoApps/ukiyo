"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { MochiWithTags } from "@/lib/database.types";

interface AdminMochiListProps {
  mochis: MochiWithTags[];
  onEdit: (mochi: MochiWithTags) => void;
  onDelete: (id: string) => Promise<void>;
  onAdd: () => void;
}

function TagBadges({ mochi }: { mochi: MochiWithTags }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-wrap gap-1">
      {mochi.mochi_tags.map((tag) => {
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

export default function AdminMochiList({ mochis, onEdit, onDelete, onAdd }: AdminMochiListProps) {
  const { t, locale } = useLanguage();
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
          {t.admin.mochisTitle}
        </h2>
        <button
          onClick={onAdd}
          className="rounded-xl bg-ukiyo-navy px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors font-heading"
        >
          + {t.admin.addMochi}
        </button>
      </div>

      {mochis.length === 0 ? (
        <div className="text-center py-12 text-text-secondary">
          <p className="text-4xl mb-3">🍡</p>
          <p>{t.admin.noMochis}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mochis.map((mochi) => (
            <div
              key={mochi.id}
              className="rounded-xl bg-wood-light/60 border border-soft-wood/30 p-4 shadow-cozy flex items-center gap-4"
            >
              {/* Image */}
              <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-border-color">
                {mochi.image_url ? (
                  <Image
                    src={mochi.image_url}
                    alt={locale === "ja" ? mochi.title_ja : mochi.title_es}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-sakura-pink/30">
                    <span className="text-2xl">{mochi.emoji}</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm">{mochi.emoji}</span>
                  <h3 className="text-sm font-bold text-foreground font-heading truncate">
                    {locale === "ja" ? mochi.title_ja : mochi.title_es}
                  </h3>
                  <TagBadges mochi={mochi} />
                </div>
                <p className="text-xs text-text-secondary mt-0.5 truncate">
                  {locale === "ja" ? mochi.description_ja : mochi.description_es}
                </p>
              </div>

              {/* Price */}
              <span className="text-sm font-bold text-ukiyo-navy font-heading flex-shrink-0">
                {mochi.price}
              </span>

              {/* Order */}
              <span className="text-xs text-text-secondary flex-shrink-0 w-8 text-center">
                #{mochi.display_order}
              </span>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => onEdit(mochi)}
                  className="rounded-lg bg-ukiyo-navy/10 px-3 py-1.5 text-xs font-semibold text-ukiyo-navy hover:bg-ukiyo-navy/20 transition-colors font-heading"
                >
                  {t.admin.editMochi}
                </button>
                {confirmId === mochi.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(mochi.id)}
                      disabled={deletingId === mochi.id}
                      className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition-colors font-heading disabled:opacity-50"
                    >
                      {deletingId === mochi.id ? "..." : t.admin.deleteMochi}
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
                    onClick={() => setConfirmId(mochi.id)}
                    className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-500/20 transition-colors font-heading"
                  >
                    {t.admin.deleteMochi}
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
