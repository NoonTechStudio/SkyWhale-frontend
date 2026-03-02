import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Clock,
  Briefcase,
  Image as ImageIcon,
  Share2,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Plus,
  X,
  Sparkles,
  Building2,
  MessageCircle,
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
    activeBg: "bg-blue-50",
    activeBorder: "border-blue-500",
    activeText: "text-blue-700",
    badgeBg: "bg-blue-100 text-blue-700",
    desc: "Clean & Minimal — Perfect for professionals",
    features: ["Contact Page", "Services List", "Gallery", "UPI Payment", "Working Hours"],
  },
  {
    id: "vertex",
    name: "Vertex",
    price: "₹1,499/year",
    emoji: "💎",
    color: "from-teal-500 to-emerald-500",
    activeBg: "bg-teal-50",
    activeBorder: "border-teal-500",
    activeText: "text-teal-700",
    badgeBg: "bg-teal-100 text-teal-700",
    badge: "Most Popular",
    desc: "Bold & Modern — Ideal for growing businesses",
    features: ["Everything in Aura", "Photo Gallery Showcase", "UPI + Bank Details", "Customer Testimonials", "Priority Support"],
  },
  {
    id: "nexus",
    name: "Nexus",
    price: "₹1,999/year",
    emoji: "⚡",
    color: "from-indigo-600 to-purple-600",
    activeBg: "bg-indigo-50",
    activeBorder: "border-indigo-500",
    activeText: "text-indigo-700",
    badgeBg: "bg-indigo-100 text-indigo-700",
    desc: "Elite & Dark — For premium brands",
    features: ["Everything in Vertex", "Dark Luxury Theme", "White-label (no branding)", "Custom Colors & Fonts", "VIP Support (4hr)"],
  },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const STEPS = [
  { id: 1, label: "Template",  icon: Sparkles },
  { id: 2, label: "Business",  icon: Building2 },
  { id: 3, label: "Contact",   icon: Phone },
  { id: 4, label: "Hours",     icon: Clock },
  { id: 5, label: "Services",  icon: Briefcase },
  { id: 6, label: "Social",    icon: Share2 },
  { id: 7, label: "Payment",   icon: Wallet },
  { id: 8, label: "Images",    icon: ImageIcon },
];

// ── Helpers ────────────────────────────────────────────────────────────────
const inputClass =
  "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm shadow-sm";
const labelClass =
  "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5";

