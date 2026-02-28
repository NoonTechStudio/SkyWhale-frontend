import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Share2,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Clock,
  ChevronRight,
  ExternalLink,
  Award,
  Star,
  Sparkles,
  TrendingUp,
  Shield,
  Users,
  ArrowUpRight,
  Copy,
  CheckCircle2,
  Building2,
  Wallet,
  CreditCard,
  User,
  Briefcase,
  FileText,
  Navigation,
  ThumbsUp,
  Info,
  Calendar,
  Heart,
  Gift,
  Gem,
  Crown,
  Sun,
  Moon,
} from "lucide-react";
import { sampleClient } from "../data/sampleData";

const VertexTemplate = ({ clientData = sampleClient }) => {
  const [activeSection, setActiveSection] = useState("about");
  const [copied, setCopied] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Safe data access with fallbacks - FIXED to match backend structure
  const safeClientData = {
    // Basic Info
    businessName: clientData?.businessName || "Vertex Elite",
    businessLogo: clientData?.businessLogo || "/default-logo.png",
    ownerName: clientData?.ownerName || "John Doe",
    ownerTitle: clientData?.ownerTitle || "Founder & CEO",
    tagline: clientData?.tagline || "Excellence in Every Detail",
    businessType: clientData?.businessType || "service",

    // Contact Info - FIXED: properly access from contact object
    phone: clientData?.contact?.phone || clientData?.phone || "+91 98765 43210",
    whatsapp:
      clientData?.contact?.whatsapp ||
      clientData?.whatsapp ||
      clientData?.contact?.phone ||
      "+91 98765 43210",
    email:
      clientData?.contact?.email || clientData?.email || "contact@business.com",
    address:
      clientData?.contact?.address ||
      clientData?.address ||
      "123 Business Avenue, Suite 100, New York, NY 10001",
    googleMapsUrl:
      clientData?.contact?.googleMapsUrl || clientData?.googleMapsUrl || "#",

    // Working Hours - FIXED: properly access from contact.openingHours
    workingHours: clientData?.contact?.openingHours ||
      clientData?.workingHours || [
        { day: "Monday", open: "09:00", close: "18:00", closed: false },
        { day: "Tuesday", open: "09:00", close: "18:00", closed: false },
        { day: "Wednesday", open: "09:00", close: "18:00", closed: false },
        { day: "Thursday", open: "09:00", close: "18:00", closed: false },
        { day: "Friday", open: "09:00", close: "18:00", closed: false },
        { day: "Saturday", open: "10:00", close: "16:00", closed: false },
        { day: "Sunday", open: "00:00", close: "00:00", closed: true },
      ],

    // Items (services/products) - FIXED: properly access items
    items: clientData?.items || clientData?.services || [],

    // Gallery - FIXED: properly access gallery
    gallery: clientData?.gallery || [],

    // Social Media - FIXED: properly access social
    social: clientData?.social || {
      instagram: "#",
      linkedin: "#",
      facebook: "#",
      youtube: "#",
      googleMaps: "#",
    },

    // Payment - FIXED: properly access payment
    payment: clientData?.payment || {
      qrCode: "/default-qr.png",
      upiId: "merchant@bank",
      ifsc: "NTCH0009821",
      accountNumber: "**** **** 9012 3345",
      acceptedMethods: [],
      bankDetails: {},
    },
  };

  // Debug log to check data
  console.log("VertexTemplate - Client Data:", clientData);
  console.log("VertexTemplate - Safe Data:", safeClientData);
  console.log("VertexTemplate - Gallery:", safeClientData.gallery);
  console.log("VertexTemplate - Logo:", safeClientData.businessLogo);

  // Format working hours for display
  const getTodayHours = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = days[new Date().getDay()];
    const todaySchedule = safeClientData.workingHours.find(
      (h) => h.day === today,
    );

    if (!todaySchedule || todaySchedule.closed) {
      return "Closed Today";
    }
    return `${todaySchedule.open} - ${todaySchedule.close}`;
  };

  // Check if currently open
  const isOpenNow = () => {
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = days[now.getDay()];
    const todaySchedule = safeClientData.workingHours.find(
      (h) => h.day === today,
    );

    if (!todaySchedule || todaySchedule.closed) return false;

    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    return (
      currentTime >= todaySchedule.open && currentTime <= todaySchedule.close
    );
  };

  const copyToClipboard = (text, type) => {
    if (text) {
      navigator.clipboard.writeText(text);
      if (type === "upi") {
        setCopiedUpi(true);
        setTimeout(() => setCopiedUpi(false), 2000);
      } else {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: safeClientData.businessName,
          text: safeClientData.tagline,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  // Function to get full URL for images
  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/150";
    // Vite-imported assets are objects or already resolved local paths — use directly
    if (typeof url !== "string") return url;
    if (
      url.startsWith("http") ||
      url.startsWith("/") ||
      url.startsWith("data:")
    )
      return url;
    return `http://localhost:5001${url}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 selection:bg-teal-200/30 font-sans">
      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] min-h-screen relative overflow-hidden border border-teal-100/50">
        {/* Premium Light Background Elements - Updated to Teal/Coral */}
        <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-gradient-to-br from-teal-200/30 to-cyan-300/20 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-gradient-to-tr from-coral-200/20 to-amber-200/20 rounded-full blur-[80px]"></div>

        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="h-full w-full bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        {/* Header - Premium Light Style */}
        <div className="relative pt-8 pb-6 px-6">
          <div className="relative z-10">
            {/* Top Bar with Share Button */}
            <div className="flex justify-end items-center mb-8">
              <button
                onClick={handleShare}
                className="w-12 h-12 bg-white border border-teal-200 rounded-2xl flex items-center justify-center hover:bg-teal-50 hover:border-teal-300 hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                <Share2 size={20} className="text-teal-600" />
              </button>
            </div>

            {/* Logo and Business Name - Centered Premium */}
            <div className="flex flex-col items-center text-center mb-8">
              {/* Premium Logo with Ring - Updated to Teal */}
              <div className="relative mb-6 group">
                <div className="absolute -inset-3 bg-gradient-to-r from-teal-200 via-teal-300 to-teal-200 rounded-[3rem] blur-xl opacity-60 group-hover:opacity-100 transition duration-700"></div>
                <div className="relative w-32 h-32 p-[3px] rounded-[2.5rem] bg-gradient-to-br from-teal-300 via-teal-400 to-teal-300">
                  <div className="w-full h-full bg-white rounded-[2.3rem] overflow-hidden p-2">
                    <img
                      src={getImageUrl(safeClientData.businessLogo)}
                      alt="Business Logo"
                      className="w-full h-full object-cover rounded-[2rem]"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Business Name with Premium Gradient - Updated to Teal */}
              <h1 className="text-4xl font-black tracking-tight mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700">
                  {safeClientData.businessName}
                </span>
              </h1>

              {/* Tagline as Description */}
              <p className="text-gray-600 text-justify leading-relaxed max-w-s mx-auto bg-teal-50/50 p-4 rounded-2xl border border-teal-100">
                "{safeClientData.tagline}"
              </p>
            </div>

            {/* Owner Info Card - Updated to Teal */}
            <div className="bg-white border border-teal-100 rounded-2xl p-5 shadow-sm mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-50 rounded-xl flex items-center justify-center border-2 border-teal-200">
                  <User size={32} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-gray-800 font-bold text-xl">
                    {safeClientData.ownerName}
                  </p>
                  <p className="text-teal-600 text-base">
                    {safeClientData.ownerTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons - Updated with fresh colors */}
        <div className="px-6 mb-6">
          <div className="grid grid-cols-4 gap-2">
            <a
              href={`tel:${safeClientData.phone}`}
              className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-teal-400 to-teal-500 text-white rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <Phone size={20} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Call
              </span>
            </a>
            <a
              href={`https://wa.me/${safeClientData.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-emerald-400 to-emerald-500 text-white rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <MessageCircle size={20} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Chat
              </span>
            </a>
            <a
              href={`mailto:${safeClientData.email}`}
              className="flex flex-col items-center gap-2 p-4 bg-blue-400 text-white rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <Mail size={20} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Mail
              </span>
            </a>
            {safeClientData.googleMapsUrl &&
            safeClientData.googleMapsUrl !== "#" ? (
              <a
                href={safeClientData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <MapPin size={20} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Maps
                </span>
              </a>
            ) : (
              <button
                disabled
                className="flex flex-col items-center gap-2 p-4 bg-gray-300 text-gray-500 rounded-xl cursor-not-allowed"
              >
                <MapPin size={20} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Maps
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation - Updated to Teal */}
        <div className="px-6 mb-6">
          <div className="bg-white border border-teal-100 rounded-2xl p-1.5 shadow-sm">
            <div className="grid grid-cols-4 gap-1">
              {[
                { id: "about", label: "About", icon: Info },
                {
                  id: "services",
                  label:
                    safeClientData.businessType === "service"
                      ? "Services"
                      : "Products",
                  icon: Briefcase,
                },
                { id: "gallery", label: "Gallery", icon: Star },
                { id: "payment", label: "Payment", icon: CreditCard },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex flex-col items-center gap-1 ${
                    activeSection === tab.id
                      ? "bg-gradient-to-r from-teal-400 to-teal-500 text-white shadow-md scale-105"
                      : "text-gray-500 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Section with Increased Bottom Padding */}
        <div className="px-6 pb-6 min-h-[400px]">
          {activeSection === "about" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {/* Address Card - Updated to Teal */}
              <div className="bg-white border border-teal-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={24} className="text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">
                      Location
                    </h4>
                    <p className="text-gray-700 text-base leading-relaxed mb-3">
                      {safeClientData.address}
                    </p>
                    {safeClientData.googleMapsUrl &&
                      safeClientData.googleMapsUrl !== "#" && (
                        <a
                          href={safeClientData.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 font-medium"
                        >
                          <Navigation size={16} />
                          Get Directions
                        </a>
                      )}
                  </div>
                </div>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-teal-100 rounded-2xl p-5 shadow-sm">
                  <Phone size={22} className="text-emerald-500 mb-3" />
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">
                    Phone
                  </p>
                  <a
                    href={`tel:${safeClientData.phone}`}
                    className="text-gray-800 font-semibold text-base hover:text-teal-600 transition break-all"
                  >
                    {safeClientData.phone}
                  </a>
                </div>
                <div className="bg-white border border-teal-100 rounded-2xl p-5 shadow-sm">
                  <Mail size={22} className="text-coral-500 mb-3" />
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${safeClientData.email}`}
                    className="text-gray-800 font-semibold text-sm break-all hover:text-teal-600 transition"
                  >
                    {safeClientData.email}
                  </a>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-white border border-teal-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock size={22} className="text-indigo-500" />
                    <h4 className="text-base font-bold text-gray-800">
                      Business Hours
                    </h4>
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                      isOpenNow()
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-amber-100 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {isOpenNow() ? "Open Now" : "Closed"}
                  </div>
                </div>

                <div className="space-y-3">
                  {safeClientData.workingHours.map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span
                        className={`font-medium ${day.closed ? "text-gray-400" : "text-gray-700"}`}
                      >
                        {day.day}
                      </span>
                      {day.closed ? (
                        <span className="text-amber-500 text-sm font-semibold">
                          Closed
                        </span>
                      ) : (
                        <span className="text-gray-600 font-mono">
                          {day.open} - {day.close}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              {Object.values(safeClientData.social).some(
                (link) => link && link !== "#",
              ) && (
                <div className="bg-white border border-teal-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-4">
                    Connect With Us
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {safeClientData.social.instagram &&
                      safeClientData.social.instagram !== "#" && (
                        <a
                          href={safeClientData.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center hover:scale-110 transition-all border border-purple-200"
                        >
                          <Instagram size={24} className="text-purple-600" />
                        </a>
                      )}
                    {safeClientData.social.facebook &&
                      safeClientData.social.facebook !== "#" && (
                        <a
                          href={safeClientData.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center hover:scale-110 transition-all border border-blue-200"
                        >
                          <Facebook size={24} className="text-blue-600" />
                        </a>
                      )}
                    {safeClientData.social.linkedin &&
                      safeClientData.social.linkedin !== "#" && (
                        <a
                          href={safeClientData.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center hover:scale-110 transition-all border border-blue-200"
                        >
                          <Linkedin size={24} className="text-blue-600" />
                        </a>
                      )}
                    {safeClientData.social.youtube &&
                      safeClientData.social.youtube !== "#" && (
                        <a
                          href={safeClientData.social.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center hover:scale-110 transition-all border border-red-200"
                        >
                          <Youtube size={24} className="text-red-600" />
                        </a>
                      )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === "services" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {safeClientData.businessType === "service"
                  ? "Our Premium Services"
                  : "Our Products"}
              </h3>
              {safeClientData.items.length > 0 ? (
                safeClientData.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-teal-100 rounded-2xl p-6 hover:shadow-lg transition-all hover:border-teal-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-50 rounded-xl flex items-center justify-center">
                        <Briefcase size={22} className="text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-800 font-bold text-lg mb-2">
                          {item.name}
                        </h4>
                        {item.description && (
                          <p className="text-gray-600 text-sm mb-3">
                            {item.description}
                          </p>
                        )}
                        {item.price && (
                          <div className="inline-block px-4 py-2 bg-emerald-100 rounded-xl">
                            <span className="text-emerald-700 font-bold">
                              ₹{item.price}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white border border-teal-100 rounded-2xl">
                  <Briefcase size={48} className="text-teal-300 mx-auto mb-3" />
                  <p className="text-gray-500">No services listed yet</p>
                </div>
              )}
            </div>
          )}

          {activeSection === "payment" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {/* Payment Card - Updated to Teal */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-200 via-teal-300 to-teal-200 rounded-3xl blur-md opacity-70"></div>
                <div className="relative bg-white border-2 border-teal-100 rounded-3xl p-6 overflow-hidden">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full mb-4">
                      <Shield size={16} className="text-teal-600" />
                      <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                        Secure Payments
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {safeClientData.businessName}
                    </h3>
                  </div>

                  {/* QR Code */}
                  {safeClientData.payment.qrCode && (
                    <div className="relative mx-auto w-48 h-48 mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-teal-300 rounded-2xl blur-md"></div>
                      <div className="relative w-full h-full p-2 bg-white rounded-2xl shadow-lg">
                        <img
                          src={getImageUrl(safeClientData.payment.qrCode)}
                          alt="Payment QR"
                          className="w-full h-full rounded-xl"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/300x300?text=QR+Code";
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* UPI ID */}
                  {safeClientData.payment.upiId && (
                    <button
                      onClick={() =>
                        copyToClipboard(safeClientData.payment.upiId, "upi")
                      }
                      className="w-full mb-4 p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between hover:bg-teal-100 transition-all"
                    >
                      <div>
                        <p className="text-xs text-teal-600 mb-1">UPI ID</p>
                        <p className="text-gray-800 font-mono text-base">
                          {safeClientData.payment.upiId}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-teal-600">
                        {copiedUpi ? (
                          <CheckCircle2 size={20} />
                        ) : (
                          <Copy size={20} />
                        )}
                      </div>
                    </button>
                  )}

                  {/* Payment Methods */}
                  <div className="flex justify-center gap-4 mb-6">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Pay_Logo.svg"
                      className="h-6"
                      alt="GPay"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg"
                      className="h-6"
                      alt="PhonePe"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
                      className="h-6"
                      alt="Paytm"
                    />
                  </div>

                  {/* Bank Details */}
                  {safeClientData.payment.bankDetails?.accountNumber && (
                    <div className="mt-4 pt-4 border-t border-teal-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 size={18} className="text-teal-600" />
                        <h4 className="text-sm font-bold text-gray-800">
                          Bank Transfer
                        </h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Account:</span>
                          <span className="text-gray-800 font-mono">
                            {safeClientData.payment.bankDetails.accountNumber}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">IFSC:</span>
                          <span className="text-gray-800 font-mono">
                            {safeClientData.payment.bankDetails.ifscCode}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === "gallery" && (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-700">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Our Gallery
              </h3>
              {safeClientData.gallery.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {safeClientData.gallery.map((item, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-square rounded-xl overflow-hidden border border-teal-200 hover:border-teal-400 transition-all shadow-sm"
                    >
                      <img
                        src={getImageUrl(item.url)}
                        alt={item.caption || "Gallery"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/600x400";
                        }}
                      />
                      {item.caption && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          <p className="text-sm text-white font-medium">
                            {item.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white border border-teal-100 rounded-2xl">
                  <Star size={48} className="text-teal-300 mx-auto mb-3" />
                  <p className="text-gray-500">No gallery images</p>
                </div>
              )}
            </div>
          )}
          <div className="px-6 mb-6 mt-12">
            <div className="bg-white border border-teal-200 rounded-2xl p-2 shadow-lg">
              <div className="flex gap-2">
                <a
                  href={`tel:${safeClientData.phone}`}
                  className="flex-1 py-4 bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all font-medium"
                >
                  <Phone size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Call Now
                  </span>
                </a>
                <a
                  href={`https://wa.me/${safeClientData.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all font-medium"
                >
                  <MessageCircle size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Footer - Updated to Teal */}
        <div className="relative mt-8 pt-8 pb-8 px-6 text-center border-t border-teal-100">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="h-full w-full bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>

          <div className="relative">
            <p className="text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase mb-3">
              POWERED BY
            </p>
            <div className="flex flex-col items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 font-black text-xl tracking-tight">
                SkyWhale
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">by</span>
                <a
                  href="https://noontechstudio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1"
                >
                  <span className="text-gray-700 font-bold text-sm group-hover:text-teal-600 transition-colors">
                    NOON TECH STUDIO
                  </span>
                  <ExternalLink
                    size={12}
                    className="text-gray-400 group-hover:text-teal-600"
                  />
                </a>
              </div>
            </div>
            <p className="text-gray-400 text-[8px] font-black tracking-[0.3em] uppercase mt-4">
              VERTEX LUXURY • DIGITAL CARD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VertexTemplate;
