import React, { useState } from 'react';
import { ViewMode, Product, CartItem, GrindOption } from './types';
import { PRODUCTS, PAIRING_RECOMMENDATIONS } from './data/coffeeData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { BentoCollections } from './components/BentoCollections';
import { StorySection } from './components/StorySection';
import { ShopCatalog } from './components/ShopCatalog';
import { ProductDetailView } from './components/ProductDetailView';
import { SubscriptionView } from './components/SubscriptionView';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [activeView, setActiveView] = useState<ViewMode>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]); // Default Moka Pot Blend
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Initial cart items pre-populated for instant delight
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      product: PRODUCTS[0], // Moka Pot Blend
      quantity: 1,
      grindOption: 'Moka Pot',
      size: '250g',
    }
  ]);

  const handleAddToCart = (
    product: Product,
    quantity: number,
    grindOption: GrindOption,
    size: '250g' | '500g' | '1kg'
  ) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.grindOption === grindOption && item.size === size
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random()}`,
        product,
        quantity,
        grindOption,
        size,
      };
      setCartItems([...cartItems, newItem]);
    }
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product, grindOption: GrindOption) => {
    handleAddToCart(product, 1, grindOption, '250g');
  };

  const handleAddPairingToCart = (pairing: typeof PAIRING_RECOMMENDATIONS[0]) => {
    // Create a product equivalent for equipment pairing
    const pairingProduct: Product = {
      id: pairing.id,
      name: pairing.name,
      origin: 'Craft Brewing Tools',
      region: 'Barista Edition',
      roastLevel: 'Medium',
      brewMethods: ['Moka Pot', 'French Press'],
      price: pairing.price,
      description: pairing.description,
      tastingNotes: ['Barista Tool', 'Heavy Duty'],
      process: 'Precision Engineered',
      altitude: 'N/A',
      varietal: 'Borosilicate / Metal',
      producer: 'Artisan Works',
      image: pairing.image,
      inStock: true,
      rating: pairing.rating,
      reviewsCount: pairing.reviews,
      category: 'Equipment',
    };
    handleAddToCart(pairingProduct, 1, 'Whole Bean', '250g');
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (activeView === 'admin') {
    return (
      <AdminDashboard
        onReturnToStorefront={() => {
          setActiveView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-[#1a120b] selection:bg-[#c5a059] selection:text-white">
      
      {/* Sticky Top Header */}
      <Navbar
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        setIsCartOpen={setIsCartOpen}
        setIsSearchOpen={setIsSearchOpen}
      />

      {/* Dynamic View Navigation */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero
              setActiveView={(view) => {
                setActiveView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <BentoCollections
              setActiveView={(view) => {
                setActiveView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              setSelectedCategory={setSelectedCategory}
            />
            <StorySection
              setActiveView={(view) => {
                setActiveView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}

        {activeView === 'shop' && (
          <ShopCatalog
            onSelectProduct={handleSelectProduct}
            onQuickAdd={handleQuickAdd}
            initialCategory={selectedCategory}
          />
        )}

        {activeView === 'product' && (
          <ProductDetailView
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onAddPairingToCart={handleAddPairingToCart}
          />
        )}

        {activeView === 'subscription' && <SubscriptionView />}

        {activeView === 'story' && (
          <>
            <StorySection
              setActiveView={(view) => {
                setActiveView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Search Overlay Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        setActiveView={setActiveView}
      />

    </div>
  );
}
