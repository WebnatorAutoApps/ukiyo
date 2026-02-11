"use client";

import { useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  const [session, setSession] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session?.user?.email ? { email: session.user.email } : null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session?.user?.email ? { email: session.user.email } : null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-ukiyo-navy border-t-transparent" />
      </div>
    );
  }

  if (session) {
    return (
      <AdminDashboard
        email={session.email}
        onLogout={() => setSession(null)}
      />
    );
  }

  return (
    <AdminLogin
      onLoginSuccess={() => {
        if (!supabaseConfigured) return;
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session?.user?.email ? { email: session.user.email } : null);
        });
      }}
    />
  );
}
