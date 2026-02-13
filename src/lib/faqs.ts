import { supabase, supabaseConfigured } from "./supabase";
import type { FaqRow } from "./database.types";

export async function fetchFaqs(): Promise<FaqRow[]> {
  if (!supabaseConfigured) return [];

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching faqs:", error);
    return [];
  }

  return (data as FaqRow[]) ?? [];
}

export async function createFaq(faq: {
  question_es: string;
  question_ja: string;
  answer_es: string;
  answer_ja: string;
  display_order: number;
}): Promise<FaqRow | null> {
  if (!supabaseConfigured) return null;

  const { data, error } = await supabase
    .from("faqs")
    .insert(faq)
    .select()
    .single();

  if (error) {
    console.error("Error creating faq:", error);
    return null;
  }

  return data as FaqRow;
}

export async function updateFaq(
  id: string,
  faq: {
    question_es: string;
    question_ja: string;
    answer_es: string;
    answer_ja: string;
    display_order: number;
  }
): Promise<FaqRow | null> {
  if (!supabaseConfigured) return null;

  const { data, error } = await supabase
    .from("faqs")
    .update({ ...faq, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating faq:", error);
    return null;
  }

  return data as FaqRow;
}

export async function deleteFaq(id: string): Promise<boolean> {
  if (!supabaseConfigured) return false;

  const { error } = await supabase.from("faqs").delete().eq("id", id);

  if (error) {
    console.error("Error deleting faq:", error);
    return false;
  }

  return true;
}
