"use client";
import axios from "axios";
import InputDiv from "../InputContainer";
import CheckboxDiv from "../checkBoxDiv";
import PasswordContainer from "../passwordContainer";
import Btn from "../btn";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BaseUrl, ApiKey } from "@/constants/apiConstants";

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
      .regex(/[a-z]/, { error: "Contain at least one samll letter." })
      .regex(/[A-Z]/, { error: "Contain at least one capital letter." })
      .regex(/[0-9]/, { error: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        error: "Contain at least one special character.",
      })
      .min(8)
      .max(64),

    confirmPassword: z.string(),
    job: z.string().optional(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type IFormInput = z.infer<typeof schema>;

export default function FormSignUp() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const baseUrl = BaseUrl;
  const apiKey = ApiKey;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInput>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
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
            department: data.job || "",
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
        router.push("/registration/login");
        reset();
      })
      .catch((error) => {
        setErrorMsg(error.response.data.msg);
      });
  };

  return (
    <form
      action=""
      className="mt-3 mx-auto w-[85%]"
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
      <PasswordContainer
        title={"Password"}
        id={"password"}
        register={register("password")}
        error={errors.password}
      />
      <PasswordContainer
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
        <CheckboxDiv
          value={"Terms & Conditions"}
          register={register("acceptTerms")}
          error={errors.acceptTerms}
          id={"terms"}
        />
      </div>
      <Btn value={"Sign Up"} btnType={"submit"} disabledStatue={isSubmitting} />
      <p className="text-red-500 text-sm mt-1 text-center">{errorMsg}</p>
      <p className=" text-sm mt-1 text-center textStyle">
        Already hane an account?{" "}
        <Link
          href={"/registration/login"}
          className="px-2 underline font-medium textStyle"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
