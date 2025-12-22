import { cookies } from "next/headers";
import Link from "next/link";
import Members from "@/components/members";
import { BaseUrl, ApiKey } from "@/constants/apiConstants";
import { Button } from "flowbite-react";
export default async function projectMembers({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    return (
      <p>
        Not authenticated <Link href="/registration/login">Login</Link>
      </p>
    );
  }
  try {
    const res = await fetch(
      `${BaseUrl}/rest/v1/projects?id=eq.${resolvedParams.projectId}`,
      {
        headers: {
          apikey: ApiKey,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const project = await res.json();
    console.log("project", project);

    return (
      <>
        <div className="flex justify-between items-center mb-3">
          <h2 className="mb-3 text-gray-600 text-xl font-semibold">
            <Link href={"/project"}>Project</Link>/ {project[0].name}/members
          </h2>
          <Button>
            <Link href={"/project"}>Invite Members</Link>
          </Button>
        </div>
        <Members projectId={resolvedParams.projectId} />
      </>
    );
  } catch (error) {
    console.log("Failed to fetch project", error);
    return <p>Failed to fetch project</p>;
  }
}
