import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OnboardingRoleSelectionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Get Started
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="flex flex-col items-center text-center gap-4">
            <h3 className="text-xl font-semibold">Sign Up as a Mentor</h3>
            <Link href="/onboarding/mentor" className="w-full">
              <Button className="w-full">Continue as a Mentor</Button>
            </Link>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <h3 className="text-xl font-semibold">Sign Up as a Student</h3>
            <Link href="/onboarding/student" className="w-full">
              <Button className="w-full">Continue as a Student</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
