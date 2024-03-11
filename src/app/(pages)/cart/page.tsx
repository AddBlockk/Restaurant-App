"use client";

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import { useDispatch } from "react-redux";
import { removeItem } from "@/app/lib/features/cart/cartSlice";
// import DefaultLayout from "../_layout/default";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  return (
    // <DefaultLayout>
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-4">
            <Image src={item.img} alt="" width={100} height={100} />
            <div className="flex-1 flex flex-col justify-center mx-4">
              <h1 className="uppercase text-xl font-bold mb-1">{item.title}</h1>
              <span className="mb-1">
                {item.options ? item.options[0].title : ""}
              </span>
              <div>Количество: {item.quantity}</div>
            </div>
            <h2 className="font-bold mr-4">₽ {item.price * item.quantity}</h2>
            <span
              className="cursor-pointer"
              onClick={() => handleRemoveItem(item.id)}>
              X
            </span>
          </div>
        ))}
      </div>
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Всего продукции ({cartItems.length})</span>
          <span className="">
            ₽{" "}
            {cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="">Стоимость доставки</span>
          <span className="text-green-500">Бесплатно!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">Общая стоимость</span>
          <span className="font-bold">
            ₽{" "}
            {cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </span>
        </div>
        <button className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end">
          Проверка
        </button>
      </div>
    </div>
    // </DefaultLayout>
  );
}
