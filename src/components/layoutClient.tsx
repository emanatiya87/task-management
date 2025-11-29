"use client";
import { getAccessToken } from "@/constants/token";
import Sidebar from "@/components/sidebar";
import Nav from "@/components/nav";
import { useAppContext } from "@/app/context/cookiesContext";
import { useEffect, useState } from "react";
interface LayoutClientProps {
  children: React.ReactNode;
}
export default function LayoutClient({ children }: LayoutClientProps) {
  const [open, setOpen] = useState(true);
  const [token, setToken] = useState("");
  const { cookiesStatue } = useAppContext();

  useEffect(() => {
    (async () => {
      if (cookiesStatue) {
        const accessToken = await getAccessToken();
        setToken(accessToken);
      } else {
        setToken("");
      }
    })();
  }, [cookiesStatue]);
  return (
    <div className="h-dvh fixed top-0 right-0 w-full">
      <Nav />
      {token ? (
        <>
          <Sidebar open={open} setOpen={setOpen} />
          <div
            className={`${open ? "ml-16" : "ml-56"} mt-[60px] transition-all duration-300 h-full`}
          >
            {children}
          </div>
        </>
      ) : (
        <div className="mt-[60px] h-full">{children}</div>
      )}
    </div>
  );
}
