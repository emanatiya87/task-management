"use client";
import axios from "axios";
import InputDiv from "./InputDiv";
import Btn from "./btn";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
});
type forgotPassEmail = z.infer<typeof schema>;

export default function FormForgetPass() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const [errorMsg, setErrorMsg] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");
  const [disableBtnreset, setDisableBtnreset] = useState(false);
  const [time, setTime] = useState(0);
  const [counter, setCounter] = useState(3);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<forgotPassEmail>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<forgotPassEmail> = async (data) => {
    console.log(counter);
    setConfirmMsg("");
    setErrorMsg("");
    setTime(300);
    setDisableBtnreset(true);

    if (counter > 0) {
      setCounter((prev) => prev - 1);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Send a POST request
      axios
        .post(
          `${baseUrl}/auth/v1/recover`,
          {
            email: data.email,
          },
          {
            headers: {
              apikey: apiKey,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          setConfirmMsg(
            "If an account exists with this email, we’ve sent a password reset link."
          );
          counterStart();
        })
        .catch((error) => {
          setErrorMsg(error.response?.data?.error || "invalid email ");
        });
    } else {
      setDisableBtnreset(true);
      setErrorMsg("You have exceed number of trials");
    }
  };

  function counterStart() {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          setDisableBtnreset(false);
          return prev;
        }
        return prev - 1;
      });
    }, 1000);
  }

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

        <Btn
          value={"Send Reset Link"}
          btnType={"submit"}
          disabledStatue={isSubmitting || disableBtnreset}
        />
        <p className="text-red-500 text-sm mt-1 text-center">{errorMsg}</p>
        <p
          className="text-teal-700 text-sm mt-1 text-center font-semibold"
          style={{ color: "#00796B" }}
        >
          {confirmMsg}
        </p>
        <p className=" text-sm mt-1 text-center textStyle">
          Don't Receive An Email?{" "}
          {disableBtnreset
            ? `Resend in  ${time > 60 ? time % 60 : time} secs : ${Math.floor(time / 60)} mins`
            : "Resend"}
        </p>
      </form>
    </>
  );
}
