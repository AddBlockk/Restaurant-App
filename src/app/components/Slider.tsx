"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    title: "всегда свежий, всегда хрустящий и всегда горячий",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "мы доставим ваш заказ, где бы вы ни находились в Астрахани",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "лучшая пицца, которой можно поделиться со своей семьей",
    image: "/slide3.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50">
      <div className="flex-1 flex items-center justify-center flex-col gap-8 text-red-500 font-bold">
        <h1 className="text-4xl text-center uppercase p-4 md:p-10 sm:text-5xl md:text-6xl xl:text-7xl">
          {data[currentSlide].title}
        </h1>
        <Link
          href={"/menu"}
          className="bg-red-500 text-white py-4 px-8 hover:bg-red-900 hover:ease-in duration-100">
          Закажи сейчас
        </Link>
      </div>
      <div className="w-full flex-1 relative">
        <Image
          src={data[currentSlide].image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Slider;
