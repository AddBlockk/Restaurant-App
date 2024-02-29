import { burgers, menu, pizzas } from "@/data";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import Loading from "./loading";
import Skeleton from "react-loading-skeleton";

const MenuPage = () => {
  return (
    // <Suspense fallback={<Loading />}>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 lg:px-20 xl:px-40 items-center ">
      {menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="relative bg-cover p-8 "
          style={{
            backgroundImage: `url(${category.img})`,
          }}>
          <div
            className={`text-${category.color} flex flex-col justify-between h-[320px] w-[70%] 2xl:w-[50%]`}>
            <div>
              <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
              <p className="text-sm my-8">{category.desc}</p>
            </div>
            <button
              className={`text-${
                category.color === "white" ? "black" : "black"
              } py-2 pr-4 rounded-md bottom-4 flex`}>
              Подробнее
            </button>
          </div>
        </Link>
      ))}
      <Skeleton />
    </div>
    // </Suspense>
  );
};

export default MenuPage;
