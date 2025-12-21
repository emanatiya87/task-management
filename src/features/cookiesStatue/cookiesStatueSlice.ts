import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface cookiesState {
  value: boolean;
}

const initialState: cookiesState = {
  value: true,
};

export const cookiesStatueSlice = createSlice({
  name: "cookiesStatue",
  initialState,
  reducers: {
    setCookiesStatue: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

// Export actions and reducer
export const { setCookiesStatue } = cookiesStatueSlice.actions;

export default cookiesStatueSlice.reducer;
