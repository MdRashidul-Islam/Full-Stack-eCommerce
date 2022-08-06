import React, { lazy, Suspense } from "react";
import Loader from "../components/common/Loader/Loader";

const Header = lazy(() => import("../components/common/Header/Header"));
const Products = lazy(() => import("../components/products/Products"));

const ProductPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Header />
        <Products />
      </Suspense>
    </div>
  );
};

export default ProductPage;
