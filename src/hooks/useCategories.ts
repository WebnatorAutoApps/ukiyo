"use client";

import { useState, useEffect } from "react";
import { supabaseConfigured } from "@/lib/supabase";
import { fetchCategories } from "@/lib/products";
import type { MenuCategoryRow } from "@/lib/database.types";

export function useCategories() {
  const [categories, setCategories] = useState<MenuCategoryRow[]>([]);
  const [loading, setLoading] = useState(supabaseConfigured);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!supabaseConfigured) return;

    let cancelled = false;
    fetchCategories()
      .then((data) => {
        if (!cancelled) {
          setCategories(data);
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
  }, []);

  return { categories, loading, error };
}
