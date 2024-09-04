"use client";

import React from "react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut(auth);
    sessionStorage.removeItem("user");
    router.push("/");
  };
  if (!user) {
    return (
      <button
        className="uppercase"
        onClick={() => {
          router.push("/sign-in");
        }}>
        Войти
      </button>
    );
  }

  return (
    <button className="uppercase" onClick={handleSignOut}>
      Выйти из аккаунта
    </button>
  );
};

export default LogoutButton;
