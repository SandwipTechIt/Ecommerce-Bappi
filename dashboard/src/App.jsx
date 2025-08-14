import { BrowserRouter as Router, Routes, Route } from "react-router";


import { ScrollToTop } from "./components/common/ScrollToTop";
import { setContext } from "./context/authContext";


import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import SignOut from "./pages/AuthPages/SignOut";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import UserProfiles from "./pages/UserProfiles";
import AllProducts from "./pages/product/showProducts";
import AddProduct from "./pages/product/addProduct";
import ProductEdit from "./pages/product/productEdit";
import AllOrders from "./pages/order/showOrders";
import ViewOrder from "./pages/order/viewOrder";

export default function App() {
  const { state } = setContext();
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>

          {
            state.admin ? (
              <>
                {/* Dashboard Layout */}
                <Route element={<AppLayout />}>
                  <Route index path="/" element={<Home />} />
                  <Route path="/profile" element={<UserProfiles />} />
                  <Route path="/addProduct" element={<AddProduct />} />
                  <Route path="/allProducts" element={<AllProducts />} />
                  <Route path="/editProduct/:id" element={<ProductEdit />} />
                  <Route path="/orders" element={<AllOrders />} />
                  <Route path="/order/:id" element={<ViewOrder />} />
                </Route>

                {/* Auth Layout */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signOut" element={<SignOut />} />

                {/* Fallback Route */}
                <Route path="*" element={<NotFound />} />
              </>
            ) : (
              <Route path="/*" element={<SignIn />} />

            )
          }

        </Routes>
      </Router>
    </>
  );
}
