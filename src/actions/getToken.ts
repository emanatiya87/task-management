"use server";

import { cookies } from "next/headers";

export async function getToken() {
  const token = cookies().get("access_token")?.value;
  const refresh = cookies().get("refresh_token")?.value;

  return { token, refresh };
}
