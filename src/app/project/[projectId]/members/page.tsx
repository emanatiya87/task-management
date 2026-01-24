"use client";
import Link from "next/link";
import Members from "@/components/members";
import { Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/lib/apiClient";
import Loading from "@/app/loading";
interface ProjectType {
  id: string;
  name: string;
}
export default function projectMembers({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = useParams<{ projectId: string }>();

  const [project, setProjects] = useState<ProjectType[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProjects() {
      try {
        const res = await apiClient.get(`/rest/v1/projects?id=eq.${projectId}`);
        setProjects(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getProjects();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : project ? (
        <>
          <div className="flex justify-between items-center mb-3">
            <h2 className="mb-3 text-gray-600 text-xl font-semibold">
              <Link href={"/project"}>Project</Link>/ {project[0]?.name}/members
            </h2>
            <Button>
              <Link href={"/project"}>Invite Members</Link>
            </Button>
          </div>
          <Members projectId={projectId} />
        </>
      ) : (
        <>no</>
      )}
    </>
  );
}
