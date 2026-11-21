"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CRAFTSMANSHIP_STEPS } from "@/data/content";

export function CraftsmanshipSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = CRAFTSMANSHIP_STEPS[activeIndex];

  return (
    <section
      id="craftsmanship"
      aria-labelledby="craftsmanship-heading"
      className="bg-[#11100E] text-[#F6F2EA] border-t border-[#C5A46D]/15 py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#C5A46D] font-medium mb-3">
            The Art of Making
          </p>
          <h2
            id="craftsmanship-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[2.95rem] font-light leading-[1.12] text-[#F6F2EA]"
          >
            Craftsmanship in Four{" "}
            <span className="italic text-[#DFC89E]">Deliberate</span> Acts
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Interactive 4-Step Accordion / List */}
          <div className="lg:col-span-6 divide-y divide-white/10 border-y border-white/10">
            {CRAFTSMANSHIP_STEPS.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="w-full text-left py-5 sm:py-6 transition-colors group cursor-pointer"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:gap-5">
                      <span
                        className={`font-serif text-lg sm:text-xl transition-colors ${
                          isActive ? "text-[#C5A46D]" : "text-[#6F685E]"
                        }`}
                      >
                        {step.number}
                      </span>
                      <div>
                        <h3
                          className={`font-serif text-2xl sm:text-[1.7rem] font-light transition-colors ${
                            isActive
                              ? "text-[#F6F2EA]"
                              : "text-[#B1A89B] group-hover:text-[#F6F2EA]"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-[#9A9081] mt-0.5">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`h-[1px] w-6 shrink-0 transition-all duration-300 ${
                        isActive ? "bg-[#C5A46D] w-10" : "bg-white/20"
                      }`}
                    />
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="mt-4 pl-9 sm:pl-11 pr-2 space-y-2.5"
                    >
                      <p className="text-sm text-[#CFC7BA] font-light leading-relaxed">
                        {step.description}
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#C5A46D]">
                        — {step.detail}
                      </p>
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Macro Atelier Photography */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1815] border border-[#C5A46D]/20">
              <Image
                src="/images/craftsmanship-atelier.jpg"
                alt="Master artisan hand-setting a 22K gold filigree pendant in the SVJ workshop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11100E]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#C5A46D]">
                    Stage {activeStep.number} · {activeStep.title}
                  </span>
                  <p className="mt-1 font-serif text-xl sm:text-2xl font-light text-[#F6F2EA]">
                    {activeStep.subtitle}
                  </p>
                </div>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.2em] text-[#BFB6A7] border border-white/15 px-3 py-1.5">
                  SVJ Atelier
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
