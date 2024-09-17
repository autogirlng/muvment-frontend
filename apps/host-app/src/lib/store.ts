import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import forgotPasswordReducer from "./features/user/forgotPasswordSlice";
import accountSetupReducer from "./features/user/accountSetupSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      forgotPassword: forgotPasswordReducer,
      accountSetup: accountSetupReducer,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
