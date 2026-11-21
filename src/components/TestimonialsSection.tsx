"use client";

import { motion } from "motion/react";
import { DEMO_TESTIMONIALS } from "@/data/content";

export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="reflections-heading"
      className="bg-[#F6F2EA] text-[#1C1A17] py-16 sm:py-24 border-b border-[#E2D9C9]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block text-[9px] uppercase tracking-[0.24em] px-3 py-1 border border-[#C5A46D]/60 text-[#866B3E] mb-4">
            Trusted Across Pashan, Baner &amp; Aundh · 2,000+ Clients
          </span>
          <h2
            id="reflections-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[2.7rem] font-light text-[#11100E]"
          >
            Patron Reflections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {DEMO_TESTIMONIALS.map((item, idx) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              className="flex flex-col justify-between bg-[#FBF9F5] border border-[#E5DDD0] p-7 sm:p-8"
            >
              <div>
                <span
                  aria-hidden="true"
                  className="font-serif text-4xl leading-none text-[#C5A46D] block mb-4"
                >
                  &ldquo;
                </span>
                <blockquote className="font-serif text-xl sm:text-[1.35rem] font-light leading-relaxed text-[#1C1A17]">
                  {item.quote}
                </blockquote>
              </div>

              <figcaption className="mt-7 pt-5 border-t border-[#EAE2D4]">
                <p className="text-xs uppercase tracking-[0.2em] font-medium text-[#11100E]">
                  {item.author}
                </p>
                <p className="mt-1 text-[11px] text-[#7D7569] font-light">
                  {item.occasion}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
