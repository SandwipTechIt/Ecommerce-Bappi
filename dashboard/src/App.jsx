import { BrowserRouter as Router, Routes, Route } from "react-router";

import { ScrollToTop } from "./components/common/ScrollToTop";
import { setContext } from "./context/authContext";

import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import SignOut from "./pages/AuthPages/SignOut";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import UserProfiles from "./pages/UserProfiles";


import AddProduct from "./pages/product/addProduct";
import ProductEdit from "./pages/product/productEdit";
import AllProducts from "./pages/product/showProducts";
import StockOutProducts from "./pages/product/stockOutProducts";

import AllOrders from "./pages/order/showOrders";

import ProductDetails from "./pages/product/productDetails";
import ViewOrder from "./pages/order/viewOrder";
import AllStocks from "./pages/stocks/allStocks";
import Transaction from "./pages/transaction/transaction";
import AddTransaction from "./pages/transaction/addTransaction";
import AddCategory from "./pages/category/addCategory";
import AllCategories from "./pages/category/showAllCategory";

import CreateCoupon from "./pages/coupon/createCoupon";
import AllCoupons from "./pages/coupon/showAllCoupon";
import EditCoupon from "./pages/coupon/editCoupon";
import Courier from "./pages/courier/courier";

import OrdersByStatus from "./pages/order/ordersByStatus";
import ShowAllMessage from "./pages/message/showAllMessage";
import EditMessage from "./pages/message/editMessage";

import AddReview from "./pages/review/addReview";
import ShowAllReview from "./pages/review/showAllReview";


export default function App() {
  const { state } = setContext();
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {state.admin ? (
            <>
              {/* Dashboard Layout */}
              <Route element={<AppLayout />}>
                <Route index path="/" element={<Home />} />
                <Route path="/profile" element={<UserProfiles />} />
                <Route path="/addProduct" element={<AddProduct />} />
                <Route path="/allProducts" element={<AllProducts />} />
                <Route path="/stockOutProducts" element={<StockOutProducts />} />
                <Route path="/editProduct/:id" element={<ProductEdit />} />
                <Route path="/orders" element={<AllOrders />} />
                <Route path="/orders/:status" element={<OrdersByStatus />} />
                <Route path="/order/:id" element={<ViewOrder />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/stocks" element={<AllStocks />} />
                <Route path="/transactions" element={<Transaction />} />
                <Route path="/addTransaction" element={<AddTransaction />} />
                <Route path="/addCategory" element={<AddCategory />} />
                <Route path="/allCategories" element={<AllCategories />} />
                <Route path="/addCoupon" element={<CreateCoupon />} />
                <Route path="/allCoupon" element={<AllCoupons />} />
                <Route path="/editCoupon/:id" element={<EditCoupon />} />
                <Route path="/courier" element={<Courier />} />
                <Route path="/messages" element={<ShowAllMessage />} />
                <Route path="/replyMessage/:id" element={<EditMessage />} />
                <Route path="/addReview" element={<AddReview />} />
                <Route path="/allReview" element={<ShowAllReview />} />
              </Route>

              {/* Auth Layout */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signOut" element={<SignOut />} />

              {/* Fallback Route */}
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <Route path="/*" element={<SignIn />} />
          )}
        </Routes>
      </Router>
    </>
  );
}
