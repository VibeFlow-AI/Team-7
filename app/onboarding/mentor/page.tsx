"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RouteGuard } from "@/components/route-guard";
import { useAuth } from "@/components/auth-provider";
import { Loader2 } from "lucide-react";

export default function MentorOnboardingPage() {
  const { userProfile, loading } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    email: "",
    contactNumber: "",
    professionalRole: "",
    currentLocation: "",
    shortBio: "",
    subjectsToTeach: "",
    teachingExperience: "",
    preferredStudentLevels: "",
    linkedInProfile: "",
    githubOrPortfolio: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    alert("Submitting form... (Server action to be connected)");
    // const result = await createMentorProfile(formData);
    // if (result.success) {
    //   router.push("/dashboard");
    // } else {
    //   alert(result.message);
    // }
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
    <RouteGuard requireAuth={true} requireRole="MENTOR">
      <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Mentor Onboarding
            </CardTitle>
            <CardDescription>
              Part {step} of 3:{" "}
              {step === 1
                ? "Personal Information"
                : step === 2
                  ? "Professional Background"
                  : "Teaching Preferences"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    defaultValue={userProfile?.email}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentLocation">Current Location</Label>
                  <Input
                    id="currentLocation"
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="professionalRole">Professional Role</Label>
                  <Input
                    id="professionalRole"
                    name="professionalRole"
                    value={formData.professionalRole}
                    onChange={handleChange}
                    placeholder="e.g., Software Engineer, Teacher, Researcher"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shortBio">Short Bio</Label>
                  <Textarea
                    id="shortBio"
                    name="shortBio"
                    value={formData.shortBio}
                    onChange={handleChange}
                    placeholder="Tell us about your background and expertise..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teachingExperience">
                    Teaching Experience
                  </Label>
                  <Select
                    name="teachingExperience"
                    onValueChange={(value) =>
                      handleSelectChange("teachingExperience", value)
                    }
                  >
                    <SelectTrigger id="teachingExperience">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Less than 1 year">
                        Less than 1 year
                      </SelectItem>
                      <SelectItem value="1-3 years">1-3 years</SelectItem>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="5+ years">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subjectsToTeach">
                    Subjects You Can Teach (comma-separated)
                  </Label>
                  <Input
                    id="subjectsToTeach"
                    name="subjectsToTeach"
                    value={formData.subjectsToTeach}
                    onChange={handleChange}
                    placeholder="e.g., Mathematics, Physics, Programming"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredStudentLevels">
                    Preferred Student Levels (comma-separated)
                  </Label>
                  <Input
                    id="preferredStudentLevels"
                    name="preferredStudentLevels"
                    value={formData.preferredStudentLevels}
                    onChange={handleChange}
                    placeholder="e.g., Grade 9, Ordinary Level, Advanced Level"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedInProfile">LinkedIn Profile URL</Label>
                  <Input
                    id="linkedInProfile"
                    name="linkedInProfile"
                    type="url"
                    value={formData.linkedInProfile}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubOrPortfolio">
                    GitHub or Portfolio URL (Optional)
                  </Label>
                  <Input
                    id="githubOrPortfolio"
                    name="githubOrPortfolio"
                    type="url"
                    value={formData.githubOrPortfolio}
                    onChange={handleChange}
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {step < 3 && (
              <Button
                onClick={() => setStep(step + 1)}
                className={step === 1 ? "ml-auto" : ""}
              >
                Next
              </Button>
            )}
            {step === 3 && (
              <Button onClick={handleFormSubmit} className="ml-auto">
                Complete Setup
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </RouteGuard>
  );
}
