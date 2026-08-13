/**
 * Central business configuration with local storage persistence.
 * Update these values to change contact details across the whole site.
 */
const STORAGE_KEY = "durgas_business_settings";

export interface BusinessSettings {
  name: string;
  shortName: string;
  tagline: string;
  phone: string;
  phoneIntl: string;
  email: string;
  locationLabel: string;
  locationNote: string;
  mapsUrl: string;
}

const defaultBusiness: BusinessSettings = {
  name: "Durga's Saree Pre-Pleating Services",
  shortName: "Durga's Saree",
  tagline: "Beautiful pleats. Perfect drapes. Effortless elegance.",
  phone: "9110304317",
  phoneIntl: "919110304317", // used for WhatsApp / tel links
  email: "sravyasuryasri1234567@gmail.com",
  locationLabel: "Rajeevnagar, Kurmannapalem, Visakhapatnam",
  locationNote: "",
  mapsUrl: "",
};

export const getBusinessSettings = (): BusinessSettings => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return defaultBusiness;
    const parsed = JSON.parse(data);
    // Ensure all keys exist
    return { ...defaultBusiness, ...parsed };
  } catch (error) {
    console.error("Error reading business settings from localStorage", error);
    return defaultBusiness;
  }
};

export const saveBusinessSettings = (settings: BusinessSettings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving business settings to localStorage", error);
  }
};

// Current business settings loaded on module evaluation
export const business = getBusinessSettings();

// Helper to build WhatsApp links
export const whatsappLink = (message: string) => {
  const current = getBusinessSettings();
  return `https://wa.me/${current.phoneIntl}?text=${encodeURIComponent(message)}`;
};
