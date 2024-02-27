import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 1,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value = Math.max(1, state.value + 1);
    },
    decrement: (state) => {
      state.value = Math.max(1, state.value - 1);
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value = Math.max(1, state.value + action.payload);
    },
  },
});
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
