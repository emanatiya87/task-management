"use client";
import axios from "axios";
import InputDiv from "./InputDiv";
import CheckboxDiv from "./checkBoxDiv";
import Btn from "./btn";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

const schema = z
  .object({
    password: z
      .string()
      .regex(/[a-z]/, { error: "Contain at least one samll letter." })
      .regex(/[A-Z]/, { error: "Contain at least one capital letter." })
      .regex(/[0-9]/, { error: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        error: "Contain at least one special character.",
      })
      .min(8)
      .max(64),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type IFormInput = z.infer<typeof schema>;

export default function FormResetPass() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<IFormInput>({ resolver: zodResolver(schema) });
  const password = watch("password");
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setErrorMsg("");
    // Send a POST request
    axios
      .put(
        `${baseUrl}/auth/v1/user`,
        {
          password: data.password,
        },
        {
          headers: {
            // todo token!!!
            // Authorization: Bearer<ACCESS_TOKEN>,
            apikey: apiKey,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        console.log(
          "Your password has been updated successfully. You can now log in"
        );
        reset();
      })
      .catch((error) => {
        setErrorMsg(error.response.data.msg);
      });
  };

  return (
    <>
      <form
        action=""
        className="mt-3 mx-auto w-[85%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputDiv
          type="password"
          title={"Password"}
          id={"password"}
          register={register("password")}
          error={errors.password}
        />
        <InputDiv
          type="password"
          title="Confirm Password"
          id="confirmPassword"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
        />

        <Btn value={"Reset"} btnType={"submit"} disabledStatue={isSubmitting} />
        <p className="text-red-500 text-sm mt-1 text-center">{errorMsg}</p>
      </form>
    </>
  );
}
