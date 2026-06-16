import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesProps {
  services: ServiceItem[];
}

export default function Services({ services }: ServicesProps) {
  // Dynamically map a string name to a Lucide Icon component
  const renderIcon = (iconName: string) => {
    // Standardize casing or match exactly
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-6 h-6 text-amber-500" />;
    }
    // Fallbacks based on common names
    if (iconName === 'Home') return <LucideIcons.Home className="w-6 h-6 text-amber-500" />;
    if (iconName === 'TrendingUp') return <LucideIcons.TrendingUp className="w-6 h-6 text-amber-500" />;
    if (iconName === 'PieChart') return <LucideIcons.PieChart className="w-6 h-6 text-amber-500" />;
    if (iconName === 'Users') return <LucideIcons.Users className="w-6 h-6 text-amber-500" />;
    if (iconName === 'ShieldCheck') return <LucideIcons.ShieldCheck className="w-6 h-6 text-amber-500" />;
    if (iconName === 'MapPin') return <LucideIcons.MapPin className="w-6 h-6 text-amber-500" />;
    
    return <LucideIcons.Sparkles className="w-6 h-6 text-amber-500" />;
  };

  return (
    <section id="services" className="py-24 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-2">
            Professional Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
            Our Elite Services
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl mx-auto uppercase tracking-wider">
            Premium corporate solutions mapped to custom lifestyle layouts.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((ser, idx) => (
            <div
              key={ser.id || idx}
              className="bg-white dark:bg-zinc-950 p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow hover:shadow-xl hover:border-amber-500/20 transform hover:-translate-y-0.5 transition-all duration-350 flex flex-col group"
            >
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl w-fit mb-6 group-hover:scale-105 transition-transform">
                {renderIcon(ser.icon)}
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-amber-500 transition-colors">
                {ser.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light flex-grow">
                {ser.desc}
              </p>
              
              <div className="mt-6 flex items-center text-xs font-bold text-amber-500 uppercase tracking-wider gap-1 cursor-pointer">
                <span>Learn Protocol</span>
                <span className="group-hover:translate-x-1 transform transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
