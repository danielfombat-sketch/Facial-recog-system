import { redirect } from "next/navigation";
import { getSession } from "./auth";

export async function requireAuth() {
  const session =
    await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

Then protect the dashboard:

app/dashboard/page.tsx

import { requireAuth } from "@/lib/auth/protected-route";

export default async function DashboardPage() {
  const session =
    await requireAuth();

  return (
    <main>
      <h1>
        Welcome{" "}
        {session.user.firstName}
      </h1>

      <p>
        {session.user.email}
      </p>

      <p>
        Role:{" "}
        {session.user.role}
      </p>
    </main>
  );
}