export type UserRole = "STUDENT" | "MENTOR" | "GUEST";

export interface UserProfile {
  id: string;
  role: UserRole;
  email: string;
  studentProfile?: {
    id: string;
    fullName: string;
    age: number;
    currentEducationLevel: string;
    school?: string;
    subjectsOfInterest: string[];
  } | null;
  mentorProfile?: {
    id: string;
    fullName: string;
    age: number;
    professionalRole: string;
    subjectsToTeach: string[];
    teachingExperience: string;
  } | null;
}

export function isGuestUser(role: UserRole): boolean {
  return role === "GUEST";
}

export function requiresOnboarding(userProfile: UserProfile): boolean {
  // Guest users always need onboarding
  if (userProfile.role === "GUEST") {
    return true;
  }

  // STUDENT users need onboarding if they don't have a student profile
  if (userProfile.role === "STUDENT" && !userProfile.studentProfile) {
    return true;
  }

  // MENTOR users need onboarding if they don't have a mentor profile
  if (userProfile.role === "MENTOR" && !userProfile.mentorProfile) {
    return true;
  }

  return false;
}

export function canAccessDashboard(userProfile: UserProfile): boolean {
  return (
    (userProfile.role === "STUDENT" && !!userProfile.studentProfile) ||
    (userProfile.role === "MENTOR" && !!userProfile.mentorProfile)
  );
}
