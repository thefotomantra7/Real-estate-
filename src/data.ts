import { Property, WebConfig, Enquiry } from './types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'The Sovereign Majestic Villa',
    location: 'Jubilee Hills, Hyderabad',
    price: 125000000, // ₹12.5 Cr
    area: 7500,
    type: 'Villa',
    status: 'available',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An architectural marvel nestled in the premier heights of Jubilee Hills. This ultra-luxury smart villa features private infinity pools, gold-accented bespoke interior themes, custom Italian marble, glass facades with panoramic city views, and 5 luxurious suites equipped with modular en-suite baths.',
    bedrooms: 5,
    bathrooms: 6,
    plotSize: '80 x 100 feet',
    facing: 'East',
    verified: true
  },
  {
    id: 'prop-2',
    title: 'Royal Palms Boulevard Plot',
    location: 'Gomti Nagar, Lucknow',
    price: 32000000, // ₹3.2 Cr
    area: 4500,
    type: 'Residential Plot',
    status: 'available',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A premium, corner residential plot in a secure luxury gated community. Located right on the main avenue boulevard, featuring a 40-foot wide asphalt entrance, underground power lines, surrounding landscaping with adult palm trees, and full municipal approvals. Perfect to construct your custom luxury mansion.',
    plotSize: '50 x 90 feet',
    facing: 'North-East',
    verified: true
  },
  {
    id: 'prop-3',
    title: 'The Luminary Sky Penthouse',
    location: 'Golf Course Road, Gurgaon',
    price: 68000000, // ₹6.8 Cr
    area: 4200,
    type: 'Apartment',
    status: 'available',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A prestigious state-of-the-art penthouse situated on the 32nd floor of The Luminary. Offers magnificent double-height ceilings, a wrap-around private terrace deck, a professional chef kitchen, pre-installed VRV air-conditioning, smart security automation, and absolute privacy.',
    bedrooms: 3,
    bathrooms: 4,
    facing: 'West',
    verified: true
  },
  {
    id: 'prop-4',
    title: 'The Emerald Meadows Farmhouse',
    location: 'Sohna Road, Gurgaon Surrounds',
    price: 95000000, // ₹9.5 Cr
    area: 65340, // 1.5 Acre approx
    type: 'Farmhouse',
    status: 'reserved',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An idyllic escape from urban chaos. Spanning over 1.5 acres of beautifully sculpted organic gardens, fruit orchards, and water fountains, the main colonial property houses 4 suites, a large courtyard pool, separate caretaker quarters, and private tube-well connection.',
    bedrooms: 4,
    bathrooms: 5,
    plotSize: '300 x 218 feet',
    facing: 'North',
    verified: true
  },
  {
    id: 'prop-5',
    title: 'Heights Corporate Zone Plot',
    location: 'Bandra Kurla Complex, Mumbai',
    price: 150000000, // ₹15 Cr
    area: 8800,
    type: 'Commercial Plot',
    status: 'available',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1554469384-e58fb16e78a5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Extremely rare prime commercial land with high FSI (Floor Space Index) and immediate construction approval. This high-value commercial plot is located near central luxury office parks, making it perfect for custom company headquarters, tech-hub nodes, or premium boutique office developments.',
    plotSize: '80 x 110 feet',
    facing: 'South',
    verified: true
  },
  {
    id: 'prop-6',
    title: 'The Citadel Imperial Estate',
    location: 'Amrita Shergill Marg, New Delhi',
    price: 220000000, // ₹22 Cr
    area: 12000,
    type: 'Villa',
    status: 'sold',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'One of New Delhi\'s finest residential properties. A breathtaking architectural tribute featuring heritage elevation styling combined with modern technological sophistication. Includes dual grand staircases, glass elevators, temperature-controlled pools, custom secure panic room suites, and highly fortified parameters.',
    bedrooms: 6,
    bathrooms: 8,
    plotSize: '120 x 100 feet',
    facing: 'East',
    verified: true
  },
  {
    id: 'prop-7',
    title: 'Golden Crest Agricultural Lands',
    location: 'Doon Valley Foothills, Dehradun',
    price: 48000000, // ₹4.8 Cr
    area: 87120, // 2 Acres
    type: 'Agricultural Land',
    status: 'available',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1444653389962-8149286c578a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Prone to high yield and scenic excellence. Located at the direct base of the Himalayan foothills in Dehradun Valley, offering nutrient-rich soil, dedicated clear mountain water channels, road connectivity, clear registry credentials, and pristine mountain air views. Ideal for specialized luxury cultivation, green retreats, or boutique organic farming ventures.',
    plotSize: '330 x 264 feet',
    facing: 'North-East',
    verified: true
  }
];

