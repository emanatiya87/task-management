"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [Msg, setMsg] = useState("");
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    if (token) {
      router.push("/registration/reset-password");
      console.log("yes");
      sessionStorage.setItem("hashToken", token);
      setMsg("Invalid or expired reset link.");
    }
  }, []);

  return (
    <div className="bg-primary">
      <Link href="/registration/SignUp"> signup</Link>
      <h3 className="text-red-600">{Msg}</h3>
    </div>
  );
}
