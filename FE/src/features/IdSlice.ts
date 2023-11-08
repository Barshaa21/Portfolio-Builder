import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: 1 };

export const IdSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
      return state;
    },
  },
});
export const { setId } = IdSlice.actions;
export default IdSlice.reducer;
