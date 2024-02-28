"use client";

import React, { useEffect, useState } from "react";
import type { RootState } from "@/app/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "@/app/lib/features/counter/counterSlice";
import { addItem } from "@/app/lib/features/cart/cartSlice";

type Props = {
  price: number;
  id: number;
  title: string;
  img: string;
  options?: { title: string; additionalPrice: number }[];
};

const Price = ({ price, id, options, img, title }: Props) => {
  const [total, setTotal] = useState(price);
  const [selected, setSelected] = useState(0);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    setTotal(
      count *
        (options ? price + (options[selected]?.additionalPrice || 0) : price)
    );
  }, [count, selected, options, price]);

  const addToCart = () => {
    dispatch(
      addItem({
        id,
        quantity: count,
        price: total / count,
        title,
        img,
        options: options
          ? [
              {
                title: options[selected].title,
                additionalPrice: options[selected].additionalPrice,
              },
            ]
          : undefined,
      })
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">₽{total}</h2>
      <div className="flex gap-4 ">
        {options?.map((option, index) => (
          <button
            key={option.title}
            className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md"
            style={{
              background: selected === index ? "rgb(248 113 113)" : "white",
              color: selected === index ? "white" : "red",
            }}
            onClick={() => setSelected(index)}>
            {option.title}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
          <span>Количество</span>
          <div className="flex gap-4 items-center">
            <button onClick={() => dispatch(decrement())}>{"<"}</button>
            <span>{count}</span>
            <button onClick={() => dispatch(increment())}>{">"}</button>
          </div>
        </div>
        <button
          onClick={addToCart}
          className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500">
          В корзину
        </button>
      </div>
    </div>
  );
};

export default Price;
