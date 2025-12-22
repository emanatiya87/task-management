import { cookies } from "next/headers";
import Link from "next/link";
import { BaseUrl, ApiKey } from "@/constants/apiConstants";
import FormAddEpic from "@/components/forms/formAddEpic";
export default async function AddEpic({
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
        <h2 className="mb-3 text-gray-600 text-xl font-semibold">
          <Link href={"/project"}>Project</Link>/ {project[0].name}/{" "}
          <Link href={`/project/${resolvedParams.projectId}/epics`}>Epics</Link>
          /Create New
        </h2>
        <FormAddEpic project={project[0]} />
      </>
    );
  } catch (error) {
    console.log("Failed to fetch project", error);
    return <p>Failed to fetch project</p>;
  }
}
