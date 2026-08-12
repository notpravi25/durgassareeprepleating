import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3Asset from "@/assets/gallery-maroon-gold-pleats.jpg.asset.json";
import g4 from "@/assets/gallery-4.jpg";
import g5Asset from "@/assets/gallery-grey-black-silk.jpg.asset.json";
import g6 from "@/assets/gallery-6.jpg";
import g7Asset from "@/assets/gallery-burnt-orange-silk.jpg.asset.json";
import g8Asset from "@/assets/gallery-teal-green-pleats.jpg.asset.json";

const g3 = g3Asset.url;
const g5 = g5Asset.url;
const g7 = g7Asset.url;
const g8 = g8Asset.url;

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
}

/**
 * Gallery items — placeholder photography for now.
 * To use real photos: drop images into src/assets and swap the imports above.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "pleats-blush",
    image: g1,
    alt: "Blush pink georgette saree with crisp fanned pre-pleats",
    title: "Crisp Georgette Pleats",
    description: "Light georgette pre-pleated for a soft, flowing fall that stays neat all day.",
    categories: ["Pre-Pleating"],
    suggestedService: "Normal Pre-Pleating",
  },
  {
    id: "red-banarasi-drape",
    image: g2,
    alt: "Woman draped in a red Banarasi silk saree with gold border",
    title: "Classic Banarasi Drape",
    description: "A traditional drape finished with a neatly set pallu for functions.",
    categories: ["Saree Draping", "Traditional"],
    suggestedService: "Saree Draping",
  },
  {
    id: "tassels",
    image: g3,
    alt: "Maroon silk saree with gold zari, neatly pre-pleated in even folds",
    title: "Maroon & Gold Pre-Pleats",
    description: "Zari-bordered silk pleated in crisp, even folds ready to wear.",
    categories: ["Traditional", "Special Occasions"],
    suggestedService: "Tassels",
  },
  {
    id: "box-folded",
    image: g4,
    alt: "Neatly box-folded silk sarees stacked on a cream shelf",
    title: "Box-Folded & Organised",
    description: "Box folding that keeps silks crease-free and easy to store.",
    categories: ["Pre-Pleating"],
    suggestedService: "Box Folding",
  },
  {
    id: "festive-yellow",
    image: g5,
    alt: "Grey and black handloom soft silk saree with silver zari pallu",
    title: "Handloom Soft Silk",
    description: "Double-warp soft silk with contrast pallu, pleated and pressed to hold its fall.",
    categories: ["Festive", "Special Occasions"],
    suggestedService: "Fluffy Pleats",
  },
  {
    id: "kasavu-hanger",
    image: g6,
    alt: "Cream and gold Kasavu saree pleated on a wooden hanger",
    title: "Kasavu on Hanger",
    description: "Hanger folding that preserves the pleats until you wear it.",
    categories: ["Traditional", "Pre-Pleating"],
    suggestedService: "Hanger Folding",
  },
  {
    id: "pochampally-pallu",
    image: g7,
    alt: "Burnt orange silk saree with chocolate brown zari border, draped on a mannequin",
    title: "Burnt Orange Silk Drape",
    description: "Contrast zari border silk draped and pinned for a clean, symmetrical fall.",
    categories: ["Saree Draping", "Traditional"],
    suggestedService: "Saree Draping",
  },
  {
    id: "bridal-maroon",
    image: g8,
    alt: "Bridal maroon silk saree with gold zari border laid out with pleats",
    title: "Bridal Silk Finish",
    description: "Heavy silk pressed and pleated for wedding day comfort.",
    categories: ["Special Occasions", "Festive"],
    suggestedService: "Saree Ironing",
  },
];
