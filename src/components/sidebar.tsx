"use client";
import { FaEdit } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { LuLogs } from "react-icons/lu";
import { FaCommentDots } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import Link from "next/link";
import { IoMdArrowDropleft } from "react-icons/io";
import { MdArrowRight } from "react-icons/md";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  return (
    <>
      <aside
        id="default-sidebar"
        className={`fixed top-[60px] left-0 z-40 ${open ? "" : "w-56"} overflow-hidden h-screen transition-transform `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <button
            onClick={() => setOpen((prev) => !prev)}
            type="button"
            className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 cursor-pointer"
          >
            {open ? (
              <MdArrowRight className="iconsStyle" />
            ) : (
              <IoMdArrowDropleft className="iconsStyle" />
            )}
          </button>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaEdit className="iconsStyle" />
                <span className={`ms-3 ${open && "hidden"}`}>Project</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoMdPhotos className="iconsStyle" />
                <span className={`ms-3 ${open && "hidden"}`}>Tasks</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <LuLogs className="iconsStyle" />

                <span className={`ms-3 ${open && "hidden"}`}>Work Logs</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaCommentDots className="iconsStyle" />

                <span className={`ms-3 ${open && "hidden"}`}>Performance</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoSettings className="iconsStyle" />
                <span className={`ms-3 ${open && "hidden"}`}>Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
