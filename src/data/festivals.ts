import varamahalakshmi from "@/assets/festival-varamahalakshmi.jpg";
import rakhi from "@/assets/festival-rakhi.jpg";
import ganesh from "@/assets/festival-ganesh.jpg";
import dussehra from "@/assets/festival-dussehra.jpg";
import diwali from "@/assets/festival-diwali.jpg";

export interface Festival {
  id: string;
  name: string;
  emoji: string;
  description: string;
  image: string;
  alt: string;
}

/** Replace images or add festivals here. */
export const festivals: Festival[] = [
  {
    id: "varamahalakshmi",
    name: "Varamahalakshmi Vratham",
    emoji: "🌸",
    description: "Silk sarees pleated and styled for the Vratham, plus idol decoration.",
    image: varamahalakshmi,
    alt: "Decorated Goddess Lakshmi setup with silk saree and lamps",
  },
  {
    id: "raksha-bandhan",
    name: "Raksha Bandhan",
    emoji: "🧿",
    description: "A crisp, comfortable drape for a day of family celebrations.",
    image: rakhi,
    alt: "Rakhi threads resting on soft silk saree fabric",
  },
  {
    id: "vinayaka-chavithi",
    name: "Vinayaka Chavithi",
    emoji: "🐘",
    description: "Festive pleating and Ganesha idol decoration for the pooja days.",
    image: ganesh,
    alt: "Ganesha idol decorated with flowers and silk cloth",
  },
  {
    id: "dussehra",
    name: "Dussehra",
    emoji: "🌼",
    description: "Nine days, nine drapes — get every saree ready in advance.",
    image: dussehra,
    alt: "Marigold decorated festive celebration with sarees",
  },
  {
    id: "diwali",
    name: "Diwali",
    emoji: "🪔",
    description: "Fluffy pleats and tassels for a glowing festival of lights look.",
    image: diwali,
    alt: "Rows of lit diyas beside a shimmering gold silk saree",
  },
];
