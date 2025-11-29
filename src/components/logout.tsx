"use Client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context/cookiesContext";
export default function Logout() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const router = useRouter();
  const { setCookiesStatue } = useAppContext();

  // Send a POST request
  async function out() {
    const res = await fetch("/api/token");
    const data = await res.json();
    axios
      .post(
        `${baseUrl}/auth/v1/logout`,
        {},
        {
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${data.access}`,
          },
        }
      )
      .then((response) => {
        console.log("Logged out: ", response);
        setCookiesStatue(false);
        router.push("/");
      })
      .then(() => fetch("/api/logout"))
      .catch((error) => {
        console.log("error logout ", error);
      });
  }
  return (
    <span
      onClick={() => {
        out();
      }}
      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      logout
    </span>
  );
}
