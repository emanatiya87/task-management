import { configureStore } from "@reduxjs/toolkit";
import isLoginReducer from "../features/isLogin/isLogin";
export const makeStore = () => {
  return configureStore({
    reducer: {
      isLogin: isLoginReducer,
    },
  });
};

// Infer types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
