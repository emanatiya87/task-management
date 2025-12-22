"use client";
import { Dropdown, DropdownItem } from "flowbite-react";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";
import { BaseUrl, ApiKey } from "@/constants/apiConstants";
import { getAccessToken } from "@/constants/token";
import { useState } from "react";
import { Button } from "flowbite-react";
import Link from "next/link";
import Loading from "@/app/loading";
import { HiChevronDown } from "react-icons/hi";

interface membersType {
  member_id: string;
  name: string;
  email: string;
  role: string;
}
export default function Members({ projectId }: { projectId: string }) {
  const [members, setMembers] = useState<membersType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMembers() {
      const accessToken = await getAccessToken();
      axios
        .get(
          `${BaseUrl}/rest/v1/get_project_members?project_id=eq.${projectId}`,
          {
            headers: {
              apikey: ApiKey,
              Authorization: `Bearer ${accessToken?.value}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setMembers(res.data);
        })
        .catch((error) => {
          console.log("error: " + error.status);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    getMembers();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 w-full flex flex-col gap-4 ">
      <h2 className="textStyle text-2xl font-bold">Project members</h2>
      <p className="text-gray-500 mb-3">
        invite your team members to collaborate
      </p>
      {loading ? (
        <Loading />
      ) : members.length > 0 ? (
        members.map((member) => {
          return (
            <div
              className="flex align-center justify-between"
              key={member.member_id}
            >
              <div className="flex gap-2 items-center">
                <Image
                  src="/user.png"
                  alt="Profile"
                  className="rounded-[50%] shadow-lg"
                  width={30}
                  height={20}
                />
                <div className="flex flex-col items-start">
                  <h5 className="text-lg font-medium textStyle">
                    {member.metadata.name}
                  </h5>
                  <h6 className="text-sm text-gray-500 dark:text-gray-400">
                    {member.email}
                  </h6>
                </div>
              </div>
              <Dropdown
                inline
                renderTrigger={() => (
                  <button
                    className="
            flex items-center gap-2
            px-3 py-1.5
            textStyle
            border border-gray-500 dark:border-gray-600
            rounded-lg
            bg-transparent
            text-sm
            hover:bg-gray-100 dark:hover:bg-gray-700
          "
                  >
                    <span>{member.role}</span>
                    <HiChevronDown className="w-4 h-4 opacity-70" />
                  </button>
                )}
              >
                <DropdownItem key={"owner"}>Owner</DropdownItem>
                <DropdownItem key={"Admin"}>Admin</DropdownItem>
                <DropdownItem key={"member"}>Member</DropdownItem>
                <DropdownItem key={"viewer"}>Viewer</DropdownItem>
              </Dropdown>
            </div>
          );
        })
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 w-full flex flex-col items-center justify-center gap-4 h-1/2">
          <h2 className="textStyle text-2xl font-semibold">
            No members in this project yet.
          </h2>
          <Button>
            <Link href={"/project"}>Invite Members</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
