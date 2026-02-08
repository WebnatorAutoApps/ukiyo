"use client";

import { useState, useCallback } from "react";

function getFaviconUrl(): string {
  const selectors = [
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="apple-touch-icon"]',
    'link[rel="apple-touch-icon-precomposed"]',
  ];

  for (const selector of selectors) {
    const link = document.querySelector<HTMLLinkElement>(selector);
    if (link?.href) {
      return link.href; // browser resolves relative URLs to absolute automatically
    }
  }

  // Default fallback: /favicon.ico at the current origin
  return `${window.location.origin}/favicon.ico`;
}

export default function CopyPageInfo() {
  const [toast, setToast] = useState<string | null>(null);

  const handleCopy = useCallback(async () => {
    const title = document.title || "(Sin título)";
    const faviconUrl = getFaviconUrl();
    const text = `${title} | ${faviconUrl}`;

    try {
      await navigator.clipboard.writeText(text);
      setToast("Título y favicon copiados");
    } catch {
      // Fallback for browsers where Clipboard API is unavailable
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setToast("Título y favicon copiados");
    }

    setTimeout(() => setToast(null), 2500);
  }, []);

  return (
    <>
      <button
        onClick={handleCopy}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary-hover transition-colors"
        aria-label="Copiar título y favicon de la página"
        title="Copiar título y favicon"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      </button>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-24 left-6 z-50 rounded-lg bg-foreground text-white px-4 py-3 text-sm shadow-lg animate-[fadeInUp_0.3s_ease-out]"
        >
          {toast}
        </div>
      )}
    </>
  );
}
