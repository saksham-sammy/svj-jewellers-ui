"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { formatINR } from "@/config/site";
import { useShopStore } from "@/store/useShopStore";

export function HeroSection() {
  const setQuickViewProduct = useShopStore((s) => s.setQuickViewProduct);
  const spotlightProduct = PRODUCTS[0]; // Aaranya Filigree Ruby Kada

  return (
    <section
      aria-label="SVJ Fine Jewellery Hero"
      className="relative bg-[#11100E] text-[#F6F2EA] overflow-hidden"
    >
      {/* Mobile-First Editorial Image Frame (Unobstructed Face & Choker above copy) */}
      <div className="relative h-[300px] sm:h-[380px] w-full lg:hidden overflow-hidden">
        <Image
          src="/images/hero-editorial.jpg"
          alt="Model wearing handcrafted 22K champagne-gold and diamond choker necklace by SVJ"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[74%_22%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11100E] via-[#11100E]/15 to-transparent" />
      </div>

      {/* Desktop Full-Bleed Canvas + Responsive Content Wrapper */}
      <div className="relative lg:min-h-[82vh] lg:max-h-[840px] flex items-center">
        {/* Desktop Background Editorial Photography */}
        <motion.div
          initial={{ scale: 1.03, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block absolute inset-0"
        >
          <Image
            src="/images/hero-editorial.jpg"
            alt="Model wearing handcrafted 22K champagne-gold and diamond choker necklace by SVJ"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11100E] via-[#11100E]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11100E]/80 via-transparent to-[#11100E]/25" />
        </motion.div>

        {/* Main Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:py-20 pb-10 sm:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-8">
            {/* Editorial Copy Block */}
            <div className="lg:col-span-7 max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="inline-flex items-center gap-3 mb-3.5 sm:mb-5"
              >
                <span className="h-[1px] w-7 bg-[#C5A46D]" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#C5A46D] font-medium">
                  Fine Gold &amp; Diamond Atelier
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.16 }}
                className="font-serif text-[2.35rem] sm:text-5xl lg:text-[4.15rem] font-light leading-[1.06] tracking-[-0.01em] text-[#F6F2EA]"
              >
                Elegance That{" "}
                <span className="italic text-[#DFC89E] font-light">
                  Transcends
                </span>{" "}
                Time.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.26 }}
                className="mt-3.5 sm:mt-5 text-sm sm:text-base text-[#D4CCC0] font-light leading-relaxed max-w-md"
              >
                Discover jewellery crafted to celebrate life&apos;s most
                beautiful moments—uniting timeless Indian heritage with quiet
                contemporary sophistication.
              </motion.p>

              {/* Primary & Secondary CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.34 }}
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
              >
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center gap-3 bg-[#C5A46D] text-[#11100E] px-7 py-3.5 sm:py-4 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-[#D5B782] transition-colors duration-300"
                >
                  <span>Explore Collections</span>
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2]" />
                </Link>

                <Link
                  href="#story"
                  className="inline-flex items-center justify-center gap-2 border border-[#F6F2EA]/30 text-[#F6F2EA] px-7 py-3.5 sm:py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:border-[#C5A46D] hover:text-[#DFC89E] transition-colors duration-300"
                >
                  Discover Our Story
                </Link>
              </motion.div>

              {/* Subtle Editorial Footnote */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-7 sm:mt-10 pt-5 border-t border-white/12 flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-[#A9A093]"
              >
                <span>22K Fine Gold</span>
                <span className="text-[#C5A46D]/60">·</span>
                <span>Natural Diamonds</span>
                <span className="text-[#C5A46D]/60">·</span>
                <span>Private Bridal Salon</span>
              </motion.div>
            </div>

            {/* Desktop Floating Signature Piece Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.45 }}
              className="hidden lg:flex lg:col-span-5 justify-end"
            >
              <button
                type="button"
                onClick={() => setQuickViewProduct(spotlightProduct)}
                className="group w-76 text-left bg-[#161411]/90 backdrop-blur-md border border-[#C5A46D]/30 p-3.5 transition-all duration-500 hover:border-[#C5A46D] cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.24em] text-[#C5A46D]">
                    <Sparkles className="h-3 w-3" />
                    Signature Highlight
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#9B9285]">
                    Demo Piece
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-[#1E1B17]">
                    <Image
                      src={spotlightProduct.image}
                      alt={spotlightProduct.name}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-lg leading-snug text-[#F6F2EA] group-hover:text-[#DFC89E] transition-colors truncate">
                      {spotlightProduct.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#A8A092] font-light">
                      {spotlightProduct.metal}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs tracking-wide text-[#DFC89E]">
                        {formatINR(spotlightProduct.priceInr)}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#F6F2EA]/80 group-hover:text-[#C5A46D] inline-flex items-center gap-1">
                        View
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
