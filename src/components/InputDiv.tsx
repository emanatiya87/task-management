import { FieldError, UseFormRegisterReturn } from "react-hook-form";
interface IFormInput {
  type: string;
  title: string;
  id: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}
export default function InputDiv({
  type,
  title,
  id,
  register,
  error,
}: IFormInput) {
  return (
    <>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type={type}
          id={id}
          className="inputStyle peer"
          placeholder=" "
          {...register}
        />
        <label htmlFor={id} className="labelStyle">
          {title}
        </label>
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    </>
  );
}
