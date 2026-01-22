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
} from "lucide-react";
import { sampleClient } from "../data/sampleData";

const NexusTemplate = ({ clientData = sampleClient }) => {
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
    <div className="min-h-screen bg-[#00040d] selection:bg-sky-400/30 font-sans text-slate-200">
      <div className="max-w-md mx-auto bg-[#000814] shadow-[0_0_120px_rgba(30,58,138,0.3)] min-h-screen relative overflow-hidden">
        {/* Nexus Ambient Background */}
        <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-sky-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-125 h-125bg-violet-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>

        {/* Top Navigation Bar - Floating Glass */}
        <div className="sticky top-0 px-6 py-4">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl px-5 py-3 flex justify-between items-center shadow-2xl">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-sky-400 fill-sky-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">
                Nexus Elite
              </span>
            </div>
            <button
              onClick={handleShare}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors text-sky-400"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Hero Section - The Nexus Hub */}
        <div className="relative px-8 pt-6 pb-12">
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Ultra Premium Profile Ring */}
            <div className="relative mb-8 group">
              <div className="absolute -inset-1 bg-linear-to-tr from-sky-400 via-indigo-500 to-violet-600 rounded-[3rem] blur-xl opacity-40 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative w-36 h-36 p-[2px] rounded-[2.8rem] bg-linear-to-tr from-white/30 to-white/5">
                <div className="w-full h-full bg-slate-950 rounded-[2.7rem] overflow-hidden p-1.5">
                  <img
                    src={clientData.businessLogo}
                    alt="Nexus Elite"
                    className="w-full h-full object-cover rounded-[2.4rem] grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 right-0 bg-white text-slate-950 p-2.5 rounded-2xl shadow-2xl">
                <Award size={20} className="fill-current" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 leading-none">
                {clientData.businessName}
              </h1>
              <p className="text-sky-400/80 text-xs font-bold uppercase tracking-[0.5em] mb-4">
                Global Distinction
              </p>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-sky-500 to-transparent mx-auto"></div>
              <p className="text-slate-400 text-lg font-light italic max-w-xs mx-auto leading-relaxed">
                "{clientData.tagline}"
              </p>
            </div>
          </div>
        </div>

        {/* Nexus Tab System - Integrated Under Hero */}
        <div className="px-3 mb-10">
          <div className="flex justify-center gap-2">
            {["about", "services", "gallery", "payment"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSection(tab)}
                className={`px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 border ${
                  activeSection === tab
                    ? "bg-white text-slate-950 border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    : "bg-transparent text-slate-500 border-white/10 hover:border-white/30"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section with Premium Transitions */}
        <div className="px-6 pb-32 min-h-[400px]">
          {activeSection === "about" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {/* Bento Box Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/[0.08] transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                      <Navigation size={22} className="text-sky-400" />
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Primary Hub
                    </h4>
                  </div>
                  <p className="text-white text-lg font-medium leading-tight">
                    {clientData.contact[0].address}
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-4xl p-6">
                  <Globe size={20} className="text-indigo-400 mb-4" />
                  <p className="text-xs font-bold text-slate-500 uppercase mb-2">
                    Connect
                  </p>
                  <p className="text-white text-sm font-bold break-all">
                    nexus.elite.com
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-4xl p-6">
                  <Clock size={20} className="text-emerald-400 mb-4" />
                  <p className="text-xs font-bold text-slate-500 uppercase mb-2">
                    Status
                  </p>
                  <p className="text-white text-sm font-bold">Open Access</p>
                </div>
              </div>

              {/* High-End Social Icons */}
              <div className="flex justify-between items-center p-4 bg-white/[0.03] border border-white/5 rounded-3xl">
                {[
                  {
                    icon: <Instagram size={20} />,
                    link: clientData.social.instagram,
                  },
                  {
                    icon: <Linkedin size={20} />,
                    link: clientData.social.linkedin,
                  },
                  {
                    icon: <Facebook size={20} />,
                    link: clientData.social.facebook,
                  },
                  {
                    icon: <Youtube size={20} />,
                    link: clientData.social.youtube,
                  },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.link}
                    className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 rounded-2xl transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          )}

          {activeSection === "services" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-700">
              {clientData.services.map((service, idx) => (
                <div
                  key={idx}
                  className="group p-1 rounded-[2.2rem] bg-gradient-to-br from-white/10 to-transparent hover:from-sky-400/20 hover:to-indigo-500/10 transition-all duration-500"
                >
                  <div className="bg-[#000814] rounded-[2.1rem] p-7 flex items-center gap-6">
                    <div className="flex-1">
                      <h4 className="text-white font-black text-lg group-hover:text-sky-400 transition-colors uppercase tracking-tighter">
                        {service.name}
                      </h4>
                      <p className="text-slate-500 text-sm font-medium">
                        {service.desc}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-slate-700 group-hover:text-white transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "payment" && (
            <div className="space-y-6 animate-in zoom-in-95 duration-700">
              {/* The Nexus Vault - Payment UI */}
              <div className="relative group p-1 rounded-[3rem] bg-gradient-to-b from-white/20 to-transparent">
                <div className="bg-[#020c1b] rounded-[2.9rem] p-10 overflow-hidden relative">
                  <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-sky-500/10 blur-[80px] rounded-full"></div>

                  <div className="text-center relative z-10 mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-slate-950 mb-6">
                      <QrCode size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Master QR Gateway
                      </span>
                    </div>
                    <h3 className="text-white text-3xl font-black tracking-tighter">
                      {clientData.businessName}
                    </h3>
                  </div>

                  <div className="relative mx-auto w-64 h-64 p-3 bg-white rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.5)] mb-10 group-hover:scale-105 transition-transform duration-700">
                    <img
                      src={clientData.payment.qrCode}
                      alt="Nexus QR"
                      className="w-full h-full rounded-[2rem]"
                    />
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => copyToClipboard(clientData.payment.upiId)}
                      className="w-full py-5 px-6 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center group/btn active:scale-95 transition-all"
                    >
                      <div className="text-left">
                        <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-1">
                          Elite Merchant UPI
                        </p>
                        <p className="text-white text-sm font-bold">
                          {clientData.payment.upiId}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-sky-400 group-hover/btn:bg-sky-400 group-hover/btn:text-slate-950 transition-all">
                        {copied ? (
                          <CheckCircle2 size={18} />
                        ) : (
                          <Copy size={18} />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Global Banking Interface */}
              <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Building2 className="text-white" size={20} />
                  </div>
                  <h4 className="text-white font-black uppercase tracking-widest text-sm">
                    International Settlement
                  </h4>
                </div>

                <div className="grid gap-6">
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <div>
                      <p className="text-slate-500 text-[10px] font-black uppercase mb-1">
                        Routing / IFSC
                      </p>
                      <p className="text-white font-bold tracking-widest">
                        NEXUS9812001
                      </p>
                    </div>
                    <CreditCard size={18} className="text-slate-600" />
                  </div>
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <div>
                      <p className="text-slate-500 text-[10px] font-black uppercase mb-1">
                        Tier 1 Account
                      </p>
                      <p className="text-white font-bold tracking-widest">
                        **** **** 9012 3345
                      </p>
                    </div>
                    <span className="text-sky-400 text-[10px] font-black uppercase tracking-widest">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "gallery" && (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-700">
              {clientData.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className={`group relative rounded-[2.5rem] overflow-hidden border border-white/10 ${idx % 3 === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
                >
                  <img
                    src={item.url}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Star size={12} className="text-white fill-white" />
                    </div>
                    <p className="text-[10px] text-white font-black uppercase tracking-widest">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Global Action Footer - Persistent */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[340px] px-4 z-[100]">
          <div className="bg-white text-slate-950 rounded-[2rem] p-2 flex gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <a
              href={`tel:${clientData.phone}`}
              className="flex-1 py-4 bg-slate-950 text-white rounded-[1.6rem] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Phone size={18} className="fill-current" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Contact
              </span>
            </a>
            <a
              href={`https://wa.me/${clientData.whatsapp}`}
              className="flex-1 py-4 bg-emerald-500 text-white rounded-[1.6rem] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <MessageCircle size={18} className="fill-current" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Nexus Chat
              </span>
            </a>
          </div>
        </div>

        {/* Brand Footer - The Signature */}
        <div className="bg-[#00040d] border-t border-white/5 pt-20 pb-32 px-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="h-full w-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>

          <div className="relative space-y-12">
            <div className="flex flex-col items-center">
              <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.6em] mb-6">
                An Architectural Masterpiece By
              </span>
              <a
                href="https://noontechstudio.com"
                className="group flex flex-col items-center"
              >
                <span className="text-white font-black text-2xl tracking-tighter group-hover:text-sky-400 transition-colors">
                  NOON TECH STUDIO
                </span>
                <div className="h-0.5 w-0 group-hover:w-full bg-sky-400 transition-all duration-500 mt-1"></div>
              </a>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="px-8 py-3 rounded-full bg-white/5 border border-white/10 flex items-center gap-4">
                <span className="text-slate-500 text-[10px] font-black tracking-widest uppercase">
                  Engineered by
                </span>
                <div className="h-4 w-px bg-white/10"></div>
                <span className="text-white font-black text-xs tracking-[0.2em]">
                  ONEPAGER+
                </span>
              </div>
              <p className="text-slate-800 text-[10px] font-black tracking-[0.5em] uppercase">
                MMLXXV • NEXUS SERIES • UNLIMITED EDITION
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NexusTemplate;
