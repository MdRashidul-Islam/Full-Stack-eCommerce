import React, { lazy, Suspense } from "react";
import Loader from "../components/common/Loader/Loader";

const Header = lazy(() => import("../components/common/Header/Header"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const Banner = lazy(() => import("../components/home/Banner"));
const HomeProducts = lazy(() => import("../components/home/HomeProducts"));

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Header />
        <Banner />
        <HomeProducts />
        <Footer />
      </Suspense>
    </div>
  );
};

export default HomePage;
