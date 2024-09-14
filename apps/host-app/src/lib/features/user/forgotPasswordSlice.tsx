import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ForgotPasswordState {
  forgotPasswordOtp: string;
}

const initialState: ForgotPasswordState = {
  forgotPasswordOtp: "",
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    setOtp: (state, action: PayloadAction<string>) => {
      state.forgotPasswordOtp = action.payload;
      console.log(action.payload);
    },

    clearOtp: (state) => {
      state.forgotPasswordOtp = "";
    },
  },
});

export const { setOtp, clearOtp } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
