"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useShopStore } from "@/store/useShopStore";

const PILLARS = [
  {
    index: "I",
    title: "Sculptural Restraint",
    text: "Proportions refined to flatter effortlessly—statement pieces that never overpower the wearer.",
  },
  {
    index: "II",
    title: "Honest Purity",
    text: "Dedicated to fine precious metals and carefully inspected natural gemstones across every collection.",
  },
  {
    index: "III",
    title: "Karigar Heritage",
    text: "Honouring traditional Indian filigree and hand-setting techniques adapted for modern wardrobes.",
  },
  {
    index: "IV",
    title: "Personal Concierge",
    text: "Private showroom viewings, thoughtful sizing guidance, and bespoke bridal styling assistance.",
  },
];

export function BrandStorySection() {
  const setAppointmentOpen = useShopStore((s) => s.setAppointmentOpen);

  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="bg-[#EFE9DE] text-[#1C1A17] border-y border-[#E2D9C9] py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Editorial Visual Collage */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-[5/6] overflow-hidden bg-[#181613]">
              <Image
                src="/images/craftsmanship-atelier.jpg"
                alt="Master artisan inspecting a handcrafted 22K gold filigree pendant in the SVJ atelier"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Secondary Editorial Inset */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-48 lg:w-56 bg-[#F6F2EA] p-2.5 border border-[#DFD5C3] shadow-[0_18px_40px_rgba(17,16,14,0.12)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#11100E]">
                <Image
                  src="/images/col-halo-ring.jpg"
                  alt="Macro detail of fine diamond halo craftsmanship"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
              <p className="mt-2.5 text-[10px] uppercase tracking-[0.22em] text-[#8E7142] text-center">
                Hand-Finished Detail
              </p>
            </div>
          </motion.div>

          {/* Brand Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-6 lg:pl-4"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#9E7F4B] font-medium">
                The SVJ Philosophy
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] px-2.5 py-0.5 border border-[#C5A46D]/50 text-[#7A6238] bg-[#F6F2EA]">
                Editable Demo Story
              </span>
            </div>

            <h2
              id="story-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[2.95rem] font-light leading-[1.12] text-[#11100E]"
            >
              More Than Jewellery.{" "}
              <span className="italic text-[#7E6336]">
                A Legacy of Elegance.
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base text-[#4D4740] font-light leading-relaxed">
              At <strong className="font-medium text-[#11100E]">SVJ – Suraj Verma Jewellers</strong>,
              jewellery is conceived not as an impulse adornment, but as an
              intimate heirloom—created to accompany milestones, weddings, and
              everyday moments of quiet pride.
            </p>

            <p className="mt-4 text-sm sm:text-base text-[#5C554C] font-light leading-relaxed">
              Every silhouette balances the warmth of Indian celebratory
              tradition with the discipline of international high-jewellery
              design: clean lines, tactile comfort, and lasting brilliance.
            </p>

            {/* 4 Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-6 pt-8 border-t border-[#D9CEBC]">
              {PILLARS.map((pillar) => (
                <div key={pillar.title} className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-serif text-sm italic text-[#9E7F4B]">
                      {pillar.index}.
                    </span>
                    <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#11100E]">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#665F55] font-light leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setAppointmentOpen(true)}
                className="bg-[#11100E] text-[#F6F2EA] px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-[#2A2621] transition-colors cursor-pointer"
              >
                Schedule a Private Consultation
              </button>
              <a
                href="#craftsmanship"
                className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#11100E] border-b border-[#11100E]/35 pb-1 hover:border-[#9E7F4B] hover:text-[#9E7F4B] transition-colors"
              >
                Explore Craftsmanship
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
