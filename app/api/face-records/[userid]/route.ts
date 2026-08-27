import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userid: string }> }
) {
  try {
    const { userid } = await params;
    
console.log("USER ID FROM URL:", userid);

    const faceRecord = await prisma.faceRecord.findUnique({
      where: {
        userId: userid,
      },
    });

    if (!faceRecord) {
      return NextResponse.json(
        { error: "Face record not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      faceRecord,
    });
  } catch (error) {
    console.error("Get face record error:", error);

    return NextResponse.json(
      { error: "Failed to get face record." },
      { status: 500 }
    );
  }
}