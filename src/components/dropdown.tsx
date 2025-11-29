import Link from "next/link";
import Logout from "./logout";
import Image from "next/image";
import { Dropdown, DropdownItem } from "flowbite-react";

export default function DropdownComponent() {
  return (
    <Dropdown
      label=""
      dismissOnClick={false}
      renderTrigger={() => (
        <Image
          src="/user.png"
          alt="Profile"
          className="rounded-[50%] shadow-lg"
          width={30}
          height={20}
        />
      )}
    >
      <DropdownItem>
        {" "}
        <Link
          href="/"
          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Settings
        </Link>
      </DropdownItem>
      <DropdownItem>
        {" "}
        <Logout />
      </DropdownItem>
    </Dropdown>
  );
}
