import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { memberId, descriptor } = body;

    // Check member ID
    if (!memberId) {
      return NextResponse.json(
        {
          success: false,
          error: "Member ID is required.",
        },
        { status: 400 }
      );
    }

    // Check descriptor
    if (!descriptor || !Array.isArray(descriptor)) {
      return NextResponse.json(
        {
          success: false,
          error: "Face descriptor is required.",
        },
        { status: 400 }
      );
    }

    // Face-api.js descriptors should contain 128 values
    if (descriptor.length !== 128) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid face descriptor.",
        },
        { status: 400 }
      );
    }

    // Check that the member actually exists
    const user = await prisma.user.findUnique({
      where: {
        id: memberId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Member not found.",
        },
        { status: 404 }
      );
    }

    // Register the face in the database
    const faceRecord = await prisma.faceRecord.upsert({
      where: {
        userId: memberId,
      },
      update: {
        descriptor,
      },
      create: {
        userId: memberId,
        descriptor,
      },
    });

    // Only report success AFTER the database operation succeeds
    return NextResponse.json({
      success: true,
      registered: true,
      message: "Face registered successfully.",
      faceRecordId: faceRecord.id,
      memberId: user.id,
    });
  } catch (error) {
    console.error("Face registration error:", error);

    return NextResponse.json(
      {
        success: false,
        registered: false,
        error: "Face registration failed. The face was not saved.",
      },
      { status: 500 }
    );
  }
}