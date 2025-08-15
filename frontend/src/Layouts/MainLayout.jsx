import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/navbar/Navbar";
import Footer from "../Components/Ui/Footer";
import { LoadingSpinner } from "../Components/Ui/Loader";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <div className="mt-[70px]">
          <Outlet />
        </div>
      </Suspense>
      <Footer />
    </>
  );
};

export default MainLayout;
