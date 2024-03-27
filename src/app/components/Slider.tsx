"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import sliderData from "../../../public/sliderData.json";
import { slideVariants, slider, textVariants } from "./Animations";

interface Slider {
  id: number;
  title: string;
  image: string;
}

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        setCurrentSlide((prev) =>
          prev === sliderData.length - 1 ? 0 : prev + 1
        ),
      4000
    );
    return () => clearTimeout(timeout);
  }, [currentSlide]);

  return (
    <motion.div
      variants={slider}
      initial="initial"
      animate="animate"
      whileInView="whileInView"
      className="overflow-hidden flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50">
      <div className="flex-1 flex items-center justify-center flex-col gap-8 text-red-500 font-bold">
        <motion.h1
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="text-4xl text-center uppercase p-4 md:p-10 sm:text-5xl md:text-6xl xl:text-7xl">
          {sliderData[currentSlide]?.title}
        </motion.h1>
        <Link
          href={"/menu"}
          className="bg-red-500 text-white py-4 px-8 hover:bg-red-900 hover:ease-in duration-100">
          Закажи сейчас
        </Link>
      </div>
      <div className="w-full flex-1 relative">
        {sliderData[currentSlide]?.image && (
          <motion.div
            key={sliderData[currentSlide].id}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 ">
            <Image
              src={sliderData[currentSlide]?.image}
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Slider;
