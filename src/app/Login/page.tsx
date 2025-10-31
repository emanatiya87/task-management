import Image from "next/image";
import FormLogin from "@/components/FormLogin";
export default function Login() {
  return (
    <>
      <section className="w-[80vw] m-auto flex items-center h-dvh ">
        <div className="sm:flex-1 flex-0">
          <Image
            src="/signupimg.svg"
            alt="Sign Up img"
            width={500}
            height={500}
          />
        </div>
        <div className="flex justify-center flex-1">
          <div className="w-full">
            <h2 className="text-2xl font-bold my-2 text-center ">
              Welcome back , Yash
            </h2>
            <p className="text-center">
              Welcome back! Please enter your details
            </p>
            <FormLogin />
          </div>
        </div>
      </section>
    </>
  );
}
