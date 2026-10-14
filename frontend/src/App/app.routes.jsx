import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// ─── Route-guard components (kept as static imports – they're tiny and always needed) ──
import ProtectedRoute from "../features/seller/components/ProtectedRoute";
import AuthRoute from "../features/auth/components/AuthRoute";
import ErrorBoundary from "./ErrorBoundary";

// ─── Lazy-loaded page components ──────────────────────────────────────────────
const Login = lazy(() => import("../features/auth/pages/Login"));
const Register = lazy(() => import("../features/auth/pages/Register"));
const SellerDashboard = lazy(() => import("../features/seller/pages/SellerDashboard"));
const CreateProduct = lazy(() => import("../features/seller/pages/CreateProduct"));
const SellerOrders = lazy(() => import("../features/seller/pages/SellerOrders"));
const HomePage = lazy(() => import("../features/Home/pages/HomePage"));
const StorePage = lazy(() => import("../features/Home/pages/StorePage"));
const CartPage = lazy(() => import("../features/Home/pages/CartPage"));
const CheckoutPage = lazy(() => import("../features/Home/pages/CheckoutPage"));
const OrderHistoryPage = lazy(() => import("../features/Home/pages/OrderHistoryPage"));
const AltMenu = lazy(() => import("../features/Home/components/AltMenu"));
const NotificationsPage = lazy(() => import("../features/Home/pages/NotificationsPage"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <ErrorBoundary>
          <HomePage />
        </ErrorBoundary>
      </AuthRoute>
    ),
  },
  {
    path: "/alt-menu",
    element: (
      <AuthRoute>
        <ErrorBoundary>
          <AltMenu />
        </ErrorBoundary>
      </AuthRoute>
    ),
  },
  {
    path: "/store",
    element: (
      <AuthRoute>
        <ErrorBoundary>
          <StorePage />
        </ErrorBoundary>
      </AuthRoute>
    ),
  },
  {
    path: "/cart",
    element: (
      <AuthRoute>
        <ErrorBoundary>
          <CartPage />
        </ErrorBoundary>
      </AuthRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <AuthRoute>
        <ErrorBoundary>
          <CheckoutPage />
        </ErrorBoundary>
      </AuthRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <AuthRoute>
        <ErrorBoundary>
          <OrderHistoryPage />
        </ErrorBoundary>
      </AuthRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <AuthRoute>
        <ErrorBoundary>
          <NotificationsPage />
        </ErrorBoundary>
      </AuthRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <ErrorBoundary>
        <Login />
      </ErrorBoundary>
    ),
  },
  {
    path: "/register",
    element: (
      <ErrorBoundary>
        <Register />
      </ErrorBoundary>
    ),
  },

  // ─── Protected Seller Routes ─────────────────────────────────────────────────
  {
    path: "/seller",
    element: (
      <ProtectedRoute>
        <ErrorBoundary>
          <SellerDashboard />
        </ErrorBoundary>
      </ProtectedRoute>
    ),
  },
  {
    path: "/seller/create",
    element: (
      <ProtectedRoute>
        <ErrorBoundary>
          <CreateProduct />
        </ErrorBoundary>
      </ProtectedRoute>
    ),
  },
  {
    path: "/seller/orders",
    element: (
      <ProtectedRoute>
        <ErrorBoundary>
          <SellerOrders />
        </ErrorBoundary>
      </ProtectedRoute>
    ),
  },
]);

export default routes;
