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

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).+$/,
      "Password must contain uppercase, lowercase, number, and special character, with no spaces"
    )
    .min(8)
    .max(64),
});
type LogInput = z.infer<typeof schema>;

export default function FormLogin() {
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
  } = useForm<LogInput>({ resolver: zodResolver(schema) });
  const password = watch("password");
  const onSubmit: SubmitHandler<LogInput> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setErrorMsg("");
    // Send a POST request

    axios
      .post(
        `${baseUrl}/auth/v1/token?grant_type=password`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            apikey: apiKey,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setAccessToken(response.data.access_token);
        reset();
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error.response.data.msg);
      });
  };

  return (
    <>
      <form className="mt-3 mx-auto w-[85%]" onSubmit={handleSubmit(onSubmit)}>
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

        <div className="flex items-center justify-between my-5">
          <CheckboxDiv value={"Remember me"} />
          <Link
            href={"/"}
            className="underline text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Forget Password
          </Link>
        </div>
        <Btn value={"Login"} btnType={"submit"} disabledStatue={isSubmitting} />
        <p className="text-red-500 text-sm mt-1 text-center">{errorMsg}</p>
        <p className=" text-sm mt-1 text-center text-gray-900 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            href={"/signup"}
            className="px-2 underline font-medium  text-gray-900 dark:text-gray-300"
          >
            Signup
          </Link>
        </p>
      </form>
    </>
  );
}
