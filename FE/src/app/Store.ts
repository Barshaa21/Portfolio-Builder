// reducer
import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "../features/ShowSlice";
import nameSlice from "../features/ColorSlice";
import TotalProductsSlice from "../features/TotalProducts";
import ThemeSlice from "../features/Theme";
import IdSlice from "../features/IdSlice";

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    name: nameSlice,
    count: TotalProductsSlice,
    theme: ThemeSlice,
    id: IdSlice,
  },
});
