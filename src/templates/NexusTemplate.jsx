import React, { useState } from "react";
import {
  Phone, Mail, MapPin, MessageCircle, Share2,
  Instagram, Facebook, Youtube, Linkedin,
  Clock, ExternalLink, Star, ArrowUpRight, Copy,
  CheckCircle2, Building2, CreditCard, Navigation,
  QrCode, User, Briefcase, Shield, ThumbsUp, Users, Info,
} from "lucide-react";
import { sampleClient } from "../data/sampleData";

const NexusTemplate = ({ clientData = sampleClient }) => {
  const [activeSection, setActiveSection] = useState("about");
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const safeClientData = {
    businessName: clientData?.businessName || "Nexus Elite",
    businessLogo: clientData?.businessLogo || "",
    ownerName: clientData?.ownerName || "John Doe",
    ownerTitle: clientData?.ownerTitle || "Founder & CEO",
    tagline: clientData?.tagline || "Excellence in Every Detail",
    businessType: clientData?.businessType || "service",
    phone: clientData?.contact?.phone || clientData?.phone || "+91 98765 43210",
    whatsapp: clientData?.contact?.whatsapp || clientData?.whatsapp || clientData?.contact?.phone || "+91 98765 43210",
    email: clientData?.contact?.email || clientData?.email || "contact@business.com",
    address: clientData?.contact?.address || clientData?.address || "123 Business Avenue, Suite 100",
    googleMapsUrl: clientData?.contact?.googleMapsUrl || clientData?.googleMapsUrl || "#",
    workingHours: clientData?.contact?.openingHours || clientData?.workingHours || [
      { day: "Monday",    open: "09:00", close: "18:00", closed: false },
      { day: "Tuesday",   open: "09:00", close: "18:00", closed: false },
      { day: "Wednesday", open: "09:00", close: "18:00", closed: false },
      { day: "Thursday",  open: "09:00", close: "18:00", closed: false },
      { day: "Friday",    open: "09:00", close: "18:00", closed: false },
      { day: "Saturday",  open: "10:00", close: "16:00", closed: false },
      { day: "Sunday",    open: "00:00", close: "00:00", closed: true  },
    ],
    items:   clientData?.items   || clientData?.services || [],
    gallery: clientData?.gallery || [],
    social:  clientData?.social  || { instagram: "#", linkedin: "#", facebook: "#", youtube: "#" },
    payment: clientData?.payment || { qrCode: "", upiId: "", acceptedMethods: [], bankDetails: {} },
  };

  const isOpenNow = () => {
    const now = new Date();
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const todaySchedule = safeClientData.workingHours.find(h => h.day === days[now.getDay()]);
    if (!todaySchedule || todaySchedule.closed) return false;
    const cur = `${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;
    return cur >= todaySchedule.open && cur <= todaySchedule.close;
  };

  const copyUpi = () => {
    if (safeClientData.payment.upiId) {
      navigator.clipboard.writeText(safeClientData.payment.upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: safeClientData.businessName, text: safeClientData.tagline, url: window.location.href }); } catch (e) {}
    }
  };

  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/300";
    if (typeof url !== "string") return url;
    if (url.startsWith("http") || url.startsWith("/") || url.startsWith("data:")) return url;
    return `http://localhost:5001${url}`;
  };

  const handleImageError = (id) => setImageErrors(prev => ({ ...prev, [id]: true }));

  const TABS = [
    { id: "about",    label: "About",   icon: Info     },
    { id: "services", label: safeClientData.businessType === "service" ? "Services" : "Products", icon: Briefcase },
    { id: "gallery",  label: "Gallery", icon: Star     },
    { id: "payment",  label: "Pay",     icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .font-display { font-family: 'Playfair Display', Georgia, serif; }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.4s ease forwards; }

        .gold-line {
          background: linear-gradient(90deg, transparent, #c9a84c, transparent);
          height: 1px;
        }
        .gold-text {
          background: linear-gradient(135deg, #b8860b, #d4a017, #c9a84c, #b8860b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-hover {
          transition: all 0.25s ease;
        }
        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
        }
        .tab-active {
          background: #1a1a1a;
          color: #ffffff;
          box-shadow: 0 2px 12px rgba(0,0,0,0.15);
        }
        .tab-inactive {
          color: #8a7a6a;
        }
        .tab-inactive:hover {
          color: #3d2f1e;
          background: rgba(201,168,76,0.08);
        }
      `}</style>

      <div className="max-w-md mx-auto bg-[#faf6f0] min-h-screen relative" style={{ boxShadow: "0 0 60px rgba(0,0,0,0.12)" }}>

        {/* ── TOP GOLD ACCENT BAR ── */}
        <div style={{ background: "linear-gradient(90deg, #8B6914, #C9A84C, #E8C97A, #C9A84C, #8B6914)", height: "3px" }} />

        {/* ── SHARE BUTTON ── */}
        <div className="absolute top-5 right-5 z-50">
          <button onClick={handleShare}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 border border-stone-100">
            <Share2 size={15} className="text-stone-500" />
          </button>
        </div>

        {/* ════════════════════════════════════════
            HERO SECTION
        ════════════════════════════════════════ */}
        <div className="px-7 pt-10 pb-8 relative overflow-hidden">

          {/* Subtle warm background texture */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 20% 10%, rgba(201,168,76,0.06) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(139,105,20,0.04) 0%, transparent 50%)"
          }} />

          <div className="relative flex flex-col items-center text-center">

            {/* Logo */}
            <div className="relative mb-6">
              {/* Outer glow ring */}
              <div style={{
                position: "absolute", inset: "-6px",
                background: "linear-gradient(135deg, #C9A84C, #f5e6c0, #C9A84C, #8B6914)",
                borderRadius: "28px",
                padding: "2px",
                opacity: 0.6
              }} />
              <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-white"
                style={{ boxShadow: "0 4px 24px rgba(139,105,20,0.2), 0 0 0 1px rgba(201,168,76,0.3)" }}>
                {!imageErrors.logo ? (
                  <img src={getImageUrl(safeClientData.businessLogo)} alt="Logo"
                    className="w-full h-full object-cover"
                    onError={() => handleImageError("logo")} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #f5e6c0, #e8d5a0)" }}>
                    <Building2 size={36} className="gold-text" style={{ color: "#C9A84C" }} />
                  </div>
                )}
              </div>
              {/* Gold star badge */}
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white"
                style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)", boxShadow: "0 2px 8px rgba(139,105,20,0.4)" }}>
                <Star size={12} fill="white" className="text-white" />
              </div>
            </div>

            {/* Business name — serif display */}
            <h1 className="font-display text-4xl font-bold text-[#1a1008] leading-tight tracking-tight mb-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {safeClientData.businessName}
            </h1>

            {/* Gold rule */}
            <div className="flex items-center gap-3 my-3 w-full max-w-xs">
              <div className="flex-1 gold-line" />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A84C" }} />
              <div className="flex-1 gold-line" />
            </div>

            {/* Tagline */}
            <p className="text-[#6b5a47] text-sm font-light italic leading-relaxed max-w-xs mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              "{safeClientData.tagline}"
            </p>

            {/* Owner pill */}
            <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3.5 w-full border border-stone-100"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #fdf3d8, #f5e6c0)", border: "1px solid rgba(201,168,76,0.3)" }}>
                <User size={18} style={{ color: "#9a7218" }} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] mb-0.5" style={{ color: "#C9A84C" }}>Proprietor</p>
                <p className="font-bold text-[#1a1008] text-sm leading-tight">{safeClientData.ownerName}</p>
                <p className="text-[#8a7a6a] text-[11px]">{safeClientData.ownerTitle}</p>
              </div>
              <div className="h-10 w-px bg-stone-100" />
              <div className="text-center pl-2 shrink-0">
                <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-0.5">Est.</p>
                <p className="font-bold text-[#1a1008] text-sm">2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div className="px-7 mb-6">
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: safeClientData.items?.length || "0", label: "Services",   color: "#2563eb", bg: "#eff6ff", border: "#dbeafe" },
              { value: "15+",  label: "Yrs Exp",    color: "#9a7218", bg: "#fdf3d8", border: "rgba(201,168,76,0.3)" },
              { value: "100%", label: "Satisfied",  color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-3 text-center card-hover"
                style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                <p className="font-black text-xl leading-none mb-1" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: s.color, opacity: 0.7 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── QUICK ACTION BUTTONS ── */}
        <div className="px-7 mb-6">
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Phone,         label: "Call",     href: `tel:${safeClientData.phone}`,                                             bg: "#1d4ed8", shadow: "rgba(29,78,216,0.25)" },
              { icon: MessageCircle, label: "Chat",     href: `https://wa.me/${safeClientData.whatsapp.replace(/[^0-9]/g,"")}`,          bg: "#16a34a", shadow: "rgba(22,163,74,0.25)" },
              { icon: Mail,          label: "Email",    href: `mailto:${safeClientData.email}`,                                          bg: "#7c3aed", shadow: "rgba(124,58,237,0.25)" },
              { icon: MapPin,        label: "Maps",     href: safeClientData.googleMapsUrl || "#",
                disabled: !safeClientData.googleMapsUrl || safeClientData.googleMapsUrl === "#",
                bg: "#b45309", shadow: "rgba(180,83,9,0.25)" },
            ].map((item, i) =>
              item.disabled ? (
                <div key={i} className="flex flex-col items-center gap-1.5 py-3 rounded-xl opacity-30 cursor-not-allowed bg-stone-100">
                  <item.icon size={18} className="text-stone-400" />
                  <span className="text-[9px] font-bold uppercase tracking-wide text-stone-400">{item.label}</span>
                </div>
              ) : (
                <a key={i} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 py-3 rounded-xl active:scale-95 transition-all duration-200"
                  style={{ background: item.bg, boxShadow: `0 4px 12px ${item.shadow}` }}>
                  <item.icon size={18} className="text-white" />
                  <span className="text-[9px] font-bold uppercase tracking-wide text-white/90">{item.label}</span>
                </a>
              )
            )}
          </div>
        </div>

        {/* ── TAB BAR ── */}
        <div className="px-7 mb-5">
          <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-[#ede8e0]">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveSection(tab.id)}
                className={`py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex flex-col items-center gap-1 transition-all duration-200 ${
                  activeSection === tab.id ? "tab-active" : "tab-inactive"
                }`}>
                <tab.icon size={13} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════
            TAB CONTENT
        ════════════════════════════════════════ */}
        <div className="px-7 pb-36 min-h-[400px]">

          {/* ── ABOUT ── */}
          {activeSection === "about" && (
            <div className="space-y-3 animate-fadeUp">

              {/* Address */}
              <div className="bg-white rounded-2xl p-4 border border-stone-100 card-hover"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "#fdf3d8", border: "1px solid rgba(201,168,76,0.25)" }}>
                    <MapPin size={16} style={{ color: "#9a7218" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] mb-1" style={{ color: "#C9A84C" }}>Location</p>
                    <p className="text-[#2d1f0e] text-sm leading-relaxed">{safeClientData.address}</p>
                    {safeClientData.googleMapsUrl && safeClientData.googleMapsUrl !== "#" && (
                      <a href={safeClientData.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-blue-600 hover:underline">
                        <Navigation size={10} /> Get Directions
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Phone + Email */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Phone, label: "Phone", href: `tel:${safeClientData.phone}`, value: safeClientData.phone, color: "#2563eb", bg: "#eff6ff", border: "#dbeafe" },
                  { icon: Mail,  label: "Email", href: `mailto:${safeClientData.email}`, value: safeClientData.email, color: "#7c3aed", bg: "#f5f3ff", border: "#e9d5ff" },
                ].map(({ icon: Icon, label, href, value, color, bg, border }) => (
                  <div key={label} className="bg-white rounded-2xl p-3.5 border border-stone-100 card-hover"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2"
                      style={{ background: bg, border: `1px solid ${border}` }}>
                      <Icon size={14} style={{ color }} />
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-wider text-stone-400 mb-0.5">{label}</p>
                    <a href={href} className="text-[#1a1008] text-[11px] font-semibold break-all hover:underline"
                      style={{ color: "#2d1f0e" }}>
                      {value}
                    </a>
                  </div>
                ))}
              </div>

              {/* Working Hours */}
              <div className="bg-white rounded-2xl p-4 border border-stone-100 card-hover"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                      <Clock size={14} style={{ color: "#15803d" }} />
                    </div>
                    <p className="text-sm font-bold text-[#1a1008]">Business Hours</p>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                    isOpenNow()
                      ? "text-green-700 bg-green-100"
                      : "text-red-600 bg-red-50"
                  }`}>
                    {isOpenNow() ? "● Open Now" : "○ Closed"}
                  </span>
                </div>
                <div className="space-y-2">
                  {safeClientData.workingHours.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-stone-50 last:border-0">
                      <span className={`font-semibold w-24 ${h.closed ? "text-stone-300" : "text-[#3d2f1e]"}`}>
                        {h.day}
                      </span>
                      {h.closed ? (
                        <span className="text-red-400 text-[11px] font-medium">Closed</span>
                      ) : (
                        <span className="font-mono font-semibold text-[#2d1f0e] text-[11px]">{h.open} – {h.close}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              {Object.values(safeClientData.social).some(v => v && v !== "#") && (
                <div className="bg-white rounded-2xl p-4 border border-stone-100 card-hover"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] mb-3" style={{ color: "#C9A84C" }}>
                    Connect With Us
                  </p>
                  <div className="flex gap-2">
                    {[
                      { key: "instagram", icon: Instagram, color: "#e1306c", bg: "#fce7f3", border: "#fbcfe8" },
                      { key: "facebook",  icon: Facebook,  color: "#1877f2", bg: "#eff6ff", border: "#bfdbfe" },
                      { key: "youtube",   icon: Youtube,   color: "#ff0000", bg: "#fef2f2", border: "#fecaca" },
                      { key: "linkedin",  icon: Linkedin,  color: "#0a66c2", bg: "#eff6ff", border: "#bfdbfe" },
                    ].filter(s => safeClientData.social[s.key] && safeClientData.social[s.key] !== "#")
                    .map(({ key, icon: Icon, color, bg, border }) => (
                      <a key={key} href={safeClientData.social[key]} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                        style={{ background: bg, border: `1px solid ${border}` }}>
                        <Icon size={16} style={{ color }} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── SERVICES ── */}
          {activeSection === "services" && (
            <div className="space-y-3 animate-fadeUp">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 gold-line" />
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-stone-400">
                  {safeClientData.businessType === "service" ? "Our Services" : "Our Products"}
                </p>
                <div className="flex-1 gold-line" />
              </div>

              {safeClientData.items.length > 0 ? (
                safeClientData.items.map((item, idx) => (
                  <div key={idx} className="group bg-white rounded-2xl p-4 border border-stone-100 card-hover cursor-default"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div className="flex items-start gap-3">
                      {/* Number badge */}
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                        style={{ background: "linear-gradient(135deg, #fdf3d8, #f0e0a0)", border: "1px solid rgba(201,168,76,0.3)" }}>
                        <span className="font-black text-sm" style={{ color: "#9a7218" }}>{idx + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#1a1008] text-sm mb-0.5 group-hover:text-[#9a7218] transition-colors"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                          {item.name}
                        </h4>
                        {item.description && (
                          <p className="text-[#6b5a47] text-xs leading-relaxed mt-1">{item.description}</p>
                        )}
                        {item.price && (
                          <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg"
                            style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                            <span className="font-black text-xs text-green-700">₹{item.price}</span>
                          </div>
                        )}
                      </div>
                      <ArrowUpRight size={15} className="shrink-0 transition-all text-stone-300 group-hover:text-[#C9A84C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mt-0.5" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-stone-100">
                  <Briefcase size={36} className="text-stone-300 mx-auto mb-3" />
                  <p className="text-stone-400 text-sm">No services listed yet</p>
                </div>
              )}
            </div>
          )}

          {/* ── GALLERY ── */}
          {activeSection === "gallery" && (
            <div className="animate-fadeUp">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 gold-line" />
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-stone-400">Gallery</p>
                <div className="flex-1 gold-line" />
              </div>

              {safeClientData.gallery.length > 0 ? (
                <div className="grid grid-cols-2 gap-2.5">
                  {safeClientData.gallery.map((item, idx) => (
                    <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden border border-stone-100"
                      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                      {!imageErrors[`gallery-${idx}`] ? (
                        <img src={getImageUrl(item.url)} alt={item.caption || "Gallery"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={() => handleImageError(`gallery-${idx}`)} />
                      ) : (
                        <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                          <Star size={24} className="text-stone-300" />
                        </div>
                      )}
                      {item.caption && (
                        <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: "linear-gradient(to top, rgba(26,16,8,0.75), transparent)" }}>
                          <p className="text-white text-[11px] font-semibold leading-tight">{item.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-stone-100">
                  <Star size={36} className="text-stone-300 mx-auto mb-3" />
                  <p className="text-stone-400 text-sm">No gallery images yet</p>
                </div>
              )}
            </div>
          )}

          {/* ── PAYMENT ── */}
          {activeSection === "payment" && (
            <div className="space-y-4 animate-fadeUp">

              {/* Header */}
              <div className="text-center py-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
                  style={{ background: "#fdf3d8", border: "1px solid rgba(201,168,76,0.3)" }}>
                  <Shield size={11} style={{ color: "#9a7218" }} />
                  <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: "#9a7218" }}>Secure · Trusted · Instant</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#1a1008]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {safeClientData.businessName}
                </h3>
              </div>

              {/* QR Code */}
              <div className="flex justify-center">
                {safeClientData.payment.qrCode ? (
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-3xl opacity-30"
                      style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)", filter: "blur(16px)" }} />
                    <div className="relative w-48 h-48 p-3 bg-white rounded-2xl"
                      style={{ border: "2px solid rgba(201,168,76,0.3)", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
                      <img src={getImageUrl(safeClientData.payment.qrCode)} alt="Payment QR"
                        className="w-full h-full rounded-xl"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/300x300?text=QR"; }} />
                    </div>
                  </div>
                ) : (
                  <div className="w-48 h-48 bg-white border-2 border-dashed border-stone-200 rounded-2xl flex items-center justify-center">
                    <QrCode size={48} className="text-stone-300" />
                  </div>
                )}
              </div>

              {/* Scan hint */}
              <p className="text-center text-[11px] text-stone-400 font-medium">
                Scan with any UPI app to pay instantly
              </p>

              {/* UPI ID copy */}
              {safeClientData.payment.upiId && (
                <button onClick={copyUpi}
                  className="w-full bg-white rounded-2xl p-4 flex items-center justify-between border transition-all active:scale-98"
                  style={{
                    borderColor: copiedUpi ? "#bbf7d0" : "rgba(201,168,76,0.3)",
                    boxShadow: copiedUpi ? "0 0 0 3px rgba(21,128,61,0.1)" : "0 2px 12px rgba(0,0,0,0.04)"
                  }}>
                  <div className="text-left">
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] mb-1" style={{ color: "#C9A84C" }}>UPI ID</p>
                    <p className="font-mono font-bold text-[#1a1008] text-sm">{safeClientData.payment.upiId}</p>
                  </div>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    copiedUpi ? "bg-green-100 text-green-600" : "bg-stone-50 text-stone-500"
                  }`} style={{ border: copiedUpi ? "1px solid #bbf7d0" : "1px solid #e7e2d8" }}>
                    {copiedUpi ? <CheckCircle2 size={16} /> : <Copy size={15} />}
                  </div>
                </button>
              )}

              {/* Payment logos */}
              <div className="flex items-center justify-center gap-5 py-2 opacity-70">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Pay_Logo.svg" className="h-6" alt="GPay" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" className="h-6" alt="PhonePe" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" className="h-6" alt="Paytm" />
              </div>

              {/* Bank Details */}
              {safeClientData.payment.bankDetails?.accountNumber && (
                <div className="bg-white rounded-2xl p-4 border border-stone-100"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 size={14} className="text-stone-500" />
                    <p className="text-xs font-bold text-[#1a1008]">Bank Transfer</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Account No", value: safeClientData.payment.bankDetails.accountNumber },
                      { label: "IFSC",       value: safeClientData.payment.bankDetails.ifscCode },
                      { label: "Bank",       value: safeClientData.payment.bankDetails.bankName },
                      { label: "Name",       value: safeClientData.payment.bankDetails.accountHolder },
                    ].filter(f => f.value).map(({ label, value }) => (
                      <div key={label} className="bg-stone-50 rounded-xl p-2.5 border border-stone-100">
                        <p className="text-[8px] text-stone-400 font-bold uppercase tracking-wider mb-0.5">{label}</p>
                        <p className="text-[#1a1008] font-mono text-[10px] font-semibold break-all">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════
            STICKY CTA BAR
        ════════════════════════════════════════ */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-6 pb-6 pt-4 z-40"
          style={{ background: "linear-gradient(to top, rgba(250,246,240,1) 70%, transparent)" }}>
          <div className="flex gap-3">
            <a href={`tel:${safeClientData.phone}`}
              className="flex-1 py-4 flex items-center justify-center gap-2 font-bold text-sm rounded-2xl text-white transition-all active:scale-95 hover:opacity-90"
              style={{ background: "#1a1008", boxShadow: "0 4px 16px rgba(26,16,8,0.3)" }}>
              <Phone size={16} /> Call Now
            </a>
            <a href={`https://wa.me/${safeClientData.whatsapp.replace(/[^0-9]/g,"")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 py-4 flex items-center justify-center gap-2 font-bold text-sm rounded-2xl text-white transition-all active:scale-95 hover:opacity-90"
              style={{ background: "#16a34a", boxShadow: "0 4px 16px rgba(22,163,74,0.3)" }}>
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="px-7 pt-4 pb-8 text-center border-t border-stone-100">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="flex-1 gold-line" style={{ maxWidth: "48px" }} />
            <div className="w-1 h-1 rounded-full" style={{ background: "#C9A84C" }} />
            <div className="flex-1 gold-line" style={{ maxWidth: "48px" }} />
          </div>
          <p className="text-stone-300 text-[8px] font-bold uppercase tracking-[0.25em] mb-1">Crafted by</p>
          <a href="https://noontechstudio.com" target="_blank" rel="noopener noreferrer"
            className="text-stone-500 font-black text-xs hover:text-stone-800 transition-colors tracking-tight">
            NOON TECH STUDIO
          </a>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <span className="text-stone-300 text-[8px]">powered by</span>
            <span className="text-[10px] font-black" style={{ color: "#C9A84C" }}>SkyWhale</span>
          </div>
          <p className="text-stone-200 text-[7px] tracking-[0.3em] uppercase font-bold mt-2">NEXUS · ELITE · DIGITAL</p>
        </div>

      </div>
    </div>
  );
};

export default NexusTemplate;