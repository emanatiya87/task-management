let accessToken: string | null = null;
export async function getAccessToken(): Promise<string> {
  const res = await fetch("/api/token");
  if (!res.ok) {
    throw new Error("Failed to fetch token");
  }
  const data = await res.json();
  accessToken = data.access;
  return data.access;
}
export { accessToken };
