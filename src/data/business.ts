/**
 * Central business configuration.
 * Update these values to change contact details across the whole site.
 */
export const business = {
  name: "Durga's Saree Pre-Pleating Services",
  shortName: "Durga's Saree",
  tagline: "Beautiful pleats. Perfect drapes. Effortless elegance.",
  phone: "9110304317",
  phoneIntl: "919110304317", // used for WhatsApp / tel links
  email: "sravyasuryasri1234567@gmail.com",
  /** Set these when the owner shares an exact address / map link. */
  locationLabel: "Service location — to be updated",
  locationNote: "Pickup and drop details are shared over WhatsApp.",
  mapsUrl: "" as string,
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${business.phoneIntl}?text=${encodeURIComponent(message)}`;
