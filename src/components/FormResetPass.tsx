"use client";
import axios from "axios";
import InputDiv from "./InputDiv";
import Btn from "./btn";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  const token = sessionStorage.getItem("hashToken");
  const [successMsg, setSuccessMsg] = useState("");
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
    axios
      .put(
        `${baseUrl}/auth/v1/user`,
        {
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apikey: apiKey,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setSuccessMsg(
          "Your password has been updated successfully. You can now log in"
        );
        reset();
        setTimeout(() => {
          router.push("/registration/Login");
        }, 3000);
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
          title={"New Password"}
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
        <p className="text-teal-500 text-sm mt-1 text-center">{successMsg}</p>
        <p className=" text-sm mt-1 text-center textStyle">
          Finished?
          <Link
            href={"/registration/Login"}
            className="px-2 underline font-medium textStyle"
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
