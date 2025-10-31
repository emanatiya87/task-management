import Image from "next/image";
import FormSignUp from "@/components/formSignUp";
export default function Signup() {
  return (
    <>
      <section className="w-[80vw] m-auto flex items-center h-dvh ">
        <div className="sm:flex-1 flex-0">
          <Image
            src="/signupimg.svg"
            alt="Picture of the author"
            width={500}
            height={500}
          />
        </div>
        <div className="flex justify-center   flex-1">
          <div>
            <h2 className="text-2xl font-bold my-2">Welcome back , Yash</h2>
            <p>Welcome back! Please enter your details</p>
            <FormSignUp />
          </div>
        </div>
      </section>
    </>
  );
}
