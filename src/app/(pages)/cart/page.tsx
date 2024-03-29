"use client";
import Image from "next/image";
import { RootState } from "@/app/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "@/app/lib/features/cart/cartSlice";
import { database, auth } from "../../firebase/firebaseConfig";
import { push, ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function CartPage() {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

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
      alert(`Вы успешно оформили заказ на сумму ${totalPrice} рублей!`);
      router.push("./orders");
    } else {
      alert("Ваша корзина пуста!");
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      <div className="h-1/2 p-4 sm:justify-center overflow-scroll lg:h-full lg:w-1/2 2xl:w-1/2 lg:pl-20 xl:pl-40 flex-wrap gap-[25px] sm:gap-0 justify-center">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between sm:mb-4 mb-10 sm:w-[100%]">
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
            </div>
            <div className="flex gap-5 justify-between sm:justify-normal">
              <h2 className="font-bold mr-4 text-[24px] sm:text-[20px]">
                ₽ {item.price * item.quantity}
              </h2>
              <span
                className="cursor-pointer flex items-center font-bold"
                onClick={() => handleRemoveItem(item.id)}>
                X
              </span>
            </div>
          </div>
        ))}
      </div>
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
          }}>
          Добавить в корзину
        </Button>
      </div>
    </div>
  );
}