export const INITIAL_WEB_CONFIG: WebConfig = {
  hero: {
    title: 'Find Your Dream Property With Confidence',
    subtitle: 'Premium Residential, Commercial, Luxury Villas, Farmhouses & Investment Properties Handpicked For Discriminating Standards.',
    bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    propertiesSold: '1,250+',
    happyClients: '98%',
    experienceYears: '18+',
    citiesCovered: '12'
  },
  about: {
    intro: 'Elite Estate Pro is an award-winning premium property consultancy and premier dealership specializing in off-market residences, ultra-luxury villas, and secure investment grade lands across prime metropolitan and lifestyle hubs. Our brand represents absolute trust, high-end design sensibilities, and perfect transaction transparency.',
    mission: 'To advise and facilitate wealth creation through meticulously curated land acquisitions, landmark architecture, and stress-free transparent real estate transitions.',
    vision: 'To redefine luxury land ownership and high-end brokerage by employing hyper-tailored modern solutions, meticulous legal scanning, and impeccable elite services.',
    experienceText: 'With over 18 years of real estate excellence, we handle every detail from verification to construction handovers.',
    whyChooseUsText: 'We curate elite properties that combine prime geographical positioning, unmatched construction craftsmanship, high long-term appreciation potentials, and completely crystal-clear title documentation.'
  },
  services: [
    {
      id: 'ser-1',
      title: 'Property Buying',
      icon: 'Home',
      desc: 'Get exclusive access to pre-vetted luxury villas, ultra-premium apartments, and prime corporate commercial plots matching exact investment indices.'
    },
    {
      id: 'ser-2',
      title: 'Property Selling',
      icon: 'TrendingUp',
      desc: 'Leverage our network of ultra-high-net-worth individuals and high-impact digital marketing to sell your premium listings with supreme speed.'
    },
    {
      id: 'ser-3',
      title: 'Property Investment',
      icon: 'PieChart',
      desc: 'Meticulously calculated portfolio advisory mapping layout developments, agricultural land banking, and high-yielding urban high-rises.'
    },
    {
      id: 'ser-4',
      title: 'Property Consultation',
      icon: 'Users',
      desc: 'Bespoke one-on-one session layouts reviewing geographic growth vectors, tax structuring, inheritance pathways, and structural custom layouts.'
    },
    {
      id: 'ser-5',
      title: 'Legal Assistance',
      icon: 'ShieldCheck',
      desc: 'Absolute peace of mind. Rigorous dual-auditing of physical land registrations, non-encumbrance records, municipal sanity, and layout master approvals.'
    },
    {
      id: 'ser-6',
      title: 'Site Visits',
      icon: 'MapPin',
      desc: 'VVIP door-to-door luxury air-conditioned site transport led directly by senior investment briefers to present properties in crystal clear detail.'
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      name: 'Aditya Vardhan Roy',
      rating: 5,
      review: 'Working with Elite Estate Pro was absolute perfection. Their advisory team procured a highly exclusive off-market estate in Hyderabad for us. Their extreme attention to legal scanning and elegant customer transparency is unparalleled.',
      role: 'Founder, Roy Group Corporate',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'test-2',
      name: 'Meenakshi Iyer',
      rating: 5,
      review: 'As an NRI investor, finding verified plots in NCR is usually a bureaucratic nightmare. Elite Estate Pro took complete charge, delivering fast digitized documentation support, transparent deals, and helping us acquire a magnificent farmhouse estate.',
      role: 'Investment Director, SG Capital',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'test-3',
      name: 'Dr. Harshvardhan Kapoor',
      rating: 5,
      review: 'Their curated selection of luxury smart villas saved us weeks of redundant viewings. Their team is sophisticated, knowledgeable, and respects client confidentiality to the utmost degree. Unquestionably the best high-end real estate agency around.',
      role: 'Chief Medical Officer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'Do you only deal in ready-to-move luxury properties?',
      answer: 'No, we specialize across the entire high-value estate spectrum: including fully approved residential plots, corporate level commercial avenues, scenic farmhouses, agricultural land acquisitions, and premium pre-launch villas/apartments.'
    },
    {
      id: 'faq-2',
      question: 'How do you guarantee that a property has clean legal titles?',
      answer: 'Our dedicated legal counsel conducts an intensive independent 30-year search. We verify non-encumbrance certificate status, government registry books, layout blueprint sanctions, and ensure all municipal dues are pre-settled.'
    },
    {
      id: 'faq-3',
      question: 'Do you assist clients with obtaining competitive home and property loans?',
      answer: 'Yes! We coordinate directly with top-tier nationalized and private banking partners (HDFC, SBI, ICICI, etc.) to expedite swift, low-interest mortgage layouts and documentation clearance with zero stress.'
    },
    {
      id: 'faq-4',
      question: 'What is your process for out-of-station or international NRI buyers?',
      answer: 'We provide comprehensive digitized real estate services, including ultra-high-definition interactive videography, live virtual site inspections, secure digital documentation signing layouts, power-of-attorney facilitation, and dedicated NRI updates.'
    }
  ],
  contact: {
    phone: '+91 91403 45992',
    whatsapp: '+91 91403 45992',
    email: 'deals@eliteestatepro.com',
    address: 'Level 14, Zenith Towers, Golf Course Road, Sector 54, Gurugram, India, 122002',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14034.90835150821!2d77.1009!3d28.4234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d21ffab000000%3A0x67ee69b59695de93!2sGolf%20Course%20Road%20Sector%2054%20Gurugram!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
  }
};

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-1',
    name: 'Rohit Sharma',
    mobile: '+91 98765 43210',
    email: 'rohit.sharma@gmail.com',
    city: 'Hyderabad',
    propertyType: 'Villa',
    location: 'Jubilee Hills',
    budget: '₹10 Cr+',
    requirement: 'Looking for a premium corner 4+ BHK villa with high ceilings and private pool.',
    message: 'Please share available brochures and set up a physical premium tour of Jubilee Hills properties.',
    date: '2026-06-15'
  },
  {
    id: 'enq-2',
    name: 'Kshitij Kapoor',
    mobile: '+91 88123 45678',
    email: 'k.kapoor@outlook.com',
    city: 'Delhi NCR',
    propertyType: 'Farmhouse',
    location: 'Sohna Road',
    budget: '₹8 Cr - ₹12 Cr',
    requirement: 'Minimum 1 acre of lush land to build custom residential cottage and organic farm.',
    message: 'Prefer quiet location with clean surrounding air. Ready to acquire immediately.',
    date: '2026-06-16'
  }
];

