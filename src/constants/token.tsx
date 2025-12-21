"use server";
import { cookies } from "next/headers";

export async function getAccessToken() {
  const cookieStore = await cookies();
  const accessCookie = cookieStore.get("access_token");
  const refreshCookie = cookieStore.get("refresh_token");

  return accessCookie;
}
