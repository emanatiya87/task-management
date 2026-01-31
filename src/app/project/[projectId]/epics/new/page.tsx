"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/lib/apiClient";
import Loading from "@/app/loading";
import Link from "next/link";
import FormAddEpic from "@/components/forms/formAddEpic";
import { ProjectType } from "@/types/project";
export default function AddEpic({
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
            <Link href={`/project/${projectId}/epics`}>Epics</Link>
            /Create New
          </h2>
          <FormAddEpic project={project[0]} />
        </>
      ) : (
        <>no</>
      )}
    </>
  );
}
