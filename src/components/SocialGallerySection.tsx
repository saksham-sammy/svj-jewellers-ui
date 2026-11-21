"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SOCIAL_GALLERY } from "@/data/content";

export function SocialGallerySection() {
  return (
    <section
      aria-labelledby="journal-heading"
      className="bg-[#F6F2EA] text-[#1C1A17] py-16 sm:py-22"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-9 sm:mb-12">
          <div>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#9E7F4B] font-medium mb-2.5">
              Visual Journal
            </p>
            <h2
              id="journal-heading"
              className="font-serif text-3xl sm:text-4xl font-light text-[#11100E]"
            >
              In the World of SVJ
            </h2>
          </div>

          <a
            href={SITE_CONFIG.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-medium text-[#11100E] hover:text-[#9E7F4B] transition-colors self-start sm:self-end"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4 text-[#9E7F4B]"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span>{SITE_CONFIG.social.instagramHandle}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SOCIAL_GALLERY.map((item) => (
            <a
              key={item.id}
              href={SITE_CONFIG.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-[#181613]"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
                className="object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-[#11100E]/0 group-hover:bg-[#11100E]/65 transition-colors duration-300 flex flex-col justify-between p-3.5 opacity-0 group-hover:opacity-100">
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#C5A46D]">
                  {item.tag}
                </span>
                <p className="text-[11px] text-[#F6F2EA] font-light leading-snug">
                  {item.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
