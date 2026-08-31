// Strip any trailing slash so we never build `https://host//api/...`
const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5001").replace(
  /\/+$/,
  "",
);

export { API_BASE };

// ---------------------------------------------------------------------------
// Auth helpers
// ---------------------------------------------------------------------------

export const getToken = () => localStorage.getItem("skywhale_token") || "";

export const clearSession = () => {
  localStorage.removeItem("skywhale_token");
  localStorage.removeItem("skywhale_user");
};

const redirectToLogin = () => {
  if (typeof window !== "undefined" && !window.location.pathname.startsWith("/admin-login")) {
    window.location.href = "/admin-login?expired=1";
  }
};

// Thrown before a request is even made when there is no usable token.
export class SessionExpiredError extends Error {
  constructor(message = "Your session has expired. Please sign in again.") {
    super(message);
    this.name = "SessionExpiredError";
  }
}

// ---------------------------------------------------------------------------
// Core fetch wrapper — the single place that attaches the Authorization header
// ---------------------------------------------------------------------------

const handleResponse = async (response) => {
  // If the request was redirected (e.g. http->https, apex<->www, missing/extra
  // trailing slash on the API domain) the browser drops the Authorization
  // header on the way, which the backend then reports as "No token".
  // Surface that clearly instead of a confusing auth error.
  if (response.redirected) {
    throw new Error(
      `Request was redirected to ${response.url} and lost its login token. ` +
        `Check VITE_API_URL — it must point straight at the API with no ` +
        `http→https or www redirect.`,
    );
  }

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      clearSession();
      redirectToLogin();
    }
    const message =
      (data && data.error) ||
      (data && data.details) ||
      `Request failed (${response.status} ${response.statusText})`;
    throw new Error(message);
  }

  return data;
};

/**
 * authFetch — always used for admin (protected) endpoints.
 * Guarantees the Authorization header is present, or fails fast with a clear
 * message instead of sending "Bearer null" and getting a vague 401 back.
 *
 * @param {string} path  API path beginning with "/"
 * @param {object} opts  { method, body, json, headers }
 *                       - `json`: object -> sent as application/json
 *                       - `body`: sent as-is (use for FormData)
 */
const authFetch = async (path, opts = {}) => {
  const { method = "GET", headers = {}, body, json } = opts;

  const token = getToken();
  if (!token) {
    clearSession();
    redirectToLogin();
    throw new SessionExpiredError();
  }

  const finalHeaders = { Authorization: `Bearer ${token}`, ...headers };
  let payload = body;

  if (json !== undefined) {
    finalHeaders["Content-Type"] = "application/json";
    payload = JSON.stringify(json);
  }
  // NOTE: never set Content-Type for FormData — the browser adds the
  // multipart boundary itself.

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: finalHeaders,
    body: payload,
  });

  return handleResponse(response);
};

// Public (no-auth) GET helper
const publicFetch = async (path) => {
  const response = await fetch(`${API_BASE}${path}`);
  return handleResponse(response);
};

// ---------------------------------------------------------------------------
// Client API
// ---------------------------------------------------------------------------

export const clientAPI = {
  getAll: () => authFetch("/api/clients"),

  getById: (id) => authFetch(`/api/clients/${id}`),

  getPublic: (id) => publicFetch(`/api/clients/public/id/${id}`),

  getBySubdomain: (subdomain) =>
    publicFetch(`/api/clients/public/${subdomain}`),

  // `data` may be a FormData (with files) or a plain object (simple field update)
  create: (data) =>
    authFetch("/api/clients", {
      method: "POST",
      ...(data instanceof FormData ? { body: data } : { json: data }),
    }),

  update: (id, data) =>
    authFetch(`/api/clients/${id}`, {
      method: "PUT",
      ...(data instanceof FormData ? { body: data } : { json: data }),
    }),

  delete: (id) => authFetch(`/api/clients/${id}`, { method: "DELETE" }),
};

// ---------------------------------------------------------------------------
// Auth API
// ---------------------------------------------------------------------------

export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);
    if (!data || !data.token) {
      throw new Error("Login response did not include a token. Please try again.");
    }
    return data;
  },

  register: async (email, password) => {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  logout: () => {
    clearSession();
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("skywhale_user");
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },
};

// ---------------------------------------------------------------------------
// Payment API
// ---------------------------------------------------------------------------

export const paymentAPI = {
  createOrder: (clientId, amount, plan) =>
    authFetch("/api/payments/create-order", {
      method: "POST",
      json: { clientId, amount, plan },
    }),
};
