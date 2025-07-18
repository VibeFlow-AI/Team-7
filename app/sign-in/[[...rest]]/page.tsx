"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { getSupabaseClient } from "@/lib/supabase/client";

const supabase = getSupabaseClient();

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    </div>
  );
}
