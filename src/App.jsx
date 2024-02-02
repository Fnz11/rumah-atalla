/* eslint-disable no-unused-vars */
import "./App.css";
import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./pages/Products";
import Navbar from "./pages/Navbar";
import About from "./pages/About";
import Foods from "./pages/Foods";
import Carts from "./pages/Cart";
import Product from "./pages/Product";
// import Home from "./pages/Home";
import Transactions from "./pages/admin/Transaction";
import Account from "./pages/admin/Account";
import ProductControl from "./pages/admin/ProductControl";
import UserControl from "./pages/admin/UserControl";
import FoodsKasir from "./pages/kasir/Foods";
import PromoControl from "./pages/admin/PromoControl";
import SignIn from "./pages/SignIn";
import FashionsKasir from "./pages/kasir/Fashions";
import "swiper/css";
import NotFound4040 from "./pages/NotFound404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <About />,
      },
      // {
      //   path: "/about",
      //   element: <About />,
      // },
      // {
      //   path: "/products",
      //   element: <Products />,
      // },
      // {
      //   path: "/foods",
      //   element: <Foods />,
      // },
      // {
      //   path: "/cart",
      //   element: <Carts />,
      // },
      // {
      //   path: "/product",
      //   element: <Product />,
      // },
      {
        path: "/admin/transactions",
        element: <Transactions />,
      },
      {
        path: "/admin/dashboard",
        element: <Account />,
      },
      {
        path: "/admin/product",
        element: <ProductControl />,
      },
      {
        path: "/admin/promo",
        element: <PromoControl />,
      },
      {
        path: "/admin/user",
        element: <UserControl />,
      },
      {
        path: "/admin/foods",
        element: <FoodsKasir />,
      },
      {
        path: "/admin/fashions",
        element: <FashionsKasir />,
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "*",
    element: <NotFound4040 />,
  },
]);

function App() {
  return (
    <>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </>
  );
}

export default App;
