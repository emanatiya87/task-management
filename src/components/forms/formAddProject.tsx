"use client";
import { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { Button } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ToastComponent from "../toast";
import apiClient from "@/lib/apiClient";
import { projectInput, projectSchema } from "@/schemas/projectSchema";
import { useRouter } from "next/navigation";
export default function FormAddProject() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<projectInput>({ resolver: zodResolver(projectSchema) });
  const onSubmit: SubmitHandler<projectInput> = async (data) => {
    setErrorMsg("");
    // Send a POST request
    {
      try {
        await apiClient.post("/rest/v1/projects", {
          name: data.name,
          description: data.description,
        });
        reset();
        setAddedSuccessfully(true);
        // Auto hide after 3 seconds
        setTimeout(() => {
          setAddedSuccessfully(false);
          router.push("/project");
        }, 3000);
      } catch (error) {
        setErrorMsg("Failed to create project: ");
      }
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
          <div className="ms-auto">
            <Button
              className="px-11 cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              Create
            </Button>
          </div>
          <p className="text-red-500 text-sm mt-1 text-center">{errorMsg}</p>
        </div>
      </form>
      <ToastComponent
        message="Project created successfully"
        appear={addedSuccessfully}
      />
    </>
  );
}
