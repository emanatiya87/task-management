import { Card } from "flowbite-react";
import { FaEdit } from "react-icons/fa";

export default function ProjectCard({
  title,
  description,
  creationDate,
}: {
  title: string;
  description: string;
  creationDate: string;
}) {
  return (
    <div className="md:w-1/3 sm:w-1/2 w-full p-2">
      <Card className="w-full">
        <div className="flex items-center justify-between">
          <h4 className=" text-base font-bold text-gray-900 lg:text-xl dark:text-white">
            {title}
          </h4>
          <FaEdit className="textStyle text-2xl cursor-pointer" />
        </div>
        <hr />
        <p className="text-md mt-3 font-normal text-gray-800 dark:text-gray-400">
          {description}
        </p>
        <p className="text-md mt-3 font-normal text-red-600">
          Created At:{creationDate}
        </p>
      </Card>
    </div>
  );
}
