export type RoastLevel = 'Light' | 'Medium' | 'Dark';
export type BrewMethod = 'Pour Over' | 'Espresso' | 'French Press' | 'Aeropress' | 'Moka Pot' | 'Drip';
export type GrindOption = 'Whole Bean' | 'Moka Pot' | 'Drip' | 'Espresso' | 'Pour Over' | 'French Press';

export interface Product {
  id: string;
  name: string;
  origin: string;
  region: string;
  roastLevel: RoastLevel;
  brewMethods: BrewMethod[];
  price: number;
  originalPrice?: number;
  description: string;
  tastingNotes: string[];
  process: string;
  altitude: string;
  varietal: string;
  producer: string;
  image: string;
  badge?: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  category: 'Whole Bean' | 'Easy Brew' | 'Cold Brew' | 'Equipment';
}

export interface CartItem {
  id: string; // unique cart entry id
  product: Product;
  quantity: number;
  grindOption: GrindOption;
  size: '250g' | '500g' | '1kg';
}

export interface SubscriptionTier {
  id: string;
  name: string;
  badge?: string;
  pricePerShipment: number;
  originalPricePerShipment?: number;
  bagsPerMonth: number;
  description: string;
  features: string[];
  recommendedFor: string;
  isPopular?: boolean;
}

export type ViewMode = 'home' | 'shop' | 'product' | 'subscription' | 'story' | 'admin';
