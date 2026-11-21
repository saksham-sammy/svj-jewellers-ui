"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { SITE_CONFIG, buildWhatsAppEnquiryUrl } from "@/config/site";
import { BrandWordmark } from "./BrandWordmark";
import { useShopStore } from "@/store/useShopStore";
import { useMounted } from "@/hooks/useMounted";

interface NavbarProps {
  /** Use "dark" on pages starting with a dark hero, "ivory" on light catalog/product pages */
  initialTone?: "dark" | "ivory";
}

export function Navbar({ initialTone = "dark" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mounted = useMounted();

  const cart = useShopStore((s) => s.cart);
  const wishlist = useShopStore((s) => s.wishlist);
  const setCartOpen = useShopStore((s) => s.setCartOpen);
  const setWishlistOpen = useShopStore((s) => s.setWishlistOpen);
  const setSearchOpen = useShopStore((s) => s.setSearchOpen);
  const setAppointmentOpen = useShopStore((s) => s.setAppointmentOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const cartCount = mounted
    ? cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;
  const wishlistCount = mounted ? wishlist.length : 0;

  const isDarkSurface = initialTone === "dark" && !scrolled;
  const headerClasses =
    initialTone === "dark"
      ? scrolled
        ? "bg-[#11100E]/95 backdrop-blur-md border-b border-[#C5A46D]/25 text-[#F6F2EA] shadow-[0_8px_32px_rgba(0,0,0,0.32)]"
        : "bg-[#11100E] border-b border-[#C5A46D]/18 text-[#F6F2EA]"
      : scrolled
        ? "bg-[#F6F2EA]/95 backdrop-blur-md border-b border-[#E2D9C9] text-[#11100E] shadow-[0_4px_24px_rgba(17,16,14,0.06)]"
        : "bg-[#F6F2EA] border-b border-[#E2D9C9] text-[#11100E]";

  const iconColor =
    initialTone === "dark"
      ? "text-[#F6F2EA]/90 hover:text-[#C5A46D]"
      : "text-[#1C1A17] hover:text-[#9E7F4B]";

  const navLinkColor =
    initialTone === "dark"
      ? "text-[#E7E0D2] hover:text-[#C5A46D]"
      : "text-[#2A2622] hover:text-[#9E7F4B]";

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${headerClasses}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
            {/* Left: Mobile Menu + Brand Wordmark */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                className={`lg:hidden -ml-2 inline-flex h-11 w-11 items-center justify-center transition-colors cursor-pointer ${iconColor}`}
              >
                <Menu className="h-5 w-5 stroke-[1.5]" />
              </button>
              <BrandWordmark
                tone={initialTone === "dark" ? "light" : "dark"}
                size="md"
              />
            </div>

            {/* Center: Desktop Editorial Navigation */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center gap-6 xl:gap-8"
            >
              {SITE_CONFIG.navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative py-2 text-[11px] uppercase tracking-[0.18em] font-medium whitespace-nowrap transition-colors duration-200 group ${navLinkColor}`}
                >
                  {item.label}
                  <span className="absolute bottom-1 left-0 h-[1px] w-0 bg-[#C5A46D] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Right: Search, Appointment, Wishlist, Bag */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setAppointmentOpen(true)}
                className={`hidden xl:inline-flex items-center gap-2 mr-2 px-4 py-2 text-[10px] uppercase tracking-[0.18em] whitespace-nowrap border transition-all duration-300 cursor-pointer ${
                  isDarkSurface || initialTone === "dark"
                    ? "border-[#C5A46D]/45 text-[#E8DEC8] hover:border-[#C5A46D] hover:bg-[#C5A46D]/10"
                    : "border-[#1C1A17]/25 text-[#1C1A17] hover:border-[#9E7F4B] hover:text-[#9E7F4B]"
                }`}
              >
                <Calendar className="h-3.5 w-3.5 shrink-0 stroke-[1.5] text-[#C5A46D]" />
                Book Viewing
              </button>

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search jewellery"
                className={`inline-flex h-11 w-10 sm:w-11 items-center justify-center transition-colors cursor-pointer ${iconColor}`}
              >
                <Search className="h-[19px] w-[19px] stroke-[1.5]" />
              </button>

              <button
                type="button"
                onClick={() => setWishlistOpen(true)}
                aria-label={`Open wishlist (${wishlistCount} items)`}
                className={`relative inline-flex h-11 w-10 sm:w-11 items-center justify-center transition-colors cursor-pointer ${iconColor}`}
              >
                <Heart className="h-[19px] w-[19px] stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-2 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C5A46D] px-1 text-[9px] font-semibold text-[#11100E]">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label={`Open shopping bag (${cartCount} items)`}
                className={`relative inline-flex h-11 w-10 sm:w-11 items-center justify-center transition-colors cursor-pointer ${iconColor}`}
              >
                <ShoppingBag className="h-[19px] w-[19px] stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute top-2 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C5A46D] px-1 text-[9px] font-semibold text-[#11100E]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Mobile menu"
              className="fixed inset-y-0 left-0 w-[86vw] max-w-sm bg-[#11100E] text-[#F6F2EA] flex flex-col border-r border-[#C5A46D]/20 shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 h-18 border-b border-[#C5A46D]/15">
                <BrandWordmark tone="light" size="sm" />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex h-11 w-11 items-center justify-center text-[#B8B0A2] hover:text-[#F6F2EA] cursor-pointer"
                >
                  <X className="h-5 w-5 stroke-[1.5]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8">
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#C5A46D] mb-5">
                  Explore The House
                </p>
                <nav className="flex flex-col divide-y divide-white/8">
                  {SITE_CONFIG.navigation.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-4 font-serif text-2xl font-light tracking-wide text-[#F6F2EA] hover:text-[#C5A46D] transition-colors"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-[#C5A46D]/70" />
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      setAppointmentOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2.5 bg-[#C5A46D] text-[#11100E] py-3.5 px-5 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-[#D5B680] transition-colors cursor-pointer"
                  >
                    <Calendar className="h-4 w-4 stroke-[1.75]" />
                    Book Private Viewing
                  </button>

                  <a
                    href={buildWhatsAppEnquiryUrl(
                      "Hello SVJ – Suraj Verma Jewellers, I would like to enquire about your fine jewellery collections."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border border-[#C5A46D]/40 text-[#F6F2EA] py-3.5 px-5 text-[11px] uppercase tracking-[0.22em] hover:border-[#C5A46D] transition-colors"
                  >
                    WhatsApp Concierge
                  </a>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-white/10 pb-safe">
                <p className="text-[10px] tracking-[0.16em] uppercase text-[#9A9184]">
                  {SITE_CONFIG.contact.hours}
                </p>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
