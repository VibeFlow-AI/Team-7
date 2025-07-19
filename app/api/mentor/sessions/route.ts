import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

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

    // Get mentor profile
    const mentorProfile = await prisma.mentor.findUnique({
      where: { userId: user.id },
    });

    if (!mentorProfile) {
      return NextResponse.json(
        { error: "Mentor profile not found" },
        { status: 404 }
      );
    }

    // Get all sessions for this mentor
    const sessions = await prisma.session.findMany({
      where: { mentorId: mentorProfile.id },
      include: {
        student: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { sessionDate: "asc" },
    });

    // Transform sessions to match frontend expectations
    const transformedSessions = sessions.map((session) => ({
      id: session.id,
      date: session.sessionDate.toISOString().split("T")[0],
      time: session.sessionDate.toTimeString().split(" ")[0].substring(0, 5), // Extract HH:MM
      status: session.status,
      subject: "General", // Default subject since it's not in the schema
      duration: session.durationHours * 60, // Convert hours to minutes
      student: {
        id: session.student.id,
        fullName: session.student.fullName,
        age: session.student.age,
        profilePictureUrl: null, // Not in current schema
      },
    }));

    return NextResponse.json({ sessions: transformedSessions });
  } catch (error) {
    console.error("Error fetching mentor sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}
