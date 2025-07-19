"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { AuthForm } from "@/components/auth-form";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const { session, userProfile, loading, needsOnboarding } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait for auth to load

    // If user is already authenticated, redirect appropriately
    if (session) {
      if (needsOnboarding) {
        router.push("/onboarding");
      } else {
        // Redirect based on user role
        if (userProfile?.role === "STUDENT") {
          router.push("/dashboard/student");
        } else {
          router.push("/dashboard");
        }
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
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-md">
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}
