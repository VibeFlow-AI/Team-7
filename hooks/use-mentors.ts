import { useState, useEffect } from "react";

export interface Mentor {
  id: string;
  userId: string;
  fullName: string;
  age: number;
  contactNumber: string | null;
  preferredLanguage: string[];
  currentLocation: string | null;
  shortBio: string;
  professionalRole: string;
  subjectsToTeach: string[];
  teachingExperience: string;
  preferredStudentLevels: string[];
  linkedInProfile: string;
  githubOrPortfolio: string | null;
  profilePictureUrl: string | null;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

interface UseMentorsOptions {
  subject?: string;
  location?: string;
  level?: string;
  search?: string;
}

export function useMentors(options: UseMentorsOptions = {}) {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (options.subject) params.append("subject", options.subject);
        if (options.location) params.append("location", options.location);
        if (options.level) params.append("level", options.level);
        if (options.search) params.append("search", options.search);

        const response = await fetch(`/api/mentors?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch mentors");
        }

        const data = await response.json();
        setMentors(data.mentors);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [options.subject, options.location, options.level, options.search]);

  return { mentors, loading, error };
}
