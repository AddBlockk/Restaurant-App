"use client";

import { useState, useEffect } from "react";
import CategoryPage from "../../../components/Categories";
import Loading from "../loading";
// import Skeleton from "./Skeleton";

function Categories() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return <div>{loading ? <Loading /> : <CategoryPage />}</div>;
}

export default Categories;
