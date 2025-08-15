import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ScrollToTop from "../Layouts/scrollToTop";
const Home = lazy(() => import("../Pages/Home"));
const ProductDetails = lazy(() => import("../Pages/productDetails"));
const NotFound = lazy(() => import("../Pages/NotFound"));

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
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);