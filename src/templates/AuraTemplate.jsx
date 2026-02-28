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
  CheckCircle,
  User,
  Briefcase,
  Star,
  Shield,
  Navigation,
  CreditCard,
  Copy,
  CheckCircle2,
  Building2,
  Info,
  ThumbsUp,
} from "lucide-react";
import { sampleClient } from "../data/sampleData";

const AuraTemplate = ({ clientData = sampleClient }) => {
  const [activeSection, setActiveSection] = useState("about");
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Safe data access with fallbacks - Updated to match backend structure
  const safeClientData = {
    // Basic Info
    businessName: clientData?.businessName || "Business Name",
    businessLogo: clientData?.businessLogo || "",
    ownerName: clientData?.ownerName || "Owner Name",
    ownerTitle: clientData?.ownerTitle || "Owner",
    tagline: clientData?.tagline || "Your trusted partner",
    businessType: clientData?.businessType || "service",

    // Contact Info
    phone: clientData?.contact?.phone || clientData?.phone || "",
    whatsapp:
      clientData?.contact?.whatsapp ||
      clientData?.whatsapp ||
      clientData?.contact?.phone ||
      "",
    email: clientData?.contact?.email || clientData?.email || "",
    address:
      clientData?.contact?.address ||
      clientData?.address ||
      "Address not provided",
    googleMapsUrl:
      clientData?.contact?.googleMapsUrl || clientData?.googleMapsUrl || "#",

    // Working Hours
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

    // Items (services/products)
    items: clientData?.items || clientData?.services || [],

    // Gallery
    gallery: clientData?.gallery || [],

    // Social Media
    social: clientData?.social || {
      facebook: "#",
      instagram: "#",
      youtube: "#",
      linkedin: "#",
      googleMaps: "#",
    },

    // Payment
    payment: clientData?.payment || {
      upiId: "",
      qrCode: "",
      acceptedMethods: [],
      bankDetails: {},
      tagline: "Secure Payments",
    },
  };

  // Debug log
  console.log("AuraTemplate - Data:", safeClientData);

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

  const copyToClipboard = (text) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 font-sans">
      <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen relative overflow-hidden">
        {/* Header Section - Premium Design */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          {/* Premium Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500 rounded-full blur-3xl transform translate-x-32 -translate-y-32 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl transform -translate-x-32 translate-y-32 animate-pulse"></div>
          </div>

          {/* Decorative Grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>

          <div className="relative px-6 pt-8 pb-8">
            {/* Logo & Share */}
            <div className="flex items-start justify-between mb-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-blue-500 rounded-2xl opacity-60 group-hover:opacity-80 blur-sm transition"></div>
                <div className="relative w-24 h-24 bg-blue-500 rounded-2xl shadow-2xl overflow-hidden ring-4 ring-white/10">
                  {safeClientData.businessLogo ? (
                    <img
                      src={getImageUrl(safeClientData.businessLogo)}
                      alt="logo"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                      {safeClientData.businessName.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={handleShare}
                className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all hover:scale-105 border border-white/20"
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* Business Info */}
            <div className="space-y-3">
              {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 backdrop-blur-sm">
                <Award size={14} className="text-blue-400" />
                <span className="text-xs font-semibold text-gray-200">
                  Premium Business
                </span>
              </div> */}

              <h1 className="text-3xl font-bold tracking-tight leading-tight">
                {safeClientData.businessName}
              </h1>
              <p className="text-slate-300 text-base font-medium leading-relaxed">
                {safeClientData.tagline}
              </p>

              {/* Owner Info */}
              <div className="flex items-center gap-3 pt-2 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-l font-bold">
                    {safeClientData.ownerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-xl">
                      {safeClientData.ownerName}
                    </p>
                    <p className="text-xs text-slate-400">
                      {safeClientData.ownerTitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wave Divider */}
          {/* <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-8">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
            </svg>
          </div> */}
        </div>

        {/* Quick Stats */}
        {/* <div className="px-6 -mt-6 relative z-10 mb-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <Briefcase size={20} className="text-blue-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-slate-900">{safeClientData.items?.length || 0}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Services</p>
              </div>
              <div className="text-center">
                <Clock size={20} className="text-green-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-slate-900">
                  <span className={`inline-block w-2 h-2 rounded-full ${isOpenNow() ? 'bg-green-500' : 'bg-red-500'} mr-1`}></span>
                </p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{isOpenNow() ? 'Open' : 'Closed'}</p>
              </div>
              <div className="text-center">
                <ThumbsUp size={20} className="text-purple-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-slate-900">4.9</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Rating</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Quick Action Buttons */}
        <div className="px-6 mb-4 mt-4">
          <div className="grid grid-cols-4 gap-2">
            <a
              href={`tel:${safeClientData.phone}`}
              className="flex flex-col items-center gap-1 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all"
            >
              <Phone size={18} className="text-blue-600" />
              <span className="text-[8px] font-bold text-blue-700 uppercase tracking-wider">
                Call
              </span>
            </a>
            <a
              href={`https://wa.me/${safeClientData.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-all"
            >
              <MessageCircle size={18} className="text-green-600" />
              <span className="text-[8px] font-bold text-green-700 uppercase tracking-wider">
                Chat
              </span>
            </a>
            <a
              href={`mailto:${safeClientData.email}`}
              className="flex flex-col items-center gap-1 p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all"
            >
              <Mail size={18} className="text-purple-600" />
              <span className="text-[8px] font-bold text-purple-700 uppercase tracking-wider">
                Mail
              </span>
            </a>
            {safeClientData.googleMapsUrl &&
            safeClientData.googleMapsUrl !== "#" ? (
              <a
                href={safeClientData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 p-3 bg-red-50 rounded-xl hover:bg-red-100 transition-all"
              >
                <MapPin size={18} className="text-red-600" />
                <span className="text-[8px] font-bold text-red-700 uppercase tracking-wider">
                  Maps
                </span>
              </a>
            ) : (
              <button
                disabled
                className="flex flex-col items-center gap-1 p-3 bg-gray-100 rounded-xl cursor-not-allowed"
              >
                <MapPin size={18} className="text-gray-400" />
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">
                  Maps
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 mb-6">
          <div className="bg-slate-50 rounded-2xl p-1.5 border border-slate-200">
            <div className="grid grid-cols-4 gap-1">
              {["about", "services", "gallery", "payment"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSection(tab)}
                  className={`py-2.5 text-xs font-semibold capitalize rounded-xl transition-all ${
                    activeSection === tab
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  {tab === "services"
                    ? safeClientData.businessType === "service"
                      ? "Services"
                      : "Products"
                    : tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="px-6 pb-32 min-h-[300px]">
          {/* About Section */}
          {activeSection === "about" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {/* Address Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-500 mb-1">
                      Location
                    </p>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      {safeClientData.address}
                    </p>
                    {safeClientData.googleMapsUrl &&
                      safeClientData.googleMapsUrl !== "#" && (
                        <a
                          href={safeClientData.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-xs text-blue-600"
                        >
                          <Navigation size={12} /> Get Directions
                        </a>
                      )}
                  </div>
                </div>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <Phone size={18} className="text-green-600 mb-2" />
                  <p className="text-xs text-slate-500 font-semibold mb-1">
                    Phone
                  </p>
                  <a
                    href={`tel:${safeClientData.phone}`}
                    className="text-sm text-slate-800 font-medium break-all"
                  >
                    {safeClientData.phone}
                  </a>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <Mail size={18} className="text-purple-600 mb-2" />
                  <p className="text-xs text-slate-500 font-semibold mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${safeClientData.email}`}
                    className="text-sm text-slate-800 font-medium break-all"
                  >
                    {safeClientData.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-orange-500" />
                    <h4 className="text-sm font-bold text-slate-800">
                      Business Hours
                    </h4>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isOpenNow()
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isOpenNow() ? "Open Now" : "Closed"}
                  </span>
                </div>
                <div className="space-y-2">
                  {safeClientData.workingHours.map((day, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-slate-600">{day.day}</span>
                      {day.closed ? (
                        <span className="text-red-500 font-medium">Closed</span>
                      ) : (
                        <span className="text-slate-700">
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
                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <h4 className="text-sm font-bold text-slate-800 mb-3">
                    Connect With Us
                  </h4>
                  <div className="flex gap-2">
                    {safeClientData.social.facebook &&
                      safeClientData.social.facebook !== "#" && (
                        <a
                          href={safeClientData.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center"
                        >
                          <Facebook size={18} className="text-blue-600" />
                        </a>
                      )}
                    {safeClientData.social.instagram &&
                      safeClientData.social.instagram !== "#" && (
                        <a
                          href={safeClientData.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center"
                        >
                          <Instagram size={18} className="text-pink-600" />
                        </a>
                      )}
                    {safeClientData.social.youtube &&
                      safeClientData.social.youtube !== "#" && (
                        <a
                          href={safeClientData.social.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center"
                        >
                          <Youtube size={18} className="text-red-600" />
                        </a>
                      )}
                    {safeClientData.social.linkedin &&
                      safeClientData.social.linkedin !== "#" && (
                        <a
                          href={safeClientData.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center"
                        >
                          <Linkedin size={18} className="text-blue-600" />
                        </a>
                      )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Services Section */}
          {activeSection === "services" && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                {safeClientData.businessType === "service"
                  ? "Our Services"
                  : "Our Products"}
              </h3>
              {safeClientData.items.length > 0 ? (
                safeClientData.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-2xl p-4"
                  >
                    <h4 className="font-bold text-slate-900 mb-1">
                      {item.name}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-slate-600 mb-2">
                        {item.description}
                      </p>
                    )}
                    {item.price && (
                      <span className="text-sm font-bold text-green-600">
                        ₹{item.price}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-500 py-8">
                  No services listed
                </p>
              )}
            </div>
          )}

          {/* Gallery Section */}
          {activeSection === "gallery" && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Gallery</h3>
              {safeClientData.gallery.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {safeClientData.gallery.map((item, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-xl overflow-hidden border border-slate-200"
                    >
                      <img
                        src={getImageUrl(item.url)}
                        alt={item.caption || "Gallery"}
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/300")
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-slate-500 py-8">
                  No gallery images
                </p>
              )}
            </div>
          )}

          {/* Payment Section */}
          {activeSection === "payment" && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold text-center mb-4">
                  Scan & Pay
                </h3>
                {safeClientData.payment.qrCode ? (
                  <div className="bg-white p-4 rounded-xl mb-4">
                    <img
                      src={getImageUrl(safeClientData.payment.qrCode)}
                      alt="QR Code"
                      className="w-40 h-40 mx-auto"
                    />
                  </div>
                ) : (
                  <div className="bg-white/10 p-4 rounded-xl text-center mb-4">
                    <p className="text-sm">QR Code not available</p>
                  </div>
                )}
                {safeClientData.payment.upiId && (
                  <button
                    onClick={() =>
                      copyToClipboard(safeClientData.payment.upiId)
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 flex justify-between items-center"
                  >
                    <span className="text-sm">
                      {safeClientData.payment.upiId}
                    </span>
                    {copiedUpi ? (
                      <CheckCircle2 size={18} className="text-green-400" />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-6 mb-4">
          <div className="flex gap-3">
            <a
              href={`tel:${safeClientData.phone}`}
              className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold text-center hover:bg-blue-700 transition"
            >
              Call Now
            </a>
            <a
              href={`https://wa.me/${safeClientData.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold text-center hover:bg-green-700 transition"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center py-6 px-6">
          <p className="text-xs text-slate-400 mb-2">Powered by</p>
          <div className="flex items-center justify-center gap-2">
            <span className="font-bold text-blue-400">SkyWhale</span>
            <span className="text-xs text-slate-500">by</span>
            <a
              href="https://noontechstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold hover:text-blue-400 transition"
            >
              Noon Tech Studio
            </a>
          </div>
          <p className="text-xs text-slate-600 mt-3">
            © 2026 • Aura Digital Card
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuraTemplate;
