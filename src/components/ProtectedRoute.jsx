import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("skywhale_token");
      const userStr = localStorage.getItem("skywhale_user");

      console.log("ProtectedRoute - Path:", location.pathname);
      console.log("ProtectedRoute - Token exists:", !!token);
      console.log("ProtectedRoute - User exists:", !!userStr);

      if (!token || !userStr) {
        console.log("ProtectedRoute - Not authenticated, redirecting to login");
        setIsAuthenticated(false);
        return;
      }

      try {
        const user = JSON.parse(userStr);
        if (!user || !user.email) {
          console.log("ProtectedRoute - Invalid user data");
          localStorage.removeItem("skywhale_token");
          localStorage.removeItem("skywhale_user");
          setIsAuthenticated(false);
          return;
        }

        console.log("ProtectedRoute - Authenticated as:", user.email);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("ProtectedRoute - Error parsing user:", error);
        localStorage.removeItem("skywhale_token");
        localStorage.removeItem("skywhale_user");
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [location]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("ProtectedRoute - Redirecting to /admin-login");
    return <Navigate to="/admin-login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
