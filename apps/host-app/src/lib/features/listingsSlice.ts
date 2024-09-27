import { ListingInformation, VehicleInformation } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListingsState {
  listings: VehicleInformation[];
  // pageLimit: number;
  // pageNumber: number;
  totalItemsCount: number;
  totalPagesCount: number;
  listingDetail: ListingInformation | null;
}

const initialState: ListingsState = {
  listings: [],
  // pageLimit: 10,
  // pageNumber: 1,
  totalItemsCount: 0,
  totalPagesCount: 0,
  listingDetail: null,
};

const userSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings: (state, action: PayloadAction<ListingsState>) => {
      state.listings = action.payload.listings;
      // state.pageLimit = action.payload.pageLimit;
      // state.pageNumber = action.payload.pageNumber;
      state.totalItemsCount = action.payload.totalItemsCount;
      state.totalPagesCount = action.payload.totalPagesCount;
      state.listingDetail = action.payload.listingDetail;
    },

    updateListings: (state, action: PayloadAction<VehicleInformation[]>) => {
      state.listings = action.payload;
    },

    setListingDetail: (state, action: PayloadAction<ListingInformation|null>) => {
      state.listingDetail = action.payload;
    },
    updateListingDetailData: (
      state,
      action: PayloadAction<Partial<VehicleInformation>>
    ) => {
      if (state.listingDetail)
        state.listingDetail = { ...state.listingDetail, ...action.payload };
    },
  },
});

export const {
  setListings,
  updateListings,
  setListingDetail,
  updateListingDetailData,
} = userSlice.actions;
export default userSlice.reducer;
