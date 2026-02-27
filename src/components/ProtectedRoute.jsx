import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    console.log('ProtectedRoute - Current path:', window.location.pathname);
    console.log('ProtectedRoute - Token:', !!localStorage.getItem('skywhale_token'));
    const checkAuth = async () => {
      const token = localStorage.getItem('skywhale_token');
      const userStr = localStorage.getItem('skywhale_user');
      
      console.log('ProtectedRoute checking auth...');
      console.log('Token exists:', !!token);
      console.log('User exists:', !!userStr);
      
      if (!token || !userStr) {
        console.log('Missing token or user, redirecting to login');
        setIsAuthenticated(false);
        return;
      }
      
      try {
        // Optional: Validate token with backend
        // For now, just check if it exists
        const user = JSON.parse(userStr);
        
        // Basic validation
        if (!user || !user.email || !user.role) {
          console.log('Invalid user data in localStorage');
          localStorage.removeItem('skywhale_token');
          localStorage.removeItem('skywhale_user');
          setIsAuthenticated(false);
          return;
        }
        
        console.log('User authenticated:', user.email);
        setIsAuthenticated(true);
        
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('skywhale_token');
        localStorage.removeItem('skywhale_user');
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
          <p className="text-slate-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to /admin-login');
    return <Navigate to="/admin-login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;