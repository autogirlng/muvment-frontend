import { ListingInformation, VehicleInformation } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListingsState {
  listings: VehicleInformation[];
  pageLimit: number;
  pageNumber: number;
  totalItemsCount: number;
  totalPagesCount: number;
  listingById?: ListingInformation | null;
}

const initialState: ListingsState = {
  listings: [],
  pageLimit: 10,
  pageNumber: 1,
  totalItemsCount: 32,
  totalPagesCount: 4,
  listingById: null,
};

const userSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings: (state, action: PayloadAction<ListingsState>) => {
      state.listings = action.payload.listings;
      state.pageLimit = action.payload.pageLimit;
      state.pageNumber = action.payload.pageNumber;
      state.totalItemsCount = action.payload.totalItemsCount;
      state.totalPagesCount = action.payload.totalPagesCount;
    },

    updateListingByIdData: (
      state,
      action: PayloadAction<Partial<ListingInformation>>
    ) => {
      console.log(action.payload);

      if (state.listingById)
        state.listingById = { ...state.listingById, ...action.payload };
      else state.listingById = action.payload as ListingInformation;
    },
  },
});

export const { setListings, updateListingByIdData } = userSlice.actions;
export default userSlice.reducer;
