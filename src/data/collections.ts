export type CollectionSlug =
  | "gold-jewellery"
  | "diamond-jewellery"
  | "bridal-collection"
  | "earrings"
  | "necklaces"
  | "rings"
  | "bangles"
  | "mens-jewellery";

export interface JewelleryCollection {
  slug: CollectionSlug;
  title: string;
  subtitle: string;
  image: string;
  accentTone: "dark" | "ivory";
  featured?: boolean;
}

export const COLLECTIONS: JewelleryCollection[] = [
  {
    slug: "gold-jewellery",
    title: "Gold Jewellery",
    subtitle: "Handcrafted 22K heirlooms & contemporary silhouettes",
    image: "/images/col-gold-kada.jpg",
    accentTone: "dark",
    featured: true,
  },
  {
    slug: "diamond-jewellery",
    title: "Diamond Jewellery",
    subtitle: "Precision-cut brilliance set in 18K gold",
    image: "/images/col-diamond-suite.jpg",
    accentTone: "dark",
    featured: true,
  },
  {
    slug: "bridal-collection",
    title: "Bridal Collection",
    subtitle: "Ceremonial ensembles designed for generations",
    image: "/images/col-bridal-thali.jpg",
    accentTone: "dark",
    featured: true,
  },
  {
    slug: "earrings",
    title: "Earrings",
    subtitle: "Sculptural hoops, drops & festive chandbalis",
    image: "/images/col-gold-hoops.jpg",
    accentTone: "ivory",
  },
  {
    slug: "necklaces",
    title: "Necklaces",
    subtitle: "Statement chokers, pendants & layered chains",
    image: "/images/col-diamond-pendant-set.jpg",
    accentTone: "dark",
  },
  {
    slug: "rings",
    title: "Rings",
    subtitle: "Solitaires, halo settings & timeless bands",
    image: "/images/col-halo-ring.jpg",
    accentTone: "dark",
  },
  {
    slug: "bangles",
    title: "Bangles",
    subtitle: "Artisanal kadas, diamond cuffs & eternity bands",
    image: "/images/col-serpenti-cuff.jpg",
    accentTone: "ivory",
  },
  {
    slug: "mens-jewellery",
    title: "Men's Jewellery",
    subtitle: "Refined gold bracelets, chains & signet rings",
    image: "/images/col-mens-gold.jpg",
    accentTone: "dark",
  },
];
