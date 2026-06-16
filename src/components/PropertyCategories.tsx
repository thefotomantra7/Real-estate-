import React from 'react';
import { Layers, Trees, ShieldCheck, Landmark, Building, Map, Coins } from 'lucide-react';

interface PropertyCategoriesProps {
  onCategorySelect: (type: string) => void;
}

export default function PropertyCategories({ onCategorySelect }: PropertyCategoriesProps) {
  const categories = [
    {
      title: 'Residential Plots',
      typeName: 'Residential Plot',
      desc: 'Approved residential layouts to construct customized architectural masterpieces.',
      count: 'Premium Inventory',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500&q=80',
      icon: <Map className="w-5 h-5 text-amber-500" />
    },
    {
      title: 'Commercial Plots',
      typeName: 'Commercial Plot',
      desc: 'Strategic high-FSI commercial land, boutique zones, and supreme corporate plazas.',
      count: 'Strategic Avenues',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80',
      icon: <Building className="w-5 h-5 text-amber-500" />
    },
    {
      title: 'Villas & Mansions',
      typeName: 'Villa',
      desc: 'Breathtaking independent structures equipped with infinity pools & private lounges.',
      count: 'Exquisite Living',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=500&q=80',
      icon: <Landmark className="w-5 h-5 text-amber-500" />
    },
    {
      title: 'Luxury Apartments',
      typeName: 'Apartment',
      desc: 'Ultra-premium penthouses, double-height ceilings, and sky villas overlooking skylines.',
      count: 'Sky High Luxury',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=500&q=80',
      icon: <Layers className="w-5 h-5 text-amber-500" />
    },
    {
      title: 'Elite Farmhouses',
      typeName: 'Farmhouse',
      desc: 'Organic private orchards, pristine escape pools, and custom country colonial designs.',
      count: 'Pristine Escapes',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80',
      icon: <Trees className="w-5 h-5 text-amber-500" />
    },
    {
      title: 'Agricultural Land',
      typeName: 'Agricultural Land',
      desc: 'High-yield clear title rural estate blocks and bespoke plantation estates.',
      count: 'Fertile Meadows',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80',
      icon: <Trees className="w-5 h-5 text-amber-500" />
    },
    {
      title: 'Investment Properties',
      typeName: 'Investment Property',
      desc: 'Secured high-appreciation asset portfolios optimized for long-term generation loops.',
      count: 'HighYield Cap',
      image: 'https://images.unsplash.com/photo-1554469384-e58fb16e78a5?auto=format&fit=crop&w=500&q=80',
      icon: <Coins className="w-5 h-5 text-amber-500" />
    }
  ];

  return (
    <section id="categories" className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-2">
            Asset Spectrum
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
            Premium Property Categories
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl mx-auto">
            Click on any category block below to immediately filter our active verified physical inventory catalog.
          </p>
        </div>

        {/* Categories Grid (Bento Box Style / Card Matrix) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.typeName}
              onClick={() => onCategorySelect(cat.typeName)}
              className="group cursor-pointer relative h-80 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-900/60 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end"
            >
              {/* Backing Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={cat.title}
                  loading="lazy"
                />
                {/* Dynamic Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/65 to-transparent transition-opacity duration-300" />
              </div>

              {/* Icon badge floating top right */}
              <div className="absolute top-4 right-4 z-10 p-2 bg-zinc-950/80 backdrop-blur-md rounded-xl border border-white/10 opacity-90 group-hover:scale-105 transition-transform">
                {cat.icon}
              </div>

              {/* Card specifications details */}
              <div className="relative z-10 p-6 text-white space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block font-mono">
                  {cat.count}
                </span>
                <h3 className="text-lg font-bold group-hover:text-amber-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-300 font-light line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                  {cat.desc}
                </p>

                <div className="pt-2 text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1">
                  <span>Browse Category</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
