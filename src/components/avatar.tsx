export default function Avatar({ name }: { name: string }) {
  const chars = name
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <span className="rounded-[50%] bg-gray-200 me-2  text-gray-600 text-sm w-8 h-8 items-center flex justify-center">
      <span className="font-semibold">{chars}</span>
    </span>
  );
}
