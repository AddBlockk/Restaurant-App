"use client";

import { pizzas, burgers, pasta } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Loading() {
  const SkeletonCard = () => {
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

    return (
      <SkeletonTheme baseColor="#990" highlightColor="#550">
        <div className="flex flex-wrap text-red-500">
          <Skeleton
            style={{ borderRadius: 100 }}
            count={9}
            height={10}
            duration={200}
            width={40}
            baseColor="#999"
          />
          {filteredFoods().map((item) => (
            <div
              className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
              key={item.id}>
              {item.img && <div className="relative h-[80%]"></div>}
              <div className="flex items-center justify-between font-bold">
                <h1 className="text-2xl uppercase p-2">{item.title}</h1>
                <h2 className="group-hover:hidden text-xl">₽{item.price}</h2>
                <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md"></button>
              </div>
            </div>
          ))}
        </div>
      </SkeletonTheme>
    );
  };
}
