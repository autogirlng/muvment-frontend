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

  bookingDetail: null | BookingInformation;
}

const initialState: BookingsState = {
  bookings: [],
  upcomingBookings: [],
  // pageLimit: 10,
  // pageNumber: 1,
  totalItemsCount: 0,
  totalPagesCount: 0,
  bookingDetail: null,
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

    setBookingDetail: (state, action: PayloadAction<BookingInformation>) => {
      state.bookingDetail = action.payload;
    },
    updateBookingDetailData: (
      state,
      action: PayloadAction<Partial<BookingInformation>>
    ) => {
      if (state.bookingDetail)
        state.bookingDetail = { ...state.bookingDetail, ...action.payload };
    },
  },
});

export const {
  setBookings,
  updateBookingsData,
  setUpcomingBookings,
  setBookingDetail,
  updateBookingDetailData,
} = userSlice.actions;
export default userSlice.reducer;
