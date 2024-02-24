import { burgers, menu, pizzas } from "@/data";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import Loading from "./loading";

const MenuPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] items-center">
        {menu.map((category) => (
          <Link
            href={`/menu/${category.slug}`}
            key={category.id}
            className="relative bg-cover p-8 md:h-1/2"
            style={{ backgroundImage: `url(${category.img})` }}>
            <div
              className={`text-${category.color} flex flex-col justify-between h-full w-[50%]`}>
              <div>
                <h1 className="uppercase font-bold text-3xl">
                  {category.title}
                </h1>
                <p className="text-sm my-8">{category.desc}</p>
              </div>
              <button
                className={`text-${
                  category.color === "white" ? "black" : "black"
                } py-2 px-4 rounded-md absolute bottom-4`}>
                Подробнее
              </button>
            </div>
          </Link>
        ))}
      </div>
    </Suspense>
  );
};

export default MenuPage;
