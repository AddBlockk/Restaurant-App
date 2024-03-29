"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import FoodCartButton from "./FoodCartButton";
import Loading from "../(pages)/menu/[category]/loading";
import { get, ref } from "firebase/database";
import { database } from "@/app/firebase/firebaseConfig";
import { Data, Item } from "../../../types/category";

const CategoryPage = () => {
  // Состояние для хранения данных, полученных из базы данных
  const [data, setData] = useState<Data | null>(null);
  // Состояние для хранения имени текущей категории
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    // Функция для получения данных из базы данных
    const fetchData = async () => {
      const menuRef = ref(database, "menu");

      const [menuSnapshot] = await Promise.all([get(menuRef)]);

      const menuData = menuSnapshot.val() || [];

      setData({
        // Установка полученных данных в состояние
        menu: menuData,
      });

      setCategoryName(
        // Установка имени текущей категории в состояние
        window.location.pathname.split("/")[
          window.location.pathname.split("/").length - 1
        ]
      );
    };

    fetchData();
  }, []);

  // Получение текущей категории из данных
  const currentCategory = data?.menu.find(
    (item) => item.slug === categoryName
  )?.category;

  // Фильтрация еды по текущей категории
  const filteredFoods = currentCategory?.items || [];

  return (
    <div className="flex flex-wrap text-red-500">
      {!data ? (
        // Отображение компонента загрузки, пока данные не будут получены
        <Loading />
      ) : (
        // Отображение списка еды по текущей категории
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
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain group-hover:scale-90 transition duration-300 transform"
                />
              </div>
              <div className="items-end font-bold">
                <div className="flex">
                  <h1 className="text-2xl uppercase w-full break-words hyphens-manual mb-[10px]">
                    {item.title}
                  </h1>
                  <h2 className="text-xl">₽{item.price}</h2>
                </div>
                <div className="h-[40px] flex justify-end">
                  <FoodCartButton />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
