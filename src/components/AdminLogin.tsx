"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase, supabaseConfigured } from "@/lib/supabase";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError(t.admin.emptyFieldsError);
      return;
    }

    if (!supabaseConfigured) {
      setError(t.admin.loginError);
      return;
    }

    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    setLoading(false);

    if (authError) {
      setError(t.admin.loginError);
      return;
    }

    onLoginSuccess();
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
                htmlFor="email"
                className="text-sm font-semibold text-foreground font-heading"
              >
                {t.admin.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.admin.emailPlaceholder}
                className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground placeholder-text-secondary/50 outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow"
                autoComplete="email"
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
              disabled={loading}
              className="mt-2 rounded-xl bg-ukiyo-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors font-heading disabled:opacity-50"
            >
              {loading ? t.admin.loadingButton : t.admin.submitButton}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
