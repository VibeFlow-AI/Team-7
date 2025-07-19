import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { searchParams } = new URL(request.url);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user profile to determine role
    const userProfile = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        studentProfile: true,
        mentorProfile: true,
      },
    });

    if (!userProfile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    let sessions;

    if (userProfile.role === "STUDENT" && userProfile.studentProfile) {
      // Fetch sessions for student
      sessions = await prisma.session.findMany({
        where: {
          studentId: userProfile.studentProfile.id,
          ...(status && { status }),
        },
        include: {
          mentor: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  role: true,
                },
              },
            },
          },
          student: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  role: true,
                },
              },
            },
          },
        },
        orderBy: {
          sessionDate: "desc",
        },
        take: limit,
        skip: offset,
      });
    } else if (userProfile.role === "MENTOR" && userProfile.mentorProfile) {
      // Fetch sessions for mentor
      sessions = await prisma.session.findMany({
        where: {
          mentorId: userProfile.mentorProfile.id,
          ...(status && { status }),
        },
        include: {
          mentor: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  role: true,
                },
              },
            },
          },
          student: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  role: true,
                },
              },
            },
          },
        },
        orderBy: {
          sessionDate: "desc",
        },
        take: limit,
        skip: offset,
      });
    } else {
      return NextResponse.json(
        { error: "Invalid user role or profile" },
        { status: 400 }
      );
    }

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const body = await request.json();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { mentorId, sessionDate, durationHours, bankSlipUrl } = body;

    // Get student profile
    const studentProfile = await prisma.student.findUnique({
      where: { userId: user.id },
    });

    if (!studentProfile) {
      return NextResponse.json(
        { error: "Student profile not found" },
        { status: 404 }
      );
    }

    // Create new session
    const session = await prisma.session.create({
      data: {
        studentId: studentProfile.id,
        mentorId,
        sessionDate: new Date(sessionDate),
        durationHours: durationHours || 2,
        bankSlipUrl,
        status: "Booked",
      },
      include: {
        mentor: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                role: true,
              },
            },
          },
        },
        student: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                role: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ session }, { status: 201 });
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
