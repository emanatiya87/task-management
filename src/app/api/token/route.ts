import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get("access_token")?.value || null;
  const refresh = cookieStore.get("refresh_token")?.value || null;
  console.log("Cookies received:", cookies().getAll());

  return Response.json({ token, refresh });
}
