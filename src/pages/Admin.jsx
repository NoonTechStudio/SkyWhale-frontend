// src/pages/Admin.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Save,
  Users,
  Eye,
  Copy,
  CheckCircle,
  Package,
  LogOut,
  AlertCircle,
  RefreshCw,
  Trash2,
  Upload,
  Plus,
  X,
  Clock,
  MapPin,
  Link2,
  CreditCard,
  Image as ImageIcon,
  Globe,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  ChevronDown,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  Building2,
  User,
  Tag,
  Settings,
  QrCode,
  Banknote,
  Briefcase,
  ShoppingBag,
  Edit2,
  Search,
  Filter,
  Download,
  MoreVertical,
  Check,
  AlertTriangle,
  Info,
  Loader,
  Sun,
  Moon,
  Lock,
  LogIn,
  Clock as ClockIcon,
  Shield,
  Bell,
  Menu,
  Grid,
  List,
  Star,
  TrendingUp,
  Award,
  Gift,
  UsersRound,
  PieChart,
  Activity,
  Calendar as CalendarIcon,
  ExternalLink,
  Smartphone,
  Tablet,
  Laptop,
  Globe2,
  Zap,
  Sparkles,
  Palette,
  Layout,
  Layers,
  Crop,
  Image,
  FileText,
  Settings2,
} from "lucide-react";
import { clientAPI } from "../services/api";

// Session timeout in milliseconds (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;

