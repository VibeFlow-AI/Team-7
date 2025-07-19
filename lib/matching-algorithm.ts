import { MockMentor } from "./mock-data";
import { UserProfile } from "./user-utils";

export interface MatchingScore {
  mentor: MockMentor;
  score: number;
  reasons: string[];
}

export interface FilterOptions {
  sessionDuration?: string;
  subjects?: string[];
  languages?: string[];
  studentLevels?: string[];
  location?: string;
}

// Calculate matching score between student and mentor
export function calculateMatchingScore(
  studentProfile: UserProfile,
  mentor: MockMentor
): MatchingScore {
  let score = 0;
  const reasons: string[] = [];

  // Get student preferences from their profile
  const studentSubjects =
    studentProfile.studentProfile?.subjectsOfInterest || [];
  const studentEducationLevel =
    studentProfile.studentProfile?.currentEducationLevel || "";

  // 1. Subject Matching (40% weight)
  const subjectMatches = studentSubjects.filter((subject) =>
    mentor.subjects.some(
      (mentorSubject) =>
        mentorSubject.toLowerCase().includes(subject.toLowerCase()) ||
        subject.toLowerCase().includes(mentorSubject.toLowerCase())
    )
  );

  if (subjectMatches.length > 0) {
    const subjectScore = (subjectMatches.length / studentSubjects.length) * 40;
    score += subjectScore;
    reasons.push(
      `Matches ${subjectMatches.length} of your subjects: ${subjectMatches.join(", ")}`
    );
  }

  // 2. Education Level Matching (25% weight)
  if (mentor.preferredStudentLevels.includes(studentEducationLevel)) {
    score += 25;
    reasons.push(`Teaches your education level: ${studentEducationLevel}`);
  } else if (
    mentor.preferredStudentLevels.some(
      (level) =>
        level.includes("Grade") && studentEducationLevel.includes("Grade")
    )
  ) {
    score += 15;
    reasons.push(`Teaches similar grade levels`);
  }

  // 3. Language Preference (15% weight)
  // For now, we'll assume English is preferred if not specified
  const studentLanguage = "English"; // This could come from student profile later
  if (mentor.preferredLanguage.includes(studentLanguage)) {
    score += 15;
    reasons.push(`Speaks your preferred language: ${studentLanguage}`);
  }

  // 4. Experience and Rating (10% weight)
  const experienceScore = mentor.rating ? (mentor.rating / 5) * 10 : 5;
  score += experienceScore;
  if (mentor.rating) {
    reasons.push(`High rating: ${mentor.rating}/5`);
  }

  // 5. Session Count (5% weight)
  const sessionScore = mentor.totalSessions
    ? Math.min(mentor.totalSessions / 50, 5)
    : 2.5;
  score += sessionScore;
  if (mentor.totalSessions && mentor.totalSessions > 100) {
    reasons.push(`Experienced mentor with ${mentor.totalSessions} sessions`);
  }

  // 6. Teaching Experience (5% weight)
  if (mentor.teachingExperience === "5+ years") {
    score += 5;
    reasons.push("Highly experienced teacher (5+ years)");
  } else if (mentor.teachingExperience === "3-5 years") {
    score += 3;
    reasons.push("Experienced teacher (3-5 years)");
  }

  return {
    mentor,
    score: Math.round(score * 100) / 100,
    reasons,
  };
}

// Get personalized mentor recommendations
export function getPersonalizedRecommendations(
  studentProfile: UserProfile,
  mentors: MockMentor[],
  limit: number = 6
): MockMentor[] {
  const scoredMentors = mentors.map((mentor) =>
    calculateMatchingScore(studentProfile, mentor)
  );

  // Sort by score (highest first)
  scoredMentors.sort((a, b) => b.score - a.score);

  // Return top mentors
  return scoredMentors.slice(0, limit).map((item) => item.mentor);
}

// Filter mentors based on criteria
export function filterMentors(
  mentors: MockMentor[],
  filters: FilterOptions
): MockMentor[] {
  return mentors.filter((mentor) => {
    // Session duration filter
    if (
      filters.sessionDuration &&
      mentor.sessionDuration !== filters.sessionDuration
    ) {
      return false;
    }

    // Subjects filter
    if (filters.subjects && filters.subjects.length > 0) {
      const hasMatchingSubject = filters.subjects.some((filterSubject) =>
        mentor.subjects.some(
          (mentorSubject) =>
            mentorSubject.toLowerCase().includes(filterSubject.toLowerCase()) ||
            filterSubject.toLowerCase().includes(mentorSubject.toLowerCase())
        )
      );
      if (!hasMatchingSubject) return false;
    }

    // Languages filter
    if (filters.languages && filters.languages.length > 0) {
      const hasMatchingLanguage = filters.languages.some((filterLanguage) =>
        mentor.preferredLanguage.includes(filterLanguage)
      );
      if (!hasMatchingLanguage) return false;
    }

    // Student levels filter
    if (filters.studentLevels && filters.studentLevels.length > 0) {
      const hasMatchingLevel = filters.studentLevels.some((filterLevel) =>
        mentor.preferredStudentLevels.includes(filterLevel)
      );
      if (!hasMatchingLevel) return false;
    }

    // Location filter (partial match)
    if (
      filters.location &&
      !mentor.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
}

// Get mentor recommendations with filtering
export function getFilteredRecommendations(
  studentProfile: UserProfile,
  mentors: MockMentor[],
  filters: FilterOptions,
  limit: number = 6
): MockMentor[] {
  // First filter the mentors
  const filteredMentors = filterMentors(mentors, filters);

  // Then get personalized recommendations from filtered list
  return getPersonalizedRecommendations(studentProfile, filteredMentors, limit);
}

// Get matching reasons for a specific mentor
export function getMatchingReasons(
  studentProfile: UserProfile,
  mentor: MockMentor
): string[] {
  const score = calculateMatchingScore(studentProfile, mentor);
  return score.reasons;
}
