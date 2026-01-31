"use client";
import Avatar from "../avatar";
import ToastComponent from "../toast";
import { Button } from "flowbite-react";
import { FaRegUser } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { formatDate } from "@/utils/dateFormatter";
import { useState, useEffect } from "react";
import { epicSchema, EpicInputs } from "@/schemas/epicSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/lib/apiClient";
import useProjectMembers from "@/functions/useProjectMembers";
import { useEpic } from "@/functions/useEpic";
import Loading from "@/app/loading";
import Link from "next/link";
export default function FormEditEpic({
  epicId,
  projectId,
}: {
  epicId: string;
  projectId: string;
}) {
  const { members, loading, error } = useProjectMembers(projectId);
  const tasks = null;
  const { epic, fullLoading } = useEpic(projectId, epicId, true);

  // update
  const [errorMsg, setErrorMsg] = useState("");
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EpicInputs>({
    resolver: zodResolver(epicSchema),
    defaultValues: {
      title: epic?.title,
      description: epic?.description,
      assignee_id: epic?.assignee?.sub,
      deadline: epic?.deadline,
    },
  });
  useEffect(() => {
    if (epic) {
      reset({
        title: epic.title,
        description: epic.description,
        assignee_id: epic.assignee?.sub ?? "",
        deadline: epic.deadline,
      });
    }
  }, [epic, reset]);
  const onSubmit: SubmitHandler<EpicInputs> = async (data) => {
    setErrorMsg("");
    // Send a Patch request
    try {
      await apiClient.patch(`/rest/v1/epics?id=eq.${epicId}`, {
        title: data.title,
        description: data.description,
        assignee_id: data.assignee_id || null,
        deadline: data.deadline,
      });
      setAddedSuccessfully(true);
      // Auto hide after 3 seconds
      setTimeout(() => {
        setAddedSuccessfully(false);
      }, 3000);
    } catch (error) {
      setErrorMsg("Failed to edit Epic: " + error);
    }
  };
  return (
    <>
      {fullLoading ? (
        <Loading />
      ) : (
        <form onBlur={handleSubmit(onSubmit)}>
          <div>
            <input
              disabled={isSubmitting}
              {...register("title")}
              className="textStyle text-xl font-bold capitalize mb-3 w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className=" inline-grid grid-cols-[auto_auto] gap-x-6 gap-y-2  ">
            <p className="flex items-center text-gray-700 gap-2">
              <FaRegUser className="text-gray-700" />
              <span>Created By </span>
            </p>
            {epic?.created_by?.name ? (
              <p className="flex items-center">
                <Avatar name={epic.created_by.name} />
                <span>{epic.created_by.name}</span>
              </p>
            ) : (
              <></>
            )}

            <p className="flex items-center text-gray-700 gap-2">
              <FaRegUserCircle className="text-gray-700" />
              <span>Assignee </span>
            </p>
            {/* assign to select */}
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1">
                <Avatar name={epic?.assignee?.name ?? "?"} />
              </div>
              <select
                {...register("assignee_id")}
                disabled={isSubmitting}
                className="border-none w-full pe-3 py-2.5 text-heading text-sm focus:ring-brand focus:border-brand bg-transparent"
              >
                <option value="">Unassigned</option>
                {loading ? (
                  <option disabled>Loading...</option>
                ) : (
                  members.map((member) => (
                    <option key={member.user_id} value={member.user_id}>
                      {member.metadata?.name ?? member.name}
                    </option>
                  ))
                )}
              </select>
              {errors.assignee_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.assignee_id.message}
                </p>
              )}
            </div>
            {/* created at */}
            <p className="flex items-center text-gray-700 gap-2">
              <SlCalender className="text-gray-700" />
              <span>Created At </span>
            </p>
            <p>{epic ? formatDate(epic.created_at) : ""}</p>
            {/* Deadline  */}
            <p className="flex items-center text-gray-700 gap-2">
              <SlCalender className="text-gray-700" />
              <span>Deadline </span>
            </p>
            <input
              type="date"
              {...register("deadline")}
              disabled={isSubmitting}
            />
            {errors.deadline && (
              <p className="text-red-500 text-sm mt-1">
                {errors.deadline.message}
              </p>
            )}
          </div>
          <hr className="text-gray-400 my-3.5" />
          {/* description */}
          <h3 className=" mb-5 font-semibold textStyle">Description</h3>
          {epic?.description ? (
            <div>
              <textarea
                disabled={isSubmitting}
                {...register("description")}
                rows={3}
                className="textStyle w-full resize-none overflow-hidden"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          ) : (
            <textarea
              disabled={isSubmitting}
              {...register("description")}
              rows={3}
              placeholder="No description provided"
              className={`textStyle w-full resize-none overflow-hidden ${
                !epic?.description ? "font-semibold text-gray-400" : ""
              }`}
            />
          )}
          <hr className="text-gray-400 my-3.5" />
          {/* tasks */}
          <h3 className=" mb-5 font-semibold textStyle">Tasks</h3>
          <div>
            {tasks ? (
              <p className="textStyle">Tasks</p>
            ) : (
              <div className=" py-10 flex flex-col gap-2 items-center justify-center">
                <p className=" textStyle font-bold ">
                  No tasks have been added to this epic yest
                </p>
                <Button>
                  <Link href={`/project/${projectId}/tasks/new`}>
                    Create New Tasks
                  </Link>
                </Button>
              </div>
            )}
          </div>
          <p className="text-red-500 text-sm mt-1 text-center">{errorMsg}</p>

          <ToastComponent
            message="Epic Edited successfully"
            appear={addedSuccessfully}
          />
        </form>
      )}
    </>
  );
}
