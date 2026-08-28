import { cookies } from "next/headers";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";

const SESSION_COOKIE = "session_token";

const SESSION_DURATION =
  7 * 24 * 60 * 60 * 1000;

export async function verifyPassword(
  password: string,
  passwordHash: string
) {
  return bcrypt.compare(
    password,
    passwordHash
  );
}

export async function createSession(
  userId: string
) {
  const token =
    crypto.randomBytes(32).toString("hex");

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION
  );

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set(
    SESSION_COOKIE,
    token,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    }
  );
}

export async function getSession() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get(
      SESSION_COOKIE
    )?.value;

  if (!token) {
    return null;
  }

  const session =
    await prisma.session.findUnique({
      where: {
        token,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            domain: true,
          },
        },
      },
    });

  if (!session) {
    return null;
  }

  if (
    session.expiresAt <
    new Date()
  ) {
    await prisma.session.delete({
      where: {
        token,
      },
    });

    return null;
  }

  return session;
}

export async function destroySession() {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      SESSION_COOKIE
    )?.value;

  if (token) {
    await prisma.session.deleteMany({
      where: {
        token,
      },
    });
  }

  cookieStore.delete(
    SESSION_COOKIE
  );
}
