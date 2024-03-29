"use client";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import sliderData from "../../../public/sliderData.json";
import { slideVariants, slider, textVariants } from "./Animations";
import { Button } from "@mui/material";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        setCurrentSlide((prev) =>
          prev === sliderData.length - 1 ? 0 : prev + 1
        ),
      6000
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
          className="text-3xl text-center uppercase p-4 md:p-10 sm:text-3xl md:text-4xl xl:text-5xl leading-10">
          {sliderData[currentSlide]?.title}
        </motion.h1>

        <Link href={"/menu"}>
          <Button
            variant="contained"
            style={{
              textTransform: "none",
              fontSize: 18,
              backgroundColor: "rgb(239 68 68)",
              borderRadius: 5,
              padding: 12,
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
