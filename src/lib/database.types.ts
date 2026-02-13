export type ProductType = "mochis" | "bebidas" | "postres" | "raciones" | "salados" | "combos" | "otros";
export type TagName = "nuevo" | "popular" | "seasonal" | "bestSeller";
export type SeasonValue = "spring" | "summer" | "fall" | "winter";

export interface ProductRow {
  id: string;
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
  created_at: string;
  updated_at: string;
}

export interface ProductTagRow {
  id: string;
  product_id: string;
  tag_name: TagName;
  season: SeasonValue | null;
}

export interface ProductWithTags extends ProductRow {
  product_tags: ProductTagRow[];
}

export interface MenuCategoryRow {
  id: string;
  name_es: string;
  name_ja: string;
  emoji: string;
  display_order: number;
  enabled: boolean;
  product_types: ProductType[];
  created_at: string;
  updated_at: string;
}

export type HighlightSection = "menuSlider" | "specialtyDrinks" | "menuHighlights";

export interface HighlightItemRow {
  id: string;
  section: HighlightSection;
  product_id: string;
  display_order: number;
  created_at: string;
}

export interface HighlightItemWithProduct extends HighlightItemRow {
  products: ProductRow & { product_tags: ProductTagRow[] };
}

export interface FaqRow {
  id: string;
  question_es: string;
  question_ja: string;
  answer_es: string;
  answer_ja: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface TestimonialRow {
  id: string;
  name_es: string;
  name_ja: string;
  quote_es: string;
  quote_ja: string;
  avatar_url: string;
  rating: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Legacy aliases for gradual transition
export type MochiRow = ProductRow;
export type MochiTagRow = ProductTagRow;
export type MochiWithTags = ProductWithTags;
