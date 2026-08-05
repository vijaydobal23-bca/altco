import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

/**
 * AuthRoute — wraps any page that requires the user to be logged in.
 * Redirects to /login if not logged in. Does not restrict by role.
 */
function AuthRoute({ children }) {
  const { user, handleGetMe, loading } = useAuth();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(()=>{
    handleGetMe().finally(() => setIsInitializing(false));
  },[])

  if (isInitializing || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFDE00]"></div>
      </div>
    );
  }

  if (!user ) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default AuthRoute;
