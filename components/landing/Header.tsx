"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/components/auth-provider";
import { getSupabaseClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export function Header() {
  const { session, userProfile, loading } = useAuth();
  const supabase = getSupabaseClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
        <Link
          href="/"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <div className="w-8 h-8 bg-primary rounded-lg mr-2"></div>
          <span className="text-xl font-bold">EduVibe</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <div className="w-8 h-8 bg-primary rounded-lg mr-2"></div>
        <span className="text-xl font-bold">EduVibe</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-8">
        {session ? (
          <>
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Sessions
            </Link>
            <ModeToggle />
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {userProfile?.email}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </>
        ) : (
          <>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Sessions
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              About
            </Link>
            <ModeToggle />
            <Link href="/sign-in">
              <Button>Get Started</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
