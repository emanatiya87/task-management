"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DropdownComponent from "./dropdown";
import { DarkThemeToggle } from "flowbite-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
type UserInfo = {
  name?: string;
  department?: string;
};

export default function Nav() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const isLoginValue = useSelector((state: RootState) => state.isLogin.value);
  useEffect(() => {
    if (isLoginValue) {
      async function getUserData() {
        try {
          const res = await fetch("/api/userData");
          const { userInfo } = await res.json();
          setUser(JSON.parse(userInfo));
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
      getUserData();
    } else {
      setUser(null);
    }
  }, [isLoginValue]);

  return (
    <nav className="bg-white border-gray-900 dark:bg-gray-900 py-2 px-3 shadow-md h-[60px] fixed top-0 right-0 left-0">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto ">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse "
        >
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
            width={30}
            height={30}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hidden sm:block">
            AProjectO
          </span>
        </Link>
        <DarkThemeToggle className="bg-white" />
        <div className={isLoginValue ? `flex gap-2 items-center` : "hidden"}>
          {user ? (
            <>
              <div className="flex flex-col items-end">
                <h5 className="text-lg font-medium textStyle">{user.name}</h5>
                <h6 className="text-sm text-gray-500 dark:text-gray-400">
                  {user.department}
                </h6>
              </div>
              <DropdownComponent />
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
