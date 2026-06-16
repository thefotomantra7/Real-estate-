import React from 'react';
import { Phone, Mail, MapPin, Building2, Globe, Heart } from 'lucide-react';
import { ContactConfig } from '../types';

interface ContactSectionProps {
  config: ContactConfig;
  onAdminClick: () => void;
  brandName?: string;
}

export default function ContactSection({ config, onAdminClick, brandName = 'Elite Estate Pro' }: ContactSectionProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-zinc-950 text-white border-t border-zinc-900 pt-24 relative overflow-hidden transition-colors">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Info Cards + Live Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-900">
          
          {/* Corporate Brief (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 text-zinc-950 rounded-lg">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-wide uppercase">
                  {brandName}
                </span>
                <p className="text-[9px] text-zinc-500 tracking-[0.2em] uppercase font-semibold">
                  Luxury Brokerage Group
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              We advising and brokered the finest high-appreciations off-market plots, smart villas, and corporate land banks with absolute zero-error legal title parameters.
            </p>

            <div className="space-y-3.5 pt-4 text-xs">
              <a
                href={`tel:${config.phone || '+919140345992'}`}
                className="flex items-center gap-3 text-zinc-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>Deals: {config.phone || '+91 91403 45992'}</span>
              </a>

              <a
                href={`mailto:${config.email || 'deals@eliteestatepro.com'}`}
                className="flex items-center gap-3 text-zinc-300 hover:text-amber-400 transition-colors shrink-1 truncate"
              >
                <Mail className="w-4 h-4 text-amber-500" />
                <span>Office: {config.email || 'deals@eliteestatepro.com'}</span>
              </a>

              <div className="flex items-start gap-3 text-zinc-300">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-light">
                  {config.address || 'Zenith Towers, Sector 54, Gurugram, India'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Nav Lists (col-span-3) */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4 text-xs">
            <div>
              <h4 className="font-bold text-white uppercase tracking-widest mb-4">Portfolios</h4>
              <ul className="space-y-2.5 text-zinc-400 font-light">
                <li><a href="#properties" className="hover:text-amber-400 transition-colors">Residential Plots</a></li>
                <li><a href="#properties" className="hover:text-amber-400 transition-colors">Commercial Lands</a></li>
                <li><a href="#properties" className="hover:text-amber-400 transition-colors">Luxury Villas</a></li>
                <li><a href="#properties" className="hover:text-amber-400 transition-colors">Exclusive Mansions</a></li>
                <li><a href="#properties" className="hover:text-amber-400 transition-colors">Modern Apartments</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-widest mb-4">Resources</h4>
              <ul className="space-y-2.5 text-zinc-400 font-light">
                <li><a href="#about" className="hover:text-amber-400 transition-colors">About Story</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Our Protocol</a></li>
                <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Client Gallery</a></li>
                <li><a href="#faq" className="hover:text-amber-400 transition-colors">FAQs</a></li>
                <li><button onClick={onAdminClick} className="hover:text-amber-400 transition-colors text-left">Admin Login</button></li>
              </ul>
            </div>
          </div>

          {/* Map Display Frame (col-span-5) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Live Headquarters Coordinates
            </h4>
            <div className="relative rounded-xl overflow-hidden border border-zinc-800 h-48 sm:h-52 z-10">
              <iframe
                title="Elite Office Google Map"
                src={config.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14034.90835150821!2d77.1009!3d28.4234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d21ffab000000%3A0x67ee69b59695de93!2sGolf%20Course%20Road%20Sector%2054%20Gurugram!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'}
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-[10px] text-zinc-500 font-mono flex items-center justify-between">
              <span>LAT: 28.4234° N, LONG: 77.1009° E</span>
              <span>Open Desk 09:00 - 19:30</span>
            </p>
          </div>

        </div>

        {/* Legal Footer Bottom */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 space-y-4 md:space-y-0 select-none">
          <div>
            <p>© {currentYear} {brandName} Brokerage. All rights reserved globally.</p>
            <p className="text-[10px] text-zinc-600 mt-1">Sitemap Index • Privacy Charter • RERA Approved Dealer Status Cert</p>
          </div>

          <div className="flex items-center space-x-6">
            {/* Admin Desk login shortcut */}
            <span 
              onClick={onAdminClick}
              className="hover:text-amber-500 cursor-pointer transition-colors border-r border-zinc-800 pr-5"
            >
              System Desk Login
            </span>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-amber-500" fill="currentColor" />
              <span>for Elite Living</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
