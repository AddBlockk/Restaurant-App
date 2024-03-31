"use client";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import sliderData from "../../../public/sliderData.json";
import { slideVariants, slider } from "../../../animations/animations";
import { Button } from "@mui/material";
import Typewriter from "typewriter-effect";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);

  return (
    <motion.div
      variants={slider}
      initial="initial"
      animate="animate"
      whileInView="whileInView"
      className="overflow-hidden flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50">
      <div className="flex-1 flex items-center justify-center flex-col gap-8 text-red-500 font-bold">
        <div className="text-3xl text-center px-4 pt-4 md:p-10 sm:text-3xl md:text-4xl xl:text-5xl leading-10 md:leading-[100px] h-64  overflow-hidden">
          <Typewriter
            options={{
              strings: [
                "Всегда свежий, всегда хрустящий и всегда горячий",
                "Мы доставим ваш заказ, где бы вы ни находились в Астрахани",
                "Лучшая пицца, которой можно поделиться со своей семьей",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <Link href={"/menu"}>
          <Button
            variant="contained"
            style={{
              textTransform: "none",
              fontSize: 18,
              backgroundColor: "rgb(239 68 68)",
              borderRadius: 5,
              paddingTop: 10,
              paddingBottom: 10,
              fontWeight: "bold",
            }}>
            Закажи сейчас
          </Button>
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
            className="absolute inset-0">
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
