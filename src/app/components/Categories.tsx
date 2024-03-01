"use client";

import { pizzas, burgers, pasta } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import FoodCartButton from "./FoodCartButton";
import Loading from "../(pages)/menu/[category]/loading";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

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
    <div className="flex flex-wrap text-red-500">
      {loading ? (
        <Loading />
      ) : (
        <>
          {filteredFoods().map((item) => (
            <Link
              className="group w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
              href={`/menu/${categoryName}/${item.id}`}
              key={item.id}>
              <div className="relative h-[80%]">
                <Image
                  src={item.img}
                  alt=""
                  fill
                  className="object-contain group-hover:scale-90 transition duration-300 transform"
                />
              </div>
              <div className="items-end font-bold">
                <h1 className="text-2xl uppercase w-full break-words hyphens-manual mb-[10px]">
                  {item.title}
                </h1>
                <div className="h-[40px] flex justify-end">
                  <>
                    <h2 className="group-hover:hidden text-xl">
                      ₽{item.price}
                    </h2>
                    <FoodCartButton />
                  </>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};
export default CategoryPage;
