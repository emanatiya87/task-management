import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface isOpenEpicDetailsModal {
  value: boolean;
}

const initialState: isOpenEpicDetailsModal = {
  value: false,
};

export const epicDetailsModalSlice = createSlice({
  name: "isOpenEpicDetailsModal",
  initialState,
  reducers: {
    setIsOpenEpicDetailsModal: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

// Export actions and reducer
export const { setIsOpenEpicDetailsModal } = epicDetailsModalSlice.actions;

export default epicDetailsModalSlice.reducer;
