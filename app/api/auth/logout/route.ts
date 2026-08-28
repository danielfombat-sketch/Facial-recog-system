import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth/auth";

export async function POST() {
  try {
    await destroySession();

    return NextResponse.json({
      message:
        "Logout successful",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Logout failed",
      },
      { status: 500 }
    );
  }
}