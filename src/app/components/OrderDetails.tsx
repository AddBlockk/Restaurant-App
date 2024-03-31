import React from "react";
import { Product, Order } from "../../../types/category";
import Image from "next/image";
import Collapse from "@mui/material/Collapse";
import Grow from "@mui/material/Grow";

interface OrderDetailsProps {
  order: Order;
  isOpen: boolean;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  isOpen,
}) => {
  return (
    <Collapse in={isOpen} timeout={1}>
      <div className="border-gray-200 flex-shrink-0">
        {order.items &&
          order.items.map((product: Product, index) => (
            <Grow
              key={product.id}
              in={isOpen}
              timeout={{ enter: 1000, exit: 1000 }}
              style={{ transitionDelay: `${index * 100}ms` }}>
              <div
                key={product.id}
                className="flex items-center sm:flex-wrap mb-4">
                <Image
                  src={product.img}
                  alt={product.title}
                  width={50}
                  height={50}
                />
                <div className="px-4 sm:inline-grid max-w-[220px]">
                  <div
                    className="text-lg font-medium truncate"
                    title={product.title}>
                    {product.title}
                  </div>
                  <div className="text-gray-500 inline-flex">
                    {product.quantity} x {product.price}
                  </div>
                </div>
              </div>
            </Grow>
          ))}
      </div>
    </Collapse>
  );
};
