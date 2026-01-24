import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      isLogin: authReducer,
    },
  });
};

// Infer types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
