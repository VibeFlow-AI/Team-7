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
        student: true,
      },
    });

    // Calculate analytics
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(
      (s) => s.status === "COMPLETED"
    ).length;
    const pendingSessions = sessions.filter(
      (s) => s.status === "PENDING" || s.status === "Booked"
    ).length;

    // Get unique students
    const uniqueStudentIds = [...new Set(sessions.map((s) => s.studentId))];
    const totalStudents = uniqueStudentIds.length;

    // Calculate age distribution
    const ageGroups = {
      "13-15": 0,
      "16-18": 0,
      "19-21": 0,
      "22+": 0,
    };

    sessions.forEach((session) => {
      const age = session.student.age;
      if (age >= 13 && age <= 15) ageGroups["13-15"]++;
      else if (age >= 16 && age <= 18) ageGroups["16-18"]++;
      else if (age >= 19 && age <= 21) ageGroups["19-21"]++;
      else if (age >= 22) ageGroups["22+"]++;
    });

    const ageDistribution = Object.entries(ageGroups)
      .filter(([_, count]) => count > 0)
      .map(([age, count]) => ({ age, count }));

    // Calculate subject breakdown (using mentor's subjects for now)
    const subjectBreakdown = mentorProfile.subjectsToTeach.map((subject) => ({
      subject,
      count: Math.floor(Math.random() * 10) + 1, // Mock data for now
    }));

    // Mock average rating (since ratings aren't in the schema yet)
    const averageRating = 4.5;

    const analytics = {
      totalSessions,
      completedSessions,
      pendingSessions,
      totalStudents,
      averageRating,
      ageDistribution,
      subjectBreakdown,
    };

    return NextResponse.json({ analytics });
  } catch (error) {
    console.error("Error fetching mentor analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
