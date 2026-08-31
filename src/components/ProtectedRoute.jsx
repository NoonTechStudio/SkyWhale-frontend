import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Decode a JWT payload without a library. Returns null if it can't be read.
const decodeJwt = (token) => {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
};

const isTokenExpired = (token) => {
  const payload = decodeJwt(token);
  if (!payload || !payload.exp) return true;
  // treat as expired 10s early to avoid edge-of-window failures
  return Date.now() >= payload.exp * 1000 - 10_000;
};

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const clearAndReject = () => {
      localStorage.removeItem("skywhale_token");
      localStorage.removeItem("skywhale_user");
      setIsAuthenticated(false);
    };

    const token = localStorage.getItem("skywhale_token");
    const userStr = localStorage.getItem("skywhale_user");

    if (!token || !userStr) {
      clearAndReject();
      return;
    }

    // Expired / malformed token → force a fresh login instead of letting the
    // user into the dashboard only for every API call to 401.
    if (isTokenExpired(token)) {
      clearAndReject();
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (!user || !user.email) {
        clearAndReject();
        return;
      }
      setIsAuthenticated(true);
    } catch {
      clearAndReject();
    }
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
    return (
      <Navigate
        to="/admin-login?expired=1"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
