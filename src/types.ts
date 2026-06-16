export type PropertyStatus = 'available' | 'sold' | 'reserved';

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number; // in INR (Rupees) or generalized currency, we'll prefix with ₹
  area: number; // in Sq.Ft.
  type: 'Residential Plot' | 'Commercial Plot' | 'Villa' | 'Apartment' | 'Farmhouse' | 'Agricultural Land' | 'Investment Property';
  status: PropertyStatus;
  featured: boolean;
  images: string[];
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  plotSize?: string; // e.g. "50x80"
  facing?: string; // e.g. "East"
  verified: boolean;
}

export interface HeroConfig {
  title: string;
  subtitle: string;
  bgImage: string;
  propertiesSold: string;
  happyClients: string;
  experienceYears: string;
  citiesCovered: string;
}

export interface AboutConfig {
  intro: string;
  mission: string;
  vision: string;
  experienceText: string;
  whyChooseUsText: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string; // lucide icon name
  desc: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  rating: number;
  review: string;
  image: string;
  role?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactConfig {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
}

export interface WebConfig {
  hero: HeroConfig;
  about: AboutConfig;
  services: ServiceItem[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  contact: ContactConfig;
}

export interface Enquiry {
  id: string;
  name: string;
  mobile: string;
  email: string;
  city: string;
  propertyType: string;
  location: string;
  budget: string;
  requirement: string;
  message: string;
  date: string;
}

export interface SearchFilters {
  searchQuery: string;
  propertyType: string;
  location: string;
  budgetMin: string;
  budgetMax: string;
  plotSize: string;
  status: string;
}
