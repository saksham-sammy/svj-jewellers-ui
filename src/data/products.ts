import type { CollectionSlug } from "./collections";

export type MetalType =
  | "22K Yellow Gold"
  | "18K Champagne Gold"
  | "18K Rose Gold"
  | "18K White Gold";

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: CollectionSlug;
  categoryLabel: string;
  metal: MetalType;
  priceInr: number;
  image: string;
  secondaryImage: string;
  gallery: string[];
  badge?: "Signature" | "New Arrival" | "Bridal Atelier" | "Limited";
  description: string;
  details: {
    purity: string;
    gemstone?: string;
    finish: string;
    weightEstimate: string;
  };
  sizes: string[];
  featuredRank?: number;
}

/**
 * Curated demonstration product catalogue.
 * All prices and specifications are editable demonstration placeholders.
 */
export const PRODUCTS: Product[] = [
  {
    id: "svj-001",
    slug: "aaranya-floral-ruby-kada",
    name: "Aaranya Filigree Ruby Kada",
    subtitle: "Openwork botanical gold bangle with crimson accents",
    category: "gold-jewellery",
    categoryLabel: "Gold Jewellery",
    metal: "22K Yellow Gold",
    priceInr: 248000,
    image: "/images/col-gold-kada.jpg",
    secondaryImage: "/images/col-tennis-bangle.jpg",
    gallery: [
      "/images/col-gold-kada.jpg",
      "/images/craftsmanship-atelier.jpg",
      "/images/col-tennis-bangle.jpg",
    ],
    badge: "Signature",
    description:
      "Hand-carved botanical filigree crafted in warm 22K yellow gold and punctuated by marquise crimson accents. Engineered with a concealed hinge clasp for effortless wear from ceremonial evenings to intimate celebrations.",
    details: {
      purity: "22K Yellow Gold (Demo Spec)",
      gemstone: "Natural Ruby Accents (Demo Spec)",
      finish: "Satin Matte & High-Polish Edges",
      weightEstimate: "Approx. 28.4g (Illustrative)",
    },
    sizes: ["2-4", "2-6", "2-8"],
    featuredRank: 1,
  },
  {
    id: "svj-002",
    slug: "celeste-halo-solitaire-ring",
    name: "Celeste Halo Solitaire Ring",
    subtitle: "Two-tone cathedral band with pavé halo brilliance",
    category: "rings",
    categoryLabel: "Rings",
    metal: "18K Rose Gold",
    priceInr: 186000,
    image: "/images/col-halo-ring.jpg",
    secondaryImage: "/images/editorial-campaign.jpg",
    gallery: [
      "/images/col-halo-ring.jpg",
      "/images/editorial-campaign.jpg",
      "/images/col-diamond-suite.jpg",
    ],
    badge: "Signature",
    description:
      "A radiant round brilliant centre stone embraced by a warm rose-gold micro-pavé halo and split white-gold shoulders. Designed to capture light from every angle while resting gracefully on the hand.",
    details: {
      purity: "18K Rose & White Gold (Demo Spec)",
      gemstone: "Brilliant-Cut Natural Diamonds (Demo Spec)",
      finish: "Mirror Polish with Milgrain Beading",
      weightEstimate: "Approx. 5.8g (Illustrative)",
    },
    sizes: ["10", "12", "14", "16"],
    featuredRank: 2,
  },
  {
    id: "svj-003",
    slug: "noor-baguette-diamond-hoops",
    name: "Noor Baguette Diamond Hoops",
    subtitle: "Architectural channel-set huggie earrings",
    category: "earrings",
    categoryLabel: "Earrings",
    metal: "18K Champagne Gold",
    priceInr: 112000,
    image: "/images/col-gold-hoops.jpg",
    secondaryImage: "/images/col-diamond-pendant-set.jpg",
    gallery: [
      "/images/col-gold-hoops.jpg",
      "/images/col-diamond-pendant-set.jpg",
    ],
    badge: "New Arrival",
    description:
      "Refined everyday luxury featuring twin rows of step-cut baguette diamonds framed by delicate round pavé borders in 18K champagne gold. Balanced for feather-light all-day comfort.",
    details: {
      purity: "18K Champagne Gold (Demo Spec)",
      gemstone: "Baguette & Round Diamonds (Demo Spec)",
      finish: "High-Lustre Polish",
      weightEstimate: "Approx. 6.2g pair (Illustrative)",
    },
    sizes: ["One Size"],
    featuredRank: 3,
  },
  {
    id: "svj-004",
    slug: "mehr-pave-medallion-suite",
    name: "Mehr Pavé Medallion Pendant Set",
    subtitle: "Concentric diamond oval pendant with matching studs",
    category: "necklaces",
    categoryLabel: "Necklaces",
    metal: "18K Rose Gold",
    priceInr: 215000,
    image: "/images/col-diamond-pendant-set.jpg",
    secondaryImage: "/images/col-diamond-suite.jpg",
    gallery: [
      "/images/col-diamond-pendant-set.jpg",
      "/images/col-diamond-suite.jpg",
      "/images/hero-editorial.jpg",
    ],
    badge: "New Arrival",
    description:
      "Inspired by architectural arches, the Mehr suite pairs a layered concentric diamond pendant with harmonised ear studs. Suspended on a delicate 18K gold cable chain for understated evening glamour.",
    details: {
      purity: "18K Rose Gold (Demo Spec)",
      gemstone: "Multi-Row Micro-Pavé Diamonds (Demo Spec)",
      finish: "Warm Rose High Polish",
      weightEstimate: "Approx. 14.5g set (Illustrative)",
    },
    sizes: ["16 in", "18 in"],
    featuredRank: 4,
  },
  {
    id: "svj-005",
    slug: "rajwada-bridal-heritage-ensemble",
    name: "Rajwada Bridal Heritage Ensemble",
    subtitle: "Ceremonial gold choker, jhumkas, maang tikka & kadas",
    category: "bridal-collection",
    categoryLabel: "Bridal Collection",
    metal: "22K Yellow Gold",
    priceInr: 685000,
    image: "/images/col-bridal-thali.jpg",
    secondaryImage: "/images/hero-editorial.jpg",
    gallery: [
      "/images/col-bridal-thali.jpg",
      "/images/hero-editorial.jpg",
      "/images/craftsmanship-atelier.jpg",
    ],
    badge: "Bridal Atelier",
    description:
      "A complete bridal heirloom curated for sacred celebrations. Intricate nakshi craftsmanship meets soft rose-quartz bead drops across a statement choker, chandelier earrings, maang tikka, and sculpted bridal kadas.",
    details: {
      purity: "22K Yellow Gold (Demo Spec)",
      gemstone: "Hand-Strung Gemstone Drops (Demo Spec)",
      finish: "Antique Heirloom Gold",
      weightEstimate: "Approx. 82.0g complete set (Illustrative)",
    },
    sizes: ["Custom Fitted"],
    featuredRank: 5,
  },
  {
    id: "svj-006",
    slug: "seraphina-diamond-wrap-cuff",
    name: "Seraphina Diamond Wrap Cuff",
    subtitle: "Fluid sculpted diamond pavé hinged bracelet",
    category: "bangles",
    categoryLabel: "Bangles",
    metal: "18K Champagne Gold",
    priceInr: 194000,
    image: "/images/col-serpenti-cuff.jpg",
    secondaryImage: "/images/editorial-campaign.jpg",
    gallery: [
      "/images/col-serpenti-cuff.jpg",
      "/images/editorial-campaign.jpg",
    ],
    badge: "Limited",
    description:
      "A sinuous double-coil cuff sculpted to hug the wrist in polished 18K champagne gold traced with luminous pave diamonds. Designed as a singular statement or layered with slender bangles.",
    details: {
      purity: "18K Champagne Gold (Demo Spec)",
      gemstone: "Pavé-Set Natural Diamonds (Demo Spec)",
      finish: "Mirror Gold Polish",
      weightEstimate: "Approx. 18.2g (Illustrative)",
    },
    sizes: ["Small", "Medium", "Large"],
    featuredRank: 6,
  },
  {
    id: "svj-007",
    slug: "lumiere-solitaire-duo",
    name: "Lumière Solitaire Suite",
    subtitle: "Matched four-prong solitaire pendant and ring",
    category: "diamond-jewellery",
    categoryLabel: "Diamond Jewellery",
    metal: "18K White Gold",
    priceInr: 325000,
    image: "/images/col-diamond-suite.jpg",
    secondaryImage: "/images/col-halo-ring.jpg",
    gallery: [
      "/images/col-diamond-suite.jpg",
      "/images/col-halo-ring.jpg",
      "/images/editorial-campaign.jpg",
    ],
    badge: "Signature",
    description:
      "Pure geometric clarity. Twin architectural four-prong settings elevate finely proportioned solitaires in cool 18K white gold—crafted for milestone anniversaries and enduring minimalist elegance.",
    details: {
      purity: "18K White Gold (Demo Spec)",
      gemstone: "Matched Solitaire Diamonds (Demo Spec)",
      finish: "Rhodium High Polish",
      weightEstimate: "Approx. 9.4g suite (Illustrative)",
    },
    sizes: ["12 / 16 in", "14 / 18 in", "Custom"],
    featuredRank: 7,
  },
  {
    id: "svj-008",
    slug: "vikram-medallion-gold-bracelet",
    name: "Vikram Sovereign Gold Bracelet",
    subtitle: "Double-woven mesh bracelet with sculpted crest",
    category: "mens-jewellery",
    categoryLabel: "Men's Jewellery",
    metal: "22K Yellow Gold",
    priceInr: 232000,
    image: "/images/col-mens-gold.jpg",
    secondaryImage: "/images/col-couple-rings.jpg",
    gallery: [
      "/images/col-mens-gold.jpg",
      "/images/col-couple-rings.jpg",
    ],
    badge: "New Arrival",
    description:
      "Tailored masculinity rendered in solid 22K gold. Features dual woven link strands anchored by a Greek-key framed medallion motif and a precision-engineered box clasp.",
    details: {
      purity: "22K Yellow Gold (Demo Spec)",
      finish: "Brushed & Hand-Burnished Gold",
      weightEstimate: "Approx. 26.8g (Illustrative)",
    },
    sizes: ["7.5 in", "8.0 in", "8.5 in"],
    featuredRank: 8,
  },
  {
    id: "svj-009",
    slug: "eternite-diamond-line-bangle",
    name: "Éternité Diamond Line Bangle",
    subtitle: "Slender continuous diamond channel bangle",
    category: "bangles",
    categoryLabel: "Bangles",
    metal: "18K Champagne Gold",
    priceInr: 158000,
    image: "/images/col-tennis-bangle.jpg",
    secondaryImage: "/images/col-gold-kada.jpg",
    gallery: [
      "/images/col-tennis-bangle.jpg",
      "/images/col-gold-kada.jpg",
    ],
    description:
      "An effortless daily staple lined with an uninterrupted ribbon of individually set diamonds in warm champagne gold. Refined enough to wear solo, tailored to stack.",
    details: {
      purity: "18K Champagne Gold (Demo Spec)",
      gemstone: "Round Brilliant Diamonds (Demo Spec)",
      finish: "Sleek Mirror Polish",
      weightEstimate: "Approx. 12.6g (Illustrative)",
    },
    sizes: ["2-4", "2-6", "2-8"],
  },
  {
    id: "svj-010",
    slug: "sovereign-signet-couple-pair",
    name: "Sovereign Signet & Beaded Band",
    subtitle: "Brushed diamond signet paired with beaded gold solitaire",
    category: "mens-jewellery",
    categoryLabel: "Men's Jewellery",
    metal: "18K White Gold",
    priceInr: 174000,
    image: "/images/col-couple-rings.jpg",
    secondaryImage: "/images/col-mens-gold.jpg",
    gallery: [
      "/images/col-couple-rings.jpg",
      "/images/col-mens-gold.jpg",
    ],
    description:
      "Contemporary commitment rings uniting a sculpted architectural white-gold signet band with a delicate beaded yellow-gold princess-cut solitaire.",
    details: {
      purity: "18K White & Yellow Gold (Demo Spec)",
      gemstone: "Flush & Prong-Set Diamonds (Demo Spec)",
      finish: "Satin Brushed & High Polish",
      weightEstimate: "Approx. 11.2g pair (Illustrative)",
    },
    sizes: ["Custom Sizing"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
