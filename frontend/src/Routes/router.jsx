import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ScrollToTop from "../Layouts/scrollToTop";
import Home from "../Pages/Home";
import ProductDetails from "../Pages/productDetails";
import NotFound from "../Pages/NotFound";
import Products from "../Pages/products";
import Order from "../Pages/order";
import Categories from "../Pages/categories";
import Category from "../Pages/category";
import About from "../Pages/about";
import Privacy from "../Pages/privacy";
import Contact from "../Pages/contact";
import Thanks from "../Pages/thanks";

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
        path: "products",
        element: <Products />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "category/:id",
        element: <Category />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "product/:slug",
        element: <ProductDetails />,
      },
      {
        path: "order/:slug",
        element: <Order />,
      },
      {
        path: "privacy-policy",
        element: <Privacy />,
      },
      {
        path: "thanks",
        element: <Thanks />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);