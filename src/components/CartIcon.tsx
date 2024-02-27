"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Price from "../components/Price";
import type { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
} from "@/app/redux/features/counter/counterSlice";

export function CartIcon() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <Link href="/cart" className="flex items-center gap-4">
      <div className="relative w-8 h-8 md:w-5 md:h-5">
        <Image src="/cart.png" alt="" fill />
      </div>
      <span>Корзина {count}</span>
    </Link>
  );
}

export default CartIcon;
