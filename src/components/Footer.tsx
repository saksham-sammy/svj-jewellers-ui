"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { SITE_CONFIG, buildWhatsAppEnquiryUrl } from "@/config/site";
import { COLLECTIONS } from "@/data/collections";
import { BrandWordmark } from "./BrandWordmark";
import { useShopStore } from "@/store/useShopStore";

export function Footer() {
  const setAppointmentOpen = useShopStore((s) => s.setAppointmentOpen);

  return (
    <footer
      id="contact"
      className="bg-[#11100E] text-[#E5DDD0] border-t border-[#C5A46D]/20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <BrandWordmark tone="light" size="lg" />
            <p className="text-sm leading-relaxed text-[#ACA496] max-w-sm font-light">
              Fine gold, natural diamond, and ceremonial bridal creations
              shaped with quiet luxury, sculptural proportion, and enduring
              Indian warmth.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={buildWhatsAppEnquiryUrl(
                  "Hello SVJ – Suraj Verma Jewellers, I would like to speak with your jewellery concierge."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#C5A46D]/45 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#F6F2EA] hover:bg-[#C5A46D] hover:text-[#11100E] transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp Enquiry
              </a>
              <button
                type="button"
                onClick={() => setAppointmentOpen(true)}
                className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#D7CFC1] hover:border-[#C5A46D] hover:text-[#C5A46D] transition-colors cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.26em] text-[#C5A46D] font-medium mb-5">
              The House
            </h3>
            <ul className="space-y-3 text-sm font-light text-[#B8B0A2]">
              {SITE_CONFIG.navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-[#F6F2EA] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] uppercase tracking-[0.26em] text-[#C5A46D] font-medium mb-5">
              Collections
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm font-light text-[#B8B0A2]">
              {COLLECTIONS.map((col) => (
                <li key={col.slug}>
                  <Link
                    href={`/collections?category=${col.slug}`}
                    className="hover:text-[#F6F2EA] transition-colors"
                  >
                    {col.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom & Contact (Editable Placeholders) */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] uppercase tracking-[0.26em] text-[#C5A46D] font-medium mb-5">
              Private Salon & Contact
            </h3>
            <ul className="space-y-3.5 text-sm font-light text-[#B8B0A2]">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#C5A46D] shrink-0 mt-0.5 stroke-[1.5]" />
                <span>
                  {SITE_CONFIG.contact.addressLine1}
                  <br />
                  <span className="text-xs text-[#8E8679]">
                    {SITE_CONFIG.contact.addressLine2}
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#C5A46D] shrink-0 stroke-[1.5]" />
                <span>{SITE_CONFIG.contact.phoneDisplay}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#C5A46D] shrink-0 stroke-[1.5]" />
                <span className="break-all">{SITE_CONFIG.contact.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-[#C5A46D] shrink-0 mt-0.5 stroke-[1.5]" />
                <span className="text-xs leading-relaxed">
                  {SITE_CONFIG.contact.hours}
                </span>
              </li>
              <li className="pt-1">
                <a
                  href={SITE_CONFIG.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A46D] hover:text-[#F6F2EA] transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  {SITE_CONFIG.social.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Demo Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#8D8579]">
          <div className="space-y-1">
            <p>
              © 2026 {SITE_CONFIG.shortName} –{" "}
              {SITE_CONFIG.brandName}. All rights reserved.
            </p>
            <p className="text-[11px] text-[#787065]">
              {SITE_CONFIG.demoNotice}
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.18em]">
            <Link
              href="/collections"
              className="hover:text-[#C5A46D] transition-colors"
            >
              Catalogue
            </Link>
            <button
              type="button"
              onClick={() => setAppointmentOpen(true)}
              className="hover:text-[#C5A46D] transition-colors cursor-pointer"
            >
              Concierge
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
