import React, { lazy, Suspense } from "react";
import Loader from "../components/common/Loader/Loader";
const Header = lazy(() => import("../components/common/Header/Header"));
const ProductDetails = lazy(() =>
  import("../components/products/ProductDetails")
);

const ProductDetailsPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Header />
        <ProductDetails />;
      </Suspense>
    </div>
  );
};

export default ProductDetailsPage;
