"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/lib/supabase";

interface AdminDashboardProps {
  email: string;
  onLogout: () => void;
}

export default function AdminDashboard({ email, onLogout }: AdminDashboardProps) {
  const { t } = useLanguage();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
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
            {t.admin.dashboardTitle}
          </h1>
          <p className="text-sm text-text-secondary text-center mb-6">
            {t.admin.dashboardWelcome}
          </p>

          <p className="text-sm text-foreground text-center mb-6 break-all">
            {email}
          </p>

          <button
            onClick={handleLogout}
            className="w-full rounded-xl bg-ukiyo-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors font-heading"
          >
            {t.admin.logoutButton}
          </button>
        </div>
      </div>
    </div>
  );
}
