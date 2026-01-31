"use client";
import { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { Button } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ToastComponent from "../toast";
import Link from "next/link";
import apiClient from "@/lib/apiClient";
import { projectInput, projectSchema } from "@/schemas/projectSchema";
import { ProjectType } from "@/types/project";
export default function FormEditProject({ project }: { project: ProjectType }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<projectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
    },
  });
  const onSubmit: SubmitHandler<projectInput> = async (data) => {
    setErrorMsg("");
    // Send a patch request
    try {
      await apiClient.patch(`/rest/v1/projects?id=eq.${project.id}`, {
        name: data.name,
        description: data.description,
      });
      setAddedSuccessfully(true);
      // Auto hide after 3 seconds
      setTimeout(() => {
        setAddedSuccessfully(false);
      }, 3000);
    } catch (error) {
      setErrorMsg("Failed to edit project " + error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 w-full flex flex-col gap-4 ">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title">Project Name</Label>
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
              <Label htmlFor="description">Project Description</Label>
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
          <div className="ms-auto flex gap-3">
            <Button
              className="px-11 cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              Save
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
        message="Project Edited successfully"
        appear={addedSuccessfully}
      />
    </>
  );
}
