import { Transaction } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionState {
  transactions: Transaction[];
  totalItemsCount: number;
  totalPagesCount: number;
}

const initialState: TransactionState = {
  transactions: [],
  totalItemsCount: 0,
  totalPagesCount: 0,
};

const userSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<TransactionState>) => {
      state.transactions = action.payload.transactions;
      state.totalItemsCount = action.payload.totalItemsCount;
      state.totalPagesCount = action.payload.totalPagesCount;
    },

    updateTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
  },
});

export const { setTransactions, updateTransactions } = userSlice.actions;
export default userSlice.reducer;
