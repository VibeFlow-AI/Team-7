"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { RouteGuard } from "@/components/route-guard";
import { Loader2 } from "lucide-react";

export default function OnboardingRoleSelectionPage() {
  const { userProfile, updateUserRole, loading } = useAuth();
  const router = useRouter();
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);

  const handleRoleSelection = async (role: "STUDENT" | "MENTOR") => {
    try {
      setUpdatingRole(role);
      await updateUserRole(role);

      // Small delay to ensure profile is updated
      await new Promise((resolve) => setTimeout(resolve, 500));

      router.push(`/onboarding/${role.toLowerCase()}`);
    } catch (error) {
      console.error("Error updating role:", error);
      // You might want to show a toast notification here
    } finally {
      setUpdatingRole(null);
    }
  };

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

  return (
    <RouteGuard requireAuth={true}>
      <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Welcome to EduVibe!
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Choose your role to get started
            </p>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="flex flex-col items-center text-center gap-4">
              <h3 className="text-xl font-semibold">I'm a Student</h3>
              <p className="text-sm text-muted-foreground">
                Looking for mentorship and guidance in your studies
              </p>
              <Button
                className="w-full"
                onClick={() => handleRoleSelection("STUDENT")}
                disabled={updatingRole !== null}
              >
                {updatingRole === "STUDENT" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  "Continue as Student"
                )}
              </Button>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <h3 className="text-xl font-semibold">I'm a Mentor</h3>
              <p className="text-sm text-muted-foreground">
                Ready to share knowledge and guide students
              </p>
              <Button
                className="w-full"
                onClick={() => handleRoleSelection("MENTOR")}
                disabled={updatingRole !== null}
              >
                {updatingRole === "MENTOR" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  "Continue as Mentor"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </RouteGuard>
  );
}
