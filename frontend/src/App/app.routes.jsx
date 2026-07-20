import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import SellerDashboard from "../features/seller/pages/SellerDashboard";
import CreateProduct from "../features/seller/pages/CreateProduct";
import ProductList from "../features/seller/pages/ProductList";
import ProtectedRoute from "../features/seller/components/ProtectedRoute";
import HomePage from "../features/Home/pages/HomePage";
import StorePage from "../features/Home/pages/StorePage";
import CartPage from "../features/Home/pages/CartPage";
import CheckoutPage from "../features/Home/pages/CheckoutPage";
import SellerOrders from "../features/seller/pages/SellerOrders";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/store",
    element: <StorePage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  // ─── Protected Seller Routes ─────────────────────────────────────────────────
  {
    path: "/seller",
    element: (
      <ProtectedRoute>
        <SellerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/seller/create",
    element: (
      <ProtectedRoute>
        <CreateProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/seller/products",
    element: (
      <ProtectedRoute>
        <ProductList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/seller/orders",
    element: (
      <ProtectedRoute>
        <SellerOrders />
      </ProtectedRoute>
    ),
  },
]);

export default routes;