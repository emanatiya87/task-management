"use client";

import { useAppContext } from "@/app/context/cookiesContext";

export default function ExampleComponent() {
  const { cookiesStatue, setCookiesStatue } = useAppContext();

  return (
    <div>
      <h2>statue: {cookiesStatue ? "login" : "logout"}</h2>
      <button onClick={() => setCookiesStatue(true)}>login</button>
    </div>
  );
}
