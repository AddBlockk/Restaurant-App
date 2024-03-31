"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CounterState } from "../../../../../types/category";

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
    reset: (state) => {
      state.value = 1;
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;

export default counterSlice.reducer;
