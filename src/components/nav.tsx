"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Dropdown from "./dropdown";
import Dark from "./darkMode";
export default function Nav() {
  const [open, setOpen] = useState(true);
  return (
    <>
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
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              AProjectO
            </span>
          </Link>
          <Dark/>
          <div className="flex gap-2 items-center ">
            <div className="flex flex-col items-end">
              <h5 className="text-lg font-medium text-gray-900 dark:text-white">
                Bonnie Green
              </h5>
              <h6 className="text-sm text-gray-500 dark:text-gray-400 ">
                Visual Designer
              </h6>
            </div>
            <div className="relative">
              <Image
                src="/user.png"
                alt="Profile"
                className="rounded-[50%] shadow-lg"
                width={30}
                height={20}
                onClick={() => setOpen((prev) => !prev)}
              />
              <div className="absolute top0 end-0">
                <Dropdown open={open} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
