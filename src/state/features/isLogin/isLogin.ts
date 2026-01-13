import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface isLogin {
  value: boolean;
}

const initialState: isLogin = {
  value: false,
};

export const isLoginSlice = createSlice({
  name: "isLogin",
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

// Export actions and reducer
export const { setIsLogin } = isLoginSlice.actions;

export default isLoginSlice.reducer;
