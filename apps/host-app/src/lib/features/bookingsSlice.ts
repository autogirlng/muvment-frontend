import { BookingInformation } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingsState {
  //   use Bookings type here
  bookings?: BookingInformation[];
  upcomingBookings?: BookingInformation[];
  // pageLimit: number;
  // pageNumber: number;
  totalItemsCount: number;
  totalPagesCount: number;
}

const initialState: BookingsState = {
  bookings: [],
  upcomingBookings: [],
  // pageLimit: 10,
  // pageNumber: 1,
  totalItemsCount: 0,
  totalPagesCount: 0,
};

const userSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<BookingsState>) => {
      state.bookings = action.payload.bookings;
      state.totalItemsCount = action.payload.totalItemsCount;
      state.totalPagesCount = action.payload.totalPagesCount;
    },

    setUpcomingBookings: (state, action: PayloadAction<BookingsState>) => {
      state.upcomingBookings = action.payload.bookings;
      state.totalItemsCount = action.payload.totalItemsCount;
      state.totalPagesCount = action.payload.totalPagesCount;
    },

    updateBookingsData: (state, action: PayloadAction<Partial<any>>) => {
      if (state.bookings)
        state.bookings = { ...state.bookings, ...action.payload };
    },
  },
});

export const { setBookings, updateBookingsData, setUpcomingBookings } =
  userSlice.actions;
export default userSlice.reducer;
