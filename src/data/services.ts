import {
  Layers,
  Sparkles,
  Box,
  Shirt,
  Wind,
  Shirt as Hanger,
  Flower2,
  Laptop,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

/** Edit this list to add, remove or reword services. */
export const services: Service[] = [
  {
    id: "normal-pre-pleating",
    name: "Normal Pre-Pleating",
    description: "Neatly pre-pleated sarees that are ready to wear and easy to drape.",
    icon: Layers,
  },
  {
    id: "tassels",
    name: "Tassels",
    description: "Beautiful tassel finishing to add an elegant touch to your saree.",
    icon: Sparkles,
  },
  {
    id: "box-folding",
    name: "Box Folding",
    description: "Neat box folding to keep your sarees organized and ready for use.",
    icon: Box,
  },
  {
    id: "saree-ironing",
    name: "Saree Ironing",
    description: "Careful ironing to give your saree a clean and polished appearance.",
    icon: Shirt,
  },
  {
    id: "fluffy-pleats",
    name: "Fluffy Pleats",
    description: "Special fluffy pleating for a fuller and more festive saree look.",
    icon: Wind,
  },
  {
    id: "hanger-folding",
    name: "Hanger Folding",
    description: "Convenient hanger folding to help preserve and organize your sarees.",
    icon: Hanger,
  },
  {
    id: "saree-draping",
    name: "Saree Draping",
    description:
      "Professional saree draping for festivals, functions, weddings, and special occasions.",
    icon: Flower2,
  },
  {
    id: "online-classes",
    name: "Online Classes",
    description: "Learn saree pre-pleating and styling techniques from the comfort of your home.",
    icon: Laptop,
  },
  {
    id: "offline-classes",
    name: "Offline Classes",
    description: "Hands-on saree styling and pre-pleating classes.",
    icon: Users,
  },
];

export const serviceNames = services.map((s) => s.name);

/** Saree fabric types offered in the booking form. */
export const sareeTypes = [
  "Georgette / Chiffon",
  "Cotton",
  "Banarasi Saree",
  "Kanjeevaram",
  "Uppada",
  "Pochampally",
  "Pattu",
  "Kasavu",
  "Mysore Silk",
  "Bandhani",
  "Others",
];

export const festiveServiceOptions = [
  "No festive service",
  "Festival saree draping",
  "God/Goddess idol decoration",
  "Both",
];
