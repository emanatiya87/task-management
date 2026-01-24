"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
export default function Home() {
  const isLoginValue = useSelector((state: RootState) => state.isLogin.value);
  const router = useRouter();
  const [Msg, setMsg] = useState("");
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    if (token) {
      router.push("/registration/reset-password");
      sessionStorage.setItem("hashToken", token);
      setMsg("Invalid or expired reset link.");
    }
  }, []);

  return (
    <div className="bg-primary">
      <Link href="/registration/signup"> signup</Link>
      <Link href="/project/add"> add project</Link>
      <h3 className="text-red-600">{Msg}</h3>
      <h2>logged in?: {isLoginValue ? "yes" : "no"}</h2>
    </div>
  );
}
