import Notification from "@/app/components/Notification";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useRef } from "react";
// import { makeStore, AppStore } from "./lib/store";
import { Provider } from "react-redux";
import { Providers } from "./lib/provider";
// import { counterSlice } from "./lib/features/counter/counterSlice";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Доставка еды Boltach",
  description: "Доставка еды Boltach",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Notification />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
