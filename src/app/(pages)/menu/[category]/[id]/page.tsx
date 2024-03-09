"use client";

import { useParams } from "next/navigation";
import Price from "@/app/components/Price";
import { featuredProducts } from "@/data";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reset } from "@/app/lib/features/counter/counterSlice";
import DefaultLayout from "@/app/(pages)/_layout/default";

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
    <DefaultLayout>
      <div className="p-4 lg:px-20 xl:px-40 flex flex-col justify-center items-center text-red-500 md:flex-row md:gap-8">
        {product.img && (
          <div className="overflow-hidden flex justify-center w-[100%] dm:w-[50%]">
            <Image
              src={product.img}
              alt=""
              className="object-contain transition-all duration-500 hover:rotate-[60deg] hover:scale-90"
              width={600}
              height={600}
            />
          </div>
        )}
        <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8 dm:w-[50%]">
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
    </DefaultLayout>
  );
};

export default ProductPage;
