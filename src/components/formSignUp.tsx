"use client";
import axios from "axios";
import InputDiv from "./InputDiv";
import Btn from "./btn";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
const schema = z
  .object({
    name: z
      .string()
      .min(3)
      .max(50)
      .regex(
        /^(?!.*\s{2,})[A-Za-z\u00C0-\u024F\u0600-\u06FF]+(?:\s[A-Za-z\u00C0-\u024F\u0600-\u06FF]+)*$/,
        "Only letters and single spaces allowed (no numbers or special characters)"
      ),
    email: z.string().email(),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).+$/,
        "Password must contain uppercase, lowercase, number, and special character, with no spaces"
      )
      .min(8)
      .max(64),

    confirmPassword: z.string(),
    job: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type IFormInput = z.infer<typeof schema>;

export default function FormSignUp() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [accessToken, setAccessToken] = useState(null);
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
      .post(
        `${baseUrl}/auth/v1/signup`,
        {
          email: data.email,
          password: data.password,
          data: {
            name: data.name,
            job_title: data.job || "",
          },
        },
        {
          headers: {
            apikey: apiKey,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setAccessToken(response.data.access_token);
        router.push("/");
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
        className="mt-3 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputDiv
          type="text"
          title={"Name"}
          id={"name"}
          register={register("name")}
          error={errors.name}
        />
        <InputDiv
          type="text"
          title={"Email"}
          id={"email"}
          register={register("email")}
          error={errors.email}
        />
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
        <InputDiv
          type="text"
          title={"Job title"}
          id={"job"}
          register={register("job")}
          error={errors.job}
        />
        <div className="flex items-center justify-between my-5">
          <div className="flex items-center ">
            <div className="flex items-center ">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Terms&Conditions
            </label>
          </div>
          <Link
            href={"/"}
            className="underline text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Forget Password
          </Link>
        </div>
        <Btn
          value={"Sign Up"}
          btnType={"submit"}
          disabledStatue={isSubmitting}
        />
        <p className="text-red-500 text-sm mt-1 text-center">{errorMsg}</p>
        <p className=" text-sm mt-1 text-center text-gray-900 dark:text-gray-300">
          Already hane an account?{" "}
          <Link
            href={"/Login"}
            className="px-2 underline font-medium  text-gray-900 dark:text-gray-300"
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
