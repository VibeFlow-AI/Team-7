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

export function requiresOnboarding(role: UserRole): boolean {
  return role === "GUEST";
}

export function canAccessDashboard(role: UserRole): boolean {
  return role === "STUDENT" || role === "MENTOR";
}
