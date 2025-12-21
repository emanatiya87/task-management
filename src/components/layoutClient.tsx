"use client";
import Sidebar from "@/components/sidebar";
import Nav from "@/components/nav";
import { useAppContext } from "@/app/context/cookiesContext";
import { useState } from "react";
interface LayoutClientProps {
  children: React.ReactNode;
}
export default function LayoutClient({ children }: LayoutClientProps) {
  const [open, setOpen] = useState(true);
  const { cookiesStatue } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex flex-1">
        {cookiesStatue ? (
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
