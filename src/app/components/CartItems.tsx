"use client";
import Image from "next/image";
import { RootState } from "@/app/lib/store";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  incrementItemQuantity,
  decrementItemQuantity,
} from "@/app/lib/features/cart/cartSlice";

const CartItems = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleIncrement = (id: number) => {
    dispatch(incrementItemQuantity(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementItemQuantity(id));
  };

  return (
    <div className="h-1/2 p-4 sm:justify-center overflow-scroll lg:h-full lg:w-1/2 2xl:w-1/2 lg:pl-20 xl:pl-40 flex-wrap gap-[25px] sm:gap-0 justify-center">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between sm:mb-4 mb-10 sm:w-[100%]"
        >
          <Image
            src={item.img}
            alt=""
            width={100}
            height={100}
            className="w-[300px] h-[300px] sm:w-[100px] sm:h-[100px] mx-auto sm:mx-0"
          />
          <div className="flex-1 flex flex-col justify-center sm:mx-4">
            <h1 className="uppercase text-xl font-bold mb-1">{item.title}</h1>
            <span className="mb-1">
              {item.options ? item.options[0].title : ""}
            </span>
            <div>Количество: {item.quantity}</div>
            <div className="flex items-center mt-2">
              <button
                onClick={() => handleDecrement(item.id)}
                className="select-none mr-4 w-[30px] h-[30px] rounded-full bg-gray-200 transition-all hover:bg-gray-300"
              >
                {"<"}
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleIncrement(item.id)}
                className="select-none ml-4 w-[30px] h-[30px] rounded-full bg-gray-200 transition-all hover:bg-gray-300"
              >
                {">"}
              </button>
            </div>
          </div>
          <div className="flex gap-5 justify-between sm:justify-normal">
            <h2 className="font-bold mr-4 text-[24px] sm:text-[20px]">
              ₽ {item.price * item.quantity}
            </h2>
            <span
              className="cursor-pointer flex items-center font-bold px-3 py-1 rounded-full bg-gray-200 transition-all hover:bg-gray-300"
              onClick={() => handleRemoveItem(item.id)}
            >
              X
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
