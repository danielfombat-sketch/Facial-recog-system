import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  verifyPassword,
  createSession,
} from "@/lib/auth/auth";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const email = body.email
      ?.toLowerCase()
      .trim();

    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        {
          error:
            "Email and password are required",
        },
        { status: 400 }
      );
    }

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          error:
            "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const valid =
      await verifyPassword(
        password,
        user.passwordHash
      );

    if (!valid) {
      return NextResponse.json(
        {
          error:
            "Invalid email or password",
        },
        { status: 401 }
      );
    }

    await createSession(
      user.id
    );

    return NextResponse.json({
      message:
        "Login successful",
      user: {
        id: user.id,
        firstName:
          user.firstName,
        lastName:
          user.lastName,
        email: user.email,
        role: user.role,
        domain: user.domain,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Internal server error",
      },
      { status: 500 }
    );
  }
}

