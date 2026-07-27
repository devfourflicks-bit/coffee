import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Search, Star, ShoppingBag, Check, X, RotateCcw, ChevronRight } from 'lucide-react';
import { Product, RoastLevel, BrewMethod, GrindOption } from '../types';
import { PRODUCTS } from '../data/coffeeData';

interface ShopCatalogProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, grind: GrindOption) => void;
  initialCategory?: string;
}

export const ShopCatalog: React.FC<ShopCatalogProps> = ({
  onSelectProduct,
  onQuickAdd,
  initialCategory = 'All',
}) => {
  const [selectedRoasts, setSelectedRoasts] = useState<RoastLevel[]>([]);
  const [selectedMethods, setSelectedMethods] = useState<BrewMethod[]>([]);
  const [category, setCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [quickAddModalProduct, setQuickAddModalProduct] = useState<Product | null>(null);
  const [quickAddGrind, setQuickAddGrind] = useState<GrindOption>('Whole Bean');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const roastOptions: RoastLevel[] = ['Light', 'Medium', 'Dark'];
  const methodOptions: BrewMethod[] = ['Pour Over', 'Espresso', 'French Press', 'Aeropress', 'Moka Pot'];
  const categories = ['All', 'Whole Bean', 'Easy Brew', 'Cold Brew'];

  const toggleRoast = (roast: RoastLevel) => {
    setSelectedRoasts((prev) =>
      prev.includes(roast) ? prev.filter((r) => r !== roast) : [...prev, roast]
    );
  };

  const toggleMethod = (method: BrewMethod) => {
    setSelectedMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  const clearAllFilters = () => {
    setSelectedRoasts([]);
    setSelectedMethods([]);
    setCategory('All');
    setSearchQuery('');
  };

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (category !== 'All' && p.category !== category) return false;

      // Roast filter
      if (selectedRoasts.length > 0 && !selectedRoasts.includes(p.roastLevel)) {
        return false;
      }

      // Brew Method filter
      if (selectedMethods.length > 0) {
        const matchesMethod = p.brewMethods.some((m) => selectedMethods.includes(m));
        if (!matchesMethod) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesOrigin = p.origin.toLowerCase().includes(q);
        const matchesNotes = p.tastingNotes.some((n) => n.toLowerCase().includes(q));
        if (!matchesName && !matchesOrigin && !matchesNotes) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [category, selectedRoasts, selectedMethods, searchQuery, sortBy]);

  const activeFilterCount = selectedRoasts.length + selectedMethods.length + (category !== 'All' ? 1 : 0);

  return (
    <div className="bg-[#fbf9f4] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Banner */}
        <div className="bg-[#25160e] text-[#fbf9f4] rounded-2xl p-8 sm:p-12 mb-10 relative overflow-hidden shadow-lg border border-[#3c2a21]/20">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a059] block mb-2">
              CURATED ROASTER'S SELECTION
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Our Collections
            </h1>
            <p className="text-sm sm:text-base text-[#e6d5b8]/90 font-sans leading-relaxed">
              Explore freshly roasted single-origin coffees and custom house blends. Filter by roast profile or preferred brewing method to find your perfect cup.
            </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden lg:block bg-repeat-space bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* Category Tabs & Filter Toggle bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#3c2a21]/10">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  category === cat
                    ? 'bg-[#25160e] text-[#e6d5b8] shadow-md'
                    : 'bg-[#f5f3ee] text-[#4f4540] hover:bg-[#e6d5b8]/30 hover:text-[#25160e]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-[#4f4540] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search origins or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f5f3ee] border border-[#3c2a21]/10 text-[#25160e] text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#c5a059]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#4f4540] hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-[#f5f3ee] border border-[#3c2a21]/10 text-[#25160e] text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#c5a059] cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden p-2.5 bg-[#25160e] text-[#e6d5b8] rounded-xl flex items-center gap-1.5 text-xs font-semibold"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#c5a059]" />
              <span>Filter ({activeFilterCount})</span>
            </button>

          </div>

        </div>

        {/* Main Catalog Grid & Filter Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Filter Panel (Desktop & Mobile Drawer) */}
          <aside className={`lg:col-span-3 space-y-8 bg-[#f5f3ee] p-6 rounded-2xl border border-[#3c2a21]/10 ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}>
            
            <div className="flex items-center justify-between pb-4 border-b border-[#3c2a21]/10">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#25160e]">
                <Filter className="w-4 h-4 text-[#c5a059]" />
                <span>Filters</span>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#c5a059] hover:text-[#25160e] flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {/* Filter 1: Roast Level */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#25160e] mb-3">
                Roast Profile
              </h4>
              <div className="space-y-2">
                {roastOptions.map((roast) => {
                  const active = selectedRoasts.includes(roast);
                  return (
                    <label
                      key={roast}
                      onClick={() => toggleRoast(roast)}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-[#fbf9f4] cursor-pointer text-xs transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          active ? 'bg-[#25160e] border-[#25160e] text-[#c5a059]' : 'border-[#3c2a21]/30 bg-white'
                        }`}>
                          {active && <Check className="w-3 h-3" />}
                        </div>
                        <span className="font-medium text-[#25160e]">{roast} Roast</span>
                      </div>
                      <span className="text-[10px] text-[#4f4540]">
                        ({PRODUCTS.filter((p) => p.roastLevel === roast).length})
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter 2: Brew Method */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#25160e] mb-3">
                Brew Method
              </h4>
              <div className="space-y-2">
                {methodOptions.map((method) => {
                  const active = selectedMethods.includes(method);
                  return (
                    <label
                      key={method}
                      onClick={() => toggleMethod(method)}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-[#fbf9f4] cursor-pointer text-xs transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          active ? 'bg-[#25160e] border-[#25160e] text-[#c5a059]' : 'border-[#3c2a21]/30 bg-white'
                        }`}>
                          {active && <Check className="w-3 h-3" />}
                        </div>
                        <span className="font-medium text-[#25160e]">{method}</span>
                      </div>
                      <span className="text-[10px] text-[#4f4540]">
                        ({PRODUCTS.filter((p) => p.brewMethods.includes(method)).length})
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Direct Trade Assurance */}
            <div className="pt-4 border-t border-[#3c2a21]/10">
              <div className="p-4 bg-[#25160e] text-[#e6d5b8] rounded-xl text-xs space-y-1">
                <span className="text-[#c5a059] font-bold block">100% FRESHNESS GUARANTEE</span>
                <p className="text-[11px] text-[#e6d5b8]/80 leading-snug">
                  All coffee is roasted to order and rested in nitrogen-flushed valve bags.
                </p>
              </div>
            </div>

          </aside>

          {/* Right Product Grid Area */}
          <main className="lg:col-span-9">
            
            {/* Active Filters Pill Bar */}
            {(activeFilterCount > 0 || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-[#f5f3ee] rounded-xl border border-[#3c2a21]/10 text-xs">
                <span className="text-[#4f4540] font-medium mr-1">Active:</span>
                {category !== 'All' && (
                  <span className="bg-[#25160e] text-[#e6d5b8] px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[11px]">
                    Category: {category}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setCategory('All')} />
                  </span>
                )}
                {selectedRoasts.map((r) => (
                  <span key={r} className="bg-[#25160e] text-[#e6d5b8] px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[11px]">
                    {r} Roast
                    <X className="w-3 h-3 cursor-pointer" onClick={() => toggleRoast(r)} />
                  </span>
                ))}
                {selectedMethods.map((m) => (
                  <span key={m} className="bg-[#25160e] text-[#e6d5b8] px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[11px]">
                    {m}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => toggleMethod(m)} />
                  </span>
                ))}
                {searchQuery && (
                  <span className="bg-[#25160e] text-[#e6d5b8] px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[11px]">
                    "{searchQuery}"
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                  </span>
                )}
              </div>
            )}

            {/* Results Count Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs text-[#4f4540] font-semibold uppercase tracking-wider">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
              </span>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#f5f3ee] rounded-2xl border border-dashed border-[#3c2a21]/20">
                <p className="font-serif text-xl font-bold text-[#25160e] mb-2">No coffee matches found</p>
                <p className="text-xs text-[#4f4540] mb-6">Try relaxing your roast or brewing method filters.</p>
                <button
                  onClick={clearAllFilters}
                  className="bg-[#25160e] text-[#e6d5b8] text-xs font-semibold px-6 py-3 rounded-xl hover:bg-[#3c2a21] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#fbf9f4] rounded-2xl overflow-hidden border border-[#3c2a21]/10 hover:border-[#c5a059]/50 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between"
                  >
                    {/* Card Top Image */}
                    <div className="relative aspect-square overflow-hidden bg-[#25160e]/5 cursor-pointer" onClick={() => onSelectProduct(product)}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-[#25160e] text-[#c5a059] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                          {product.badge}
                        </span>
                      )}

                      {/* Quick Add Overlay on Hover */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickAddModalProduct(product);
                        }}
                        className="absolute bottom-3 right-3 bg-[#c5a059] text-[#1a120b] p-3 rounded-xl shadow-lg opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-white cursor-pointer"
                        title="Quick Add to Bag"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between cursor-pointer" onClick={() => onSelectProduct(product)}>
                      <div>
                        {/* Origin & Roast */}
                        <div className="flex items-center justify-between text-[11px] text-[#4f4540] font-medium mb-1">
                          <span>{product.origin} • {product.region}</span>
                          <span className="text-[#c5a059] font-semibold">{product.roastLevel} Roast</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-xl font-bold text-[#25160e] mb-2 group-hover:text-[#c5a059] transition-colors">
                          {product.name}
                        </h3>

                        {/* Tasting Notes */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {product.tastingNotes.map((note) => (
                            <span
                              key={note}
                              className="bg-[#f5f3ee] text-[#25160e] text-[10px] font-medium px-2 py-0.5 rounded-md border border-[#3c2a21]/5"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price & Rating */}
                      <div className="pt-4 border-t border-[#3c2a21]/10 flex items-center justify-between">
                        <div>
                          <span className="font-serif text-lg font-bold text-[#25160e]">
                            ₹{product.price.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-[#4f4540] block">250g / Whole Bean</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-[#25160e]">
                          <Star className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
                          <span className="font-bold">{product.rating}</span>
                          <span className="text-[#4f4540] text-[10px]">({product.reviewsCount})</span>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            <div className="mt-12 flex items-center justify-center gap-2">
              <button className="w-9 h-9 rounded-xl bg-[#25160e] text-[#c5a059] font-bold text-xs flex items-center justify-center shadow-md">
                1
              </button>
              <button className="w-9 h-9 rounded-xl bg-[#f5f3ee] text-[#25160e] font-medium text-xs hover:bg-[#e6d5b8]/40 transition-colors flex items-center justify-center">
                2
              </button>
              <button className="w-9 h-9 rounded-xl bg-[#f5f3ee] text-[#25160e] font-medium text-xs hover:bg-[#e6d5b8]/40 transition-colors flex items-center justify-center">
                3
              </button>
            </div>

          </main>

        </div>

      </div>

      {/* Quick Add Modal */}
      {quickAddModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#fbf9f4] border border-[#c5a059]/30 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setQuickAddModalProduct(null)}
              className="absolute top-4 right-4 text-[#4f4540] hover:text-[#25160e]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={quickAddModalProduct.image}
                alt={quickAddModalProduct.name}
                className="w-20 h-20 object-cover rounded-xl border border-[#3c2a21]/10"
              />
              <div>
                <span className="text-[10px] text-[#c5a059] font-bold uppercase tracking-wider block">QUICK SELECTION</span>
                <h3 className="font-serif text-xl font-bold text-[#25160e]">{quickAddModalProduct.name}</h3>
                <span className="font-serif text-lg font-bold text-[#25160e] block mt-1">
                  ₹{quickAddModalProduct.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-[#25160e] block mb-2">
                Select Grind Profile
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Whole Bean', 'Moka Pot', 'Drip', 'Espresso', 'Pour Over', 'French Press'] as GrindOption[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setQuickAddGrind(g)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all text-left ${
                      quickAddGrind === g
                        ? 'bg-[#25160e] text-[#e6d5b8] shadow-sm'
                        : 'bg-[#f5f3ee] text-[#25160e] hover:bg-[#e6d5b8]/30'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onQuickAdd(quickAddModalProduct, quickAddGrind);
                setQuickAddModalProduct(null);
              }}
              className="w-full bg-[#c5a059] text-[#1a120b] font-semibold py-3.5 rounded-xl hover:bg-[#b38e47] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag • ₹{quickAddModalProduct.price.toFixed(2)}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
