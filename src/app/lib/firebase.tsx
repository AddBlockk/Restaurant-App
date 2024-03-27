import { push, ref, set } from "firebase/database";
import { auth, database } from "@/app/firebase/firebaseConfig";
import { Product } from "../../../types/category"; // Добавьте этот импорт

// Тип для объекта заказа
interface Order {
  products: Product[]; // Измените это поле
  totalPrice: number; // Добавьте это поле
  date: string; // Добавьте это поле
  userId: string;
}

// Создание нового заказа в Firebase
export function createOrder(products: Product[], totalPrice: number) {
  const userId = auth.currentUser?.uid || "";
  const newOrderRef = ref(database, "orders/" + userId);
  const newOrder: Order = {
    products: products,
    totalPrice: totalPrice,
    date: new Date().toISOString(), // Добавьте это поле
    userId: userId,
  };
  set(newOrderRef, newOrder); // Замените push на set
}
