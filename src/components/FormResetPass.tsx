"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import InputDiv from "./InputDiv";
import Btn from "./btn";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schema = z
  .object({
    password: z
      .string()
      .regex(/[a-z]/, { error: "Contain at least one small letter." })
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
  const [token, setToken] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const t = typeof window !== "undefined"
      ? sessionStorage.getItem("reset_token")
      : null;

    setToken(t);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<IFormInput>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!token) {
      setErrorMsg("Missing reset token. Try again.");
      return;
    }

    try {
      const response = await axios.put(
        `${baseUrl}/auth/v1/user`,
        { password: data.password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apikey: apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMsg("Your password has been updated successfully. You can now log in");
      reset();

      setTimeout(() => {
        router.push("/registration/Login");
      }, 3000);
    } catch (error: any) {
      setErrorMsg(error.response?.data?.msg || "Request failed");
    }
  };

  return (
    <form
      className="mt-3 mx-auto w-[85%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputDiv
        type="password"
        title="New Password"
        id="password"
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

      <Btn value="Reset" btnType="submit" disabledStatue={isSubmitting} />

      <p className="text-red-500 text-sm mt-1 text-center">{errorMsg}</p>
      <p className="text-teal-500 text-sm mt-1 text-center">{successMsg}</p>

      <p className="text-sm mt-1 text-center textStyle">
        Finished?
        <Link
          href="/registration/Login"
          className="px-2 underline font-medium textStyle"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
