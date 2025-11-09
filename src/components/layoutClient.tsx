"use client";

import Sidebar from "@/components/sidebar";
import Nav from "@/components/nav";
import { useState } from "react";
interface LayoutClientProps {
  children: React.ReactNode;
}
export default function LayoutClient({ children }:LayoutClientProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Nav />
      <Sidebar open={open} setOpen={setOpen} />

      <div
        className={`${open ? "ml-16" : "ml-56"} mt-[60px] transition-all duration-300`}
      >
        {children}
      </div>
    </>
  );
}
