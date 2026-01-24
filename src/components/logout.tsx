"use Client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setIsLogin } from "@/state/features/auth/authSlice";
export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();
  async function out() {
    await fetch("/api/logout");
    dispatch(setIsLogin(false));
    router.push("/");
  }
  return (
    <span
      onClick={() => {
        out();
      }}
      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      logout
    </span>
  );
}
