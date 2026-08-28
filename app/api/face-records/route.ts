import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { userId, descriptor } = body;

    if (!userId || !descriptor) {
      return NextResponse.json(
        { error: "User ID and face descriptor are required." },
        { status: 400 }
      );
    }

    if (!Array.isArray(descriptor) || descriptor.length === 0) {
      return NextResponse.json(
        { error: "Face descriptor must be a non-empty array." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    const existingFaceRecord = await prisma.faceRecord.findUnique({
      where: { userId },
    });

    if (existingFaceRecord) {
      return NextResponse.json(
        { error: "This user already has a registered face." },
        { status: 409 }
      );
    }

    const faceRecord = await prisma.faceRecord.create({
      data: {
        userId,
        descriptor,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Face registered successfully.",
        faceRecord,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Face registration error:", error);

    return NextResponse.json(
      { error: "Failed to register face." },
      { status: 500 }
    );
  }
}
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    const faceRecord = await prisma.faceRecord.findUnique({
      where: { userId },
    });

    if (!faceRecord) {
      return NextResponse.json(
        { error: "Face record not found." },
        { status: 404 }
      );
    }

    await prisma.faceRecord.delete({
      where: { userId },
    });

    return NextResponse.json({
      success: true,
      message: "Face record deleted successfully.",
    });
  } catch (error) {
    console.error("Face record deletion error:", error);

    return NextResponse.json(
      { error: "Failed to delete face record." },
      { status: 500 }
    );
  }
}