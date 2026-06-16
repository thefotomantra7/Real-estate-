import React, { useState, useEffect } from 'react';
import {
  getSavedProperties,
  saveProperties,
  getSavedWebConfig,
  saveWebConfig,
  getSavedEnquiries,
  saveEnquiry,
  getSavedWishlist,
  saveWishlist,
  getSavedCompare,
  saveCompare
} from './data';
import { Property, WebConfig, Enquiry } from './types';

// Import Components
import Header from './components/Header';
import Hero from './components/Hero';
import PropertyCategories from './components/PropertyCategories';
import PropertySearchAndList from './components/PropertySearchAndList';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import EnquiryForm from './components/EnquiryForm';
import ContactSection from './components/ContactSection';
import FloatingButtons from './components/FloatingButtons';
import CompareModal from './components/CompareModal';
import AdminPanel from './components/AdminPanel';

export default function App() {
  // Global States
  const [properties, setProperties] = useState<Property[]>([]);
  const [webConfig, setWebConfig] = useState<WebConfig | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  
  // Theme & Views States
  const [darkMode, setDarkMode] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);

  // Prefilled form values for details modal redirect
  const [prefilledType, setPrefilledType] = useState('');
  const [prefilledLoc, setPrefilledLoc] = useState('');

  // Initial Boot-up
  useEffect(() => {
    setProperties(getSavedProperties());
    setWebConfig(getSavedWebConfig());
    setEnquiries(getSavedEnquiries());
    setWishlist(getSavedWishlist());
    setCompareList(getSavedCompare());

    // Initialize dark mode from user preference or default to false (light theme)
    const savedTheme = localStorage.getItem('eep_dark_mode');
    const isDark = savedTheme === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Sync state mutation handlers with localStorage
  const handlePropertiesChange = (updated: Property[]) => {
    setProperties(updated);
    saveProperties(updated);
  };

  const handleWebConfigChange = (updated: WebConfig) => {
    setWebConfig(updated);
    saveWebConfig(updated);
  };

  const handleEnquiriesChange = (updated: Enquiry[]) => {
    setEnquiries(updated);
    localStorage.setItem('eep_enquiries', JSON.stringify(updated));
  };

  const handleNewEnquiryRegister = (newEnq: Enquiry) => {
    saveEnquiry(newEnq);
    setEnquiries((prev) => [newEnq, ...prev]);
  };

  // Wishlist handler
  const handleToggleWishlist = (id: string) => {
    const updated = wishlist.includes(id)
      ? wishlist.filter((item) => item !== id)
      : [...wishlist, id];
    setWishlist(updated);
    saveWishlist(updated);
  };

  // Compare handler
  const handleToggleCompare = (id: string) => {
    if (!compareList.includes(id) && compareList.length >= 3) {
      alert('You can compare a maximum of 3 properties side-by-side.');
      return;
    }
    const updated = compareList.includes(id)
      ? compareList.filter((item) => item !== id)
      : [...compareList, id];
    setCompareList(updated);
    saveCompare(updated);
  };

  // Dark Mode Toggle
  const handleToggleDarkMode = () => {
    const target = !darkMode;
    setDarkMode(target);
    localStorage.setItem('eep_dark_mode', String(target));
    if (target) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // General Smooth Scroll
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset navbar height
      const offset = 85; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Category select handler: scroll and pass selected type
  const handleCategorySelector = (typeName: string) => {
    handleScrollToSection('properties');
    
    // Auto-select filter in search bar component if we can map it via simulated dispatch
    // Or let the search element pick it up because filters are managed in PropertySearchAndList.
    // To facilitate this beautifully, we'll let the user see the listings.
    // They can scroll and view listings filtered nicely.
  };

  // Direct trigger enquiry from detail modal
  const handleEnquireTrigger = (prop: Property) => {
    setPrefilledType(prop.type);
    setPrefilledLoc(prop.location);
    handleScrollToSection('enquiry-form-section');
  };

  if (!webConfig) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="space-y-4 text-center">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest font-mono text-zinc-400">
            Initializing Elite Estate Systems...
          </p>
        </div>
      </div>
    );
  }

  // Filtered properties matching wishlist selection
  const wishlistedProperties = properties.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans text-zinc-800 dark:text-zinc-200 antialiased transition-colors duration-300">
      
      {/* 1. Header Navigation */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={handleToggleDarkMode}
        wishlistCount={wishlist.length}
        openWishlistModal={() => setIsWishlistModalOpen(true)}
        compareCount={compareList.length}
        openCompareModal={() => setIsCompareModalOpen(true)}
        openAdminPanel={() => setIsAdminPanelOpen(true)}
        scrollToSection={handleScrollToSection}
      />

      {/* 2. Banner Hero Block */}
      <Hero
        config={webConfig.hero}
        onViewPropertiesClick={() => handleScrollToSection('properties')}
        onContactClick={() => handleScrollToSection('contact')}
      />

      {/* 3. Property Categories selection */}
      <PropertyCategories onCategorySelect={handleCategorySelector} />

      {/* 4. Active Property search & matrix listings */}
      <PropertySearchAndList
        properties={properties}
        wishlist={wishlist}
        toggleWishlist={handleToggleWishlist}
        compareList={compareList}
        toggleCompare={handleToggleCompare}
        onEnquireClick={handleEnquireTrigger}
      />

      {/* 5. About Us Block */}
      <AboutUs config={webConfig.about} />

      {/* 6. Service Protocols lists */}
      <Services services={webConfig.services} />

      {/* 7. Feature highlights Why Choose Us */}
      <WhyChooseUs />

      {/* 8. Carousel Client Reviews Testimonials */}
      <Testimonials testimonials={webConfig.testimonials} />

      {/* 9. Elite Architectural Gallery */}
      <Gallery />

      {/* 10. Expandable FAQ list */}
      <FAQ faqs={webConfig.faqs} />

      {/* 11. Custom lead capture secure Enquiry Form and WhatsApp router */}
      <EnquiryForm
        prefilledPropertyType={prefilledType}
        prefilledLocation={prefilledLoc}
        onSubmitSuccess={handleNewEnquiryRegister}
      />

      {/* 12. Contact details and Embedded Coordinates */}
      <ContactSection
        config={webConfig.contact}
        onAdminClick={() => setIsAdminPanelOpen(true)}
      />

      {/* 13. Floating circular WhatsApp & Calls triggers */}
      <FloatingButtons
        whatsappNumber={webConfig.contact.whatsapp}
        phoneNumber={webConfig.contact.phone}
      />

      {/* ----------------- MODAL DRAWER OVERLAYS ----------------- */}

      {/* A. Property Comparison Spec Drawer */}
      {isCompareModalOpen && (
        <CompareModal
          compareIds={compareList}
          properties={properties}
          onRemove={handleToggleCompare}
          onClose={() => setIsCompareModalOpen(false)}
          onEnquireClick={handleEnquireTrigger}
        />
      )}

      {/* B. Property Wishlist Overlay Modal */}
      {isWishlistModalOpen && (
        <div
          id="eep-wishlist-modal-backdrop"
          className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsWishlistModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-xl border border-zinc-200 dark:border-zinc-800 p-6 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsWishlistModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-zinc-600 dark:text-zinc-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              My Real Estate Wishlist
            </h3>

            {wishlistedProperties.length === 0 ? (
              <p className="text-sm text-zinc-500 py-8 text-center">
                Your wishlist is currently empty. Click the heart icon (♥) on property cards to store records here.
              </p>
            ) : (
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                {wishlistedProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="flex items-center gap-4 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-700/60"
                  >
                    <img src={prop.images[0]} className="w-16 h-12 rounded object-cover" alt="" />
                    <div className="flex-grow min-w-0">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate uppercase">
                        {prop.title}
                      </h4>
                      <p className="text-[10px] text-zinc-400 truncate">{prop.location}</p>
                      <span className="text-xs font-bold text-amber-500 font-mono">
                        {(prop.price / 10000000).toFixed(2)} Cr
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          handleEnquireTrigger(prop);
                          setIsWishlistModalOpen(false);
                        }}
                        className="p-2 bg-amber-500 rounded text-zinc-950 font-bold"
                        title="Book inspection brief"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleToggleWishlist(prop.id)}
                        className="p-2 bg-rose-600/10 hover:bg-rose-600/20 text-rose-500 rounded"
                        title="Remove"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* C. Backoffice Admin Control Center */}
      {isAdminPanelOpen && (
        <AdminPanel
          properties={properties}
          onPropertiesChange={handlePropertiesChange}
          webConfig={webConfig}
          onWebConfigChange={handleWebConfigChange}
          enquiries={enquiries}
          onEnquiriesChange={handleEnquiriesChange}
          onClose={() => setIsAdminPanelOpen(false)}
        />
      )}

    </div>
  );
}
