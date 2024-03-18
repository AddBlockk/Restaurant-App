"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Offer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1 }}
      className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh] bg-cover bg-no-repeat">
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
        <h1 className="text-white text-5xl font-bold xl:text-6xl">
          Вкусный бургер и картофель фри
        </h1>
        <p className="text-white xl:text-xl">
          Постепенное упрощение эффективных электронных работников и
          процессно-ориентированных методов расширения прав и возможностей.
          Быстро проводите параллель.
        </p>
        <Link
          href={"/menu"}
          className="bg-red-500 text-white rounded-md py-3 px-6 hover:bg-red-900 hover:ease-in duration-100">
          Заказывайте прямо сейчас
        </Link>
      </div>
      <div className="flex-1 w-full relative md:h-full">
        <Image
          src="/offerProduct.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
        />
      </div>
    </motion.div>
  );
};

export default Offer;
