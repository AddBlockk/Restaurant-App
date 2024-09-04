"use client";
import React, { useState } from "react";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Cookies from "js-cookie";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AuthenticationModal from "./NavbarMobile";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

function Navbar() {
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

  return (
    <>
      <div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
        <div className="hidden md:flex gap-4 flex-1">
          <Link
            className="relative bg-gradient-to-r from-transparent via-red-500 to-transparent bg-[length:0%_2px] bg-no-repeat bg-bottom transition-[background-size] duration-300 hover:bg-[length:100%_2px]"
            href="/"
          >
            Главная
          </Link>
          <Link
            className="relative bg-gradient-to-r from-transparent via-red-500 to-transparent bg-[length:0%_2px] bg-no-repeat bg-bottom transition-[background-size] duration-300 hover:bg-[length:100%_2px]"
            href="/menu"
          >
            Меню
          </Link>
          {user && (
            <Link
              className="relative bg-gradient-to-r from-transparent via-red-500 to-transparent bg-[length:0%_2px] bg-no-repeat bg-bottom transition-[background-size] duration-300 hover:bg-[length:100%_2px]"
              href="/orders"
            >
              Заказы
            </Link>
          )}
        </div>
        <Link
          className="max-w-max relative bg-gradient-to-r from-transparent via-red-500 to-transparent bg-[length:0%_2px] bg-no-repeat bg-bottom transition-[background-size] duration-300 hover:bg-[length:100%_2px] text-xl md:font-bold flex-1 md:text-center"
          href="/"
        >
          Boltach
        </Link>
        <div className="md:hidden">
          <AuthenticationModal />
        </div>
        <div className="hidden md:flex gap-4 justify-end flex-1">
          <CartIcon />
          {user ? (
            <button
              className="uppercase relative bg-gradient-to-r from-transparent via-red-500 to-transparent bg-[length:0%_2px] bg-no-repeat bg-bottom transition-[background-size] duration-300 hover:bg-[length:100%_2px]"
              onClick={handleSignOut}
            >
              Выйти из аккаунта
            </button>
          ) : (
            <button
              onClick={handleOpenSignInModal}
              className="uppercase relative bg-gradient-to-r from-transparent via-red-500 to-transparent bg-[length:0%_2px] bg-no-repeat bg-bottom transition-[background-size] duration-300 hover:bg-[length:100%_2px]"
            >
              Войти
            </button>
          )}
        </div>
      </div>
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
}

export default Navbar;
