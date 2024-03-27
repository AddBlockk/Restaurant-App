"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";

const links = [
  { id: 1, title: "Главная", url: "/" },
  { id: 2, title: "Меню", url: "/menu" },
  { id: 3, title: "Контакты", url: "/" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);

  const user = true;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      <Image
        src={open ? "/close.png" : "/open.png"}
        alt=""
        width={20}
        height={20}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      />
      {open && (
        <div className="bg-red-500 text-white absolute left-0 top-12 w-full h-[100vh] flex flex-col gap-8 items-center justify-center text-3xl z-10">
          {links.map((item) => (
            <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}

          <Link
            href={user ? "/orders" : "login"}
            onClick={() => setOpen(false)}>
            {user ? "Регистрация" : "Логин"}
          </Link>
          <Link href="/cart" onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </div>
      )}
    </>
  );
};

export default Menu;
