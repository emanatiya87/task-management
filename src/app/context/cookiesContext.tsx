"use client";

import { createContext, useState, ReactNode, useContext } from "react";

type AppContextType = {
  cookiesStatue: boolean;
  setCookiesStatue: (value: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cookiesStatue, setCookiesStatue] = useState(true);

  return (
    <AppContext.Provider value={{ cookiesStatue, setCookiesStatue }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
};
