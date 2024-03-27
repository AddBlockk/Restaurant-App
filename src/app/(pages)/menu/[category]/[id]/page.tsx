"use client";
import "react-loading-skeleton/dist/skeleton.css";
import { usePathname } from "next/navigation";
import Price from "@/app/components/Price";
import { Suspense, useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "@/app/firebase/firebaseConfig";
import Image from "next/image";
import Loading from "./loading";
import { Data, Product, Option } from "../../../../../../types/category";

const ProductPage = () => {
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
        <div className="p-4 lg:px-20 xl:px-40 flex flex-col justify-center items-center text-red-500 md:flex-row md:gap-8">
          <div className="overflow-hidden flex justify-center w-[100%] dm:w-[50%]">
            <Image
              src={product.img}
              alt=""
              className="object-contain transition-all duration-500 hover:rotate-[60deg] hover:scale-90"
              width={600}
              height={600}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8 dm:w-[50%]">
            <h1 className="text-2xl font-bold uppercase xl:text-5xl break-all hyphens-manual w-full mb-[10px]">
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
            />
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default ProductPage;
