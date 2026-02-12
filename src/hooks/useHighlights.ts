"use client";

import { useState, useEffect } from "react";
import { supabaseConfigured } from "@/lib/supabase";
import { fetchHighlightsBySection } from "@/lib/highlights";
import type { HighlightSection, ProductWithTags } from "@/lib/database.types";

export function useHighlights(section: HighlightSection) {
  const [products, setProducts] = useState<ProductWithTags[]>([]);
  const [loading, setLoading] = useState(supabaseConfigured);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!supabaseConfigured) return;

    let cancelled = false;
    fetchHighlightsBySection(section)
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [section]);

  return { products, loading, error };
}
