import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createSupabaseServerClient();
    const body = await request.json();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = body;

    // Get user profile to check permissions
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

    // Get the session to check permissions
    const session = await prisma.session.findUnique({
      where: { id },
      include: {
        student: true,
        mentor: true,
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Check if user has permission to update this session
    const canUpdate =
      (userProfile.role === "STUDENT" && session.student.userId === user.id) ||
      (userProfile.role === "MENTOR" && session.mentor.userId === user.id);

    if (!canUpdate) {
      return NextResponse.json(
        { error: "Unauthorized to update this session" },
        { status: 403 }
      );
    }

    // Update session status
    const updatedSession = await prisma.session.update({
      where: { id },
      data: { status },
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

    return NextResponse.json({ session: updatedSession });
  } catch (error) {
    console.error("Error updating session:", error);
    return NextResponse.json(
      { error: "Failed to update session" },
      { status: 500 }
    );
  }
}
