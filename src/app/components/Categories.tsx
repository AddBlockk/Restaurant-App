"use client";

import { pizzas, burgers, pasta } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import FoodCartButton from "./FoodCartButton";
import type { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "@/app/redux/features/counter/counterSlice";

const CategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    setCategoryName(
      window.location.pathname.split("/")[
        window.location.pathname.split("/").length - 1
      ]
    );
  }, []);

  const filteredFoods = () => {
    switch (categoryName) {
      case "pasta":
        return pasta;
      case "burgers":
        return burgers;
      case "pizzas":
        return pizzas;
      default:
        return [];
    }
  };

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-wrap text-red-500">
      {filteredFoods().map((item) => (
        <Link
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
          href={`/menu/${categoryName}/${item.id}`}
          key={item.id}>
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" fill className="object-contain" />
            </div>
          )}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">₽{item.price}</h2>
            <FoodCartButton />
          </div>
        </Link>
      ))}
      <Skeleton />
    </div>
  );
};
export default CategoryPage;
