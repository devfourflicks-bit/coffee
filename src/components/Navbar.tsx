import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Coffee, ChevronRight, Sparkles, Sliders } from 'lucide-react';
import { ViewMode } from '../types';

interface NavbarProps {
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  cartCount,
  setIsCartOpen,
  setIsSearchOpen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; view: ViewMode }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop Collections', view: 'shop' },
    { label: 'Moka Blend', view: 'product' },
    { label: 'Subscriptions', view: 'subscription' },
    { label: 'Our Story', view: 'story' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f4]/95 backdrop-blur-md border-b border-[#3c2a21]/10 transition-all">
      {/* Top Banner */}
      <div className="bg-[#25160e] text-[#e6d5b8] text-xs font-medium py-2 px-4 text-center flex items-center justify-center gap-2 tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-pulse" />
        <span>COMPLIMENTARY PAN-INDIA EXPRESS SHIPPING ON ORDERS OVER ₹999</span>
        <span className="hidden sm:inline text-[#c5a059]">•</span>
        <span className="hidden sm:inline text-[#e6d5b8]/80">FRESHLY MICRO-ROASTED EVERY MONDAY & THURSDAY</span>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Mobile Menu Trigger & Desktop Nav */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#25160e] hover:bg-[#f5f3ee] rounded-md transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => setActiveView(link.view)}
                className={`text-sm tracking-wider uppercase font-medium transition-all relative py-1 ${
                  activeView === link.view
                    ? 'text-[#25160e] font-semibold'
                    : 'text-[#4f4540] hover:text-[#25160e]'
                }`}
              >
                {link.label}
                {activeView === link.view && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c5a059] rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Center: Brand Logo */}
        <button
          onClick={() => setActiveView('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[#25160e] flex items-center justify-center text-[#e6d5b8] shadow-md group-hover:bg-[#3c2a21] transition-colors">
            <Coffee className="w-5 h-5 text-[#c5a059]" />
          </div>
          <div>
            <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#25160e] leading-tight">
              THIRD WAVE
            </span>
            <span className="block text-[10px] tracking-[0.25em] text-[#c5a059] uppercase font-semibold">
              Artisanal Roasters
            </span>
          </div>
        </button>

        {/* Right Actions: Search, Admin Portal & Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveView('admin')}
            className="p-2 sm:px-3.5 sm:py-2 text-xs font-bold uppercase tracking-wider text-[#25160e] hover:bg-[#25160e] hover:text-[#e6d5b8] border border-[#25160e]/30 rounded-full sm:rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Master Roaster Admin Portal"
          >
            <Sliders className="w-4 h-4 text-[#c5a059]" />
            <span className="hidden sm:inline">Admin Portal</span>
          </button>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2.5 text-[#25160e] hover:bg-[#f5f3ee] rounded-full transition-colors relative group cursor-pointer"
            title="Search Coffee"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2.5 bg-[#25160e] text-[#e6d5b8] hover:bg-[#3c2a21] rounded-full transition-all relative flex items-center justify-center shadow-sm cursor-pointer"
            title="Open Bag"
          >
            <ShoppingBag className="w-5 h-5 text-[#e6d5b8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#c5a059] text-[#1a120b] font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fbf9f4] border-b border-[#3c2a21]/10 px-6 py-6 animate-fade-in">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => {
                  setActiveView(link.view);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between text-left py-3 px-4 rounded-lg transition-colors text-sm font-medium uppercase tracking-wider ${
                  activeView === link.view
                    ? 'bg-[#3c2a21] text-[#e6d5b8]'
                    : 'text-[#25160e] hover:bg-[#f5f3ee]'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-[#3c2a21]/10 flex justify-between text-xs text-[#4f4540]">
            <span>Micro-Roaster Certified</span>
            <span className="text-[#c5a059] font-medium">100% Direct Trade</span>
          </div>
        </div>
      )}
    </header>
  );
};