const Admin = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [editingClient, setEditingClient] = useState(null);
  const [form, setForm] = useState({
    // Basic Info
    businessName: "",
    businessLogo: null,
    ownerName: "",
    ownerTitle: "",
    tagline: "",

    // Contact Info
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    googleMapsUrl: "",

    // Business Type
    businessType: "service",

    // Working Hours
    workingHours: [
      { day: "Monday", open: "09:00", close: "18:00", closed: false },
      { day: "Tuesday", open: "09:00", close: "18:00", closed: false },
      { day: "Wednesday", open: "09:00", close: "18:00", closed: false },
      { day: "Thursday", open: "09:00", close: "18:00", closed: false },
      { day: "Friday", open: "09:00", close: "18:00", closed: false },
      { day: "Saturday", open: "10:00", close: "16:00", closed: false },
      { day: "Sunday", open: "00:00", close: "00:00", closed: true },
    ],

    // Social Media
    social: {
      instagram: "",
      facebook: "",
      linkedin: "",
      youtube: "",
    },

    // Services/Products
    items: [{ name: "", description: "", price: "" }],

    // Gallery
    gallery: [],

    // Payment Details
    payment: {
      upiId: "",
      qrCode: null,
      acceptedMethods: [],
      bankDetails: {
        accountHolder: "",
        accountNumber: "",
        ifscCode: "",
        bankName: "",
        accountType: "current",
      },
    },

    // Template
    template: "aura",
  });

  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  const [qrPreview, setQrPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterTemplate, setFilterTemplate] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  // Session management
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showSessionWarning, setShowSessionWarning] = useState(false);

  // Theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Session timeout handler
  const resetSessionTimer = useCallback(() => {
    setLastActivity(Date.now());
    setShowSessionWarning(false);
  }, []);

  useEffect(() => {
    const handleActivity = () => {
      resetSessionTimer();
    };

    // Track user activity
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("scroll", handleActivity);

    // Session timeout checker
    const interval = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivity;

      // Show warning 1 minute before timeout
      if (
        timeSinceLastActivity >= SESSION_TIMEOUT - 60000 &&
        !showSessionWarning
      ) {
        setShowSessionWarning(true);
      }

      // Auto logout after timeout
      if (timeSinceLastActivity >= SESSION_TIMEOUT) {
        handleLogout();
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      clearInterval(interval);
    };
  }, [lastActivity, showSessionWarning, resetSessionTimer]);

  // Fetch clients on component mount
  useEffect(() => {
    fetchClients();
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("adminTheme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    // Apply filters and search
    let filtered = [...clients];

    if (searchTerm) {
      filtered = filtered.filter(
        (client) =>
          client.businessName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          client.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.phone?.includes(searchTerm),
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter(
        (client) => client.businessType === filterType,
      );
    }

    if (filterTemplate !== "all") {
      filtered = filtered.filter(
        (client) => client.template === filterTemplate,
      );
    }

    setFilteredClients(filtered);
  }, [searchTerm, filterType, filterTemplate, clients]);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await clientAPI.getAll();
      // Process client data to ensure image URLs are properly formatted
      const processedData = data.map((client) => ({
        ...client,
        businessLogo: client.businessLogo
          ? getFullImageUrl(client.businessLogo)
          : null,
      }));
      setClients(processedData);
      setFilteredClients(processedData);
    } catch (err) {
      setError("Failed to load clients: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getFullImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    // Adjust this based on your backend URL
    return `http://localhost:5001${url}`;
  };

  const businessTypes = [
    {
      id: "service",
      name: "Service Based",
      icon: "💼",
      description: "Salon, Clinic, Consulting",
    },
    {
      id: "product",
      name: "Product Based",
      icon: "🛍️",
      description: "Retail, E-commerce, Store",
    },
  ];

  const templates = [
    {
      id: "aura",
      name: "Aura",
      fullName: "Aura Template",
      price: "₹999/year",
      gradient: "from-blue-500 to-cyan-500",
      lightGradient: "from-blue-400 to-cyan-400",
      icon: "✨",
      description: "Basic Digital Card",
      features: [
        "Responsive Design",
        "WhatsApp Integration",
        "UPI Payment QR",
        "Gallery Support",
        "Working Hours Display",
      ],
    },
    {
      id: "vertex",
      name: "Vertex",
      fullName: "Vertex Template",
      price: "₹1499/year",
      gradient: "from-purple-500 to-pink-500",
      lightGradient: "from-purple-400 to-pink-400",
      icon: "💎",
      description: "Premium Business Card",
      features: [
        "All Aura Features",
        "Advanced Analytics",
        "Custom Domain",
        "Priority Support",
        "Multiple Pages",
      ],
    },
    {
      id: "nexus",
      name: "Nexus",
      fullName: "Nexus Template",
      price: "₹1999/year",
      gradient: "from-green-500 to-emerald-500",
      lightGradient: "from-green-400 to-emerald-400",
      icon: "⚡",
      description: "Elite Digital Presence",
      features: [
        "All Vertex Features",
        "AI-Powered Insights",
        "CRM Integration",
        "Team Management",
        "API Access",
      ],
    },
  ];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, businessLogo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle QR code upload
  const handleQrUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        payment: { ...form.payment, qrCode: file },
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle gallery images upload
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    const newGallery = [...form.gallery, ...files];
    setForm({ ...form, gallery: newGallery });

    // Create previews
    const newPreviews = [...galleryPreviews];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        setGalleryPreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove gallery image
  const removeGalleryImage = (index) => {
    const newGallery = form.gallery.filter((_, i) => i !== index);
    const newPreviews = galleryPreviews.filter((_, i) => i !== index);
    setForm({ ...form, gallery: newGallery });
    setGalleryPreviews(newPreviews);
  };

  // Handle working hours change
  const handleWorkingHoursChange = (index, field, value) => {
    const newWorkingHours = [...form.workingHours];
    newWorkingHours[index][field] = value;
    setForm({ ...form, workingHours: newWorkingHours });
  };

  // Toggle closed day
  const toggleClosedDay = (index) => {
    const newWorkingHours = [...form.workingHours];
    newWorkingHours[index].closed = !newWorkingHours[index].closed;
    setForm({ ...form, workingHours: newWorkingHours });
  };

  // Handle items (services/products)
  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { name: "", description: "", price: "" }],
    });
  };

  const removeItem = (index) => {
    const newItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: newItems });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...form.items];
    newItems[index][field] = value;
    setForm({ ...form, items: newItems });
  };

  // Handle payment methods
  const togglePaymentMethod = (method) => {
    const currentMethods = form.payment.acceptedMethods;
    if (currentMethods.includes(method)) {
      setForm({
        ...form,
        payment: {
          ...form.payment,
          acceptedMethods: currentMethods.filter((m) => m !== method),
        },
      });
    } else {
      setForm({
        ...form,
        payment: {
          ...form.payment,
          acceptedMethods: [...currentMethods, method],
        },
      });
    }
  };

  // Edit client handler
  const handleEdit = (client) => {
    setEditingClient(client);
    setForm({
      businessName: client.businessName || "",
      businessLogo: null,
      ownerName: client.ownerName || "",
      ownerTitle: client.ownerTitle || "",
      tagline: client.tagline || "",
      phone: client.phone || "",
      whatsapp: client.whatsapp || "",
      email: client.email || "",
      address: client.address || "",
      googleMapsUrl: client.googleMapsUrl || "",
      businessType: client.businessType || "service",
      workingHours: client.workingHours || form.workingHours,
      social: client.social || form.social,
      items: client.items?.length
        ? client.items
        : [{ name: "", description: "", price: "" }],
      gallery: [],
      payment: client.payment || form.payment,
      template: client.template || "aura",
    });

    // Set previews if images exist
    if (client.businessLogo) {
      setLogoPreview(getFullImageUrl(client.businessLogo));
    }

    if (client.payment?.qrCode) {
      setQrPreview(getFullImageUrl(client.payment.qrCode));
    }

    setActiveTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Template change handler
  const handleTemplateChange = async (clientId, newTemplate) => {
    try {
      setLoading(true);
      const result = await clientAPI.update(clientId, {
        template: newTemplate,
      });
      if (result) {
        setSuccess("Template updated successfully!");
        await fetchClients();
      }
    } catch (err) {
      setError("Failed to update template: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();

      // Append all form fields
      Object.keys(form).forEach((key) => {
        if (
          key === "workingHours" ||
          key === "social" ||
          key === "items" ||
          key === "payment"
        ) {
          formData.append(key, JSON.stringify(form[key]));
        } else if (
          key !== "businessLogo" &&
          key !== "gallery" &&
          form[key] !== null
        ) {
          formData.append(key, form[key]);
        }
      });

      // Files
      if (form.businessLogo) {
        formData.append("businessLogo", form.businessLogo);
      }

      if (form.payment.qrCode) {
        formData.append("qrCode", form.payment.qrCode);
      }

      form.gallery.forEach((image) => {
        formData.append(`gallery`, image);
      });

      let result;
      if (editingClient) {
        // Update existing client
        result = await clientAPI.update(editingClient._id, formData);
        setSuccess("Client updated successfully!");
      } else {
        // Create new client
        result = await clientAPI.create(formData);
        setSuccess("Client created successfully!");
      }

      if (result) {
        setGeneratedUrl(
          result.url ||
            `https://${result.settings?.subdomain || result.subdomain}.skywhale.in`,
        );

        await fetchClients();
        resetForm();
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to save client: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      businessName: "",
      businessLogo: null,
      ownerName: "",
      ownerTitle: "",
      tagline: "",
      phone: "",
      whatsapp: "",
      email: "",
      address: "",
      googleMapsUrl: "",
      businessType: "service",
      workingHours: [
        { day: "Monday", open: "09:00", close: "18:00", closed: false },
        { day: "Tuesday", open: "09:00", close: "18:00", closed: false },
        { day: "Wednesday", open: "09:00", close: "18:00", closed: false },
        { day: "Thursday", open: "09:00", close: "18:00", closed: false },
        { day: "Friday", open: "09:00", close: "18:00", closed: false },
        { day: "Saturday", open: "10:00", close: "16:00", closed: false },
        { day: "Sunday", open: "00:00", close: "00:00", closed: true },
      ],
      social: {
        instagram: "",
        facebook: "",
        linkedin: "",
        youtube: "",
      },
      items: [{ name: "", description: "", price: "" }],
      gallery: [],
      payment: {
        upiId: "",
        qrCode: null,
        acceptedMethods: [],
        bankDetails: {
          accountHolder: "",
          accountNumber: "",
          ifscCode: "",
          bankName: "",
          accountType: "current",
        },
      },
      template: "aura",
    });
    setEditingClient(null);
    setLogoPreview(null);
    setQrPreview(null);
    setGalleryPreviews([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("skywhale_token");
    localStorage.removeItem("skywhale_user");
    window.location.href = "/admin-login";
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSuccess("Copied to clipboard!");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleDelete = async (clientId) => {
    if (!window.confirm("Are you sure you want to delete this client?")) {
      return;
    }

    try {
      await clientAPI.delete(clientId);
      setClients(clients.filter((client) => client._id !== clientId));
      setSuccess("Client deleted successfully!");
    } catch (err) {
      setError("Failed to delete client: " + err.message);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("adminTheme", newTheme ? "dark" : "light");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      }`}
    >
      {/* Session Warning Modal */}
      {showSessionWarning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slideUp">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ClockIcon size={32} className="text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Session Expiring Soon
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Your session will expire in 1 minute due to inactivity. Click
              anywhere to stay logged in.
            </p>
            <button
              onClick={resetSessionTimer}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Stay Logged In
            </button>
          </div>
        </div>
      )}

      {/* Admin Header with Stats */}
      <div
        className={`sticky top-0 z-40 ${
          isDarkMode
            ? "bg-gray-900/95 border-gray-800"
            : "bg-white/95 border-indigo-100"
        } backdrop-blur-xl border-b shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div>
                <h1
                  className={`text-3xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  SkyWhale Admin
                </h1>
                <p
                  className={`text-sm ${isDarkMode ? "text-gray-400" : "text-indigo-600"}`}
                >
                  Manage your digital business cards
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl transition-all ${
                  isDarkMode
                    ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                    : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                }`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Stats Badge */}
              <div
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl ${
                  isDarkMode ? "bg-gray-800" : "bg-indigo-50"
                }`}
              >
                <Users
                  size={18}
                  className={isDarkMode ? "text-indigo-400" : "text-indigo-600"}
                />
                <span
                  className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  {clients.length}
                </span>
                <span
                  className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  clients
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isDarkMode
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    : "bg-red-50 text-red-600 hover:bg-red-100"
                }`}
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 pb-4">
            <div
              className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-sm`}
            >
              <p
                className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Total Clients
              </p>
              <p
                className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                {clients.length}
              </p>
            </div>
            <div
              className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-sm`}
            >
              <p
                className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Service Based
              </p>
              <p
                className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                {clients.filter((c) => c.businessType === "service").length}
              </p>
            </div>
            <div
              className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-sm`}
            >
              <p
                className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Product Based
              </p>
              <p
                className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                {clients.filter((c) => c.businessType === "product").length}
              </p>
            </div>
            <div
              className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-sm`}
            >
              <p
                className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Active Templates
              </p>
              <p
                className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                {new Set(clients.map((c) => c.template)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className={`border-b sticky top-20 z-30 backdrop-blur-xl ${
          isDarkMode
            ? "bg-gray-900/95 border-gray-800"
            : "bg-white/95 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            {[
              {
                id: "add",
                label: editingClient ? "Edit Client" : "Add New",
                icon: editingClient ? Edit2 : Save,
              },
              { id: "view", label: "All Clients", icon: Users },
              { id: "templates", label: "Templates", icon: Package },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === "add" && !editingClient) {
                    resetForm();
                  }
                }}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-all relative ${
                  activeTab === tab.id
                    ? isDarkMode
                      ? "text-indigo-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-400"
                      : "text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600"
                    : isDarkMode
                      ? "text-gray-500 hover:text-gray-300"
                      : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
                {tab.id === "view" && clients.length > 0 && (
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                      isDarkMode
                        ? "bg-indigo-500/20 text-indigo-400"
                        : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    {clients.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Error and Success Messages */}
        {error && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center justify-between animate-slideDown ${
              isDarkMode
                ? "bg-red-500/20 border border-red-500/30"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDarkMode ? "bg-red-500/30" : "bg-red-100"
                }`}
              >
                <AlertTriangle
                  className={isDarkMode ? "text-red-400" : "text-red-600"}
                  size={20}
                />
              </div>
              <span className={isDarkMode ? "text-red-400" : "text-red-700"}>
                {error}
              </span>
            </div>
            <button
              onClick={() => setError("")}
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isDarkMode
                  ? "bg-red-500/30 text-red-400 hover:bg-red-500/40"
                  : "bg-red-100 text-red-600 hover:bg-red-200"
              }`}
            >
              ×
            </button>
          </div>
        )}

        {success && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center justify-between animate-slideDown ${
              isDarkMode
                ? "bg-green-500/20 border border-green-500/30"
                : "bg-green-50 border border-green-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDarkMode ? "bg-green-500/30" : "bg-green-100"
                }`}
              >
                <CheckCircle
                  className={isDarkMode ? "text-green-400" : "text-green-600"}
                  size={20}
                />
              </div>
              <span
                className={isDarkMode ? "text-green-400" : "text-green-700"}
              >
                {success}
              </span>
            </div>
            <button
              onClick={() => setSuccess("")}
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isDarkMode
                  ? "bg-green-500/30 text-green-400 hover:bg-green-500/40"
                  : "bg-green-100 text-green-600 hover:bg-green-200"
              }`}
            >
              ×
            </button>
          </div>
        )}

        {/* Add/Edit Client Tab */}
        {activeTab === "add" && (
          <div
            className={`rounded-3xl shadow-2xl p-6 lg:p-8 transition-colors ${
              isDarkMode ? "bg-gray-800/90 backdrop-blur-xl" : "bg-white"
            }`}
          >
            {generatedUrl ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce">
                  <CheckCircle className="text-white" size={48} />
                </div>
                <h2
                  className={`text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent`}
                >
                  {editingClient
                    ? "Client Updated Successfully!"
                    : "Client Added Successfully!"}
                </h2>
                <p
                  className={
                    isDarkMode ? "text-gray-400 mb-8" : "text-gray-600 mb-8"
                  }
                >
                  Share this URL with your client
                </p>

                <div
                  className={`max-w-2xl mx-auto p-6 rounded-2xl mb-6 ${
                    isDarkMode
                      ? "bg-gray-700/50 border border-gray-600"
                      : "bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"
                  }`}
                >
                  <code
                    className={
                      isDarkMode ? "text-indigo-400" : "text-indigo-600"
                    }
                  >
                    {generatedUrl}
                  </code>
                </div>

                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={() => copyToClipboard(generatedUrl)}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 flex items-center gap-2 transition-all hover:scale-105 shadow-lg"
                  >
                    <Copy size={20} />
                    Copy URL
                  </button>
                  <button
                    onClick={() => {
                      setGeneratedUrl("");
                      setActiveTab("view");
                    }}
                    className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 flex items-center gap-2 transition-all"
                  >
                    <Eye size={20} />
                    View All Clients
                  </button>
                  <button
                    onClick={() => {
                      setGeneratedUrl("");
                      resetForm();
                    }}
                    className={`border-2 px-8 py-4 rounded-xl font-semibold transition-all ${
                      isDarkMode
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {editingClient ? "Edit Again" : "Add Another Client"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                        editingClient
                          ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                          : "bg-gradient-to-br from-indigo-500 to-purple-500"
                      }`}
                    >
                      {editingClient ? (
                        <Edit2 className="text-white" size={24} />
                      ) : (
                        <Save className="text-white" size={24} />
                      )}
                    </div>
                    <div>
                      <h2
                        className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {editingClient
                          ? "Edit Business Card"
                          : "Create New Business Card"}
                      </h2>
                      {editingClient && (
                        <p
                          className={
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }
                        >
                          Editing:{" "}
                          <span className="font-semibold text-indigo-600">
                            {editingClient.businessName}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                  {editingClient && (
                    <button
                      onClick={resetForm}
                      className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <X size={18} />
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Template Selection */}
                  <div
                    className={`rounded-2xl p-6 border-2 ${
                      isDarkMode
                        ? "bg-gray-700/50 border-gray-600"
                        : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200"
                    }`}
                  >
                    <label
                      className={`block text-sm font-bold mb-4 flex items-center gap-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <Package size={18} className="text-indigo-600" />
                      Choose Template *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
                            form.template === template.id
                              ? "ring-2 ring-indigo-600 shadow-xl scale-105"
                              : isDarkMode
                                ? "hover:shadow-lg hover:scale-102 bg-gray-800"
                                : "hover:shadow-lg hover:scale-102 bg-white"
                          }`}
                          onClick={() =>
                            setForm({ ...form, template: template.id })
                          }
                        >
                          <div
                            className={`bg-gradient-to-r ${template.gradient} p-6 text-white`}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-3xl">{template.icon}</span>
                              {form.template === template.id && (
                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                  <Check
                                    size={14}
                                    className="text-indigo-600"
                                  />
                                </div>
                              )}
                            </div>
                            <h3 className="font-bold text-lg">
                              {template.fullName}
                            </h3>
                            <p className="text-sm opacity-90 mt-1">
                              {template.description}
                            </p>
                            <div className="mt-4 text-xl font-bold">
                              {template.price}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div
                    className={`rounded-2xl border-2 p-6 space-y-6 ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-800"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <h3
                      className={`text-lg font-bold flex items-center gap-2 pb-2 border-b ${
                        isDarkMode
                          ? "text-white border-gray-600"
                          : "text-gray-900 border-gray-200"
                      }`}
                    >
                      <Building2 size={20} className="text-indigo-600" />
                      Basic Information
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Business Name */}
                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Business Name *
                        </label>
                        <div className="relative">
                          <Building2
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="text"
                            required
                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-0 transition-all ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                            placeholder="e.g., Sharma Medical Store"
                            value={form.businessName}
                            onChange={(e) =>
                              setForm({ ...form, businessName: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      {/* Business Logo */}
                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Business Logo
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            {logoPreview ? (
                              <div
                                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 ${
                                  isDarkMode
                                    ? "border-gray-600"
                                    : "border-gray-200"
                                }`}
                              >
                                <img
                                  src={logoPreview}
                                  alt="Logo"
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setLogoPreview(null);
                                    setForm({ ...form, businessLogo: null });
                                  }}
                                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                                >
                                  ×
                                </button>
                              </div>
                            ) : (
                              <div
                                className={`w-20 h-20 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center ${
                                  isDarkMode
                                    ? "bg-gray-700 border-gray-600"
                                    : "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300"
                                }`}
                              >
                                <Upload
                                  size={20}
                                  className={
                                    isDarkMode
                                      ? "text-gray-500"
                                      : "text-gray-400"
                                  }
                                />
                                <span
                                  className={`text-[10px] mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}
                                >
                                  Upload
                                </span>
                              </div>
                            )}
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className={`flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold ${
                              isDarkMode
                                ? "text-gray-400 file:bg-indigo-500/20 file:text-indigo-400 hover:file:bg-indigo-500/30"
                                : "text-gray-500 file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Owner Name */}
                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Owner Name *
                        </label>
                        <div className="relative">
                          <User
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="text"
                            required
                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-0 transition-all ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                            placeholder="e.g., Dr. Rajesh Sharma"
                            value={form.ownerName}
                            onChange={(e) =>
                              setForm({ ...form, ownerName: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      {/* Owner Title */}
                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Owner Title/Designation
                        </label>
                        <div className="relative">
                          <Tag
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="text"
                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-0 transition-all ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                            placeholder="e.g., Founder & CEO"
                            value={form.ownerTitle}
                            onChange={(e) =>
                              setForm({ ...form, ownerTitle: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      {/* Tagline */}
                      <div className="lg:col-span-2 space-y-2">
                        <label
                          className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Tagline
                        </label>
                        <input
                          type="text"
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-0 transition-all ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                              : "bg-white border-gray-200 text-gray-900"
                          }`}
                          placeholder="e.g., Your Health, Our Priority"
                          value={form.tagline}
                          onChange={(e) =>
                            setForm({ ...form, tagline: e.target.value })
                          }
                        />
                      </div>

                      {/* Business Type */}
                      <div className="lg:col-span-2 space-y-2">
                        <label
                          className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Business Type *
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {businessTypes.map((type) => (
                            <div
                              key={type.id}
                              className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                form.businessType === type.id
                                  ? "border-indigo-600 bg-indigo-50"
                                  : isDarkMode
                                    ? "border-gray-600 hover:border-gray-500 bg-gray-700"
                                    : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() =>
                                setForm({ ...form, businessType: type.id })
                              }
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{type.icon}</span>
                                <div>
                                  <p
                                    className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                                  >
                                    {type.name}
                                  </p>
                                  <p
                                    className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                                  >
                                    {type.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div
                    className={`rounded-2xl border-2 p-6 space-y-6 ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-800"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <h3
                      className={`text-lg font-bold flex items-center gap-2 pb-2 border-b ${
                        isDarkMode
                          ? "text-white border-gray-600"
                          : "text-gray-900 border-gray-200"
                      }`}
                    >
                      <Phone size={20} className="text-indigo-600" />
                      Contact Information
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="tel"
                            required
                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-0 transition-all ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                            placeholder="+91 9876543210"
                            value={form.phone}
                            onChange={(e) =>
                              setForm({ ...form, phone: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      {/* WhatsApp */}
                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          WhatsApp Number
                        </label>
                        <div className="relative">
                          <MessageCircle
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="tel"
                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-0 transition-all ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                            placeholder="+91 9876543210"
                            value={form.whatsapp}
                            onChange={(e) =>
                              setForm({ ...form, whatsapp: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="email"
                            required
                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-0 transition-all ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                            placeholder="contact@business.com"
                            value={form.email}
                            onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      {/* Google Maps URL */}
                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Google Maps Location URL
                        </label>
                        <div className="relative">
                          <MapPin
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="url"
                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-0 transition-all ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                            placeholder="https://maps.google.com/?q=..."
                            value={form.googleMapsUrl}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                googleMapsUrl: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      {/* Full Address */}
                      <div className="lg:col-span-2 space-y-2">
                        <label
                          className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Complete Address
                        </label>
                        <textarea
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-0 transition-all ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                              : "bg-white border-gray-200 text-gray-900"
                          }`}
                          rows="3"
                          placeholder="123 Main Street, City, State - 400001"
                          value={form.address}
                          onChange={(e) =>
                            setForm({ ...form, address: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div
                    className={`rounded-2xl border-2 p-6 space-y-6 ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-800"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <h3
                      className={`text-lg font-bold flex items-center gap-2 pb-2 border-b ${
                        isDarkMode
                          ? "text-white border-gray-600"
                          : "text-gray-900 border-gray-200"
                      }`}
                    >
                      <Clock size={20} className="text-indigo-600" />
                      Working Hours
                    </h3>

                    <div className="space-y-4">
                      {form.workingHours.map((day, index) => (
                        <div
                          key={day.day}
                          className={`flex items-center gap-4 p-3 rounded-xl ${
                            isDarkMode ? "bg-gray-700" : "bg-gray-50"
                          }`}
                        >
                          <div
                            className={`w-24 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            {day.day}
                          </div>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={day.closed}
                              onChange={() => toggleClosedDay(index)}
                              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                            />
                            <span
                              className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                            >
                              Closed
                            </span>
                          </label>
                          {!day.closed && (
                            <>
                              <div className="flex items-center gap-2">
                                <input
                                  type="time"
                                  value={day.open}
                                  onChange={(e) =>
                                    handleWorkingHoursChange(
                                      index,
                                      "open",
                                      e.target.value,
                                    )
                                  }
                                  className={`px-3 py-2 border-2 rounded-lg focus:border-indigo-600 focus:ring-0 ${
                                    isDarkMode
                                      ? "bg-gray-600 border-gray-500 text-white"
                                      : "bg-white border-gray-200 text-gray-900"
                                  }`}
                                />
                                <span
                                  className={
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-gray-500"
                                  }
                                >
                                  to
                                </span>
                                <input
                                  type="time"
                                  value={day.close}
                                  onChange={(e) =>
                                    handleWorkingHoursChange(
                                      index,
                                      "close",
                                      e.target.value,
                                    )
                                  }
                                  className={`px-3 py-2 border-2 rounded-lg focus:border-indigo-600 focus:ring-0 ${
                                    isDarkMode
                                      ? "bg-gray-600 border-gray-500 text-white"
                                      : "bg-white border-gray-200 text-gray-900"
                                  }`}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div
                    className={`rounded-2xl border-2 p-6 space-y-6 ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-800"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <h3
                      className={`text-lg font-bold flex items-center gap-2 pb-2 border-b ${
                        isDarkMode
                          ? "text-white border-gray-600"
                          : "text-gray-900 border-gray-200"
                      }`}
                    >
                      <Globe size={20} className="text-indigo-600" />
                      Social Media Links
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {[
                        {
                          key: "instagram",
                          icon: Instagram,
                          label: "Instagram",
                          placeholder: "https://instagram.com/username",
                        },
                        {
                          key: "facebook",
                          icon: Facebook,
                          label: "Facebook",
                          placeholder: "https://facebook.com/username",
                        },
                        {
                          key: "linkedin",
                          icon: Linkedin,
                          label: "LinkedIn",
                          placeholder: "https://linkedin.com/company/name",
                        },
                        {
                          key: "youtube",
                          icon: Youtube,
                          label: "YouTube",
                          placeholder: "https://youtube.com/@channel",
                        },
                      ].map((social) => (
                        <div key={social.key} className="space-y-2">
                          <label
                            className={`block text-sm font-semibold flex items-center gap-2 ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            <social.icon
                              size={16}
                              className="text-indigo-600"
                            />
                            {social.label}
                          </label>
                          <input
                            type="url"
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-0 transition-all ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                            placeholder={social.placeholder}
                            value={form.social[social.key]}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                social: {
                                  ...form.social,
                                  [social.key]: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Services/Products */}
                  <div
                    className={`rounded-2xl border-2 p-6 space-y-6 ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-800"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b">
                      <h3
                        className={`text-lg font-bold flex items-center gap-2 ${
                          isDarkMode
                            ? "text-white border-gray-600"
                            : "text-gray-900 border-gray-200"
                        }`}
                      >
                        {form.businessType === "service" ? (
                          <Briefcase size={20} className="text-indigo-600" />
                        ) : (
                          <ShoppingBag size={20} className="text-indigo-600" />
                        )}
                        {form.businessType === "service"
                          ? "Services"
                          : "Products"}
                      </h3>
                      <button
                        type="button"
                        onClick={addItem}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center gap-2 text-sm transition-all"
                      >
                        <Plus size={16} />
                        Add{" "}
                        {form.businessType === "service"
                          ? "Service"
                          : "Product"}
                      </button>
                    </div>

                    <div className="space-y-4">
                      {form.items.map((item, index) => (
                        <div
                          key={index}
                          className={`flex gap-4 items-start p-4 rounded-xl ${
                            isDarkMode ? "bg-gray-700" : "bg-gray-50"
                          }`}
                        >
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                              type="text"
                              placeholder={
                                form.businessType === "service"
                                  ? "Service Name"
                                  : "Product Name"
                              }
                              className={`w-full px-4 py-2 border-2 rounded-lg focus:border-indigo-600 focus:ring-0 ${
                                isDarkMode
                                  ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                                  : "bg-white border-gray-200 text-gray-900"
                              }`}
                              value={item.name}
                              onChange={(e) =>
                                updateItem(index, "name", e.target.value)
                              }
                            />
                            <input
                              type="text"
                              placeholder="Description"
                              className={`w-full px-4 py-2 border-2 rounded-lg focus:border-indigo-600 focus:ring-0 ${
                                isDarkMode
                                  ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                                  : "bg-white border-gray-200 text-gray-900"
                              }`}
                              value={item.description}
                              onChange={(e) =>
                                updateItem(index, "description", e.target.value)
                              }
                            />
                            <input
                              type="text"
                              placeholder="Price (optional)"
                              className={`w-full px-4 py-2 border-2 rounded-lg focus:border-indigo-600 focus:ring-0 ${
                                isDarkMode
                                  ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                                  : "bg-white border-gray-200 text-gray-900"
                              }`}
                              value={item.price}
                              onChange={(e) =>
                                updateItem(index, "price", e.target.value)
                              }
                            />
                          </div>
                          {form.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <X size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gallery */}
                  <div
                    className={`rounded-2xl border-2 p-6 space-y-6 ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-800"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <h3
                      className={`text-lg font-bold flex items-center gap-2 pb-2 border-b ${
                        isDarkMode
                          ? "text-white border-gray-600"
                          : "text-gray-900 border-gray-200"
                      }`}
                    >
                      <ImageIcon size={20} className="text-indigo-600" />
                      Gallery Images
                    </h3>

                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                        className={`w-full text-sm file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold ${
                          isDarkMode
                            ? "text-gray-400 file:bg-indigo-500/20 file:text-indigo-400 hover:file:bg-indigo-500/30"
                            : "text-gray-500 file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                        }`}
                      />
                      <p
                        className={`text-xs mt-2 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}
                      >
                        You can select multiple images. Recommended size:
                        800x600px
                      </p>
                    </div>

                    {galleryPreviews.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {galleryPreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Gallery ${index + 1}`}
                              className={`w-full h-32 object-cover rounded-xl border-2 ${
                                isDarkMode
                                  ? "border-gray-600"
                                  : "border-gray-200"
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Payment Details */}
                  <div
                    className={`rounded-2xl border-2 p-6 space-y-6 ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-800"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <h3
                      className={`text-lg font-bold flex items-center gap-2 pb-2 border-b ${
                        isDarkMode
                          ? "text-white border-gray-600"
                          : "text-gray-900 border-gray-200"
                      }`}
                    >
                      <CreditCard size={20} className="text-indigo-600" />
                      Payment Details
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* UPI ID */}
                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          UPI ID
                        </label>
                        <div className="relative">
                          <Banknote
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="text"
                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-0 transition-all ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                            placeholder="business@okhdfcbank"
                            value={form.payment.upiId}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                payment: {
                                  ...form.payment,
                                  upiId: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      {/* QR Code Upload */}
                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          QR Code Image
                        </label>
                        <div className="flex items-center gap-4">
                          {qrPreview ? (
                            <div
                              className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 ${
                                isDarkMode
                                  ? "border-gray-600"
                                  : "border-gray-200"
                              }`}
                            >
                              <img
                                src={qrPreview}
                                alt="QR Code"
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setQrPreview(null);
                                  setForm({
                                    ...form,
                                    payment: { ...form.payment, qrCode: null },
                                  });
                                }}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <div
                              className={`w-16 h-16 rounded-xl border-2 border-dashed flex flex-col items-center justify-center ${
                                isDarkMode
                                  ? "bg-gray-700 border-gray-600"
                                  : "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300"
                              }`}
                            >
                              <QrCode
                                size={20}
                                className={
                                  isDarkMode ? "text-gray-500" : "text-gray-400"
                                }
                              />
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleQrUpload}
                            className={`flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold ${
                              isDarkMode
                                ? "text-gray-400 file:bg-indigo-500/20 file:text-indigo-400 hover:file:bg-indigo-500/30"
                                : "text-gray-500 file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Accepted Payment Methods */}
                      <div className="lg:col-span-2 space-y-2">
                        <label
                          className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Accepted Payment Methods
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {[
                            { id: "gpay", name: "Google Pay", icon: "📱" },
                            { id: "phonepe", name: "PhonePe", icon: "📱" },
                            { id: "paytm", name: "Paytm", icon: "📱" },
                            {
                              id: "card",
                              name: "Credit/Debit Card",
                              icon: "💳",
                            },
                            { id: "bank", name: "Bank Transfer", icon: "🏦" },
                            { id: "cash", name: "Cash", icon: "💵" },
                          ].map((method) => (
                            <label
                              key={method.id}
                              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 cursor-pointer transition-all ${
                                form.payment.acceptedMethods.includes(method.id)
                                  ? "border-indigo-600 bg-indigo-50"
                                  : isDarkMode
                                    ? "border-gray-600 hover:border-gray-500 bg-gray-700"
                                    : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={form.payment.acceptedMethods.includes(
                                  method.id,
                                )}
                                onChange={() => togglePaymentMethod(method.id)}
                                className="hidden"
                              />
                              <span>{method.icon}</span>
                              <span
                                className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                              >
                                {method.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bank Details Accordion */}
                    <details className="group">
                      <summary
                        className={`flex items-center gap-2 cursor-pointer text-sm font-semibold p-3 rounded-xl ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        <ChevronDown
                          size={18}
                          className="group-open:rotate-180 transition-transform"
                        />
                        Bank Transfer Details (Optional)
                      </summary>
                      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            Account Holder Name
                          </label>
                          <input
                            type="text"
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-0 ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                            value={form.payment.bankDetails.accountHolder}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                payment: {
                                  ...form.payment,
                                  bankDetails: {
                                    ...form.payment.bankDetails,
                                    accountHolder: e.target.value,
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            Account Number
                          </label>
                          <input
                            type="text"
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-0 ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                            value={form.payment.bankDetails.accountNumber}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                payment: {
                                  ...form.payment,
                                  bankDetails: {
                                    ...form.payment.bankDetails,
                                    accountNumber: e.target.value,
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            IFSC Code
                          </label>
                          <input
                            type="text"
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-0 ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                            value={form.payment.bankDetails.ifscCode}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                payment: {
                                  ...form.payment,
                                  bankDetails: {
                                    ...form.payment.bankDetails,
                                    ifscCode: e.target.value,
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            Bank Name
                          </label>
                          <input
                            type="text"
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-0 ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                            value={form.payment.bankDetails.bankName}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                payment: {
                                  ...form.payment,
                                  bankDetails: {
                                    ...form.payment.bankDetails,
                                    bankName: e.target.value,
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            Account Type
                          </label>
                          <select
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:border-indigo-600 focus:ring-0 ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                            value={form.payment.bankDetails.accountType}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                payment: {
                                  ...form.payment,
                                  bankDetails: {
                                    ...form.payment.bankDetails,
                                    accountType: e.target.value,
                                  },
                                },
                              })
                            }
                          >
                            <option value="current">Current Account</option>
                            <option value="savings">Savings Account</option>
                            <option value="business">Business Account</option>
                          </select>
                        </div>
                      </div>
                    </details>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {editingClient
                          ? "Updating Business Card..."
                          : "Creating Business Card..."}
                      </div>
                    ) : (
                      <>
                        {editingClient ? (
                          <Edit2 className="inline mr-2" size={20} />
                        ) : (
                          <Save className="inline mr-2" size={20} />
                        )}
                        {editingClient
                          ? "Update Business Card"
                          : "Create Digital Business Card"}
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        {/* View All Clients Tab */}
        {activeTab === "view" && (
          <div
            className={`rounded-3xl shadow-2xl p-6 lg:p-8 transition-colors ${
              isDarkMode ? "bg-gray-800/90 backdrop-blur-xl" : "bg-white"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="text-white" size={24} />
                </div>
                <div>
                  <h2
                    className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    All Clients
                  </h2>
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                    {filteredClients.length}{" "}
                    {filteredClients.length === 1 ? "client" : "clients"} found
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {/* Search Bar */}
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    className={`pl-10 pr-4 py-2 rounded-xl border-2 focus:border-indigo-600 focus:ring-0 transition-all ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-200 text-gray-900"
                    }`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filter by Type */}
                <select
                  className={`px-4 py-2 rounded-xl border-2 focus:border-indigo-600 focus:ring-0 transition-all ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="service">Service Based</option>
                  <option value="product">Product Based</option>
                </select>

                {/* Filter by Template */}
                <select
                  className={`px-4 py-2 rounded-xl border-2 focus:border-indigo-600 focus:ring-0 transition-all ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                  value={filterTemplate}
                  onChange={(e) => setFilterTemplate(e.target.value)}
                >
                  <option value="all">All Templates</option>
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.fullName}
                    </option>
                  ))}
                </select>

                {/* View Toggle */}
                <div
                  className={`flex rounded-xl border-2 ${
                    isDarkMode ? "border-gray-600" : "border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${
                      viewMode === "grid"
                        ? "bg-indigo-600 text-white"
                        : isDarkMode
                          ? "text-gray-400 hover:bg-gray-700"
                          : "text-gray-600 hover:bg-gray-100"
                    } rounded-l-xl transition-all`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${
                      viewMode === "list"
                        ? "bg-indigo-600 text-white"
                        : isDarkMode
                          ? "text-gray-400 hover:bg-gray-700"
                          : "text-gray-600 hover:bg-gray-100"
                    } rounded-r-xl transition-all`}
                  >
                    <List size={18} />
                  </button>
                </div>

                <button
                  onClick={fetchClients}
                  className={`p-2 rounded-xl transition-all ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  disabled={loading}
                >
                  <RefreshCw
                    size={18}
                    className={loading ? "animate-spin" : ""}
                  />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                  Loading clients...
                </p>
              </div>
            ) : filteredClients.length === 0 ? (
              <div
                className={`text-center py-16 rounded-3xl ${
                  isDarkMode
                    ? "bg-gray-700/50"
                    : "bg-gradient-to-br from-gray-50 to-gray-100"
                }`}
              >
                <div
                  className={`w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 ${
                    isDarkMode ? "bg-gray-600" : "bg-gray-200"
                  }`}
                >
                  <Users
                    size={48}
                    className={isDarkMode ? "text-gray-500" : "text-gray-400"}
                  />
                </div>
                <h3
                  className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  No Clients Found
                </h3>
                <p
                  className={
                    isDarkMode ? "text-gray-400 mb-6" : "text-gray-600 mb-6"
                  }
                >
                  {searchTerm ||
                  filterType !== "all" ||
                  filterTemplate !== "all"
                    ? "Try adjusting your filters"
                    : "Get started by adding your first client"}
                </p>
                <button
                  onClick={() => setActiveTab("add")}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all"
                >
                  Add New Client
                </button>
              </div>
            ) : viewMode === "grid" ? (
              // Grid View
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClients.map((client) => (
                  <div
                    key={client._id}
                    className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                      isDarkMode ? "bg-gray-700/50" : "bg-white"
                    } border-2 ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}
                  >
                    {/* Template Badge */}
                    <div
                      className={`absolute top-3 right-3 z-10 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${
                        templates.find((t) => t.id === client.template)
                          ?.gradient || "from-gray-500 to-gray-600"
                      } text-white shadow-lg`}
                    >
                      {templates.find((t) => t.id === client.template)?.name ||
                        client.template}
                    </div>

                    {/* Business Logo */}
                    <div className="h-32 bg-gradient-to-br from-indigo-600 to-purple-600 p-6 flex items-center justify-center">
                      {client.businessLogo ? (
                        <img
                          src={client.businessLogo}
                          alt={client.businessName}
                          className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow-xl"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = ""; // Clear broken image
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl border-2 border-white flex items-center justify-center">
                          <Building2 size={32} className="text-white" />
                        </div>
                      )}
                    </div>

                    {/* Business Info */}
                    <div className="p-6">
                      <h3
                        className={`font-bold text-lg mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {client.businessName}
                      </h3>
                      <p
                        className={`text-sm mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {client.ownerName}
                      </p>

                      {/* Business Type Badge */}
                      <div
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                          client.businessType === "service"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {client.businessType === "service"
                          ? "💼 Service"
                          : "🛍️ Product"}
                      </div>

                      {/* Contact Info Preview */}
                      <div
                        className={`space-y-2 text-sm border-t pt-4 ${
                          isDarkMode ? "border-gray-600" : "border-gray-200"
                        }`}
                      >
                        {client.phone && (
                          <div className="flex items-center gap-2">
                            <Phone
                              size={14}
                              className={
                                isDarkMode ? "text-gray-500" : "text-gray-400"
                              }
                            />
                            <span
                              className={
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }
                            >
                              {client.phone}
                            </span>
                          </div>
                        )}
                        {client.email && (
                          <div className="flex items-center gap-2">
                            <Mail
                              size={14}
                              className={
                                isDarkMode ? "text-gray-500" : "text-gray-400"
                              }
                            />
                            <span
                              className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                            >
                              {client.email}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4">
                        <a
                          href={`/preview/${client._id}`}
                          target="_blank"
                          className={`flex-1 p-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                            isDarkMode
                              ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          title="Preview"
                        >
                          <Eye size={16} />
                          <span className="text-xs">Preview</span>
                        </a>
                        <button
                          onClick={() => handleEdit(client)}
                          className={`flex-1 p-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
                            isDarkMode
                              ? "bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30"
                              : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                          }`}
                          title="Edit"
                        >
                          <Edit2 size={16} />
                          <span className="text-xs">Edit</span>
                        </button>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              `https://${client.settings?.subdomain || client._id}.skywhale.in`,
                            )
                          }
                          className={`p-2 rounded-lg transition-all ${
                            isDarkMode
                              ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          title="Copy URL"
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(client._id)}
                          className={`p-2 rounded-lg transition-all ${
                            isDarkMode
                              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              : "bg-red-50 text-red-600 hover:bg-red-100"
                          }`}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Template Change Option */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <label
                          className={`block text-xs font-semibold mb-2 ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Change Template:
                        </label>
                        <div className="flex gap-1">
                          {templates.map((t) => (
                            <button
                              key={t.id}
                              onClick={() =>
                                handleTemplateChange(client._id, t.id)
                              }
                              disabled={client.template === t.id}
                              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                client.template === t.id
                                  ? `bg-gradient-to-r ${t.gradient} text-white cursor-default`
                                  : isDarkMode
                                    ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {t.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // List View
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      className={`${
                        isDarkMode
                          ? "bg-gray-700"
                          : "bg-gradient-to-r from-gray-50 to-gray-100"
                      }`}
                    >
                      <th
                        className={`p-4 text-left text-sm font-semibold rounded-l-2xl ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Business
                      </th>
                      <th
                        className={`p-4 text-left text-sm font-semibold ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Template
                      </th>
                      <th
                        className={`p-4 text-left text-sm font-semibold ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Status
                      </th>
                      <th
                        className={`p-4 text-left text-sm font-semibold ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Type
                      </th>
                      <th
                        className={`p-4 text-left text-sm font-semibold rounded-r-2xl ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client) => (
                      <tr
                        key={client._id}
                        className={`border-b transition-all hover:bg-opacity-50 ${
                          isDarkMode
                            ? "border-gray-700 hover:bg-gray-700/50"
                            : "border-gray-100 hover:bg-gray-50"
                        }`}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {client.businessLogo ? (
                              <img
                                src={client.businessLogo}
                                alt={client.businessName}
                                className="w-10 h-10 rounded-xl object-cover border-2 border-gray-200"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "";
                                  e.target.style.display = "none";
                                }}
                              />
                            ) : (
                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                  isDarkMode
                                    ? "bg-gray-600"
                                    : "bg-gradient-to-br from-indigo-100 to-purple-100"
                                }`}
                              >
                                <Building2
                                  size={18}
                                  className={
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-indigo-600"
                                  }
                                />
                              </div>
                            )}
                            <div>
                              <div
                                className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                              >
                                {client.businessName}
                              </div>
                              <div
                                className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                              >
                                {client.ownerName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <select
                            value={client.template}
                            onChange={(e) =>
                              handleTemplateChange(client._id, e.target.value)
                            }
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border-2 focus:border-indigo-600 focus:ring-0 ${
                              isDarkMode
                                ? "bg-gray-600 border-gray-500 text-white"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                          >
                            {templates.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.fullName}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                              client.status === "active"
                                ? isDarkMode
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-green-100 text-green-800"
                                : isDarkMode
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {client.status || "active"}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`text-sm ${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {client.businessType === "service"
                              ? "💼 Service"
                              : "🛍️ Product"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <a
                              href={`/preview/${client._id}`}
                              target="_blank"
                              className={`p-2 rounded-xl transition-all ${
                                isDarkMode
                                  ? "text-blue-400 hover:bg-blue-500/20"
                                  : "text-blue-600 hover:bg-blue-50"
                              }`}
                              title="Preview"
                            >
                              <Eye size={18} />
                            </a>
                            <button
                              onClick={() => handleEdit(client)}
                              className={`p-2 rounded-xl transition-all ${
                                isDarkMode
                                  ? "text-indigo-400 hover:bg-indigo-500/20"
                                  : "text-indigo-600 hover:bg-indigo-50"
                              }`}
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  `https://${client.settings?.subdomain || client._id}.skywhale.in`,
                                )
                              }
                              className={`p-2 rounded-xl transition-all ${
                                isDarkMode
                                  ? "text-gray-400 hover:bg-gray-600"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
                              title="Copy URL"
                            >
                              <Copy size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(client._id)}
                              className={`p-2 rounded-xl transition-all ${
                                isDarkMode
                                  ? "text-red-400 hover:bg-red-500/20"
                                  : "text-red-600 hover:bg-red-50"
                              }`}
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === "templates" && (
          <div
            className={`rounded-3xl shadow-2xl p-6 lg:p-8 transition-colors ${
              isDarkMode ? "bg-gray-800/90 backdrop-blur-xl" : "bg-white"
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Package className="text-white" size={24} />
              </div>
              <div>
                <h2
                  className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Available Templates
                </h2>
                <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                  Choose the perfect template for your clients
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                    isDarkMode ? "bg-gray-700" : "bg-white"
                  } border-2 ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}
                >
                  <div
                    className={`h-32 bg-gradient-to-r ${template.gradient} p-6`}
                  >
                    <div className="text-4xl mb-2">{template.icon}</div>
                    <h3 className="text-xl font-bold text-white">
                      {template.fullName}
                    </h3>
                    <p className="text-white/90 text-sm mt-1">
                      {template.description}
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {template.price}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isDarkMode
                            ? "bg-gray-600 text-gray-300"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {template.id}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {template.features.map((feature, index) => (
                        <li
                          key={index}
                          className={`flex items-center gap-2 text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <CheckCircle
                            size={16}
                            className="text-green-500 flex-shrink-0"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => {
                        setActiveTab("add");
                        setForm({ ...form, template: template.id });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`w-full py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                        isDarkMode
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg"
                      }`}
                    >
                      Select Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WhatsApp Message Template */}
        <div
          className={`mt-8 rounded-3xl p-6 ${
            isDarkMode
              ? "bg-green-500/20 border border-green-500/30"
              : "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <MessageCircle className="text-white" size={20} />
            </div>
            <h3
              className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              WhatsApp Message Template
            </h3>
          </div>
          <div
            className={`rounded-xl p-4 border-2 ${
              isDarkMode
                ? "bg-gray-800 border-green-500/30"
                : "bg-white border-green-100"
            }`}
          >
            <textarea
              readOnly
              value="नमस्ते! 🌟

आपका डिजिटल बिजनेस कार्ड तैयार है!

✨ लिंक: [PASTE_URL_HERE]

इसे शेयर करें:
✓ WhatsApp पर
✓ सोशल मीडिया
✓ ईमेल सिग्नेचर
✓ प्रिंटेड कार्ड्स पर QR कोड

ग्राहक आपको सीधे कॉल/WhatsApp कर सकते हैं।
अपने व्यवसाय को दें एक डिजिटल पहचान!

धन्यवाद! 🙏"
              className={`w-full p-3 rounded-xl text-sm ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-300"
                  : "bg-gray-50 border-2 border-gray-100 text-gray-700"
              }`}
              rows="8"
            />
            <button
              onClick={() =>
                copyToClipboard(
                  `नमस्ते! 🌟\n\nआपका डिजिटल बिजनेस कार्ड तैयार है!\n\n✨ लिंक: [PASTE_URL_HERE]\n\nइसे शेयर करें:\n✓ WhatsApp पर\n✓ सोशल मीडिया\n✓ ईमेल सिग्नेचर\n✓ प्रिंटेड कार्ड्स पर QR कोड\n\nग्राहक आपको सीधे कॉल/WhatsApp कर सकते हैं।\nअपने व्यवसाय को दें एक डिजिटल पहचान!\n\nधन्यवाद! 🙏`,
                )
              }
              className={`mt-3 px-4 py-2 rounded-xl flex items-center gap-2 text-sm transition-all ${
                isDarkMode
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              <Copy size={16} />
              Copy Template
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .hover:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default Admin;
