import { supabase, supabaseConfigured } from "./supabase";
import type { MochiWithTags, TagName, SeasonValue } from "./database.types";

export async function fetchMochis(includeDisabled = false): Promise<MochiWithTags[]> {
  if (!supabaseConfigured) return [];

  let query = supabase
    .from("mochis")
    .select("*, mochi_tags(*)")
    .order("display_order", { ascending: true });

  if (!includeDisabled) {
    query = query.eq("enabled", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching mochis:", error);
    return [];
  }

  // Default enabled to true for rows where the column doesn't exist yet
  return (data?.map((m) => ({ ...m, enabled: m.enabled ?? true })) as MochiWithTags[]) ?? [];
}

export async function fetchMochiById(id: string): Promise<MochiWithTags | null> {
  if (!supabaseConfigured) return null;

  const { data, error } = await supabase
    .from("mochis")
    .select("*, mochi_tags(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching mochi:", error);
    return null;
  }

  return { ...data, enabled: data.enabled ?? true } as MochiWithTags;
}


export async function createMochi(mochi: {
  title_es: string;
  title_ja: string;
  description_es: string;
  description_ja: string;
  price: string;
  image_url: string;
  emoji: string;
  display_order: number;
  enabled: boolean;
  tags: { tag_name: TagName; season?: SeasonValue | null }[];
}): Promise<MochiWithTags | null> {
  if (!supabaseConfigured) return null;

  const { tags, ...mochiData } = mochi;

  const { data, error } = await supabase
    .from("mochis")
    .insert(mochiData)
    .select()
    .single();

  if (error) {
    console.error("Error creating mochi:", error);
    return null;
  }

  if (tags.length > 0) {
    const tagRows = tags.map((tag) => ({
      mochi_id: data.id,
      tag_name: tag.tag_name,
      season: tag.tag_name === "seasonal" ? (tag.season ?? null) : null,
    }));

    const { error: tagError } = await supabase.from("mochi_tags").insert(tagRows);
    if (tagError) {
      console.error("Error creating mochi tags:", tagError);
    }
  }

  return fetchMochiById(data.id);
}

export async function updateMochi(
  id: string,
  mochi: {
    title_es: string;
    title_ja: string;
    description_es: string;
    description_ja: string;
    price: string;
    image_url: string;
    emoji: string;
    display_order: number;
    enabled: boolean;
    tags: { tag_name: TagName; season?: SeasonValue | null }[];
  }
): Promise<MochiWithTags | null> {
  if (!supabaseConfigured) return null;

  const { tags, ...mochiData } = mochi;

  const { error } = await supabase
    .from("mochis")
    .update({ ...mochiData, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating mochi:", error);
    return null;
  }

  // Replace tags: delete existing, insert new
  const { error: deleteError } = await supabase
    .from("mochi_tags")
    .delete()
    .eq("mochi_id", id);

  if (deleteError) {
    console.error("Error deleting mochi tags:", deleteError);
  }

  if (tags.length > 0) {
    const tagRows = tags.map((tag) => ({
      mochi_id: id,
      tag_name: tag.tag_name,
      season: tag.tag_name === "seasonal" ? (tag.season ?? null) : null,
    }));

    const { error: tagError } = await supabase.from("mochi_tags").insert(tagRows);
    if (tagError) {
      console.error("Error creating mochi tags:", tagError);
    }
  }

  return fetchMochiById(id);
}

export async function toggleMochiEnabled(id: string, enabled: boolean): Promise<boolean> {
  if (!supabaseConfigured) return false;

  const { error } = await supabase
    .from("mochis")
    .update({ enabled, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error toggling mochi enabled:", error.message, error.code);
    return false;
  }

  return true;
}

export async function deleteMochi(id: string): Promise<boolean> {
  if (!supabaseConfigured) return false;

  // Tags will be deleted by cascade, but let's be explicit
  await supabase.from("mochi_tags").delete().eq("mochi_id", id);

  const { error } = await supabase.from("mochis").delete().eq("id", id);

  if (error) {
    console.error("Error deleting mochi:", error);
    return false;
  }

  return true;
}

export async function uploadMochiImage(file: File): Promise<string | null> {
  if (!supabaseConfigured) return null;

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `mochis/${fileName}`;

  const { error } = await supabase.storage.from("images").upload(filePath, file);

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath);
  return urlData.publicUrl;
}

export async function deleteMochiImage(imageUrl: string): Promise<void> {
  if (!supabaseConfigured) return;

  // Extract path from URL
  const match = imageUrl.match(/\/storage\/v1\/object\/public\/images\/(.+)$/);
  if (!match) return;

  const filePath = match[1];
  await supabase.storage.from("images").remove([filePath]);
}
