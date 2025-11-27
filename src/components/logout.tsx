import axios from "axios";
import { useRouter } from "next/navigation";
export default function Logout() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const router = useRouter();
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
        router.push("/");
      })
      .then(() => fetch("/api/logout"))
      .catch((error) => {
        console.log("error logout ", error);
      });
  }
  return (
    <>
      <span
        onClick={() => {
          out();
        }}
      >
        logout
      </span>
    </>
  );
}
