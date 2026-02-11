"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Hook that observes when a hero section enters the viewport and triggers
 * image loading. Uses IntersectionObserver with a configurable rootMargin
 * so images start loading slightly before becoming visible.
 *
 * Returns a ref to attach to the hero container and a boolean indicating
 * whether the section is within the loading threshold.
 */
export function useHeroInView(rootMargin = "200px") {
  const ref = useRef<HTMLElement>(null);
  // If IntersectionObserver is not available, default to true (load eagerly)
  const [isInView, setIsInView] = useState(
    () => typeof window !== "undefined" && typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    if (isInView) return; // Already visible or fallback active

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, isInView]);

  return { ref, isInView };
}

/**
 * Returns true when the user prefers reduced motion.
 * Used to skip or shorten JS-driven fade transitions in hero components.
 */
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}
