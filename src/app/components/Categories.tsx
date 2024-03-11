"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import FoodCartButton from "./FoodCartButton";
import Loading from "../(pages)/menu/[category]/loading";
import { get, ref } from "firebase/database";
import { database } from "@/app/firebase/config";

type Category = {
  name: string;
  items: Item[];
};

type Item = {
  id: number;
  title: string;
  desc: string;
  img: string;
  price: number;
  options?: Option[];
};

type Option = {
  title: string;
  additionalPrice: number;
};

const CategoryPage = () => {
  const [data, setData] = useState<{ categories: Category[] } | null>(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database);
      const snapshot = await get(dbRef);
      setData(snapshot.val());
      setCategoryName(
        window.location.pathname.split("/")[
          window.location.pathname.split("/").length - 1
        ]
      );
    };

    fetchData();
  }, []);

  const currentCategory = data?.categories.find(
    (category) => category.name === categoryName
  );

  const filteredFoods = currentCategory?.items || [];

  return (
    <div className="flex flex-wrap text-red-500">
      {!data ? (
        <Loading />
      ) : (
        <>
          <div key={categoryName} className="w-full inline-flex flex-wrap">
            {filteredFoods.map((item: Item) => (
              <Link
                className="group w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between"
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
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPage;
