"use client";
import { Dropdown, DropdownItem } from "flowbite-react";
import Image from "next/image";
import { Button } from "flowbite-react";
import Link from "next/link";
import Loading from "@/app/loading";
import { HiChevronDown } from "react-icons/hi";
import useProjectMembers from "@/functions/useProjectMembers";

export default function Members({ projectId }: { projectId: string }) {
  const { members, loading, error } = useProjectMembers(projectId);
  // Handle error state
  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 w-full flex flex-col gap-4">
        <h2 className="textStyle text-2xl font-bold">Project members</h2>
        <div className="text-red-500 p-4 border border-red-200 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 w-full flex flex-col gap-4">
      <h2 className="textStyle text-2xl font-bold">Project members</h2>
      <p className="text-gray-500 mb-3">
        Invite your team members to collaborate
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
                    {member.metadata?.name}
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
                      transition-colors duration-200
                    "
                  >
                    <span>{member.role}</span>
                    <HiChevronDown className="w-4 h-4 opacity-70" />
                  </button>
                )}
              >
                <DropdownItem key={"owner"}>Owner</DropdownItem>
                <DropdownItem key={"admin"}>Admin</DropdownItem>
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
            <Link href={`/project/${projectId}/invite`}>Invite Members</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
