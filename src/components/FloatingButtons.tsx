import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

interface FloatingButtonsProps {
  whatsappNumber?: string;
  phoneNumber?: string;
}

export default function FloatingButtons({
  whatsappNumber = '+919140345992',
  phoneNumber = '+919140345992'
}: FloatingButtonsProps) {
  // Format WhatsApp Link
  const whatsAppMessage = 'Hello, I am visiting the Elite Estate Pro platform and would like to speak to an acquisition advisor.';
  const encodedMsg = encodeURIComponent(whatsAppMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\s+/g, '')}?text=${encodedMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3.5 select-none animate-bounce-slow">
      {/* WhatsApp Floating trigger */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="p-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer border border-emerald-400 group relative"
        title="Chat on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <MessageSquare className="w-6 h-6" />
        
        {/* Hover label */}
        <span className="absolute right-14 bg-emerald-500 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          WhatsApp Advisory Desk
        </span>
      </a>

      {/* Call Now Floating Trigger */}
      <a
        href={`tel:${phoneNumber}`}
        className="p-3.5 bg-zinc-950 hover:bg-amber-600 text-amber-500 hover:text-zinc-950 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer border border-amber-500/40 group relative"
        title="Call Support Now"
        id="floating-call-btn"
      >
        <Phone className="w-6 h-6" />

        {/* Hover label */}
        <span className="absolute right-14 bg-zinc-950 border border-amber-500/20 text-amber-400 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Dial Executive Protocol
        </span>
      </a>
    </div>
  );
}
