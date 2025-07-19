import { getSupabaseClient } from "@/lib/supabase/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { UserProfile, UserRole } from "@/lib/user-utils";

export async function getUserProfile(
  userId: string
): Promise<UserProfile | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true,
        mentorProfile: true,
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      role: user.role as UserRole,
      email: user.email,
      studentProfile: user.studentProfile,
      mentorProfile: user.mentorProfile,
    };
  } catch (error) {
    return null;
  }
}

export async function createUserProfile(
  userId: string,
  email: string,
  role: UserRole = "GUEST"
): Promise<UserProfile | null> {
  try {
    const user = await prisma.user.create({
      data: {
        id: userId,
        email,
        role,
      },
      include: {
        studentProfile: true,
        mentorProfile: true,
      },
    });

    return {
      id: user.id,
      role: user.role as UserRole,
      email: user.email,
      studentProfile: user.studentProfile,
      mentorProfile: user.mentorProfile,
    };
  } catch (error) {
    return null;
  }
}

export async function updateUserRole(
  userId: string,
  role: UserRole
): Promise<UserProfile | null> {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
      include: {
        studentProfile: true,
        mentorProfile: true,
      },
    });

    return {
      id: user.id,
      role: user.role as UserRole,
      email: user.email,
      studentProfile: user.studentProfile,
      mentorProfile: user.mentorProfile,
    };
  } catch (error) {
    return null;
  }
}
