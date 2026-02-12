import { supabase, supabaseConfigured } from "./supabase";
import type { ProductType, ProductWithTags, MenuCategoryRow, TagName, SeasonValue } from "./database.types";

// ─── Products ────────────────────────────────────────────────────

export async function fetchProducts(options?: {
  includeDisabled?: boolean;
  type?: ProductType;
  types?: ProductType[];
}): Promise<ProductWithTags[]> {
  if (!supabaseConfigured) return [];

  let query = supabase
    .from("products")
    .select("*, product_tags(*)")
    .order("display_order", { ascending: true });

  if (!options?.includeDisabled) {
    query = query.eq("enabled", true);
  }

  if (options?.type) {
    query = query.eq("type", options.type);
  } else if (options?.types && options.types.length > 0) {
    query = query.in("type", options.types);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return (data?.map((p) => ({ ...p, enabled: p.enabled ?? true })) as ProductWithTags[]) ?? [];
}

export async function fetchProductById(id: string): Promise<ProductWithTags | null> {
  if (!supabaseConfigured) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*, product_tags(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return { ...data, enabled: data.enabled ?? true } as ProductWithTags;
}

export async function createProduct(product: {
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
}): Promise<ProductWithTags | null> {
  if (!supabaseConfigured) return null;

  const { tags, ...productData } = product;

  const { data, error } = await supabase
    .from("products")
    .insert(productData)
    .select()
    .single();

  if (error) {
    console.error("Error creating product:", error);
    return null;
  }

  if (tags.length > 0) {
    const tagRows = tags.map((tag) => ({
      product_id: data.id,
      tag_name: tag.tag_name,
      season: tag.tag_name === "seasonal" ? (tag.season ?? null) : null,
    }));

    const { error: tagError } = await supabase.from("product_tags").insert(tagRows);
    if (tagError) {
      console.error("Error creating product tags:", tagError);
    }
  }

  return fetchProductById(data.id);
}

export async function updateProduct(
  id: string,
  product: {
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
  }
): Promise<ProductWithTags | null> {
  if (!supabaseConfigured) return null;

  const { tags, ...productData } = product;

  const { error } = await supabase
    .from("products")
    .update({ ...productData, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating product:", error);
    return null;
  }

  // Replace tags: delete existing, insert new
  const { error: deleteError } = await supabase
    .from("product_tags")
    .delete()
    .eq("product_id", id);

  if (deleteError) {
    console.error("Error deleting product tags:", deleteError);
  }

  if (tags.length > 0) {
    const tagRows = tags.map((tag) => ({
      product_id: id,
      tag_name: tag.tag_name,
      season: tag.tag_name === "seasonal" ? (tag.season ?? null) : null,
    }));

    const { error: tagError } = await supabase.from("product_tags").insert(tagRows);
    if (tagError) {
      console.error("Error creating product tags:", tagError);
    }
  }

  return fetchProductById(id);
}

export async function toggleProductEnabled(id: string, enabled: boolean): Promise<boolean> {
  if (!supabaseConfigured) return false;

  const { error } = await supabase
    .from("products")
    .update({ enabled, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error toggling product enabled:", error.message, error.code);
    return false;
  }

  return true;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (!supabaseConfigured) return false;

  await supabase.from("product_tags").delete().eq("product_id", id);

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    return false;
  }

  return true;
}

export async function uploadProductImage(file: File): Promise<string | null> {
  if (!supabaseConfigured) return null;

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage.from("images").upload(filePath, file);

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath);
  return urlData.publicUrl;
}

export async function deleteProductImage(imageUrl: string): Promise<void> {
  if (!supabaseConfigured) return;

  const match = imageUrl.match(/\/storage\/v1\/object\/public\/images\/(.+)$/);
  if (!match) return;

  const filePath = match[1];
  await supabase.storage.from("images").remove([filePath]);
}

// ─── Categories ──────────────────────────────────────────────────

export async function fetchCategories(includeDisabled = false): Promise<MenuCategoryRow[]> {
  if (!supabaseConfigured) return [];

  let query = supabase
    .from("menu_categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (!includeDisabled) {
    query = query.eq("enabled", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return (data as MenuCategoryRow[]) ?? [];
}

export async function createCategory(category: {
  name_es: string;
  name_ja: string;
  emoji: string;
  display_order: number;
  enabled: boolean;
  product_types: ProductType[];
}): Promise<MenuCategoryRow | null> {
  if (!supabaseConfigured) return null;

  const { data, error } = await supabase
    .from("menu_categories")
    .insert(category)
    .select()
    .single();

  if (error) {
    console.error("Error creating category:", error);
    return null;
  }

  return data as MenuCategoryRow;
}

export async function updateCategory(
  id: string,
  category: {
    name_es: string;
    name_ja: string;
    emoji: string;
    display_order: number;
    enabled: boolean;
    product_types: ProductType[];
  }
): Promise<MenuCategoryRow | null> {
  if (!supabaseConfigured) return null;

  const { data, error } = await supabase
    .from("menu_categories")
    .update({ ...category, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating category:", error);
    return null;
  }

  return data as MenuCategoryRow;
}

export async function toggleCategoryEnabled(id: string, enabled: boolean): Promise<boolean> {
  if (!supabaseConfigured) return false;

  const { error } = await supabase
    .from("menu_categories")
    .update({ enabled, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error toggling category enabled:", error);
    return false;
  }

  return true;
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (!supabaseConfigured) return false;

  const { error } = await supabase.from("menu_categories").delete().eq("id", id);

  if (error) {
    console.error("Error deleting category:", error);
    return false;
  }

  return true;
}
