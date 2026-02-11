"use client";

import { useState, useEffect } from "react";
import { supabaseConfigured } from "@/lib/supabase";
import { fetchMochis } from "@/lib/mochis";
import type { MochiWithTags } from "@/lib/database.types";

export function useMochis() {
  const [mochis, setMochis] = useState<MochiWithTags[]>([]);
  const [loading, setLoading] = useState(supabaseConfigured);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!supabaseConfigured) return;

    let cancelled = false;
    fetchMochis()
      .then((data) => {
        if (!cancelled) {
          setMochis(data);
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

  return { mochis, loading, error, hasData: mochis.length > 0 };
}
