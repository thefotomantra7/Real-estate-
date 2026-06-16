import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQProps {
  faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  const [openIdx, setOpenIdx] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenIdx((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-2">
            Clear Logistics
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
            Frequently Asked Queries
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl mx-auto">
            Everything you need to understand regarding luxury property verification, NRI facilitation protocols, and legal clearances.
          </p>
        </div>

        {/* Expandable Accordion List */}
        <div className="space-y-4">
          {faqs.map((item) => {
            const isOpen = openIdx === item.id;

            return (
              <div
                key={item.id}
                className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/40 transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-zinc-900 dark:text-zinc-100 hover:text-amber-500 dark:hover:text-amber-400 focus:outline-none transition-colors duration-200 cursor-pointer"
                  id={`faq-btn-${item.id}`}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-sm sm:text-base">{item.question}</span>
                  </div>
                  <div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-amber-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-400" />
                    )}
                  </div>
                </button>

                {/* Transition sliding content */}
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light border-t border-zinc-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/20">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Floating Call Assistance prompt */}
        <div className="mt-12 text-center p-6 bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Have a custom query regarding layout mutations or tax regulations?
          </p>
          <a
            href="tel:+919140345992"
            className="text-amber-500 font-bold text-xs uppercase tracking-wider block mt-2 hover:underline"
          >
            Direct dial: +91 91403 45992
          </a>
        </div>

      </div>
    </section>
  );
}
