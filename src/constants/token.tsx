export async function getAccessToken(): Promise<string> {
  const res = await fetch("/api/token");
  if (!res.ok) {
    throw new Error("Failed to fetch token");
  }
  const data = await res.json();
  return data.access;
}
