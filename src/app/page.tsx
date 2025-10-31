import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="bg-primary">
        <h2 className="text-teal-200 text-center">hello</h2>
        <Link href="/signup"> signup</Link>
      </div>
    </>
  );
}
