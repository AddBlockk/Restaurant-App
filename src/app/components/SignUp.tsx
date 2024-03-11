import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import Link from "next/link";
import Modal from "./Modal";

interface SignUpProps {
  isOpen: boolean;
  onClose: () => void;
  toggleSignIn: () => void;
}

const SignUp = ({ isOpen, onClose, toggleSignIn }: SignUpProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem("user", "true");
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative items-center flex mb-5">
        <h1 className="text-red-500 text-2xl">Регистрация</h1>
        <button
          onClick={onClose}
          className="absolute right-0 text-gray-600 hover:text-red-500 transition duration-300 ease-in-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded outline-none focus:border-red-500 focus:ring-red-500 focus:ring-1"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded outline-none focus:border-red-500 focus:ring-red-500 focus:ring-1"
      />
      <button
        onClick={handleSignUp}
        className="w-full p-3 bg-red-500 rounded text-white hover:bg-red-600 transition duration-300 ease-in-out">
        Зарегистрироваться
      </button>
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          toggleSignIn();
        }}
        className="text-gray-600 flex justify-end mt-4 hover:text-red-500 transition duration-300 ease-in-out">
        Уже зарегистрированы?
      </Link>
    </Modal>
  );
};

export default SignUp;
