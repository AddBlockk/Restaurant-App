import React, { FC, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { get, ref } from "firebase/database";
import { auth } from "../firebase/firebaseConfig";
import { Product, Order } from "../../../types/category";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface OrderDetailsProps {
  order: Order;
  isOpen: boolean;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  isOpen,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="border-gray-200 flex-shrink-0">
          {order.items &&
            order.items.map((product: Product) => (
              <div key={product.id} className="flex items-center flex-wrap">
                <Image
                  src={product.img}
                  alt={product.title}
                  width={50}
                  height={50}
                />
                <div className="px-4 inline-grid max-w-[220px]">
                  <div className="text-lg font-medium " title={product.title}>
                    {product.title}
                  </div>
                  <div className="text-gray-500 inline-flex">
                    {product.quantity} x {product.price}
                  </div>
                </div>
              </div>
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
