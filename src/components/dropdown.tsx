import Link from "next/link";
import Logout from "./logout";
interface DropdownProps {
  open: boolean;
}
export default function Dropdown({ open }: DropdownProps) {
  return (
    <div
      id="dropdown"
      className={`${open && "hidden"} z-50 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li>
          <Link
            href="/"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Settings
          </Link>
        </li>
        <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
          <Logout />
        </li>
      </ul>
    </div>
  );
}
