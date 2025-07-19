"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface MentorFormData {
  fullName: string;
  age: string;
  email: string;
  contactNumber: string;
  preferredLanguage: string;
  currentLocation: string;
  shortBio: string;
  professionalRole: string;
  subjectsToTeach: string;
  teachingExperience: string;
  preferredStudentLevels: string;
  linkedInProfile: string;
  githubOrPortfolio: string;
}

export async function createMentorProfile(formData: MentorFormData) {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, message: "Unauthorized" };
    }

    // Parse subjects and student levels from comma-separated strings to arrays
    const subjectsArray = formData.subjectsToTeach
      .split(",")
      .map((subject) => subject.trim())
      .filter((subject) => subject.length > 0);

    const studentLevelsArray = formData.preferredStudentLevels
      .split(",")
      .map((level) => level.trim())
      .filter((level) => level.length > 0);

    // Create mentor profile
    const mentorProfile = await prisma.mentor.create({
      data: {
        userId: user.id,
        fullName: formData.fullName,
        age: parseInt(formData.age),
        contactNumber: formData.contactNumber,
        preferredLanguage: [formData.preferredLanguage],
        currentLocation: formData.currentLocation || null,
        shortBio: formData.shortBio,
        professionalRole: formData.professionalRole,
        subjectsToTeach: subjectsArray,
        teachingExperience: formData.teachingExperience,
        preferredStudentLevels: studentLevelsArray,
        linkedInProfile: formData.linkedInProfile,
        githubOrPortfolio: formData.githubOrPortfolio || null,
        profilePictureUrl: null, // Will be handled separately for file upload
      },
    });

    // Update user role to MENTOR if not already set
    await prisma.user.update({
      where: { id: user.id },
      data: { role: "MENTOR" },
    });

    revalidatePath("/dashboard");
    revalidatePath("/onboarding");

    return { success: true, message: "Mentor profile created successfully" };
  } catch (error) {
    console.error("Error creating mentor profile:", error);
    return { success: false, message: "Failed to create mentor profile" };
  }
}
