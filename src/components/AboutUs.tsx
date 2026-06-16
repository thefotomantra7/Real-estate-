import React from 'react';
import { Target, Eye, ShieldCheck, HeartPulse, Building2, Award } from 'lucide-react';
import { AboutConfig } from '../types';

interface AboutUsProps {
  config: AboutConfig;
}

export default function AboutUs({ config }: AboutUsProps) {
  return (
    <section id="about" className="py-24 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-2">
            The Elite Heritage
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
            About Our Institution
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Aesthetic Showcase Banner Block (col-span-5) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-4 -left-4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl z-0" />
            <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full blur-2xl z-0" />
            
            <div className="relative z-10 space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-zinc-100 dark:border-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80"
                  className="w-full h-[350px] object-cover hover:scale-103 transition-transform duration-700"
                  alt="Elite Office Headquarters"
                  loading="lazy"
                />
              </div>

              {/* Core Badge Experience overlay */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-2xl shadow-xl text-white border border-zinc-800 flex items-center gap-4">
                <div className="p-3 bg-amber-500 text-zinc-950 rounded-xl">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-amber-400 font-mono">18+ Years</h4>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest">Brokerage & Investment Integrity</p>
                </div>
              </div>
            </div>
          </div>

          {/* High Fidelity Text & Principles Grid (col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white leading-tight">
              A Legacy Built On Luxury Trust, Diligence, & Dynamic Market Vision
            </h3>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              {config.intro || 'Elite Estate Pro is an award-winning premium property consultancy and premier dealership specializing in off-market residences, ultra-luxury villas, and secure investment grade lands across prime metropolitan and lifestyle hubs.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Mission Card */}
              <div className="p-5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:border-amber-500/20 transition-all flex gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-lg shrink-0 h-fit">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-800 dark:text-white uppercase tracking-wider mb-2">Our Mission</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {config.mission || 'To advise and facilitate wealth creation through meticulously curated land acquisitions, landmark architecture, and stress-free transparent real estate transitions.'}
                  </p>
                </div>
              </div>

              {/* Vision Card */}
              <div className="p-5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:border-amber-500/20 transition-all flex gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-lg shrink-0 h-fit">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-800 dark:text-white uppercase tracking-wider mb-2">Our Vision</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {config.vision || 'To redefine luxury land ownership and high-end brokerage by employing hyper-tailored modern solutions, meticulous legal scanning, and impeccable elite services.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Checkmark factors */}
            <div className="pt-4 space-y-3 border-t border-zinc-100 dark:border-zinc-900">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                Our Advisory Pre-requisites
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {config.experienceText || '100% legal title clearance audit before list boarding.'}
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Zero Hidden margins - absolute invoice transparency.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Fast track municipal documentation & registration.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {config.whyChooseUsText || 'Dedicated personal manager assigned for every acquisition.'}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
