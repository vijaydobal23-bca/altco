import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * AuthRoute — wraps any page that requires the user to be logged in.
 * Redirects to /login if not logged in. Does not restrict by role.
 */
function AuthRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AuthRoute;
