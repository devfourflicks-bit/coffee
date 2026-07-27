import React, { useState } from 'react';
import { Coffee, Mail, CheckCircle, Award, Heart, ShieldCheck } from 'lucide-react';
import { ViewMode } from '../types';

interface FooterProps {
  setActiveView: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1a120b] text-[#fbf9f4] pt-16 pb-12 border-t border-[#c5a059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c5a059] flex items-center justify-center text-[#1a120b]">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  THIRD WAVE
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#c5a059] uppercase font-semibold block">
                  Artisanal Roasters
                </span>
              </div>
            </div>

            <p className="text-sm text-[#e6d5b8]/80 leading-relaxed max-w-sm font-sans">
              Dedicated to celebrating the origin, craft, and art of coffee. We source single-origin micro-lots directly from smallholder farms, small-batch roast with scientific precision, and deliver fresh to your door.
            </p>

            <div className="flex items-center gap-6 text-xs text-[#c5a059]">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Q-Grader Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Direct Trade</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-serif text-lg font-medium text-white mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm text-[#e6d5b8]/70">
              <li>
                <button
                  onClick={() => setActiveView('shop')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Shop Whole Bean
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('product')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Moka Pot Blend
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('subscription')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Coffee Subscriptions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('story')}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  The Roastery Process
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Roasting Origins */}
          <div>
            <h4 className="font-serif text-lg font-medium text-white mb-4">Origins</h4>
            <ul className="space-y-2.5 text-sm text-[#e6d5b8]/70">
              <li>Yirgacheffe, Ethiopia</li>
              <li>Santa Ana, El Salvador</li>
              <li>Huila, Colombia</li>
              <li>Nyeri, Kenya</li>
              <li>Antigua, Guatemala</li>
            </ul>
          </div>

          {/* Col 5: Roastery Dispatch Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-medium text-white mb-4">Roastery Dispatch</h4>
            <p className="text-xs text-[#e6d5b8]/70 mb-4 leading-relaxed">
              Join the Roastery List for early access to rare micro-lots, brewing guides, and 10% off your first bag.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#1b3022] text-[#e6d5b8] rounded-lg text-xs flex items-center gap-2 border border-[#c5a059]/30">
                <CheckCircle className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>You're on the list! Check your inbox for your 10% code.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#25160e] border border-[#c5a059]/30 text-white placeholder-[#e6d5b8]/40 rounded-md py-2.5 pl-3 pr-10 text-xs focus:outline-none focus:border-[#c5a059]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-[#c5a059] hover:text-white transition-colors"
                    aria-label="Subscribe"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-[#e6d5b8]/50 block">No spam. Unsubscribe anytime.</span>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#e6d5b8]/50 gap-4">
          <p>© {new Date().getFullYear()} Third Wave Artisanal Roasters. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Sourcing Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
