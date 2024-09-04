import { ref, set } from "firebase/database";
import { auth, database } from "@/app/firebase/firebaseConfig";
import { OrderState, Product } from "../../../types"; // Добавьте этот импорт

// Создание нового заказа в Firebase
export function createOrder(products: Product[], totalPrice: number) {
  const userId = auth.currentUser?.uid || "";
  const newOrderRef = ref(database, "orders/" + userId);
  const newOrder: OrderState = {
    products,
    totalPrice,
    date: new Date().toISOString(), // Добавьте это поле
    userId: userId,
  };
  set(newOrderRef, newOrder); // Замените push на set
}
