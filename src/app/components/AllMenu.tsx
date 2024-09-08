"use client";
import React, { useEffect, useState } from "react";
import { AllMenuData, AllMenuItem } from "../../../types";
import { database } from "../firebase/firebaseConfig";
import { get, ref } from "firebase/database";
import Image from "next/image";
import Link from "next/link";
import FoodCartButton from "./FoodCartButton";

const AllMenu = () => {
  // Состояние для хранения данных, полученных из базы данных
  const [data, setData] = useState<AllMenuData | null>(null);

  useEffect(() => {
    // Функция для получения данных из базы данных
    const fetchData = async () => {
      const menuRef = ref(database, "menu");
      const [menuSnapshot] = await Promise.all([get(menuRef)]);
      const menuData = menuSnapshot.val() || [];
      setData({
        menu: menuData, // Установка полученных данных в состояние
      });
    };
    fetchData();
  }, []);

  // Получение всех элементов меню
  const allItems =
    data?.menu.flatMap((category) => category.category.items) || [];

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-[40px]">
      <h1 className="text-[24px]">Ассортимент</h1>
      <div className="flex flex-wrap text-red-500">
        {allItems.map((item: AllMenuItem) => (
          <Link
            className="group w-full gap-6 border-red-500 sm:w-1/2 lg:w-1/4 p-4 flex flex-col justify-between"
            href={`/menu/${item.category}/${item.id}`}
            key={item.id}
          >
            <div>
              <div className="">
                <Image
                  src={item.img}
                  alt=""
                  height={200}
                  width={200}
                  priority
                  className="object-contain group-hover:scale-90 transition duration-300 transform h-[60%]"
                />
              </div>
            </div>
            <div className="items-end font-bold">
              <div className="flex">
                <h1 className="text-xl uppercase w-full break-words hyphens-manual mb-[10px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.title}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllMenu;
