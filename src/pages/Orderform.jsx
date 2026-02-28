import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  Briefcase,
  Image as ImageIcon,
  CreditCard,
  Share2,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Plus,
  X,
  Send,
  Sparkles,
  Building2,
  ChevronRight,
  Globe,
  MessageCircle,
  Star,
  Check,
  Wallet,
} from "lucide-react";
import Logo from "../assets/Images/SkyWhale-Logo-2.png";

// ── Constants ──────────────────────────────────────────────────────────────
const SKYWHALE_WHATSAPP = "919876543210"; // ← Replace with your actual WhatsApp number

const TEMPLATES = [
  {
    id: "aura",
    name: "Aura",
    price: "₹999/year",
    emoji: "✨",
    color: "from-blue-500 to-cyan-500",
    border: "border-blue-400",
    ring: "ring-blue-400",
    desc: "Clean & Minimal — Perfect for professionals",
    features: [
      "Contact Page",
      "Services List",
      "Gallery",
      "UPI Payment",
      "Working Hours",
    ],
  },
  {
    id: "vertex",
    name: "Vertex",
    price: "₹1,499/year",
    emoji: "💎",
    color: "from-teal-500 to-emerald-500",
    border: "border-teal-400",
    ring: "ring-teal-400",
    badge: "Most Popular",
    desc: "Bold & Modern — Ideal for growing businesses",
    features: [
      "Everything in Aura",
      "Photo Gallery Showcase",
      "UPI + Bank Details",
      "Customer Testimonials",
      "Priority Support",
    ],
  },
  {
    id: "nexus",
    name: "Nexus",
    price: "₹1,999/year",
    emoji: "⚡",
    color: "from-indigo-600 to-purple-600",
    border: "border-indigo-400",
    ring: "ring-indigo-400",
    desc: "Elite & Dark — For premium brands",
    features: [
      "Everything in Vertex",
      "Dark Luxury Theme",
      "White-label (no branding)",
      "Custom Colors & Fonts",
      "VIP Support (4hr)",
    ],
  },
];

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const STEPS = [
  { id: 1, label: "Template", icon: Sparkles },
  { id: 2, label: "Business", icon: Building2 },
  { id: 3, label: "Contact", icon: Phone },
  { id: 4, label: "Hours", icon: Clock },
  { id: 5, label: "Services", icon: Briefcase },
  { id: 6, label: "Social", icon: Share2 },
  { id: 7, label: "Payment", icon: Wallet },
  { id: 8, label: "Images", icon: ImageIcon },
];

// ── Helpers ────────────────────────────────────────────────────────────────
const inputClass =
  "w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm";
const labelClass =
  "block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5";

