"use client";

import { useState, useEffect } from "react";
import CategoryPage from "@/app/components/Categories";
import Loading from "../loading";

function Categories() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return <>{<CategoryPage />}</>;
}

export default Categories;
