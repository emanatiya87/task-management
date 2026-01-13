"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../state/store";
import { setIsLogin } from "@/state/features/isLogin/isLogin";
import { getAccessToken } from "@/constants/token";
export default function Home() {
  const isLoginValue = useSelector((state: RootState) => state.isLogin.value);
  const dispatch = useDispatch();
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
    // check islogin every refresh
    (async function checkIsLogin() {
      const access_token = await getAccessToken();
      if (access_token?.value) {
        dispatch(setIsLogin(true));
      } else {
        dispatch(setIsLogin(false));
      }
    })();
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
