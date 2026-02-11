"use client";

import { useState, useEffect } from "react";
import { supabaseConfigured } from "@/lib/supabase";
import { fetchMochis } from "@/lib/mochis";
import type { MochiWithTags } from "@/lib/database.types";

export function useMochis() {
  const [mochis, setMochis] = useState<MochiWithTags[]>([]);
  const [loaded, setLoaded] = useState(!supabaseConfigured);

  useEffect(() => {
    if (!supabaseConfigured) return;

    let cancelled = false;
    fetchMochis().then((data) => {
      if (!cancelled) {
        setMochis(data);
        setLoaded(true);
      }
    });

    return () => { cancelled = true; };
  }, []);

  return { mochis, loaded, hasData: mochis.length > 0 };
}
