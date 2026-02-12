import { supabase, supabaseConfigured } from "./supabase";
import type { HighlightSection, HighlightItemRow, HighlightItemWithProduct, ProductWithTags } from "./database.types";

export async function fetchHighlightsBySection(section: HighlightSection): Promise<ProductWithTags[]> {
  if (!supabaseConfigured) return [];

  const { data, error } = await supabase
    .from("highlight_items")
    .select("*, products(*, product_tags(*))")
    .eq("section", section)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching highlights:", error);
    return [];
  }

  return ((data as HighlightItemWithProduct[]) ?? []).map((item) => ({
    ...item.products,
    enabled: item.products.enabled ?? true,
  })) as ProductWithTags[];
}

export async function fetchAllHighlightItems(): Promise<HighlightItemRow[]> {
  if (!supabaseConfigured) return [];

  const { data, error } = await supabase
    .from("highlight_items")
    .select("id, section, product_id, display_order, created_at")
    .order("section")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching highlight items:", error);
    return [];
  }

  return (data as HighlightItemRow[]) ?? [];
}

export async function addHighlightItem(
  section: HighlightSection,
  productId: string,
  displayOrder: number
): Promise<HighlightItemRow | null> {
  if (!supabaseConfigured) return null;

  const { data, error } = await supabase
    .from("highlight_items")
    .insert({ section, product_id: productId, display_order: displayOrder })
    .select()
    .single();

  if (error) {
    console.error("Error adding highlight item:", error);
    return null;
  }

  return data as HighlightItemRow;
}

export async function removeHighlightItem(id: string): Promise<boolean> {
  if (!supabaseConfigured) return false;

  const { error } = await supabase.from("highlight_items").delete().eq("id", id);

  if (error) {
    console.error("Error removing highlight item:", error);
    return false;
  }

  return true;
}

export async function replaceHighlightItems(
  section: HighlightSection,
  items: { product_id: string; display_order: number }[]
): Promise<boolean> {
  if (!supabaseConfigured) return false;

  // Delete existing items for this section
  const { error: deleteError } = await supabase
    .from("highlight_items")
    .delete()
    .eq("section", section);

  if (deleteError) {
    console.error("Error deleting highlight items:", deleteError);
    return false;
  }

  if (items.length === 0) return true;

  // Insert new items
  const rows = items.map((item) => ({
    section,
    product_id: item.product_id,
    display_order: item.display_order,
  }));

  const { error: insertError } = await supabase
    .from("highlight_items")
    .insert(rows);

  if (insertError) {
    console.error("Error inserting highlight items:", insertError);
    return false;
  }

  return true;
}
