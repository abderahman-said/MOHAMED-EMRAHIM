import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ControlPanal from "./ControlPanal";
import HomeSlice from "./HomeSlice";
import ShopSlice from "./ShopSlice";
export default configureStore({
  reducer: {
    HomeSlice,
    ShopSlice,
    AuthSlice,
    ControlPanal
  },
});
