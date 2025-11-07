// "use client";
// import axios from "axios";
// import { getToken } from "@/actions/getToken";
// import { useState, useEffect } from "react";
// export default function Logout() {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   const apiKey = process.env.NEXT_PUBLIC_API_KEY;
//   const [token, setToken] = useState("");

//   useEffect(() => {
//     getToken().then(setToken);
//   }, []);

//   // Send a POST request
//   function out() {
//     console.log(token);
//     // axios
//     //   .post(`${baseUrl}/auth/v1/logout`, {
//     //     headers: {
//     //       apikey: apiKey,
//     //       Authorization: `Bearer ${token}`,
//     //     },
//     //   })
//     //   .then((response) => {
//     //     console.log(response);
//     //     // router.push("/");
//     //   })
//     //   .catch((error) => {
//     //     console.log(error);
//     //   });
//   }
//   return (
//     <>
//       <span onClick={() => console.log("out")}>logout</span>
//     </>
//   );
// }
"use client";

import { useEffect, useState } from "react";

export default function Profile() {
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/token");
      const data = await res.json();
      setTokens(data);
      console.log(data);
    })();
  }, []);

  return <pre>{JSON.stringify(tokens, null, 2)}</pre>;
}
