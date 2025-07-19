"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { SessionHighlights } from "@/components/landing/SessionHighlights";
import { StudentFeatures } from "@/components/landing/StudentFeatures";
import { Loader2 } from "lucide-react";

export default function LandingPage() {
  const { session, user, userProfile, loading, needsOnboarding } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (session) {
      if (needsOnboarding) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    }
  }, [session, userProfile, loading, needsOnboarding, router]);

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
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 justify-center items-center">
        <Hero />
        <StudentFeatures />
        <SessionHighlights />
      </main>
      <Footer />
    </div>
  );
}
