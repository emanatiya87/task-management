"use client";
import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
interface IFormInput {
  title: string;
  id: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}
import { FaEye } from "react-icons/fa";

export default function PasswordContainer({
  title,
  id,
  register,
  error,
}: IFormInput) {
  const [type, setType] = useState("password");
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type={type}
        id={id}
        className="inputStyle peer"
        placeholder=" "
        {...register}
      />
      <FaEye
        className="absolute inset-y-3 end-2 flex items-center  cursor-pointer textStyle"
        onClick={() => {
          setType((prev) => (prev == "password" ? "text" : "password"));
        }}
      />
      <label htmlFor={id} className="labelStyle">
        {title}
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
