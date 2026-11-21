"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "./ProductCard";

const FILTER_TABS = [
  { key: "all", label: "All Creations" },
  { key: "gold-jewellery", label: "Gold" },
  { key: "diamond-jewellery", label: "Diamonds" },
  { key: "bridal-collection", label: "Bridal" },
  { key: "rings", label: "Rings" },
  { key: "earrings", label: "Earrings" },
  { key: "necklaces", label: "Necklaces" },
  { key: "bangles", label: "Bangles" },
  { key: "mens-jewellery", label: "Men's" },
] as const;

type SortOption = "featured" | "price-asc" | "price-desc";

export function FeaturedProductsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    const base =
      activeCategory === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeCategory);

    if (sortBy === "price-asc") {
      return [...base].sort((a, b) => a.priceInr - b.priceInr);
    }
    if (sortBy === "price-desc") {
      return [...base].sort((a, b) => b.priceInr - a.priceInr);
    }
    return base;
  }, [activeCategory, sortBy]);

  const showSpotlight =
    activeCategory === "all" &&
    sortBy === "featured" &&
    filteredProducts.length >= 6;
  const spotlightItem = showSpotlight ? filteredProducts[0] : null;
  const gridItems = showSpotlight
    ? filteredProducts.slice(1, 7)
    : filteredProducts.slice(0, 6);

  return (
    <section
      id="featured-products"
      aria-labelledby="featured-heading"
      className="bg-[#F6F2EA] text-[#1C1A17] py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#9E7F4B] font-medium mb-3">
              Curated Showcase · Demo Catalogue
            </p>
            <h2
              id="featured-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[2.85rem] font-light leading-[1.12] text-[#11100E]"
            >
              Featured Creations
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <label
              htmlFor="home-sort"
              className="text-[10px] uppercase tracking-[0.22em] text-[#787064]"
            >
              Sort
            </label>
            <select
              id="home-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#FBF9F5] border border-[#DDD3C2] px-3.5 py-2 text-xs text-[#1C1A17] focus:outline-none focus:border-[#C5A46D] cursor-pointer"
            >
              <option value="featured">Curated Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter Tabs (Touch-friendly horizontal scroll on mobile) */}
        <div
          role="tablist"
          aria-label="Filter featured jewellery by category"
          className="flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar border-b border-[#E2D9C9] mb-8 sm:mb-10 pb-0"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(tab.key)}
                className={`relative shrink-0 px-2 sm:px-0 py-3.5 text-[11px] uppercase tracking-[0.2em] transition-colors cursor-pointer ${
                  isActive
                    ? "text-[#11100E] font-semibold"
                    : "text-[#7A7266] hover:text-[#11100E]"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[#C5A46D]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Varied Editorial Product Layout */}
        <div className="space-y-6">
          {spotlightItem && (
            <ProductCard product={spotlightItem} variant="spotlight" />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {gridItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Bottom CTA to Full Collection Page */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-3 border border-[#11100E] text-[#11100E] px-9 py-4 text-[11px] font-medium uppercase tracking-[0.24em] hover:bg-[#11100E] hover:text-[#F6F2EA] transition-colors duration-300"
          >
            <span>Explore Full Catalogue ({PRODUCTS.length} Demo Pieces)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
