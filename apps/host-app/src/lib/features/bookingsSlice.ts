import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingsState {
  //   use Bookings type here
  bookings: any[] | null;
}

const initialState: BookingsState = {
  bookings: null,
};

const userSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<BookingsState>) => {
      state.bookings = action.payload.bookings;
    },

    //   use Bookings type here - <Partial<any>>
    updateBookingsData: (state, action: PayloadAction<Partial<any>>) => {
      if (state.bookings)
        state.bookings = { ...state.bookings, ...action.payload };
    },
  },
});

export const { setBookings, updateBookingsData } = userSlice.actions;
export default userSlice.reducer;
