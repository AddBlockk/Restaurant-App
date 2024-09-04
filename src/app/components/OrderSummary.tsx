"use client";
import React from "react";
import { RootState } from "@/app/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/app/lib/features/cart/cartSlice";
import { database, auth } from "../../app/firebase/firebaseConfig";
import { push, ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

const OrderSummary = () => {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  const handleSending = async () => {
    if (cartItems.length > 0 && user) {
      const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const order = {
        items: cartItems,
        totalPrice,
        date: new Date().toLocaleString("ru-RU", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        userId: user.uid,
        status: "Ожидается",
      };
      const newOrderRef = push(ref(database, `users/${user.uid}/orders`));
      set(newOrderRef, order);
      dispatch(clearCart());
      Swal.fire({
        icon: "success",
        title: `Вы успешно оформили заказ на сумму ${totalPrice} рублей!`,
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("./orders");
    } else {
      alert("Ваша корзина пуста!");
    }
  };

  return (
    <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/2 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
      <div className="flex justify-between">
        <span className="">Всего продукции ({cartItems.length})</span>
        <span className="">
          ₽{" "}
          {cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="">Стоимость доставки</span>
        <span className="text-green-500">Бесплатно!</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between">
        <span className="">Общая стоимость</span>
        <span className="font-bold">
          ₽{" "}
          {cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )}
        </span>
      </div>
      <Button
        onClick={handleSending}
        variant="contained"
        style={{
          textTransform: "none",
          fontSize: 20,
          backgroundColor: "rgb(239 68 68)",
          borderRadius: 10,
        }}
      >
        Заказать
      </Button>
    </div>
  );
};

export default OrderSummary;
