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
} from "lucide-react";
import { sampleClient } from "../data/sampleData";

const VertexTemplate = ({ clientData = sampleClient }) => {
  const [activeSection, setActiveSection] = useState("about");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: clientData.businessName,
          text: clientData.tagline,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-amber-200/30 font-sans">
      <div className="max-w-md mx-auto bg-slate-950 shadow-[0_0_80px_rgba(0,0,0,0.8)] min-h-screen relative overflow-hidden border-x border-slate-800/50">
        {/* Luxury Background FX */}
        <div className="absolute top-[-5%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[80px]"></div>

        {/* Header - Elite Concierge Style */}
        <div className="relative pt-14 pb-12 px-8">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500 to-indigo-600 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
                <div className="relative w-28 h-28 p-[1.5px] rounded-[2.5rem] bg-gradient-to-tr from-amber-200 via-slate-700 to-amber-500">
                  <div className="w-full h-full bg-slate-950 rounded-[2.4rem] overflow-hidden p-1">
                    <img
                      src={clientData.businessLogo}
                      alt="Elite Logo"
                      className="w-full h-full object-cover rounded-[2.1rem]"
                    />
                  </div>
                </div>
                <div
                  className="absolute -bottom-1 -right-1 bg-slate-900 border border-amber-200/40 p-2 rounded-2xl shadow-2xl animate-bounce"
                  style={{ animationDuration: "4s" }}
                >
                  <Award size={18} className="text-amber-200" />
                </div>
              </div>

              <button
                onClick={handleShare}
                className="group p-4 bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-2xl hover:border-amber-200/50 transition-all duration-500 active:scale-90"
              >
                <Share2
                  size={22}
                  className="text-slate-400 group-hover:text-amber-200"
                />
              </button>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/5 border border-amber-200/20">
                <Sparkles size={12} className="text-amber-200" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-200/80">
                  Vertex Diamond Member
                </span>
              </div>

              <h1 className="text-4xl font-black tracking-tight text-white leading-[1.1]">
                {clientData.businessName}
              </h1>

              <p className="text-slate-400 text-lg font-light leading-relaxed italic border-l-2 border-amber-200/30 pl-4">
                "{clientData.tagline}"
              </p>

              <div className="flex items-center gap-4 pt-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-amber-100 text-xl font-bold shadow-xl">
                  {clientData.ownerName.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-lg font-bold tracking-tight">
                    {clientData.ownerName}
                  </p>
                  <p className="text-amber-200/60 text-xs font-bold uppercase tracking-widest">
                    {clientData.ownerTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Action Grid */}
        <div className="px-6 grid grid-cols-4 gap-3 mb-12 relative z-10">
          {[
            {
              icon: <Phone size={22} />,
              label: "Call",
              href: `tel:${clientData.phone}`,
            },
            {
              icon: <MessageCircle size={22} />,
              label: "Chat",
              href: `https://wa.me/${clientData.whatsapp}`,
            },
            {
              icon: <Mail size={22} />,
              label: "Mail",
              href: `mailto:${clientData.email}`,
            },
            {
              icon: <MapPin size={22} />,
              label: "Maps",
              href: clientData.social.googleMaps,
            },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="flex flex-col items-center justify-center gap-2.5 py-5 rounded-[1.5rem] bg-slate-900/30 border border-slate-800/50 hover:border-amber-200/30 hover:bg-slate-800/40 transition-all duration-300 group"
            >
              <div className="text-slate-400 group-hover:text-amber-200 group-hover:scale-110 transition-all">
                {item.icon}
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-300">
                {item.label}
              </span>
            </a>
          ))}
        </div>

        {/* Tab Navigation - Ultra Thin */}
        <div className="px-6 mb-10">
          <div className="flex p-1.5 bg-slate-900/50 backdrop-blur-3xl border border-slate-800 rounded-2xl">
            {["about", "services", "gallery", "payment"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSection(tab)}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-500 ${
                  activeSection === tab
                    ? "bg-amber-200 text-slate-950 shadow-lg"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Modules */}
        <div className="px-6 pb-28">
          {activeSection === "about" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="bg-slate-900/20 border border-slate-800/40 rounded-[2.5rem] p-8">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px flex-1 bg-slate-800/60"></div>
                  <h3 className="text-amber-200 text-[10px] font-bold uppercase tracking-[0.4em]">
                    Establishment Details
                  </h3>
                  <div className="h-px flex-1 bg-slate-800/60"></div>
                </div>

                <div className="space-y-10">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-amber-200/5 border border-amber-200/10 flex items-center justify-center shrink-0 shadow-inner">
                      <MapPin size={20} className="text-amber-200" />
                    </div>
                    <div>
                      <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
                        Corporate Address
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed font-medium">
                        {clientData.contact[0].address}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center shrink-0 shadow-inner">
                      <Clock size={20} className="text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
                        Service Window
                      </h4>
                      {clientData.contact[4].openingHours.map((h, i) => (
                        <p
                          key={i}
                          className="text-slate-300 text-sm font-medium flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/40"></span>{" "}
                          {h}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Social Grid */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  {
                    icon: <Instagram size={22} />,
                    color: "hover:border-pink-500/40",
                    href: clientData.social.instagram,
                  },
                  {
                    icon: <Linkedin size={22} />,
                    color: "hover:border-blue-500/40",
                    href: clientData.social.linkedin,
                  },
                  {
                    icon: <Facebook size={22} />,
                    color: "hover:border-blue-600/40",
                    href: clientData.social.facebook,
                  },
                  {
                    icon: <Youtube size={22} />,
                    color: "hover:border-red-500/40",
                    href: clientData.social.youtube,
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className={`flex items-center justify-center h-16 rounded-2xl bg-slate-900/40 border border-slate-800 transition-all ${social.color} group`}
                  >
                    <div className="text-slate-500 group-hover:text-white transition-colors">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {activeSection === "services" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {clientData.services.map((service, idx) => (
                <div
                  key={idx}
                  className="group relative p-7 rounded-[2rem] bg-slate-900/20 border border-slate-800 hover:border-amber-200/20 transition-all duration-500"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-lg mb-2 group-hover:text-amber-200 transition-colors">
                        {service.name}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "payment" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {/* Primary QR Card */}
              <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[3rem] p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/5 blur-3xl rounded-full"></div>

                <div className="text-center mb-10">
                  <p className="text-amber-200 text-[10px] font-black uppercase tracking-[0.5em] mb-4">
                    Secure Gateway
                  </p>
                  <h3 className="text-white text-2xl font-bold">
                    {clientData.businessName}
                  </h3>
                </div>

                <div className="relative mx-auto w-64 h-64 p-5 bg-white rounded-[2.5rem] shadow-[0_0_60px_rgba(255,255,255,0.05)] mb-10">
                  <img
                    src={clientData.payment.qrCode}
                    alt="Payment QR"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 border-[12px] border-white rounded-[2.5rem]"></div>
                </div>

                <div className="flex justify-center gap-6 mb-10">
                  <div className="flex flex-col items-center gap-2 grayscale opacity-50">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Pay_Logo.svg"
                      className="h-4"
                      alt="GPay"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2 grayscale opacity-50">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg"
                      className="h-4"
                      alt="PhonePe"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2 grayscale opacity-50">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
                      className="h-4"
                      alt="Paytm"
                    />
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(clientData.payment.upiId)}
                  className="w-full p-5 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center group active:scale-95 transition-all"
                >
                  <div>
                    <span className="text-slate-500 text-[10px] font-black uppercase block text-left mb-1">
                      UPI ID
                    </span>
                    <span className="text-amber-100 text-sm font-bold tracking-tight">
                      {clientData.payment.upiId}
                    </span>
                  </div>
                  {copied ? (
                    <CheckCircle2 size={20} className="text-green-500" />
                  ) : (
                    <Copy
                      size={20}
                      className="text-slate-600 group-hover:text-amber-200"
                    />
                  )}
                </button>
              </div>

              {/* Bank Details Card - Premium Addition */}
              <div className="bg-slate-900/20 border border-slate-800 rounded-[2.5rem] p-8">
                <div className="flex items-center gap-3 mb-8">
                  <Building2 className="text-amber-200" size={20} />
                  <h4 className="text-white font-bold">Direct Bank Transfer</h4>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-500 text-[10px] font-black uppercase mb-1">
                        Account Holder
                      </p>
                      <p className="text-slate-200 font-bold text-sm">
                        Noon Tech Studio
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] font-black uppercase mb-1">
                        Account Type
                      </p>
                      <p className="text-slate-200 font-bold text-sm">
                        Current Account
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
                    <p className="text-slate-500 text-[10px] font-black uppercase mb-1">
                      Account Number
                    </p>
                    <p className="text-amber-100 font-mono text-lg tracking-widest">
                      9876 5432 1012 3456
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
                    <p className="text-slate-500 text-[10px] font-black uppercase mb-1">
                      IFSC Code
                    </p>
                    <p className="text-amber-100 font-mono text-lg tracking-widest">
                      NTCH0009821
                    </p>
                  </div>
                </div>
              </div>

              {/* Accepted Cards Info */}
              <div className="flex items-center justify-between p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-indigo-400" size={20} />
                  <span className="text-slate-400 text-xs font-medium">
                    All Major Cards Accepted
                  </span>
                </div>
                <div className="flex gap-2 opacity-40">
                  <div className="w-8 h-5 bg-slate-700 rounded-sm"></div>
                  <div className="w-8 h-5 bg-slate-700 rounded-sm"></div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "gallery" && (
            <div className="grid grid-cols-2 gap-4 animate-in zoom-in-95 duration-700">
              {clientData.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-800"
                >
                  <img
                    src={item.url}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[10px] text-amber-200 font-black uppercase tracking-widest">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Noir Footer */}
        <div className="bg-slate-950 border-t border-slate-900/50 pt-16 pb-20 px-8 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center">
            <Star size={16} className="text-amber-200 fill-amber-200" />
          </div>

          <div className="space-y-8">
            <div className="inline-flex flex-col items-center">
              <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                Masterfully Crafted By
              </span>
              <a
                href="https://noontechstudio.com"
                className="text-white font-black text-xl tracking-tighter hover:text-amber-200 transition-colors"
              >
                NOON TECH STUDIO
              </a>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="px-6 py-2 rounded-xl bg-slate-900/50 border border-slate-800 inline-flex items-center gap-3">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  Powered by
                </span>
                <span className="text-indigo-400 font-black text-xs tracking-widest">
                  ONEPAGER+
                </span>
              </div>
              <p className="text-slate-700 text-[9px] font-black tracking-[0.3em] uppercase">
                © 2025 • VERTEX LUXURY • WORLDWIDE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VertexTemplate;
