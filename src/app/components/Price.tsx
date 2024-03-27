import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/lib/store";
import { decrement, increment } from "@/app/lib/features/counter/counterSlice";
import { addItem, updateItem } from "@/app/lib/features/cart/cartSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import SignIn from "../components/SignIn";

type Props = {
  price: number;
  id: number;
  title: string;
  img: string;
  options?: { title: string; additionalPrice: number }[];
};

const Price = ({ price, id, title, img, options }: Props) => {
  const [total, setTotal] = useState(price);
  const [selected, setSelected] = useState(0);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [showSignIn, setShowSignIn] = useState(true);

  // Получаем текущего пользователя, состояние загрузки и ошибку
  const [user, loading, error] = useAuthState(auth);
  // Состояние модального окна
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const handleCloseSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const toggleSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  useEffect(() => {
    setTotal(
      count *
        (options ? price + (options[selected]?.additionalPrice || 0) : price)
    );
  }, [count, selected, options, price]);

  const addToCart = () => {
    // Если пользователь не авторизован, открываем модальное окно
    if (!user) {
      setIsSignInModalOpen(true);
      return;
    }

    const newItem = {
      id,
      title,
      img,
      price: total / count,
      quantity: count,
      options: options
        ? [
            {
              title: options[selected]?.title || "",
              additionalPrice: options[selected]?.additionalPrice || 0,
            },
          ]
        : undefined,
    };

    const cartItem = cartItems.find((item) => item.id === id);

    if (cartItem) {
      updateItemSize();
    } else {
      dispatch(addItem(newItem));
    }
  };

  const updateItemSize = () => {
    const updatedItem = {
      id,
      title,
      img,
      price: total / count,
      quantity: count,
      options: options
        ? [
            {
              title: options[selected]?.title || "",
              additionalPrice: options[selected]?.additionalPrice || 0,
            },
          ]
        : undefined,
    };

    dispatch(updateItem(updatedItem));
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">₽{total}</h2>
      {options && options.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 text-sm">
          {options.map((option, index) => (
            <button
              key={option.title}
              className="min-w-[6rem] py-2 ring-1 ring-red-400 rounded-md"
              style={{
                background: selected === index ? "rgb(248 113 113)" : "white",
                color: selected === index ? "white" : "red",
              }}
              onClick={() => setSelected(index)}>
              {option.title}
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-5 justify-between items-center sm:flex-row sm:gap-0">
        <div className="flex justify-between w-[100%] p-3 ring-1 ring-red-500">
          <span>Количество</span>
          <div className="flex gap-4 items-center">
            <button onClick={() => dispatch(decrement())}>{"<"}</button>
            <span>{count}</span>
            <button onClick={() => dispatch(increment())}>{">"}</button>
          </div>
        </div>
        <button
          onClick={() => {
            if (cartItems.find((item) => item.id === id)) {
              updateItemSize();
            } else {
              addToCart();
            }
          }}
          className="uppercase sm:w-56 bg-red-500 text-white p-3 ring-1 ring-red-500 w-[100%]">
          {cartItems.find((item) => item.id === id) ? "Обновить" : "В корзину"}
        </button>
      </div>
      {isSignInModalOpen && (
        <>
          <SignIn
            isOpen={isSignInModalOpen}
            onClose={handleCloseSignInModal}
            toggleSignIn={toggleSignIn}
            onSignIn={() => {
              setIsSignInModalOpen(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default Price;
