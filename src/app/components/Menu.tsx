"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { auth } from "@/app/firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { AnimatePresence, motion } from "framer-motion";
import { menu } from "../../../animations/animations";

const links = [
  { id: 1, title: "Главная", url: "/" },
  { id: 2, title: "Меню", url: "/menu" },
  { id: 3, title: "Заказ", url: "/orders" },
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    sessionStorage.removeItem("user");
    router.push("/");
    Cookies.remove("user");
  };

  const handleOpenSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const handleCloseSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const toggleSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  const handleBodyScroll = (isOpen: any) => {
    const body = document.body;
    if (isOpen) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }
  };

  return (
    <>
      <Image
        src={isOpen ? "/close.png" : "/open.png"}
        alt=""
        width={20}
        height={20}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onClick={() => {
          setIsOpen(!isOpen);
          handleBodyScroll(!isOpen);
        }}
        className="cursor-pointer"
      />
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.nav
            initial="initial"
            exit="exit"
            animate={isOpen ? "enter" : "exit"}
            variants={menu}
            className="bg-red-500 text-white fixed left-0 top-12 w-full h-[100vh] flex flex-col gap-8 items-center pt-[calc(50%-3rem)] text-2xl z-10">
            <div className="flex flex-col flex-wrap items-center gap-24 bg-red-500 mx-6 w-[300px]">
              {user ? (
                <button
                  className="text-start uppercase relative bg-gradient-to-r from-transparent via-red-500 to-transparent bg-[length:0%_2px] bg-no-repeat bg-bottom transition-[background-size] duration-300 hover:bg-[length:100%_2px]"
                  onClick={handleSignOut}>
                  Выйти из аккаунта
                </button>
              ) : (
                <button
                  onClick={handleOpenSignInModal}
                  className="text-start uppercase relative bg-gradient-to-r from-transparent via-red-500 to-transparent bg-[length:0%_2px] bg-no-repeat bg-bottom transition-[background-size] duration-300 hover:bg-[length:100%_2px]">
                  Войти
                </button>
              )}
              {links
                .filter((item) => item.title !== "Заказ" || user)
                .map((item) => (
                  <Link
                    href={item.url}
                    key={item.id}
                    onClick={() => {
                      if (window.location.pathname !== item.url) {
                        setIsOpen(!isOpen);
                      }
                    }}>
                    {item.title}
                  </Link>
                ))}
              <Link href="/cart" onClick={() => setIsOpen(!isOpen)}>
                <CartIcon />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      {isSignInModalOpen && (
        <>
          {showSignIn ? (
            <SignIn
              isOpen={isSignInModalOpen}
              onClose={handleCloseSignInModal}
              toggleSignIn={toggleSignIn}
              onSignIn={() => {
                setIsSignInModalOpen(false);
              }}
            />
          ) : (
            <SignUp
              isOpen={isSignInModalOpen}
              onClose={handleCloseSignInModal}
              toggleSignIn={toggleSignIn}
            />
          )}
        </>
      )}
    </>
  );
};

export default Menu;
