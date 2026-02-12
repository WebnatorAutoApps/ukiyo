"use client";

import { useProducts } from "./useProducts";

export function useMochis() {
  const { products, loading, error, hasData } = useProducts({ type: "mochis" });
  return { mochis: products, loading, error, hasData };
}
