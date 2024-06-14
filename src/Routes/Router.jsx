import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./private/PrivateRoute";
import ProductList from "../pages/ProductList";
import ProductDetails from "../pages/ProductDetails";
import { CartProvider } from "../context/CartContext";
import CartProducts from "../pages/CartProducts";
import AddProducts from "../pages/AddProducts";
import MyProductList from "../pages/MyProductsList";
import EditProducts from "../pages/EditProducts";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CartProvider>
        <MainLayout />
      </CartProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "/cancel",
        element: (
          <PrivateRoute>
            <PaymentCancel />
          </PrivateRoute>
        ),
      },
      {
        path: "/productlist",
        element: (
          <PrivateRoute>
            <ProductList />
          </PrivateRoute>
        ),
      },
      {
        path: "/cartProducts",
        element: (
          <PrivateRoute>
            <CartProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-products",
        element: (
          <PrivateRoute>
            <AddProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-products",
        element: (
          <PrivateRoute>
            <MyProductList />
          </PrivateRoute>
        ),
      },
      {
        path: "/products/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://ecommerce-dashboard-server-awlu.onrender.com/products/${params.id}`
          ),
      },
      {
        path: "products/edit/:id",
        element: (
          <PrivateRoute>
            <EditProducts />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://ecommerce-dashboard-server-awlu.onrender.com/products/${params.id}`
          ),
      },
    ],
  },
]);
