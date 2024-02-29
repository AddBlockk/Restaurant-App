import { featuredProducts } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Featured = () => {
  return (
    <div className="overflow-x-scroll text-red-500">
      <div className="w-max flex">
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh] gap-[20px]">
            {item.img && (
              <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
                <Image src={item.img} alt="" fill className="object-contain" />
              </div>
            )}
            <div className=" flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                {item.title}
              </h1>
              <p className="2xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold">₽{item.price}</span>
              <Link
                href={`/menu`}
                className="bg-red-500 text-white p-2 rounded-md">
                Добавить в корзину
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
