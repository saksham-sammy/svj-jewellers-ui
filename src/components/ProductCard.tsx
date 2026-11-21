"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingBag, MessageCircle } from "lucide-react";
import type { Product } from "@/data/products";
import { formatINR, buildWhatsAppEnquiryUrl } from "@/config/site";
import { useShopStore } from "@/store/useShopStore";
import { useMounted } from "@/hooks/useMounted";

interface ProductCardProps {
  product: Product;
  variant?: "standard" | "spotlight";
}

export function ProductCard({
  product,
  variant = "standard",
}: ProductCardProps) {
  const mounted = useMounted();
  const wishlist = useShopStore((s) => s.wishlist);
  const toggleWishlist = useShopStore((s) => s.toggleWishlist);
  const addToCart = useShopStore((s) => s.addToCart);
  const setQuickViewProduct = useShopStore((s) => s.setQuickViewProduct);

  const isWishlisted = mounted && wishlist.includes(product.id);
  const whatsappUrl = buildWhatsAppEnquiryUrl(
    `Hello SVJ – Suraj Verma Jewellers, I would like to enquire about "${product.name}" (${product.metal}, Demo Ref: ${formatINR(product.priceInr)}).`
  );

  const isSpotlight = variant === "spotlight";

  return (
    <article
      className={`group flex flex-col bg-[#FBF9F5] border border-[#E5DDD0] hover:border-[#C5A46D]/80 transition-colors duration-300 ${
        isSpotlight ? "md:flex-row md:items-stretch" : ""
      }`}
    >
      {/* Image Container */}
      <div
        className={`relative overflow-hidden bg-[#181613] ${
          isSpotlight
            ? "aspect-[4/4] sm:aspect-[16/10] md:aspect-auto md:w-[56%] shrink-0"
            : "aspect-[4/5] w-full"
        }`}
      >
        <Link
          href={`/product/${product.slug}`}
          className="block relative h-full w-full"
          aria-label={`View ${product.name}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={
              isSpotlight
                ? "(max-width: 768px) 100vw, 55vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            }
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
          />
          <Image
            src={product.secondaryImage}
            alt={`${product.name} alternate view`}
            fill
            sizes={
              isSpotlight
                ? "(max-width: 768px) 100vw, 55vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            }
            className="object-cover opacity-0 scale-105 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100"
          />
        </Link>

        {/* Top Left Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-[#11100E]/82 backdrop-blur-xs text-[#DFC89E] px-2.5 py-1 text-[9px] uppercase tracking-[0.22em]">
            {product.badge}
          </span>
        )}

        {/* Top Right Wishlist Toggle */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id, product.name)}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          className={`absolute top-2.5 right-2.5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-xs transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? "bg-[#11100E] text-[#C5A46D]"
              : "bg-[#F6F2EA]/85 text-[#1C1A17] hover:bg-[#11100E] hover:text-[#F6F2EA]"
          }`}
        >
          <Heart
            className={`h-4 w-4 stroke-[1.6] ${isWishlisted ? "fill-[#C5A46D]" : ""}`}
          />
        </button>

        {/* Desktop Hover Quick Bar */}
        <div className="hidden sm:flex absolute inset-x-3 bottom-3 z-10 gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            type="button"
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#11100E]/92 text-[#F6F2EA] py-2.5 px-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[#C5A46D] hover:text-[#11100E] transition-colors cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </button>
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="inline-flex items-center justify-center gap-1.5 bg-[#F6F2EA]/95 text-[#11100E] py-2.5 px-3.5 text-[10px] uppercase tracking-[0.2em] hover:bg-[#11100E] hover:text-[#F6F2EA] transition-colors cursor-pointer"
            aria-label={`Add ${product.name} to bag`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Product Metadata */}
      <div
        className={`flex flex-col justify-between p-4 sm:p-5 flex-1 ${
          isSpotlight ? "md:p-8 lg:p-10" : ""
        }`}
      >
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#9E7F4B]">
              {product.categoryLabel}
            </span>
            <span className="text-[10px] text-[#837B6F] font-light">
              {product.metal}
            </span>
          </div>

          <Link href={`/product/${product.slug}`} className="block mt-1.5">
            <h3
              className={`font-serif font-normal text-[#11100E] group-hover:text-[#9E7F4B] transition-colors leading-snug ${
                isSpotlight ? "text-2xl sm:text-3xl" : "text-xl"
              }`}
            >
              {product.name}
            </h3>
          </Link>

          <p
            className={`mt-1.5 text-xs text-[#6B645A] font-light leading-relaxed ${
              isSpotlight ? "sm:text-sm mt-3 line-clamp-3" : "line-clamp-1"
            }`}
          >
            {isSpotlight ? product.description : product.subtitle}
          </p>
        </div>

        <div className="mt-4 pt-3.5 border-t border-[#EAE2D4]">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <p
                className={`font-medium tracking-wide text-[#11100E] ${
                  isSpotlight ? "text-lg" : "text-sm sm:text-[15px]"
                }`}
              >
                {formatINR(product.priceInr)}
              </p>
              <p className="text-[10px] text-[#8C8477] font-light">
                Indicative price · Confirm in store
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Enquire about ${product.name} on WhatsApp`}
                title="Enquire via WhatsApp"
                className="inline-flex h-9 w-9 items-center justify-center border border-[#DFD5C3] text-[#4C463F] hover:border-[#C5A46D] hover:text-[#9E7F4B] transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setQuickViewProduct(product)}
                className="sm:hidden inline-flex h-9 px-3 items-center justify-center border border-[#11100E]/20 text-[10px] uppercase tracking-[0.18em] text-[#11100E] cursor-pointer"
              >
                Quick View
              </button>
              <Link
                href={`/product/${product.slug}`}
                className="hidden sm:inline-flex h-9 px-3 items-center justify-center border border-[#DFD5C3] text-[10px] uppercase tracking-[0.18em] text-[#11100E] hover:bg-[#11100E] hover:text-[#F6F2EA] hover:border-[#11100E] transition-colors"
              >
                Details
              </Link>
            </div>
          </div>

          {isSpotlight && (
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="flex-1 bg-[#11100E] text-[#F6F2EA] py-3 px-5 text-[11px] uppercase tracking-[0.22em] hover:bg-[#2B2722] transition-colors cursor-pointer"
              >
                Add to Bag
              </button>
              <button
                type="button"
                onClick={() => setQuickViewProduct(product)}
                className="border border-[#11100E]/25 text-[#11100E] py-3 px-5 text-[11px] uppercase tracking-[0.22em] hover:border-[#9E7F4B] hover:text-[#9E7F4B] transition-colors cursor-pointer"
              >
                Quick View
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
