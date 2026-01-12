"use Client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/constants/token";
import { BaseUrl, ApiKey } from "@/constants/apiConstants";
import { useDispatch } from "react-redux";
import { setIsLogin } from "@/features/isLogin/isLogin";

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const baseUrl = BaseUrl;
  const apiKey = ApiKey;
  // Send a POST request
  async function out() {
    const accessToken = await getAccessToken();
    axios
      .post(
        `${baseUrl}/auth/v1/logout`,
        {},
        {
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${accessToken?.value}`,
          },
        }
      )
      .then((response) => {
        console.log("Logged out: ", response);
        dispatch(setIsLogin(false));
        // // to do in funciton , use await
        // router.push("/");
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
