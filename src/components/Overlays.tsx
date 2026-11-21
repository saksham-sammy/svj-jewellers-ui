"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  Heart,
  Search,
  ShoppingBag,
  MessageCircle,
  Calendar,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { useShopStore } from "@/store/useShopStore";
import { PRODUCTS } from "@/data/products";
import { COLLECTIONS } from "@/data/collections";
import {
  SITE_CONFIG,
  buildWhatsAppEnquiryUrl,
  formatINR,
} from "@/config/site";

export function Overlays() {
  const {
    cart,
    wishlist,
    cartOpen,
    wishlistOpen,
    searchOpen,
    appointmentOpen,
    quickViewProduct,
    toastMessage,
    setCartOpen,
    setWishlistOpen,
    setSearchOpen,
    setAppointmentOpen,
    setQuickViewProduct,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    clearToast,
  } = useShopStore();

  // Quick View local overrides keyed by product ID
  const [sizeOverrides, setSizeOverrides] = useState<Record<string, string>>({});
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>({});
  const [qvAccordion, setQvAccordion] = useState<"details" | "care" | null>(
    "details"
  );

  const selectedSize = quickViewProduct
    ? (sizeOverrides[quickViewProduct.id] ?? quickViewProduct.sizes[0] ?? "Standard")
    : "";
  const selectedImage = quickViewProduct
    ? (imageOverrides[quickViewProduct.id] ?? quickViewProduct.image)
    : "";

  const setSelectedSize = (sz: string) => {
    if (!quickViewProduct) return;
    setSizeOverrides((prev) => ({ ...prev, [quickViewProduct.id]: sz }));
  };
  const setSelectedImage = (img: string) => {
    if (!quickViewProduct) return;
    setImageOverrides((prev) => ({ ...prev, [quickViewProduct.id]: img }));
  };

  // Search local state
  const [searchQuery, setSearchQuery] = useState("");

  // Appointment local state
  const [apptName, setApptName] = useState("");
  const [apptPhone, setApptPhone] = useState("");
  const [apptInterest, setApptInterest] = useState("Bridal Consultation");
  const [apptDate, setApptDate] = useState("");
  const [apptSubmitted, setApptSubmitted] = useState(false);
  const [apptError, setApptError] = useState("");

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(clearToast, 3000);
    return () => clearTimeout(t);
  }, [toastMessage, clearToast]);

  // Escape key closes overlays
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCartOpen(false);
        setWishlistOpen(false);
        setSearchOpen(false);
        setAppointmentOpen(false);
        setQuickViewProduct(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    setCartOpen,
    setWishlistOpen,
    setSearchOpen,
    setAppointmentOpen,
    setQuickViewProduct,
  ]);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.priceInr * item.quantity,
    0
  );

  const wishlistedProducts = useMemo(
    () => PRODUCTS.filter((p) => wishlist.includes(p.id)),
    [wishlist]
  );

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return PRODUCTS.slice(0, 4);
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.metal.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleAppointmentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!apptName.trim() || apptPhone.trim().length < 7) {
      setApptError("Please enter your name and a valid phone number.");
      return;
    }
    setApptError("");
    setApptSubmitted(true);
  };

  const cartWhatsAppSummary = useMemo(() => {
    if (cart.length === 0) return "";
    const lines = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (${item.size}) × ${item.quantity} — ${formatINR(item.product.priceInr * item.quantity)}`
      )
      .join("\n");
    return `Hello SVJ – Suraj Verma Jewellers, I would like to enquire about the following pieces from my bag:\n\n${lines}\n\nIllustrative Total: ${formatINR(cartSubtotal)}`;
  }, [cart, cartSubtotal]);

  return (
    <>
      {/* 1. QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label={`Quick view ${quickViewProduct.name}`}
              className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#F6F2EA] text-[#1C1A17] border border-[#DFD5C3] shadow-2xl grid grid-cols-1 md:grid-cols-12"
            >
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                aria-label="Close quick view"
                className="absolute top-3 right-3 z-20 inline-flex h-10 w-10 items-center justify-center bg-[#F6F2EA]/90 text-[#11100E] hover:bg-[#11100E] hover:text-[#F6F2EA] transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Left Gallery */}
              <div className="md:col-span-6 bg-[#181613] flex flex-col">
                <div className="relative aspect-[4/4] sm:aspect-[4/5] w-full flex-1">
                  <Image
                    src={selectedImage || quickViewProduct.image}
                    alt={quickViewProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {quickViewProduct.gallery.length > 1 && (
                  <div className="flex gap-2 p-3 bg-[#11100E]">
                    {quickViewProduct.gallery.map((img) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setSelectedImage(img)}
                        className={`relative h-14 w-14 overflow-hidden border transition-colors cursor-pointer ${
                          selectedImage === img
                            ? "border-[#C5A46D]"
                            : "border-white/15 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img}
                          alt="Product angle"
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Details */}
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#9E7F4B]">
                    {quickViewProduct.categoryLabel} · {quickViewProduct.metal}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-light text-[#11100E] leading-snug">
                    {quickViewProduct.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="text-xl font-medium text-[#11100E]">
                      {formatINR(quickViewProduct.priceInr)}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#847B6F]">
                      Illustrative Demo Price
                    </span>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-[#575047] font-light leading-relaxed">
                    {quickViewProduct.description}
                  </p>

                  {/* Size Selector */}
                  <div className="mt-6">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#6E675E] mb-2.5">
                      Select Size / Fit
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3.5 py-2 text-xs border transition-colors cursor-pointer ${
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

                  {/* Specs Accordion */}
                  <div className="mt-6 border-y border-[#E2D9C9] divide-y divide-[#E2D9C9]">
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setQvAccordion(
                            qvAccordion === "details" ? null : "details"
                          )
                        }
                        className="w-full py-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#11100E] cursor-pointer"
                      >
                        <span>Material &amp; Specifications</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            qvAccordion === "details" ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {qvAccordion === "details" && (
                        <dl className="pb-3.5 grid grid-cols-2 gap-2 text-xs text-[#5E574E] font-light">
                          <dt className="text-[#8B8377]">Metal Purity</dt>
                          <dd>{quickViewProduct.details.purity}</dd>
                          {quickViewProduct.details.gemstone && (
                            <>
                              <dt className="text-[#8B8377]">Gemstones</dt>
                              <dd>{quickViewProduct.details.gemstone}</dd>
                            </>
                          )}
                          <dt className="text-[#8B8377]">Finish</dt>
                          <dd>{quickViewProduct.details.finish}</dd>
                          <dt className="text-[#8B8377]">Est. Weight</dt>
                          <dd>{quickViewProduct.details.weightEstimate}</dd>
                        </dl>
                      )}
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setQvAccordion(qvAccordion === "care" ? null : "care")
                        }
                        className="w-full py-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#11100E] cursor-pointer"
                      >
                        <span>Jewellery Care</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            qvAccordion === "care" ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {qvAccordion === "care" && (
                        <p className="pb-3.5 text-xs text-[#5E574E] font-light leading-relaxed">
                          Store individually in a soft-lined pouch away from
                          perfumes and moisture. Wipe gently with an untreated
                          chamois cloth after wear.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-6 space-y-2.5 pb-safe">
                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(quickViewProduct, selectedSize, 1);
                        setQuickViewProduct(null);
                        setCartOpen(true);
                      }}
                      className="flex-1 bg-[#11100E] text-[#F6F2EA] py-3.5 px-5 text-[11px] font-medium uppercase tracking-[0.22em] hover:bg-[#2A2621] transition-colors cursor-pointer"
                    >
                      Add to Bag
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        toggleWishlist(
                          quickViewProduct.id,
                          quickViewProduct.name
                        )
                      }
                      aria-label="Toggle wishlist"
                      className="inline-flex h-12 w-12 items-center justify-center border border-[#DDD3C2] hover:border-[#9E7F4B] transition-colors cursor-pointer"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          wishlist.includes(quickViewProduct.id)
                            ? "fill-[#C5A46D] text-[#C5A46D]"
                            : "text-[#1C1A17]"
                        }`}
                      />
                    </button>
                  </div>

                  <a
                    href={buildWhatsAppEnquiryUrl(
                      `Hello SVJ – Suraj Verma Jewellers, I would like to enquire about "${quickViewProduct.name}" (Size: ${selectedSize}, ${quickViewProduct.metal}).`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 border border-[#C5A46D] text-[#11100E] py-3 px-5 text-[11px] uppercase tracking-[0.2em] hover:bg-[#C5A46D]/15 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-[#9E7F4B]" />
                    Enquire on WhatsApp
                  </a>

                  <Link
                    href={`/product/${quickViewProduct.slug}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="block text-center pt-1 text-[11px] uppercase tracking-[0.2em] text-[#7A7266] hover:text-[#11100E] underline underline-offset-4"
                  >
                    View Full Product Page
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. SHOPPING BAG DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/65 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Shopping bag"
              className="fixed inset-y-0 right-0 w-full max-w-md bg-[#F6F2EA] text-[#1C1A17] flex flex-col shadow-2xl border-l border-[#DFD5C3]"
            >
              <div className="flex items-center justify-between px-6 h-18 border-b border-[#E2D9C9]">
                <div>
                  <h2 className="font-serif text-2xl font-light text-[#11100E]">
                    Shopping Bag
                  </h2>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8E7142]">
                    {cart.reduce((a, b) => a + b.quantity, 0)} Selected Pieces
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  aria-label="Close shopping bag"
                  className="inline-flex h-10 w-10 items-center justify-center text-[#5A544B] hover:text-[#11100E] cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <ShoppingBag className="h-10 w-10 text-[#C5A46D] stroke-[1.25] mb-4" />
                    <p className="font-serif text-2xl text-[#11100E]">
                      Your bag is currently empty
                    </p>
                    <p className="mt-2 text-xs text-[#6E675E] font-light max-w-xs">
                      Explore handcrafted 22K gold and diamond creations to add
                      them to your curated shortlist.
                    </p>
                    <Link
                      href="/collections"
                      onClick={() => setCartOpen(false)}
                      className="mt-6 bg-[#11100E] text-[#F6F2EA] px-7 py-3 text-[11px] uppercase tracking-[0.22em]"
                    >
                      Explore Collections
                    </Link>
                  </div>
                ) : (
                  <ul className="divide-y divide-[#E2D9C9]">
                    {cart.map((item) => (
                      <li
                        key={`${item.product.id}-${item.size}`}
                        className="py-4 first:pt-0 flex gap-4"
                      >
                        <div className="relative h-24 w-20 shrink-0 bg-[#181613] overflow-hidden">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-serif text-lg leading-snug text-[#11100E] truncate">
                              {item.product.name}
                            </h3>
                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(item.product.id, item.size)
                              }
                              aria-label={`Remove ${item.product.name}`}
                              className="text-[#8E8679] hover:text-[#11100E] p-1 cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] text-[#7A7266] font-light">
                            {item.product.metal} · Size {item.size}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center border border-[#DDD3C2] bg-[#FBF9F5]">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.size, -1)
                                }
                                aria-label="Decrease quantity"
                                className="h-8 w-8 inline-flex items-center justify-center hover:bg-[#EAE2D4] cursor-pointer"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-xs">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.size, 1)
                                }
                                aria-label="Increase quantity"
                                className="h-8 w-8 inline-flex items-center justify-center hover:bg-[#EAE2D4] cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-sm font-medium text-[#11100E]">
                              {formatINR(item.product.priceInr * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-[#E2D9C9] bg-[#FBF9F5] px-6 py-5 pb-safe space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-[0.22em] text-[#6E675E]">
                      Estimated Total
                    </span>
                    <span className="font-serif text-2xl text-[#11100E]">
                      {formatINR(cartSubtotal)}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7C7468] bg-[#F2ECE0] border border-[#E2D9C9] px-3 py-2 leading-relaxed">
                    <strong>Demo Mode:</strong> Online payment processing is
                    disabled for this showcase. Enquire directly via WhatsApp or
                    book a private viewing.
                  </p>
                  <div className="space-y-2.5">
                    <a
                      href={buildWhatsAppEnquiryUrl(cartWhatsAppSummary)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#11100E] text-[#F6F2EA] py-3.5 px-5 text-[11px] font-medium uppercase tracking-[0.22em] hover:bg-[#2B2722] transition-colors"
                    >
                      <MessageCircle className="h-4 w-4 text-[#C5A46D]" />
                      Enquire Bag on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setCartOpen(false);
                        setAppointmentOpen(true);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 border border-[#11100E]/25 text-[#11100E] py-3 px-5 text-[11px] uppercase tracking-[0.22em] hover:border-[#9E7F4B] transition-colors cursor-pointer"
                    >
                      Reserve for Private Viewing
                    </button>
                  </div>
                </div>
              )}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* 3. WISHLIST DRAWER */}
      <AnimatePresence>
        {wishlistOpen && (
          <div className="fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWishlistOpen(false)}
              className="fixed inset-0 bg-black/65 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Wishlist"
              className="fixed inset-y-0 right-0 w-full max-w-md bg-[#F6F2EA] text-[#1C1A17] flex flex-col shadow-2xl border-l border-[#DFD5C3]"
            >
              <div className="flex items-center justify-between px-6 h-18 border-b border-[#E2D9C9]">
                <div>
                  <h2 className="font-serif text-2xl font-light text-[#11100E]">
                    Saved Wishlist
                  </h2>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8E7142]">
                    {wishlistedProducts.length} Saved Creations
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setWishlistOpen(false)}
                  aria-label="Close wishlist"
                  className="inline-flex h-10 w-10 items-center justify-center text-[#5A544B] hover:text-[#11100E] cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 pb-safe">
                {wishlistedProducts.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <Heart className="h-10 w-10 text-[#C5A46D] stroke-[1.25] mb-4" />
                    <p className="font-serif text-2xl text-[#11100E]">
                      No saved pieces yet
                    </p>
                    <p className="mt-2 text-xs text-[#6E675E] font-light max-w-xs">
                      Tap the heart icon on any piece to curate your personal
                      SVJ wishlist.
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-[#E2D9C9]">
                    {wishlistedProducts.map((product) => (
                      <li
                        key={product.id}
                        className="py-4 first:pt-0 flex gap-4"
                      >
                        <div className="relative h-24 w-20 shrink-0 bg-[#181613] overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h3 className="font-serif text-lg text-[#11100E] truncate">
                              {product.name}
                            </h3>
                            <p className="text-xs text-[#7A7266] mt-0.5">
                              {formatINR(product.priceInr)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <button
                              type="button"
                              onClick={() => {
                                addToCart(product);
                                setWishlistOpen(false);
                                setCartOpen(true);
                              }}
                              className="flex-1 bg-[#11100E] text-[#F6F2EA] py-2 px-3 text-[10px] uppercase tracking-[0.2em] cursor-pointer"
                            >
                              Move to Bag
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                toggleWishlist(product.id, product.name)
                              }
                              aria-label="Remove from wishlist"
                              className="h-8 w-8 inline-flex items-center justify-center border border-[#DDD3C2] text-[#6E675E] hover:text-[#11100E] cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* 4. SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.28 }}
              role="dialog"
              aria-modal="true"
              aria-label="Search SVJ jewellery"
              className="relative z-10 bg-[#11100E] text-[#F6F2EA] border-b border-[#C5A46D]/25 px-5 sm:px-8 py-6 sm:py-9 shadow-2xl max-h-[88vh] overflow-y-auto"
            >
              <div className="mx-auto max-w-4xl">
                <div className="flex items-center gap-3 border-b border-[#C5A46D]/40 pb-3">
                  <Search className="h-5 w-5 text-[#C5A46D] shrink-0" />
                  <input
                    type="search"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search gold kadas, solitaire rings, bridal sets, diamonds..."
                    className="flex-1 bg-transparent text-base sm:text-lg text-[#F6F2EA] placeholder:text-[#7E766B] focus:outline-none font-light"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    aria-label="Close search"
                    className="inline-flex h-10 w-10 items-center justify-center text-[#A8A092] hover:text-[#F6F2EA] cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Quick Category Pills */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {COLLECTIONS.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/collections?category=${c.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="text-[10px] uppercase tracking-[0.2em] border border-white/15 px-3 py-1.5 text-[#CFC7BA] hover:border-[#C5A46D] hover:text-[#DFC89E] transition-colors"
                    >
                      {c.title}
                    </Link>
                  ))}
                </div>

                {/* Live Results */}
                <div className="mt-7">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#C5A46D] mb-4">
                    {searchQuery.trim()
                      ? `Matching Creations (${searchResults.length})`
                      : "Curated Suggestions"}
                  </p>
                  {searchResults.length === 0 ? (
                    <p className="text-sm text-[#9A9184] py-4">
                      No matching pieces found for &ldquo;{searchQuery}&rdquo;.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {searchResults.slice(0, 6).map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setSearchOpen(false);
                            setQuickViewProduct(p);
                          }}
                          className="flex items-center gap-4 p-2.5 bg-[#191714] border border-white/10 hover:border-[#C5A46D]/60 text-left transition-colors cursor-pointer"
                        >
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-[#11100E]">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-serif text-lg text-[#F6F2EA] truncate">
                              {p.name}
                            </p>
                            <p className="text-[11px] text-[#A8A092]">
                              {p.metal} · {formatINR(p.priceInr)}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. PRIVATE APPOINTMENT MODAL */}
      <AnimatePresence>
        {appointmentOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAppointmentOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              role="dialog"
              aria-modal="true"
              aria-label="Book a private viewing"
              className="relative z-10 w-full max-w-lg bg-[#141311] text-[#F6F2EA] border border-[#C5A46D]/30 p-6 sm:p-8 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => {
                  setAppointmentOpen(false);
                  setApptSubmitted(false);
                }}
                aria-label="Close appointment dialog"
                className="absolute top-4 right-4 h-10 w-10 inline-flex items-center justify-center text-[#A8A092] hover:text-[#F6F2EA] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-[#C5A46D]">
                <Calendar className="h-3.5 w-3.5" />
                Private Salon Concierge
              </span>
              <h3 className="mt-2 font-serif text-3xl font-light text-[#F6F2EA]">
                Book a Private Viewing
              </h3>
              <p className="mt-2 text-xs text-[#AEA699] font-light leading-relaxed">
                Reserve an unhurried one-on-one session with our jewellery
                specialists for bridal styling, solitaires, or bespoke orders.
              </p>

              {apptSubmitted ? (
                <div className="mt-6 border border-[#C5A46D]/40 bg-[#1B1915] p-6 text-center space-y-3">
                  <CheckCircle2 className="h-8 w-8 text-[#C5A46D] mx-auto" />
                  <p className="font-serif text-2xl text-[#F6F2EA]">
                    Enquiry Captured (Demo)
                  </p>
                  <p className="text-xs text-[#BDB5A8] leading-relaxed">
                    Thank you, {apptName}. In production, this form notifies the
                    SVJ concierge team immediately. You may also confirm via
                    WhatsApp below.
                  </p>
                  <a
                    href={buildWhatsAppEnquiryUrl(
                      `Hello SVJ – Suraj Verma Jewellers, I would like to book a private viewing.\nName: ${apptName}\nPhone: ${apptPhone}\nOccasion: ${apptInterest}${apptDate ? `\nPreferred Date: ${apptDate}` : ""}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#C5A46D] text-[#11100E] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] mt-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Send via WhatsApp
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={handleAppointmentSubmit}
                  className="mt-6 space-y-4 pb-safe"
                  noValidate
                >
                  <div>
                    <label
                      htmlFor="appt-name"
                      className="block text-[10px] uppercase tracking-[0.22em] text-[#C5A46D] mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="appt-name"
                      type="text"
                      value={apptName}
                      onChange={(e) => setApptName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-[#1C1A17] border border-white/15 px-3.5 py-3 text-sm text-[#F6F2EA] placeholder:text-[#736C62] focus:outline-none focus:border-[#C5A46D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="appt-phone"
                        className="block text-[10px] uppercase tracking-[0.22em] text-[#C5A46D] mb-1.5"
                      >
                        Phone / WhatsApp
                      </label>
                      <input
                        id="appt-phone"
                        type="tel"
                        value={apptPhone}
                        onChange={(e) => setApptPhone(e.target.value)}
                        placeholder="+91 98XXX XXXXX"
                        className="w-full bg-[#1C1A17] border border-white/15 px-3.5 py-3 text-sm text-[#F6F2EA] placeholder:text-[#736C62] focus:outline-none focus:border-[#C5A46D]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="appt-date"
                        className="block text-[10px] uppercase tracking-[0.22em] text-[#C5A46D] mb-1.5"
                      >
                        Preferred Date
                      </label>
                      <input
                        id="appt-date"
                        type="date"
                        value={apptDate}
                        onChange={(e) => setApptDate(e.target.value)}
                        className="w-full bg-[#1C1A17] border border-white/15 px-3.5 py-3 text-sm text-[#F6F2EA] focus:outline-none focus:border-[#C5A46D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="appt-interest"
                      className="block text-[10px] uppercase tracking-[0.22em] text-[#C5A46D] mb-1.5"
                    >
                      Collection of Interest
                    </label>
                    <select
                      id="appt-interest"
                      value={apptInterest}
                      onChange={(e) => setApptInterest(e.target.value)}
                      className="w-full bg-[#1C1A17] border border-white/15 px-3.5 py-3 text-sm text-[#F6F2EA] focus:outline-none focus:border-[#C5A46D]"
                    >
                      <option>Bridal Consultation</option>
                      <option>Diamond Solitaires &amp; Rings</option>
                      <option>22K Heritage Gold Jewellery</option>
                      <option>Bespoke / Custom Design</option>
                      <option>Men&apos;s Jewellery</option>
                    </select>
                  </div>

                  {apptError && (
                    <p role="alert" className="text-xs text-[#E5A49B]">
                      {apptError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#C5A46D] text-[#11100E] py-3.5 px-6 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-[#D7BA86] transition-colors cursor-pointer"
                  >
                    Request Private Appointment
                  </button>

                  <p className="text-[10px] text-[#8E8679] text-center">
                    {SITE_CONFIG.contact.hours}
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. TOAST FEEDBACK */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#11100E] text-[#F6F2EA] border border-[#C5A46D]/45 px-5 py-3 text-xs tracking-wide shadow-2xl flex items-center gap-2.5 max-w-[92vw]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#C5A46D] shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
