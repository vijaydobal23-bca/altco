import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

/**
 * ProtectedRoute — wraps any seller-only page.
 * Redirects to /login if not logged in, or / if role is not seller.
 */
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "seller") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
