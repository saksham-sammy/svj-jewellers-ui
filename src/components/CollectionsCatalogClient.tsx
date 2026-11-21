"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { PRODUCTS, type MetalType } from "@/data/products";
import { COLLECTIONS } from "@/data/collections";
import { ProductCard } from "./ProductCard";

const METALS: MetalType[] = [
  "22K Yellow Gold",
  "18K Champagne Gold",
  "18K Rose Gold",
  "18K White Gold",
];

const PRICE_RANGES = [
  { id: "all", label: "All Price Tiers", min: 0, max: Infinity },
  { id: "under-2l", label: "Under ₹2,00,000", min: 0, max: 200000 },
  { id: "2l-3.5l", label: "₹2,00,000 – ₹3,50,000", min: 200000, max: 350000 },
  { id: "above-3.5l", label: "Above ₹3,50,000", min: 350000, max: Infinity },
] as const;

export function CollectionsCatalogClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";

  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [selectedMetal, setSelectedMetal] = useState<string>("all");
  const [selectedPrice, setSelectedPrice] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">(
    "featured"
  );
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const activeCollection = COLLECTIONS.find((c) => c.slug === selectedCategory);

  const filtered = useMemo(() => {
    const priceTier =
      PRICE_RANGES.find((r) => r.id === selectedPrice) ?? PRICE_RANGES[0];
    const q = query.trim().toLowerCase();

    const list = PRODUCTS.filter((p) => {
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }
      if (selectedMetal !== "all" && p.metal !== selectedMetal) {
        return false;
      }
      if (p.priceInr < priceTier.min || p.priceInr > priceTier.max) {
        return false;
      }
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.subtitle.toLowerCase().includes(q) &&
        !p.categoryLabel.toLowerCase().includes(q) &&
        !p.metal.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });

    if (sortBy === "price-asc") {
      return [...list].sort((a, b) => a.priceInr - b.priceInr);
    }
    if (sortBy === "price-desc") {
      return [...list].sort((a, b) => b.priceInr - a.priceInr);
    }
    return list;
  }, [selectedCategory, selectedMetal, selectedPrice, query, sortBy]);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedMetal !== "all" ||
    selectedPrice !== "all" ||
    query.trim().length > 0;

  const clearAll = () => {
    setSelectedCategory("all");
    setSelectedMetal("all");
    setSelectedPrice("all");
    setQuery("");
  };

  const renderFilterControls = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h3 className="text-[10px] uppercase tracking-[0.26em] text-[#9E7F4B] font-semibold mb-3.5">
          Category
        </h3>
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`w-full text-left py-1.5 text-sm transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "text-[#11100E] font-medium underline underline-offset-4 decoration-[#C5A46D]"
                : "text-[#6B645A] hover:text-[#11100E]"
            }`}
          >
            All Collections
          </button>
          {COLLECTIONS.map((col) => (
            <button
              key={col.slug}
              type="button"
              onClick={() => setSelectedCategory(col.slug)}
              className={`w-full text-left py-1.5 text-sm transition-colors cursor-pointer ${
                selectedCategory === col.slug
                  ? "text-[#11100E] font-medium underline underline-offset-4 decoration-[#C5A46D]"
                  : "text-[#6B645A] hover:text-[#11100E]"
              }`}
            >
              {col.title}
            </button>
          ))}
        </div>
      </div>

      {/* Metal */}
      <div className="pt-6 border-t border-[#E2D9C9]">
        <h3 className="text-[10px] uppercase tracking-[0.26em] text-[#9E7F4B] font-semibold mb-3.5">
          Metal Purity
        </h3>
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => setSelectedMetal("all")}
            className={`w-full text-left py-1.5 text-sm transition-colors cursor-pointer ${
              selectedMetal === "all"
                ? "text-[#11100E] font-medium underline underline-offset-4 decoration-[#C5A46D]"
                : "text-[#6B645A] hover:text-[#11100E]"
            }`}
          >
            All Metals
          </button>
          {METALS.map((metal) => (
            <button
              key={metal}
              type="button"
              onClick={() => setSelectedMetal(metal)}
              className={`w-full text-left py-1.5 text-sm transition-colors cursor-pointer ${
                selectedMetal === metal
                  ? "text-[#11100E] font-medium underline underline-offset-4 decoration-[#C5A46D]"
                  : "text-[#6B645A] hover:text-[#11100E]"
              }`}
            >
              {metal}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="pt-6 border-t border-[#E2D9C9]">
        <h3 className="text-[10px] uppercase tracking-[0.26em] text-[#9E7F4B] font-semibold mb-3.5">
          Illustrative Price
        </h3>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.id}
              type="button"
              onClick={() => setSelectedPrice(range.id)}
              className={`w-full text-left py-1.5 text-sm transition-colors cursor-pointer ${
                selectedPrice === range.id
                  ? "text-[#11100E] font-medium underline underline-offset-4 decoration-[#C5A46D]"
                  : "text-[#6B645A] hover:text-[#11100E]"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Editorial Dark Header Strip */}
      <section className="bg-[#11100E] text-[#F6F2EA] py-14 sm:py-18 border-b border-[#C5A46D]/20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#C5A46D] mb-3">
            SVJ Fine Jewellery Catalogue · Demo Showcase
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#F6F2EA]">
            {activeCollection ? activeCollection.title : "All Collections"}
          </h1>
          <p className="mt-3 text-sm text-[#BEB6A8] font-light max-w-xl leading-relaxed">
            {activeCollection
              ? activeCollection.subtitle
              : "Explore our curated selection of 22K gold heirlooms, natural diamonds, and bespoke bridal pieces."}
          </p>
        </div>
      </section>

      {/* Main Catalog Area on Warm Ivory */}
      <section className="bg-[#F6F2EA] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E2D9C9]">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="h-4 w-4 text-[#8B8377] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter by piece, metal, or style..."
                  className="w-full bg-[#FBF9F5] border border-[#DDD3C2] pl-10 pr-4 py-2.5 text-sm text-[#1C1A17] placeholder:text-[#8E867A] focus:outline-none focus:border-[#C5A46D]"
                />
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 border border-[#11100E] px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#11100E] shrink-0 cursor-pointer"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filter
              </button>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <span className="text-xs text-[#6E675E]">
                {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
              </span>
              <select
                aria-label="Sort creations"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "featured" | "price-asc" | "price-desc"
                  )
                }
                className="bg-[#FBF9F5] border border-[#DDD3C2] px-3.5 py-2 text-xs text-[#1C1A17] focus:outline-none focus:border-[#C5A46D] cursor-pointer"
              >
                <option value="featured">Curated Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-7">
              {selectedCategory !== "all" && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className="inline-flex items-center gap-1.5 bg-[#11100E] text-[#F6F2EA] px-3 py-1 text-[10px] uppercase tracking-[0.18em] cursor-pointer"
                >
                  {activeCollection?.title ?? selectedCategory}
                  <X className="h-3 w-3" />
                </button>
              )}
              {selectedMetal !== "all" && (
                <button
                  type="button"
                  onClick={() => setSelectedMetal("all")}
                  className="inline-flex items-center gap-1.5 bg-[#11100E] text-[#F6F2EA] px-3 py-1 text-[10px] uppercase tracking-[0.18em] cursor-pointer"
                >
                  {selectedMetal}
                  <X className="h-3 w-3" />
                </button>
              )}
              {selectedPrice !== "all" && (
                <button
                  type="button"
                  onClick={() => setSelectedPrice("all")}
                  className="inline-flex items-center gap-1.5 bg-[#11100E] text-[#F6F2EA] px-3 py-1 text-[10px] uppercase tracking-[0.18em] cursor-pointer"
                >
                  {PRICE_RANGES.find((r) => r.id === selectedPrice)?.label}
                  <X className="h-3 w-3" />
                </button>
              )}
              <button
                type="button"
                onClick={clearAll}
                className="text-[11px] uppercase tracking-[0.18em] text-[#9E7F4B] underline underline-offset-4 ml-1 cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Desktop Sidebar + Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 bg-[#FBF9F5] border border-[#E5DDD0] p-6">
                {renderFilterControls()}
              </div>
            </aside>

            <div className="lg:col-span-9">
              {filtered.length === 0 ? (
                <div className="bg-[#FBF9F5] border border-[#E5DDD0] p-12 text-center">
                  <p className="font-serif text-2xl text-[#11100E]">
                    No creations match these filters
                  </p>
                  <p className="mt-2 text-xs text-[#6E675E] font-light">
                    Try adjusting your metal purity or price range selection.
                  </p>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="mt-6 bg-[#11100E] text-[#F6F2EA] px-7 py-3 text-[11px] uppercase tracking-[0.22em] cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Bottom-Sheet Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/65 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-[#F6F2EA] text-[#1C1A17] border-t border-[#DFD5C3] p-6 pb-safe"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E2D9C9]">
                <h2 className="font-serif text-2xl text-[#11100E]">
                  Filter Creations
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  aria-label="Close filters"
                  className="h-10 w-10 inline-flex items-center justify-center cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {renderFilterControls()}
              <div className="mt-8 pt-4 border-t border-[#E2D9C9] flex gap-3">
                <button
                  type="button"
                  onClick={clearAll}
                  className="flex-1 border border-[#11100E]/25 py-3 text-[11px] uppercase tracking-[0.2em] cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 bg-[#11100E] text-[#F6F2EA] py-3 text-[11px] uppercase tracking-[0.2em] cursor-pointer"
                >
                  Show {filtered.length} Pieces
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
