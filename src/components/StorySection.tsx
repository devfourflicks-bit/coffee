import React from 'react';
import { ShieldCheck, Flame, Scale, Globe, ArrowRight, Quote } from 'lucide-react';
import { ViewMode } from '../types';

interface StorySectionProps {
  setActiveView: (view: ViewMode) => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ setActiveView }) => {
  return (
    <section className="py-20 bg-[#f5f3ee] border-y border-[#3c2a21]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a059] block mb-2">
            THE ROASTER'S PHILOSOPHY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#25160e] mb-4">
            The Third Wave Movement
          </h2>
          <p className="text-base text-[#4f4540] leading-relaxed font-sans">
            We treat coffee as an artisanal food craft—like fine wine or single malt whisky. Every cherry reflects its unique soil, altitude, and producer's passion.
          </p>
        </div>

        {/* Main Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Roastery Interior Photo */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-[#3c2a21]/10 group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhsgWIOHGBqANgHtBTvdIRDKRaIxVxLHL1FzQGDjXnviP3Ru2OGWrSBbrE8AzB2HADNrdktBcar17b4ZN14VMrRu1PIGg1_7Aau3juFQar25aqcmN87_aomyYrGyL9BA1lDkH1AsdL7KvW5OjuxZ4QSnY_9VsEofg_ye_57NRsGA9M2uzj9owFVj3WNdVR-MhicO-D4D_KQiQjXhB_88BKO_9EmZ6Zlq-Tpcbp0aqic9H-3kraLyFyaiVnPY5Og2yL2QIymcKRh5u8"
                alt="Third Wave Roastery Workshop"
                className="w-full h-[400px] sm:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Overlay Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-[#25160e] text-[#fbf9f4] p-5 rounded-xl border border-[#c5a059]/40 shadow-xl max-w-xs">
              <Quote className="w-6 h-6 text-[#c5a059] mb-2" />
              <p className="font-serif italic text-sm text-[#e6d5b8] leading-snug">
                "We don't roast to mask the bean; we roast to highlight its origin story."
              </p>
              <span className="text-[11px] text-[#c5a059] font-semibold uppercase tracking-wider block mt-2">
                — Head Roaster, Marcus Vance
              </span>
            </div>
          </div>

          {/* Pillars List */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#fbf9f4] border border-[#3c2a21]/5 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-[#25160e] text-[#c5a059] flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#25160e] mb-1">
                  1. Ethically Sourced Direct Trade
                </h3>
                <p className="text-xs sm:text-sm text-[#4f4540] leading-relaxed">
                  We bypass traditional brokers to pay 40-70% above Fair Trade minimums directly to smallholder farming cooperatives in Yirgacheffe, Huila, and Santa Ana.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#fbf9f4] border border-[#3c2a21]/5 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-[#25160e] text-[#c5a059] flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#25160e] mb-1">
                  2. Micro-Roasted Small Batches
                </h3>
                <p className="text-xs sm:text-sm text-[#4f4540] leading-relaxed">
                  Roasted in 12kg cast-iron drum roasters using real-time thermal sensors to meticulously control caramelization, acidity balance, and essential oil retention.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#fbf9f4] border border-[#3c2a21]/5 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-[#25160e] text-[#c5a059] flex items-center justify-center shrink-0">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#25160e] mb-1">
                  3. Q-Grader Cupping Verification
                </h3>
                <p className="text-xs sm:text-sm text-[#4f4540] leading-relaxed">
                  Every batch undergo blind cupping tests to guarantee a score of 84+ points before earning our seal of approval for customer dispatch.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveView('subscription')}
                className="inline-flex items-center gap-3 bg-[#25160e] text-[#e6d5b8] font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-[#3c2a21] transition-all shadow-md cursor-pointer"
              >
                <span>Join The Subscription Club</span>
                <ArrowRight className="w-4 h-4 text-[#c5a059]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
