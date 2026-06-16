import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, ClipboardCheck, AlertCircle } from 'lucide-react';
import { Enquiry } from '../types';

interface EnquiryFormProps {
  prefilledPropertyType?: string;
  prefilledLocation?: string;
  onSubmitSuccess: (enquiry: Enquiry) => void;
}

export default function EnquiryForm({
  prefilledPropertyType = '',
  prefilledLocation = '',
  onSubmitSuccess
}: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    propertyType: '',
    preferredLocation: '',
    budgetRange: '',
    requirement: '',
    message: ''
  });

  const [committed, setCommitted] = useState(false);

  // Sync with props when details trigger modal enquiry
  useEffect(() => {
    if (prefilledPropertyType || prefilledLocation) {
      setFormData(prev => ({
        ...prev,
        propertyType: prefilledPropertyType || prev.propertyType,
        preferredLocation: prefilledLocation || prev.preferredLocation
      }));
    }
  }, [prefilledPropertyType, prefilledLocation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Custom unique id
    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}`,
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      city: formData.city,
      propertyType: formData.propertyType,
      location: formData.preferredLocation,
      budget: formData.budgetRange,
      requirement: formData.requirement,
      message: formData.message,
      date: new Date().toISOString().split('T')[0]
    };

    // Save lead through props handler (puts it into Admin Dashboard instantly!)
    onSubmitSuccess(newEnquiry);
    setCommitted(true);

    // Format WhatsApp pre-filled text
    const textMessage = `Hello, I am interested in a property. Here are my details:
Name: ${formData.name}
Phone: ${formData.mobile}
Email: ${formData.email}
Property Type: ${formData.propertyType}
Budget: ${formData.budgetRange}
Location: ${formData.preferredLocation}
Requirement: ${formData.requirement}
Message: ${formData.message}`;

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/919140345992?text=${encodedText}`;

    // Redirect to WhatsApp desk
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="enquiry-form-section" className="py-24 bg-zinc-900 border-t border-zinc-800 text-white relative">
      <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
        
        {/* Form titles */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-2">
            Private Protocol
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight">
            Acquisition Brief Enquiry Form
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded" />
          <p className="text-sm text-zinc-400 mt-4 max-w-lg mx-auto leading-relaxed">
            Submit your parameters securely below. Upon clicking Submit, you will be redirected to our senior WhatsApp Desk coordinator for instant consultation.
          </p>
        </div>

        {committed ? (
          <div className="p-8 bg-zinc-800/80 border border-amber-500/30 rounded-2xl text-center space-y-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-full w-fit mx-auto">
              <ClipboardCheck className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold">Enquiry Registered Safely!</h3>
            <p className="text-sm text-zinc-300 max-w-md mx-auto">
              We have stored your acquisition brief in the ledger. A WhatsApp window was triggered. If it did not open automatically, click the link below to talk immediately:
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/919140345992?text=${encodeURIComponent(`Hello, I am looking for a property. Name: ${formData.name}`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-lg text-xs tracking-wider uppercase transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp manually</span>
              </a>
            </div>
            <button
              onClick={() => {
                setFormData({
                  name: '',
                  mobile: '',
                  email: '',
                  city: '',
                  propertyType: '',
                  preferredLocation: '',
                  budgetRange: '',
                  requirement: '',
                  message: ''
                });
                setCommitted(false);
              }}
              className="text-xs text-zinc-500 hover:text-white underline block mx-auto mt-4"
            >
              Submit another query
            </button>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit} 
            className="bg-zinc-950/80 border border-white/5 p-6 sm:p-10 rounded-2xl shadow-2xl space-y-6"
            id="premium-enquiry-form"
          >
            {/* Group 1: Personal Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2 font-mono">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Vikramaditya Singh"
                  className="w-full px-4 py-3 bg-zinc-900 border border-white/10 focus:border-amber-500 rounded-lg text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2 font-mono">
                  Mobile Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="e.g. +91 91403 XXXXX"
                  className="w-full px-4 py-3 bg-zinc-900 border border-white/10 focus:border-amber-500 rounded-lg text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2 font-mono">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. v.singh@corporate.com"
                  className="w-full px-4 py-3 bg-zinc-900 border border-white/10 focus:border-amber-500 rounded-lg text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2 font-mono">
                  Your Current City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Hyderabad / London"
                  className="w-full px-4 py-3 bg-zinc-900 border border-white/10 focus:border-amber-500 rounded-lg text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Group 2: Property Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2 font-mono">
                  Property Asset Type *
                </label>
                <select
                  name="propertyType"
                  required
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-white/10 focus:border-amber-500 rounded-lg text-sm text-white focus:outline-none"
                >
                  <option value="">Select Type</option>
                  <option value="Residential Plot">Residential Plot</option>
                  <option value="Commercial Plot">Commercial Plot</option>
                  <option value="Villa">Villa & Mansion</option>
                  <option value="Apartment">Apartment / Penthouse</option>
                  <option value="Farmhouse">Farmhouse Estate</option>
                  <option value="Agricultural Land">Agricultural Land</option>
                  <option value="Investment Property">Investment Property</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2 font-mono">
                  Preferred Location *
                </label>
                <input
                  type="text"
                  name="preferredLocation"
                  required
                  value={formData.preferredLocation}
                  onChange={handleChange}
                  placeholder="e.g. Sector 54 / Jubilee Hills"
                  className="w-full px-4 py-3 bg-zinc-900 border border-white/10 focus:border-amber-500 rounded-lg text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2 font-mono">
                  Your Budget Range *
                </label>
                <select
                  name="budgetRange"
                  required
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-white/10 focus:border-amber-500 rounded-lg text-sm text-white focus:outline-none"
                >
                  <option value="">Select Budget</option>
                  <option value="Under ₹1.0 Crore">Under ₹1.0 Crore</option>
                  <option value="₹1.0 Crore - ₹3.0 Crore">₹1.0 Crore - ₹3.0 Crore</option>
                  <option value="₹3.0 Crore - ₹5.0 Crore">₹3.0 Crore - ₹5.0 Crore</option>
                  <option value="₹5.0 Crore - ₹10.0 Crore">₹5.0 Crore - ₹10.0 Crore</option>
                  <option value="₹10.0 Crore+">₹10.0 Crore+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2 font-mono">
                Property Plot / Construction Requirement
              </label>
              <input
                type="text"
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
                placeholder="e.g. 500 Sq.yds East Facing corner lot with wide roads"
                className="w-full px-4 py-3 bg-zinc-900 border border-white/10 focus:border-amber-500 rounded-lg text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2 font-mono">
                Secretariat Instructions (Optional Message)
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Brief our desk regarding the deal timelines, corporate structures, or off-market protocols."
                className="w-full px-4 py-3 bg-zinc-900 border border-white/10 focus:border-amber-500 rounded-lg text-sm text-white focus:outline-none resize-none transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-black tracking-widest text-xs uppercase rounded-lg shadow-lg hover:shadow-amber-500/10 hover:scale-[1.01] transform transition-all flex items-center justify-center space-x-2 cursor-pointer"
                id="submit-enquiry-btn"
              >
                <Send className="w-4 h-4" />
                <span>Submit Acquisition Enquiry & Whatsapp</span>
              </button>
            </div>

            {/* Spam disclaimer protection warning line */}
            <div className="flex justify-center items-center gap-1.5 text-[10px] text-zinc-500 select-none">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>SPAM PROTECTION: Secure ledger active. No unsolicited sharing.</span>
            </div>
          </form>
        )}

      </div>
    </section>
  );
}
