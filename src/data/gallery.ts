import g1 from "@/assets/elegant-pre-pleats.jpg";
import g2 from "@/assets/classic-draping.jpg";
import g3 from "@/assets/baby-kuchu.jpg";
import g4 from "@/assets/designer-saree.jpg";
import g5 from "@/assets/handloom-soft-silk.jpg";
import g6 from "@/assets/festive-drape.jpg";
import g7 from "@/assets/burnt-orange-chocolate.jpg";
import g8 from "@/assets/signature-drape.png";
import g9 from "@/assets/pre-pleat-lavender.png";
import g10 from "@/assets/pre-pleat-gold-cream.png";

export const galleryCategories = [
  "All",
  "Pre-Pleating",
  "Saree Draping",
  "Festive",
  "Traditional",
  "Special Occasions",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export interface GalleryItem {
  id: string;
  image: string;
  /** Alt text — always describe the saree work shown. */
  alt: string;
  title: string;
  description?: string;
  categories: Exclude<GalleryCategory, "All">[];
  /** Suggested service to preselect when booking a similar service. */
  suggestedService?: string;
  /** Set to true if the item should only appear when viewing a specific category filter, not in the main 'All' view. */
  onlyShowInFilter?: boolean;
}

/**
 * Gallery items — updated with actual customer photography.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "pleats-blush",
    image: g1,
    alt: "Elegant pre-pleated saree showing crisp, even pleating work on a hanger",
    title: "Hanger Folding",
    description: "Beautifully pre-pleated sarees stored on custom hangers, keeping them crisp and ready-to-wear instantly.",
    categories: ["Pre-Pleating"],
    suggestedService: "Normal Pre-Pleating",
  },
  {
    id: "red-banarasi-drape",
    image: g2,
    alt: "Neated boxed-folded silk saree stacked",
    title: "Box Folding",
    description: "Crisp and compact folding that keeps your valuable sarees wrinkle-free and easy to pack or store.",
    categories: ["Pre-Pleating"],
    suggestedService: "Box Folding",
  },
  {
    id: "tassels",
    image: g3,
    alt: "Saree pallu with neat, hand-crafted baby kuchu tassel work",
    title: "Designer Saree Tassels",
    description: "Elegant, hand-tied baby kuchu and custom tassels to elevate your saree's pallu with traditional flair.",
    categories: ["Traditional", "Special Occasions"],
    suggestedService: "Tassels",
  },
  {
    id: "box-folded",
    image: g4,
    alt: "Exquisitely pre-pleated designer silk saree",
    title: "Designer/ Bridal Saree Pre-Pleating",
    description: "Exquisite pleating and custom draping styles designed for premium silk and heavy designer sarees.",
    categories: ["Pre-Pleating"],
    suggestedService: "Box Folding",
  },
  {
    id: "festive-yellow",
    image: g5,
    alt: "Double-warp handloom soft silk saree pleated beautifully with fluffy pleats",
    title: "Fluffy Pleats",
    description: "Lightweight and soft silk sarees pleated with a beautiful, natural fluffy volume that holds its grace.",
    categories: ["Festive", "Special Occasions"],
    suggestedService: "Fluffy Pleats",
  },
  {
    id: "kasavu-hanger",
    image: g6,
    alt: "Festive saree draping style for idols with a neat, graceful fall",
    title: "Festive Idol Draping",
    description: "Graceful and devotional draping of sarees for festival idols and special pooja celebrations.",
    categories: ["Traditional", "Festive"],
    suggestedService: "Saree Draping",
  },
  {
    id: "pochampally-pallu",
    image: g7,
    alt: "Burnt orange silk saree with contrast chocolate brown zari border draped elegantly",
    title: "Contrast Saree Draping",
    description: "Symmetrical pleating style designed to emphasize contrasting borders and rich pallu patterns.",
    categories: ["Saree Draping", "Traditional"],
    suggestedService: "Saree Draping",
  },
  {
    id: "bridal-maroon",
    image: g8,
    alt: "Exclusive signature pre-pleated wedding saree style",
    title: "Signature Bridal Draping",
    description: "Flawless, structured bridal draping designed to keep you stunning, neat, and comfortable all day.",
    categories: ["Special Occasions", "Festive"],
    suggestedService: "Saree Ironing",
  },
  {
    id: "pre-pleat-lavender",
    image: g9,
    alt: "Neated fanned pleats on a lavender georgette saree with elegant silver embroidery",
    title: "Lavender Georgette Pleating",
    description: "Graceful, lightweight lavender georgette saree pre-pleated and pressed for special events.",
    categories: ["Pre-Pleating"],
    suggestedService: "Normal Pre-Pleating",
    onlyShowInFilter: true,
  },
  {
    id: "pre-pleat-gold-cream",
    image: g10,
    alt: "Accordion folded cream and gold silk saree detailing pristine fold lines",
    title: "Zari Accordion Folding",
    description: "Pristine gold and cream silk saree folded into flawless accordion pleats, ready for instant wear.",
    categories: ["Pre-Pleating"],
    suggestedService: "Box Folding",
    onlyShowInFilter: true,
  },
];
