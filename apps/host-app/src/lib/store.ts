import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import forgotPasswordReducer from "./features/user/forgotPasswordSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      forgotPassword: forgotPasswordReducer,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
