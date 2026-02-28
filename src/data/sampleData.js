import Logo from "../assets/Images/DentalLogo.png";

// Gallery images
import img1 from "../assets/Images/img1.jpg";
import img2 from "../assets/Images/img2.jpg";
import img3 from "../assets/Images/img3.jpeg";
import img4 from "../assets/Images/img4.jpg";
import img5 from "../assets/Images/img5.jpeg";
import img6 from "../assets/Images/img6.jpg";

export const sampleClient = {
  // ── Basic Info ─────────────────────────────────────────────────────────────
  businessName: "Elite Dental & Implant Centre",
  businessLogo: Logo,
  ownerName: "Dr. Aravind Swamy",
  ownerTitle: "MDS - Oral & Maxillofacial Surgeon",
  tagline:
    "Experience painless dentistry with technology built for your comfort. We provide a gentle, stress-free environment that prioritizes your well-being over traditional dental anxiety.",
  businessType: "service", // "service" | "product"

  // ── Contact (new nested structure expected by all three templates) ──────────
  contact: {
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "arvindswamy@gmail.com",
    address: "A-201, Platinum Heights, Near Akshar Chowk, Vadodara, Gujarat",
    googleMapsUrl: "https://maps.app.goo.gl/example",

    // Working hours — array of { day, open, close, closed }
    openingHours: [
      { day: "Monday", open: "10:00", close: "18:30", closed: false },
      { day: "Tuesday", open: "10:00", close: "18:30", closed: false },
      { day: "Wednesday", open: "10:00", close: "18:30", closed: false },
      { day: "Thursday", open: "10:00", close: "18:30", closed: false },
      { day: "Friday", open: "10:00", close: "18:30", closed: false },
      { day: "Saturday", open: "10:00", close: "14:00", closed: false },
      { day: "Sunday", open: "00:00", close: "00:00", closed: true },
    ],
  },

  // ── Services / Items (templates read clientData.items || clientData.services)
  items: [
    {
      name: "Digital Smile Designing",
      description:
        "Get a preview of your perfect smile with our advanced 3D scanning.",
      price: null,
    },
    {
      name: "Dental Implants",
      description: "Permanent and natural-looking tooth replacements.",
      price: null,
    },
    {
      name: "Invisible Aligners",
      description:
        "Straighten teeth without braces using clear, comfortable aligners.",
      price: null,
    },
    {
      name: "Laser Teeth Whitening",
      description:
        "Professional treatment to brighten your smile up to 8 shades.",
      price: null,
    },
    {
      name: "Painless Root Canal",
      description:
        "Save your natural teeth with modern, discomfort-free endodontic care.",
      price: null,
    },
    {
      name: "Pediatric Dentistry",
      description:
        "Gentle and fun dental care designed specifically for our youngest patients.",
      price: null,
    },
    {
      name: "Full Mouth Rehabilitation",
      description:
        "Comprehensive restorative treatments to regain your bite and oral health.",
      price: null,
    },
  ],

  // ── Gallery ────────────────────────────────────────────────────────────────
  gallery: [
    { url: img1, caption: "Modern Dental Chair" },
    { url: img4, caption: "Digital X-Ray Room" },
    { url: img3, caption: "Dental Consultation Area" },
    { url: img2, caption: "Happy Patient" },
    { url: img5, caption: "Patient Waiting Lounge" },
    { url: img6, caption: "Dental Implant" },
  ],

  // ── Testimonials (Vertex & Nexus) ──────────────────────────────────────────
  testimonials: [
    {
      name: "Rahul Mehta",
      review:
        "The best dental experience! Dr. Swamy is very professional and the clinic is world-class.",
      rating: 5,
    },
    {
      name: "Sneha Patel",
      review:
        "Highly recommend for invisible aligners. Very happy with my results!",
      rating: 5,
    },
  ],

  // ── Payment ────────────────────────────────────────────────────────────────
  payment: {
    upiId: "elitedental@upi",
    qrCode:
      "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=elitedental@upi&pn=Elite%20Dental%20Care",
    acceptedMethods: [
      {
        name: "Google Pay",
        icon: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg",
        enabled: true,
      },
    ],
    tagline: "SAFE & SECURE HEALTHCARE PAYMENTS",

    // Bank details — Vertex & Nexus display this under payment.bankDetails
    bankDetails: {
      bankName: "HDFC Bank Ltd",
      accountName: "Elite Dental Care & Implant Centre",
      accountNumber: "50200012345678",
      ifscCode: "HDFC0001234",
      branch: "Alkapuri, Vadodara",
    },
  },

  // ── Social Media ───────────────────────────────────────────────────────────
  social: {
    facebook: "https://facebook.com/elitedental",
    instagram: "https://instagram.com/elitedental",
    youtube: "https://youtube.com/elitedental",
    linkedin: "https://linkedin.com/company/elitedental",
    googleMaps: "https://maps.app.goo.gl/example",
  },
};
