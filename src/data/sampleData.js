import Logo from "../assets/Images/DentalLogo.png";
//import PhonePe from '../assets/Images/Pay.jpg';

// Gallery images
import img1 from "../assets/Images/img1.jpg";
import img2 from "../assets/Images/img2.jpg";
import img3 from "../assets/Images/img3.jpeg";
import img4 from "../assets/Images/img4.jpg";
import img5 from "../assets/Images/img5.jpeg";
import img6 from "../assets/Images/img6.jpg";

// src/data/sampleData.js

export const sampleClient = {
  businessLogo: Logo,
  businessName: "Elite Dental & Implant Centre",
  ownerName: "Dr. Aravind Swamy",
  ownerTitle: "MDS - Oral & Maxillofacial Surgeon",
  tagline:
    "Experience painless dentistry with technology built for your comfort. We provide a gentle, stress-free environment that prioritizes your well-being over traditional dental anxiety.",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  email: "arvindswamy@gmail.com",
  address: "A-201, Platinum Heights, Near Akshar Chowk, Vadodara, Gujarat",
  services: [
    {
      name: "Digital Smile Designing",
      desc: "Get a preview of your perfect smile with our advanced 3D scanning.",
    },
    {
      name: "Dental Implants",
      desc: "Permanent and natural-looking tooth replacements.",
    },
    {
      name: "Invisible Aligners",
      desc: "Straighten teeth without braces using clear, comfortable aligners.",
    },
    {
      name: "Laser Teeth Whitening",
      desc: "Professional treatment to brighten your smile up to 8 shades.",
    },
    {
      name: "Painless Root Canal",
      desc: "Save your natural teeth with modern, discomfort-free endodontic care.",
    },
    {
      name: "Pediatric Dentistry",
      desc: "Gentle and fun dental care designed specifically for our youngest patients.",
    },
    {
      name: "Full Mouth Rehabilitation",
      desc: "Comprehensive restorative treatments to regain your bite and oral health.",
    },
  ],
  gallery: [
    {
      url: img1,
      caption: "Modern Dental Chair",
    },
    {
      url: img4,
      caption: "Digital X-Ray Room",
    },
    {
      url: img3,
      caption: "Dental Consultation Area",
    },
    {
      url: img2,
      caption: "Happy Patient",
    },
    {
      url: img5,
      caption: "Patient Waiting Lounge",
    },
    {
      url: img6,
      caption: "Dental Implant",
    },
  ],
  // New Section for Vertex & Nexus
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
  // New Section for Vertex & Nexus
  bankAccount: {
    bankName: "HDFC Bank Ltd",
    accountName: "Elite Dental Care & Implant Centre",
    accountNo: "50200012345678",
    ifscCode: "HDFC0001234",
    branch: "Alkapuri, Vadodara",
  },
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
  },
  contact: [
    {
      address:
        "Suite 204, Platinum Heights, Near Akshar Chowk, Vadodara, Gujarat",
    },
    { email: "info@elitedentalcare.com" },
    { phone: "+91 98765 43210" },
    { whatsapp: "+91 98765 43210" },
    {
      openingHours: [
        "Mon - Fri: 10:00 AM - 06:30 PM",
        "Saturday : By Appointment Only",
        "Sunday: Close",
      ],
    },
  ],
  social: {
    facebook: "https://facebook.com/elitedental",
    instagram: "https://instagram.com/elitedental",
    youtube: "https://youtube.com/elitedental",
    linkedin: "https://linkedin.com/company/elitedental",
    googleMaps: "https://maps.app.goo.gl/example",
  },
};
