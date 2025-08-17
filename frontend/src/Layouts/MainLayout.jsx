import { Outlet } from "react-router-dom";
import Navbar from "../Components/navbar/Navbar";
import Footer from "../Components/Ui/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
        <div className="mt-[70px]">
          <Outlet />
        </div>
      <Footer />
    </>
  );
};

export default MainLayout;
