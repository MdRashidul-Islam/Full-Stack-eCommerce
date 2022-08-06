import React, { lazy, Suspense } from "react";
import Loader from "../components/common/Loader/Loader";

const Header = lazy(() => import("../components/common/Header/Header"));
const Profile = lazy(() => import("../components/user/Profile"));

const ProfilePage = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Header />
        <Profile />
      </Suspense>
    </div>
  );
};

export default ProfilePage;
