import React from 'react';
import { ArrowUpRight, Flame, Sparkles, Filter } from 'lucide-react';
import { ViewMode } from '../types';

interface BentoCollectionsProps {
  setActiveView: (view: ViewMode) => void;
  setSelectedCategory: (category: string) => void;
}

export const BentoCollections: React.FC<BentoCollectionsProps> = ({
  setActiveView,
  setSelectedCategory,
}) => {
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setActiveView('shop');
  };

  return (
    <section className="py-20 bg-[#fbf9f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c5a059] mb-2">
              <Flame className="w-4 h-4" />
              <span>CURATED DISPATCHES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#25160e]">
              Featured Collections
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActiveView('shop');
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#25160e] hover:text-[#c5a059] transition-colors"
          >
            <span>View Full Catalog</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Whole Bean (Span 2 columns on medium+ if desired or featured card) */}
          <div
            onClick={() => handleCategoryClick('Whole Bean')}
            className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer bg-[#25160e] shadow-md border border-[#3c2a21]/10 md:col-span-2"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcyTxrsNPwQ-qr7Qbd6dfGWKVE3rSRx5LTEihsSHpP8M2p1knqD0KN-8b6xtZsG8gNjg-rmuPQIzUO2kY0ebi7ZAkLBcqiv2lHpPrVsHo9-0_SwtVfmj6gHfmGUF5mTBEudYRoz7tyFFx4gajhuyPFngQTdbxcKPXB78FgdW6Hg5KFwpxBQOguwrByq-rvxA-BW5wLcgzT7w9RaqcoMxdSv4pkbhMTD8zxzC7-UjJzQWO1MdKl9FmLc-YQNdwfMa1jC3RM2kSetpqZ"
              alt="Whole Bean Coffee Collection"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b] via-[#1a120b]/40 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-between text-[#fbf9f4]">
              <div className="flex justify-between items-start">
                <span className="bg-[#c5a059] text-[#1a120b] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  FLAGSHIP LINE
                </span>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#c5a059] group-hover:text-[#1a120b] transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              <div>
                <span className="text-xs text-[#e6d5b8] tracking-widest uppercase font-medium block mb-1">
                  100% Single Origin & Micro-Lots
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                  Whole Bean Artisanal
                </h3>
                <p className="text-xs sm:text-sm text-[#e6d5b8]/80 max-w-md line-clamp-2">
                  Hand-selected single origins from Ethiopia, Colombia, Kenya, and Guatemala roasted to bring out peak terroir sweetness.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Easy Brew */}
          <div
            onClick={() => handleCategoryClick('Easy Brew')}
            className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer bg-[#25160e] shadow-md border border-[#3c2a21]/10"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmcPOOEsrdBZHP_YO46fDxnHGZcZObV27Ee0lhwiluiBpZynu0xIx8yldMYJbfphN0XmYqPW2ZP6k18NtP_iJuXIXeS4qo3q-LBHQQLrbnSDeupo51OJ1XSPWqaIAcouO6DmaStlicr5ivSMN4ggVelpjcSkjnfrAhQeUnRzw4jDw3pztdAkNLQgoRss0_XO3Akw4x06Pwk4p1JShdgP3MdqWVEbOtmFT7SJX5c2XiN6wY6NpRUO9VqYNyLa1KaAIq81dTAVd2JMqx"
              alt="Easy Brew Coffee Collection"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b] via-[#1a120b]/40 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-between text-[#fbf9f4]">
              <div className="flex justify-between items-start">
                <span className="bg-[#3c2a21] border border-[#c5a059]/40 text-[#e6d5b8] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  CONVENIENT
                </span>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#c5a059] group-hover:text-[#1a120b] transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              <div>
                <span className="text-xs text-[#e6d5b8] tracking-widest uppercase font-medium block mb-1">
                  Single-Serve Drip Filters
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  Easy Brew Pouches
                </h3>
                <p className="text-xs text-[#e6d5b8]/80 line-clamp-2">
                  Pre-portioned nitrogen-flushed drip bags for specialty pour-over anywhere without equipment.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Cold Brew (Full width on small or 3rd in grid) */}
          <div
            onClick={() => handleCategoryClick('Cold Brew')}
            className="group relative h-80 md:h-96 rounded-2xl overflow-hidden cursor-pointer bg-[#25160e] shadow-md border border-[#3c2a21]/10 md:col-span-3"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuApphkXj6N1s0bwusPnYCAP6Hd-T1PYVD2qXABf7iMBabiEArvGVezhfoDlii7bzMFs6nwDcTxezB2SYY7ljeK7alCDnCHaCNGt7W_fowOefmnIseDbCyBaPjh2HG_2BJpb_x7qlDnomcx8DiJjb31q8rbA-Vi1nHdDr5msAUw57EHB_Sc0E8eg1aX97QkF_VRQ9j0APY40CbgAJn69ZDHo4b7nbdztQguW8m1yYouFBXr_GAea6r8CwFdtGytLyNriUJFQsNVw7iHc"
              alt="Cold Brew Blend Collection"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a120b] via-[#1a120b]/70 to-transparent" />

            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between text-[#fbf9f4] max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="bg-[#1b3022] border border-[#c5a059]/40 text-[#e6d5b8] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  SUMMER DISPATCH
                </span>
              </div>

              <div>
                <span className="text-xs text-[#c5a059] tracking-widest uppercase font-semibold block mb-1">
                  18-Hour Steeping Formulation
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mb-2">
                  Nitro & Steep-Pack Cold Brew
                </h3>
                <p className="text-sm text-[#e6d5b8]/90 mb-6 max-w-lg">
                  Coarsely ground micro-lots formatted for zero-bitterness immersion. Rich dark cacao and berry notes that shine over ice.
                </p>
                
                <button className="bg-[#c5a059] text-[#1a120b] font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-lg flex items-center gap-2 group-hover:bg-white transition-colors">
                  <span>Explore Cold Brew</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
