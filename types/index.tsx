import { ComponentPropsWithoutRef, ReactNode } from "react";

export type Item = {
  [x: string]: any;
  id: number;
  title: string;
  desc: string;
  img: string;
  price: number;
  optionsId: number[];
};

export type Category = {
  name: string;
  items: Product[];
};

export type MenuItem = {
  id: number;
  title: string;
  desc: string;
  img: string;
  slug: string;
  color: string;
  category: Category;
};

export type Data = {
  menu: MenuItem[];
};

export interface Product {
  id: number;
  slug: string;
  title: string;
  desc: string;
  img: string;
  color: string;
  price: number;
  optionsId: number[];
  quantity: number;
}

export interface Option {
  additionalPrice: number;
  title: string;
  id: number;
}

export interface Menu {
  id: number;
  slug: string;
  title: string;
  desc: string;
  img: string;
  color: string;
}
[];

export interface OrderState {
  products: Product[]; // Измените это поле
  totalPrice: number; // Добавьте это поле
  date: string; // Добавьте это поле
  userId: string;
}

export interface Order {
  products: Product[];
  totalPrice: number;
  date: string;
  userId: string;
  status: string;
  isDetailsOpen: boolean;
  id: string;
  items: Product[];
}

export interface OrderDetailsState {
  order: Order;
  isOpen: boolean;
}

export interface CartItem {
  id: number;
  title: string;
  desc: string;
  img: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface CounterState {
  value: number;
}

export type PriceState = {
  price: number;
  id: number;
  desc: string;
  title: string;
  img: string;
  options?: { title: string; additionalPrice: number }[];
};

export interface SignInModalState {
  isOpen: boolean;
  onClose: () => void;
  toggleSignIn: () => void;
  onSignIn: () => void;
}

export interface SignUpState {
  isOpen: boolean;
  onClose: () => void;
  toggleSignIn: () => void;
}

export interface ProvidersState {
  children: ReactNode;
}

export type AllMenuItem = {
  id: number;
  title: string;
  desc: string;
  img: string;
  price: number;
  category: {
    slug: string;
  };
};

export type AllMenuCategory = {
  category: {
    slug: string;
    items: AllMenuItem[];
  };
};

export type AllMenuData = {
  menu: AllMenuCategory[];
};