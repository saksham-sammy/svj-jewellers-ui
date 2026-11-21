/**
 * Central Business & Demo Configuration for SVJ – Suraj Verma Jewellers.
 * Replace placeholder values below with verified SVJ showroom details prior to launch.
 */

export const SITE_CONFIG = {
  shortName: "SVJ",
  brandName: "Suraj Verma Jewellers",
  tagline: "Luxury · Heritage · Elegance",
  description:
    "Discover fine gold, diamond, and contemporary bridal jewellery crafted by SVJ – Suraj Verma Jewellers to celebrate life's most meaningful moments.",

  // Demo Mode Flag (keeps unverified details clearly marked)
  isDemoMode: true,
  demoNotice:
    "Interactive Luxury UI Preview — Prices, product details, and contact details shown are editable demonstration placeholders.",

  // Editable Business Contact Placeholders
  contact: {
    phoneDisplay: "+91 98XXX XXXXX (Demo)",
    whatsappNumber: "919800000000", // Replace with digits-only international WhatsApp number
    email: "concierge@surajvermajewellers.example",
    addressLine1: "SVJ Flagship Salon (Demo Address)",
    addressLine2: "Showroom Street, Jewellery District, India",
    googleMapsUrl: "https://maps.google.com/?q=Suraj+Verma+Jewellers",
    hours: "Tuesday – Sunday · 11:00 AM – 8:00 PM (Editable)",
  },

  social: {
    instagramHandle: "@svj.jewellers",
    instagramUrl: "https://instagram.com",
  },

  announcement:
    "Discover timeless elegance with SVJ · Private showroom viewings & bespoke consultations available",

  navigation: [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    { label: "New Arrivals", href: "/collections?sort=featured" },
    { label: "Craftsmanship", href: "/#craftsmanship" },
    { label: "Our Story", href: "/#story" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export function buildWhatsAppEnquiryUrl(message: string): string {
  const digits = SITE_CONFIG.contact.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
