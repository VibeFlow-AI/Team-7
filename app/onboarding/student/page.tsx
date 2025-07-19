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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RouteGuard } from "@/components/route-guard";
import { useAuth } from "@/components/auth-provider";
import { Loader2 } from "lucide-react";
import { createStudentProfile } from "./actions";
import { useFormPersistence } from "@/hooks/use-form-persistence";

export default function StudentOnboardingPage() {
  const { userProfile, loading } = useAuth();
  const [step, setStep] = useState(1);

  const initialFormData = {
    fullName: "",
    age: "",
    email: "",
    contactNumber: "",
    educationLevel: "",
    school: "",
    subjects: "",
    currentYear: "",
    learningStyle: "",
    accommodations: "No",
    accommodationsDetail: "",
    subjectSkillLevels: {} as Record<string, string>,
  };

  const [formData, setFormData, clearForm] = useFormPersistence(
    "student-onboarding-form",
    initialFormData
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

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

    if (!formData.educationLevel) {
      newErrors.educationLevel = "Education level is required";
    }

    if (!formData.school.trim()) {
      newErrors.school = "School is required";
    }

    if (!formData.subjects.trim()) {
      newErrors.subjects = "Subjects of interest are required";
    }

    if (!formData.currentYear || parseInt(formData.currentYear) < 1) {
      newErrors.currentYear = "Valid current year is required";
    }

    if (!formData.learningStyle) {
      newErrors.learningStyle = "Learning style is required";
    }

    // Validate skill levels for each subject
    if (formData.subjects.trim()) {
      const subjects = formData.subjects
        .split(",")
        .map((subject) => subject.trim())
        .filter((subject) => subject.length > 0);

      subjects.forEach((subject) => {
        if (!formData.subjectSkillLevels[subject]) {
          newErrors[`skillLevel_${subject}`] =
            `Please select your skill level for ${subject}`;
        }
      });
    }

    if (
      formData.accommodations === "Yes" &&
      !formData.accommodationsDetail.trim()
    ) {
      newErrors.accommodationsDetail = "Please describe your accommodations";
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
      const result = await createStudentProfile(formData);
      if (result.success) {
        clearForm(); // Clear form data from localStorage
        router.push("/dashboard/student");
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
              Student Onboarding
            </CardTitle>
            <CardDescription>
              Part {step} of 3:{" "}
              {step === 1
                ? "Who Are You?"
                : step === 2
                  ? "Academic Background"
                  : "Subject & Skill Assessment"}
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
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="educationLevel">
                    Current Education Level
                  </Label>
                  <Select
                    name="educationLevel"
                    onValueChange={(value) =>
                      handleSelectChange("educationLevel", value)
                    }
                  >
                    <SelectTrigger
                      id="educationLevel"
                      className={errors.educationLevel ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade 9">Grade 9</SelectItem>
                      <SelectItem value="Ordinary Level">
                        Ordinary Level
                      </SelectItem>
                      <SelectItem value="Advanced Level">
                        Advanced Level
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.educationLevel && (
                    <p className="text-sm text-red-500">
                      {errors.educationLevel}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">School</Label>
                  <Input
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    className={errors.school ? "border-red-500" : ""}
                  />
                  {errors.school && (
                    <p className="text-sm text-red-500">{errors.school}</p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subjects">
                    Subjects of Interest (comma-separated)
                  </Label>
                  <Input
                    id="subjects"
                    name="subjects"
                    value={formData.subjects}
                    onChange={handleChange}
                    className={errors.subjects ? "border-red-500" : ""}
                    placeholder="e.g., Mathematics, Physics, Chemistry"
                  />
                  {errors.subjects && (
                    <p className="text-sm text-red-500">{errors.subjects}</p>
                  )}
                </div>

                {/* Dynamic Skill Level Assessment */}
                {formData.subjects.trim() && (
                  <div className="space-y-4">
                    <Label>Current Skill Level (Per Subject)</Label>
                    {formData.subjects
                      .split(",")
                      .map((subject) => subject.trim())
                      .filter((subject) => subject.length > 0)
                      .map((subject) => (
                        <div key={subject} className="space-y-2">
                          <Label className="text-sm font-medium">
                            {subject}
                          </Label>
                          <RadioGroup
                            value={formData.subjectSkillLevels[subject] || ""}
                            onValueChange={(value) =>
                              setFormData({
                                ...formData,
                                subjectSkillLevels: {
                                  ...formData.subjectSkillLevels,
                                  [subject]: value,
                                },
                              })
                            }
                          >
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="Beginner"
                                  id={`${subject}-beginner`}
                                />
                                <Label htmlFor={`${subject}-beginner`}>
                                  Beginner
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="Intermediate"
                                  id={`${subject}-intermediate`}
                                />
                                <Label htmlFor={`${subject}-intermediate`}>
                                  Intermediate
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="Advanced"
                                  id={`${subject}-advanced`}
                                />
                                <Label htmlFor={`${subject}-advanced`}>
                                  Advanced
                                </Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                      ))}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="currentYear">Current Year</Label>
                  <Input
                    id="currentYear"
                    name="currentYear"
                    type="number"
                    value={formData.currentYear}
                    onChange={handleChange}
                    className={errors.currentYear ? "border-red-500" : ""}
                  />
                  {errors.currentYear && (
                    <p className="text-sm text-red-500">{errors.currentYear}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Preferred Learning Style</Label>
                  <Select
                    name="learningStyle"
                    onValueChange={(value) =>
                      handleSelectChange("learningStyle", value)
                    }
                  >
                    <SelectTrigger
                      id="learningStyle"
                      className={errors.learningStyle ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Visual">Visual</SelectItem>
                      <SelectItem value="Hands-On">Hands-On</SelectItem>
                      <SelectItem value="Theoretical">Theoretical</SelectItem>
                      <SelectItem value="Mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.learningStyle && (
                    <p className="text-sm text-red-500">
                      {errors.learningStyle}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>
                    Do you have any learning disabilities or accommodations
                    needed?
                  </Label>
                  <RadioGroup
                    name="accommodations"
                    defaultValue="No"
                    onValueChange={(value) =>
                      handleSelectChange("accommodations", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Yes" id="acc-yes" />
                      <Label htmlFor="acc-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="No" id="acc-no" />
                      <Label htmlFor="acc-no">No</Label>
                    </div>
                  </RadioGroup>
                  {formData.accommodations === "Yes" && (
                    <div className="space-y-2 pt-2">
                      <Label htmlFor="accommodationsDetail">
                        Please describe
                      </Label>
                      <Input
                        id="accommodationsDetail"
                        name="accommodationsDetail"
                        value={formData.accommodationsDetail}
                        onChange={handleChange}
                        className={
                          errors.accommodationsDetail ? "border-red-500" : ""
                        }
                      />
                      {errors.accommodationsDetail && (
                        <p className="text-sm text-red-500">
                          {errors.accommodationsDetail}
                        </p>
                      )}
                    </div>
                  )}
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
                    if (!formData.educationLevel)
                      currentStepErrors.educationLevel =
                        "Education level is required";
                    if (!formData.school.trim())
                      currentStepErrors.school = "School is required";
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
