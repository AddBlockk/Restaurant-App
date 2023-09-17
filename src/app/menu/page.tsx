import { pizzas } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryPage = () => {
  return (
    <div className="flex flex-wrap text-red-500">
      {pizzas.map((item) => (
        <Link
          className="w-[100%] h-[60vh] border-r-2 border-b-2 opacity-80 hover:opacity-100 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
          href={`/product/${item.id}`}
          key={item.id}
        >
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%] overflow-hidden">
              <Image
                src={item.img}
                alt=""
                fill
                className="object-contain transition-all duration-500 hover:rotate-[60deg]"
              />
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>
            <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md hover:bg-red-900 hover:ease-in duration-100">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
