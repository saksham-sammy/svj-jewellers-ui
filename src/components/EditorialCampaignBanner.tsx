"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useShopStore } from "@/store/useShopStore";

export function EditorialCampaignBanner() {
  const setAppointmentOpen = useShopStore((s) => s.setAppointmentOpen);

  return (
    <section
      aria-label="SVJ Editorial Campaign"
      className="relative bg-[#11100E] text-[#F6F2EA] overflow-hidden"
    >
      <div className="relative min-h-[460px] sm:min-h-[540px] lg:min-h-[600px] flex items-center">
        <Image
          src="/images/editorial-campaign.jpg"
          alt="Hands adorned with diamond solitaire ring and slender tennis bracelet on black silk"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11100E]/92 via-[#11100E]/55 to-[#11100E]/35 lg:bg-gradient-to-r lg:from-[#11100E]/90 lg:via-[#11100E]/45 lg:to-[#11100E]/20" />

        {/* Subtle Architectural Frame */}
        <div className="pointer-events-none absolute inset-4 sm:inset-8 border border-[#C5A46D]/20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-7 sm:px-12 lg:px-16 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
            className="max-w-lg"
          >
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#C5A46D] mb-4">
              Bridal &amp; Milestone Campaign
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.4rem] font-light leading-[1.08] text-[#F6F2EA]">
              Made for Your Most{" "}
              <span className="italic text-[#DFC89E]">Meaningful</span> Moments.
            </h2>
            <p className="mt-5 text-sm sm:text-base text-[#D4CCC0] font-light leading-relaxed">
              Whether marking a lifelong promise or curating a bridal
              trousseau, enjoy an unhurried private viewing tailored to your
              occasion.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
              <button
                type="button"
                onClick={() => setAppointmentOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 bg-[#C5A46D] text-[#11100E] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-[#D7BA86] transition-colors cursor-pointer"
              >
                Book Private Styling
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <Link
                href="/collections?category=bridal-collection"
                className="inline-flex items-center justify-center border border-[#F6F2EA]/35 text-[#F6F2EA] px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] hover:border-[#C5A46D] hover:text-[#DFC89E] transition-colors"
              >
                Explore Bridal Atelier
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
