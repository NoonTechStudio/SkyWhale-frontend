import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Smartphone,
  Share2,
  Globe,
  Layout,
  MessageSquare,
  MapPin,
  TrendingUp,
  Check,
  Zap,
  ArrowRight,
  ShieldCheck,
  Clock,
  HeartHandshake,
  Box,
  Sparkles,
  Star,
  Users,
  Award,
  BarChart3,
  Rocket,
  Target,
  CheckCircle2,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Store,
  Menu,
  X,
} from "lucide-react";
import AuraTemplate from "../templates/AuraTemplate";
import VertexTemplate from "../templates/VertexTemplate";
import NexusTemplate from "../templates/NexusTemplate";
import Logo from "../assets/Images/SkyWhale-Logo-2.png";
const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState("features");
  const [showDemo, setShowDemo] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const [heroHeight, setHeroHeight] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    // Measure hero section height on mount and resize
    const measureHeroHeight = () => {
      if (heroRef.current) {
        setHeroHeight(heroRef.current.offsetHeight);
      }
    };

    measureHeroHeight();
    window.addEventListener("resize", measureHeroHeight);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar only after scrolling past hero section
      if (currentScrollY > heroHeight - 100) {
        // -100 for some buffer
        if (currentScrollY > lastScrollY) {
          // Scrolling down past hero section
          setNavVisible(false);
        } else {
          // Scrolling up
          setNavVisible(true);
        }
      } else {
        // Still in hero section, always show navbar
        setNavVisible(true);
      }

      setLastScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measureHeroHeight);
    };
  }, [lastScrollY, heroHeight]);

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900 font-sans antialiased overflow-x-hidden">
      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-slate-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-slate-900 transition"
            >
              ✕
            </button>
            <div className="h-full overflow-y-auto">
              {selectedTemplate === "aura" && <AuraTemplate />}
              {selectedTemplate === "vertex" && <VertexTemplate />}
              {selectedTemplate === "nexus" && <NexusTemplate />}
            </div>
          </div>
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div
          className="absolute top-20 right-10 w-72 h-72 bg-linear-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s" }}
        />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-linear-to-br from-purple-200 to-pink-200 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "7s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-linear-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
      </div>

      {/* Navigation bar */}

      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrollY > 50
            ? "bg-slate-950/98 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20 py-3"
            : "bg-transparent py-5"
        } ${navVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Brand / Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="relative">
                <div className="absolute -inset-1.5 bg-blue-500/25 rounded-full blur-lg group-hover:bg-blue-400/40 transition-all duration-500" />
                <img
                  src={Logo}
                  alt="SkyWhale Logo"
                  className="relative h-10 w-10 md:h-12 md:w-12 object-contain bg-white rounded-full border border-blue-400/30 shadow-xl p-0.5"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-400 tracking-tight">
                  SkyWhale
                </span>
                <span className="text-[9px] uppercase tracking-[0.18em] text-blue-400/80 font-semibold mt-0.5">
                  Scale Your Business
                </span>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {[
                { label: "Features", href: "#features" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Packages", href: "#pricing" },
                { label: "Testimonials", href: "#testimonials" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/5 group"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-blue-500 to-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="/order"
                className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-700/30 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
              >
                Proceed with Form →
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden relative z-[60] p-2.5 text-white bg-white/8 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Full-Screen Menu */}
        <div
          className={`fixed inset-0 z-[100] bg-slate-950/99 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
            mobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 p-2.5 text-white bg-white/10 rounded-xl border border-white/10 hover:bg-white/20 transition-all"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={22} />
          </button>

          {/* Logo in mobile menu */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <img
              src={Logo}
              alt="SkyWhale"
              className="h-9 w-9 object-contain bg-white rounded-full p-0.5 border border-blue-400/30"
            />
            <span className="text-white font-black text-lg">SkyWhale</span>
          </div>

          {/* Nav items */}
          <div className="flex flex-col items-center gap-3 w-full px-8">
            {[
              { label: "Features", href: "#features" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "Packages", href: "#pricing" },
              { label: "Testimonials", href: "#testimonials" },
              { label: "Contact", href: "#contact" },
            ].map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-center py-4 text-xl font-black text-slate-300 hover:text-white border border-white/8 rounded-2xl hover:bg-white/5 hover:border-blue-500/40 transition-all duration-300 ${
                  mobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                {item.label}
              </a>
            ))}

            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full text-center py-4 text-xl font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-700/30 transition-all duration-300 mt-2 ${
                mobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${5 * 70}ms` }}
            >
              Proceed with Form →
            </a>
          </div>
        </div>
      </nav>
      {/* Navigation Ends */}

      {/* Hero Section - Enhanced with Strong Hook */}
      <section
        ref={heroRef}
        className="relative pt-42 pb-24 px-6 overflow-hidden"
      >
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 right-10 w-96 h-96 bg-linear-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-40 animate-pulse"
            style={{ animationDuration: "5s" }}
          />
          <div
            className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-linear-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-40 animate-pulse"
            style={{ animationDuration: "7s", animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/3 w-80 h-80 bg-linear-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto text-center relative z-10">
          {/* Top Badge */}
          {/* <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-100 border border-blue-200 mb-8 shadow-sm">
            <Sparkles size={18} className="text-blue-600" />
            <span className="text-sm font-bold text-blue-900">
              India's Premier Managed Digital Card Platform
            </span>
          </div> */}

          {/* Main Headline with Problem-Solution Focus */}
          <h1 className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tight mb-8">
            <span className="block text-slate-900 mb-3">
              Your Business Online
            </span>
            <span className="block text-slate-700 text-4xl md:text-6xl mb-4">
              WITHOUT
            </span>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-red-500 blur-xl opacity-30"></span>
                <span className="relative bg-linear-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Domain
                </span>
              </span>
              <span className="text-slate-400 text-5xl md:text-7xl">•</span>
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-red-500 blur-xl opacity-30"></span>
                <span className="relative bg-linear-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Hosting
                </span>
              </span>
            </div>
            <span className="block bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent text-4xl md:text-6xl">
              Zero Hassle, Zero Cost
            </span>
          </h1>

          {/* Value Proposition Boxes */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  icon: "❌",
                  title: "No Domain to Buy",
                  desc: "Save ₹1,000/year",
                  color: "from-red-50 to-orange-50",
                  border: "border-red-200",
                },
                {
                  icon: "❌",
                  title: "No Hosting Fees",
                  desc: "Save ₹3,000/year",
                  color: "from-red-50 to-orange-50",
                  border: "border-red-200",
                },
                {
                  icon: "❌",
                  title: "No Tech Skills",
                  desc: "We handle everything",
                  color: "from-red-50 to-orange-50",
                  border: "border-red-200",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-linear-to-br ${item.color} rounded-2xl p-5 border-2 ${item.border} shadow-md`}
                >
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <div className="font-black text-slate-900 text-lg mb-1">
                    {item.title}
                  </div>
                  <div className="text-sm font-bold text-slate-600">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Main Description with Benefits */}
            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-300 shadow-xl mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl">✅</span>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                  Just Share Your Info & You're LIVE!
                </h3>
              </div>
              <p className="text-lg md:text-xl text-slate-700 font-semibold leading-relaxed mb-6">
                Get a{" "}
                <span className="text-green-700 font-black">
                  professional digital card
                </span>{" "}
                that works like a mini website—
                <span className="text-green-700 font-black">
                  {" "}
                  no technical setup, no monthly bills, no headaches
                </span>
                .
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                {[
                  "✨ Instant sharing via WhatsApp, SMS & QR",
                  "📱 Perfect on every device - mobile-first",
                  "🎨 Designed by experts in 24 hours",
                  "💼 All business info in one beautiful page",
                ].map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-white/60 rounded-xl p-3 border border-green-200"
                  >
                    <span className="text-base font-bold text-slate-800">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 flex-wrap mb-12">
            <button
              onClick={() => {
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative px-10 py-5 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl font-bold text-lg text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all hover:scale-105"
            >
              <span className="relative flex items-center gap-3">
                View Packages
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => {
                setSelectedTemplate("aura");
                setShowDemo(true);
              }}
              className="px-10 py-5 bg-white rounded-2xl font-bold text-lg text-slate-900 border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-all hover:scale-105 shadow-lg"
            >
              View Demo
            </button>
          </div>

          {/* Trust Indicators - Enhanced */}
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {[
              {
                icon: <Check className="text-green-600" size={20} />,
                text: "50+ Happy Businesses",
              },
              {
                icon: <Clock className="text-blue-600" size={20} />,
                text: "24-Hour Setup",
              },
              {
                icon: <ShieldCheck className="text-purple-600" size={20} />,
                text: "100% Satisfaction",
              },
              {
                icon: <Zap className="text-orange-600" size={20} />,
                text: "Zero Technical Skills",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full border border-slate-200 shadow-sm"
              >
                {item.icon}
                <span className="text-sm font-bold text-slate-700">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Savings Highlight */}
          <div className="mt-12 inline-block">
            <div className="bg-linear-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-2xl px-8 py-4 shadow-lg">
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <span className="text-3xl">💰</span>
                <span className="text-lg md:text-xl font-black text-slate-900">
                  Save ₹4,000+ yearly on domain & hosting alone!
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                number: "50+",
                label: "Businesses Covered",
                icon: <Building2 />,
              },
              { number: "95%", label: "Customer Satisfaction", icon: <Star /> },
              { number: "24hrs", label: "Average Setup Time", icon: <Clock /> },
              {
                number: "1K+",
                label: "Cards Shared Monthly",
                icon: <Share2 />,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="inline-flex p-3 rounded-xl bg-linear-to-br from-blue-100 to-indigo-100 text-blue-600 mb-3">
                  {React.cloneElement(stat.icon, { size: 24 })}
                </div>
                <div className="text-4xl font-black text-slate-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm font-semibold text-slate-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem-Solution Section - Enhanced */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-blue-50 to-purple-50 opacity-60" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-100 to-green-100 border border-slate-200 mb-6">
                <span className="text-2xl">⚡</span>
                <span className="text-sm font-bold text-slate-900">
                  Why Most Businesses Struggle
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-900 leading-tight">
                DIY vs. SkyWhale
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
                Stop wasting time and money. See the difference between doing it
                yourself and letting experts handle it.
              </p>
            </div>

            {/* Comparison Cards */}
            <div className="grid md:grid-cols-2 gap-8 relative">
              {/* VS Badge */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 bg-black rounded-full items-center justify-center shadow-2xl border-4 border-white">
                <span className="text-white font-black text-lg">VS</span>
              </div>

              {/* DIY Problems */}
              <div className="group relative">
                <div className="absolute inset-0 bg-linear-to-br from-red-500 to-orange-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-white rounded-3xl p-8 border-2 border-red-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 mb-3">
                        <span className="text-xl">😓</span>
                        <span className="text-xs font-bold text-red-800">
                          The Hard Way
                        </span>
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 mb-2">
                        DIY Approach
                      </h3>
                      <p className="text-sm text-slate-600 font-semibold">
                        Hours of frustration ahead
                      </p>
                    </div>
                    <div className="text-5xl opacity-20">❌</div>
                  </div>

                  {/* Problems List */}
                  <div className="space-y-4">
                    {[
                      {
                        icon: "⏰",
                        text: "Waste 5-10 hours learning tools",
                        color: "text-red-600",
                      },
                      {
                        icon: "😰",
                        text: "Risk amateur-looking results",
                        color: "text-orange-600",
                      },
                      {
                        icon: "🔧",
                        text: "Deal with technical glitches",
                        color: "text-red-600",
                      },
                      {
                        icon: "🎨",
                        text: "Struggle with design consistency",
                        color: "text-orange-600",
                      },
                      {
                        icon: "💼",
                        text: "Time stolen from your business",
                        color: "text-red-600",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100 hover:bg-red-100 transition-colors"
                      >
                        <span className="text-2xl shrink-0">{item.icon}</span>
                        <div>
                          <span
                            className={`font-bold ${item.color} block text-sm`}
                          >
                            {item.text}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cost Badge */}
                  <div className="mt-6 p-4 bg-linear-to-r from-red-100 to-orange-100 rounded-xl border-2 border-red-200">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-900">
                        Hidden Cost:
                      </span>
                      <span className="text-2xl font-black text-red-600">
                        ₹15,000+
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 font-semibold">
                      Your time + poor results
                    </p>
                  </div>
                </div>
              </div>

              {/* SkyWhale Solution */}
              <div className="group relative">
                <div className="absolute inset-0 bg-linear-to-br from-green-500 to-emerald-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-linear-to-br from-white to-green-50 rounded-3xl p-8 border-2 border-green-300 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-green-100 to-emerald-100 mb-3">
                        <span className="text-xl">🚀</span>
                        <span className="text-xs font-bold text-green-800">
                          The Smart Way
                        </span>
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 mb-2">
                        SkyWhale
                      </h3>
                      <p className="text-sm text-slate-600 font-semibold">
                        Done for you, perfectly
                      </p>
                    </div>
                    <div className="text-5xl opacity-20">✨</div>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-4">
                    {[
                      {
                        icon: "⚡",
                        text: "Done in 24 hours, zero effort",
                        color: "text-green-600",
                        badge: "Fast",
                      },
                      {
                        icon: "🎯",
                        text: "Professional designer quality",
                        color: "text-emerald-600",
                        badge: "Pro",
                      },
                      {
                        icon: "🛡️",
                        text: "Expert support for everything",
                        color: "text-green-600",
                        badge: "Secure",
                      },
                      {
                        icon: "✨",
                        text: "Perfect brand consistency",
                        color: "text-emerald-600",
                        badge: "Polish",
                      },
                      {
                        icon: "💯",
                        text: "Focus on your business only",
                        color: "text-green-600",
                        badge: "Freedom",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 hover:from-green-100 hover:to-emerald-100 transition-all hover:scale-[1.02]"
                      >
                        <span className="text-2xl shrink-0">{item.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`font-bold ${item.color} text-sm flex-1`}
                            >
                              {item.text}
                            </span>
                            <span className="text-[10px] font-black px-2 py-0.5 bg-green-200 text-green-800 rounded-full">
                              {item.badge}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Value Badge */}
                  <div className="mt-6 p-4 bg-linear-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-white">
                        Cost Starting From:
                      </span>
                      <div className="text-right">
                        <div className="text-2xl font-black text-white">
                          ₹999/-
                        </div>
                        <div className="text-xs text-green-100 font-semibold line-through">
                          ₹15,000
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-green-50 mt-2 font-semibold">
                      Save time + money + headaches!
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to="/order"
                    className="mt-4 w-full py-4 bg-white rounded-xl font-black text-green-600 border-2 border-green-300 hover:bg-green-50 transition-all hover:scale-105 shadow-md flex items-center justify-center gap-2"
                  >
                    Proceed with Form
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "⏱️", stat: "24 Hours", label: "Average Delivery" },
                { icon: "💰", stat: "₹12,500", label: "Average Savings" },
                { icon: "😊", stat: "95%", label: "Happy Customers" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border-2 border-slate-200 text-center hover:border-blue-300 transition-all hover:shadow-lg"
                >
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <div className="text-3xl font-black text-slate-900 mb-1">
                    {item.stat}
                  </div>
                  <div className="text-sm font-semibold text-slate-600">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Card - Apni Dukaan - Enhanced */}
      <section className="py-20 px-6 bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-pulse" />
          <div
            className="absolute bottom-20 right-20 w-32 h-32 bg-purple-300/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-300/20 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="text-center mb-12">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-8 shadow-lg">
                <span className="text-2xl">🇮🇳</span>
                <span className="text-sm font-bold text-white">
                  Made for Bharat
                </span>
              </div>

              {/* Hindi Heading with Gradient */}
              <h2 className="text-5xl md:text-7xl font-black mb-4 text-white leading-tight tracking-tight">
                <span className="inline-block animate-fade-in">
                  अपनी दुकान को
                </span>
                <br />
                <span
                  className="inline-block bg-linear-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  Digital बनाएं
                </span>
              </h2>

              {/* English Subtitle */}
              <div className="relative inline-block mb-10">
                <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
                <p className="relative text-xl md:text-2xl text-white font-bold px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  A Smart Digital Card for Every Indian Business Owner
                </p>
              </div>

              {/* Subheading */}
              <p className="text-lg text-blue-100 font-semibold mb-12 max-w-3xl mx-auto">
                Whether you run a shop, salon, restaurant, or any business—get
                your professional digital presence in just 24 hours! 🚀
              </p>
            </div>

            {/* Business Types Grid - Enhanced */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  type: "Retail Shops",
                  icon: "🏪",
                  color: "from-green-400 to-emerald-400",
                },
                {
                  type: "Restaurants",
                  icon: "🍽️",
                  color: "from-yellow-400 to-orange-400",
                },
                {
                  type: "Salons & Spas",
                  icon: "💇",
                  color: "from-pink-400 to-purple-400",
                },
                {
                  type: "Clinics",
                  icon: "🏥",
                  color: "from-red-400 to-pink-400",
                },
                {
                  type: "Tutors",
                  icon: "🎓",
                  color: "from-blue-400 to-indigo-400",
                },
                {
                  type: "Repair Services",
                  icon: "🔧",
                  color: "from-gray-400 to-slate-400",
                },
                {
                  type: "Photographers",
                  icon: "📸",
                  color: "from-purple-400 to-indigo-400",
                },
                {
                  type: "Consultants",
                  icon: "💼",
                  color: "from-blue-400 to-cyan-400",
                },
                {
                  type: "Fitness Trainers",
                  icon: "💪",
                  color: "from-orange-400 to-red-400",
                },
                {
                  type: "Designers",
                  icon: "🎨",
                  color: "from-pink-400 to-rose-400",
                },
                {
                  type: "Auto Services",
                  icon: "🚗",
                  color: "from-red-400 to-orange-400",
                },
                {
                  type: "Real Estate",
                  icon: "🏡",
                  color: "from-green-400 to-teal-400",
                },
              ].map((item, i) => (
                <div key={i} className="group relative">
                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-linear-to-r ${item.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
                  />

                  {/* Card */}
                  <div className="relative bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/30 hover:bg-white/25 hover:scale-105 hover:border-white/50 transition-all duration-300 shadow-lg">
                    <div className="text-center">
                      <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <span className="text-white font-bold text-sm block leading-tight">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Bar */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { number: "50+", label: "Businesses", icon: "🏢" },
                { number: "24hrs", label: "Setup Time", icon: "⚡" },
                { number: "₹699", label: "Starting Price", icon: "💰" },
                { number: "100%", label: "Satisfaction", icon: "⭐" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center hover:bg-white/20 transition-all hover:scale-105"
                >
                  <div className="text-3xl mb-1">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs text-blue-100 font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-12 flex justify-center">
              <Link
                to="/order"
                className="group relative px-10 py-5 bg-white rounded-2xl font-black text-lg text-blue-600 shadow-2xl hover:shadow-white/20 transition-all hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  शुरू करें — Proceed with Form
                  <ArrowRight
                    className="group-hover:translate-x-2 transition-transform"
                    size={24}
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-slate-900">
              Everything Your Business Needs
            </h2>
            <p className="text-slate-600 text-xl font-medium">
              Powerful features designed for Indian businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Smartphone />,
                title: "Mobile-First Design",
                desc: "Perfect viewing on all devices. 90% of your customers will view on mobile—we optimize for that.",
                gradient: "from-blue-500 to-cyan-500",
                benefit: "Higher engagement rates",
              },
              {
                icon: <Share2 />,
                title: "One-Tap Sharing",
                desc: "Share via WhatsApp, SMS, email, or QR code. No apps to download, works instantly.",
                gradient: "from-purple-500 to-pink-500",
                benefit: "3x faster sharing",
              },
              // {
              //   icon: <Globe />,
              //   title: "Zero Technical Hassle",
              //   desc: "No domain purchase, no hosting setup, no website maintenance. We handle everything.",
              //   gradient: "from-indigo-500 to-blue-500",
              //   benefit: "Save ₹5,000+ yearly",
              // },
              {
                icon: <Layout />,
                title: "Complete Business Showcase",
                desc: "Services, products, gallery, prices, testimonials—everything in one beautiful page.",
                gradient: "from-violet-500 to-purple-500",
                benefit: "Professional presentation",
              },
              {
                icon: <MessageSquare />,
                title: "Direct Contact Buttons",
                desc: "One-click calling, WhatsApp chat, email forms. Make it easy for customers to reach you.",
                gradient: "from-emerald-500 to-teal-500",
                benefit: "50% more inquiries",
              },
              {
                icon: <MapPin />,
                title: "Smart Location Integration",
                desc: "Embedded Google Maps with directions. Customers can navigate to you instantly.",
                gradient: "from-orange-500 to-red-500",
                benefit: "Easy discoverability",
              },
              {
                icon: <TrendingUp />,
                title: "Social Media Hub",
                desc: "Link all your Instagram, Facebook, YouTube channels. Grow followers from one place.",
                gradient: "from-pink-500 to-rose-500",
                benefit: "Unified presence",
              },
              // {
              //   icon: <Award />,
              //   title: "Trust Badges & Reviews",
              //   desc: "Display certifications, awards, and customer testimonials to build instant credibility.",
              //   gradient: "from-yellow-500 to-orange-500",
              //   benefit: "Increased trust",
              // },
              // {
              //   icon: <BarChart3 />,
              //   title: "Analytics Dashboard",
              //   desc: "See who's viewing your card, which sections get attention, and track your growth.",
              //   gradient: "from-cyan-500 to-blue-500",
              //   benefit: "Data-driven decisions",
              // },
            ].map((feature, i) => (
              <div key={i} className="group relative">
                <div
                  className={`absolute -inset-0.5 bg-linear-to-r ${feature.gradient} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity`}
                />
                <div className="relative p-8 rounded-2xl bg-white border-2 border-slate-100 hover:border-slate-200 transition-all h-full shadow-lg hover:shadow-xl">
                  <div
                    className={`inline-flex p-4 rounded-xl bg-linear-to-br ${feature.gradient} mb-5 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    {React.cloneElement(feature.icon, {
                      size: 28,
                      className: "text-white",
                    })}
                  </div>
                  <h3 className="text-xl font-black mb-3 text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4 font-medium">
                    {feature.desc}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full">
                    <CheckCircle2 size={14} className="text-green-600" />
                    <span className="text-xs font-bold text-green-900">
                      {feature.benefit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 bg-linear-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-slate-900">
              From Signup to Launch in 24 Hours
            </h2>
            <p className="text-slate-600 text-xl font-medium">
              Our proven 4-step process
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  step: "01",
                  title: "Share Your Details",
                  desc: "Fill a simple form with your business info, photos, and preferences. Takes just 10 minutes.",
                  icon: <Briefcase />,
                  color: "blue",
                },
                {
                  step: "02",
                  title: "We Design Your Card",
                  desc: "Our expert designers create a stunning professional page matching your brand perfectly.",
                  icon: <Sparkles />,
                  color: "purple",
                },
                {
                  step: "03",
                  title: "Review & Approve",
                  desc: "We send you a preview link. Request any changes—unlimited revisions until you're 100% happy.",
                  icon: <CheckCircle2 />,
                  color: "green",
                },
                {
                  step: "04",
                  title: "Go Live & Share",
                  desc: "Your card goes live with a custom link. Start sharing immediately via WhatsApp, social media, anywhere!",
                  icon: <Rocket />,
                  color: "orange",
                },
              ].map((step, i) => (
                <div key={i} className="relative group">
                  <div
                    className={`absolute -inset-1 bg-linear-to-br from-${step.color}-400 to-${step.color}-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity`}
                  />
                  <div className="relative bg-white rounded-2xl p-8 border-2 border-slate-100 hover:border-slate-200 transition-all shadow-lg hover:shadow-xl">
                    <div className="flex items-start gap-6">
                      <div
                        className={`shrink-0 w-16 h-16 rounded-xl bg-linear-to-br from-${step.color}-500 to-${step.color}-600 flex items-center justify-center shadow-lg`}
                      >
                        {React.cloneElement(step.icon, {
                          size: 28,
                          className: "text-white",
                        })}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-black text-slate-400 mb-2">
                          STEP {step.step}
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-slate-600 font-medium leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-slate-900">
              Why Managed Service Wins
            </h2>
            <p className="text-slate-600 text-xl font-medium">
              We handle everything, you focus on growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <ShieldCheck />,
                title: "Guaranteed Quality",
                desc: "Every card is professionally designed. No amateur-looking DIY disasters.",
                color: "emerald",
                stat: "100%",
              },
              {
                icon: <Clock />,
                title: "Save 10+ Hours",
                desc: "We do the work. You provide info once and focus on your customers.",
                color: "blue",
                stat: "24hrs",
              },
              {
                icon: <HeartHandshake />,
                title: "Dedicated Support",
                desc: "Your personal success manager handles updates, changes everything.",
                color: "purple",
                stat: "1-on-1",
              },
              {
                icon: <Target />,
                title: "Custom Perfection",
                desc: "Tailored to your brand. Feels bespoke, not cookie-cutter template.",
                color: "pink",
                stat: "Unique",
              },
            ].map((benefit, i) => (
              <div key={i} className="text-center group relative">
                <div
                  className={`absolute inset-0 bg-linear-to-br from-${benefit.color}-100 to-${benefit.color}-200 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity`}
                />
                <div className="relative bg-linear-to-br from-slate-50 to-white rounded-3xl p-8 border-2 border-slate-100 hover:border-slate-200 transition-all shadow-lg hover:shadow-xl">
                  <div className={`relative w-20 h-20 mx-auto mb-6`}>
                    <div
                      className={`absolute inset-0 bg-${benefit.color}-200 rounded-2xl blur-lg opacity-60`}
                    />
                    <div
                      className={`relative w-full h-full bg-linear-to-br from-${benefit.color}-500 to-${benefit.color}-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl`}
                    >
                      {React.cloneElement(benefit.icon, {
                        size: 36,
                        className: "text-white",
                      })}
                    </div>
                  </div>
                  <div
                    className={`inline-block px-4 py-1.5 bg-${benefit.color}-100 rounded-full mb-4`}
                  >
                    <span
                      className={`text-${benefit.color}-900 font-black text-sm`}
                    >
                      {benefit.stat}
                    </span>
                  </div>
                  <h3 className="font-black text-xl mb-3 text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-6 bg-linear-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <h2 className="text-5xl font-black text-center mb-16 text-slate-900">
            Managed vs <span className="text-slate-400">DIY</span>
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-3xl p-10 border-2 border-green-300 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-300/30 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                      <ShieldCheck className="text-white" size={32} />
                    </div>
                    <h3 className="text-3xl font-black bg-linear-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                      SkyWhale Managed
                    </h3>
                  </div>
                  <ul className="space-y-5">
                    {[
                      {
                        text: "Professionally designed by experts",
                        highlight: true,
                      },
                      { text: "Live in 24 hours guaranteed", highlight: true },
                      { text: "Dedicated success manager", highlight: false },
                      {
                        text: "Unlimited revisions until perfect",
                        highlight: false,
                      },
                      { text: "Focus 100% on your business", highlight: true },
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                        <div className="mt-1 p-1.5 rounded-lg bg-green-500 shadow-md">
                          <Check className="text-white" size={16} />
                        </div>
                        <span
                          className={`font-bold ${item.highlight ? "text-green-900" : "text-green-800"} group-hover:text-green-600 transition-colors`}
                        >
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-green-200">
                    <div className="text-2xl font-black text-green-900">
                      Starting ₹699/yr
                    </div>
                    <div className="text-sm text-green-700 font-bold">
                      Best value in India
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-100 rounded-3xl p-10 border-2 border-slate-300 relative overflow-hidden opacity-75">
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-slate-500 mb-8 flex items-center gap-3">
                    <span className="text-2xl">⚠️</span> DIY Platforms
                  </h3>
                  <ul className="space-y-5">
                    {[
                      "Risk of unprofessional self-design",
                      "5-10 hours of your valuable time",
                      "Generic help docs, no personal support",
                      "Trial and error, multiple attempts",
                      "Time away from actual business work",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-red-400 text-xl mt-0.5">✗</span>
                        <span className="text-slate-600 font-medium line-through">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 p-4 bg-slate-200 rounded-xl">
                    <div className="text-lg font-bold text-slate-600">
                      Hidden costs:
                    </div>
                    <div className="text-sm text-slate-500 font-medium">
                      Your time + frustration + mediocre results
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-white relative">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-slate-900">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-600 font-bold text-lg">
              Choose the perfect plan for your business
            </p>
            <div className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-green-100 rounded-full border border-green-300">
              <Check className="text-green-600" size={18} />
              <span className="text-sm font-bold text-green-900">
                All plans include expert setup & unlimited support
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {/* Aura - Clean & Minimal */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-slate-300 to-slate-400 rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative p-8 rounded-3xl bg-white border-2 border-slate-200 flex flex-col h-full shadow-xl hover:shadow-2xl transition-all">
                <div className="mb-8">
                  <div className="inline-block px-3 py-1.5 bg-slate-100 rounded-lg mb-4">
                    <h3 className="font-black text-slate-600 text-xs tracking-wider">
                      AURA
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-6">
                    Clean & Minimal Design
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-slate-900">
                      ₹999
                    </span>
                    <span className="text-slate-500 font-bold">/year</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 font-medium">
                    Including ₹300 one-time setup fee
                  </p>
                </div>

                <ul className="space-y-4 mb-8 grow">
                  <li className="flex items-start gap-3 text-sm">
                    <Check
                      size={18}
                      className="text-slate-600 shrink-0 mt-0.5"
                    />
                    <span className="text-slate-700 font-medium">
                      Professional Aura template design
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check
                      size={18}
                      className="text-slate-600 shrink-0 mt-0.5"
                    />
                    <span className="text-slate-700 font-medium">
                      Essential contact features
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check
                      size={18}
                      className="text-slate-600 shrink-0 mt-0.5"
                    />
                    <span className="text-slate-700 font-medium">
                      Social media links integration
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check
                      size={18}
                      className="text-slate-600 shrink-0 mt-0.5"
                    />
                    <span className="text-slate-700 font-medium">
                      Google Maps location
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check
                      size={18}
                      className="text-slate-600 shrink-0 mt-0.5"
                    />
                    <span className="text-slate-700 font-medium">
                      Mobile-optimized display
                    </span>
                  </li>
                </ul>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setSelectedTemplate("aura");
                      setShowDemo(true);
                    }}
                    className="w-full py-3 rounded-xl bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <span>View Aura Demo</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Vertex - Bold & Modern - RECOMMENDED */}
            <div className="group relative md:-translate-y-6">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="relative p-8 rounded-3xl bg-linear-to-br from-blue-600 to-indigo-600 text-white border-2 border-blue-400 flex flex-col h-full shadow-2xl">
                <div className="absolute -top-4 right-8 px-5 py-2 bg-linear-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Most Popular
                  </span>
                </div>

                <div className="mb-8">
                  <div className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg mb-4 border border-white/30">
                    <h3 className="font-black text-white text-xs tracking-wider">
                      VERTEX
                    </h3>
                  </div>
                  <p className="text-sm text-blue-100 font-bold uppercase tracking-wider mb-6">
                    Bold & Modern Design
                  </p>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-5xl font-black text-white">
                      ₹1,499
                    </span>
                    <span className="text-blue-200 font-bold">/year</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-400 rounded-full">
                    <Sparkles size={14} className="text-green-900" />
                    <p className="text-green-900 font-black text-xs uppercase tracking-wider">
                      FREE Setup Included
                    </p>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 grow">
                  <li className="flex items-start gap-3 text-sm">
                    <Check size={18} className="text-white shrink-0 mt-0.5" />
                    <span className="text-white font-bold">
                      Everything in Aura plan
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check size={18} className="text-white shrink-0 mt-0.5" />
                    <span className="text-white font-bold">
                      Premium Vertex template design
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check size={18} className="text-white shrink-0 mt-0.5" />
                    <span className="text-white font-bold">
                      Photo/Product gallery showcase
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check size={18} className="text-white shrink-0 mt-0.5" />
                    <span className="text-white font-bold">
                      UPI payment integration
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check size={18} className="text-white shrink-0 mt-0.5" />
                    <span className="text-white font-bold">
                      Customer testimonials section
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check size={18} className="text-white shrink-0 mt-0.5" />
                    <span className="text-white font-bold">
                      Priority support (24hr response)
                    </span>
                  </li>
                </ul>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setSelectedTemplate("vertex");
                      setShowDemo(true);
                    }}
                    className="w-full py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <span>View Vertex Demo</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Nexus - Connected & Modern */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-purple-400 to-pink-400 rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative p-8 rounded-3xl bg-white border-2 border-purple-200 flex flex-col h-full shadow-xl hover:shadow-2xl transition-all">
                <div className="mb-8">
                  <div className="inline-block px-3 py-1.5 bg-purple-100 rounded-lg mb-4">
                    <h3 className="font-black text-purple-600 text-xs tracking-wider">
                      NEXUS
                    </h3>
                  </div>
                  <p className="text-sm text-purple-500 font-bold uppercase tracking-wider mb-6">
                    Connected & Modern Design
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-slate-900">
                      ₹1,999
                    </span>
                    <span className="text-slate-500 font-bold">/year</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 font-medium">
                    FREE setup • White-label option
                  </p>
                </div>

                <ul className="space-y-4 mb-8 grow">
                  <li className="flex items-start gap-3 text-sm">
                    <Check
                      size={18}
                      className="text-purple-600 shrink-0 mt-0.5"
                    />
                    <span className="text-slate-700 font-bold">
                      Everything in Vertex plan
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check
                      size={18}
                      className="text-purple-600 shrink-0 mt-0.5"
                    />
                    <span className="text-slate-700 font-bold">
                      Elite Nexus template design
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check
                      size={18}
                      className="text-purple-600 shrink-0 mt-0.5"
                    />
                    <span className="text-slate-700 font-bold">
                      White-label (remove branding)
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check
                      size={18}
                      className="text-purple-600 shrink-0 mt-0.5"
                    />
                    <span className="text-slate-700 font-bold">
                      Custom brand colors & fonts
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check
                      size={18}
                      className="text-purple-600 shrink-0 mt-0.5"
                    />
                    <span className="text-slate-700 font-bold">
                      Advanced analytics dashboard
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check
                      size={18}
                      className="text-purple-600 shrink-0 mt-0.5"
                    />
                    <span className="text-slate-700 font-bold">
                      VIP support (4hr response)
                    </span>
                  </li>
                </ul>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setSelectedTemplate("nexus");
                      setShowDemo(true);
                    }}
                    className="w-full py-3 rounded-xl bg-white border-2 border-purple-300 hover:border-purple-400 text-purple-700 font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <span>View Nexus Demo</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Add-ons */}
          {/* <div className="max-w-5xl mx-auto mt-16">
            <h3 className="text-3xl font-black text-center mb-8 text-slate-900">
              Optional Add-ons
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Custom Domain",
                  price: "₹499/yr",
                  desc: "Use your own domain (e.g., yourbusiness.com)",
                  icon: <Globe />,
                },
                {
                  title: "Premium Content Updates",
                  price: "₹299/month",
                  desc: "Unlimited monthly content changes by our team",
                  icon: <Sparkles />,
                },
                {
                  title: "SEO Optimization",
                  price: "₹999 one-time",
                  desc: "Get found on Google with professional SEO setup",
                  icon: <TrendingUp />,
                },
              ].map((addon, i) => (
                <div
                  key={i}
                  className="p-6 bg-linear-to-br from-slate-50 to-blue-50 rounded-2xl border-2 border-slate-200 hover:border-blue-300 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {React.cloneElement(addon.icon, {
                        size: 20,
                        className: "text-blue-600",
                      })}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900">
                        {addon.title}
                      </h4>
                      <p className="text-sm font-bold text-blue-600">
                        {addon.price}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    {addon.desc}
                  </p>
                </div>
              ))}
            </div>
          </div> */}

          {/* Money-back Guarantee */}
          <div className="max-w-3xl mx-auto mt-16 p-8 bg-linear-to-r from-green-50 to-emerald-50 rounded-3xl border-2 border-green-300 text-center shadow-xl">
            <ShieldCheck className="mx-auto mb-4 text-green-600" size={48} />
            <h3 className="text-2xl font-black text-green-900 mb-3">
              100% Satisfaction Guarantee
            </h3>
            <p className="text-slate-700 font-medium leading-relaxed">
              Not happy with your digital card? We'll refund you within 30 days,
              no questions asked. Plus, unlimited revisions until you're
              completely satisfied with the design.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="py-24 px-6 bg-linear-to-br from-slate-50 to-blue-50"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-slate-900">
              Trusted by 500+ Indian Businesses
            </h2>
            <p className="text-slate-600 text-xl font-medium">
              Real results from real businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Rajesh Kumar",
                business: "Kumar Electronics, Vadodara",
                image: "👨‍💼",
                rating: 5,
                text: "Within 2 weeks of using SkyWhale, I got 40% more customer inquiries through WhatsApp. The setup was so easy—I just shared my details and they handled everything!",
              },
              {
                name: "Priya Sharma",
                business: "Priya's Beauty Salon, Mumbai",
                image: "👩‍💼",
                rating: 5,
                text: "My customers love how easy it is to book appointments now. The gallery feature shows my work beautifully, and I've gained 200+ Instagram followers from the card link!",
              },
              {
                name: "Amit Patel",
                business: "Patel Traders, Surat",
                image: "👨‍💼",
                rating: 5,
                text: "Best ₹1499 I've ever spent! My business card looks more professional than my competitors' websites. The UPI payment integration made transactions so smooth.",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-blue-300 transition-all shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 fill-yellow-400"
                      size={18}
                    />
                  ))}
                </div>
                <p className="text-slate-700 font-medium leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <div className="font-black text-slate-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-600 font-medium">
                      {testimonial.business}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-slate-900">
              Perfect for Every Business Type
            </h2>
            <p className="text-slate-600 text-xl font-medium">
              From shops to services, we've got you covered
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {[
              { icon: "🏪", label: "Retail Shops" },
              { icon: "🍽️", label: "Restaurants" },
              { icon: "💇", label: "Salons & Spas" },
              { icon: "🏥", label: "Clinics" },
              { icon: "🎓", label: "Tutors" },
              { icon: "🔧", label: "Repair Services" },
              { icon: "📸", label: "Photographers" },
              { icon: "👔", label: "Consultants" },
              { icon: "🏋️", label: "Fitness Trainers" },
              { icon: "🎨", label: "Designers" },
              { icon: "🚗", label: "Auto Services" },
              { icon: "🏠", label: "Real Estate" },
            ].map((useCase, i) => (
              <div
                key={i}
                className="p-6 bg-linear-to-br from-slate-50 to-blue-50 rounded-2xl border-2 border-slate-200 hover:border-blue-400 transition-all text-center group hover:scale-105 shadow-md hover:shadow-lg"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {useCase.icon}
                </div>
                <div className="font-bold text-slate-900 text-sm">
                  {useCase.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-linear-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-xl font-medium">
              Everything you need to know
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How long does it take to get my digital card live?",
                a: "Typically 24 hours after you submit your information. For premium plans, we can deliver in 12 hours if you're in a hurry!",
              },
              {
                q: "Can I make changes after my card is live?",
                a: "Absolutely! Contact your success manager anytime. Professional & Premium plans include unlimited updates. Starter plan can add updates as needed.",
              },
              {
                q: "Do I need any technical knowledge?",
                a: "Zero! That's the whole point. You just share your business info, photos, and preferences. We handle all the technical stuff.",
              },
              {
                q: "What if I don't like the initial design?",
                a: "We offer unlimited revisions until you're 100% happy. We won't stop until your card is perfect.",
              },
              {
                q: "Can customers contact me directly from the card?",
                a: "Yes! One-click buttons for WhatsApp, phone calls, email, and even directions to your location via Google Maps.",
              },
              {
                q: "What happens after 1 year?",
                a: "Simply renew your plan to keep your card active. All your content stays intact, and you keep the same link.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-300 transition-all shadow-md"
              >
                <h3 className="font-black text-slate-900 mb-3 text-lg">
                  {faq.q}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works + Final CTA Section */}
      <section
        id="how-it-works"
        className="py-24 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
        <div className="container mx-auto relative z-10 max-w-5xl">
          {/* Heading */}
          <div className="text-center mb-16">
            <p className="text-blue-200 font-bold uppercase tracking-widest text-sm mb-3">
              Simple & Transparent
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
              Your Digital Card,
              <br />
              Ready in 24 Hours
            </h2>
            <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              No tech knowledge needed. We handle everything — you just share
              your details and we make you live.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              {
                step: "01",
                icon: "📋",
                title: "Fill the Form",
                desc: "Share your business name, contact info, services, photos — everything you want on your digital card.",
              },
              {
                step: "02",
                icon: "🎨",
                title: "Pick a Template",
                desc: "Choose the design that best suits your business from our ready-made templates.",
              },
              {
                step: "03",
                icon: "💸",
                title: "Pay via GPay",
                desc: "Send the payment to our GPay number and share a screenshot on WhatsApp. That's it!",
              },
              {
                step: "04",
                icon: "🚀",
                title: "Go Live!",
                desc: "We build your digital card and send you the link within 24 hours. Share it anywhere!",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-white flex flex-col items-center text-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-xs font-black text-blue-200 tracking-widest uppercase mb-2">
                  Step {item.step}
                </div>
                <h3 className="text-lg font-black mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-3 bg-white text-blue-600 font-black text-lg px-10 py-4 rounded-full shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300"
            >
              Fill the Form & Get Started <ArrowRight size={20} />
            </a>
            <p className="text-blue-200 text-sm font-medium mt-4">
              No credit card required &nbsp;·&nbsp; Setup in 24 hrs
              &nbsp;·&nbsp; 24/7 Support
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer */}
      <footer
        id="contact"
        className="relative py-20 px-6 bg-gradient-to-b from-slate-50 to-blue-50 overflow-hidden"
      >
        {/* Decorative background rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-blue-100 opacity-60" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-blue-200 opacity-50" />
          <div className="absolute w-[200px] h-[200px] rounded-full border border-blue-300 opacity-40" />
        </div>

        <div className="container mx-auto relative z-10 max-w-5xl">
          {/* Center Logo Block */}
          <div className="flex flex-col items-center text-center mb-14">
            <div className="relative mb-5">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-2xl opacity-50" />
              <img
                src={Logo}
                alt="SkyWhale Logo"
                className="relative w-24 h-24 rounded-full border-4 border-white shadow-2xl shadow-blue-200 object-contain bg-white p-1"
              />
            </div>
            <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500 tracking-tight mb-1">
              SkyWhale
            </h2>
            <p className="text-[11px] uppercase tracking-[0.25em] text-blue-400 font-bold mb-4">
              Scale Your Local Business, Globally
            </p>
            <p className="text-slate-500 text-sm font-medium max-w-sm leading-relaxed">
              Empowering Indian businesses with beautiful, affordable digital
              presence — set up in 24 hours.
            </p>

            {/* CTA in footer */}
            <Link
              to="/order"
              className="mt-6 inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm rounded-full shadow-lg shadow-blue-300/40 hover:scale-105 transition-all"
            >
              Get Your Digital Card →
            </Link>
          </div>

          {/* 3-column info grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14 text-center md:text-left">
            {/* Quick Links */}
            <div>
              <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-4 flex items-center justify-center md:justify-start gap-2">
                <span className="w-4 h-0.5 bg-blue-400 inline-block" />
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Features", href: "#features" },
                  { label: "Packages", href: "#pricing" },
                  { label: "How It Works", href: "#how-it-works" },
                  { label: "Testimonials", href: "#testimonials" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors hover:translate-x-1 inline-block"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-4 flex items-center justify-center md:justify-start gap-2">
                <span className="w-4 h-0.5 bg-blue-400 inline-block" />
                Get in Touch
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:skyywhale@gmail.com"
                    className="flex items-center justify-center md:justify-start gap-2 text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors"
                  >
                    <Mail size={14} className="text-blue-400 shrink-0" />
                    skyywhale@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919316499964"
                    className="flex items-center justify-center md:justify-start gap-2 text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors"
                  >
                    <Phone size={14} className="text-blue-400 shrink-0" />
                    +91 93164 99964
                  </a>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2 text-slate-500 text-sm font-medium">
                  <MapPin size={14} className="text-blue-400 shrink-0" />
                  Vadodara, Gujarat
                </li>
              </ul>
            </div>

            {/* Support + Social */}
            <div>
              <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-4 flex items-center justify-center md:justify-start gap-2">
                <span className="w-4 h-0.5 bg-blue-400 inline-block" />
                Support
              </h4>
              <ul className="space-y-2.5 mb-6">
                {[
                  "Help Center",
                  "Contact Us",
                  "Terms & Conditions",
                  "Privacy Policy",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social Icons */}
              <div className="flex gap-2 justify-center md:justify-start">
                {[
                  { Icon: Instagram, href: "#", color: "hover:bg-pink-500" },
                  { Icon: Facebook, href: "#", color: "hover:bg-blue-600" },
                  { Icon: Twitter, href: "#", color: "hover:bg-sky-500" },
                ].map(({ Icon, href, color }, i) => (
                  <a
                    key={i}
                    href={href}
                    className={`w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-white ${color} hover:border-transparent transition-all hover:scale-110`}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-blue-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-slate-400 text-xs font-medium">
              © 2026 SkyWhale. All rights reserved.
            </p>
            <p className="text-slate-400 text-xs font-medium">
              By Noon Tech Studio
            </p>
            <a
              href="https://www.noontechstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 font-bold text-xs underline transition-colors"
            >
              noontechstudio.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
