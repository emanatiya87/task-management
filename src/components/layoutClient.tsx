"use client";
import Sidebar from "@/components/sidebar";
import Nav from "@/components/nav";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/state/store";
import { useState, useEffect } from "react";
import { setIsLogin } from "@/state/features/auth/authSlice";
import { getAccessToken } from "@/constants/token";
interface LayoutClientProps {
  children: React.ReactNode;
}
export default function LayoutClient({ children }: LayoutClientProps) {
  const [open, setOpen] = useState(true);
  const isLoginValue = useSelector((state: RootState) => state.isLogin.value);
  const dispatch = useDispatch();
  useEffect(() => {
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
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex flex-1">
        {isLoginValue ? (
          <>
            <Sidebar open={open} setOpen={setOpen} />
            <div
              className={`${open ? "ml-16" : "ml-56"} mt-[60px] transition-all duration-300 flex-1`}
            >
              {children}
            </div>
          </>
        ) : (
          <div className="mt-[60px] flex-1 w-full">{children}</div>
        )}
      </div>
    </div>
  );
}
