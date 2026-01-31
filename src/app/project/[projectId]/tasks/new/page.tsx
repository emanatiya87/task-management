"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/lib/apiClient";
import Loading from "@/app/loading";
import Link from "next/link";
import FormAddTask from "@/components/forms/formAddTask";
import { ProjectType } from "@/types/project";
export default function AddTask({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProjects] = useState<ProjectType[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getProjects() {
      try {
        const res = await apiClient.get(`/rest/v1/projects?id=eq.${projectId}`);
        setProjects(res.data);
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
          <h2 className="mb-3 text-gray-600 text-xl font-semibold">
            <Link href={"/project"}>Project</Link>/ {project[0].name}/{" "}
            <Link href={`/project/${projectId}/tasks`}>Tasks</Link>
            /Create New
          </h2>
          <FormAddTask project={project[0]} />
        </>
      ) : (
        <>no</>
      )}
    </>
  );
}
