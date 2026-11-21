"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Calendar,
  Minus,
  Plus,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import type { Product } from "@/data/products";
import { buildWhatsAppEnquiryUrl, formatINR } from "@/config/site";
import { useShopStore } from "@/store/useShopStore";
import { useMounted } from "@/hooks/useMounted";
import { ProductCard } from "./ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [activeImage, setActiveImage] = useState(product.gallery[0] ?? product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "Standard");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<"specs" | "care" | "salon" | null>("specs");
  const mounted = useMounted();

  const wishlist = useShopStore((s) => s.wishlist);
  const toggleWishlist = useShopStore((s) => s.toggleWishlist);
  const addToCart = useShopStore((s) => s.addToCart);
  const setCartOpen = useShopStore((s) => s.setCartOpen);
  const setAppointmentOpen = useShopStore((s) => s.setAppointmentOpen);

  const isWishlisted = mounted && wishlist.includes(product.id);
  const whatsappUrl = buildWhatsAppEnquiryUrl(
    `Hello SVJ – Suraj Verma Jewellers, I am interested in "${product.name}" (${product.metal}, Size: ${selectedSize}, Qty: ${quantity}). Please share availability and showroom viewing details.`
  );

  return (
    <div className="bg-[#F6F2EA] text-[#1C1A17]">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-6 pb-4">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#7D7569] overflow-x-auto no-scrollbar"
        >
          <Link href="/" className="hover:text-[#11100E] shrink-0">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link href="/collections" className="hover:text-[#11100E] shrink-0">
            Collections
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-[#11100E] truncate">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Grid */}
      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-2 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Gallery */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#181613] border border-[#E5DDD0]">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#11100E]/85 text-[#DFC89E] px-3 py-1 text-[10px] uppercase tracking-[0.22em]">
                  {product.badge}
                </span>
              )}
            </div>

            {product.gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.gallery.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-square overflow-hidden border transition-all cursor-pointer bg-[#181613] ${
                      activeImage === img
                        ? "border-[#11100E] ring-1 ring-[#C5A46D]"
                        : "border-[#DFD5C3] opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.26em] text-[#9E7F4B] font-medium">
                {product.categoryLabel} · {product.metal}
              </p>
              <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-light leading-[1.12] text-[#11100E]">
                {product.name}
              </h1>
              <p className="mt-2 text-sm text-[#6B645A] font-light">
                {product.subtitle}
              </p>

              <div className="mt-5 pt-5 border-t border-[#E2D9C9] flex items-baseline gap-3">
                <span className="font-serif text-3xl text-[#11100E]">
                  {formatINR(product.priceInr)}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#847B6F]">
                  Illustrative Demo Price
                </span>
              </div>
            </div>

            <p className="text-sm text-[#4D4740] font-light leading-relaxed">
              {product.description}
            </p>

            {/* Size & Quantity */}
            <div className="space-y-5 pt-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#6E675E] mb-2.5">
                  Size / Fit
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-12 px-4 py-2.5 text-xs border transition-colors cursor-pointer ${
                        selectedSize === sz
                          ? "bg-[#11100E] text-[#F6F2EA] border-[#11100E]"
                          : "bg-[#FBF9F5] text-[#1C1A17] border-[#DDD3C2] hover:border-[#9E7F4B]"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#6E675E]">
                  Quantity
                </span>
                <div className="inline-flex items-center border border-[#DDD3C2] bg-[#FBF9F5]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="h-10 w-10 inline-flex items-center justify-center hover:bg-[#EAE2D4] cursor-pointer"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="h-10 w-10 inline-flex items-center justify-center hover:bg-[#EAE2D4] cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product, selectedSize, quantity);
                    setCartOpen(true);
                  }}
                  className="flex-1 bg-[#11100E] text-[#F6F2EA] py-4 px-6 text-[11px] font-medium uppercase tracking-[0.22em] hover:bg-[#2A2621] transition-colors cursor-pointer"
                >
                  Add to Bag
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id, product.name)}
                  aria-label="Toggle wishlist"
                  className="h-13 w-13 inline-flex items-center justify-center border border-[#DDD3C2] bg-[#FBF9F5] hover:border-[#9E7F4B] transition-colors cursor-pointer"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isWishlisted
                        ? "fill-[#C5A46D] text-[#C5A46D]"
                        : "text-[#1C1A17]"
                    }`}
                  />
                </button>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 border border-[#C5A46D] bg-[#FBF9F5] text-[#11100E] py-3.5 px-6 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-[#C5A46D]/15 transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-[#9E7F4B]" />
                Enquire Directly on WhatsApp
              </a>

              <button
                type="button"
                onClick={() => setAppointmentOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#6E675E] hover:text-[#11100E] py-2 cursor-pointer"
              >
                <Calendar className="h-3.5 w-3.5 text-[#9E7F4B]" />
                Book Private Showroom Viewing
              </button>
            </div>

            {/* Demo Transparency Strip */}
            <div className="flex items-start gap-3 bg-[#EFE9DE] border border-[#E2D9C9] p-4 text-xs text-[#5E574E] font-light">
              <ShieldCheck className="h-4 w-4 text-[#9E7F4B] shrink-0 mt-0.5" />
              <p>
                Demonstration showcase entry. Final gold weight, diamond grade,
                and current pricing are confirmed in person at the SVJ salon.
              </p>
            </div>

            {/* Details Accordion */}
            <div className="border-y border-[#E2D9C9] divide-y divide-[#E2D9C9]">
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion(openAccordion === "specs" ? null : "specs")
                  }
                  className="w-full py-4 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] font-medium text-[#11100E] cursor-pointer"
                >
                  <span>Specifications</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openAccordion === "specs" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "specs" && (
                  <dl className="pb-4 grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs font-light">
                    <dt className="text-[#847B6F]">Metal Purity</dt>
                    <dd className="text-[#1C1A17]">{product.details.purity}</dd>
                    {product.details.gemstone && (
                      <>
                        <dt className="text-[#847B6F]">Gemstones</dt>
                        <dd className="text-[#1C1A17]">
                          {product.details.gemstone}
                        </dd>
                      </>
                    )}
                    <dt className="text-[#847B6F]">Surface Finish</dt>
                    <dd className="text-[#1C1A17]">{product.details.finish}</dd>
                    <dt className="text-[#847B6F]">Estimated Weight</dt>
                    <dd className="text-[#1C1A17]">
                      {product.details.weightEstimate}
                    </dd>
                  </dl>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion(openAccordion === "care" ? null : "care")
                  }
                  className="w-full py-4 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] font-medium text-[#11100E] cursor-pointer"
                >
                  <span>Care &amp; Preservation</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openAccordion === "care" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "care" && (
                  <p className="pb-4 text-xs text-[#5E574E] font-light leading-relaxed">
                    Keep each piece in its individual velvet-lined box. Apply
                    fragrance and cosmetics before wearing fine gold or diamond
                    jewellery, and schedule periodic professional cleaning.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pieces */}
      <section className="border-t border-[#E2D9C9] py-16 sm:py-20 bg-[#EFE9DE]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-9">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#9E7F4B] mb-2">
              Curated Companions
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#11100E]">
              You May Also Admire
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
