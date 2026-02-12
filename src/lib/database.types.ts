export type TagName = "nuevo" | "popular" | "seasonal";
export type SeasonValue = "spring" | "summer" | "fall" | "winter";

export interface MochiRow {
  id: string;
  title_es: string;
  title_ja: string;
  description_es: string;
  description_ja: string;
  price: string;
  image_url: string;
  emoji: string;
  display_order: number;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface MochiTagRow {
  id: string;
  mochi_id: string;
  tag_name: TagName;
  season: SeasonValue | null;
}

export interface MochiWithTags extends MochiRow {
  mochi_tags: MochiTagRow[];
}
