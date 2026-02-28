const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/";

// Get auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("skywhale_token");
  if (!token) {
    console.warn("No auth token found in localStorage");
    return {
      // Don't set Content-Type for multipart/form-data
    };
  }
  return {
    Authorization: `Bearer ${token}`,
    // Don't set Content-Type for multipart/form-data
  };
};

// Handle API errors
const handleResponse = async (response) => {
  // Check if response has JSON content
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    // If unauthorized, clear token and redirect
    if (response.status === 401) {
      localStorage.removeItem("skywhale_token");
      localStorage.removeItem("skywhale_user");
      window.location.href = "/admin-login";
    }
    throw new Error(data.error || `API Error: ${response.status}`);
  }

  return data;
};

// Client API
export const clientAPI = {
  // Get all clients
  getAll: async () => {
    try {
      const url = `${API_BASE}/api/clients`;
      console.log("📡 Calling API URL:", url);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("skywhale_token")}`,
        },
      });

      return handleResponse(response);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
      throw error;
    }
  },

  // Get single client by ID (public)
  getPublic: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/clients/public/id/${id}`);
      return handleResponse(response);
    } catch (error) {
      console.error("Failed to fetch public client:", error);
      throw error;
    }
  },

  // Get single client by ID (admin)
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("skywhale_token")}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Failed to fetch client by ID:", error);
      throw error;
    }
  },

  // Create new client with FormData (for file uploads)
  create: async (formData) => {
    try {
      console.log("📤 Creating client with FormData");
      const response = await fetch(`${API_BASE}/api/clients`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("skywhale_token")}`,
        },
        body: formData, // FormData handles Content-Type automatically
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Failed to create client:", error);
      throw error;
    }
  },

  // Update client with FormData
  update: async (id, formData) => {
    try {
      const response = await fetch(`${API_BASE}/api/clients/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("skywhale_token")}`,
        },
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Failed to update client:", error);
      throw error;
    }
  },

  // Delete client
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/clients/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("skywhale_token")}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Failed to delete client:", error);
      throw error;
    }
  },

  // Get client by subdomain (public)
  getBySubdomain: async (subdomain) => {
    try {
      const response = await fetch(
        `${API_BASE}/api/clients/public/${subdomain}`,
      );
      return handleResponse(response);
    } catch (error) {
      console.error("Failed to fetch client by subdomain:", error);
      throw error;
    }
  },
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  register: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("skywhale_token");
    localStorage.removeItem("skywhale_user");
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("skywhale_user");
    return userStr ? JSON.parse(userStr) : null;
  },
};

// Payment API
export const paymentAPI = {
  createOrder: async (clientId, amount, plan) => {
    try {
      const response = await fetch(`${API_BASE}/api/payments/create-order`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("skywhale_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientId, amount, plan }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Payment order creation failed:", error);
      throw error;
    }
  },
};
