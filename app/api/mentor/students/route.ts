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

    // Get all sessions for this mentor with student data
    const sessions = await prisma.session.findMany({
      where: { mentorId: mentorProfile.id },
      include: {
        student: true,
      },
      orderBy: { sessionDate: "desc" },
    });

    // Group sessions by student and calculate statistics
    const studentMap = new Map();

    sessions.forEach((session) => {
      const studentId = session.studentId;

      if (!studentMap.has(studentId)) {
        studentMap.set(studentId, {
          id: session.student.id,
          fullName: session.student.fullName,
          age: session.student.age,
          currentEducationLevel: session.student.currentEducationLevel,
          school: session.student.school,
          subjectsOfInterest: session.student.subjectsOfInterest,
          sessionCount: 0,
          lastSessionDate: null,
        });
      }

      const student = studentMap.get(studentId);
      student.sessionCount++;

      // Update last session date if this session is more recent
      if (
        !student.lastSessionDate ||
        session.sessionDate > new Date(student.lastSessionDate)
      ) {
        student.lastSessionDate = session.sessionDate.toISOString();
      }
    });

    const students = Array.from(studentMap.values());

    return NextResponse.json({ students });
  } catch (error) {
    console.error("Error fetching mentor students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}
