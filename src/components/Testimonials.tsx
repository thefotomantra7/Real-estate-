import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TestimonialItem } from '../types';

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const current = testimonials[activeIdx];

  return (
    <section className="py-24 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-2">
            Patron Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
            Client Verification
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl mx-auto">
            Honest experiences told directly by high-end investors, corporate leaders, and elite families who found clarity with us.
          </p>
        </div>

        {/* Carousel Visual Box */}
        <div id="testimonial-carousel" className="max-w-4xl mx-auto relative px-4 sm:px-12 py-10 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 rounded-3xl shadow-xl">
          <div className="absolute top-6 left-6 text-amber-500/20">
            <Quote className="w-20 h-20 rotate-180" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            {/* Rating Stars */}
            <div className="flex space-x-1 justify-center text-amber-400">
              {Array.from({ length: current.rating || 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            {/* Testimonial Quote Speech */}
            <p className="text-base sm:text-lg md:text-xl font-light text-zinc-700 dark:text-zinc-300 leading-relaxed italic max-w-2xl mx-auto">
              "{current.review}"
            </p>

            {/* Client Profile Details */}
            <div className="flex flex-col items-center space-y-2 mt-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500/30 shadow">
                <img
                  src={current.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                  className="w-full h-full object-cover"
                  alt={current.name}
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">{current.name}</h4>
                <p className="text-[10px] text-zinc-400 font-semibold uppercase mt-0.5">{current.role || 'Grateful Patron'}</p>
              </div>
            </div>
          </div>

          {/* Nav Controls Left/Right */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 hover:text-amber-500 hover:border-amber-500 dark:hover:text-amber-400 shadow-md transition-all cursor-pointer"
            id="testimonial-prev-btn"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 hover:text-amber-500 hover:border-amber-500 dark:hover:text-amber-400 shadow-md transition-all cursor-pointer"
            id="testimonial-next-btn"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8 z-10 relative">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === activeIdx ? 'bg-amber-500 w-6' : 'bg-zinc-300 dark:bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
