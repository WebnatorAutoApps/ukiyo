"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { fetchMochis, createMochi, updateMochi, deleteMochi, deleteMochiImage } from "@/lib/mochis";
import type { MochiWithTags, TagName, SeasonValue } from "@/lib/database.types";
import AdminMochiList from "./AdminMochiList";
import AdminMochiForm from "./AdminMochiForm";

interface AdminDashboardProps {
  email: string;
  onLogout: () => void;
}

type View = "list" | "add" | "edit";

export default function AdminDashboard({ email, onLogout }: AdminDashboardProps) {
  const { t } = useLanguage();
  const [mochis, setMochis] = useState<MochiWithTags[]>([]);
  const [loading, setLoading] = useState(supabaseConfigured);
  const [view, setView] = useState<View>("list");
  const [editingMochi, setEditingMochi] = useState<MochiWithTags | null>(null);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let cancelled = false;
    fetchMochis().then((data) => {
      if (!cancelled) {
        setMochis(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const handleAdd = () => {
    setEditingMochi(null);
    setView("add");
  };

  const handleEdit = (mochi: MochiWithTags) => {
    setEditingMochi(mochi);
    setView("edit");
  };

  const handleDelete = async (id: string) => {
    const mochi = mochis.find((m) => m.id === id);
    if (!mochi) return;

    const success = await deleteMochi(id);
    if (success) {
      // Clean up image from storage if it's a Supabase URL
      if (mochi.image_url.includes("supabase.co")) {
        await deleteMochiImage(mochi.image_url);
      }
      setMochis((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleSave = async (data: {
    title_es: string;
    title_ja: string;
    description_es: string;
    description_ja: string;
    price: string;
    image_url: string;
    emoji: string;
    display_order: number;
    tags: { tag_name: TagName; season?: SeasonValue | null }[];
  }) => {
    if (view === "edit" && editingMochi) {
      // If image changed and old was from Supabase, clean up
      if (
        editingMochi.image_url !== data.image_url &&
        editingMochi.image_url.includes("supabase.co")
      ) {
        await deleteMochiImage(editingMochi.image_url);
      }
      const updated = await updateMochi(editingMochi.id, data);
      if (updated) {
        setMochis((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
      }
    } else {
      const created = await createMochi(data);
      if (created) {
        setMochis((prev) => [...prev, created].sort((a, b) => a.display_order - b.display_order));
      }
    }
    setView("list");
    setEditingMochi(null);
  };

  const handleCancel = () => {
    setView("list");
    setEditingMochi(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border-color bg-wood-light">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo-ukiyo.png"
              alt={t.logoAlt}
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
            <span className="text-sm text-text-secondary hidden sm:inline">{t.admin.dashboardTitle}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-secondary hidden sm:inline">{email}</span>
            <button
              onClick={handleLogout}
              className="rounded-xl bg-ukiyo-navy px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover transition-colors font-heading"
            >
              {t.admin.logoutButton}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-ukiyo-navy border-t-transparent" />
          </div>
        ) : view === "list" ? (
          <AdminMochiList
            mochis={mochis}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
        ) : (
          <div>
            <button
              onClick={handleCancel}
              className="mb-4 text-sm text-ukiyo-navy hover:text-primary-hover font-heading font-semibold"
            >
              ← {t.admin.back}
            </button>
            <div className="rounded-2xl bg-wood-light p-6 shadow-cozy">
              <AdminMochiForm
                mochi={view === "edit" ? editingMochi : null}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
