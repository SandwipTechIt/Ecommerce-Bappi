import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ScrollToTop from "../Layouts/scrollToTop";
import Home from "../Pages/Home";
import ProductDetails from "../Pages/productDetails";
import NotFound from "../Pages/NotFound";
import Products from "../Pages/products";
import Order from "../Pages/order";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <ScrollToTop />
      <MainLayout />
    </>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "product/:slug",
        element: <ProductDetails />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "order/:slug",
        element: <Order />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);