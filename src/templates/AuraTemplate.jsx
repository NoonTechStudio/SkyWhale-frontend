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
} from "lucide-react";
import { sampleClient } from "../data/sampleData";

const AuraTemplate = ({ clientData = sampleClient }) => {
  const [activeSection, setActiveSection] = useState("about");

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
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen">
        {/* Header Section - Enhanced Professional Design */}
        <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          {/* Premium Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#3468C0] rounded-full blur-3xl transform translate-x-32 -translate-y-32 animate-pulse"></div>
            <div
              className="absolute bottom-0 left-0 w-80 h-80 bg-[#3468C0] rounded-full blur-3xl transform -translate-x-32 translate-y-32 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
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
            {/* Logo & Share - Premium Layout */}
            <div className="flex items-start justify-between mb-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-[#3468C0] rounded-2xl opacity-60 group-hover:opacity-80 blur-sm transition"></div>
                <div className="relative w-20 h-20 bg-[#3468C0] rounded-2xl shadow-2xl overflow-hidden ring-4 ring-white/10">
                  <img
                    src={clientData.businessLogo}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <button
                onClick={handleShare}
                className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all hover:scale-105 border border-white/20"
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* Business Info - Enhanced Typography */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-blue-500/20 to-purple-500/20 border border-white/20 backdrop-blur-sm">
                <Award size={14} className="text-blue-400" />
                <span className="text-xs font-semibold text-gray-200">
                  Premium Business
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight leading-tight">
                {clientData.businessName}
              </h1>
              <p className="text-slate-300 text-base font-medium leading-relaxed">
                {clientData.tagline}
              </p>
              <div className="flex items-center gap-3 pt-2 pb-5">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-[#3468C0] rounded-full flex items-center justify-center text-xs font-bold">
                    {clientData.ownerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {clientData.ownerName}
                    </p>
                    <p className="text-xs text-slate-400">
                      {clientData.ownerTitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="relative block w-full h-8"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="fill-white"
              ></path>
            </svg>
          </div>
        </div>

        {/* Quick Contact Actions - Professional Grid */}
        <div className="px-6 -mt-6 relative z-10 mb-6">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4">
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${clientData.phone}`}
                className="group relative overflow-hidden flex flex-col items-center justify-center gap-2 bg-linear-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-700 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg border border-blue-200"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                  <Phone size={18} className="text-white" />
                </div>
                <span className="text-sm">Call Now</span>
              </a>

              <a
                href={`https://wa.me/${clientData.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden flex flex-col items-center justify-center gap-2 bg-linear-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 text-green-700 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg border border-green-200"
              >
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                  <MessageCircle size={18} className="text-white" />
                </div>
                <span className="text-sm">WhatsApp</span>
              </a>

              <a
                href={`mailto:${clientData.email}`}
                className="group relative overflow-hidden flex flex-col items-center justify-center gap-2 bg-linear-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 text-purple-700 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg border border-purple-200"
              >
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                  <Mail size={18} className="text-white" />
                </div>
                <span className="text-sm">Email</span>
              </a>

              <a
                href={clientData.social.googleMaps || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden flex flex-col items-center justify-center gap-2 bg-linear-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-700 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg border border-red-200"
              >
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                  <MapPin size={18} className="text-white" />
                </div>
                <span className="text-sm">Location</span>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Modern Design */}
        <div className="px-6 mb-6">
          <div className="bg-slate-50 rounded-2xl p-1.5 border border-slate-200">
            <div className="grid grid-cols-4 gap-1">
              {["about", "services", "gallery", "payment"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSection(tab)}
                  className={`py-3 text-sm font-semibold capitalize rounded-xl transition-all ${
                    activeSection === tab
                      ? "bg-white text-blue-600 shadow-lg shadow-blue-100"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* About Section - Premium Cards */}
        {activeSection === "about" && (
          <div className="px-6 pb-8 space-y-4">
            {/* Contact Info Card */}
            <div className="bg-linear-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <div className="w-8 h-8 bg-[#3468C0] rounded-lg flex items-center justify-center">
                  <CheckCircle size={16} className="text-white" />
                </div>
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white transition border border-transparent hover:border-slate-200 hover:shadow-sm">
                  <div className="w-11 h-11 bg-linear-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                    <MapPin size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                      Address
                    </p>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      {clientData.contact[0].address}
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white transition border border-transparent hover:border-slate-200 hover:shadow-sm">
                  <div className="w-11 h-11 bg-linear-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                    <Mail size={20} className="text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                      Email
                    </p>
                    <p className="text-sm text-slate-700 font-medium break-all">
                      {clientData.contact[1].email}
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white transition border border-transparent hover:border-slate-200 hover:shadow-sm">
                  <div className="w-11 h-11 bg-linear-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                    <Phone size={20} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                      Phone
                    </p>
                    <p className="text-sm text-slate-700 font-medium">
                      {clientData.contact[2].phone}
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white transition border border-transparent hover:border-slate-200 hover:shadow-sm">
                  <div className="w-11 h-11 bg-linear-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                    <Clock size={20} className="text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      Opening Hours
                    </p>
                    <div className="space-y-1">
                      {clientData.contact[4].openingHours.map((hour, i) => (
                        <p
                          key={i}
                          className="text-sm text-slate-700 font-medium flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                          {hour}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media - Premium Design */}
            <div className="bg-linear-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <div className="w-8 h-8 bg-[#3468C0] rounded-lg flex items-center justify-center">
                  <Share2 size={16} className="text-white" />
                </div>
                Connect With Us
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={clientData.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden h-14 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition"></div>
                  <Facebook size={22} className="text-white relative z-10" />
                </a>
                <a
                  href={clientData.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden h-14 bg-linear-to-br from-purple-600 via-pink-600 to-orange-500 rounded-xl flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition"></div>
                  <Instagram size={22} className="text-white relative z-10" />
                </a>
                <a
                  href={clientData.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden h-14 bg-linear-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition"></div>
                  <Youtube size={22} className="text-white relative z-10" />
                </a>
                <a
                  href={clientData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden h-14 bg-linear-to-br from-blue-700 to-blue-800 rounded-xl flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition"></div>
                  <Linkedin size={22} className="text-white relative z-10" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Services Section - Premium Card Design */}
        {activeSection === "services" && (
          <div className="px-6 pb-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Our Specialized Services
              </h3>
              <p className="text-slate-600 text-sm">
                Advanced dental solutions for all your needs
              </p>
            </div>
            <div className="space-y-3">
              {clientData.services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-linear-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-5 hover:shadow-xl hover:border-blue-200 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#3468C0] rounded-xl blur-md opacity-30 group-hover:opacity-50 transition"></div>

                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 mb-1.5 text-base">
                        {service.name}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition shrink-0 mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Section - Premium Grid */}
        {activeSection === "gallery" && (
          <div className="px-6 pb-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Clinic Tour
              </h3>
              <p className="text-slate-600 text-sm">
                A glimpse into our world-class facility
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {clientData.gallery.map((item, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer border-2 border-slate-200 hover:border-blue-400 transition"
                >
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      {item.caption}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                    <ExternalLink size={14} className="text-slate-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Section - Premium Design */}
        {activeSection === "payment" && (
          <div className="px-6 pb-8">
            <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700">
              {/* Header with Premium Gradient */}
              <div className="relative bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                </div>
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <span className="text-3xl">💳</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Scan & Pay</h3>
                  <p className="text-blue-100 font-medium">
                    Quick & Secure Payment
                  </p>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="p-6 bg-white">
                <div className="text-center mb-6 pb-6 border-b border-slate-200">
                  <p className="text-xl font-bold text-slate-900 mb-1.5">
                    {clientData.businessName}
                  </p>
                  <p className="text-sm text-slate-600 font-medium">
                    {clientData.payment.upiId}
                  </p>
                </div>

                <div className="bg-linear-to-br from-slate-50 to-white p-6 rounded-2xl border-2 border-slate-200 mb-6 flex justify-center shadow-inner">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur-xl"></div>
                    <img
                      src={clientData.payment.qrCode}
                      alt="Payment QR Code"
                      className="relative w-56 h-56 rounded-xl"
                    />
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <p className="text-center text-sm text-slate-600 mb-4 font-bold uppercase tracking-wide">
                    Accepted Payment Methods
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    {clientData.payment.acceptedMethods.map((method, index) => (
                      <div key={index} className="group text-center">
                        <div className="w-24 h-24 bg-linear-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-2.5 hover:shadow-lg transition-all border border-slate-200 group-hover:scale-110 group-hover:border-blue-300">
                          {method.icon.startsWith("http") ? (
                            <img
                              src={method.icon}
                              alt={method.name}
                              className="w-9 h-9 object-contain"
                            />
                          ) : (
                            <span className="text-3xl">{method.icon}</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-700 font-semibold">
                          {method.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-200">
                  <p className="text-base font-bold text-slate-900">
                    {clientData.payment.tagline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer - Premium Design */}
        <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white text-center py-8 px-6 mt-8 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>

          <div className="relative max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-9 h-9 bg-[#3468C0] rounded-lg flex items-center justify-center shadow-lg">
                <Award size={18} />
              </div>
              <h3 className="text-base font-bold text-white">
                Aura Digital Card
              </h3>
            </div>

            <p className="text-sm text-slate-400 font-medium mb-5">
              Designed and developed with excellence
            </p>

            <div className="inline-flex flex-col items-center gap-2.5 mb-5 px-8 py-3.5 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <span className="text-xs text-slate-500 font-medium">
                A new initiative by
              </span>

              <a
                href="https://noontechstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-all duration-300 border border-slate-600 hover:border-[#3468C0]"
              >
                <span className="text-base font-bold text-white group-hover:text-[#3468C0]">
                  Noon Tech Studio
                </span>
                <ExternalLink
                  size={15}
                  className="text-slate-400 group-hover:text-[#3468C0]"
                />
              </a>

              <div className="flex items-center gap-2.5 my-0.5">
                <div className="h-px w-6 bg-slate-600"></div>
                <span className="text-xs text-slate-500 font-medium">
                  Powered by
                </span>
                <div className="h-px w-6 bg-slate-600"></div>
              </div>

              <a
                href="https://www.noontechstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-1.5 bg-[#3468C0]/10 hover:bg-[#3468C0]/20 rounded-lg transition-all duration-300 border border-[#3468C0]/30 hover:border-[#3468C0]"
              >
                <span className="text-sm font-semibold text-[#3468C0] group-hover:text-white">
                  OnePager+
                </span>
                <ExternalLink
                  size={14}
                  className="text-[#3468C0]/70 group-hover:text-white"
                />
              </a>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              All Rights Reserved © 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuraTemplate;
