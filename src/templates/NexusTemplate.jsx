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
  ArrowUpRight,
  Copy,
  CheckCircle2,
  Building2,
  CreditCard,
  Zap,
  Globe,
  Navigation,
  QrCode,
  User,
  Calendar,
  Briefcase,
  GraduationCap,
  Heart,
  Shield,
  MailOpen,
  ThumbsUp,
  Users,
  FileText,
  Info,
  Diamond,
  Gem,
  Crown,
  Medal,
  Trophy,
  Rocket,
  Orbit,
  Infinity,
  Sparkle,
  Gauge,
  ShieldCheck,
  BadgeCheck,
  Palette,
  Layers,
  Frame,
  Hexagon,
  CircleDot,
  Orbit as OrbitIcon,
} from "lucide-react";
import { sampleClient } from "../data/sampleData";

const NexusTemplate = ({ clientData = sampleClient }) => {
  const [activeSection, setActiveSection] = useState("about");
  const [copied, setCopied] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // Enhanced data access with proper backend structure
  const safeClientData = {
    // Basic Info
    businessName: clientData?.businessName || "Nexus Elite",
    businessLogo: clientData?.businessLogo || "",
    ownerName: clientData?.ownerName || "John Doe",
    ownerTitle: clientData?.ownerTitle || "Founder & CEO",
    tagline: clientData?.tagline || "Excellence in Every Detail",
    businessType: clientData?.businessType || "service",

    // Contact Info
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
      instagram: "#",
      linkedin: "#",
      facebook: "#",
      youtube: "#",
    },

    // Payment
    payment: clientData?.payment || {
      qrCode: "",
      upiId: "",
      ifsc: "",
      accountNumber: "",
      acceptedMethods: [],
      bankDetails: {},
    },
  };

  // Format working hours
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

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen bg-[#03050a] selection:bg-sky-400/30 font-sans text-slate-200">
      <div className="max-w-md mx-auto bg-[#0a0d14] shadow-[0_0_150px_rgba(56,189,248,0.25)] min-h-screen relative overflow-hidden">
        {/* Ultra Premium Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Cosmic Orbs */}
          <div
            className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-600/20 rounded-full blur-[150px] animate-pulse"
            style={{ animationDuration: "8s" }}
          ></div>
          <div
            className="absolute bottom-[-10%] right-[-20%] w-[700px] h-[700px] bg-gradient-to-l from-emerald-500/20 to-teal-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: "2s", animationDuration: "10s" }}
          ></div>
          <div
            className="absolute top-[40%] left-[10%] w-[500px] h-[500px] bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-full blur-[100px] animate-pulse"
            style={{ animationDelay: "4s", animationDuration: "12s" }}
          ></div>

          {/* Particle Network */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="grid"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(56, 189, 248, 0.1)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-sky-400/20 rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${10 + Math.random() * 20}s`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.1 + Math.random() * 0.2,
              }}
            />
          ))}
        </div>

        {/* Premium Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-[0.02] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>

        {/* Floating Navigation Bar - Ultra Premium */}
        {/* Floating Share Button - Simplified */}
        <div className="sticky top-3 z-50 px-4">
          <div className="flex justify-end">
            <button onClick={handleShare} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-[#0a0d14]/90 backdrop-blur-2xl border border-white/10 rounded-xl p-3 group-hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl">
                <Share2 size={20} className="text-sky-400" />
              </div>
            </button>
          </div>
        </div>

        {/* Premium Hero Section */}
        <div className="relative px-5 pt-5 pb-6">
          <div className="relative z-10">
            {/* Ultra Premium Profile Section */}
            <div className="flex flex-col items-center text-center mb-6">
              {/* Multi-layer Premium Logo Ring */}
              <div className="relative mb-6 group">
                {/* Orbiting Rings */}
                <div
                  className="absolute -inset-8 animate-spin-slow"
                  style={{ animationDuration: "20s" }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-sky-400/20 rounded-full"></div>
                </div>
                <div
                  className="absolute -inset-6 animate-spin-slow"
                  style={{
                    animationDuration: "15s",
                    animationDirection: "reverse",
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-indigo-400/20 rounded-full"></div>
                </div>

                {/* Outer Glow Ring */}
                <div className="absolute -inset-4 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 rounded-[3.5rem] blur-2xl opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse"></div>

                {/* Middle Ring */}
                <div className="absolute -inset-2 bg-gradient-to-r from-white/20 to-white/5 rounded-[3rem] blur-md"></div>

                {/* Main Logo Container */}
                <div className="relative w-40 h-40 p-[3px] rounded-[2.8rem] bg-gradient-to-br from-white/40 via-white/20 to-white/5">
                  <div className="w-full h-full bg-[#0a0d14] rounded-[2.6rem] overflow-hidden p-2">
                    {!imageErrors.logo ? (
                      <img
                        src={getImageUrl(safeClientData.businessLogo)}
                        alt="Business Logo"
                        className="w-full h-full object-cover rounded-[2.4rem] ring-2 ring-white/20 group-hover:scale-110 transition-transform duration-700"
                        onError={() => handleImageError("logo")}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-sky-500 to-indigo-500 rounded-[2.4rem] flex items-center justify-center">
                        <Building2 size={40} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating Premium Badges */}
                {/* <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-xl shadow-2xl animate-float">
                  <Trophy size={16} className="text-white" />
                </div> */}
                {/* <div className="absolute -top-2 -left-2 bg-gradient-to-br from-purple-400 to-pink-500 p-3 rounded-xl shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
                  <Gem size={16} className="text-white" />
                </div> */}
              </div>

              {/* Premium Business Name with Gradient */}
              <h1 className="text-5xl font-black tracking-tighter mb-2 mt-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-slate-400">
                  {safeClientData.businessName}
                </span>
              </h1>

              {/* Verified Badge */}
              {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 rounded-full border border-sky-500/30 backdrop-blur-sm mb-3">
                <BadgeCheck size={12} className="text-sky-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">VERIFIED ELITE</span>
              </div> */}

              {/* Decorative Line */}
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>
                <Sparkle size={14} className="text-sky-400" />
                <div className="h-px w-8 bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>
              </div>

              {/* Premium Tagline Card */}
              <div className="relative group w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 rounded-xl blur-md"></div>
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-slate-300 text-sm italic font-light leading-relaxed">
                    "{safeClientData.tagline}"
                  </p>
                </div>
              </div>
            </div>

            {/* Owner Info Card - Premium */}
            <div className="relative group mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 rounded-xl blur-md"></div>
              <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center border border-white/20">
                    <User size={24} className="text-sky-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-sky-400 font-medium uppercase tracking-wider mb-0.5">
                      PROPRIETOR
                    </p>
                    <p className="text-white font-bold text-lg tracking-tight">
                      {safeClientData.ownerName}
                    </p>
                    <p className="text-sky-400/80 text-xs">
                      {safeClientData.ownerTitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Stats Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-indigo-500/20 rounded-xl blur-sm"></div>
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                  <Briefcase size={18} className="text-sky-400 mx-auto mb-1" />
                  <p className="text-white font-bold text-lg">
                    {safeClientData.items?.length || 0}
                  </p>
                  <p className="text-[8px] text-slate-500 uppercase tracking-wider">
                    Services
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl blur-sm"></div>
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                  <Users size={18} className="text-purple-400 mx-auto mb-1" />
                  <p className="text-white font-bold text-lg">15+</p>
                  <p className="text-[8px] text-slate-500 uppercase tracking-wider">
                    Years
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl blur-sm"></div>
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                  <ThumbsUp
                    size={18}
                    className="text-emerald-400 mx-auto mb-1"
                  />
                  <p className="text-white font-bold text-lg">100%</p>
                  <p className="text-[8px] text-slate-500 uppercase tracking-wider">
                    Satisfaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Quick Action Grid */}
        <div className="px-5 mb-4">
          <div className="grid grid-cols-4 gap-1.5">
            {[
              {
                icon: Phone,
                href: `tel:${safeClientData.phone}`,
                gradient: "from-sky-400 to-blue-500",
                label: "Call",
              },
              {
                icon: MessageCircle,
                href: `https://wa.me/${safeClientData.whatsapp.replace(/[^0-9]/g, "")}`,
                gradient: "from-emerald-400 to-teal-500",
                label: "WhatsApp",
              },
              {
                icon: Mail,
                href: `mailto:${safeClientData.email}`,
                gradient: "from-purple-400 to-pink-500",
                label: "Email",
              },
              {
                icon: MapPin,
                href: safeClientData.googleMapsUrl,
                gradient: "from-amber-400 to-orange-500",
                label: "Maps",
                disabled:
                  !safeClientData.googleMapsUrl ||
                  safeClientData.googleMapsUrl === "#",
              },
            ].map((item, idx) =>
              item.disabled ? (
                <button
                  key={idx}
                  disabled
                  className="relative flex flex-col items-center gap-1 p-2.5 bg-white/5 border border-white/10 rounded-lg opacity-50 cursor-not-allowed"
                >
                  <item.icon size={16} className="text-slate-500" />
                  <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500">
                    {item.label}
                  </span>
                </button>
              ) : (
                <a
                  key={idx}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center gap-1 p-2.5 rounded-lg overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}
                  ></div>
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"></div>
                  <div className="relative">
                    <item.icon size={16} className="text-white" />
                  </div>
                  <span className="relative text-[8px] font-bold uppercase tracking-wider text-white/80">
                    {item.label}
                  </span>
                </a>
              ),
            )}
          </div>
        </div>

        {/* Premium Tab Navigation */}
        <div className="px-5 mb-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-xl blur opacity-20"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1">
              <div className="grid grid-cols-4 gap-0.5">
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
                  { id: "payment", label: "Pay", icon: CreditCard },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`relative py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex flex-col items-center gap-1 overflow-hidden ${
                      activeSection === tab.id
                        ? "text-white"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {activeSection === tab.id && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-500"></div>
                        <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                      </>
                    )}
                    <tab.icon size={14} className="relative z-10" />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section - Adjusted padding for footer space */}
        <div className="px-5 pb-32 min-h-[350px]">
          {activeSection === "about" && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {/* Premium Address Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 rounded-xl blur-md"></div>
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500/20 to-indigo-500/20 flex items-center justify-center border border-white/10 flex-shrink-0">
                      <MapPin size={18} className="text-sky-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-sky-400 mb-1">
                        LOCATION
                      </h4>
                      <p className="text-white text-sm font-light leading-relaxed break-words">
                        {safeClientData.address}
                      </p>
                      {safeClientData.googleMapsUrl &&
                        safeClientData.googleMapsUrl !== "#" && (
                          <a
                            href={safeClientData.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-2 text-[10px] text-sky-400 hover:text-sky-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
                          >
                            <Navigation size={12} />
                            Get Directions
                          </a>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Contact Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl blur-sm"></div>
                  <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                    <Phone size={16} className="text-emerald-400 mb-2" />
                    <p className="text-[8px] text-slate-500 font-bold uppercase mb-1">
                      PHONE
                    </p>
                    <a
                      href={`tel:${safeClientData.phone}`}
                      className="text-white text-xs font-light break-all hover:text-sky-400 transition"
                    >
                      {safeClientData.phone}
                    </a>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl blur-sm"></div>
                  <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                    <MailOpen size={16} className="text-purple-400 mb-2" />
                    <p className="text-[8px] text-slate-500 font-bold uppercase mb-1">
                      EMAIL
                    </p>
                    <a
                      href={`mailto:${safeClientData.email}`}
                      className="text-white text-[10px] font-light break-all hover:text-sky-400 transition"
                    >
                      {safeClientData.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Premium Working Hours Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl blur-md"></div>
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-amber-400" />
                      <h4 className="text-xs font-bold text-white">Hours</h4>
                    </div>
                    <div
                      className={`px-2.5 py-1 rounded-lg text-[8px] font-bold backdrop-blur-sm border ${
                        isOpenNow()
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}
                    >
                      {isOpenNow() ? "● OPEN" : "○ CLOSED"}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {safeClientData.workingHours
                      .slice(0, 5)
                      .map((day, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-xs border-b border-white/5 pb-1"
                        >
                          <span
                            className={`font-medium ${day.closed ? "text-slate-600" : "text-slate-300"}`}
                          >
                            {day.day.slice(0, 3)}
                          </span>
                          {day.closed ? (
                            <span className="text-red-400/70 text-[10px] font-semibold px-2 py-0.5 bg-red-500/10 rounded">
                              Closed
                            </span>
                          ) : (
                            <span className="text-sky-400 font-mono text-[10px] bg-white/5 px-2 py-0.5 rounded">
                              {day.open} - {day.close}
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Premium Social Media */}
              {Object.values(safeClientData.social).some(
                (link) => link && link !== "#",
              ) && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-md"></div>
                  <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-1.5">
                      <Globe size={12} />
                      Connect
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {safeClientData.social.instagram &&
                        safeClientData.social.instagram !== "#" && (
                          <a
                            href={safeClientData.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-all border border-white/10 hover:border-purple-500/30"
                          >
                            <Instagram size={18} className="text-pink-400" />
                          </a>
                        )}
                      {safeClientData.social.facebook &&
                        safeClientData.social.facebook !== "#" && (
                          <a
                            href={safeClientData.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-all border border-white/10 hover:border-blue-500/30"
                          >
                            <Facebook size={18} className="text-blue-400" />
                          </a>
                        )}
                      {safeClientData.social.linkedin &&
                        safeClientData.social.linkedin !== "#" && (
                          <a
                            href={safeClientData.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-all border border-white/10 hover:border-blue-400/30"
                          >
                            <Linkedin size={18} className="text-blue-400" />
                          </a>
                        )}
                      {safeClientData.social.youtube &&
                        safeClientData.social.youtube !== "#" && (
                          <a
                            href={safeClientData.social.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-lg flex items-center justify-center hover:scale-110 transition-all border border-white/10 hover:border-red-500/30"
                          >
                            <Youtube size={18} className="text-red-400" />
                          </a>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === "services" && (
            <div className="space-y-3 animate-in fade-in slide-in-from-right-8 duration-700">
              <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                <Briefcase size={18} className="text-sky-400" />
                {safeClientData.businessType === "service"
                  ? "SERVICES"
                  : "PRODUCTS"}
              </h3>
              {safeClientData.items.length > 0 ? (
                safeClientData.items.map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 rounded-xl blur-md group-hover:opacity-100 opacity-0 transition-opacity"></div>
                    <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-4 hover:border-sky-500/30 transition-all duration-300 backdrop-blur-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                              <Briefcase size={14} className="text-white" />
                            </div>
                            <h4 className="text-white font-bold text-base tracking-tight">
                              {item.name}
                            </h4>
                          </div>
                          {item.description && (
                            <p className="text-slate-400 text-xs leading-relaxed mb-2 ml-11">
                              {item.description}
                            </p>
                          )}
                          {item.price && (
                            <div className="ml-11 inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-500/30">
                              <span className="text-emerald-400 font-bold text-sm">
                                ₹{item.price}
                              </span>
                              <span className="text-emerald-400/60 text-[8px]">
                                /service
                              </span>
                            </div>
                          )}
                        </div>
                        <ArrowUpRight
                          size={16}
                          className="text-slate-600 group-hover:text-sky-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-slate-600/10 rounded-xl blur-md"></div>
                  <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl py-12 px-4 text-center backdrop-blur-sm">
                    <Briefcase
                      size={40}
                      className="text-slate-600 mx-auto mb-3"
                    />
                    <p className="text-slate-500 text-sm">
                      No services listed yet
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === "payment" && (
            <div className="space-y-3 animate-in zoom-in-95 duration-700">
              {/* Ultra Premium Payment Card */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition duration-500 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl p-5 overflow-hidden">
                  {/* Background Glow */}
                  <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-sky-500/20 to-transparent"></div>

                  {/* Premium Header */}
                  <div className="text-center mb-5 relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-3 backdrop-blur-sm">
                      <Shield size={10} className="text-amber-400" />
                      <span className="text-[8px] font-black uppercase tracking-wider text-amber-400">
                        SECURE
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-1 tracking-tight">
                      {safeClientData.businessName}
                    </h3>
                    <p className="text-sky-400/80 text-[10px]">
                      ELITE PAYMENT GATEWAY
                    </p>
                  </div>

                  {/* Premium QR Code */}
                  {safeClientData.payment.qrCode ? (
                    <div className="relative mx-auto w-40 h-40 mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-xl blur-xl opacity-40"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 rounded-xl blur-sm"></div>
                      <div className="relative w-full h-full p-2 bg-white rounded-xl shadow-2xl">
                        <img
                          src={getImageUrl(safeClientData.payment.qrCode)}
                          alt="Payment QR"
                          className="w-full h-full rounded-lg"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/300x300?text=QR+Code";
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative mx-auto w-40 h-40 mb-4 bg-white/5 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center">
                      <QrCode size={40} className="text-slate-600" />
                    </div>
                  )}

                  {/* Premium UPI Section */}
                  {safeClientData.payment.upiId && (
                    <button
                      onClick={() =>
                        copyToClipboard(safeClientData.payment.upiId, "upi")
                      }
                      className="relative w-full mb-4 group/btn overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-500 opacity-20 group-hover/btn:opacity-30 transition-opacity rounded-xl"></div>
                      <div className="relative bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between backdrop-blur-sm">
                        <div className="text-left">
                          <p className="text-[8px] text-sky-400 mb-0.5 font-bold uppercase tracking-wider">
                            UPI ID
                          </p>
                          <p className="text-white font-mono text-xs">
                            {safeClientData.payment.upiId}
                          </p>
                        </div>
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-sky-400 group-hover/btn:bg-sky-500 group-hover/btn:text-white transition-all">
                          {copiedUpi ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <Copy size={14} />
                          )}
                        </div>
                      </div>
                    </button>
                  )}

                  {/* Payment Methods */}
                  <div className="flex justify-center gap-3 mb-3">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Pay_Logo.svg"
                      className="h-5 opacity-50 hover:opacity-100 transition-opacity"
                      alt="GPay"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg"
                      className="h-5 opacity-50 hover:opacity-100 transition-opacity"
                      alt="PhonePe"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
                      className="h-5 opacity-50 hover:opacity-100 transition-opacity"
                      alt="Paytm"
                    />
                  </div>

                  {/* Bank Details */}
                  {safeClientData.payment.bankDetails?.accountNumber && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Building2 size={12} className="text-sky-400" />
                        <h4 className="text-xs font-bold text-white">
                          Bank Transfer
                        </h4>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/5 p-2 rounded-lg">
                          <p className="text-slate-500 text-[8px] mb-0.5">
                            Account
                          </p>
                          <p className="text-white font-mono text-[10px] break-all">
                            {safeClientData.payment.bankDetails.accountNumber}
                          </p>
                        </div>
                        <div className="bg-white/5 p-2 rounded-lg">
                          <p className="text-slate-500 text-[8px] mb-0.5">
                            IFSC
                          </p>
                          <p className="text-white font-mono text-[10px]">
                            {safeClientData.payment.bankDetails.ifscCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === "gallery" && (
            <div className="space-y-3 animate-in fade-in zoom-in-95 duration-700">
              <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                <Star size={18} className="text-sky-400" />
                GALLERY
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {safeClientData.gallery.length > 0 ? (
                  safeClientData.gallery.map((item, idx) => (
                    <div key={idx} className="relative group aspect-square">
                      <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 group-hover:border-sky-500/50 transition-all duration-300">
                        {!imageErrors[`gallery-${idx}`] ? (
                          <img
                            src={getImageUrl(item.url)}
                            alt={item.caption || "Gallery"}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={() => handleImageError(`gallery-${idx}`)}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-sky-500/20 to-indigo-500/20 flex items-center justify-center">
                            <Image size={24} className="text-sky-400/50" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                          <p className="text-white text-[10px] font-medium">
                            {item.caption || "Elite Collection"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-slate-600/10 rounded-xl blur-md"></div>
                    <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl py-12 px-4 text-center backdrop-blur-sm">
                      <Star size={40} className="text-slate-600 mx-auto mb-3" />
                      <p className="text-slate-500 text-sm">
                        No gallery images
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Premium Action Buttons - Moved up and made compact */}
        <div className="px-5 mb-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 rounded-xl blur opacity-50 group-hover:opacity-70 transition"></div>
            <div className="relative bg-gradient-to-r from-slate-900 to-slate-950 border border-white/10 rounded-xl p-1 backdrop-blur-xl shadow-2xl">
              <div className="flex gap-1">
                <a
                  href={`tel:${safeClientData.phone}`}
                  className="flex-1 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-lg flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-95 transition-all font-bold text-xs hover:shadow-lg hover:shadow-sky-500/20"
                >
                  <Phone size={14} />
                  CALL
                </a>
                <a
                  href={`https://wa.me/${safeClientData.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-95 transition-all font-bold text-xs hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  <MessageCircle size={14} />
                  CHAT
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Brand Footer - Now visible and enhanced */}
        <div className="relative pb-5 px-5 text-center">
          <div className="absolute inset-0 bg-gradient-to-t from-sky-500/5 to-transparent"></div>

          <div className="relative">
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent"></div>
              <div className="w-1 h-1 rounded-full bg-sky-400/50"></div>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent"></div>
            </div>

            <p className="text-white/30 text-[8px] font-black tracking-[0.3em] uppercase mb-2">
              MASTERPIECE BY
            </p>

            <a
              href="https://noontechstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 mb-1"
            >
              <span className="text-white font-black text-sm tracking-tight group-hover:text-sky-400 transition-colors">
                NOON TECH STUDIO
              </span>
              <ExternalLink
                size={10}
                className="text-slate-600 group-hover:text-sky-400 transition-colors"
              />
            </a>

            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-slate-700 text-[8px]">powered by</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 font-black text-xs">
                SkyWhale
              </span>
            </div>

            <div className="flex items-center justify-center gap-1 text-[6px] text-slate-800 font-black tracking-[0.3em]">
              <span>NEXUS</span>
              <span className="w-1 h-1 rounded-full bg-sky-500/50"></span>
              <span>ELITE</span>
              <span className="w-1 h-1 rounded-full bg-sky-500/50"></span>
              <span>DIGITAL</span>
            </div>

            {/* Designed by credit */}
            <p className="text-white/20 text-[6px] font-medium tracking-wider mt-2">
              Designed by <span className="text-sky-400/40">Shailesh</span>
            </p>
          </div>
        </div>
      </div>

      {/* Global styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NexusTemplate;
