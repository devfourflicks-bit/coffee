import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 999.0;

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const discountAmount = discountApplied ? subtotal * 0.1 : 0;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 99.0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgressPct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'THIRD10' || promoCode.trim().toUpperCase() === 'ROAST10') {
      setDiscountApplied(true);
    } else if (promoCode.trim()) {
      alert('Invalid promo code. Try using "THIRD10" for 10% off!');
    }
  };

  const handleCheckout = () => {
    setIsCheckoutSuccess(true);
  };

  const handleCloseSuccess = () => {
    setIsCheckoutSuccess(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbf9f4] shadow-2xl flex flex-col justify-between border-l border-[#3c2a21]/10">
          
          {/* Header */}
          <div className="p-6 border-b border-[#3c2a21]/10 flex items-center justify-between bg-[#25160e] text-[#fbf9f4]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#c5a059]" />
              <h2 className="font-serif text-xl font-bold text-white">Your Roastery Bag</h2>
              <span className="bg-[#c5a059] text-[#1a120b] font-bold text-xs px-2 py-0.5 rounded-full">
                {cartItems.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#e6d5b8] hover:text-white rounded-lg hover:bg-[#3c2a21] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Goal Progress Bar */}
          <div className="bg-[#f5f3ee] p-4 border-b border-[#3c2a21]/10">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              {remainingForFreeShipping > 0 ? (
                <span className="text-[#25160e]">
                  Add <strong className="text-[#c5a059]">₹{remainingForFreeShipping.toFixed(2)}</strong> for Free Express Pan-India Shipping
                </span>
              ) : (
                <span className="text-[#1b3022] font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Complimentary Express Shipping Unlocked!</span>
                </span>
              )}
              <span className="text-[10px] text-[#4f4540]">{Math.round(shippingProgressPct)}%</span>
            </div>
            <div className="w-full bg-[#3c2a21]/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#c5a059] h-full transition-all duration-500 rounded-full"
                style={{ width: `${shippingProgressPct}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#3c2a21]/10">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#c5a059] mx-auto opacity-40" />
                <p className="font-serif text-xl font-bold text-[#25160e]">Your bag is currently empty</p>
                <p className="text-xs text-[#4f4540] max-w-xs mx-auto leading-relaxed">
                  Discover our freshly micro-roasted single origins and find your morning coffee ritual.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-[#3c2a21]/10 shrink-0"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif font-bold text-sm text-[#25160e]">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#4f4540] hover:text-red-700 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-[#4f4540] my-1">
                      <span className="bg-[#f5f3ee] px-2 py-0.5 rounded border border-[#3c2a21]/10 font-semibold">
                        {item.grindOption}
                      </span>
                      <span className="bg-[#f5f3ee] px-2 py-0.5 rounded border border-[#3c2a21]/10 font-semibold">
                        {item.size}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-[#f5f3ee] border border-[#3c2a21]/10 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-[#25160e] hover:bg-white rounded-l-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-bold text-xs text-[#25160e]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#25160e] hover:bg-white rounded-r-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-bold text-[#25160e]">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#f5f3ee] border-t border-[#3c2a21]/10 space-y-4">
              
              {/* Promo Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#4f4540] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. THIRD10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={discountApplied}
                    className="w-full bg-[#fbf9f4] border border-[#3c2a21]/10 rounded-lg pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={discountApplied}
                  className="bg-[#25160e] text-[#e6d5b8] px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-[#3c2a21] disabled:opacity-50"
                >
                  {discountApplied ? 'Applied' : 'Apply'}
                </button>
              </form>

              {discountApplied && (
                <div className="text-[11px] text-[#1b3022] bg-[#1b3022]/10 p-2 rounded-lg font-semibold flex justify-between items-center">
                  <span>10% Club Discount Applied</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs text-[#4f4540]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif font-bold text-[#25160e]">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-[#1b3022] font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-[#1b3022]">
                    <span>Discount</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-[#3c2a21]/10 text-sm font-bold text-[#25160e]">
                  <span>Total</span>
                  <span className="font-serif text-lg text-[#25160e]">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-[#c5a059] text-[#1a120b] font-semibold py-4 rounded-xl hover:bg-[#b38e47] transition-all flex items-center justify-center gap-2 shadow-lg text-xs uppercase tracking-wider cursor-pointer"
              >
                <span>Proceed to Checkout • ₹{grandTotal.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#4f4540]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* Checkout Success Modal */}
      {isCheckoutSuccess && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-scale-in">
          <div className="bg-[#fbf9f4] border border-[#c5a059]/40 rounded-3xl max-w-md w-full p-8 shadow-2xl text-center space-y-6 relative">
            <div className="w-20 h-20 bg-[#25160e] text-[#c5a059] rounded-full mx-auto flex items-center justify-center shadow-xl border border-[#c5a059]/30">
              <Check className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[10px] text-[#c5a059] font-extrabold uppercase tracking-widest block mb-1">
                ORDER DISPATCH CONFIRMED
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#25160e]">
                Thank You for Your Order!
              </h3>
              <p className="text-xs text-[#4f4540] mt-2">
                Order <strong className="text-[#25160e]">#TW-{Math.floor(100000 + Math.random() * 900000)}</strong>
              </p>
            </div>

            <div className="bg-[#f5f3ee] p-4 rounded-2xl text-left text-xs space-y-2 border border-[#3c2a21]/10">
              <div className="flex justify-between font-semibold text-[#25160e]">
                <span>Status:</span>
                <span className="text-[#c5a059]">Scheduled for Micro-Roasting</span>
              </div>
              <div className="flex justify-between text-[#4f4540]">
                <span>Estimated Roast Date:</span>
                <span>This Thursday</span>
              </div>
              <div className="flex justify-between text-[#4f4540]">
                <span>Shipping Method:</span>
                <span>Pan-India Priority Express</span>
              </div>
            </div>

            <button
              onClick={handleCloseSuccess}
              className="w-full bg-[#25160e] text-[#e6d5b8] font-bold py-4 rounded-xl hover:bg-[#3c2a21] transition-all shadow-md text-xs uppercase tracking-wider cursor-pointer"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
