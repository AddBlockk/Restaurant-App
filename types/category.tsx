export type Item = {
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

export interface CartItem {
  id: number;
  title: string;
  desc: string;
  img: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
  quantity: number;
}

export interface CounterState {
  value: number;
}
