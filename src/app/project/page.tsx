"use client";
import { Button } from "flowbite-react";
import Link from "next/link";
import ProjectCard from "@/components/projectCard";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { formatDate } from "@/utils/dateFormatter";
import apiClient from "@/lib/apiClient";
interface ProjectType {
  id: string;
  name: string;
  description: string;
  created_at: string;
}
export default function ProjectList() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getProjects() {
      try {
        const res = await apiClient.get("/rest/v1/rpc/get_projects");
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
      <h2 className="mb-3 text-gray-600  text-xl font-semibold">Projects</h2>
      {loading ? (
        <Loading />
      ) : projects.length > 0 ? (
        <div className=" w-full flex flex-wrap  ">
          {projects.map((project) => {
            return (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.name}
                description={project.description}
                creationDate={formatDate(project.created_at)}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 w-full flex flex-col items-center justify-center gap-4 h-1/2">
          <h2 className="textStyle text-2xl font-semibold">
            You don't have any projects yet.
          </h2>

          <Button>
            <Link href={"/project/add"}>Create Project</Link>
          </Button>
        </div>
      )}
    </>
  );
}