export default function OrderForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    template: "",
    businessName: "",
    ownerName: "",
    ownerTitle: "",
    tagline: "",
    businessType: "service",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    googleMapsUrl: "",
    workingHours: DAYS.map((day) => ({
      day,
      open: "09:00",
      close: "18:00",
      closed: day === "Sunday",
    })),
    items: [{ name: "", description: "", price: "" }],
    social: { instagram: "", facebook: "", youtube: "", linkedin: "" },
    payment: {
      upiId: "",
      acceptedMethods: [],
      bankDetails: { accountHolder: "", accountNumber: "", ifscCode: "", bankName: "" },
    },
    hasLogo: false,
    hasGallery: false,
    galleryCount: "",
  });

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const setSocial = (k, v) => setForm((f) => ({ ...f, social: { ...f.social, [k]: v } }));
  const setPayment = (k, v) => setForm((f) => ({ ...f, payment: { ...f.payment, [k]: v } }));
  const setBankDetail = (k, v) =>
    setForm((f) => ({ ...f, payment: { ...f.payment, bankDetails: { ...f.payment.bankDetails, [k]: v } } }));
  const setHour = (i, field, value) =>
    setForm((f) => {
      const wh = [...f.workingHours];
      wh[i] = { ...wh[i], [field]: value };
      return { ...f, workingHours: wh };
    });
  const addItem = () =>
    setForm((f) => ({ ...f, items: [...f.items, { name: "", description: "", price: "" }] }));
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
          acceptedMethods: cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m],
        },
      };
    });

  const buildMessage = () => {
    const t = form;
    const tpl = TEMPLATES.find((x) => x.id === t.template);
    const hoursText = t.workingHours
      .map((h) => `    ${h.day}: ${h.closed ? "Closed" : `${h.open} – ${h.close}`}`)
      .join("\n");
    const itemsText = t.items
      .filter((i) => i.name)
      .map((i, idx) => `    ${idx + 1}. ${i.name}${i.price ? ` (₹${i.price})` : ""}${i.description ? `\n       ${i.description}` : ""}`)
      .join("\n");
    const socialLinks = Object.entries(t.social)
      .filter(([, v]) => v)
      .map(([k, v]) => `    ${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`)
      .join("\n");
    const bankText = t.payment.bankDetails.accountNumber
      ? `\n  Bank: ${t.payment.bankDetails.bankName || "—"}\n  Account Holder: ${t.payment.bankDetails.accountHolder || "—"}\n  Account No: ${t.payment.bankDetails.accountNumber}\n  IFSC: ${t.payment.bankDetails.ifscCode || "—"}`
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
    window.open(`https://wa.me/${SKYWHALE_WHATSAPP}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!form.template;
      case 2: return form.businessName.trim() && form.ownerName.trim();
      case 3: return form.phone.trim() && form.email.trim() && form.address.trim();
      default: return true;
    }
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  // ── Submitted ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-white rounded-3xl p-10 shadow-xl border border-slate-100">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-3">Request Sent! 🎉</h2>
          <p className="text-slate-500 mb-2 leading-relaxed text-sm">
            Your details have been sent to us via WhatsApp. We'll set up your digital card{" "}
            <span className="text-green-600 font-bold">within 24 hours</span>.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            Don't forget to also send your{" "}
            <span className="text-blue-600 font-semibold">logo & gallery images</span> on WhatsApp.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg shadow-blue-100"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 font-sans">

      {/* Soft background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 max-w-2xl mx-auto">
          <a href="/" className="flex items-center gap-2.5">
            <img src={Logo} alt="SkyWhale" className="h-9 w-9 rounded-full border-2 border-blue-100 bg-white p-0.5 shadow-sm" />
            <div className="flex flex-col leading-none">
              <span className="font-black text-base text-slate-800">SkyWhale</span>
              <span className="text-[9px] uppercase tracking-widest text-blue-500 font-semibold">Digital Cards</span>
            </div>
          </a>
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5">
            <span className="text-xs text-blue-600 font-bold">Step {step}</span>
            <span className="text-slate-300 text-xs">/</span>
            <span className="text-xs text-slate-400 font-medium">{STEPS.length}</span>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={12} />
            Get Your Digital Card
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">
            {step === 1 ? "Choose Your Plan" :
             step === 2 ? "Tell Us About Your Business" :
             step === 3 ? "Contact Information" :
             step === 4 ? "Your Working Hours" :
             step === 5 ? `Your ${form.businessType === "product" ? "Products" : "Services"}` :
             step === 6 ? "Social Media Links" :
             step === 7 ? "Payment Details" :
             "Images & Files"}
          </h1>
          <p className="text-slate-400 text-sm">
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

        {/* Progress stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const done = step > s.id;
              const active = step === s.id;
              return (
                <div key={s.id} className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    done   ? "bg-green-500 shadow-md shadow-green-100" :
                    active ? "bg-blue-600 shadow-md shadow-blue-200 ring-4 ring-blue-100" :
                             "bg-slate-100 border border-slate-200"
                  }`}>
                    {done
                      ? <Check size={14} className="text-white" />
                      : <Icon size={14} className={active ? "text-white" : "text-slate-400"} />
                    }
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider hidden sm:block ${
                    active ? "text-blue-600" : done ? "text-green-500" : "text-slate-300"
                  }`}>{s.label}</span>
                </div>
              );
            })}
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm mb-6">

          {/* STEP 1 — Template */}
          {step === 1 && (
            <div className="space-y-4">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => set("template", t.id)}
                  className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 relative overflow-hidden ${
                    form.template === t.id
                      ? `${t.activeBorder} ${t.activeBg}`
                      : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50"
                  }`}
                >
                  {t.badge && (
                    <span className="absolute top-4 right-4 text-[10px] font-black px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full uppercase tracking-wide border border-amber-200">
                      {t.badge}
                    </span>
                  )}
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-2xl shrink-0 shadow-md`}>
                      {t.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`font-black text-lg ${form.template === t.id ? t.activeText : "text-slate-800"}`}>
                          {t.name}
                        </span>
                        <span className={`text-sm font-black bg-gradient-to-r ${t.color} bg-clip-text text-transparent`}>
                          {t.price}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs mb-3">{t.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {t.features.map((f) => (
                          <span key={f} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            form.template === t.id ? t.badgeBg : "bg-slate-100 text-slate-500"
                          }`}>{f}</span>
                        ))}
                      </div>
                    </div>
                    {form.template === t.id && (
                      <CheckCircle2 size={22} className="text-green-500 shrink-0 mt-0.5" />
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
                    { id: "service", label: "Service Based", icon: "💼", sub: "Salon, Clinic, Consulting" },
                    { id: "product", label: "Product Based", icon: "🛍️", sub: "Retail, Store, E-commerce" },
                  ].map((bt) => (
                    <button
                      key={bt.id}
                      onClick={() => set("businessType", bt.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        form.businessType === bt.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="text-2xl mb-1">{bt.icon}</div>
                      <div className={`font-bold text-sm ${form.businessType === bt.id ? "text-blue-700" : "text-slate-700"}`}>
                        {bt.label}
                      </div>
                      <div className="text-slate-400 text-xs">{bt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>Business Name *</label>
                <input className={inputClass} placeholder="e.g. Elite Dental Clinic" value={form.businessName} onChange={(e) => set("businessName", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Owner / Doctor Name *</label>
                  <input className={inputClass} placeholder="Dr. Aravind Swamy" value={form.ownerName} onChange={(e) => set("ownerName", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Title / Designation</label>
                  <input className={inputClass} placeholder="MDS Surgeon, CEO..." value={form.ownerTitle} onChange={(e) => set("ownerTitle", e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Tagline / About Your Business</label>
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
                  <input className={inputClass} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>WhatsApp Number</label>
                  <input className={inputClass} type="tel" placeholder="Same as phone?" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
                  <p className="text-slate-400 text-[10px] mt-1">Leave blank if same as phone</p>
                </div>
              </div>
              <div>
                <label className={labelClass}>Email Address *</label>
                <input className={inputClass} type="email" placeholder="yourname@email.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Full Business Address *</label>
                <textarea className={`${inputClass} resize-none`} rows={2} placeholder="Shop no, Building, Area, City, State" value={form.address} onChange={(e) => set("address", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Google Maps Link</label>
                <input className={inputClass} placeholder="https://maps.app.goo.gl/..." value={form.googleMapsUrl} onChange={(e) => set("googleMapsUrl", e.target.value)} />
                <p className="text-slate-400 text-[10px] mt-1">Open Google Maps → Share → Copy link</p>
              </div>
            </div>
          )}

          {/* STEP 4 — Working Hours */}
          {step === 4 && (
            <div className="space-y-2">
              {form.workingHours.map((h, i) => (
                <div
                  key={h.day}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    h.closed ? "border-slate-100 bg-slate-50 opacity-60" : "border-slate-200 bg-white shadow-sm"
                  }`}
                >
                  <div className="w-24 shrink-0">
                    <span className={`text-sm font-bold ${h.closed ? "text-slate-400" : "text-slate-700"}`}>
                      {h.day.slice(0, 3)}
                    </span>
                  </div>
                  <button
                    onClick={() => setHour(i, "closed", !h.closed)}
                    className={`shrink-0 w-10 h-5 rounded-full transition-colors relative ${h.closed ? "bg-slate-300" : "bg-blue-500"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${h.closed ? "left-0.5" : "left-5"}`} />
                  </button>
                  {h.closed ? (
                    <span className="text-slate-400 text-sm font-semibold">Closed</span>
                  ) : (
                    <div className="flex items-center gap-2 flex-1">
                      <input type="time" value={h.open} onChange={(e) => setHour(i, "open", e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 text-sm focus:outline-none focus:border-blue-400 flex-1" />
                      <span className="text-slate-400 text-xs font-medium">to</span>
                      <input type="time" value={h.close} onChange={(e) => setHour(i, "close", e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 text-sm focus:outline-none focus:border-blue-400 flex-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* STEP 5 — Services / Products */}
          {step === 5 && (
            <div className="space-y-4">
              <p className="text-slate-400 text-xs">
                Add up to 8 {form.businessType === "product" ? "products" : "services"}. Price is optional.
              </p>
              {form.items.map((item, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 relative">
                  {form.items.length > 1 && (
                    <button onClick={() => removeItem(i)}
                      className="absolute top-3 right-3 w-6 h-6 bg-red-50 text-red-400 border border-red-200 rounded-full flex items-center justify-center hover:bg-red-100 transition">
                      <X size={12} />
                    </button>
                  )}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className={labelClass}>{form.businessType === "product" ? "Product" : "Service"} Name *</label>
                      <input className={inputClass} placeholder="e.g. Dental Implants" value={item.name} onChange={(e) => setItem(i, "name", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Price (₹)</label>
                      <input className={inputClass} placeholder="Optional" value={item.price} onChange={(e) => setItem(i, "price", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Short Description</label>
                    <input className={inputClass} placeholder="One line about this..." value={item.description} onChange={(e) => setItem(i, "description", e.target.value)} />
                  </div>
                </div>
              ))}
              {form.items.length < 8 && (
                <button onClick={addItem}
                  className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-sm font-bold">
                  <Plus size={16} /> Add Another {form.businessType === "product" ? "Product" : "Service"}
                </button>
              )}
            </div>
          )}

          {/* STEP 6 — Social Media */}
          {step === 6 && (
            <div className="space-y-4">
              <p className="text-slate-400 text-xs mb-2">All optional — only add what you have</p>
              {[
                { key: "instagram", label: "Instagram", Icon: Instagram, placeholder: "https://instagram.com/yourbusiness", iconColor: "text-pink-500",  iconBg: "bg-pink-50"  },
                { key: "facebook",  label: "Facebook",  Icon: Facebook,  placeholder: "https://facebook.com/yourbusiness",  iconColor: "text-blue-500",  iconBg: "bg-blue-50"  },
                { key: "youtube",   label: "YouTube",   Icon: Youtube,   placeholder: "https://youtube.com/@yourchannel",   iconColor: "text-red-500",   iconBg: "bg-red-50"   },
                { key: "linkedin",  label: "LinkedIn",  Icon: Linkedin,  placeholder: "https://linkedin.com/company/yourbusiness", iconColor: "text-blue-600", iconBg: "bg-blue-50" },
              ].map(({ key, label, Icon, placeholder, iconColor, iconBg }) => (
                <div key={key}>
                  <label className={labelClass}>
                    <span className={`inline-flex items-center justify-center w-5 h-5 rounded ${iconBg} mr-2 align-middle`}>
                      <Icon size={11} className={iconColor} />
                    </span>
                    {label}
                  </label>
                  <input className={inputClass} placeholder={placeholder} value={form.social[key]} onChange={(e) => setSocial(key, e.target.value)} />
                </div>
              ))}
            </div>
          )}

          {/* STEP 7 — Payment */}
          {step === 7 && (
            <div className="space-y-6">
              <div>
                <label className={labelClass}>UPI ID</label>
                <input className={inputClass} placeholder="yourbusiness@upi" value={form.payment.upiId} onChange={(e) => setPayment("upiId", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Accepted Payment Methods</label>
                <div className="flex flex-wrap gap-2">
                  {["Google Pay", "PhonePe", "Paytm", "NEFT/RTGS", "Cash"].map((m) => (
                    <button key={m} onClick={() => togglePayMethod(m)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                        form.payment.acceptedMethods.includes(m)
                          ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                      }`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate-100 pt-5">
                <label className={labelClass}>Bank Account Details (Optional)</label>
                <div className="space-y-3">
                  <input className={inputClass} placeholder="Account Holder Name" value={form.payment.bankDetails.accountHolder} onChange={(e) => setBankDetail("accountHolder", e.target.value)} />
                  <div className="grid grid-cols-2 gap-3">
                    <input className={inputClass} placeholder="Bank Name" value={form.payment.bankDetails.bankName} onChange={(e) => setBankDetail("bankName", e.target.value)} />
                    <input className={inputClass} placeholder="IFSC Code" value={form.payment.bankDetails.ifscCode} onChange={(e) => setBankDetail("ifscCode", e.target.value)} />
                  </div>
                  <input className={inputClass} placeholder="Account Number" value={form.payment.bankDetails.accountNumber} onChange={(e) => setBankDetail("accountNumber", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 8 — Images */}
          {step === 8 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <p className="text-blue-700 text-sm font-bold mb-1">📌 How to send images</p>
                <p className="text-blue-600/80 text-xs leading-relaxed">
                  After submitting this form, WhatsApp will open with all your details. Please also send your{" "}
                  <strong>logo image</strong> and <strong>gallery photos</strong> in the same WhatsApp chat.
                </p>
              </div>
              <div>
                <label className={labelClass}>Do you have a Business Logo?</label>
                <div className="grid grid-cols-2 gap-3">
                  {[{ val: true, label: "Yes, I have one ✅" }, { val: false, label: "No, skip for now" }].map(({ val, label }) => (
                    <button key={String(val)} onClick={() => set("hasLogo", val)}
                      className={`py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                        form.hasLogo === val
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-500 hover:border-slate-300 bg-white"
                      }`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>Do you have Gallery / Product Photos?</label>
                <div className="grid grid-cols-2 gap-3">
                  {[{ val: true, label: "Yes, I'll send photos ✅" }, { val: false, label: "No, skip for now" }].map(({ val, label }) => (
                    <button key={String(val)} onClick={() => set("hasGallery", val)}
                      className={`py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                        form.hasGallery === val
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-500 hover:border-slate-300 bg-white"
                      }`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {form.hasGallery && (
                <div>
                  <label className={labelClass}>How many photos will you send?</label>
                  <input className={inputClass} type="number" min="1" max="12" placeholder="e.g. 6" value={form.galleryCount} onChange={(e) => set("galleryCount", e.target.value)} />
                </div>
              )}
              {/* Order Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <p className="text-xs font-black text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-200">
                  📋 Your Order Summary
                </p>
                {[
                  { label: "Template", value: `${form.template} — ${TEMPLATES.find((t) => t.id === form.template)?.price}` },
                  { label: "Business", value: form.businessName },
                  { label: "Phone",    value: form.phone },
                  { label: "Services", value: `${form.items.filter((i) => i.name).length} added` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-slate-400 font-medium">{label}</span>
                    <span className="text-slate-700 font-bold capitalize">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-200 text-slate-500 font-semibold hover:border-slate-300 hover:text-slate-700 hover:bg-slate-50 transition-all text-sm"
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
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-200 hover:scale-[1.02]"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200"
              }`}
            >
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-400 hover:to-emerald-400 shadow-lg shadow-green-200 hover:scale-[1.02] transition-all"
            >
              <MessageCircle size={18} /> Send via WhatsApp
            </button>
          )}
        </div>

        {step > 4 && step < STEPS.length && (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="w-full mt-3 text-center text-slate-400 hover:text-slate-600 text-xs font-semibold transition-colors py-2"
          >
            Skip this step →
          </button>
        )}

        <p className="text-center text-slate-300 text-xs mt-6 pb-4">
          🔒 Your details are only shared with SkyWhale via WhatsApp
        </p>
      </div>
    </div>
  );
}