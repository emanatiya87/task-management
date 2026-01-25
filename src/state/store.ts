import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import epicDetailsModalSliceReducer from "./features/epicDetailsModal/epicDetailsModalSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      isLogin: authReducer,
      isOpenEpicDetailsModal: epicDetailsModalSliceReducer,
    },
  });
};

// Infer types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
