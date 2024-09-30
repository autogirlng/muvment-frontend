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

    setUpcomingBookings: (
      state,
      action: PayloadAction<Partial<BookingsState>>
    ) => {
      console.log(action.payload);

      state.upcomingBookings = action.payload.upcomingBookings;
      state.totalItemsCount = action.payload.totalItemsCount || 0;
      state.totalPagesCount = action.payload.totalPagesCount || 0;
    },

    updateBookingsData: (state, action: PayloadAction<BookingInformation>) => {
      console.log("action.payload", action.payload);

      if (state.bookings) {
        state.bookings = state.bookings.map((booking) =>
          booking.id === action.payload.id ? action.payload : booking
        );
        console.log(state.bookings);
      }
      if (state.upcomingBookings) {
        state.upcomingBookings = state.upcomingBookings.map((booking) =>
          booking.id === action.payload.id ? action.payload : booking
        );
        console.log(state.bookings);
      }
    },
  },
});

export const { setBookings, updateBookingsData, setUpcomingBookings } =
  userSlice.actions;
export default userSlice.reducer;
