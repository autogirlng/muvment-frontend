import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import forgotPasswordReducer from "./features/forgotPasswordSlice";
import accountSetupReducer from "./features/accountSetupSlice";
import vehicleOnboardingReducer from "./features/vehicleOnboardingSlice";
import listingsReducer from "./features/listingsSlice";
import bookingsReducer from "./features/bookingsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      forgotPassword: forgotPasswordReducer,
      accountSetup: accountSetupReducer,
      vehicleOnboarding: vehicleOnboardingReducer,
      listings: listingsReducer,
      bookings: bookingsReducer,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
