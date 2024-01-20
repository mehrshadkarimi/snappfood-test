import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState = { value: 0 } as CounterState;

const sampleSlice = createSlice({
  name: "sample",
  initialState,
  reducers: {
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { incrementByAmount } = sampleSlice.actions;
export default sampleSlice.reducer;
