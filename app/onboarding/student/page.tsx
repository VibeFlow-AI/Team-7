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

// We will create this server action next
// import { createStudentProfile } from "./actions";

export default function StudentOnboardingPage() {
  const { userProfile, loading } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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
    // const result = await createStudentProfile(formData);
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
    <RouteGuard requireAuth={true} requireRole="STUDENT">
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
                    <SelectTrigger id="educationLevel">
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">School</Label>
                  <Input
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                  />
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
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentYear">Current Year</Label>
                  <Input
                    id="currentYear"
                    name="currentYear"
                    type="number"
                    value={formData.currentYear}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Preferred Learning Style</Label>
                  <Select
                    name="learningStyle"
                    onValueChange={(value) =>
                      handleSelectChange("learningStyle", value)
                    }
                  >
                    <SelectTrigger id="learningStyle">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Visual">Visual</SelectItem>
                      <SelectItem value="Hands-On">Hands-On</SelectItem>
                      <SelectItem value="Theoretical">Theoretical</SelectItem>
                      <SelectItem value="Mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
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
                      />
                    </div>
                  )}
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
