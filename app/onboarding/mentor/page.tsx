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
import { Checkbox } from "@/components/ui/checkbox";
import { RouteGuard } from "@/components/route-guard";
import { useAuth } from "@/components/auth-provider";
import { Loader2, Upload, X } from "lucide-react";
import { createMentorProfile } from "./actions";
import { useFormPersistence } from "@/hooks/use-form-persistence";

export default function MentorOnboardingPage() {
  const { userProfile, loading } = useAuth();
  const [step, setStep] = useState(1);

  const initialFormData = {
    fullName: "",
    age: "",
    email: "",
    contactNumber: "",
    preferredLanguage: "English",
    currentLocation: "",
    shortBio: "",
    professionalRole: "",
    subjectsToTeach: "",
    teachingExperience: "",
    preferredStudentLevels: [] as string[],
    linkedInProfile: "",
    githubOrPortfolio: "",
    profilePicture: null as File | null,
  };

  const [formData, setFormData, clearForm] = useFormPersistence(
    "mentor-onboarding-form",
    initialFormData
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  // Student level options
  const studentLevelOptions = [
    "Grade 3-5",
    "Grade 6-9",
    "Grade 10-11",
    "Advanced Level",
    "High School",
    "College",
    "Professional",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user makes a selection
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (level: string, checked: boolean) => {
    const currentLevels = formData.preferredStudentLevels || [];
    const updatedLevels = checked
      ? [...currentLevels, level]
      : currentLevels.filter((l) => l !== level);

    setFormData({ ...formData, preferredStudentLevels: updatedLevels });

    if (errors.preferredStudentLevels) {
      setErrors((prev) => ({ ...prev, preferredStudentLevels: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.age || parseInt(formData.age) < 1) {
      newErrors.age = "Valid age is required";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    }

    if (!formData.professionalRole.trim()) {
      newErrors.professionalRole = "Professional role is required";
    }

    if (!formData.shortBio.trim()) {
      newErrors.shortBio = "Short bio is required";
    }

    if (!formData.teachingExperience) {
      newErrors.teachingExperience = "Teaching experience is required";
    }

    if (!formData.subjectsToTeach.trim()) {
      newErrors.subjectsToTeach = "Subjects to teach are required";
    }

    if (
      !formData.preferredStudentLevels ||
      formData.preferredStudentLevels.length === 0
    ) {
      newErrors.preferredStudentLevels =
        "Preferred student levels are required";
    }

    if (!formData.linkedInProfile.trim()) {
      newErrors.linkedInProfile = "LinkedIn profile URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert form data to match API expectations
      const apiFormData = {
        ...formData,
        preferredStudentLevels: formData.preferredStudentLevels.join(", "),
      };

      const result = await createMentorProfile(apiFormData);
      if (result.success) {
        clearForm(); // Clear form data from localStorage
        router.push("/dashboard");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form");
    } finally {
      setIsSubmitting(false);
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
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    className={errors.age ? "border-red-500" : ""}
                  />
                  {errors.age && (
                    <p className="text-sm text-red-500">{errors.age}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userProfile?.email || ""}
                    onChange={handleChange}
                    disabled
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
                    className={errors.contactNumber ? "border-red-500" : ""}
                  />
                  {errors.contactNumber && (
                    <p className="text-sm text-red-500">
                      {errors.contactNumber}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredLanguage">Preferred Language</Label>
                  <Select
                    name="preferredLanguage"
                    onValueChange={(value) =>
                      handleSelectChange("preferredLanguage", value)
                    }
                  >
                    <SelectTrigger id="preferredLanguage">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Sinhala">Sinhala</SelectItem>
                      <SelectItem value="Tamil">Tamil</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
                    className={errors.professionalRole ? "border-red-500" : ""}
                  />
                  {errors.professionalRole && (
                    <p className="text-sm text-red-500">
                      {errors.professionalRole}
                    </p>
                  )}
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
                    className={errors.shortBio ? "border-red-500" : ""}
                  />
                  {errors.shortBio && (
                    <p className="text-sm text-red-500">{errors.shortBio}</p>
                  )}
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
                    <SelectTrigger
                      id="teachingExperience"
                      className={
                        errors.teachingExperience ? "border-red-500" : ""
                      }
                    >
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
                  {errors.teachingExperience && (
                    <p className="text-sm text-red-500">
                      {errors.teachingExperience}
                    </p>
                  )}
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
                    className={errors.subjectsToTeach ? "border-red-500" : ""}
                  />
                  {errors.subjectsToTeach && (
                    <p className="text-sm text-red-500">
                      {errors.subjectsToTeach}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Preferred Student Levels</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {studentLevelOptions.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={level}
                          checked={
                            formData.preferredStudentLevels?.includes(level) ||
                            false
                          }
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(level, checked as boolean)
                          }
                        />
                        <Label htmlFor={level} className="text-sm font-normal">
                          {level}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.preferredStudentLevels && (
                    <p className="text-sm text-red-500">
                      {errors.preferredStudentLevels}
                    </p>
                  )}
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
                    className={errors.linkedInProfile ? "border-red-500" : ""}
                  />
                  {errors.linkedInProfile && (
                    <p className="text-sm text-red-500">
                      {errors.linkedInProfile}
                    </p>
                  )}
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
                <div className="space-y-2">
                  <Label htmlFor="profilePicture">
                    Profile Picture (Optional)
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input
                        type="file"
                        id="profilePicture"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("profilePicture")?.click()
                        }
                        className="flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        {formData.profilePicture
                          ? "Change Image"
                          : "Upload Image"}
                      </Button>
                    </div>
                    {formData.profilePicture && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {formData.profilePicture.name}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setFormData({ ...formData, profilePicture: null })
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => {
                  setStep(step - 1);
                  // Clear errors when going back
                  setErrors({});
                }}
              >
                Back
              </Button>
            )}
            {step < 3 && (
              <Button
                onClick={() => {
                  // Validate current step before proceeding
                  const currentStepErrors: Record<string, string> = {};

                  if (step === 1) {
                    if (!formData.fullName.trim())
                      currentStepErrors.fullName = "Full name is required";
                    if (!formData.age || parseInt(formData.age) < 1)
                      currentStepErrors.age = "Valid age is required";
                    if (!formData.contactNumber.trim())
                      currentStepErrors.contactNumber =
                        "Contact number is required";
                  } else if (step === 2) {
                    if (!formData.professionalRole.trim())
                      currentStepErrors.professionalRole =
                        "Professional role is required";
                    if (!formData.shortBio.trim())
                      currentStepErrors.shortBio = "Short bio is required";
                    if (!formData.teachingExperience)
                      currentStepErrors.teachingExperience =
                        "Teaching experience is required";
                  }

                  if (Object.keys(currentStepErrors).length > 0) {
                    setErrors(currentStepErrors);
                    return;
                  }

                  setStep(step + 1);
                }}
                className={step === 1 ? "ml-auto" : ""}
              >
                Next
              </Button>
            )}
            {step === 3 && (
              <Button
                onClick={handleFormSubmit}
                className="ml-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Completing Setup...
                  </>
                ) : (
                  "Complete Setup"
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </RouteGuard>
  );
}
