import { business } from "@/data/business";

export interface BookingData {
  sareeCount: string; // "1".."10" or "more"
  approxCount: string;
  sareeTypes: string[];
  otherSareeType: string;
  servicesRequired: string[];
  requiredByDate?: Date;
  festivalOccasion: string;
  festiveService: string;
  name: string;
  phone: string;
  location: string;
  additionalRequirements: string;
}

export const emptyBooking: BookingData = {
  sareeCount: "",
  approxCount: "",
  sareeTypes: [],
  otherSareeType: "",
  servicesRequired: [],
  requiredByDate: undefined,
  festivalOccasion: "",
  festiveService: "No festive service",
  name: "",
  phone: "",
  location: "",
  additionalRequirements: "",
};

export const formatDate = (date?: Date) =>
  date
    ? date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "Not specified";

export const sareeCountLabel = (b: BookingData) =>
  b.sareeCount === "more"
    ? b.approxCount
      ? `More than 10 (approx. ${b.approxCount})`
      : "More than 10"
    : b.sareeCount || "—";

export const sareeTypesLabel = (b: BookingData) => {
  const types = b.sareeTypes.map((t) =>
    t === "Others" && b.otherSareeType.trim() ? `Others (${b.otherSareeType.trim()})` : t,
  );
  return types.join(", ") || "—";
};

export const buildWhatsAppMessage = (b: BookingData) =>
  [
    "Hello! I would like to enquire about saree services.",
    "",
    `Name: ${b.name}`,
    `Number of Sarees: ${sareeCountLabel(b)}`,
    `Saree Types: ${sareeTypesLabel(b)}`,
    `Services Required: ${b.servicesRequired.join(", ") || "—"}`,
    `Required By: ${formatDate(b.requiredByDate)}`,
    `Festive Occasion: ${b.festivalOccasion || "Not specified"}`,
    `Festive Service: ${b.festiveService || "No festive service"}`,
    `Location: ${b.location}`,
    `Additional Requirements: ${b.additionalRequirements.trim() || "None"}`,
    "",
    "Please let me know the availability and details.",
  ].join("\n");

export const buildEmailFallback = (b: BookingData) =>
  `mailto:${business.email}?subject=${encodeURIComponent(
    "Saree service enquiry",
  )}&body=${encodeURIComponent(buildWhatsAppMessage(b))}`;

/** Indian mobile numbers: 10 digits starting 6-9, optional +91 / 0 prefix. */
export const isValidIndianPhone = (value: string) => {
  const digits = value.replace(/[\s-]/g, "");
  return /^(\+?91|0)?[6-9]\d{9}$/.test(digits);
};
