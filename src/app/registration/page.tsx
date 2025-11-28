import Link from "next/link";

export default function Registration() {
  return (
    <div className="flex items-center justify-center gap-2 w-full my-5">
      <Link
        href={"/registration/login"}
        className="underline font-bold textStyle"
      >
        Login
      </Link>
      <Link
        href={"/registration/signup"}
        className="underline font-bold textStyle"
      >
        Signup
      </Link>
    </div>
  );
}
