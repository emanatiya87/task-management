"use client";
import { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { Button } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ToastComponent from "../toast";
import Link from "next/link";
import useProjectMembers from "@/functions/useProjectMembers";
import apiClient from "@/lib/apiClient";
import { taskSchema, TaskInputs } from "@/schemas/taskSchema";
import { useRouter } from "next/navigation";
import { ProjectType } from "@/types/project";
import { useEpics } from "@/functions/useEpics";
export default function FormAddTask({ project }: { project: ProjectType }) {
  const router = useRouter();
  const { members, loading, error } = useProjectMembers(project.id);
  const [errorMsg, setErrorMsg] = useState("");
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);
  const { epics, loadingEpics } = useEpics(project.id, false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskInputs>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: "TO_DO",
    },
  });
  const onSubmit: SubmitHandler<TaskInputs> = async (data) => {
    setErrorMsg("");
    // Send a POST request
    try {
      await apiClient.post("/rest/v1/tasks", {
        title: data.title,
        description: data.description,
        assignee_id: data.assignee_id || null,
        project_id: project.id,
        due_date: data.due_date || null,
        status: data.status,
      });

      setAddedSuccessfully(true);
      setTimeout(() => {
        setAddedSuccessfully(false);
        router.push(`/project/${project.id}/tasks`);
      }, 3000);
    } catch (error) {
      setErrorMsg("Failed to add Task: ");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 w-full flex flex-col gap-4 ">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title">Title</Label>
            </div>
            <TextInput
              id="title"
              type="text"
              sizing="sm"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description">Description</Label>
            </div>
            <TextInput
              id="description"
              type="text"
              sizing="lg"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex justify-between lg:items-center items-start  flex-col gap-2 lg:flex-row flex-wrap">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="assignee_id">Assign To</Label>
              </div>

              <select
                id="assignee_id"
                className="block md:w-sm w-fit px-3 py-2.5 bg-neutral-secondary-medium border border-gray-300 rounded-xl text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                defaultValue=""
                {...register("assignee_id")}
              >
                <option hidden value="">
                  Choose a member
                </option>
                {loading ? (
                  <option>loading...</option>
                ) : (
                  members.map((member, index) => {
                    return (
                      <option key={index} value={member.user_id}>
                        {member.metadata?.name}
                      </option>
                    );
                  })
                )}
              </select>
              {errors.assignee_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.assignee_id.message}
                </p>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="status">Status</Label>
              </div>

              <select
                id="status"
                className="block md:w-sm w-fit px-3 py-2.5 bg-neutral-secondary-medium border border-gray-300 rounded-xl text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                {...register("status")}
              >
                <option value="TO_DO">To do</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="BLOCKED">BLOCKED</option>
                <option value="IN_REVIEW">IN REVIEW</option>
                <option value="READY_FOR_QA">READY FOR QA</option>
                <option value="REOPENED">REOPENED</option>
                <option value="READY_FOR_PRODUCTION">
                  READY FOR PRODUCTION
                </option>
                <option value="DONE">DONE</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between lg:items-center items-start  flex-col gap-2 lg:flex-row flex-wrap">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="due_date">due_date</Label>
              </div>
              <div className="relative max-w-sm">
                <input
                  type="date"
                  id="due_date"
                  {...register("due_date")}
                  className="block max-w-sm ps-3 pe-3 py-2.5 bg-neutral-secondary-medium border border-gray-300 rounded-xl text-heading text-sm rounded-base "
                />
              </div>
              {errors.due_date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.due_date.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-sm ">
              <div className="mb-2 block">
                <Label htmlFor="epic_id">Epics</Label>
              </div>

              <select
                id="epic_id"
                className="block md:w-sm max-w-full px-3 py-2.5 bg-neutral-secondary-medium border border-gray-300 rounded-xl text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                defaultValue=""
                {...register("epic_id")}
              >
                <option hidden value="">
                  Choose an Epic
                </option>
                {loadingEpics ? (
                  <option>loading...</option>
                ) : (
                  epics.map((epic, index) => {
                    return (
                      <option key={index} value={epic.id}>
                        {epic.title}
                      </option>
                    );
                  })
                )}
              </select>
              {errors.epic_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.epic_id.message}
                </p>
              )}
            </div>
          </div>
          <div className="ms-auto flex gap-3 flex-wrap">
            <Button
              className="px-11 cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              Create
            </Button>
            <Button
              className="px-11 cursor-pointer "
              color="light"
              disabled={isSubmitting}
            >
              <Link href={"/project"}>Cancel</Link>
            </Button>
          </div>
          <p className="text-red-500 text-sm mt-1 text-center">{errorMsg}</p>
        </div>
      </form>
      <ToastComponent
        message="Task added successfully"
        appear={addedSuccessfully}
      />
    </>
  );
}
