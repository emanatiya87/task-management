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
import { epicSchema, EpicInputs } from "@/schemas/epicSchema";
import { epicType } from "@/types/epic";
export default function FormAddEpic({ project }: { project: epicType }) {
  const { members, loading, error } = useProjectMembers(project.id);
  const [errorMsg, setErrorMsg] = useState("");
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EpicInputs>({
    resolver: zodResolver(epicSchema),
  });
  const onSubmit: SubmitHandler<EpicInputs> = async (data) => {
    setErrorMsg("");
    // Send a POST request
    try {
      await apiClient.post("/rest/v1/epics", {
        title: data.title,
        description: data.description,
        assignee_id: data.assignee_id || null,
        project_id: project.id,
        deadline: data.deadline || null,
      });

      setAddedSuccessfully(true);
      setTimeout(() => setAddedSuccessfully(false), 3000);
    } catch (error) {
      setErrorMsg("Failed to add epic: ");
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
          <div>
            <div className="mb-2 block">
              <Label htmlFor="assignee_id">Assign To</Label>
            </div>

            <select
              id="assignee_id"
              className="block w-[50%] px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
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
              <Label htmlFor="deadline">Deadline</Label>
            </div>
            <div className="relative max-w-sm">
              <input
                type="date"
                id="deadline"
                {...register("deadline")}
                className="block w-full ps-3 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base rounded-lg"
              />
            </div>
            {errors.deadline && (
              <p className="text-red-500 text-sm mt-1">
                {errors.deadline.message}
              </p>
            )}
          </div>
          <div className="ms-auto flex gap-3">
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
        message="Epic added successfully"
        appear={addedSuccessfully}
      />
    </>
  );
}
