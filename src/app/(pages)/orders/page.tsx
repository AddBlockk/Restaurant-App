"use client";
import { useState, useEffect } from "react";
import { get, ref } from "firebase/database";
import { Product, Order } from "../../../../types";
import { database, auth } from "../../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { OrderDetails } from "../../components/OrderDetails";
import { Box, IconButton, Collapse } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

const arrowVariants = {
  up: { rotate: 180 },
  down: { rotate: 0 },
};

export default function OrdersPage() {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const ordersRef = ref(database, `users/${userId}/orders`);

    get(ordersRef).then((snapshot) => {
      const ordersData: Order[] = [];
      snapshot.forEach((childSnapshot) => {
        ordersData.push({
          ...childSnapshot.val(),
          id: childSnapshot.key,
          isDetailsOpen: false,
        });
      });
      setOrders(ordersData);
      setIsLoading(false);
    });
  }, [user]);

  const handleOrderDetailsClick = (order: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === order.id ? { ...o, isDetailsOpen: !o.isDetailsOpen } : o
      )
    );
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      {orders.length > 0 && user ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-separate border-spacing-3">
            <thead>
              <tr className="text-left">
                <th className="hidden md:block py-2">Заказ</th>
                <th className="py-2">Дата</th>
                <th className="py-2 text-center">Цена</th>
                <th className="py-2 text-center hidden md:table-cell">
                  Статус
                </th>
                <th className="py-2 hidden md:flex justify-center"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <>
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 w-full"
                  >
                    <td className="hidden md:block py-2 pr-[80px]">
                      {order.id}
                    </td>
                    <td className="py-2 w-[40%] md:w-[20%]">{order.date}</td>
                    <td className="py-2 w-[40%] md:w-[20%] text-center">
                      {order.totalPrice}
                    </td>
                    <td className="py-2 w-[20%] text-center hidden md:table-cell">
                      {order.status}
                    </td>
                    <td className="py-2 sm:inline-flex md:flex justify-center md:justify-center">
                      <IconButton
                        onClick={() => handleOrderDetailsClick(order)}
                        aria-label="expand row"
                        size="small"
                      >
                        <motion.div
                          animate={order.isDetailsOpen ? "up" : "down"}
                          variants={arrowVariants}
                          transition={{ duration: 0.5 }}
                        >
                          <ExpandMoreIcon />
                        </motion.div>
                      </IconButton>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5}>
                      <Collapse
                        in={order.isDetailsOpen}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 1 }}>
                          <OrderDetails
                            order={order}
                            isOpen={order.isDetailsOpen}
                          />
                        </Box>
                      </Collapse>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex h-[100vh] items-center text-[24px] justify-center">
          <div className="mb-36">У вас нету заказов</div>
        </div>
      )}
    </div>
  );
}