// ── Main Component ─────────────────────────────────────────────────────────
export default function OrderForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    // Step 1
    template: "",
    // Step 2
    businessName: "",
    ownerName: "",
    ownerTitle: "",
    tagline: "",
    businessType: "service",
    // Step 3
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    googleMapsUrl: "",
    // Step 4
    workingHours: DAYS.map((day) => ({
      day,
      open: "09:00",
      close: "18:00",
      closed: day === "Sunday",
    })),
    // Step 5
    items: [{ name: "", description: "", price: "" }],
    // Step 6
    social: { instagram: "", facebook: "", youtube: "", linkedin: "" },
    // Step 7
    payment: {
      upiId: "",
      acceptedMethods: [],
      bankDetails: {
        accountHolder: "",
        accountNumber: "",
        ifscCode: "",
        bankName: "",
      },
    },
    // Step 8 - image instructions only (no actual upload through WA)
    hasLogo: false,
    hasGallery: false,
    galleryCount: "",
  });

  // ── Field helpers ──────────────────────────────────────────────────────
  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const setSocial = (k, v) =>
    setForm((f) => ({ ...f, social: { ...f.social, [k]: v } }));
  const setPayment = (k, v) =>
    setForm((f) => ({ ...f, payment: { ...f.payment, [k]: v } }));
  const setBankDetail = (k, v) =>
    setForm((f) => ({
      ...f,
      payment: {
        ...f.payment,
        bankDetails: { ...f.payment.bankDetails, [k]: v },
      },
    }));

  const setHour = (i, field, value) =>
    setForm((f) => {
      const wh = [...f.workingHours];
      wh[i] = { ...wh[i], [field]: value };
      return { ...f, workingHours: wh };
    });

  const addItem = () =>
    setForm((f) => ({
      ...f,
      items: [...f.items, { name: "", description: "", price: "" }],
    }));
  const removeItem = (i) =>
    setForm((f) => ({ ...f, items: f.items.filter((_, idx) => idx !== i) }));
  const setItem = (i, field, value) =>
    setForm((f) => {
      const items = [...f.items];
      items[i] = { ...items[i], [field]: value };
      return { ...f, items };
    });

  const togglePayMethod = (m) =>
    setForm((f) => {
      const cur = f.payment.acceptedMethods;
      return {
        ...f,
        payment: {
          ...f.payment,
          acceptedMethods: cur.includes(m)
            ? cur.filter((x) => x !== m)
            : [...cur, m],
        },
      };
    });

  // ── WhatsApp message builder ───────────────────────────────────────────
  const buildMessage = () => {
    const t = form;
    const tpl = TEMPLATES.find((x) => x.id === t.template);

    const hoursText = t.workingHours
      .map(
        (h) =>
          `    ${h.day}: ${h.closed ? "Closed" : `${h.open} – ${h.close}`}`,
      )
      .join("\n");

    const itemsText = t.items
      .filter((i) => i.name)
      .map(
        (i, idx) =>
          `    ${idx + 1}. ${i.name}${i.price ? ` (₹${i.price})` : ""}${i.description ? `\n       ${i.description}` : ""}`,
      )
      .join("\n");

    const socialLinks = Object.entries(t.social)
      .filter(([, v]) => v)
      .map(([k, v]) => `    ${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`)
      .join("\n");

    const bankText = t.payment.bankDetails.accountNumber
      ? `\n  Bank: ${t.payment.bankDetails.bankName || "—"}
  Account Holder: ${t.payment.bankDetails.accountHolder || "—"}
  Account No: ${t.payment.bankDetails.accountNumber}
  IFSC: ${t.payment.bankDetails.ifscCode || "—"}`
      : "";

    return `🌊 *New SkyWhale Order*
━━━━━━━━━━━━━━━━━━━━

📦 *SELECTED PLAN*
  Template: ${tpl?.name || t.template} — ${tpl?.price || ""}

🏢 *BUSINESS INFO*
  Business Name: ${t.businessName}
  Owner Name: ${t.ownerName}
  Owner Title: ${t.ownerTitle}
  Business Type: ${t.businessType === "service" ? "Service Based" : "Product Based"}
  Tagline: ${t.tagline}

📞 *CONTACT DETAILS*
  Phone: ${t.phone}
  WhatsApp: ${t.whatsapp || t.phone}
  Email: ${t.email}
  Address: ${t.address}
  Google Maps Link: ${t.googleMapsUrl || "Not provided"}

🕐 *WORKING HOURS*
${hoursText}

${t.items.some((i) => i.name) ? `💼 *${t.businessType === "product" ? "PRODUCTS" : "SERVICES"}*\n${itemsText}\n\n` : ""}${socialLinks ? `📱 *SOCIAL MEDIA*\n${socialLinks}\n\n` : ""}💳 *PAYMENT DETAILS*
  UPI ID: ${t.payment.upiId || "Not provided"}
  Accepted Methods: ${t.payment.acceptedMethods.join(", ") || "Not specified"}${bankText}

🖼 *IMAGES*
  Has Logo: ${t.hasLogo ? "Yes ✅ (will send separately)" : "No"}
  Gallery Images: ${t.hasGallery ? `Yes ✅ — ${t.galleryCount || "?"} photos (will send separately)` : "No"}

━━━━━━━━━━━━━━━━━━━━
Please set up my digital card. Thank you! 🙏`;
  };

  const handleSubmit = () => {
    const msg = encodeURIComponent(buildMessage());
    const url = `https://wa.me/${SKYWHALE_WHATSAPP}?text=${msg}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  // ── Validation per step ────────────────────────────────────────────────
  const canProceed = () => {
    switch (step) {
      case 1:
        return !!form.template;
      case 2:
        return form.businessName.trim() && form.ownerName.trim();
      case 3:
        return form.phone.trim() && form.email.trim() && form.address.trim();
      default:
        return true;
    }
  };

  // ── Progress ───────────────────────────────────────────────────────────
  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  // ── Submitted screen ───────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#060b14] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3">
            Request Sent! 🎉
          </h2>
          <p className="text-slate-400 mb-2 leading-relaxed">
            Your details have been sent to us via WhatsApp. We'll review your
            order and have your digital card{" "}
            <span className="text-green-400 font-bold">
              live within 24 hours
            </span>
            .
          </p>
          <p className="text-slate-500 text-sm mb-8">
            Don't forget to also send your{" "}
            <span className="text-blue-400">logo & gallery images</span> on
            WhatsApp.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg shadow-blue-700/30"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060b14] text-white font-sans">
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5">
        <a href="/" className="flex items-center gap-2.5">
          <img
            src={Logo}
            alt="SkyWhale"
            className="h-9 w-9 rounded-full border border-blue-400/30 bg-white p-0.5"
          />
          <span className="font-black text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
            SkyWhale
          </span>
        </a>
        <span className="text-xs text-slate-500 font-semibold">
          Step {step} of {STEPS.length}
        </span>
      </nav>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={12} />
            Get Your Digital Card
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            {STEPS[step - 1].label === "Template"
              ? "Choose Your Plan"
              : STEPS[step - 1].label === "Business"
                ? "Tell Us About Your Business"
                : STEPS[step - 1].label === "Contact"
                  ? "Contact Information"
                  : STEPS[step - 1].label === "Hours"
                    ? "Your Working Hours"
                    : STEPS[step - 1].label === "Services"
                      ? `Your ${form.businessType === "product" ? "Products" : "Services"}`
                      : STEPS[step - 1].label === "Social"
                        ? "Social Media Links"
                        : STEPS[step - 1].label === "Payment"
                          ? "Payment Details"
                          : "Images & Files"}
          </h1>
          <p className="text-slate-500 text-sm">
            {step === 1 && "Pick the template that suits your business best"}
            {step === 2 && "Basic information about your business"}
            {step === 3 && "How customers will reach you"}
            {step === 4 && "Set your business hours for each day"}
            {step === 5 && "List what you offer — we'll display it beautifully"}
            {step === 6 && "Optional — connect your social presence"}
            {step === 7 && "Optional — let customers pay you directly"}
            {step === 8 && "Tell us what images you'll be sending on WhatsApp"}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const done = step > s.id;
              const active = step === s.id;
              return (
                <div key={s.id} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      done
                        ? "bg-green-500 shadow-lg shadow-green-500/30"
                        : active
                          ? "bg-blue-600 shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/50"
                          : "bg-slate-800 border border-slate-700"
                    }`}
                  >
                    {done ? (
                      <Check size={14} className="text-white" />
                    ) : (
                      <Icon
                        size={14}
                        className={active ? "text-white" : "text-slate-600"}
                      />
                    )}
                  </div>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider hidden sm:block ${
                      active
                        ? "text-blue-400"
                        : done
                          ? "text-green-400"
                          : "text-slate-600"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* ── STEP CONTENT ── */}
        <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-sm mb-6">
          {/* STEP 1 — Template */}
          {step === 1 && (
            <div className="space-y-4">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => set("template", t.id)}
                  className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-300 relative overflow-hidden ${
                    form.template === t.id
                      ? `${t.border} bg-white/5 ring-2 ${t.ring}/40`
                      : "border-slate-800 hover:border-slate-600 bg-slate-900/40"
                  }`}
                >
                  {t.badge && (
                    <span className="absolute top-4 right-4 text-[10px] font-black px-2.5 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 rounded-full uppercase tracking-wide">
                      {t.badge}
                    </span>
                  )}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-2xl shrink-0 shadow-lg`}
                    >
                      {t.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-black text-white text-lg">
                          {t.name}
                        </span>
                        <span
                          className={`text-sm font-black bg-gradient-to-r ${t.color} bg-clip-text text-transparent`}
                        >
                          {t.price}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs mb-3">{t.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {t.features.map((f) => (
                          <span
                            key={f}
                            className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    {form.template === t.id && (
                      <CheckCircle2
                        size={22}
                        className="text-green-400 shrink-0 mt-0.5"
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* STEP 2 — Business Info */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Business Type *</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      id: "service",
                      label: "Service Based",
                      icon: "💼",
                      sub: "Salon, Clinic, Consulting",
                    },
                    {
                      id: "product",
                      label: "Product Based",
                      icon: "🛍️",
                      sub: "Retail, Store, E-commerce",
                    },
                  ].map((bt) => (
                    <button
                      key={bt.id}
                      onClick={() => set("businessType", bt.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        form.businessType === bt.id
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      <div className="text-2xl mb-1">{bt.icon}</div>
                      <div className="font-bold text-white text-sm">
                        {bt.label}
                      </div>
                      <div className="text-slate-500 text-xs">{bt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>Business Name *</label>
                <input
                  className={inputClass}
                  placeholder="e.g. Elite Dental Clinic"
                  value={form.businessName}
                  onChange={(e) => set("businessName", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Owner / Doctor Name *</label>
                  <input
                    className={inputClass}
                    placeholder="Dr. Aravind Swamy"
                    value={form.ownerName}
                    onChange={(e) => set("ownerName", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Title / Designation</label>
                  <input
                    className={inputClass}
                    placeholder="MDS Surgeon, CEO..."
                    value={form.ownerTitle}
                    onChange={(e) => set("ownerTitle", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>
                  Tagline / About Your Business
                </label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={3}
                  placeholder="What makes your business special? Write 1–2 sentences..."
                  value={form.tagline}
                  onChange={(e) => set("tagline", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 3 — Contact */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input
                    className={inputClass}
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>WhatsApp Number</label>
                  <input
                    className={inputClass}
                    type="tel"
                    placeholder="Same as phone?"
                    value={form.whatsapp}
                    onChange={(e) => set("whatsapp", e.target.value)}
                  />
                  <p className="text-slate-600 text-[10px] mt-1">
                    Leave blank if same as phone
                  </p>
                </div>
              </div>
              <div>
                <label className={labelClass}>Email Address *</label>
                <input
                  className={inputClass}
                  type="email"
                  placeholder="yourname@email.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Full Business Address *</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={2}
                  placeholder="Shop no, Building, Area, City, State"
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Google Maps Link</label>
                <input
                  className={inputClass}
                  placeholder="https://maps.app.goo.gl/..."
                  value={form.googleMapsUrl}
                  onChange={(e) => set("googleMapsUrl", e.target.value)}
                />
                <p className="text-slate-600 text-[10px] mt-1">
                  Open Google Maps → Share → Copy link
                </p>
              </div>
            </div>
          )}

          {/* STEP 4 — Working Hours */}
          {step === 4 && (
            <div className="space-y-2">
              {form.workingHours.map((h, i) => (
                <div
                  key={h.day}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${h.closed ? "border-slate-800 opacity-50" : "border-slate-700 bg-slate-900/30"}`}
                >
                  <div className="w-24 shrink-0">
                    <span className="text-sm font-bold text-slate-300">
                      {h.day.slice(0, 3)}
                    </span>
                  </div>
                  <button
                    onClick={() => setHour(i, "closed", !h.closed)}
                    className={`shrink-0 w-10 h-5 rounded-full transition-colors relative ${h.closed ? "bg-slate-700" : "bg-blue-600"}`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${h.closed ? "left-0.5" : "left-5"}`}
                    />
                  </button>
                  {h.closed ? (
                    <span className="text-slate-600 text-sm font-semibold">
                      Closed
                    </span>
                  ) : (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="time"
                        value={h.open}
                        onChange={(e) => setHour(i, "open", e.target.value)}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500 flex-1"
                      />
                      <span className="text-slate-600 text-xs">to</span>
                      <input
                        type="time"
                        value={h.close}
                        onChange={(e) => setHour(i, "close", e.target.value)}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500 flex-1"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* STEP 5 — Services / Products */}
          {step === 5 && (
            <div className="space-y-4">
              <p className="text-slate-500 text-xs">
                Add up to 8{" "}
                {form.businessType === "product" ? "products" : "services"}.
                Price is optional.
              </p>
              {form.items.map((item, i) => (
                <div
                  key={i}
                  className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4 space-y-3 relative"
                >
                  {form.items.length > 1 && (
                    <button
                      onClick={() => removeItem(i)}
                      className="absolute top-3 right-3 w-6 h-6 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center hover:bg-red-500/40 transition"
                    >
                      <X size={12} />
                    </button>
                  )}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className={labelClass}>
                        {form.businessType === "product"
                          ? "Product"
                          : "Service"}{" "}
                        Name *
                      </label>
                      <input
                        className={inputClass}
                        placeholder="e.g. Dental Implants"
                        value={item.name}
                        onChange={(e) => setItem(i, "name", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Price (₹)</label>
                      <input
                        className={inputClass}
                        placeholder="Optional"
                        value={item.price}
                        onChange={(e) => setItem(i, "price", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Short Description</label>
                    <input
                      className={inputClass}
                      placeholder="One line about this..."
                      value={item.description}
                      onChange={(e) =>
                        setItem(i, "description", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
              {form.items.length < 8 && (
                <button
                  onClick={addItem}
                  className="w-full py-3 border-2 border-dashed border-slate-700 rounded-2xl text-slate-500 hover:text-blue-400 hover:border-blue-500/50 transition-all flex items-center justify-center gap-2 text-sm font-bold"
                >
                  <Plus size={16} /> Add Another{" "}
                  {form.businessType === "product" ? "Product" : "Service"}
                </button>
              )}
            </div>
          )}

          {/* STEP 6 — Social Media */}
          {step === 6 && (
            <div className="space-y-4">
              <p className="text-slate-500 text-xs mb-2">
                All optional — only add what you have
              </p>
              {[
                {
                  key: "instagram",
                  label: "Instagram",
                  Icon: Instagram,
                  placeholder: "https://instagram.com/yourbusiness",
                  color: "text-pink-400",
                },
                {
                  key: "facebook",
                  label: "Facebook",
                  Icon: Facebook,
                  placeholder: "https://facebook.com/yourbusiness",
                  color: "text-blue-400",
                },
                {
                  key: "youtube",
                  label: "YouTube",
                  Icon: Youtube,
                  placeholder: "https://youtube.com/@yourchannel",
                  color: "text-red-400",
                },
                {
                  key: "linkedin",
                  label: "LinkedIn",
                  Icon: Linkedin,
                  placeholder: "https://linkedin.com/company/yourbusiness",
                  color: "text-blue-300",
                },
              ].map(({ key, label, Icon, placeholder, color }) => (
                <div key={key}>
                  <label className={labelClass}>
                    <Icon size={12} className={`inline mr-1.5 ${color}`} />
                    {label}
                  </label>
                  <input
                    className={inputClass}
                    placeholder={placeholder}
                    value={form.social[key]}
                    onChange={(e) => setSocial(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* STEP 7 — Payment */}
          {step === 7 && (
            <div className="space-y-6">
              <div>
                <label className={labelClass}>UPI ID</label>
                <input
                  className={inputClass}
                  placeholder="yourbusiness@upi"
                  value={form.payment.upiId}
                  onChange={(e) => setPayment("upiId", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Accepted Payment Methods</label>
                <div className="flex flex-wrap gap-2">
                  {["Google Pay", "PhonePe", "Paytm", "NEFT/RTGS", "Cash"].map(
                    (m) => (
                      <button
                        key={m}
                        onClick={() => togglePayMethod(m)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                          form.payment.acceptedMethods.includes(m)
                            ? "bg-blue-600 border-blue-500 text-white"
                            : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
                        }`}
                      >
                        {m}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="border-t border-slate-800 pt-5">
                <label className={labelClass}>
                  Bank Account Details (Optional)
                </label>
                <div className="space-y-3">
                  <input
                    className={inputClass}
                    placeholder="Account Holder Name"
                    value={form.payment.bankDetails.accountHolder}
                    onChange={(e) =>
                      setBankDetail("accountHolder", e.target.value)
                    }
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className={inputClass}
                      placeholder="Bank Name"
                      value={form.payment.bankDetails.bankName}
                      onChange={(e) =>
                        setBankDetail("bankName", e.target.value)
                      }
                    />
                    <input
                      className={inputClass}
                      placeholder="IFSC Code"
                      value={form.payment.bankDetails.ifscCode}
                      onChange={(e) =>
                        setBankDetail("ifscCode", e.target.value)
                      }
                    />
                  </div>
                  <input
                    className={inputClass}
                    placeholder="Account Number"
                    value={form.payment.bankDetails.accountNumber}
                    onChange={(e) =>
                      setBankDetail("accountNumber", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 8 — Images */}
          {step === 8 && (
            <div className="space-y-6">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
                <p className="text-blue-300 text-sm font-semibold mb-1">
                  📌 How to send images
                </p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  After submitting this form, WhatsApp will open with all your
                  details. Please also send your{" "}
                  <strong className="text-white">logo image</strong> and{" "}
                  <strong className="text-white">gallery photos</strong> in the
                  same WhatsApp chat.
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  Do you have a Business Logo?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: true, label: "Yes, I have one ✅" },
                    { val: false, label: "No, skip for now" },
                  ].map(({ val, label }) => (
                    <button
                      key={String(val)}
                      onClick={() => set("hasLogo", val)}
                      className={`py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                        form.hasLogo === val
                          ? "border-blue-500 bg-blue-500/10 text-blue-300"
                          : "border-slate-700 text-slate-500 hover:border-slate-600"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Do you have Gallery / Product Photos?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: true, label: "Yes, I'll send photos ✅" },
                    { val: false, label: "No, skip for now" },
                  ].map(({ val, label }) => (
                    <button
                      key={String(val)}
                      onClick={() => set("hasGallery", val)}
                      className={`py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                        form.hasGallery === val
                          ? "border-blue-500 bg-blue-500/10 text-blue-300"
                          : "border-slate-700 text-slate-500 hover:border-slate-600"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {form.hasGallery && (
                <div>
                  <label className={labelClass}>
                    How many photos will you send?
                  </label>
                  <input
                    className={inputClass}
                    type="number"
                    min="1"
                    max="12"
                    placeholder="e.g. 6"
                    value={form.galleryCount}
                    onChange={(e) => set("galleryCount", e.target.value)}
                  />
                </div>
              )}

              {/* Summary card */}
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-2">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                  📋 Your Order Summary
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Template</span>
                  <span className="text-white font-bold capitalize">
                    {form.template} —{" "}
                    {TEMPLATES.find((t) => t.id === form.template)?.price}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Business</span>
                  <span className="text-white font-bold">
                    {form.businessName}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Phone</span>
                  <span className="text-white font-bold">{form.phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Services</span>
                  <span className="text-white font-bold">
                    {form.items.filter((i) => i.name).length} added
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 text-slate-400 font-semibold hover:border-slate-500 hover:text-white transition-all text-sm"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}

          {step < STEPS.length ? (
            <button
              onClick={() => canProceed() && setStep((s) => s + 1)}
              disabled={!canProceed()}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all ${
                canProceed()
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-700/30 hover:scale-[1.02]"
                  : "bg-slate-800 text-slate-600 cursor-not-allowed"
              }`}
            >
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-400 hover:to-emerald-400 shadow-lg shadow-green-700/30 hover:scale-[1.02] transition-all"
            >
              <MessageCircle size={18} /> Send via WhatsApp
            </button>
          )}
        </div>

        {step > 4 && step < STEPS.length && (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="w-full mt-3 text-center text-slate-600 hover:text-slate-400 text-xs font-semibold transition-colors py-2"
          >
            Skip this step →
          </button>
        )}
      </div>
    </div>
  );
}
