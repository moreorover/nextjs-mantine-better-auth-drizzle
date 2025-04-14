"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export async function getBackupCodes() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  if (!session.user.twoFactorEnabled) {
    return null;
  }

  return await auth.api.viewBackupCodes({
    body: { userId: session.user.id },
  });
}
