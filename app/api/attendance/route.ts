import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required." },
        { status: 400 }
      );
    }

    const attendance = await prisma.attendance.create({
      data: {
        userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        attendance,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Record attendance error:", error);

    return NextResponse.json(
      { error: "Failed to record attendance." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const attendance = await prisma.attendance.findMany({
      include: {
        user: true,
      },
      orderBy: {
        checkIn: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      attendance,
    });
  } catch (error) {
    console.error("Get attendance error:", error);

    return NextResponse.json(
      { error: "Failed to fetch attendance." },
      { status: 500 }
    );
  }
}
