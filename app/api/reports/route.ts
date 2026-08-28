import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const totalUsers = await prisma.user.count();

    const totalAttendance = await prisma.attendance.count();

    const checkedIn = await prisma.attendance.count({
      where: {
        checkOut: null,
      },
    });

    const checkedOut = await prisma.attendance.count({
      where: {
        checkOut: {
          not: null,
        },
      },
    });

    return NextResponse.json({
      success: true,
      totalUsers,
      totalAttendance,
      checkedIn,
      checkedOut,
    });
  } catch (error) {
    console.error("Generate report error:", error);

    return NextResponse.json(
      { error: "Failed to generate report." },
      { status: 500 }
    );
  }
}