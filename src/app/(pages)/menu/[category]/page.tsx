import CategoryPage from "@/app/components/Categories";
import React, { Suspense } from "react";
import Loading from "./loading";

function Categories() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <CategoryPage />
      </div>
    </Suspense>
  );
}

export default Categories;
