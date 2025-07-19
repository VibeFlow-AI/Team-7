import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get("subject");
    const location = searchParams.get("location");
    const level = searchParams.get("level");
    const search = searchParams.get("search");

    // Build where clause for filtering
    const where: any = {};

    if (subject) {
      where.subjectsToTeach = {
        has: subject,
      };
    }

    if (location) {
      where.currentLocation = {
        contains: location,
        mode: "insensitive",
      };
    }

    if (level) {
      where.preferredStudentLevels = {
        has: level,
      };
    }

    if (search) {
      where.OR = [
        {
          fullName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          shortBio: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          professionalRole: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          subjectsToTeach: {
            hasAny: [search],
          },
        },
      ];
    }

    const mentors = await prisma.mentor.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        fullName: "asc",
      },
    });

    return NextResponse.json({ mentors });
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentors" },
      { status: 500 }
    );
  }
}
