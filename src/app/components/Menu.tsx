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
import { motion } from "framer-motion";

const variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const links = [
  { id: 1, title: "Главная", url: "/" },
  { id: 2, title: "Меню", url: "/menu" },
  { id: 3, title: "Заказ", url: "/orders" },
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();

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
        <motion.nav
          animate={open ? "open" : "closed"}
          variants={variants}
          className="bg-red-500 text-white absolute left-0 top-12 w-full h-[100vh] flex flex-col gap-8 items-center justify-center text-2xl z-10">
          <div className="flex flex-col gap-24 h-100% bg-red-500 mx-6">
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
                  onClick={() => setOpen(false)}>
                  {item.title}
                </Link>
              ))}
            <Link href="/cart" onClick={() => setOpen(false)}>
              <CartIcon />
            </Link>
          </div>
          {/* </div> */}
        </motion.nav>
      )}
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
