import React, { useState } from 'react';
import { SUBSCRIPTION_TIERS, FAQ_ITEMS } from '../data/coffeeData';
import { SubscriptionTier } from '../types';
import { CheckCircle2, ChevronDown, ChevronUp, Sparkles, RefreshCw, Calendar, Gift, Check, Coffee, ArrowRight, ShieldCheck, X } from 'lucide-react';

export const SubscriptionView: React.FC = () => {
  const [isPrepaidYearly, setIsPrepaidYearly] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [subscribingTier, setSubscribingTier] = useState<SubscriptionTier | null>(null);
  const [selectedGrind, setSelectedGrind] = useState('Whole Bean');
  const [selectedRoast, setSelectedRoast] = useState('Roaster\'s Choice');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleStartSubscribe = (tier: SubscriptionTier) => {
    setSubscribingTier(tier);
    setSubscribedSuccess(false);
  };

  const handleConfirmSubscribe = () => {
    setSubscribedSuccess(true);
  };

  return (
    <div className="bg-[#fbf9f4] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subscription Hero */}
        <div className="bg-[#25160e] text-[#fbf9f4] rounded-3xl p-8 sm:p-16 mb-16 relative overflow-hidden shadow-2xl border border-[#3c2a21]">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3c2a21] border border-[#c5a059]/30 text-[#e6d5b8] text-xs font-semibold tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>THE THIRD WAVE CLUB</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Never Run Out of<br />
              <span className="text-[#e6d5b8] italic font-normal">Fresh Micro-Roasted Coffee.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#e6d5b8]/90 font-sans leading-relaxed mb-8">
              Curated single-origin selections delivered on your schedule. Enjoy 15% off every bag, free express shipping, and first access to rare micro-lots.
            </p>

            {/* Toggle Standard vs Prepaid Discount */}
            <div className="inline-flex items-center bg-[#1a120b] p-1.5 rounded-2xl border border-[#c5a059]/30">
              <button
                onClick={() => setIsPrepaidYearly(false)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  !isPrepaidYearly
                    ? 'bg-[#c5a059] text-[#1a120b] shadow-md'
                    : 'text-[#e6d5b8]/80 hover:text-white'
                }`}
              >
                Pay As You Go
              </button>
              <button
                onClick={() => setIsPrepaidYearly(true)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isPrepaidYearly
                    ? 'bg-[#c5a059] text-[#1a120b] shadow-md'
                    : 'text-[#e6d5b8]/80 hover:text-white'
                }`}
              >
                <span>Annual Prepaid</span>
                <span className="bg-[#1b3022] text-[#e6d5b8] text-[9px] px-2 py-0.5 rounded-full font-extrabold">
                  SAVE 15%
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* The Ritual Simplified - 3 Steps */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059] block mb-2">
              HOW IT WORKS
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#25160e]">
              The Ritual Simplified
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f5f3ee] p-8 rounded-2xl border border-[#3c2a21]/10 text-center space-y-4">
              <div className="w-14 h-14 bg-[#25160e] text-[#c5a059] rounded-2xl mx-auto flex items-center justify-center font-serif text-xl font-bold shadow-md">
                01
              </div>
              <h3 className="font-serif text-xl font-bold text-[#25160e]">Choose Your Coffee</h3>
              <p className="text-xs text-[#4f4540] leading-relaxed">
                Select your preferred roast profile or let our master roaster send a curated single-origin lot each month.
              </p>
            </div>

            <div className="bg-[#f5f3ee] p-8 rounded-2xl border border-[#3c2a21]/10 text-center space-y-4">
              <div className="w-14 h-14 bg-[#25160e] text-[#c5a059] rounded-2xl mx-auto flex items-center justify-center font-serif text-xl font-bold shadow-md">
                02
              </div>
              <h3 className="font-serif text-xl font-bold text-[#25160e]">Set Your Schedule</h3>
              <p className="text-xs text-[#4f4540] leading-relaxed">
                Receive fresh deliveries weekly, bi-weekly, or monthly. Pause, skip, or cancel anytime in 1-click.
              </p>
            </div>

            <div className="bg-[#f5f3ee] p-8 rounded-2xl border border-[#3c2a21]/10 text-center space-y-4">
              <div className="w-14 h-14 bg-[#25160e] text-[#c5a059] rounded-2xl mx-auto flex items-center justify-center font-serif text-xl font-bold shadow-md">
                03
              </div>
              <h3 className="font-serif text-xl font-bold text-[#25160e]">Enjoy Fresh At Home</h3>
              <p className="text-xs text-[#4f4540] leading-relaxed">
                Beans are roasted to order and dispatched within 48 hours with complimentary priority shipping nationwide.
              </p>
            </div>
          </div>
        </div>

        {/* Curated Subscriptions Cards Grid */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059] block mb-2">
              MEMBERSHIP TIERS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#25160e]">
              Curated Subscription Plans
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {SUBSCRIPTION_TIERS.map((tier) => {
              const adjustedPrice = isPrepaidYearly
                ? tier.pricePerShipment * 0.85
                : tier.pricePerShipment;

              return (
                <div
                  key={tier.id}
                  className={`bg-[#fbf9f4] rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    tier.isPopular
                      ? 'border-2 border-[#c5a059] shadow-2xl scale-102 bg-[#f5f3ee]'
                      : 'border border-[#3c2a21]/15 shadow-md hover:shadow-xl'
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c5a059] text-[#1a120b] text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                      {tier.badge}
                    </div>
                  )}

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#25160e] mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-[#4f4540] mb-6">{tier.description}</p>

                    <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-[#3c2a21]/10">
                      <span className="font-serif text-4xl font-bold text-[#25160e]">
                        ₹{adjustedPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-[#4f4540] font-medium">/ shipment</span>
                    </div>

                    <ul className="space-y-3.5 mb-8 text-xs text-[#25160e]">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <button
                      onClick={() => handleStartSubscribe(tier)}
                      className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        tier.isPopular
                          ? 'bg-[#25160e] text-[#e6d5b8] hover:bg-[#3c2a21] shadow-lg'
                          : 'bg-[#c5a059] text-[#1a120b] hover:bg-[#b38e47] shadow-md'
                      }`}
                    >
                      Subscribe Now
                    </button>
                    <span className="block text-[10px] text-center text-[#4f4540] mt-3">
                      Cancel or pause anytime. No minimum commitment.
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Divider Brand Moment */}
        <div className="relative rounded-3xl overflow-hidden mb-20 shadow-xl border border-[#3c2a21]/20 h-72 sm:h-96">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeXWeGxzW7ZNgSEwnsdB6XOBTOZ-sult4Y9Zp_cawAq-qp7bOUvpsR_VbdRN_bCGJhAuueJ1vGpxcUQ1DJXPBfn_jCec_N47namr8PNg4ysol2yZF5e5sb_pzFDEfbJaI-N0Ii99vaiuo2MstCxcEJ4EYz24bUNIUTG5f7QjSyf9Mk5rFaht6NZRtM6kVYOjeiNja2jSQYwsEBPRok2yjZ902Zz-zTXZfwXTTYJifCcRXMvHg45JyacMDK7Pl4pAFjVjMY6_FjgwuG"
            alt="Third Wave Roastery Experience"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a120b] via-[#1a120b]/70 to-transparent flex items-center p-8 sm:p-16">
            <div className="max-w-md text-white">
              <span className="text-xs text-[#c5a059] font-bold uppercase tracking-widest block mb-2">
                FRESHNESS AT SCALE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
                Micro-Roasted With Intention
              </h3>
              <p className="text-xs sm:text-sm text-[#e6d5b8]/90 leading-relaxed">
                Subscribers receive our highest-grade cupping lots within 48 hours of resting, complete with roast notes and origin stories.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordions Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059] block mb-2">
              COMMON QUESTIONS
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#25160e]">
              Subscription Intelligence
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#f5f3ee] border border-[#3c2a21]/10 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between font-serif text-lg font-bold text-[#25160e] hover:text-[#c5a059] transition-colors"
                  >
                    <span>{item.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#c5a059] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#4f4540] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-[#4f4540] leading-relaxed border-t border-[#3c2a21]/5 pt-4">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Subscribe Setup Modal */}
      {subscribingTier && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#fbf9f4] border border-[#c5a059]/30 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative">
            <button
              onClick={() => setSubscribingTier(null)}
              className="absolute top-5 right-5 text-[#4f4540] hover:text-[#25160e]"
            >
              <X className="w-5 h-5" />
            </button>

            {subscribedSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#1b3022] text-[#e6d5b8] rounded-full mx-auto flex items-center justify-center shadow-lg border border-[#c5a059]/40">
                  <Check className="w-8 h-8 text-[#c5a059]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#25160e]">
                  Welcome to the Third Wave Club!
                </h3>
                <p className="text-xs text-[#4f4540] leading-relaxed max-w-xs mx-auto">
                  Your first micro-roasted batch is scheduled for dispatch this coming Thursday. Check your email for access to your subscriber portal.
                </p>
                <button
                  onClick={() => setSubscribingTier(null)}
                  className="bg-[#25160e] text-[#e6d5b8] text-xs font-bold px-8 py-3.5 rounded-xl hover:bg-[#3c2a21] transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[10px] text-[#c5a059] font-extrabold uppercase tracking-widest block mb-1">
                  START SUBSCRIPTION
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#25160e] mb-2">
                  Configure Your {subscribingTier.name}
                </h3>
                <p className="text-xs text-[#4f4540] mb-6">
                  ₹{subscribingTier.pricePerShipment.toFixed(2)} per shipment • Free express Pan-India shipping included.
                </p>

                {/* Preference 1: Roast Preference */}
                <div className="mb-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#25160e] block mb-2">
                    Select Coffee Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Roaster\'s Choice', 'Light Roast', 'Medium Roast', 'Dark Espresso'].map((r) => (
                      <button
                        key={r}
                        onClick={() => setSelectedRoast(r)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-medium text-left transition-all ${
                          selectedRoast === r
                            ? 'bg-[#25160e] text-[#e6d5b8] font-bold shadow-sm'
                            : 'bg-[#f5f3ee] text-[#25160e] hover:bg-[#e6d5b8]/30'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preference 2: Grind Size */}
                <div className="mb-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#25160e] block mb-2">
                    Grind Format
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Whole Bean', 'Moka Pot', 'Pour Over', 'Espresso'].map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGrind(g)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-medium text-left transition-all ${
                          selectedGrind === g
                            ? 'bg-[#25160e] text-[#e6d5b8] font-bold shadow-sm'
                            : 'bg-[#f5f3ee] text-[#25160e] hover:bg-[#e6d5b8]/30'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleConfirmSubscribe}
                  className="w-full bg-[#c5a059] text-[#1a120b] font-semibold py-4 rounded-xl hover:bg-[#b38e47] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
                >
                  <span>Activate Subscription • ₹{subscribingTier.pricePerShipment.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
