"use client";
import Image from "next/image";
import Link from "next/link";
import type { RootState } from "@/app/lib/store";
import { useSelector } from "react-redux";

export function CartIcon() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Link href="/cart" className="flex gap-2">
      <div className="relative w-8 h-8 md:w-5 md:h-5">
        <Image
          src="/cart.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 text-xs border-black border-[1px]">
            {totalQuantity}
          </span>
        )}
      </div>
      <span className="relative bg-gradient-to-r from-transparent via-red-500 to-transparent bg-[length:0%_2px] bg-no-repeat bg-bottom transition-[background-size] duration-300 hover:bg-[length:100%_2px]">
        Корзина
      </span>
    </Link>
  );
}

export default CartIcon;
