"use client";

import { useState, useEffect } from "react";
import { supabaseConfigured } from "@/lib/supabase";
import { fetchProducts } from "@/lib/products";
import type { ProductType, ProductWithTags } from "@/lib/database.types";

export function useProducts(options?: { type?: ProductType; types?: ProductType[] }) {
  const [products, setProducts] = useState<ProductWithTags[]>([]);
  const [loading, setLoading] = useState(supabaseConfigured);
  const [error, setError] = useState(false);

  const typeKey = options?.type ?? "";
  const typesKey = options?.types?.join(",") ?? "";

  useEffect(() => {
    if (!supabaseConfigured) return;

    let cancelled = false;
    fetchProducts({ type: options?.type, types: options?.types })
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeKey, typesKey]);

  return { products, loading, error, hasData: products.length > 0 };
}
