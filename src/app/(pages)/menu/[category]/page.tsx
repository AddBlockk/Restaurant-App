import CategoryPage from "@/app/components/Categories";
import React, { Suspense } from "react";
import Loading from "./loading";
// import DefaultLayout from "../../_layout/default";

function Categories() {
  return (
    // <DefaultLayout>
    <Suspense fallback={<Loading />}>
      <div>
        <CategoryPage />
      </div>
    </Suspense>
    // </DefaultLayout>
  );
}

export default Categories;
