import React, { useState, useEffect } from 'react';
import { Sun, Moon, Heart, ArrowLeftRight, LogIn, Menu, X, Building } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  wishlistCount: number;
  openWishlistModal: () => void;
  compareCount: number;
  openCompareModal: () => void;
  openAdminPanel: () => void;
  scrollToSection: (id: string) => void;
}

export default function Header({
  darkMode,
  toggleDarkMode,
  wishlistCount,
  openWishlistModal,
  compareCount,
  openCompareModal,
  openAdminPanel,
  scrollToSection
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Properties', id: 'properties' },
    { label: 'About Us', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Categories', id: 'categories' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="eep-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-lg border-zinc-100 dark:border-zinc-900 py-3'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-700 text-white rounded-lg shadow-md group-hover:scale-105 transition-transform">
              <Building className="w-5 h-5" id="header-logo-icon" />
            </div>
            <div>
              <span className="text-xl font-bold font-sans tracking-wide text-zinc-900 dark:text-zinc-100 uppercase flex items-center gap-1.5">
                ELITE ESTATE <span className="text-amber-500 dark:text-amber-400">PRO</span>
              </span>
              <p className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em] font-medium -mt-1">
                Luxury Real Estate
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 cursor-pointer"
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Interaction Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 text-zinc-700 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-all"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              id="theme-toggle-btn"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={openWishlistModal}
              className="p-1.5 relative text-zinc-700 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-all"
              title="My Wishlist"
              id="wishlist-trigger"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Compare Button */}
            <button
              onClick={openCompareModal}
              className="p-1.5 relative text-zinc-700 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-all"
              title="Compare Properties"
              id="compare-trigger"
            >
              <ArrowLeftRight className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-amber-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Admin Login Button */}
            <button
              onClick={openAdminPanel}
              className="px-4 py-1.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-medium text-xs tracking-wider uppercase rounded shadow hover:shadow-lg transition-all flex items-center space-x-1.5 border border-zinc-900 dark:border-white"
              id="admin-panel-trigger"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
          </div>

          {/* Mobile Actions Controls */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-1.5 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
              id="mobile-theme-toggle"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={openWishlistModal}
              className="p-1.5 relative text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
              id="mobile-wishlist-trigger"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={openCompareModal}
              className="p-1.5 relative text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
              id="mobile-compare-trigger"
            >
              <ArrowLeftRight className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 focus:outline-none"
              aria-label="Toggle Menu"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="eep-mobile-dropdown" className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-900 shadow-xl transition-all duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-3 py-2.5 text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg"
              >
                {item.label}
              </button>
            ))}
            <hr className="border-zinc-100 dark:border-zinc-900 my-2" />
            <button
              onClick={() => {
                openAdminPanel();
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-3 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-center font-bold tracking-wider uppercase rounded shadow text-xs flex items-center justify-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Admin Panel Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
