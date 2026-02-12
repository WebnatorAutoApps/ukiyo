"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  toggleProductEnabled,
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryEnabled,
} from "@/lib/products";
import {
  fetchAllHighlightItems,
  addHighlightItem,
  removeHighlightItem,
  replaceHighlightItems,
} from "@/lib/highlights";
import type { ProductWithTags, ProductType, MenuCategoryRow, TagName, SeasonValue, HighlightItemRow, HighlightSection } from "@/lib/database.types";
import AdminProductList from "./AdminProductList";
import AdminProductForm from "./AdminProductForm";
import AdminCategoryList from "./AdminCategoryList";
import AdminCategoryForm from "./AdminCategoryForm";
import AdminHighlightManager from "./AdminHighlightManager";

interface AdminDashboardProps {
  email: string;
  onLogout: () => void;
}

type Section = "products" | "categories" | "highlights";
type View = "list" | "add" | "edit";

export default function AdminDashboard({ email, onLogout }: AdminDashboardProps) {
  const [products, setProducts] = useState<ProductWithTags[]>([]);
  const [categories, setCategories] = useState<MenuCategoryRow[]>([]);
  const [highlightItems, setHighlightItems] = useState<HighlightItemRow[]>([]);
  const [loading, setLoading] = useState(supabaseConfigured);
  const [section, setSection] = useState<Section>("products");
  const [view, setView] = useState<View>("list");
  const [editingProduct, setEditingProduct] = useState<ProductWithTags | null>(null);
  const [editingCategory, setEditingCategory] = useState<MenuCategoryRow | null>(null);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let cancelled = false;
    Promise.all([
      fetchProducts({ includeDisabled: true }),
      fetchCategories(true),
      fetchAllHighlightItems(),
    ]).then(([prodData, catData, hlData]) => {
      if (!cancelled) {
        setProducts(prodData);
        setCategories(catData);
        setHighlightItems(hlData);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  // ─── Product handlers ────────────────────────────

  const handleAddProduct = () => {
    setEditingProduct(null);
    setView("add");
  };

  const handleEditProduct = (product: ProductWithTags) => {
    setEditingProduct(product);
    setView("edit");
  };

  const handleDeleteProduct = async (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const success = await deleteProduct(id);
    if (success) {
      if (product.image_url.includes("supabase.co")) {
        await deleteProductImage(product.image_url);
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleToggleProduct = async (id: string, enabled: boolean) => {
    const success = await toggleProductEnabled(id, enabled);
    if (success) {
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, enabled } : p)));
    }
  };

  const handleSaveProduct = async (data: {
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
  }) => {
    if (view === "edit" && editingProduct) {
      if (
        editingProduct.image_url !== data.image_url &&
        editingProduct.image_url.includes("supabase.co")
      ) {
        await deleteProductImage(editingProduct.image_url);
      }
      const updated = await updateProduct(editingProduct.id, data);
      if (updated) {
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      }
    } else {
      const created = await createProduct(data);
      if (created) {
        setProducts((prev) => [...prev, created].sort((a, b) => a.display_order - b.display_order));
      }
    }
    setView("list");
    setEditingProduct(null);
  };

  // ─── Category handlers ───────────────────────────

  const handleAddCategory = () => {
    setEditingCategory(null);
    setView("add");
  };

  const handleEditCategory = (cat: MenuCategoryRow) => {
    setEditingCategory(cat);
    setView("edit");
  };

  const handleDeleteCategory = async (id: string) => {
    const success = await deleteCategory(id);
    if (success) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleToggleCategory = async (id: string, enabled: boolean) => {
    const success = await toggleCategoryEnabled(id, enabled);
    if (success) {
      setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, enabled } : c)));
    }
  };

  const handleSaveCategory = async (data: {
    name_es: string;
    name_ja: string;
    emoji: string;
    display_order: number;
    enabled: boolean;
    product_types: ProductType[];
  }) => {
    if (view === "edit" && editingCategory) {
      const updated = await updateCategory(editingCategory.id, data);
      if (updated) {
        setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      }
    } else {
      const created = await createCategory(data);
      if (created) {
        setCategories((prev) => [...prev, created].sort((a, b) => a.display_order - b.display_order));
      }
    }
    setView("list");
    setEditingCategory(null);
  };

  // ─── Highlight handlers ─────────────────────────

  const handleAddHighlight = async (section: HighlightSection, productId: string, order: number) => {
    const item = await addHighlightItem(section, productId, order);
    if (item) {
      setHighlightItems((prev) => [...prev, item]);
    }
  };

  const handleRemoveHighlight = async (id: string) => {
    const success = await removeHighlightItem(id);
    if (success) {
      setHighlightItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleReorderHighlights = async (
    section: HighlightSection,
    items: { product_id: string; display_order: number }[]
  ) => {
    const success = await replaceHighlightItems(section, items);
    if (success) {
      // Refetch to get the new IDs
      const fresh = await fetchAllHighlightItems();
      setHighlightItems(fresh);
    }
  };

  const handleCancel = () => {
    setView("list");
    setEditingProduct(null);
    setEditingCategory(null);
  };

  const switchSection = (s: Section) => {
    setSection(s);
    setView("list");
    setEditingProduct(null);
    setEditingCategory(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border-color bg-wood-light">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo-ukiyo.png"
              alt="Ukiyo Mochis & Coffee"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
            <span className="text-sm text-text-secondary hidden sm:inline">Panel de Administración</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-secondary hidden sm:inline">{email}</span>
            <button
              onClick={handleLogout}
              className="rounded-xl bg-ukiyo-navy px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover transition-colors font-heading"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="border-b border-border-color bg-wood-light/50">
        <div className="mx-auto max-w-5xl px-4 flex gap-1">
          <button
            onClick={() => switchSection("products")}
            className={`px-5 py-3 text-sm font-semibold font-heading transition-colors border-b-2 ${
              section === "products"
                ? "border-ukiyo-navy text-foreground"
                : "border-transparent text-text-secondary hover:text-foreground"
            }`}
          >
            Productos
          </button>
          <button
            onClick={() => switchSection("categories")}
            className={`px-5 py-3 text-sm font-semibold font-heading transition-colors border-b-2 ${
              section === "categories"
                ? "border-ukiyo-navy text-foreground"
                : "border-transparent text-text-secondary hover:text-foreground"
            }`}
          >
            Categorías
          </button>
          <button
            onClick={() => switchSection("highlights")}
            className={`px-5 py-3 text-sm font-semibold font-heading transition-colors border-b-2 ${
              section === "highlights"
                ? "border-ukiyo-navy text-foreground"
                : "border-transparent text-text-secondary hover:text-foreground"
            }`}
          >
            Destacados
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-ukiyo-navy border-t-transparent" />
          </div>
        ) : section === "highlights" ? (
          <AdminHighlightManager
            products={products}
            highlightItems={highlightItems}
            onAdd={handleAddHighlight}
            onRemove={handleRemoveHighlight}
            onReorder={handleReorderHighlights}
          />
        ) : view === "list" ? (
          section === "products" ? (
            <AdminProductList
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onAdd={handleAddProduct}
              onToggleEnabled={handleToggleProduct}
            />
          ) : (
            <AdminCategoryList
              categories={categories}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
              onAdd={handleAddCategory}
              onToggleEnabled={handleToggleCategory}
            />
          )
        ) : (
          <div>
            <button
              onClick={handleCancel}
              className="mb-4 text-sm text-ukiyo-navy hover:text-primary-hover font-heading font-semibold"
            >
              ← Volver
            </button>
            <div className="rounded-2xl bg-wood-light p-6 shadow-cozy">
              {section === "products" ? (
                <AdminProductForm
                  product={view === "edit" ? editingProduct : null}
                  onSave={handleSaveProduct}
                  onCancel={handleCancel}
                />
              ) : (
                <AdminCategoryForm
                  category={view === "edit" ? editingCategory : null}
                  onSave={handleSaveCategory}
                  onCancel={handleCancel}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
