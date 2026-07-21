import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * AuthRoute — wraps any page that requires the user to be logged in.
 * Redirects to /login if not logged in. Does not restrict by role.
 */
function AuthRoute({ children }) {
  const { user } = useAuth();

  if (!user ) {
    return <Navigate to="/login" replace />;
  }
  if (user && !user.isVerified) {
    return (
      <div className="min-h-screen bg-[#FFDE00] flex flex-col items-center justify-center text-[#360215] p-5 text-center">
        <h1 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tight">Account Not Verified</h1>
        <p className="text-lg md:text-xl font-medium max-w-md">
          Please check your email and click the verification link to unlock access to Alt Co.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-8 px-8 py-4 bg-[#360215] text-[#FFDE00] font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          I've verified my email
        </button>
      </div>
    );
  }

  return children;
}

export default AuthRoute;
