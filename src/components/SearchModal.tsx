import React, { useState } from 'react';
import { Search, X, Coffee, ChevronRight, Star } from 'lucide-react';
import { PRODUCTS } from '../data/coffeeData';
import { Product, ViewMode } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  setActiveView: (view: ViewMode) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  setActiveView,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const popularSearches = ['Ethiopia', 'Yirgacheffe', 'Moka Pot', 'Jasmine', 'Light Roast', 'Cold Brew'];

  const results = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q) ||
          p.tastingNotes.some((n) => n.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-fade-in">
      <div className="bg-[#fbf9f4] border border-[#c5a059]/30 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative">
        
        {/* Search Header Input */}
        <div className="relative mb-6">
          <Search className="w-5 h-5 text-[#c5a059] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            autoFocus
            placeholder="Search by origin (e.g. Yirgacheffe), notes (e.g. Peach), or blend..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#f5f3ee] border border-[#3c2a21]/15 text-[#25160e] text-sm rounded-2xl pl-12 pr-10 py-4 focus:outline-none focus:border-[#c5a059] font-medium"
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4f4540] hover:text-[#25160e]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4f4540]">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="bg-[#f5f3ee] hover:bg-[#e6d5b8]/40 text-[#25160e] text-xs px-3.5 py-2 rounded-xl transition-colors font-medium"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="max-h-96 overflow-y-auto space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4f4540] block mb-2">
              Found {results.length} Results
            </span>

            {results.length === 0 ? (
              <div className="text-center py-10 text-xs text-[#4f4540]">
                No coffees found for "{query}". Try searching for Ethiopia, Colombia, or Moka Pot.
              </div>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="p-3 rounded-2xl bg-[#f5f3ee] hover:bg-[#e6d5b8]/30 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-xl border border-[#3c2a21]/10"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#c5a059] font-bold uppercase">
                          {product.origin}
                        </span>
                        <span className="text-[10px] text-[#4f4540]">• {product.roastLevel} Roast</span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#25160e] group-hover:text-[#c5a059] transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {product.tastingNotes.slice(0, 2).map((note) => (
                          <span key={note} className="text-[9px] bg-[#25160e] text-[#e6d5b8] px-1.5 py-0.5 rounded">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-serif font-bold text-sm text-[#25160e]">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#4f4540] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
