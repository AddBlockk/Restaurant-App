import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Login = () => {
  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
      <div className=" h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/loginBg.png" alt="" fill className="object-cover" />
        </div>
        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-3xl">Добро Пожаловать</h1>
          <p>
            Войдите в свою учетную запись или создайте новую, используя кнопки
            социальных сетей
          </p>
          <button className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md">
            <Image
              src="/google.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Войти с помощью Google</span>
          </button>
          <p className="text-sm">
            Имеются проблемы?
            {"  "}
            <Link className="underline" href="/">
              Напишите нам
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
