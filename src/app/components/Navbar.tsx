import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import LogoutButton from "./LogoutButton";

function Navbar() {
  return (
    <div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Главная</Link>
        <Link href="/menu">Меню</Link>
        <Link href="/">Контакты</Link>
      </div>
      <div className="text-xl md:font-bold flex-1 md:text-center ">
        <Link href="/">Boltach</Link>
      </div>
      <div className="md:hidden">
        <Menu />
      </div>
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        {/* <div className="hidden top-3 r-2 lg:flex 2xl:static items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-lg user-select-none">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <a href="tel:+79086118372">
            <span>+7 (908) 611 83 72</span>
          </a>
        </div> */}
        <CartIcon />
        <LogoutButton />
      </div>
    </div>
  );
}

export default Navbar;
