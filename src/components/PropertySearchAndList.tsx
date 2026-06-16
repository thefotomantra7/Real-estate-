import React, { useState, useMemo } from 'react';
import { Search, MapPin, Layers, Heart, ArrowLeftRight, ClipboardCheck, ArrowRight, X, Phone, MessageSquare, ShieldCheck, Tag } from 'lucide-react';
import { Property, SearchFilters } from '../types';

interface PropertySearchAndListProps {
  properties: Property[];
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  compareList: string[];
  toggleCompare: (id: string) => void;
  onEnquireClick: (property: Property) => void;
}

export function formatCurrencyText(value: number): string {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} Lakh`;
  }
  return `₹${value.toLocaleString('en-IN')}`;
}

export default function PropertySearchAndList({
  properties,
  wishlist,
  toggleWishlist,
  compareList,
  toggleCompare,
  onEnquireClick
}: PropertySearchAndListProps) {
  // Search Filters State
  const [filters, setFilters] = useState<SearchFilters>({
    searchQuery: '',
    propertyType: '',
    location: '',
    budgetMin: '',
    budgetMax: '',
    plotSize: '',
    status: ''
  });

  // Selected property for view detail modal
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentModalImageIdx, setCurrentModalImageIdx] = useState(0);

  // Derive unique locations for the filter list
  const uniqueLocations = useMemo(() => {
    const locations = properties.map(p => {
      // Split by comma to extract main city / sector
      const parts = p.location.split(',');
      return parts[parts.length - 1].trim();
    });
    return Array.from(new Set(locations));
  }, [properties]);

  // Handle input changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset Filters
  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      propertyType: '',
      location: '',
      budgetMin: '',
      budgetMax: '',
      plotSize: '',
      status: ''
    });
  };

  // Main filter calculation - updates instantly!
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      // Search term (matches title or location or description)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchTitle = prop.title.toLowerCase().includes(query);
        const matchLoc = prop.location.toLowerCase().includes(query);
        const matchDesc = prop.description.toLowerCase().includes(query);
        if (!matchTitle && !matchLoc && !matchDesc) return false;
      }

      // Property Type
      if (filters.propertyType && prop.type !== filters.propertyType) {
        return false;
      }

      // Location match
      if (filters.location) {
        const locQuery = filters.location.toLowerCase();
        if (!prop.location.toLowerCase().includes(locQuery)) return false;
      }

      // Budget Min (INR)
      if (filters.budgetMin) {
        const minVal = parseFloat(filters.budgetMin);
        if (prop.price < minVal) return false;
      }

      // Budget Max (INR)
      if (filters.budgetMax) {
        const maxVal = parseFloat(filters.budgetMax);
        if (prop.price > maxVal) return false;
      }

      // Plot Size / Area Filter
      if (filters.plotSize) {
        const minArea = parseInt(filters.plotSize);
        if (!isNaN(minArea) && prop.area < minArea) return false;
      }

      // Status Filter
      if (filters.status && prop.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [properties, filters]);

  // Open modal handler
  const handleOpenDetails = (prop: Property) => {
    setSelectedProperty(prop);
    setCurrentModalImageIdx(0);
  };

  return (
    <section id="properties" className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-2">
            Elite Portfolios
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
            Featured Luxury Properties
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 max-w-2xl mx-auto">
            Explore our curated database of hyper-verified luxurious ready estates, sprawling agricultural lands, farmhouses, and strategic plots.
          </p>
        </div>

        {/* Dynamic Advance Filter Search Bar */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl mb-12 relative z-20">
          <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-500" />
            Advanced Property Concierge Search
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Input query matching */}
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Search Keyword</label>
              <div className="relative">
                <input
                  type="text"
                  name="searchQuery"
                  value={filters.searchQuery}
                  onChange={handleFilterChange}
                  placeholder="e.g. Garden, Penthouse, Jubilee..."
                  className="w-full pl-9 pr-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-colors"
                />
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Property Type</label>
              <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleFilterChange}
                className="w-full px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
              >
                <option value="">All Categories</option>
                <option value="Residential Plot">Residential Plot</option>
                <option value="Commercial Plot">Commercial Plot</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Farmhouse">Farmhouse</option>
                <option value="Agricultural Land">Agricultural Land</option>
                <option value="Investment Property">Investment Property</option>
              </select>
            </div>

            {/* Location Selector */}
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Primary City</label>
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
              >
                <option value="">All Cities / Regions</option>
                {uniqueLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Budget Maximum Filter */}
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Max Budget</label>
              <select
                name="budgetMax"
                value={filters.budgetMax}
                onChange={handleFilterChange}
                className="w-full px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
              >
                <option value="">Any Budget</option>
                <option value="10000000">Under ₹1.0 Crore</option>
                <option value="30000000">Under ₹3.0 Crore</option>
                <option value="50000000">Under ₹5.0 Crore</option>
                <option value="100000000">Under ₹10.0 Crore</option>
                <option value="150000000">Under ₹15.0 Crore</option>
                <option value="250000000">Under ₹25.0 Crore</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            {/* Plot Size (Min Area) */}
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Min Lot Size (Sq.ft)</label>
              <input
                type="number"
                name="plotSize"
                value={filters.plotSize}
                onChange={handleFilterChange}
                placeholder="e.g. 4000"
                className="w-full px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Available Status */}
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Listing Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-amber-500"
              >
                <option value="">All Listings</option>
                <option value="available">Available Only</option>
                <option value="reserved">Reserved Only</option>
                <option value="sold">Sold Out</option>
              </select>
            </div>

            {/* Reset Actions */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full py-2.5 text-zinc-500 hover:text-amber-500 text-xs font-bold tracking-wider uppercase border border-zinc-200 dark:border-zinc-700 hover:border-amber-500 rounded-lg transition-all"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Instantly Updated Listing Counter */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
            Showing <span className="text-zinc-950 dark:text-white font-bold">{filteredProperties.length}</span> luxury properties
          </p>
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-zinc-400 tracking-wider">Live Inventory Synchronized</span>
          </div>
        </div>

        {/* Main Properties Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl shadow">
            <Layers className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">No estates match your criteria</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-md mx-auto">
              Please modify your budget settings, scale factors, or query term. Alternatively, dial our private desk for custom acquisition queries.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 px-6 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map(prop => {
              const isWishlisted = wishlist.includes(prop.id);
              const isCompareListed = compareList.includes(prop.id);

              return (
                <div
                  key={prop.id}
                  className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800/80 shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Card Image Area with glass status labels */}
                  <div className="relative h-64 overflow-hidden bg-zinc-100 dark:bg-zinc-950">
                    <img
                      src={prop.images[0] || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80'}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                      loading="lazy"
                    />

                    {/* Status badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-950/80 text-amber-400 backdrop-blur-md rounded-md shadow">
                        {prop.type}
                      </span>
                      {prop.verified && (
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/90 text-white backdrop-blur-md rounded-md shadow flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> VERIFIED
                        </span>
                      )}
                    </div>

                    {/* Available/Sold status badge top-right */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md shadow-md backdrop-blur-md text-white ${
                        prop.status === 'available' ? 'bg-amber-600/90' :
                        prop.status === 'reserved' ? 'bg-sky-600/90' : 'bg-rose-600/90'
                      }`}>
                        {prop.status}
                      </span>
                    </div>

                    {/* Action Circle toggles bottom-right */}
                    <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
                      {/* Compare toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompare(prop.id);
                        }}
                        className={`p-2 rounded-full border shadow transition-all ${
                          isCompareListed
                            ? 'bg-amber-500 border-amber-500 text-zinc-950'
                            : 'bg-white/80 hover:bg-white dark:bg-zinc-900/80 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100'
                        }`}
                        title={isCompareListed ? "Remove from comparison" : "Add to comparison spec list"}
                      >
                        <ArrowLeftRight className="w-4 h-4" />
                      </button>

                      {/* Wishlist toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(prop.id);
                        }}
                        className={`p-2 rounded-full border shadow transition-all ${
                          isWishlisted
                            ? 'bg-rose-500 border-rose-500 text-white'
                            : 'bg-white/80 hover:bg-white dark:bg-zinc-900/80 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100'
                        }`}
                        title={isWishlisted ? "Remove from my wishlist" : "Add to my wishlist"}
                      >
                        <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {/* Real estate featured badge */}
                    {prop.featured && (
                      <div className="absolute bottom-4 left-4 z-10">
                        <span className="px-2 py-0.5 text-[9px] font-bold tracking-[0.15em] bg-yellow-500/90 text-zinc-950 rounded flex items-center gap-1 shadow-sm">
                          FEATURED LUXURY
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Property Brief Specifications Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-bold text-amber-600 dark:text-amber-400 font-mono">
                        {formatCurrencyText(prop.price)}
                      </span>
                      <span className="text-xs text-zinc-400 font-semibold font-mono uppercase">
                        {prop.area.toLocaleString('en-IN')} Sq.Ft
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                      {prop.title}
                    </h3>

                    {/* Location and pins */}
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-1.5 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{prop.location}</span>
                    </p>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4 flex-grow">
                      {prop.description}
                    </p>

                    {/* Metadata indicators: Beds, Baths, Size */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-zinc-100 dark:border-zinc-800 mb-5 text-[11px] text-zinc-500 font-mono">
                      <div className="text-center">
                        <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">
                          {prop.bedrooms ? `${prop.bedrooms} BHK` : 'N/A'}
                        </span>
                        Type (BHK)
                      </div>
                      <div className="text-center border-l border-r border-zinc-100 dark:border-zinc-800">
                        <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">
                          {prop.plotSize ? prop.plotSize : 'N/A'}
                        </span>
                        Plot Size
                      </div>
                      <div className="text-center">
                        <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 font-sans">
                          {prop.facing ? prop.facing : 'N/A'}
                        </span>
                        Facing
                      </div>
                    </div>

                    {/* Actions button */}
                    <button
                      onClick={() => handleOpenDetails(prop)}
                      className="w-full py-2.5 bg-zinc-950 dark:bg-zinc-800 hover:bg-amber-500 dark:hover:bg-amber-500 text-white dark:text-white hover:text-zinc-950 font-bold text-xs tracking-wider uppercase rounded-lg transition-all flex items-center justify-center space-x-1.5"
                    >
                      <span>View Premium Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Luxury Property Detail & Lightbox Modal */}
      {selectedProperty && (
        <div 
          id="eep-detail-modal" 
          className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProperty(null)}
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-zinc-100 dark:border-zinc-800 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-zinc-950/80 hover:bg-zinc-950 text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Media Showcase Gallery */}
            <div className="relative h-64 md:h-96 bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
              <img
                src={selectedProperty.images[currentModalImageIdx] || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'}
                alt={`${selectedProperty.title} view`}
                className="w-full h-full object-cover"
              />

              {/* Status and category badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pt-4 pl-4">
                <span className="px-2.5 py-1 text-[10px] font-bold bg-amber-500 text-zinc-950 rounded uppercase tracking-wider">
                  {selectedProperty.type}
                </span>
                {selectedProperty.verified && (
                  <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-500 text-white rounded flex items-center gap-1 w-max">
                    <ShieldCheck className="w-3" /> VERIFIED
                  </span>
                )}
              </div>

              {/* Dot navigation controls */}
              {selectedProperty.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10 bg-zinc-950/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {selectedProperty.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentModalImageIdx(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === currentModalImageIdx ? 'bg-amber-500 w-5' : 'bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Selection */}
            {selectedProperty.images.length > 1 && (
              <div className="flex gap-2 p-4 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-700 overflow-x-auto">
                {selectedProperty.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentModalImageIdx(idx)}
                    className={`w-16 h-12 rounded overflow-hidden border-2 shrink-0 transition-all ${
                      idx === currentModalImageIdx ? 'border-amber-500 scale-102 shadow' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            )}

            {/* Specifications Information Grid & Inquiry Request Trigger */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Core Details (Left Column, col-span-2) */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 text-[9px] font-bold tracking-[0.12em] rounded uppercase text-white ${
                      selectedProperty.status === 'available' ? 'bg-emerald-600' :
                      selectedProperty.status === 'reserved' ? 'bg-sky-600' : 'bg-rose-600'
                    }`}>
                      {selectedProperty.status}
                    </span>
                    <span className="text-zinc-400 font-mono text-xs uppercase tracking-wider">
                      ID: {selectedProperty.id}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mt-2">
                    {selectedProperty.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm flex items-center gap-1.5 mt-2">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{selectedProperty.location}</span>
                  </p>
                </div>

                <div className="flex items-baseline gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">Premium Investment:</span>
                  <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
                    {formatCurrencyText(selectedProperty.price)}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest mb-2.5">
                    Description & Specifications
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                    {selectedProperty.description}
                  </p>
                </div>

                {/* Extended specification table layout */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl text-center">
                  <div className="p-2 border-r border-zinc-200 dark:border-zinc-700 last:border-0">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-1">Total Lot Size</span>
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 font-mono">
                      {selectedProperty.area.toLocaleString('en-IN')} sq.ft
                    </span>
                  </div>

                  <div className="p-2 sm:border-r border-zinc-200 dark:border-zinc-700 last:border-0">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-1">Type Layout</span>
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                      {selectedProperty.bedrooms ? `${selectedProperty.bedrooms} BHK` : 'Commercial/Plot'}
                    </span>
                  </div>

                  <div className="p-2 border-r border-zinc-200 dark:border-zinc-700 last:border-0">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-1">Plot Width</span>
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 font-mono">
                      {selectedProperty.plotSize || 'Standard'}
                    </span>
                  </div>

                  <div className="p-2 last:border-0">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-1">Direction</span>
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                      {selectedProperty.facing || 'East Facing'}
                    </span>
                  </div>
                </div>

                {/* Highlight parameters check */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-500">
                  <p className="flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-emerald-500" /> Title verified & dual-audited by independent counsel
                  </p>
                  <p className="flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-emerald-500" /> Immediate registry and mutation facilities active
                  </p>
                  <p className="flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-emerald-500" /> All layout municipal approvals pre-vetted
                  </p>
                  <p className="flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-emerald-500" /> Road asphalt layout with premium storm drain channels
                  </p>
                </div>
              </div>

              {/* Sidebar Actions Call Box (Right Column) */}
              <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50 rounded-xl p-5 space-y-5 h-fit">
                <div className="text-center">
                  <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-wider">
                    Secured Dealings
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Book an immediate physical tour or legal evaluation.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      onEnquireClick(selectedProperty);
                      setSelectedProperty(null);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-bold uppercase tracking-wider text-xs rounded-lg shadow-md transition-all flex items-center justify-center space-x-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Inquiry Form</span>
                  </button>

                  <a
                    href="tel:+919140345992"
                    className="w-full py-3 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-bold border border-zinc-200 dark:border-zinc-700 text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Phone className="w-4 h-4 text-amber-500" />
                    <span>Call Private Desk</span>
                  </a>
                </div>

                <hr className="border-zinc-200 dark:border-zinc-700" />

                <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-700">
                  <span className="text-[10px] font-bold text-amber-500 tracking-widest uppercase block mb-1">
                    Direct Contact details
                  </span>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">Deals Desk: +91 91403 45992</p>
                  <p className="text-xs text-zinc-400">WhatsApp: Active 24/7</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
