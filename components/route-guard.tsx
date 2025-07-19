"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Loader2 } from "lucide-react";

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: "STUDENT" | "MENTOR";
  redirectTo?: string;
}

export function RouteGuard({
  children,
  requireAuth = true,
  requireRole,
  redirectTo,
}: RouteGuardProps) {
  const { session, user, userProfile, loading, isGuest, needsOnboarding } =
    useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return; // Wait for auth to load

    // If authentication is required but user is not authenticated
    if (requireAuth && !session) {
      router.push("/sign-in");
      return;
    }

    // If user is authenticated but needs onboarding
    if (
      session &&
      needsOnboarding &&
      pathname !== "/onboarding" &&
      !pathname.startsWith("/onboarding/")
    ) {
      router.push("/onboarding");
      return;
    }

    // If specific role is required
    if (requireRole && userProfile && userProfile.role !== requireRole) {
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push("/unauthorized");
      }
      return;
    }

    // If user is on onboarding page but doesn't need onboarding
    if (session && !needsOnboarding && pathname === "/onboarding") {
      // Redirect to appropriate dashboard based on role
      if (userProfile?.role === "STUDENT") {
        router.push("/dashboard/student");
      } else if (userProfile?.role === "MENTOR") {
        router.push("/dashboard");
      } else {
        router.push("/dashboard");
      }
      return;
    }
  }, [
    session,
    userProfile,
    loading,
    needsOnboarding,
    requireAuth,
    requireRole,
    redirectTo,
    router,
    pathname,
  ]);

  // Show loading spinner only on initial load, not on tab switches
  if (loading && !session && !userProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated, show nothing while redirecting
  if (requireAuth && !session) {
    return null;
  }

  // If user needs onboarding but is not on onboarding page, show nothing while redirecting
  if (
    session &&
    needsOnboarding &&
    pathname !== "/onboarding" &&
    !pathname.startsWith("/onboarding/")
  ) {
    return null;
  }

  return <>{children}</>;
}
