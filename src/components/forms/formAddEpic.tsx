"use client";
import { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { Button } from "flowbite-react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiKey, BaseUrl } from "@/constants/apiConstants";
import { getAccessToken } from "@/constants/token";
import ToastComponent from "../toast";
import Link from "next/link";
import useProjectMembers from "@/functions/useProjectMembers";
import apiClient from "@/lib/apiClient";

interface ProjectType {
  id: string;
  name: string;
  description: string;
  created_at: string;
  deadline: string;
}
export default function FormAddEpic({ project }: { project: ProjectType }) {
  const { members, loading, error } = useProjectMembers(project.id);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const schema = z.object({
    name: z.string().min(3, "Title is required at least 3 chars"),
    description: z.string().optional(),
    deadline: z
      .string()
      .refine((value) => {
        if (!value) return true;
        const selectedDate = new Date(value);
        selectedDate.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      }, "Deadline must be today or in the future")
      .optional(),
    assignee_id: z.string().optional(),
  });
  type projectInput = z.infer<typeof schema>;
  const [errorMsg, setErrorMsg] = useState("");
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<projectInput>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<projectInput> = async (data) => {
    setErrorMsg("");
    // Send a POST request
    try {
      await apiClient.post("/rest/v1/epics", {
        title: data.name,
        description: data.description,
        assignee_id: data.assignee_id,
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
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
            <Button className="px-11 cursor-pointer" type="submit">
              Create
            </Button>
            <Button className="px-11 cursor-pointer " color="light">
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
