"use client";

import { useParams } from "next/navigation";
import Price from "@/app/components/Price";
import { featuredProducts } from "@/data";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reset } from "@/app/lib/features/counter/counterSlice";

const ProductPage = () => {
  const { id } = useParams();
  const product =
    featuredProducts.find((item) => item.id === Number(id)) ||
    featuredProducts[0];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
  }, [dispatch, id]);

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center">
      {product.img && (
        <div className="relative w-full h-1/2 md:h-[70%] overflow-hidden">
          <Image
            src={product.img}
            alt=""
            className="object-contain transition-all duration-500 hover:rotate-[60deg]"
            fill
          />
        </div>
      )}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">
          {product.title}
        </h1>
        <p>{product.desc}</p>
        <Price
          price={product.price}
          id={product.id}
          options={product.options}
          title={product.title}
          img={product.img}
        />
      </div>
    </div>
  );
};

export default ProductPage;
