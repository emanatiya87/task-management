"use client";
import axios from "axios";
import InputDiv from "../InputContainer";
import CheckboxDiv from "../checkBoxDiv";
import Btn from "../btn";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PasswordContainer from "../passwordContainer";
import { useAppContext } from "@/app/context/cookiesContext";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
  acceptTerms: z.boolean().optional(),
});
type LogInput = z.infer<typeof schema>;

export default function FormLogin() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const { setCookiesStatue } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LogInput>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<LogInput> = async (data) => {
    setErrorMsg("");
    // Send a POST request
    axios
      .post("/api/auth/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        reset();
        router.push("/dashboard");
        setCookiesStatue(true);
      })
      .catch((error) => {
        setErrorMsg(error.response?.data?.error || "invalid email or password");
      });
  };

  return (
    <>
      {" "}
      <form className="mt-3 mx-auto w-[85%]" onSubmit={handleSubmit(onSubmit)}>
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

        <div className="flex items-center justify-between my-5">
          <CheckboxDiv
            value={"Remember me"}
            register={register("acceptTerms")}
            error={errors.acceptTerms}
            id={"terms"}
          />
          <Link
            href={"/registration/forgot-password"}
            className="underline text-sm font-medium textStyle"
          >
            Forget Password
          </Link>
        </div>
        <Btn value={"Login"} btnType={"submit"} disabledStatue={isSubmitting} />
        <p className="text-red-500 text-sm mt-1 text-center">{errorMsg}</p>
        <p className=" text-sm mt-1 text-center textStyle">
          Don't have an account?{" "}
          <Link
            href={"/registration/signup"}
            className="px-2 underline font-medium textStyle"
          >
            Signup for free
          </Link>
        </p>
      </form>
    </>
  );
}
