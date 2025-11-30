import FormAddProject from "@/components/forms/formAddProject";
import Link from "next/link";
export default function AddProject() {
  return (
    <>
      <h2 className="mb-3 text-gray-600  text-xl font-semibold">
        <Link href={"/project"}>Project</Link> / create Project
      </h2>
      <FormAddProject />
    </>
  );
}
