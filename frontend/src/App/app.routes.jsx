import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import SellerDashboard from "../features/seller/pages/SellerDashboard";
import CreateProduct from "../features/seller/pages/CreateProduct";
import ProtectedRoute from "../features/seller/components/ProtectedRoute";
import AuthRoute from "../features/auth/components/AuthRoute";
import HomePage from "../features/Home/pages/HomePage";
import StorePage from "../features/Home/pages/StorePage";
import CartPage from "../features/Home/pages/CartPage";
import CheckoutPage from "../features/Home/pages/CheckoutPage";
import OrderHistoryPage from "../features/Home/pages/OrderHistoryPage";
import SellerOrders from "../features/seller/pages/SellerOrders";
import AltMenu from "../features/Home/components/AltMenu";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <HomePage />
      </AuthRoute>
    ),
  },
  {
    path: "/alt-menu",
    element: (
      <AuthRoute>
        <AltMenu />
      </AuthRoute>
    ),
  },
  {
    path: "/store",
    element: (
      <AuthRoute>
        <StorePage />
      </AuthRoute>
    ),
  },
  {
    path: "/cart",
    element: (
      <AuthRoute>
        <CartPage />
      </AuthRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <AuthRoute>
        <CheckoutPage />
      </AuthRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <AuthRoute>
        <OrderHistoryPage />
      </AuthRoute>
    ),
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
    path: "/seller/orders",
    element: (
      <ProtectedRoute>
        <SellerOrders />
      </ProtectedRoute>
    ),
  },
]);

export default routes;
