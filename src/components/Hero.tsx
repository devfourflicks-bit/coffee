import React from 'react';
import { ArrowRight, Sparkles, Flame, Compass } from 'lucide-react';
import { ViewMode } from '../types';

interface HeroProps {
  setActiveView: (view: ViewMode) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveView }) => {
  return (
    <section className="relative overflow-hidden bg-[#25160e] text-[#fbf9f4] py-16 lg:py-24">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3c2a21]/40 rounded-full blur-2xl -z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3c2a21] border border-[#c5a059]/30 text-[#e6d5b8] text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>FRESH MICRO-ROAST DISPATCH</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              Artisanal Coffee,<br />
              <span className="italic font-normal text-[#e6d5b8]">Delivered to Your Door.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#e6d5b8]/90 max-w-xl font-sans leading-relaxed">
              Hand-picked single origins and small-batch roasted blends, rested to perfection and dispatched within days of roasting. Experience the true spectrum of origin flavor.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => setActiveView('shop')}
                className="bg-[#c5a059] hover:bg-[#b38e47] text-[#1a120b] font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-sm tracking-wide group cursor-pointer"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveView('story')}
                className="bg-[#3c2a21]/80 hover:bg-[#3c2a21] border border-[#c5a059]/40 text-[#fbf9f4] font-medium px-7 py-4 rounded-xl transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#c5a059]" />
                <span>Our Roastery Process</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <div>
                <span className="block font-serif text-2xl font-bold text-[#c5a059]">100%</span>
                <span className="text-xs text-[#e6d5b8]/70 block mt-0.5">Direct Trade Sourced</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-[#c5a059]">84+</span>
                <span className="text-xs text-[#e6d5b8]/70 block mt-0.5">Cupping Score Lot</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-[#c5a059]">48hr</span>
                <span className="text-xs text-[#e6d5b8]/70 block mt-0.5">Roast-to-Ship Window</span>
              </div>
            </div>

          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#c5a059]/20 group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYjxdMjy-tQGO-BPlj8SX9pq0NoCqW-Ws0rT7FPz2fcNrV_uB36vc60-9RTD91RDgn6elKqIO3cg4Lt_PK2gHnQnqIBGBkg4p0Z1oRPwrOwoV4BX18SE-wah3ehEYjqLH-o-oWl4FNOWXturQGGnhPeNMWIx7cc6KtH_qEANbu3FzrjdQfHcRb8s0HI-MrLLzYSuWbtP8fvhVsbRVO5orAxaor-jcRJ5iiifTatZznePd4k_scKL3aLCCP5abPJUXoJEYHz5rnAdGp"
                alt="Artisanal Roasted Coffee Beans"
                className="w-full h-[420px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating Coffee Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#1a120b]/90 backdrop-blur-md p-4 rounded-xl border border-[#c5a059]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#c5a059] uppercase tracking-wider font-semibold block">FEATURED MICRO-LOT</span>
                  <span className="font-serif text-base font-bold text-white block">Moka Pot Blend</span>
                  <span className="text-xs text-[#e6d5b8]/80 block">Notes: Dark Cocoa & Hazelnut</span>
                </div>
                <button
                  onClick={() => setActiveView('product')}
                  className="bg-[#c5a059] text-[#1a120b] font-semibold text-xs px-3.5 py-2 rounded-lg hover:bg-white transition-colors"
                >
                  View Lot
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
