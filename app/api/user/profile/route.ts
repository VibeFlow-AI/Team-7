import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUserProfile, createUserProfile } from "@/lib/user";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Try to get existing user profile
    let userProfile = null;
    let retryCount = 0;
    const maxRetries = 1;

    while (retryCount < maxRetries) {
      try {
        userProfile = await getUserProfile(user.id);
        break;
      } catch (error) {
        retryCount++;

        if (retryCount >= maxRetries) {
          // Return fallback profile
          userProfile = {
            id: user.id,
            role: "GUEST" as const,
            email: user.email!,
            studentProfile: null,
            mentorProfile: null,
          };
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 200 * retryCount));
      }
    }

    // Create profile if it doesn't exist
    if (!userProfile || userProfile.role === "GUEST") {
      retryCount = 0;

      while (retryCount < maxRetries) {
        try {
          const newProfile = await createUserProfile(
            user.id,
            user.email!,
            "GUEST"
          );
          if (newProfile) {
            userProfile = newProfile;
          }
          break;
        } catch (error) {
          retryCount++;

          if (retryCount >= maxRetries) {
            break;
          }

          await new Promise((resolve) => setTimeout(resolve, 200 * retryCount));
        }
      }
    }

    if (!userProfile) {
      return NextResponse.json(
        { error: "Failed to create user profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({ user: userProfile });
  } catch (error) {
    console.error("Error in GET /api/user/profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
