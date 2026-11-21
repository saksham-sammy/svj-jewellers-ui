export interface CraftStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
}

export const CRAFTSMANSHIP_STEPS: CraftStep[] = [
  {
    number: "01",
    title: "Design",
    subtitle: "Hand-Rendered Concept",
    description:
      "Every SVJ creation begins as an original silhouette sketched by hand—balancing heritage Indian proportion with modern wearability and graceful drape.",
    detail: "Bespoke sketches & proportion studies",
  },
  {
    number: "02",
    title: "Detailing",
    subtitle: "Stone & Metal Curation",
    description:
      "Precious gold alloys and natural gemstones are individually inspected for harmony of hue, lustre, and symmetry before reaching the jeweller's bench.",
    detail: "Matched colour, cut & tonal balance",
  },
  {
    number: "03",
    title: "Craftsmanship",
    subtitle: "Master Karigar Execution",
    description:
      "Skilled artisans shape intricate filigree, micro-pavé mounts, and articulated links by hand—preserving delicate movement and structural integrity.",
    detail: "Precision hand-setting under magnification",
  },
  {
    number: "04",
    title: "Finishing",
    subtitle: "Signature Polish & Inspection",
    description:
      "Each piece undergoes multi-stage hand polishing, comfort beveling on inner surfaces, and a thorough quality check before presentation.",
    detail: "Silk-smooth interior comfort & radiant sheen",
  },
];

/**
 * Clearly labelled demonstration testimonials — replace with verified client quotes later.
 */
export const DEMO_TESTIMONIALS = [
  {
    id: "demo-1",
    quote:
      "The bridal choker felt weightless yet regal—every filigree detail looked even more luminous in person than in the private viewing.",
    author: "Sample Client Reflection 01",
    occasion: "Bridal Trousseau · Demo Content",
  },
  {
    id: "demo-2",
    quote:
      "An unhurried, deeply personal consultation. From selecting the diamond setting to final fitting, the experience felt effortless and refined.",
    author: "Sample Client Reflection 02",
    occasion: "Bespoke Solitaire · Demo Content",
  },
  {
    id: "demo-3",
    quote:
      "Timeless proportions you can wear across generations—quiet luxury with authentic warmth and impeccable finishing.",
    author: "Sample Client Reflection 03",
    occasion: "Heritage Gold Collection · Demo Content",
  },
];

export const SOCIAL_GALLERY = [
  {
    id: "ig-1",
    image: "/images/hero-editorial.jpg",
    caption: "Evening Heirloom · 22K Gold & Diamond Choker",
    tag: "Editorial",
  },
  {
    id: "ig-2",
    image: "/images/col-gold-hoops.jpg",
    caption: "Light in Motion · Baguette Diamond Hoops",
    tag: "Diamonds",
  },
  {
    id: "ig-3",
    image: "/images/editorial-campaign.jpg",
    caption: "Quiet Brilliance · Solitaire & Tennis Bracelet",
    tag: "Campaign",
  },
  {
    id: "ig-4",
    image: "/images/col-gold-kada.jpg",
    caption: "Botanical Filigree · Handcrafted Ruby Kada",
    tag: "Heritage",
  },
  {
    id: "ig-5",
    image: "/images/craftsmanship-atelier.jpg",
    caption: "Inside the Atelier · Precision by Hand",
    tag: "Atelier",
  },
  {
    id: "ig-6",
    image: "/images/col-halo-ring.jpg",
    caption: "Modern Romance · Two-Tone Halo Ring",
    tag: "Bridal",
  },
];
