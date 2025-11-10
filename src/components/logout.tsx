"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Logout() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [token, setToken] = useState(null);
  const router = useRouter();
  // Send a POST request
  async function out() {
    await (async () => {
      try {
        const res = await fetch("/api/token");
        const data = await res.json();
        setToken(data.access);
      } catch (err) {
        console.error("Failed to load token:", err);
        setToken(null);
      }
    })();
    axios
      .post(
        `${baseUrl}/auth/v1/logout`,
        {},
        {
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${token}`,
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
      <span onClick={() => out()}>logout</span>
    </>
  );
}
