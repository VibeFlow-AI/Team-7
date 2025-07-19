"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import {
  UserProfile,
  UserRole,
  isGuestUser,
  requiresOnboarding,
  canAccessDashboard,
} from "@/lib/user-utils";

export function useSupabaseAuth() {
  const supabase = getSupabaseClient();
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Fetch user profile from API
  const fetchUserProfile = async (userId: string) => {
    if (!userId) return;

    // Check if we already have a profile for this user
    if (userProfile && userProfile.id === userId) {
      return;
    }

    try {
      setProfileLoading(true);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch("/api/user/profile", {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.user);
      } else {
        // Create fallback profile on error
        setUserProfile({
          id: userId,
          role: "GUEST" as UserRole,
          email: user?.email || "",
          studentProfile: null,
          mentorProfile: null,
        });
      }
    } catch (error) {
      // Create fallback profile on timeout or other errors
      setUserProfile({
        id: userId,
        role: "GUEST" as UserRole,
        email: user?.email || "",
        studentProfile: null,
        mentorProfile: null,
      });
    } finally {
      setProfileLoading(false);
    }
  };

  // Update user role
  const updateUserRole = async (role: UserRole) => {
    try {
      const response = await fetch("/api/user/role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.user);

        // Refetch profile to ensure we have the latest data
        if (user?.id) {
          await fetchUserProfile(user.id);
        }

        return data.user;
      } else {
        throw new Error("Failed to update user role");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getInitialAuth = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          setUser(null);
          setSession(null);
          setUserProfile(null);
        } else if (user) {
          setUser(user);
          const {
            data: { session },
          } = await supabase.auth.getSession();
          setSession(session);
          await fetchUserProfile(user.id);
        } else {
          setUser(null);
          setSession(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Error in initial auth:", error);
        setUser(null);
        setSession(null);
        setUserProfile(null);
      } finally {
        setLoading(false);
        setHasInitialized(true);
      }
    };

    getInitialAuth();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setSession(session);
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        } else {
          setSession(null);
          setUser(null);
          setUserProfile(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Helper functions for role-based access
  const isGuest = userProfile ? isGuestUser(userProfile.role) : false;
  const needsOnboarding = userProfile ? requiresOnboarding(userProfile) : false;
  const canAccess = userProfile ? canAccessDashboard(userProfile) : false;

  // Sign out function
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
        throw error;
      }
      // Clear local state
      setUser(null);
      setSession(null);
      setUserProfile(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return {
    session,
    user,
    userProfile,
    loading: (!hasInitialized && loading) || profileLoading,
    isGuest,
    needsOnboarding,
    canAccess,
    updateUserRole,
    refetchProfile: () => (user?.id ? fetchUserProfile(user.id) : null),
    signOut,
  };
}
