"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import type { ProductWithTags } from "@/lib/database.types";

interface SearchableProductSelectorProps {
  products: ProductWithTags[];
  onSelect: (productId: string) => void;
  onCancel: () => void;
  saving: boolean;
}

export default function SearchableProductSelector({
  products,
  onSelect,
  onCancel,
  saving,
}: SearchableProductSelectorProps) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return products;
    const lower = query.toLowerCase();
    return products.filter(
      (p) =>
        p.title_es.toLowerCase().includes(lower) ||
        p.title_ja.toLowerCase().includes(lower) ||
        p.type.toLowerCase().includes(lower) ||
        p.emoji.includes(query)
    );
  }, [products, query]);

  const selectedProduct = products.find((p) => p.id === selectedId);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("[data-product-item]");
      items[highlightedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filtered.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
          setSelectedId(filtered[highlightedIndex].id);
          setQuery(filtered[highlightedIndex].title_es);
          setIsOpen(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (product: ProductWithTags) => {
    setSelectedId(product.id);
    setQuery(product.title_es);
    setIsOpen(false);
  };

  return (
    <div className="space-y-3">
      <div ref={containerRef} className="relative">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="7" cy="7" r="4" />
              <path d="M16 16l-3.5-3.5" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedId("");
                setHighlightedIndex(-1);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar producto por nombre..."
              className="w-full rounded-xl border border-border-color bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sakura-pink"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setSelectedId("");
                  setHighlightedIndex(-1);
                  inputRef.current?.focus();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground"
                aria-label="Limpiar búsqueda"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Dropdown results */}
        {isOpen && (
          <div
            ref={listRef}
            className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-xl border border-border-color bg-background shadow-lg"
          >
            {filtered.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-text-secondary">
                No se encontraron productos
                {query && (
                  <span className="block mt-1 text-xs">
                    Prueba con otro término de búsqueda
                  </span>
                )}
              </div>
            ) : (
              filtered.map((product, index) => (
                <button
                  key={product.id}
                  data-product-item
                  onClick={() => handleSelect(product)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${
                    index === highlightedIndex
                      ? "bg-sakura-pink/20"
                      : "hover:bg-soft-wood/20"
                  } ${selectedId === product.id ? "bg-sakura-pink/10" : ""}`}
                >
                  <span className="text-lg shrink-0" aria-hidden="true">
                    {product.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-foreground truncate block">
                      {product.title_es}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {product.title_ja}
                    </span>
                  </div>
                  <span className="text-xs text-text-secondary bg-soft-wood/30 px-2 py-0.5 rounded-full shrink-0">
                    {product.type}
                  </span>
                  <span className="text-sm font-semibold text-ukiyo-navy shrink-0">
                    {product.price}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Selected product preview */}
      {selectedProduct && (
        <div className="flex items-center gap-3 rounded-xl bg-sakura-pink/10 border border-sakura-pink/30 p-3">
          <span className="text-lg" aria-hidden="true">
            {selectedProduct.emoji}
          </span>
          <div className="flex-1 min-w-0">
            <span className="text-sm font-semibold text-foreground">
              {selectedProduct.title_es}
            </span>
            <span className="ml-2 text-xs text-text-secondary">
              {selectedProduct.title_ja}
            </span>
          </div>
          <span className="text-sm font-semibold text-ukiyo-navy">
            {selectedProduct.price}
          </span>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onSelect(selectedId)}
          disabled={!selectedId || saving}
          className="rounded-xl bg-ukiyo-navy px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover transition-colors disabled:opacity-50 font-heading"
        >
          {saving ? "..." : "Añadir"}
        </button>
        <button
          onClick={onCancel}
          className="rounded-xl border border-border-color px-4 py-2 text-xs font-semibold text-text-secondary hover:text-foreground transition-colors font-heading"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
