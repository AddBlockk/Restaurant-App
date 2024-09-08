"use client";
import "react-loading-skeleton/dist/skeleton.css";
import { usePathname } from "next/navigation";
import Price from "@/app/components/Price";
import { Suspense, useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "@/app/firebase/firebaseConfig";
import Image from "next/image";
import Loading from "./loading";
import { Data, Product, Option } from "../../../../../../types";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import Categorories from "@/app/components/Categories";
import MenuPage from "../../page";
import Category from "../page";
import AllMenu from "@/app/components/AllMenu";

const ProductPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop() || "";
  const [data, setData] = useState<Data | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const optionsRef = ref(database, "options");
      const menuRef = ref(database, "menu");

      const [optionsSnapshot, menuSnapshot] = await Promise.all([
        get(optionsRef),
        get(menuRef),
      ]);

      const optionsData = optionsSnapshot.val() || [];
      const menuData = menuSnapshot.val() || [];

      setOptions(optionsData);
      setData({
        menu: menuData,
      });
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const product = data.menu
        .flatMap((item) => item.category.items)
        .find((item) => item.id === parseInt(id));

      if (product) {
        setProduct(product);
      }
    }
  }, [data, id]);

  return (
    <Suspense fallback={<Loading />}>
      {product && (
        <div className="p-4 lg:px-20 xl:px-40 justify-center items-center text-red-500 md:flex-row max-w-[1600px] m-auto">
          <div className="flex justify-center items-center md:gap-8">
            <div className="overflow-hidden flex justify-center relative">
              <IconButton
                onClick={() => router.back()}
                size="large"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  color: "rgb(239 68 68)",
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Image
                src={product.img}
                alt=""
                className="object-contain transition-all duration-500 hover:scale-90"
                width={400}
                height={400}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-4 dm:w-[50%] w-[900px]">
              <h1 className="text-2xl font-bold uppercase xl:text-3xl break-all hyphens-manual w-full mb-[10px]">
                {product.title}
              </h1>
              <p>{product.desc}</p>
              <Price
                price={product.price}
                id={product.id}
                options={
                  product.optionsId
                    ? options.filter((option) =>
                        product.optionsId.includes(option.id)
                      )
                    : []
                }
                title={product.title}
                img={product.img}
                desc={product.desc}
              />
            </div>
          </div>
          <AllMenu />
        </div>
      )}
    </Suspense>
  );
};

export default ProductPage;
