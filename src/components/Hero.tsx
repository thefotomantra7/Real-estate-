import React from 'react';
import { Sparkles, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { HeroConfig } from '../types';

interface HeroProps {
  config: HeroConfig;
  onViewPropertiesClick: () => void;
  onContactClick: () => void;
}

export default function Hero({ config, onViewPropertiesClick, onContactClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-zinc-950 text-white"
    >
      {/* Background Image with Rich Glass Overlay & Radial Gradient Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={config.bgImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80'}
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-all duration-1000"
          alt="Luxury Real Estate Background"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40 z-1" />
        <div className="absolute inset-0 bg-radial-vignette opacity-50 z-1" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12 pt-16">
        {/* Sparkle badge */}
        <div 
          id="hero-badge" 
          className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-md animate-fade-in"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold tracking-widest text-amber-300 uppercase">
            Exclusive Luxury Property Dealings
          </span>
        </div>

        {/* Breathtaking Display Headline */}
        <h1 
          id="hero-heading" 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl mx-auto leading-none text-white font-sans"
        >
          {config.title || 'Find Your Dream Property With Confidence'}
        </h1>

        {/* Subtitle description */}
        <p 
          id="hero-subheading" 
          className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed"
        >
          {config.subtitle || 'Premium Residential, Commercial, Luxury Villas, Farmhouses & Investment Properties.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            onClick={onViewPropertiesClick}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-bold tracking-wider text-xs uppercase rounded-lg shadow-lg hover:shadow-amber-500/10 hover:scale-[1.02] transform transition-all cursor-pointer"
            id="hero-cta-properties"
          >
            Explore Listings
          </button>
          
          <button
            onClick={onContactClick}
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white font-bold tracking-wider text-xs uppercase rounded-lg border-2 border-white/80 active:scale-[0.98] transition-all cursor-pointer"
            id="hero-cta-contact"
          >
            Contact Advisers
          </button>
        </div>

        {/* Glassmorphic Animated / Styled Statistics Cards */}
        <div 
          id="statistics-container" 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          <div className="p-6 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-xl text-center group hover:border-amber-500/20 transition-all">
            <div className="bg-amber-500/10 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 text-amber-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="block text-3xl font-bold text-white tracking-tight" id="stat-sold-count">
              {config.propertiesSold || '1,250+'}
            </span>
            <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider block mt-1">
              Properties Listed & Sold
            </span>
          </div>

          <div className="p-6 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-xl text-center group hover:border-amber-500/20 transition-all">
            <div className="bg-amber-500/10 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 text-amber-400 group-hover:scale-110 transition-transform">
              <UsersIcon className="w-5 h-5" />
            </div>
            <span className="block text-3xl font-bold text-white tracking-tight" id="stat-happy-clients">
              {config.happyClients || '98%'}
            </span>
            <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider block mt-1">
              Client Satisfaction
            </span>
          </div>

          <div className="p-6 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-xl text-center group hover:border-amber-500/20 transition-all">
            <div className="bg-amber-500/10 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 text-amber-400 group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <span className="block text-3xl font-bold text-white tracking-tight" id="stat-years">
              {config.experienceYears || '18+'}
            </span>
            <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider block mt-1">
              Years Advisory Excellence
            </span>
          </div>

          <div className="p-6 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-xl text-center group hover:border-amber-500/20 transition-all">
            <div className="bg-amber-500/10 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 text-amber-400 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="block text-3xl font-bold text-white tracking-tight" id="stat-cities">
              {config.citiesCovered || '12'}
            </span>
            <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider block mt-1">
              Prime Cities Active
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Inline fallback for mini-users icon
function UsersIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
