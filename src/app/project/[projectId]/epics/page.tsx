"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getAccessToken } from "@/constants/token";
import { BaseUrl, ApiKey } from "@/constants/apiConstants";
import { FaRegLightbulb } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import Image from "next/image";
import Link from "next/link";
import { FaEllipsisVertical } from "react-icons/fa6";
import { formatDate } from "@/utils/dateFormatter";
import Loading from "@/app/loading";
import { Button } from "flowbite-react";
interface ProjectType {
  id: string;
  epic_id: string;
  title: string;
  description: string;
  created_at: string;
  assignee?: User;
  created_by?: User;
}
interface User {
  sub: string;
  name: string;
}

export default function Epics({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const [epics, setEpics] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { projectId } = use(params);
  useEffect(() => {
    const getProjects = async () => {
      try {
        const accessToken = await getAccessToken();

        const res = await axios.get(
          `${BaseUrl}/rest/v1/project_epics?project_id=eq.${projectId}`,
          {
            headers: {
              apikey: ApiKey,
              Authorization: `Bearer ${accessToken?.value}`,
              "Content-Type": "application/json",
            },
          },
        );

        setEpics(res.data);
        console.log(res);
      } catch (error: any) {
        setError(error);
        console.log(error);
        if (error.response?.status === 401) {
          router.push("/registration/login");
        }
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  if (loading) return <Loading />;
  if (error)
    return (
      <>
        <b className="text-red-700">
          error accord , check connnection and try Again
        </b>
      </>
    );
  return (
    <>
      <h2 className="mb-3 text-gray-600 text-xl font-semibold">
        <Link href={"/project"}>Project</Link>/ {projectId}/ Epics
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 w-full flex flex-col gap-4 overflow-x-auto md:overflow-visible">
        {epics.length > 0 ? (
          epics.map((epic) => (
            <div
              key={epic.id}
              className=" min-w-[700px] md:min-w-0 shadow-2xl p-3 rounded-2xl flex justify-between items-center"
            >
              <div className="flex textStyle items-center gap-1">
                <FaRegLightbulb />
                <div className="flex flex-col ">
                  <strong>{epic.title}</strong>
                  <p className="text-gray-500">
                    {epic.epic_id} Opened By <b>{epic.created_by?.name}</b>
                  </p>
                </div>
              </div>
              <div className="text-gray-600 font-semibold dark:text-gray-300">
                <p>Created At</p>
                <div className="flex justify-between items-center gap-1">
                  <SlCalender /> <p>{formatDate(epic.created_at)}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                <Image
                  src="/user.png"
                  alt="userimg"
                  className="rounded-[50%] shadow-lg"
                  width={30}
                  height={20}
                />
                <p className="textStyle font-semibold">
                  {epic?.assignee?.name}
                </p>
              </div>
              <FaEllipsisVertical className="cursor-pointer textStyle" />
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 w-full flex flex-col items-center justify-center gap-4 h-1/2">
            <h2 className="textStyle text-2xl font-semibold">
              You don't have any epics yet.
            </h2>

            <Button>
              <Link href={`/project/${projectId}/epics/new`}>
                Create New Epic
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
