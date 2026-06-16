import React, { useState } from 'react';
import {
  Lock, Key, ShieldCheck, AreaChart, LayoutGrid, FileSpreadsheet, Settings,
  Plus, Edit, Trash2, LogOut, Download, Check, AlertCircle, Save, HelpCircle,
  Home, TrendingUp, Sparkles, Building, Trash
} from 'lucide-react';
import { Property, WebConfig, Enquiry, ServiceItem, FAQItem, TestimonialItem } from '../types';
import { formatCurrencyText } from './PropertySearchAndList';

interface AdminPanelProps {
  properties: Property[];
  onPropertiesChange: (updated: Property[]) => void;
  webConfig: WebConfig;
  onWebConfigChange: (updated: WebConfig) => void;
  enquiries: Enquiry[];
  onEnquiriesChange: (updated: Enquiry[]) => void;
  onClose: () => void;
}

type AdminTab = 'analytics' | 'properties' | 'leads' | 'cms';

export default function AdminPanel({
  properties,
  onPropertiesChange,
  webConfig,
  onWebConfigChange,
  enquiries,
  onEnquiriesChange,
  onClose
}: AdminPanelProps) {
  // Authorization State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active sub-tab state
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');

  // Properties CRUD State
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAddingNewProperty, setIsAddingNewProperty] = useState(false);
  const [crudNotification, setCrudNotification] = useState('');

  // CMS Section Active State
  const [activeCmsSection, setActiveCmsSection] = useState<'hero' | 'about' | 'services' | 'testimonials' | 'faq' | 'contact'>('hero');

  // Form states matching types
  const [propForm, setPropForm] = useState({
    title: '',
    location: '',
    price: 0,
    area: 0,
    type: 'Villa' as Property['type'],
    status: 'available' as Property['status'],
    featured: false,
    verified: true,
    images: [] as string[],
    imageUrlInput: '',
    description: '',
    bedrooms: 4,
    bathrooms: 4,
    plotSize: '',
    facing: 'East'
  });

  // Handle Admin Authorization
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'elitepro') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect Security Passcode. Access Refused.');
    }
  };

  // Export Leads to CSV / Excel compatible download
  const handleExportLeads = () => {
    if (enquiries.length === 0) return;

    // Header Titles
    const csvRows = [
      ['Lead ID', 'Name', 'Mobile Number', 'Email Address', 'City', 'Property Type', 'Preferred Location', 'Budget Range', 'Requirement Message', 'Submission Date']
    ];

    enquiries.forEach((enq) => {
      csvRows.push([
        enq.id,
        enq.name.replace(/,/g, ' '),
        enq.mobile,
        enq.email,
        enq.city,
        enq.propertyType,
        enq.location.replace(/,/g, ' '),
        enq.budget,
        enq.requirement.replace(/,/g, ' ') + ' ' + enq.message.replace(/,/g, ' '),
        enq.date
      ]);
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((r) => r.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', encodedUri);
    downloadLink.setAttribute('download', `elite_estate_pro_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Property CRUD actions
  const startEditProperty = (prop: Property) => {
    setEditingProperty(prop);
    setIsAddingNewProperty(false);
    setPropForm({
      title: prop.title,
      location: prop.location,
      price: prop.price,
      area: prop.area,
      type: prop.type,
      status: prop.status,
      featured: prop.featured,
      verified: prop.verified,
      images: [...prop.images],
      imageUrlInput: '',
      description: prop.description,
      bedrooms: prop.bedrooms || 0,
      bathrooms: prop.bathrooms || 0,
      plotSize: prop.plotSize || '',
      facing: prop.facing || 'East'
    });
  };

  const startAddProperty = () => {
    setIsAddingNewProperty(true);
    setEditingProperty(null);
    setPropForm({
      title: '',
      location: '',
      price: 15000000,
      area: 2400,
      type: 'Villa',
      status: 'available',
      featured: false,
      verified: true,
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'],
      imageUrlInput: '',
      description: '',
      bedrooms: 3,
      bathrooms: 3,
      plotSize: '40 x 60 feet',
      facing: 'East'
    });
  };

  const handleAddFieldImage = () => {
    if (propForm.imageUrlInput.trim()) {
      setPropForm((prev) => ({
        ...prev,
        images: [...prev.images, prev.imageUrlInput.trim()],
        imageUrlInput: ''
      }));
    }
  };

  const handleRemoveFieldImage = (idx: number) => {
    setPropForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx)
    }));
  };

  const savePropertyCrudForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (isAddingNewProperty) {
      const created: Property = {
        id: `prop-${Date.now()}`,
        title: propForm.title,
        location: propForm.location,
        price: Number(propForm.price),
        area: Number(propForm.area),
        type: propForm.type,
        status: propForm.status,
        featured: propForm.featured,
        verified: propForm.verified,
        images: propForm.images.length > 0 ? propForm.images : ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'],
        description: propForm.description,
        bedrooms: propForm.bedrooms || undefined,
        bathrooms: propForm.bathrooms || undefined,
        plotSize: propForm.plotSize || undefined,
        facing: propForm.facing || undefined
      };

      onPropertiesChange([created, ...properties]);
      setCrudNotification('New luxury estate registered perfectly!');
      setIsAddingNewProperty(false);
    } else if (editingProperty) {
      const updated: Property = {
        id: editingProperty.id,
        title: propForm.title,
        location: propForm.location,
        price: Number(propForm.price),
        area: Number(propForm.area),
        type: propForm.type,
        status: propForm.status,
        featured: propForm.featured,
        verified: propForm.verified,
        images: propForm.images.length > 0 ? propForm.images : editingProperty.images,
        description: propForm.description,
        bedrooms: propForm.bedrooms || undefined,
        bathrooms: propForm.bathrooms || undefined,
        plotSize: propForm.plotSize || undefined,
        facing: propForm.facing || undefined
      };

      onPropertiesChange(properties.map((p) => (p.id === editingProperty.id ? updated : p)));
      setCrudNotification('Property specifications updated and broadcasted!');
      setEditingProperty(null);
    }

    setTimeout(() => setCrudNotification(''), 4000);
  };

  const deletePropertyItem = (id: string) => {
    if (confirm('Are you absolutely certain you want to purge this premium catalog record? This action cannot be reversed.')) {
      onPropertiesChange(properties.filter((p) => p.id !== id));
      setCrudNotification('Property record purged safely.');
      setTimeout(() => setCrudNotification(''), 3000);
    }
  };

  // CMS Content Management Helpers
  const handleCmsTextChange = (section: keyof WebConfig, key: string, value: string) => {
    const updated = { ...webConfig };
    (updated[section] as any)[key] = value;
    onWebConfigChange(updated);
  };

  const handleCmsServiceChange = (idx: number, key: keyof ServiceItem, value: string) => {
    const updated = { ...webConfig };
    updated.services[idx] = { ...updated.services[idx], [key]: value };
    onWebConfigChange(updated);
  };

  const handleCmsFAQChange = (idx: number, key: keyof FAQItem, value: string) => {
    const updated = { ...webConfig };
    updated.faqs[idx] = { ...updated.faqs[idx], [key]: value };
    onWebConfigChange(updated);
  };

  const handleCmsTestimonialChange = (idx: number, key: keyof TestimonialItem, value: any) => {
    const updated = { ...webConfig };
    updated.testimonials[idx] = { ...updated.testimonials[idx], [key]: value };
    onWebConfigChange(updated);
  };

  // Analytics Computation Helpers
  const statTotalVal = properties.length;
  const statActiveVal = properties.filter((p) => p.status === 'available').length;
  const statReservedVal = properties.filter((p) => p.status === 'reserved').length;
  const statSoldVal = properties.filter((p) => p.status === 'sold').length;
  const statLeadsVal = enquiries.length;

  // Derive simple breakdowns for beautiful responsive SVG Charts
  const typeCounts = properties.reduce((acc, p) => {
    acc[p.type] = (acc[p.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-zinc-950 flex items-center justify-center p-4 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/50" />
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            className="w-full h-full object-cover opacity-20 filter grayscale"
            alt=""
          />
        </div>

        {/* Secure Passcode Box container */}
        <div className="relative z-10 w-full max-w-md p-8 bg-zinc-900/90 border border-amber-500/30 rounded-2xl shadow-2xl space-y-6 backdrop-blur-md">
          <div className="text-center space-y-2">
            <div className="p-3 bg-amber-500 text-zinc-950 rounded-full w-fit mx-auto shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold tracking-tight uppercase">
              Elite Backoffice Access
            </h2>
            <p className="text-xs text-zinc-400">
              Only authorized coordinators permitted. Please enter security passcode.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">
                Credential Security Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Secret key..."
                  className="w-full pl-10 pr-3 py-3 bg-zinc-950 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                />
                <Key className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
              </div>
            </div>

            {authError && (
              <p className="text-xs text-rose-500 flex items-center gap-1.5 justify-center">
                <AlertCircle className="w-4 h-4" /> {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-bold uppercase tracking-wider text-xs rounded-lg transition-transform"
            >
              Verify & Unlock
            </button>
          </form>

          <div className="border-t border-white/5 pt-4 text-center ">
            <span className="text-[10px] text-amber-500 uppercase font-mono tracking-widest">
              Security hint: elitepro
            </span>
            <button
              onClick={onClose}
              className="block text-xs text-zinc-500 hover:text-white mx-auto underline mt-3 cursor-pointer"
            >
              Cancel & Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 text-white flex flex-col overflow-hidden animate-fade-in">
      
      {/* Top Admin Header Bar */}
      <header className="px-6 py-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-500 text-zinc-950 rounded-lg font-mono font-black shadow-md flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold tracking-wider uppercase flex items-center gap-1.5">
              SYSTEM OFFICE <span className="text-amber-500">LEDBER</span>
            </h1>
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest -mt-0.5 font-medium">
              Enterprise Level Real Estate Administration
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 text-xs">
          <span className="hidden sm:inline px-2 py-0.5 text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded">
            ROLE: MASTER COORDINATOR
          </span>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="p-1.5 bg-zinc-800 hover:bg-rose-950 text-zinc-400 hover:text-white rounded-lg transition-colors flex items-center gap-1.5"
            title="Log out of Backoffice"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-white text-zinc-950 font-bold uppercase rounded hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Exit Systems
          </button>
        </div>
      </header>

      {/* Main Admin Content Bodysplit */}
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side Tab Drawer Selector */}
        <aside className="w-full md:w-64 bg-zinc-900 border-r border-zinc-800 flex flex-row md:flex-col p-4 gap-2 md:gap-3 shrink-0 overflow-x-auto md:overflow-x-visible">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-left flex items-center gap-3 transition-all truncate cursor-pointer ${
              activeTab === 'analytics' ? 'bg-amber-500 text-zinc-950 shadow-md' : 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <AreaChart className="w-4 h-4" />
            <span>HQ Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('properties')}
            className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-left flex items-center gap-3 transition-all truncate cursor-pointer ${
              activeTab === 'properties' ? 'bg-amber-500 text-zinc-950 shadow-md' : 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Estates Directory</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-left flex items-center gap-3 transition-all truncate cursor-pointer ${
              activeTab === 'leads' ? 'bg-amber-500 text-zinc-950 shadow-md' : 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Lead Ledger</span>
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-left flex items-center gap-3 transition-all truncate cursor-pointer ${
              activeTab === 'cms' ? 'bg-amber-500 text-zinc-950 shadow-md' : 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Website CMS Editor</span>
          </button>
        </aside>

        {/* Right Dynamic View Area */}
        <main className="flex-grow p-6 sm:p-8 overflow-y-auto bg-zinc-950 text-zinc-300">
          
          {crudNotification && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 rounded-xl flex items-center gap-2 text-xs">
              <Check className="w-4 h-4" />
              <span>{crudNotification}</span>
            </div>
          )}

          {/* TAB 1: HQ ANALYTICS DASHBOARD */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              
              {/* Stat Highlights Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-4 bg-zinc-900 border border-white/5 rounded-xl text-center">
                  <span className="block text-2xl font-bold font-mono text-white">{statTotalVal}</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mt-1">Total Properties</span>
                </div>
                <div className="p-4 bg-zinc-900 border border-white/5 rounded-xl text-center">
                  <span className="block text-2xl font-bold font-mono text-emerald-400">{statActiveVal}</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mt-1">Active Listings</span>
                </div>
                <div className="p-4 bg-zinc-900 border border-white/5 rounded-xl text-center">
                  <span className="block text-2xl font-bold font-mono text-sky-400">{statReservedVal}</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mt-1">Reserved Listings</span>
                </div>
                <div className="p-4 bg-zinc-900 border border-white/5 rounded-xl text-center">
                  <span className="block text-2xl font-bold font-mono text-rose-400">{statSoldVal}</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mt-1">Sold Properties</span>
                </div>
                <div className="p-4 bg-zinc-900 border border-white/5 rounded-xl text-center col-span-2 lg:col-span-1">
                  <span className="block text-2xl font-bold font-mono text-amber-400">{statLeadsVal}</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mt-1">Total Enquiries</span>
                </div>
              </div>

              {/* Pure responsive SVG / CSS Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Chart 1: Properties Category Breakdown */}
                <div className="p-6 bg-zinc-900 border border-white/5 rounded-2xl space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest">
                    Real Estate Portfolio Distribution mapping
                  </h3>
                  
                  <div className="space-y-3 pt-2">
                    {Object.entries(typeCounts).map(([type, count]) => {
                      const percentage = Math.min(100, Math.round((count / statTotalVal) * 100));
                      return (
                        <div key={type} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-medium">
                            <span>{type}</span>
                            <span className="font-mono text-amber-400 font-bold">{count} ({percentage}%)</span>
                          </div>
                          
                          <div className="h-2 bg-zinc-850 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Chart 2: Monthly Lead Accumulation Tracker */}
                <div className="p-6 bg-zinc-900 border border-white/5 rounded-2xl space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest">
                    Live Enquiries Intake (Cumulative Dates view)
                  </h3>

                  {enquiries.length === 0 ? (
                    <p className="text-xs text-zinc-500 py-10 text-center">No leads registered to compute graph trends.</p>
                  ) : (
                    <div className="space-y-4 pt-4">
                      {/* Interactive map representing lead frequencies */}
                      {enquiries.slice(0, 5).map((enq, idx) => {
                        return (
                          <div key={idx} className="flex items-center justify-between p-3.5 bg-zinc-950 rounded-lg border border-white/5 text-xs">
                            <div className="space-y-0.5">
                              <p className="font-bold text-zinc-200">{enq.name}</p>
                              <p className="text-[10px] text-zinc-500 text-amber-500/80 font-mono tracking-wider">{enq.propertyType} • {enq.budget}</p>
                            </div>
                            <span className="text-[10px] text-zinc-500 font-mono">{enq.date}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: PROPERTIES DIRECTORY CONTROLLER */}
          {activeTab === 'properties' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                  Properties Directory Index
                </h3>

                <button
                  onClick={startAddProperty}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Luxury Investment Asset</span>
                </button>
              </div>

              {/* CRUD Input form display */}
              {(isAddingNewProperty || editingProperty) && (
                <form 
                  onSubmit={savePropertyCrudForm} 
                  className="bg-zinc-900 border border-amber-500/20 p-6 rounded-2xl shadow-xl space-y-5"
                >
                  <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500">
                    {isAddingNewProperty ? 'Register New Luxury Property parameters' : 'Amend Properties parameters'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Property Title *</label>
                      <input
                        type="text"
                        required
                        value={propForm.title}
                        onChange={(e) => setPropForm({ ...propForm, title: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded focus:border-amber-500 text-xs text-white uppercase focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Coordinates Location *</label>
                      <input
                        type="text"
                        required
                        value={propForm.location}
                        onChange={(e) => setPropForm({ ...propForm, location: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded focus:border-amber-500 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Price (in INR Rupees) *</label>
                      <input
                        type="number"
                        required
                        value={propForm.price}
                        onChange={(e) => setPropForm({ ...propForm, price: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded focus:border-amber-500 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Total Lot Area (Sq.ft) *</label>
                      <input
                        type="number"
                        required
                        value={propForm.area}
                        onChange={(e) => setPropForm({ ...propForm, area: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded focus:border-amber-500 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Asset Category *</label>
                      <select
                        value={propForm.type}
                        onChange={(e: any) => setPropForm({ ...propForm, type: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded focus:border-amber-500 text-xs text-white focus:outline-none"
                      >
                        <option value="Residential Plot">Residential Plot</option>
                        <option value="Commercial Plot">Commercial Plot</option>
                        <option value="Villa">Villa</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Farmhouse">Farmhouse</option>
                        <option value="Agricultural Land">Agricultural Land</option>
                        <option value="Investment Property">Investment Property</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Listing Status *</label>
                      <select
                        value={propForm.status}
                        onChange={(e: any) => setPropForm({ ...propForm, status: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded focus:border-amber-500 text-xs text-white"
                      >
                        <option value="available">Available</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold Out</option>
                      </select>
                    </div>
                  </div>

                  {/* Multiple Images Block */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block font-mono">
                      Property Showcase Images URLs list *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={propForm.imageUrlInput}
                        onChange={(e) => setPropForm({ ...propForm, imageUrlInput: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-grow px-3 py-2 bg-zinc-950 border border-white/10 rounded focus:border-amber-500 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddFieldImage}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded text-xs tracking-wider uppercase font-bold"
                      >
                        Add URL
                      </button>
                    </div>

                    {/* Active URL images preview */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {propForm.images.map((img, idx) => (
                        <div key={idx} className="relative w-16 h-12 rounded overflow-hidden border border-white/10 group">
                          <img src={img} className="w-full h-full object-cover" alt="" />
                          <button
                            type="button"
                            onClick={() => handleRemoveFieldImage(idx)}
                            className="absolute inset-0 bg-rose-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Bedrooms count</label>
                      <input
                        type="number"
                        value={propForm.bedrooms}
                        onChange={(e) => setPropForm({ ...propForm, bedrooms: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded focus:border-amber-500 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Bathrooms count</label>
                      <input
                        type="number"
                        value={propForm.bathrooms}
                        onChange={(e) => setPropForm({ ...propForm, bathrooms: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded focus:border-amber-500 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Plot Width Size</label>
                      <input
                        type="text"
                        value={propForm.plotSize}
                        onChange={(e) => setPropForm({ ...propForm, plotSize: e.target.value })}
                        placeholder="e.g. 50x80"
                        className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded focus:border-amber-500 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Facing Orientation</label>
                      <input
                        type="text"
                        value={propForm.facing}
                        onChange={(e) => setPropForm({ ...propForm, facing: e.target.value })}
                        placeholder="e.g. North-East"
                        className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded focus:border-amber-500 text-xs text-white hover:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-6 py-2 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={propForm.featured}
                        onChange={(e) => setPropForm({ ...propForm, featured: e.target.checked })}
                        className="accent-amber-500 h-4 w-4"
                      />
                      <span>Mark Highlight Featured Asset</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={propForm.verified}
                        onChange={(e) => setPropForm({ ...propForm, verified: e.target.checked })}
                        className="accent-amber-500 h-4 w-4"
                      />
                      <span>Municipal Title Verification Certified</span>
                    </label>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Detailed description *</label>
                    <textarea
                      rows={3}
                      required
                      value={propForm.description}
                      onChange={(e) => setPropForm({ ...propForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded focus:border-amber-500 text-xs text-white resize-none"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Commit specs state to Ledger</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNewProperty(false);
                        setEditingProperty(null);
                      }}
                      className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs uppercase tracking-widest font-bold rounded-lg"
                    >
                      Dismiss Form
                    </button>
                  </div>
                </form>
              )}

              {/* Display Matrix properties CRUD Table */}
              <div className="overflow-x-auto rounded-xl border border-white/5 bg-zinc-900 shadow-md">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="bg-zinc-950 text-[10px] text-zinc-400 uppercase tracking-widest">
                    <tr>
                      <th className="py-4 px-4 w-[130px]">Category Spec</th>
                      <th className="py-4 px-4">Estate Title</th>
                      <th className="py-4 px-4">Investment Price</th>
                      <th className="py-4 px-4">Registry Info</th>
                      <th className="py-4 px-4">Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {properties.map((p) => (
                      <tr key={p.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 text-[9px] font-bold bg-amber-500/10 text-amber-500 uppercase rounded font-mono">
                            {p.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-white line-clamp-1">{p.title}</p>
                          <p className="text-[10px] text-zinc-500">{p.location}</p>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-white font-mono">
                          {formatCurrencyText(p.price)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase ${
                            p.status === 'available' ? 'bg-emerald-500/15 text-emerald-400' :
                            p.status === 'reserved' ? 'bg-sky-500/15 text-sky-400' : 'bg-rose-500/15 text-rose-400'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => startEditProperty(p)}
                              className="p-1.5 bg-zinc-800 hover:bg-amber-600 text-zinc-300 hover:text-zinc-950 rounded transition-colors"
                              title="Edit specifications"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deletePropertyItem(p.id)}
                              className="p-1.5 bg-zinc-800 hover:bg-rose-600 text-zinc-400 hover:text-white rounded transition-colors"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 3: LEAD LEDGER CONTROLLER */}
          {activeTab === 'leads' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                  Lead Ledger Ledger Index
                </h3>

                {enquiries.length > 0 && (
                  <button
                    onClick={handleExportLeads}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 shadow"
                    title="Generate excel file structure instantly"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export to CSV / Excel</span>
                  </button>
                )}
              </div>

              {enquiries.length === 0 ? (
                <div className="text-center py-16 bg-zinc-900 border border-white/5 rounded-2xl">
                  <AlertCircle className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
                  <p className="text-sm text-zinc-400">No acquisition briefs registered yet in databases.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-white/5 bg-zinc-900">
                  <table className="w-full text-left text-xs text-zinc-300">
                    <thead className="bg-zinc-950 text-[9px] text-zinc-400 uppercase tracking-widest">
                      <tr>
                        <th className="py-4 px-4 w-[110px]">Date Entered</th>
                        <th className="py-4 px-4 w-[160px]">Client Coordinates</th>
                        <th className="py-4 px-4">Asset Type Preferences</th>
                        <th className="py-4 px-4">Client Message Box</th>
                        <th className="py-4 px-4 w-[90px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-light">
                      {enquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-zinc-800/25">
                          <td className="py-4 px-4 font-mono text-[10px] text-zinc-400">{enq.date}</td>
                          <td className="py-4 px-4 space-y-0.5">
                            <p className="font-bold text-white">{enq.name}</p>
                            <p className="font-mono text-[10px] text-amber-500">{enq.mobile}</p>
                            <p className="text-zinc-500 truncate text-[10px]">{enq.email}</p>
                          </td>
                          <td className="py-4 px-4 space-y-0.5 whitespace-nowrap">
                            <span className="px-1.5 py-0.5 text-[8px] font-bold bg-amber-500/25 text-amber-400 rounded">
                              {enq.propertyType}
                            </span>
                            <p className="pt-1 text-[10px]">Location: <span className="font-semibold text-zinc-200">{enq.location}</span></p>
                            <p className="text-[10px]">Budget: <span className="font-bold text-emerald-400 font-mono">{enq.budget}</span></p>
                          </td>
                          <td className="py-4 px-4 max-w-sm">
                            <p className="line-clamp-2 leading-relaxed text-zinc-400">
                              {enq.message || 'No additional instructions specified.'}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            {/* Option to clear single lead */}
                            <button
                              onClick={() => {
                                if (confirm('Purge this lead from database Ledger?')) {
                                  onEnquiriesChange(enquiries.filter((e) => e.id !== enq.id));
                                }
                              }}
                              className="text-rose-500 hover:text-rose-400 underline uppercase text-[10px] font-bold"
                            >
                              Purge Lead
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          )}

          {/* TAB 4: WEBSITE CMS EDITOR */}
          {activeTab === 'cms' && (
            <div className="space-y-6">
              
              <div className="pb-4 border-b border-white/5">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-1">
                  Website Content Management Suite
                </h3>
                <p className="text-xs text-zinc-500">
                  Adjust visual branding elements, statistical counters, FAQs, and testimonials with instant live broadcast.
                </p>
              </div>

              {/* Tab Selector inside CMS */}
              <div className="flex flex-wrap gap-2">
                {([
                  { label: 'Hero Block', value: 'hero' },
                  { label: 'About Block', value: 'about' },
                  { label: 'Service items', value: 'services' },
                  { label: 'Patrons Testimonials', value: 'testimonials' },
                  { label: 'FAQ Accordion', value: 'faq' },
                  { label: 'HQ Coordinates', value: 'contact' }
                ] as const).map((sub) => (
                  <button
                    key={sub.value}
                    onClick={() => setActiveCmsSection(sub.value)}
                    className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                      activeCmsSection === sub.value
                        ? 'bg-amber-500 text-zinc-950 font-black shadow'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              {/* Render Forms relative to Section Selected */}
              <div className="p-6 bg-zinc-900 border border-white/5 rounded-2xl shadow">
                
                {activeCmsSection === 'hero' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-4">Amend Hero elements</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Display Title</label>
                        <input
                          type="text"
                          value={webConfig.hero.title}
                          onChange={(e) => handleCmsTextChange('hero', 'title', e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded focus:border-amber-500 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Background Image URL</label>
                        <input
                          type="text"
                          value={webConfig.hero.bgImage}
                          onChange={(e) => handleCmsTextChange('hero', 'bgImage', e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded focus:border-amber-500 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Subtitle narrative</label>
                      <textarea
                        rows={2}
                        value={webConfig.hero.subtitle}
                        onChange={(e) => handleCmsTextChange('hero', 'subtitle', e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded focus:border-amber-500 text-xs text-white resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Stat Properties Sold</label>
                        <input
                          type="text"
                          value={webConfig.hero.propertiesSold}
                          onChange={(e) => handleCmsTextChange('hero', 'propertiesSold', e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Stat Clients Sat</label>
                        <input
                          type="text"
                          value={webConfig.hero.happyClients}
                          onChange={(e) => handleCmsTextChange('hero', 'happyClients', e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Stat Years Active</label>
                        <input
                          type="text"
                          value={webConfig.hero.experienceYears}
                          onChange={(e) => handleCmsTextChange('hero', 'experienceYears', e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Stat Cities Active</label>
                        <input
                          type="text"
                          value={webConfig.hero.citiesCovered}
                          onChange={(e) => handleCmsTextChange('hero', 'citiesCovered', e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeCmsSection === 'about' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-4 font-mono">Amend About US Block</h4>
                    
                    <div>
                      <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Company Intro Narrative</label>
                      <textarea
                        rows={3}
                        value={webConfig.about.intro}
                        onChange={(e) => handleCmsTextChange('about', 'intro', e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded focus:border-amber-500 text-xs text-white resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Mission Statement</label>
                        <textarea
                          rows={2}
                          value={webConfig.about.mission}
                          onChange={(e) => handleCmsTextChange('about', 'mission', e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-xs text-white resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Vision Statement</label>
                        <textarea
                          rows={2}
                          value={webConfig.about.vision}
                          onChange={(e) => handleCmsTextChange('about', 'vision', e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-xs text-white resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeCmsSection === 'services' && (
                  <div className="space-y-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">Amend Service Card details</h4>
                    
                    <div className="divide-y divide-white/5 space-y-4">
                      {webConfig.services.map((ser, sIdx) => (
                        <div key={ser.id} className="pt-4 first:pt-0 space-y-3">
                          <span className="text-[9px] font-bold text-zinc-500 font-mono">SERVICE CARD {sIdx + 1} ({ser.id})</span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-2">
                              <label className="text-[10px] uppercase text-zinc-500 block mb-1">Service Title</label>
                              <input
                                type="text"
                                value={ser.title}
                                onChange={(e) => handleCmsServiceChange(sIdx, 'title', e.target.value)}
                                className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase text-zinc-500 block mb-1">Lucide Icon Name</label>
                              <select
                                value={ser.icon}
                                onChange={(e) => handleCmsServiceChange(sIdx, 'icon', e.target.value)}
                                className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-xs text-white"
                              >
                                <option value="Home">Home</option>
                                <option value="TrendingUp">TrendingUp</option>
                                <option value="PieChart">PieChart</option>
                                <option value="Users">Users</option>
                                <option value="ShieldCheck">ShieldCheck</option>
                                <option value="MapPin">MapPin</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] uppercase text-zinc-500 block mb-1">Brief Description</label>
                            <input
                              type="text"
                              value={ser.desc}
                              onChange={(e) => handleCmsServiceChange(sIdx, 'desc', e.target.value)}
                              className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-xs text-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeCmsSection === 'testimonials' && (
                  <div className="space-y-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">Amend Testimonials Carousel Cards</h4>
                    
                    <div className="divide-y divide-white/5 space-y-4">
                      {webConfig.testimonials.map((test, tIdx) => (
                        <div key={test.id} className="pt-4 first:pt-0 space-y-3">
                          <span className="text-[9px] font-bold text-zinc-500 font-mono">TESTIMONIAL RECORD {tIdx + 1}</span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="text-[10px] uppercase text-zinc-500 block mb-1">Patron Name</label>
                              <input
                                type="text"
                                value={test.name}
                                onChange={(e) => handleCmsTestimonialChange(tIdx, 'name', e.target.value)}
                                className="w-full px-3 py-1.5 bg-zinc-950 border border-white/10 rounded text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase text-zinc-500 block mb-1">Corporate Role</label>
                              <input
                                type="text"
                                value={test.role || ''}
                                onChange={(e) => handleCmsTestimonialChange(tIdx, 'role', e.target.value)}
                                className="w-full px-3 py-1.5 bg-zinc-950 border border-white/10 rounded text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase text-zinc-500 block mb-1">Rating Stars (1-5)</label>
                              <input
                                type="number"
                                min={1}
                                max={5}
                                value={test.rating}
                                onChange={(e) => handleCmsTestimonialChange(tIdx, 'rating', Number(e.target.value))}
                                className="w-full px-3 py-1.5 bg-zinc-950 border border-white/10 rounded text-xs text-white font-mono"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] uppercase text-zinc-500 block mb-1">Avatar Image URL</label>
                            <input
                              type="text"
                              value={test.image}
                              onChange={(e) => handleCmsTestimonialChange(tIdx, 'image', e.target.value)}
                              className="w-full px-3 py-1.5 bg-zinc-950 border border-white/10 rounded text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase text-zinc-500 block mb-1">Client Review text quote</label>
                            <textarea
                              rows={2}
                              value={test.review}
                              onChange={(e) => handleCmsTestimonialChange(tIdx, 'review', e.target.value)}
                              className="w-full px-3 py-1.5 bg-zinc-950 border border-white/10 rounded text-xs text-white resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeCmsSection === 'faq' && (
                  <div className="space-y-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">Amend FAQ Accordion content</h4>
                    
                    <div className="divide-y divide-white/5 space-y-4">
                      {webConfig.faqs.map((faq, fIdx) => (
                        <div key={faq.id} className="pt-4 first:pt-0 space-y-3">
                          <span className="text-[9px] font-bold text-zinc-500 font-mono font-bold block">ACCORDION BLOCK {fIdx + 1}</span>
                          <div>
                            <label className="text-[10px] uppercase text-zinc-500 block mb-1">Question</label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => handleCmsFAQChange(fIdx, 'question', e.target.value)}
                              className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase text-zinc-500 block mb-1">Answer explanation</label>
                            <textarea
                              rows={2}
                              value={faq.answer}
                              onChange={(e) => handleCmsFAQChange(fIdx, 'answer', e.target.value)}
                              className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-xs text-white resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeCmsSection === 'contact' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-4">Amend Contact details</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase text-zinc-400 block mb-1">Core Desk phone</label>
                        <input
                          type="text"
                          value={webConfig.contact.phone}
                          onChange={(e) => handleCmsTextChange('contact', 'phone', e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-zinc-400 block mb-1">Email Coordinates</label>
                        <input
                          type="text"
                          value={webConfig.contact.email}
                          onChange={(e) => handleCmsTextChange('contact', 'email', e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase text-zinc-400 block mb-1">HQ physical address</label>
                      <input
                        type="text"
                        value={webConfig.contact.address}
                        onChange={(e) => handleCmsTextChange('contact', 'address', e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase text-zinc-400 block mb-1">Google Maps Frame Embed URL</label>
                      <input
                        type="text"
                        value={webConfig.contact.mapEmbedUrl}
                        onChange={(e) => handleCmsTextChange('contact', 'mapEmbedUrl', e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-xs text-white"
                      />
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}
