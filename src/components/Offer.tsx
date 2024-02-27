import Image from "next/image";
import React from "react";

const Offer = () => {
  return (
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh]">
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
        <h1 className="text-white text-5xl font-bold xl:text-6xl">
          Вкусный бургер и картофель фри
        </h1>
        <p className="text-white xl:text-xl">
          Постепенное упрощение эффективных электронных работников и
          процессно-ориентированных методов расширения прав и возможностей.
          Быстро проводите параллель.
        </p>
        <button className="bg-red-500 text-white rounded-md py-3 px-6 hover:bg-red-900 hover:ease-in duration-100">
          Заказывайте прямо сейчас
        </button>
      </div>
      <div className="flex-1 w-full relative md:h-full">
        <Image src="/offerProduct.png" alt="" fill className="object-contain" />
      </div>
    </div>
  );
};

export default Offer;
