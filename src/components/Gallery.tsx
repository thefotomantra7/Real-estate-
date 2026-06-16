import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface GalleryItem {
  src: string;
  category: 'Villas' | 'Plots' | 'Interiors';
  title: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    category: 'Villas',
    title: 'The Sovereign Majestic Pool Facade'
  },
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    category: 'Villas',
    title: 'Sovereign Entrance Lobby Columns'
  },
  {
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    category: 'Interiors',
    title: 'Bespoke Italian Gold Accent Living Room'
  },
  {
    src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    category: 'Villas',
    title: 'Sky Tower Apartment Glass Structure'
  },
  {
    src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    category: 'Plots',
    title: 'Scenic Gated Plot Development'
  },
  {
    src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    category: 'Interiors',
    title: 'Master Chef Modular Suite Kitchen'
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    category: 'Villas',
    title: 'The Imperial Estate Garden Courtyard'
  },
  {
    src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    category: 'Interiors',
    title: 'En-Suite Luxury Bathroom Walk-In'
  }
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<'All' | 'Villas' | 'Plots' | 'Interiors'>('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  const handleNext = () => {
    if (lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-2">
            The Luxury Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
            Elite Architectural Gallery
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl mx-auto font-light">
            An exquisite photographic layout highlighting architectural blueprints, curated luxury interiors, and manicured private plots.
          </p>
        </div>

        {/* Categories Tab Swapper */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(['All', 'Villas', 'Plots', 'Interiors'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-xs font-bold tracking-wider uppercase border transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-white shadow-md'
                  : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-amber-500 text-zinc-500 hover:text-amber-500'
              }`}
            >
              {tab === 'All' ? 'All Masterpieces' : tab}
            </button>
          ))}
        </div>

        {/* Gallery Image Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIdx(idx)}
              className="relative h-64 rounded-2xl overflow-hidden shadow-md border border-zinc-100 dark:border-zinc-800/60 group cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Glass view action overlay */}
              <div className="absolute inset-0 bg-zinc-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <span className="self-end px-2 py-0.5 text-[9px] font-bold bg-amber-500 text-zinc-950 rounded uppercase tracking-wider">
                  {item.category}
                </span>

                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-2 border border-white/20">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-xs font-bold tracking-wide truncate text-center uppercase text-amber-300">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Lightbox Layer */}
      {lightboxIdx !== null && (
        <div
          id="eep-gallery-lightbox"
          className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-md flex flex-col justify-between p-4"
          onClick={() => setLightboxIdx(null)}
        >
          {/* Header controls */}
          <div className="flex items-center justify-between text-white p-2">
            <div>
              <span className="text-[10px] text-amber-400 font-bold tracking-widest uppercase block">
                Archival Plate {lightboxIdx + 1} of {filteredItems.length}
              </span>
              <h4 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                {filteredItems[lightboxIdx].title}
              </h4>
            </div>

            <button
              onClick={() => setLightboxIdx(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Showcase Image Area with side buttons */}
          <div className="relative flex items-center justify-center flex-grow max-h-[80vh]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 lg:left-12 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-10 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={filteredItems[lightboxIdx].src}
              className="max-w-full max-h-[75vh] object-contain rounded-xl border border-white/5 shadow-2xl"
              alt="Lightbox Large Capture View"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 lg:right-12 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-10 transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Footer Metadata */}
          <div className="text-center text-zinc-500 text-[10px] uppercase font-mono tracking-widest p-4">
            Elite Estate Pro Photographic Archive • Category: {filteredItems[lightboxIdx].category}
          </div>
        </div>
      )}
    </section>
  );
}
