"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { COLLECTIONS } from "@/data/collections";

export function CollectionsSection() {
  const primaryThree = COLLECTIONS.slice(0, 3);
  const secondaryFive = COLLECTIONS.slice(3);

  return (
    <section
      id="collections"
      aria-labelledby="collections-heading"
      className="bg-[#F6F2EA] text-[#1C1A17] py-16 sm:py-22 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-xl">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#9E7F4B] font-medium mb-3">
              Curated Categories
            </p>
            <h2
              id="collections-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[2.85rem] font-light leading-[1.12] text-[#11100E]"
            >
              Signature Collections
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-[#6D665C] font-light max-w-xs leading-relaxed">
              From sacred bridal heirlooms to refined everyday solitaires,
              explore every expression of the house.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-medium text-[#11100E] border-b border-[#11100E]/35 pb-1 hover:border-[#9E7F4B] hover:text-[#9E7F4B] transition-colors self-start sm:self-end shrink-0"
            >
              View All
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Row 1: Editorial Trio (Gold, Diamond, Bridal) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {primaryThree.map((col, idx) => (
            <motion.div
              key={col.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              <Link
                href={`/collections?category=${col.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-[#181613]"
              >
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11100E]/88 via-[#11100E]/20 to-transparent" />
                <div className="absolute inset-3 border border-[#C5A46D]/0 group-hover:border-[#C5A46D]/45 transition-colors duration-500 pointer-events-none" />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-[#F6F2EA]">
                  <span className="block text-[10px] uppercase tracking-[0.24em] text-[#C5A46D] mb-1.5">
                    0{idx + 1} · Collection
                  </span>
                  <h3 className="font-serif text-2xl sm:text-[1.75rem] font-light tracking-wide">
                    {col.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#D5CDC0] font-light leading-relaxed line-clamp-2">
                    {col.subtitle}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-[#F6F2EA] group-hover:text-[#DFC89E] transition-colors">
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Row 2: Five Category Cards (Earrings, Necklaces, Rings, Bangles, Men's) */}
        <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {secondaryFive.map((col, idx) => (
            <motion.div
              key={col.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: idx * 0.06 }}
              className={idx === 4 ? "col-span-2 sm:col-span-1" : ""}
            >
              <Link
                href={`/collections?category=${col.slug}`}
                className="group block bg-[#FBF9F5] border border-[#E2D9C9] hover:border-[#C5A46D] transition-colors duration-300 overflow-hidden"
              >
                <div className="relative aspect-[4/4] sm:aspect-[4/5] overflow-hidden bg-[#EBE4D7]">
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-3.5 sm:p-4 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg sm:text-xl font-normal text-[#11100E] group-hover:text-[#9E7F4B] transition-colors truncate">
                      {col.title}
                    </h3>
                    <p className="text-[11px] text-[#7A7266] font-light truncate mt-0.5">
                      Discover pieces
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#9E7F4B] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
