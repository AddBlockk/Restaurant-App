"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/app/lib/features/counter/counterSlice";
import cartReducer from "@/app/lib/features/cart/cartSlice";

export const store = configureStore({
  reducer: { counter: counterReducer, cart: cartReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.getState;
