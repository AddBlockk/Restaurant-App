import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import ModalAuthentication from "./ModalAuthentication";
import Swal from "sweetalert2";
import { SignInModalState } from "../../../types";

const SignInModal = ({
  isOpen,
  onClose,
  toggleSignIn,
  onSignIn,
}: SignInModalState) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res?.user) {
        sessionStorage.setItem("user", "true");
        setEmail("");
        setPassword("");
        Cookies.set("user", "true", { expires: 7 }); // Cookie будет храниться в течение 7 дней
        const userCookie = Cookies.get("user");
        onSignIn();
        Swal.fire({
          icon: "success",
          title: "Успешный вход",
          showConfirmButton: false,
          timer: 1500,
        });
        onClose();
      }
      if (!res?.user) {
        setEmail("");
        setPassword("");
        Swal.fire({
          icon: "error",
          title: "Ошибка",
          text: "Повторите попытку",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (e) {
      setError("Неверный email или пароль");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Предотвратить отправку формы по умолчанию
    handleSignIn(); // Вызвать функцию входа
  };

  const handleClose = () => {
    onClose();
    setError("");
  };
  return (
    <ModalAuthentication isOpen={isOpen} onClose={handleClose}>
      <div className="relative items-center flex mb-5">
        <h1 className="text-red-500 text-2xl">Вход</h1>
        <button
          onClick={onClose}
          className="absolute right-0 text-gray-600 hover:text-red-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 text-black rounded outline-none focus:border-red-500 focus:ring-red-500 focus:ring-1"
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 text-black rounded outline-none focus:border-red-500 focus:ring-red-500 focus:ring-1"
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="w-full p-3 bg-red-500 rounded text-white hover:bg-red-600 transition duration-300 ease-in-out"
        >
          Войти
        </button>
      </form>
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          toggleSignIn();
        }}
        className="text-gray-600 flex justify-end mt-4 hover:text-red-500 transition duration-300 ease-in-out"
      >
        <span className="text-transform: capitalize">Зарегистрироваться</span>
      </Link>
    </ModalAuthentication>
  );
};

export default SignInModal;