// Helper functions for persistent web storage
export function getSavedProperties(): Property[] {
  const data = localStorage.getItem('eep_properties');
  if (!data) {
    localStorage.setItem('eep_properties', JSON.stringify(INITIAL_PROPERTIES));
    return INITIAL_PROPERTIES;
  }
  return JSON.parse(data);
}

export function saveProperties(properties: Property[]): void {
  localStorage.setItem('eep_properties', JSON.stringify(properties));
}

export function getSavedWebConfig(): WebConfig {
  const data = localStorage.getItem('eep_web_config');
  if (!data) {
    localStorage.setItem('eep_web_config', JSON.stringify(INITIAL_WEB_CONFIG));
    return INITIAL_WEB_CONFIG;
  }
  return JSON.parse(data);
}

export function saveWebConfig(config: WebConfig): void {
  localStorage.setItem('eep_web_config', JSON.stringify(config));
}

export function getSavedEnquiries(): Enquiry[] {
  const data = localStorage.getItem('eep_enquiries');
  if (!data) {
    localStorage.setItem('eep_enquiries', JSON.stringify(INITIAL_ENQUIRIES));
    return INITIAL_ENQUIRIES;
  }
  return JSON.parse(data);
}

export function saveEnquiry(enquiry: Enquiry): void {
  const current = getSavedEnquiries();
  const updated = [enquiry, ...current];
  localStorage.setItem('eep_enquiries', JSON.stringify(updated));
}

export function getSavedWishlist(): string[] {
  const data = localStorage.getItem('eep_wishlist');
  return data ? JSON.parse(data) : [];
}

export function saveWishlist(ids: string[]): void {
  localStorage.setItem('eep_wishlist', JSON.stringify(ids));
}

export function getSavedCompare(): string[] {
  const data = localStorage.getItem('eep_compare');
  return data ? JSON.parse(data) : [];
}

export function saveCompare(ids: string[]): void {
  localStorage.setItem('eep_compare', JSON.stringify(ids));
}
