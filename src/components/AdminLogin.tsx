"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError(t.admin.emptyFieldsError);
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logo-ukiyo.png"
            alt={t.logoAlt}
            width={160}
            height={53}
            className="h-12 w-auto"
            priority
          />
        </div>

        <div className="rounded-2xl bg-wood-light p-8 shadow-cozy">
          <h1 className="text-2xl font-bold text-center text-foreground mb-1 font-heading">
            {t.admin.title}
          </h1>
          <p className="text-sm text-text-secondary text-center mb-6">
            {t.admin.subtitle}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="username"
                className="text-sm font-semibold text-foreground font-heading"
              >
                {t.admin.usernameLabel}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t.admin.usernamePlaceholder}
                className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground placeholder-text-secondary/50 outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow"
                autoComplete="username"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-foreground font-heading"
              >
                {t.admin.passwordLabel}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.admin.passwordPlaceholder}
                className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground placeholder-text-secondary/50 outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-2 rounded-xl bg-ukiyo-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors font-heading"
            >
              {t.admin.submitButton}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
