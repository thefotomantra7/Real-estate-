import React from 'react';
import { ShieldAlert, FileText, BadgeCheck, Scale, Award, HeartHandshake } from 'lucide-react';

export default function WhyChooseUs() {
  const highlights = [
    {
      title: 'Verified Properties Only',
      desc: 'Every plot, commercial zone, and villa undergoes a rigorous 30-year dual-counsel title verification search, layout sanity check, and non-encumbrance registry check.',
      icon: <BadgeCheck className="w-6 h-6 text-amber-500" />
    },
    {
      title: '100% Transparent Deals',
      desc: 'Absolute security, fixed fair margins, clear invoices, and direct seller tripartite documentation facilitation with no dark clauses or hidden agency overheads.',
      icon: <Scale className="w-6 h-6 text-amber-500" />
    },
    {
      title: 'Expert Guidance Protocol',
      desc: 'Our senior investment advisors are highly experienced corporate consultants who analyze geographical appreciates and municipal growth vectors for your portfolio.',
      icon: <Award className="w-6 h-6 text-amber-500" />
    },
    {
      title: 'Bespoke Best Pricing',
      desc: 'Direct developer partnerships, off-market listings, and high-value wholesale land banking channels ensure you get absolute base pricing deals.',
      icon: <FileText className="w-6 h-6 text-amber-500" />
    },
    {
      title: 'Fast Track Documentation',
      desc: 'Complete administrative assistance for stamp calculations, drafting of deeds, power-of-attorney layouts, banking clearance, and registry appointments.',
      icon: <ShieldAlert className="w-6 h-6 text-amber-500" />
    },
    {
      title: 'Dedicated Client Support',
      desc: 'A permanent relationship manager assigned to organize VVIP physical site visits, provide weekly construction milestones, and manage ongoing land mutations.',
      icon: <HeartHandshake className="w-6 h-6 text-amber-500" />
    }
  ];

  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      {/* Decorative dark vector elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
            Why Choose Elite Pro
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-white mb-4">
            Demanding Standards, Bulletproof Trust
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded" />
          <p className="text-sm text-zinc-400 mt-4 font-light">
            We operate at the highest levels of brokerage integrity, ensuring your real estate investments are perfectly secure, transparently settled, and highly appreciated.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-zinc-900/40 border border-white/5 rounded-2xl hover:border-amber-500/25 transition-all duration-300 group hover:scale-[1.01]"
            >
              <div className="p-3 bg-amber-500/10 rounded-xl w-fit text-amber-400 mb-6 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
