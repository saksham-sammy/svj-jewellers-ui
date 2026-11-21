/**
 * Central Business Configuration for SVJ – Suraj Varma Jewellers (Pashan Gaon, Pune).
 */

export const SITE_CONFIG = {
  shortName: "SVJ",
  brandName: "Suraj Varma Jewellers",
  tagline: "Luxury · Heritage · Elegance",
  description:
    "Discover BIS-certified 22K gold, natural diamond, and bridal jewellery crafted by SVJ – Suraj Varma Jewellers in Pashan Gaon, Pune. Over 25 years of trust and timeless craftsmanship.",

  isDemoMode: false,
  demoNotice: "BIS Hallmarked 22K Gold · Serving Pashan Gaon, Baner & Aundh, Pune",

  contact: {
    phoneDisplay: "+91 98765 43210",
    whatsappNumber: "919876543210",
    email: "svj.pune@gmail.com",
    addressLine1: "Pashan Gaon, Near K.C. Oza",
    addressLine2: "Pune – 411021, Maharashtra",
    googleMapsUrl: "https://maps.app.goo.gl/TmudB25bEKmSKpD26",
    hours: "Mon – Sat: 10:00 AM – 8:30 PM · Sun: 11:00 AM – 5:00 PM",
  },

  social: {
    instagramHandle: "@suraj_varma_jewellars",
    instagramUrl: "https://www.instagram.com/suraj_varma_jewellars/",
  },

  announcement:
    "BIS Hallmarked 22K Gold & Fine Diamonds · Visit SVJ at Pashan Gaon, Pune · 25+ Years of Trust",

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
