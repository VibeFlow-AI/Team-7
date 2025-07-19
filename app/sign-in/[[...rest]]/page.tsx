"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { getSupabaseClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth-provider";
import { Loader2 } from "lucide-react";

const supabase = getSupabaseClient();

export default function SignInPage() {
  const { session, userProfile, loading, needsOnboarding } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait for auth to load

    // If user is already authenticated, redirect appropriately
    if (session) {
      if (needsOnboarding) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    }
  }, [session, userProfile, loading, needsOnboarding, router]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // If user is already authenticated, show loading while redirecting
  if (session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Redirecting...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Welcome to EduVibe</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "hsl(var(--primary))",
                  brandAccent: "hsl(var(--primary-foreground))",
                },
              },
            },
          }}
          providers={["google", "github"]}
          redirectTo={`${window.location.origin}/auth/callback`}
        />
      </div>
    </div>
  );
}
