import { supabase, supabaseConfigured } from "./supabase";
import type { TestimonialRow, TestimonialSection } from "./database.types";

export async function fetchTestimonials(section?: TestimonialSection): Promise<TestimonialRow[]> {
  if (!supabaseConfigured) return [];

  let query = supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });

  if (section) {
    query = query.eq("section", section);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }

  return (data as TestimonialRow[]) ?? [];
}

export async function createTestimonial(testimonial: {
  section: TestimonialSection;
  name_es: string;
  name_ja: string;
  quote_es: string;
  quote_ja: string;
  avatar_url: string;
  rating: number;
  display_order: number;
}): Promise<TestimonialRow | null> {
  if (!supabaseConfigured) return null;

  const { data, error } = await supabase
    .from("testimonials")
    .insert(testimonial)
    .select()
    .single();

  if (error) {
    console.error("Error creating testimonial:", error);
    return null;
  }

  return data as TestimonialRow;
}

export async function updateTestimonial(
  id: string,
  testimonial: {
    section: TestimonialSection;
    name_es: string;
    name_ja: string;
    quote_es: string;
    quote_ja: string;
    avatar_url: string;
    rating: number;
    display_order: number;
  }
): Promise<TestimonialRow | null> {
  if (!supabaseConfigured) return null;

  const { data, error } = await supabase
    .from("testimonials")
    .update({ ...testimonial, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating testimonial:", error);
    return null;
  }

  return data as TestimonialRow;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  if (!supabaseConfigured) return false;

  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) {
    console.error("Error deleting testimonial:", error);
    return false;
  }

  return true;
}

export async function uploadTestimonialAvatar(file: File): Promise<string | null> {
  if (!supabaseConfigured) return null;

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `testimonials/${fileName}`;

  const { error } = await supabase.storage.from("images").upload(filePath, file);

  if (error) {
    console.error("Error uploading avatar:", error);
    return null;
  }

  const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath);
  return urlData.publicUrl;
}

export async function deleteTestimonialAvatar(avatarUrl: string): Promise<void> {
  if (!supabaseConfigured) return;

  const match = avatarUrl.match(/\/images\/(.+)$/);
  if (!match) return;

  await supabase.storage.from("images").remove([match[1]]);
}
