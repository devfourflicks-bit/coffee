import React, { useState } from 'react';
import { Product, GrindOption } from '../types';
import { PAIRING_RECOMMENDATIONS } from '../data/coffeeData';
import { Star, ShieldCheck, Flame, Truck, Plus, Minus, ShoppingBag, Check, ChevronRight, Award, Compass } from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, grind: GrindOption, size: '250g' | '500g' | '1kg') => void;
  onSelectProduct: (product: Product) => void;
  onAddPairingToCart: (item: typeof PAIRING_RECOMMENDATIONS[0]) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
  onAddPairingToCart,
}) => {
  const [selectedGrind, setSelectedGrind] = useState<GrindOption>('Moka Pot');
  const [selectedSize, setSelectedSize] = useState<'250g' | '500g' | '1kg'>('250g');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [addedPairingId, setAddedPairingId] = useState<string | null>(null);

  const grindOptions: GrindOption[] = [
    'Whole Bean',
    'Moka Pot',
    'Drip',
    'Espresso',
    'Pour Over',
    'French Press',
  ];

  const sizes: { label: '250g' | '500g' | '1kg'; multiplier: number }[] = [
    { label: '250g', multiplier: 1 },
    { label: '500g', multiplier: 1.85 },
    { label: '1kg', multiplier: 3.4 },
  ];

  const currentPrice = (product.price * sizes.find((s) => s.label === selectedSize)!.multiplier);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedGrind, selectedSize);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleAddPairing = (pairing: typeof PAIRING_RECOMMENDATIONS[0]) => {
    onAddPairingToCart(pairing);
    setAddedPairingId(pairing.id);
    setTimeout(() => setAddedPairingId(null), 2500);
  };

  return (
    <div className="bg-[#fbf9f4] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#4f4540] mb-8 font-medium">
          <span className="hover:text-[#25160e] cursor-pointer" onClick={() => onSelectProduct(product)}>
            Shop
          </span>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="hover:text-[#25160e] cursor-pointer">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-[#25160e] font-bold">{product.name}</span>
        </nav>

        {/* Product Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          
          {/* Left Column: Product Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#25160e]/5 border border-[#3c2a21]/10">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[450px] sm:h-[520px] object-cover object-center"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#25160e] text-[#c5a059] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md border border-[#c5a059]/30">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Micro details pill bar */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#f5f3ee] p-3 rounded-xl border border-[#3c2a21]/5">
                <span className="text-[10px] text-[#4f4540] uppercase font-bold block">Roast</span>
                <span className="font-serif text-sm font-bold text-[#25160e]">{product.roastLevel}</span>
              </div>
              <div className="bg-[#f5f3ee] p-3 rounded-xl border border-[#3c2a21]/5">
                <span className="text-[10px] text-[#4f4540] uppercase font-bold block">Altitude</span>
                <span className="font-serif text-sm font-bold text-[#25160e]">{product.altitude}</span>
              </div>
              <div className="bg-[#f5f3ee] p-3 rounded-xl border border-[#3c2a21]/5">
                <span className="text-[10px] text-[#4f4540] uppercase font-bold block">Process</span>
                <span className="font-serif text-sm font-bold text-[#25160e]">{product.process}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Configurator */}
          <div className="lg:col-span-6 space-y-6">
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-[#c5a059] font-bold uppercase tracking-wider">
                  {product.origin} • {product.region}
                </span>
                <span className="text-[#3c2a21]/20">•</span>
                <div className="flex items-center gap-1 text-xs text-[#25160e]">
                  <Star className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-[#4f4540]">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#25160e] mb-3">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-[#25160e]">
                  ₹{currentPrice.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="line-through text-sm text-[#4f4540]">
                    ₹{product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-[#1b3022] font-semibold bg-[#1b3022]/10 px-2.5 py-1 rounded-md">
                  In Stock & Ready to Ship
                </span>
              </div>
            </div>

            <p className="text-sm text-[#4f4540] leading-relaxed font-sans border-t border-[#3c2a21]/10 pt-4">
              {product.description}
            </p>

            {/* Tasting Notes Tags */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#25160e] block mb-2">
                Tasting Notes
              </span>
              <div className="flex flex-wrap gap-2">
                {product.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="bg-[#25160e] text-[#e6d5b8] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#25160e] block mb-2">
                Bag Size
              </span>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSize(s.label)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                      selectedSize === s.label
                        ? 'bg-[#25160e] text-[#e6d5b8] shadow-md'
                        : 'bg-[#f5f3ee] text-[#25160e] hover:bg-[#e6d5b8]/30'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Grind Option */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#25160e] block mb-2">
                Grind Option
              </span>
              <div className="grid grid-cols-3 gap-2">
                {grindOptions.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrind(g)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all text-center ${
                      selectedGrind === g
                        ? 'bg-[#25160e] text-[#e6d5b8] font-bold shadow-md'
                        : 'bg-[#f5f3ee] text-[#25160e] hover:bg-[#e6d5b8]/30'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Adjuster & Add To Bag */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#3c2a21]/10">
              <div className="flex items-center bg-[#f5f3ee] border border-[#3c2a21]/10 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#25160e] hover:bg-white rounded-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#25160e]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-[#25160e] hover:bg-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 bg-[#c5a059] text-[#1a120b] font-semibold py-4 rounded-xl hover:bg-[#b38e47] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer text-sm tracking-wide"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-5 h-5 text-[#1a120b]" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Bag • ₹{(currentPrice * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Value Propositions */}
            <div className="grid grid-cols-3 gap-3 pt-6 text-xs text-[#4f4540]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Sustainably Sourced</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Small Batch Roast</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Fresh Shipping</span>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Origin Story Breakdown */}
        <div className="bg-[#f5f3ee] rounded-2xl p-8 sm:p-12 mb-16 border border-[#3c2a21]/10">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059] block mb-2">
              TERROIR & SPECIFICATIONS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#25160e]">
              Detailed Origin Story
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#fbf9f4] p-5 rounded-xl border border-[#3c2a21]/5">
              <span className="text-xs text-[#4f4540] uppercase font-bold block mb-1">Region</span>
              <p className="font-serif text-lg font-bold text-[#25160e]">{product.region}</p>
              <p className="text-xs text-[#4f4540] mt-1">{product.origin}</p>
            </div>

            <div className="bg-[#fbf9f4] p-5 rounded-xl border border-[#3c2a21]/5">
              <span className="text-xs text-[#4f4540] uppercase font-bold block mb-1">Elevation</span>
              <p className="font-serif text-lg font-bold text-[#25160e]">{product.altitude}</p>
              <p className="text-xs text-[#4f4540] mt-1">High altitude density</p>
            </div>

            <div className="bg-[#fbf9f4] p-5 rounded-xl border border-[#3c2a21]/5">
              <span className="text-xs text-[#4f4540] uppercase font-bold block mb-1">Processing</span>
              <p className="font-serif text-lg font-bold text-[#25160e]">{product.process}</p>
              <p className="text-xs text-[#4f4540] mt-1">Sun-dried on raised beds</p>
            </div>

            <div className="bg-[#fbf9f4] p-5 rounded-xl border border-[#3c2a21]/5">
              <span className="text-xs text-[#4f4540] uppercase font-bold block mb-1">Varietal</span>
              <p className="font-serif text-lg font-bold text-[#25160e]">{product.varietal}</p>
              <p className="text-xs text-[#4f4540] mt-1">Producer: {product.producer}</p>
            </div>
          </div>
        </div>

        {/* Perfect Pairings Section matching prompt */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059] block mb-2">
              RECOMMENDED EQUIPMENT
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#25160e]">
              Perfect Pairings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PAIRING_RECOMMENDATIONS.map((pairing) => (
              <div
                key={pairing.id}
                className="bg-[#fbf9f4] rounded-2xl overflow-hidden border border-[#3c2a21]/10 p-5 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <img
                    src={pairing.image}
                    alt={pairing.name}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <span className="text-[10px] text-[#c5a059] uppercase font-bold tracking-wider block">
                    {pairing.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#25160e] my-1">
                    {pairing.name}
                  </h3>
                  <p className="text-xs text-[#4f4540] leading-relaxed mb-4">
                    {pairing.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#3c2a21]/10 flex items-center justify-between">
                  <span className="font-serif text-lg font-bold text-[#25160e]">
                    ₹{pairing.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => handleAddPairing(pairing)}
                    className="bg-[#25160e] text-[#e6d5b8] text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#3c2a21] transition-colors flex items-center gap-1.5"
                  >
                    {addedPairingId === pairing.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add Pairing</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
