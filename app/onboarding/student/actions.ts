"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface StudentFormData {
  fullName: string;
  age: string;
  email: string;
  contactNumber: string;
  educationLevel: string;
  school: string;
  subjects: string;
  currentYear: string;
  learningStyle: string;
  accommodations: string;
  accommodationsDetail: string;
  subjectSkillLevels: Record<string, string>;
}

export async function createStudentProfile(formData: StudentFormData) {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, message: "Unauthorized" };
    }

    // Parse subjects from comma-separated string to array
    const subjectsArray = formData.subjects
      .split(",")
      .map((subject) => subject.trim())
      .filter((subject) => subject.length > 0);

    // Create student profile
    const studentProfile = await prisma.student.create({
      data: {
        userId: user.id,
        fullName: formData.fullName,
        age: parseInt(formData.age),
        contactNumber: formData.contactNumber,
        currentEducationLevel: formData.educationLevel,
        school: formData.school || null,
        subjectsOfInterest: subjectsArray,
        preferredLearningStyle: formData.learningStyle,
        learningDisabilities:
          formData.accommodations === "Yes"
            ? formData.accommodationsDetail
            : null,
      },
    });

    // Update user role to STUDENT if not already set
    await prisma.user.update({
      where: { id: user.id },
      data: { role: "STUDENT" },
    });

    revalidatePath("/dashboard");
    revalidatePath("/onboarding");

    return { success: true, message: "Student profile created successfully" };
  } catch (error) {
    console.error("Error creating student profile:", error);
    return { success: false, message: "Failed to create student profile" };
  }
}
