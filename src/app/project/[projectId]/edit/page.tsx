"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/lib/apiClient";
import Loading from "@/app/loading";
import Link from "next/link";
import FormEditProject from "@/components/forms/formEditProject";
interface ProjectType {
  id: string;
  name: string;
  description: string;
  created_at: string;
}
export default function Edit({ params }: { params: { projectId: string } }) {
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
          {" "}
          <h2 className="mb-3 text-gray-600 text-xl font-semibold">
            <Link href={"/project"}>Project</Link>/ {project[0].name}/ Edit
            Project
          </h2>
          <FormEditProject project={project[0]} />
        </>
      ) : (
        <p className="text-rose-700">Error Try again</p>
      )}
    </>
  );
}
