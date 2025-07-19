import { useState, useEffect } from "react";

export interface Session {
  id: string;
  studentId: string;
  mentorId: string;
  sessionDate: string;
  durationHours: number;
  status: string;
  bankSlipUrl: string;
  createdAt: string;
  mentor: {
    id: string;
    userId: string;
    fullName: string;
    professionalRole: string;
    profilePictureUrl: string | null;
    user: {
      id: string;
      email: string;
      role: string;
    };
  };
  student: {
    id: string;
    userId: string;
    fullName: string;
    user: {
      id: string;
      email: string;
      role: string;
    };
  };
}

interface UseSessionsOptions {
  status?: string;
  limit?: number;
  offset?: number;
}

export function useSessions(options: UseSessionsOptions = {}) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (options.status) params.append("status", options.status);
        if (options.limit) params.append("limit", options.limit.toString());
        if (options.offset) params.append("offset", options.offset.toString());

        const response = await fetch(`/api/sessions?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }

        const data = await response.json();
        setSessions(data.sessions);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [options.status, options.limit, options.offset]);

  const createSession = async (sessionData: {
    mentorId: string;
    sessionDate: string;
    durationHours?: number;
    bankSlipUrl: string;
  }) => {
    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      const data = await response.json();

      // Add the new session to the list
      setSessions((prev) => [data.session, ...prev]);

      return data.session;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create session");
      throw err;
    }
  };

  const updateSessionStatus = async (sessionId: string, status: string) => {
    try {
      const response = await fetch(`/api/sessions/${sessionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update session");
      }

      const data = await response.json();

      // Update the session in the list
      setSessions((prev) =>
        prev.map((session) =>
          session.id === sessionId ? data.session : session
        )
      );

      return data.session;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update session");
      throw err;
    }
  };

  return {
    sessions,
    loading,
    error,
    createSession,
    updateSessionStatus,
  };
}
