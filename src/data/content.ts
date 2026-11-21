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
    id: "client-1",
    quote:
      "We got our entire bridal set made here. The craftsmanship is unmatched and Suraj bhai guided us so patiently through every single decision.",
    author: "Priya Sharma",
    occasion: "Pashan, Pune · Bridal Collection",
  },
  {
    id: "client-2",
    quote:
      "Bought a gold necklace for my mother's birthday. The quality is exceptional and the price was very fair. Highly recommended to everyone!",
    author: "Rohit Kulkarni",
    occasion: "Baner, Pune · 22K Gold Jewellery",
  },
  {
    id: "client-3",
    quote:
      "I've been coming here for over 10 years. The trust, quality and service keep me coming back. SVJ is truly our family jeweller.",
    author: "Anita Deshmukh",
    occasion: "Aundh, Pune · Patron for 10+ Years",
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
