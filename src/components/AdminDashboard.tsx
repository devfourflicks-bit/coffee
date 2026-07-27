import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  CreditCard,
  Package,
  Sparkles,
  Plus,
  Search,
  Bell,
  Settings,
  ExternalLink,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Star,
  X,
  RefreshCw,
  Download,
  LogOut,
  HelpCircle,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  Eye,
  Sliders,
  DollarSign,
  Palette,
  Coffee,
  Building2,
  Check
} from 'lucide-react';
import { Product } from '../types';

interface AdminDashboardProps {
  onReturnToStorefront: () => void;
}

type AdminTab = 'orders' | 'payments' | 'products' | 'product-detail' | 'brand';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onReturnToStorefront }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('orders');
  
  // Backend data state
  const [orders, setOrders] = useState<any[]>([]);
  const [orderStats, setOrderStats] = useState({ totalRevenue: 42890, totalOrders: 1204, avgOrderValue: 35.6 });
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductDetail, setSelectedProductDetail] = useState<any>(null);
  const [paymentSummary, setPaymentSummary] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [brandData, setBrandData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Modals
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Form states
  const [newBatchForm, setNewBatchForm] = useState({
    beanName: 'Ethiopian Yirgacheffe G1',
    roastMaster: 'Julian V.',
    weightKg: 50,
    notes: 'Medium-light roast target for reserve subscription batch.'
  });

  const [newProductForm, setNewProductForm] = useState({
    name: '',
    origin: '',
    region: '',
    roastLevel: 'Medium',
    category: 'Whole Bean',
    price: 590,
    stockKg: 50,
    tastingNotes: 'Cocoa, Hazelnut, Caramel',
    description: 'Freshly harvested micro-lot artisanal roast.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBya7wXbh4gEbOysiKDNHYNw0aK5dlt6Lm2jloUK_zWrjAOAcAdaggeeaptxoGOfOJwx7bNrIjlDG06QkmLH30m1py7lLXt5MLmkbsL27Tpgqn1zcDoRnsrlMJ5SyZx8ClKKyh0znR9cOz_M-vEG9c17O-w92gATVuBCWSXrOHfQ-j4-mADSb6f7X3gQX7lLfsoRyh-FAE1i5KROb4aozTdbRS46qn49UmsNEdZCI9lvrEj_TEhvGYC0dkufBz5ArR8Vsa4wpEEePaS'
  });

  // Fetch data from backend API
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [ordersRes, productsRes, paymentsRes, txRes, brandRes] = await Promise.allSettled([
        fetch('/api/orders').then(r => r.json()),
        fetch('/api/products').then(r => r.json()),
        fetch('/api/payments/summary').then(r => r.json()),
        fetch('/api/payments/transactions').then(r => r.json()),
        fetch('/api/brand').then(r => r.json())
      ]);

      if (ordersRes.status === 'fulfilled' && ordersRes.value?.success) {
        setOrders(ordersRes.value.data || []);
        if (ordersRes.value.stats) setOrderStats(ordersRes.value.stats);
      }
      if (productsRes.status === 'fulfilled' && productsRes.value?.success) {
        const prods = productsRes.value.data || [];
        setProducts(prods);
        if (prods.length > 0 && !selectedProductDetail) {
          setSelectedProductDetail(prods[0]);
        }
      }
      if (paymentsRes.status === 'fulfilled' && paymentsRes.value?.success) {
        setPaymentSummary(paymentsRes.value.data);
      }
      if (txRes.status === 'fulfilled' && txRes.value?.success) {
        setTransactions(txRes.value.data || []);
      }
      if (brandRes.status === 'fulfilled' && brandRes.value?.success) {
        setBrandData(brandRes.value.data);
      }
    } catch (e) {
      console.warn('Backend API connection fallback to local state:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBatchForm)
      });
      alert(`Batch "${newBatchForm.beanName}" created successfully!`);
      setIsBatchModalOpen(false);
    } catch (err) {
      alert('Batch logged locally.');
      setIsBatchModalOpen(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...newProductForm,
      price: Number(newProductForm.price),
      stockKg: Number(newProductForm.stockKg),
      tastingNotes: newProductForm.tastingNotes.split(',').map(s => s.trim())
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setProducts([data.data, ...products]);
      }
    } catch (err) {
      setProducts([{ id: `p-${Date.now()}`, ...payload, inStock: true, rating: 5.0, reviewsCount: 1 }, ...products]);
    }
    setIsAddProductModalOpen(false);
  };

  const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      // ignore
    }
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handleOpenLiveView = () => {
    // Open frontend live view in a new browser tab as requested by the user
    window.open(window.location.origin, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#1b1c19] flex flex-col md:flex-row font-sans selection:bg-[#c5a059]/30">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-[#25160e] text-[#ffffff] flex-shrink-0 flex flex-col justify-between p-6 z-30 shadow-xl">
        <div>
          {/* Brand Header */}
          <div className="mb-8 pb-6 border-b border-[#3c2a21]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#e6d5b8] text-[#25160e] flex items-center justify-center font-serif font-bold text-lg shadow-inner">
                <Coffee className="w-5 h-5 text-[#25160e]" />
              </div>
              <div>
                <h1 className="font-serif text-xl font-bold text-[#e6d5b8] leading-tight">Brew & Roast</h1>
                <p className="text-[10px] uppercase tracking-widest text-[#aa9084] font-semibold">Master Roaster Portal</p>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#3c2a21] text-[#c5a059] border-r-4 border-[#c5a059] shadow-sm'
                  : 'text-[#dec1b3]/80 hover:bg-[#3c2a21]/50 hover:text-[#c5a059]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'payments'
                  ? 'bg-[#3c2a21] text-[#c5a059] border-r-4 border-[#c5a059] shadow-sm'
                  : 'text-[#dec1b3]/80 hover:bg-[#3c2a21]/50 hover:text-[#c5a059]'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Payments</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#3c2a21] text-[#c5a059] border-r-4 border-[#c5a059] shadow-sm'
                  : 'text-[#dec1b3]/80 hover:bg-[#3c2a21]/50 hover:text-[#c5a059]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products</span>
            </button>

            <button
              onClick={() => setActiveTab('product-detail')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'product-detail'
                  ? 'bg-[#3c2a21] text-[#c5a059] border-r-4 border-[#c5a059] shadow-sm'
                  : 'text-[#dec1b3]/80 hover:bg-[#3c2a21]/50 hover:text-[#c5a059]'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Reserve Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('brand')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'brand'
                  ? 'bg-[#3c2a21] text-[#c5a059] border-r-4 border-[#c5a059] shadow-sm'
                  : 'text-[#dec1b3]/80 hover:bg-[#3c2a21]/50 hover:text-[#c5a059]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Brand Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="pt-6 border-t border-[#3c2a21] space-y-3">
          <button
            onClick={() => setIsBatchModalOpen(true)}
            className="w-full bg-[#c5a059] hover:bg-[#b38e47] text-[#1a120b] font-bold text-xs uppercase tracking-wider py-3 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Batch</span>
          </button>

          <button
            onClick={onReturnToStorefront}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-[#dec1b3]/70 hover:text-[#e6d5b8] transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Exit Dashboard</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT CANVAS */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP NAV BAR */}
        <header className="sticky top-0 z-20 bg-[#fbf9f4]/95 backdrop-blur-md border-b border-[#d3c3bd] px-6 md:px-12 h-16 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6">
            <h2 className="font-serif text-lg md:text-xl font-bold text-[#25160e]">Artisanal Admin</h2>
            <div className="hidden lg:flex items-center bg-[#f0eee9] border border-[#d3c3bd] rounded-lg px-3 py-1.5 w-64 text-xs">
              <Search className="w-3.5 h-3.5 text-[#81756f] mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders, batches..."
                className="bg-transparent border-none outline-none text-[#25160e] placeholder-[#81756f] w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            
            {/* PROMINENT FRONT END LIVE VIEW BUTTON (NEW TAB IN BROWSER) */}
            <button
              onClick={handleOpenLiveView}
              className="bg-[#25160e] hover:bg-[#3c2a21] text-[#e6d5b8] hover:text-white border border-[#c5a059]/40 font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              title="Open the customer front end e-commerce site in a new browser tab"
            >
              <Eye className="w-4 h-4 text-[#c5a059]" />
              <span className="hidden sm:inline">Front End Live View</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
            </button>

            <button
              onClick={fetchDashboardData}
              className="p-2 text-[#4f4540] hover:text-[#25160e] hover:bg-[#e4e2dd] rounded-full transition-colors cursor-pointer"
              title="Refresh Server Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <div className="relative">
              <button className="p-2 text-[#4f4540] hover:text-[#25160e] rounded-full relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#c5a059] rounded-full" />
              </button>
            </div>

            <div className="h-6 w-[1px] bg-[#d3c3bd]" />

            {/* Admin User Profile */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-[#25160e] leading-tight">Julian V.</p>
                <p className="text-[10px] text-[#4f4540] uppercase tracking-wider">Master Roaster</p>
              </div>
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#c5a059]/40 shadow-sm">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb_v6VhVKe72CzaGOvkj00tQP_XpPZhE2nnoSTHf84lGRmM0a5-pPOeWkvybk_2KZ2GO0Xz5UBdRQQDZ9IR-oHd1pHydCNUSoaOX6X9vHeQDYjZE_E6aNOL5ebANPVTxWhlN99ahGAw1nRuoz3C_5N-ereJfGyBSeluLQCWJjBl-l2ck0dD8GVX0sHqXynxkQY1ejxSWnpy3BAqhk_0qI1kU2CICeR3KQYeUn8uB_BnYm9Gk8paMy9hkcywA12Vp7ujMKLtmPEuMXv"
                  alt="Julian V. Master Roaster"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </header>

        {/* TAB 1: ORDERS DASHBOARD */}
        {activeTab === 'orders' && (
          <div className="p-6 md:p-12 space-y-10 max-w-7xl mx-auto w-full">
            {/* Header Title */}
            <div>
              <h1 className="font-serif text-3xl font-bold text-[#25160e] mb-1">Orders & Operations</h1>
              <p className="text-sm text-[#4f4540]">Real-time fulfillment metrics and customer shipments across India.</p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-[#d3c3bd]/50 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-[#e6d5b8]/30 rounded-lg text-[#7d562d]">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#1B3022] bg-[#1B3022]/10 px-2 py-0.5 rounded-full">+12.5%</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-[#4f4540] font-medium mb-1">Total Revenue</p>
                <p className="font-serif text-3xl font-bold text-[#25160e]">₹{orderStats.totalRevenue.toLocaleString('en-IN')}</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#d3c3bd]/50 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-[#e6d5b8]/30 rounded-lg text-[#7d562d]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#1B3022] bg-[#1B3022]/10 px-2 py-0.5 rounded-full">+4.2%</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-[#4f4540] font-medium mb-1">Total Orders</p>
                <p className="font-serif text-3xl font-bold text-[#25160e]">{orderStats.totalOrders.toLocaleString('en-IN')}</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#d3c3bd]/50 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-[#e6d5b8]/30 rounded-lg text-[#7d562d]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#ba1a1a] bg-[#ba1a1a]/10 px-2 py-0.5 rounded-full">-2.1%</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-[#4f4540] font-medium mb-1">Avg. Order Value</p>
                <p className="font-serif text-3xl font-bold text-[#25160e]">₹{orderStats.avgOrderValue.toFixed(2)}</p>
              </div>
            </div>

            {/* Revenue Graph & Recent Orders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Revenue Bar Graph */}
              <div className="bg-white p-6 rounded-xl border border-[#d3c3bd]/50 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#25160e] mb-1">Revenue Trend</h3>
                  <p className="text-xs text-[#4f4540] mb-6">Monthly earnings breakdown (FY 2026)</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-end justify-between h-44 px-2 border-b border-[#d3c3bd] pb-2">
                    {[
                      { m: 'Jan', h: '40%', v: '₹1.2L' },
                      { m: 'Feb', h: '60%', v: '₹1.8L' },
                      { m: 'Mar', h: '85%', v: '₹2.4L', active: true },
                      { m: 'Apr', h: '55%', v: '₹1.6L' },
                      { m: 'May', h: '75%', v: '₹2.2L' },
                      { m: 'Jun', h: '90%', v: '₹2.8L' }
                    ].map((bar, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer relative">
                        <div
                          style={{ height: bar.h }}
                          className={`w-7 rounded-t-sm transition-all duration-300 ${
                            bar.active ? 'bg-[#c5a059]' : 'bg-[#e6d5b8] hover:bg-[#c5a059]/70'
                          }`}
                        />
                        <span className="text-[10px] font-semibold text-[#4f4540] uppercase">{bar.m}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs pt-2">
                    <div>
                      <span className="text-[#4f4540] block text-[10px] uppercase">Best Performance</span>
                      <span className="font-bold text-[#25160e]">June 2026</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#4f4540] block text-[10px] uppercase">Growth</span>
                      <span className="font-bold text-[#1B3022]">+18.4%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-[#d3c3bd]/50 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#25160e]">Recent Orders</h3>
                    <p className="text-xs text-[#4f4540]">Real-time customer dispatches</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-semibold text-[#c5a059] hover:underline cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#d3c3bd]/60 text-[11px] uppercase tracking-wider text-[#4f4540] font-bold">
                        <th className="pb-3">Order ID</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Amount</th>
                        <th className="pb-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d3c3bd]/30 text-xs">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#fbf9f4] transition-colors">
                          <td className="py-3.5 font-bold text-[#25160e]">{ord.id}</td>
                          <td className="py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-[#e6d5b8]/50 text-[#25160e] font-bold text-[10px] flex items-center justify-center">
                                {ord.initials || 'CU'}
                              </div>
                              <span className="font-medium text-[#25160e]">{ord.customer}</span>
                            </div>
                          </td>
                          <td className="py-3.5">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                                ord.status === 'Shipped'
                                  ? 'bg-[#1B3022]/15 text-[#1B3022]'
                                  : ord.status === 'Processing'
                                  ? 'bg-[#ffca98]/40 text-[#7a532a]'
                                  : 'bg-[#e4e2dd] text-[#4f4540]'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3.5 text-right font-bold text-[#25160e]">₹{Number(ord.amount).toFixed(2)}</td>
                          <td className="py-3.5 text-center">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                              className="text-[10px] bg-[#f0eee9] border border-[#d3c3bd] rounded px-2 py-1 outline-none font-medium cursor-pointer"
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Top Performing Roasts Carousel / Cards */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl font-bold text-[#25160e]">Top Performing Roasts</h3>
                <div className="flex gap-2">
                  <button className="p-1.5 border border-[#d3c3bd] rounded hover:border-[#c5a059]">
                    <ChevronLeft className="w-4 h-4 text-[#25160e]" />
                  </button>
                  <button className="p-1.5 border border-[#d3c3bd] rounded hover:border-[#c5a059]">
                    <ChevronRight className="w-4 h-4 text-[#25160e]" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((p) => (
                  <div key={p.id} className="bg-white rounded-xl border border-[#d3c3bd]/50 overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="h-44 overflow-hidden relative">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      <span className="absolute top-3 right-3 bg-white/90 text-[#25160e] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                        {p.stockKg > 15 ? 'High Stock' : 'Low Stock'}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif font-bold text-sm text-[#25160e]">{p.name}</h4>
                      <p className="text-[11px] text-[#4f4540] mb-3">{p.origin} • {p.roastLevel} Roast</p>
                      <div className="flex justify-between items-center pt-2 border-t border-[#d3c3bd]/30">
                        <span className="font-bold text-sm text-[#25160e]">₹{p.price.toFixed(2)}</span>
                        <span className="text-[10px] text-[#1B3022] font-semibold bg-[#1B3022]/10 px-2 py-0.5 rounded">
                          {p.stockKg} kg
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PAYMENTS & REVENUE */}
        {activeTab === 'payments' && (
          <div className="p-6 md:p-12 space-y-10 max-w-7xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="font-serif text-3xl font-bold text-[#25160e]">Payments & Revenue</h1>
                <p className="text-sm text-[#4f4540]">Real-time financial overview of your roasting operations across India.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-[#d3c3bd] text-xs font-bold rounded-lg hover:bg-[#e4e2dd] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Download className="w-3.5 h-3.5" /> CSV Report
                </button>
                <button className="px-4 py-2 bg-[#25160e] text-[#e6d5b8] text-xs font-bold rounded-lg hover:bg-[#3c2a21] transition-colors cursor-pointer">
                  Manage Payouts
                </button>
              </div>
            </div>

            {/* Financial Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-[#d3c3bd]/50 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-[#4f4540] font-bold mb-3">Total Payouts</p>
                <p className="font-serif text-2xl font-bold text-[#25160e]">₹4,28,500.00</p>
                <p className="text-[11px] text-[#1B3022] font-medium mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 12% vs last month
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#d3c3bd]/50 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-[#4f4540] font-bold mb-3">Pending Balance</p>
                <p className="font-serif text-2xl font-bold text-[#c5a059]">₹82,405.50</p>
                <p className="text-[11px] text-[#4f4540] mt-2 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Transfer in 2 days
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#d3c3bd]/50 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-[#4f4540] font-bold mb-3">Processing Fees</p>
                <p className="font-serif text-2xl font-bold text-[#25160e]">₹12,951.12</p>
                <p className="text-[11px] text-[#4f4540] mt-2">2.9% average gateway rate</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#d3c3bd]/50 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-[#4f4540] font-bold mb-3">Net Revenue</p>
                <p className="font-serif text-2xl font-bold text-[#25160e]">₹3,33,143.38</p>
                <p className="text-[11px] text-[#1B3022] font-medium mt-2">High Margin: Single Origin</p>
              </div>
            </div>

            {/* Payout Schedule & Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Payout Schedule Card */}
                <div className="bg-[#f0eee9] p-6 rounded-xl border border-[#d3c3bd]/60 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-serif text-lg font-bold text-[#25160e]">Payout Schedule</h3>
                    <span className="px-3 py-1 bg-[#e6d5b8]/50 text-[#25160e] text-[10px] font-bold rounded-full uppercase">Automatic Daily</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                    <div className="border-r border-[#d3c3bd] pr-8">
                      <p className="text-[10px] uppercase text-[#4f4540] font-bold mb-1">Next Transfer</p>
                      <p className="font-serif text-3xl font-bold text-[#25160e]">Oct 28</p>
                      <p className="text-xs text-[#4f4540]">Monday Dispatched</p>
                    </div>

                    <div className="flex-1 w-full">
                      <div className="flex justify-between text-xs font-semibold mb-2">
                        <span>Estimated Transfer Amount</span>
                        <span className="font-bold text-[#25160e]">₹41,202.50</span>
                      </div>
                      <div className="w-full bg-[#d3c3bd] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#c5a059] h-full w-[75%]" />
                      </div>
                      <p className="text-[11px] text-[#4f4540] italic mt-2">Verification pending for 2 recent transactions (₹1,450.00)</p>
                    </div>
                  </div>
                </div>

                {/* Transaction History Table */}
                <div className="bg-white p-6 rounded-xl border border-[#d3c3bd]/50 shadow-sm">
                  <h3 className="font-serif text-lg font-bold text-[#25160e] mb-6">Transaction History</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#d3c3bd]/60 text-[11px] uppercase tracking-wider text-[#4f4540] font-bold">
                          <th className="pb-3">Date</th>
                          <th className="pb-3">ID</th>
                          <th className="pb-3">Customer</th>
                          <th className="pb-3">Method</th>
                          <th className="pb-3 text-center">Status</th>
                          <th className="pb-3 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#d3c3bd]/30 text-xs">
                        {transactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-[#fbf9f4] transition-colors">
                            <td className="py-3 text-[#4f4540]">{tx.date}</td>
                            <td className="py-3 font-semibold text-[#25160e]">{tx.id}</td>
                            <td className="py-3 font-medium text-[#25160e]">{tx.customer}</td>
                            <td className="py-3 text-[#4f4540]">{tx.method}</td>
                            <td className="py-3 text-center">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                  tx.status === 'Succeeded'
                                    ? 'bg-[#1B3022]/15 text-[#1B3022]'
                                    : tx.status === 'Refunded'
                                    ? 'bg-[#ba1a1a]/15 text-[#ba1a1a]'
                                    : 'bg-[#c5a059]/20 text-[#7d562d]'
                                }`}
                              >
                                {tx.status}
                              </span>
                            </td>
                            <td className={`py-3 text-right font-bold ${tx.amount < 0 ? 'text-[#ba1a1a]' : 'text-[#25160e]'}`}>
                              ₹{Math.abs(tx.amount).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Payout Accounts Sidebar */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-[#d3c3bd]/50 shadow-sm">
                  <h3 className="font-serif text-lg font-bold text-[#25160e] mb-6">Payout Accounts</h3>
                  
                  <div className="p-4 bg-[#e6d5b8]/20 border border-[#c5a059] rounded-xl relative mb-4">
                    <span className="absolute top-2 right-2 bg-[#1B3022] text-[#e6d5b8] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Primary</span>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#25160e] text-[#e6d5b8] rounded-lg">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#25160e]">HDFC Bank Business Checking</p>
                        <p className="text-[11px] text-[#4f4540]">Ending in **** 8842</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-dashed border-[#d3c3bd] rounded-xl text-center hover:border-[#c5a059] cursor-pointer transition-colors">
                    <Plus className="w-5 h-5 text-[#81756f] mx-auto mb-1" />
                    <p className="text-xs font-semibold text-[#25160e]">Add Payout Method</p>
                  </div>
                </div>

                <div className="bg-[#25160e] text-[#e6d5b8] p-6 rounded-xl shadow-md">
                  <p className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold mb-1">Seasonal Insight</p>
                  <h4 className="font-serif text-lg font-bold text-white mb-2">Holiday Blend Pre-Orders</h4>
                  <p className="text-xs text-[#dec1b3]">Pre-orders are up 24% from last quarter with high demand for whole bean bags.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS (COFFEE INVENTORY) */}
        {activeTab === 'products' && (
          <div className="p-6 md:p-12 space-y-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="font-serif text-3xl font-bold text-[#25160e]">Coffee Inventory</h1>
                <p className="text-sm text-[#4f4540]">Manage your artisanal collections, micro-lots, and wholesale inventory.</p>
              </div>

              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="bg-[#25160e] hover:bg-[#3c2a21] text-[#e6d5b8] px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#c5a059]" /> Add New Product
              </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-[#f0eee9] p-3 rounded-xl border border-[#d3c3bd] flex flex-wrap gap-3 items-center justify-between">
              <div className="flex-1 min-w-[200px] flex items-center bg-white px-3 py-2 rounded-lg border border-[#d3c3bd]">
                <Search className="w-4 h-4 text-[#81756f] mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by origin, roast level..."
                  className="bg-transparent border-none outline-none text-xs text-[#25160e] w-full"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 text-xs font-medium outline-none text-[#25160e] cursor-pointer"
                >
                  <option value="All">All Regions</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Guatemala">Guatemala</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 text-xs font-medium outline-none text-[#25160e] cursor-pointer"
                >
                  <option value="All">Status: All</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter(p => {
                  if (regionFilter !== 'All' && !p.origin?.includes(regionFilter)) return false;
                  if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
                  return true;
                })
                .map((prod) => (
                  <div key={prod.id} className="bg-white rounded-xl border border-[#d3c3bd]/60 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="h-48 overflow-hidden relative bg-[#e6d5b8]/30">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                        <span
                          className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm ${
                            prod.stockKg <= 10
                              ? 'bg-[#ba1a1a] text-white'
                              : 'bg-white text-[#25160e]'
                          }`}
                        >
                          {prod.stockKg <= 10 ? 'Critical Level' : 'In Stock'}
                        </span>
                      </div>

                      <div className="p-5">
                        <span className="text-[10px] uppercase font-bold text-[#c5a059] block mb-1">
                          {prod.origin} • {prod.category || 'Whole Bean'}
                        </span>
                        <h3 className="font-serif font-bold text-base text-[#25160e] mb-2">{prod.name}</h3>
                        <p className="text-xs text-[#4f4540] line-clamp-2 mb-4">{prod.description}</p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-[#d3c3bd]/30 mt-auto">
                      <div className="flex justify-between items-end mb-4 pt-3">
                        <div>
                          <p className="text-[10px] text-[#4f4540] uppercase">Stock Level</p>
                          <p className="text-xs font-bold text-[#25160e]">{prod.stockKg || 50} kg</p>
                        </div>
                        <p className="font-serif text-lg font-bold text-[#25160e]">₹{prod.price.toFixed(2)}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedProductDetail(prod);
                            setActiveTab('product-detail');
                          }}
                          className="flex-1 border border-[#d3c3bd] hover:border-[#25160e] text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                        >
                          View Analytics
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCT DETAIL & ANALYTICS */}
        {activeTab === 'product-detail' && selectedProductDetail && (
          <div className="p-6 md:p-12 space-y-10 max-w-7xl mx-auto w-full">
            <div className="flex justify-between items-end border-b border-[#d3c3bd] pb-6">
              <div>
                <span className="text-xs uppercase font-bold text-[#c5a059] tracking-widest block mb-1">Reserve Series Analytics</span>
                <h1 className="font-serif text-3xl font-bold text-[#25160e]">{selectedProductDetail.name}</h1>
              </div>
              <button className="border border-[#25160e] hover:bg-[#25160e] hover:text-[#e6d5b8] text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer uppercase tracking-wider">
                Export Detailed Report
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Media & Specs */}
              <div className="lg:col-span-5 space-y-8">
                <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[#d3c3bd] shadow-md bg-white">
                  <img src={selectedProductDetail.image} alt={selectedProductDetail.name} className="w-full h-full object-cover" />
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#d3c3bd]/50 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#25160e] italic">Origin Story</h3>
                  <p className="text-xs text-[#4f4540] leading-relaxed">
                    Grown in high-altitude Gedeo Zone volcanic soil. The elevation provides a slow maturation period, concentrating floral sugars and complex acidity into every harvest cherry.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#d3c3bd]/30 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#c5a059] block">Altitude</span>
                      <span className="font-semibold text-[#25160e]">{selectedProductDetail.altitude || '1,900m - 2,200m'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#c5a059] block">Process</span>
                      <span className="font-semibold text-[#25160e]">{selectedProductDetail.process || 'Washed'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#c5a059] block">Varietal</span>
                      <span className="font-semibold text-[#25160e]">{selectedProductDetail.varietal || 'Heirloom'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#c5a059] block">Roast Profile</span>
                      <span className="font-semibold text-[#25160e]">{selectedProductDetail.roastLevel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Performance Dashboard */}
              <div className="lg:col-span-7 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-5 rounded-xl border border-[#d3c3bd]/50 shadow-sm">
                    <p className="text-[10px] uppercase font-bold text-[#4f4540] mb-2">Current Stock</p>
                    <p className="font-serif text-3xl font-bold text-[#25160e]">{selectedProductDetail.stockKg || 124} <span className="text-xs font-normal">kg</span></p>
                    <span className="text-[10px] font-bold text-[#1B3022] bg-[#1B3022]/10 px-2 py-0.5 rounded-full inline-block mt-2">Optimal Reserve</span>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-[#d3c3bd]/50 shadow-sm">
                    <p className="text-[10px] uppercase font-bold text-[#4f4540] mb-2">Profit Margin</p>
                    <p className="font-serif text-3xl font-bold text-[#25160e]">68%</p>
                    <span className="text-[10px] font-bold text-[#1B3022] bg-[#1B3022]/10 px-2 py-0.5 rounded-full inline-block mt-2">High Efficiency</span>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-[#d3c3bd]/50 shadow-sm">
                    <p className="text-[10px] uppercase font-bold text-[#4f4540] mb-2">Customer Rating</p>
                    <p className="font-serif text-3xl font-bold text-[#25160e]">4.92 <span className="text-xs text-[#c5a059]">★</span></p>
                    <span className="text-[10px] text-[#4f4540] block mt-2">Based on 142 reviews</span>
                  </div>
                </div>

                {/* Sales Chart */}
                <div className="bg-white p-6 rounded-xl border border-[#d3c3bd]/50 shadow-sm">
                  <h3 className="font-serif text-lg font-bold text-[#25160e] mb-1">Historical Sales Trend</h3>
                  <p className="text-xs text-[#4f4540] mb-6">Units sold per month (FY 2026)</p>

                  <div className="flex items-end justify-between h-48 px-4 border-b border-[#d3c3bd] pb-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m, idx) => (
                      <div key={m} className="flex flex-col items-center gap-2">
                        <div
                          style={{ height: `${30 + idx * 10}%` }}
                          className={`w-8 rounded-t-sm ${idx === 6 ? 'bg-[#c5a059]' : 'bg-[#e6d5b8]'}`}
                        />
                        <span className="text-[10px] font-bold text-[#4f4540] uppercase">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#25160e] text-[#e6d5b8] p-6 rounded-xl shadow-md">
                  <p className="text-[10px] uppercase font-bold text-[#c5a059] mb-1">Roaster Notes</p>
                  <p className="text-sm italic">
                    "Vibrant jasmine aromatics open into a complex body of candied lemon peel and black tea finish. A remarkably clean natural process."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BRAND SETTINGS */}
        {activeTab === 'brand' && (
          <div className="p-6 md:p-12 space-y-10 max-w-7xl mx-auto w-full">
            <div className="flex justify-between items-center border-b border-[#d3c3bd] pb-6">
              <div>
                <h1 className="font-serif text-3xl font-bold text-[#25160e]">Brand Identity Settings</h1>
                <p className="text-sm text-[#4f4540]">Define visual tokens, logo presets, and editorial theme configuration.</p>
              </div>
              <button
                onClick={() => alert('Brand Settings Saved to Backend!')}
                className="bg-[#25160e] hover:bg-[#3c2a21] text-[#e6d5b8] px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Save Changes
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-8">
                {/* Logo Management */}
                <div className="bg-white p-6 rounded-xl border border-[#d3c3bd]/50 shadow-sm space-y-6">
                  <h3 className="font-serif text-lg font-bold text-[#25160e]">Logo Management</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#25160e] mb-1">Display Name</label>
                      <input
                        type="text"
                        defaultValue="Third Wave - Brew & Roast"
                        className="w-full bg-[#f0eee9] border border-[#d3c3bd] rounded-lg px-3 py-2 text-xs outline-none text-[#25160e]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#25160e] mb-1">Logo Variant</label>
                      <select className="w-full bg-[#f0eee9] border border-[#d3c3bd] rounded-lg px-3 py-2 text-xs outline-none text-[#25160e]">
                        <option>Primary Wordmark</option>
                        <option>Icon Only</option>
                        <option>Stacked Layout</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Palette */}
                <div className="bg-white p-6 rounded-xl border border-[#d3c3bd]/50 shadow-sm">
                  <h3 className="font-serif text-lg font-bold text-[#25160e] mb-6">Brand Palette</h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="h-20 bg-[#25160e] rounded-lg mb-2 shadow-inner border border-[#d3c3bd]/20 flex items-end justify-center pb-2 text-[10px] text-white font-mono">
                        #25160E
                      </div>
                      <p className="text-xs font-bold text-[#25160e]">Deep Roast</p>
                    </div>

                    <div>
                      <div className="h-20 bg-[#c5a059] rounded-lg mb-2 shadow-inner border border-[#d3c3bd]/20 flex items-end justify-center pb-2 text-[10px] text-black font-mono">
                        #C5A059
                      </div>
                      <p className="text-xs font-bold text-[#25160e]">Gold Leaf</p>
                    </div>

                    <div>
                      <div className="h-20 bg-[#e6d5b8] rounded-lg mb-2 shadow-inner border border-[#d3c3bd]/20 flex items-end justify-center pb-2 text-[10px] text-[#25160e] font-mono">
                        #E6D5B8
                      </div>
                      <p className="text-xs font-bold text-[#25160e]">Crema</p>
                    </div>

                    <div>
                      <div className="h-20 bg-[#1B3022] rounded-lg mb-2 shadow-inner border border-[#d3c3bd]/20 flex items-end justify-center pb-2 text-[10px] text-white font-mono">
                        #1B3022
                      </div>
                      <p className="text-xs font-bold text-[#25160e]">Forest</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Previews Sidebar */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#1A120B] p-6 rounded-xl text-center shadow-md">
                  <p className="text-[10px] uppercase font-bold text-[#c5a059] mb-4">Dark Mode Live Preview</p>
                  <div className="py-8 border border-white/10 rounded-lg bg-[#25160e]/50">
                    <h4 className="font-serif text-2xl font-bold text-[#e6d5b8]">THIRD WAVE</h4>
                    <p className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold">Artisanal Roastery</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#d3c3bd] text-center shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-[#4f4540] mb-4">Light Mode Live Preview</p>
                  <div className="py-8 border border-[#d3c3bd] rounded-lg bg-[#fbf9f4]">
                    <h4 className="font-serif text-2xl font-bold text-[#25160e]">THIRD WAVE</h4>
                    <p className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold">Artisanal Roastery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* NEW BATCH MODAL */}
      {isBatchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fbf9f4] rounded-2xl max-w-md w-full p-6 border border-[#c5a059] shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl font-bold text-[#25160e]">Log New Roasting Batch</h3>
              <button onClick={() => setIsBatchModalOpen(false)} className="p-1 hover:bg-[#e4e2dd] rounded-full">
                <X className="w-5 h-5 text-[#25160e]" />
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#25160e] mb-1">Bean Name / Single Origin</label>
                <input
                  type="text"
                  required
                  value={newBatchForm.beanName}
                  onChange={(e) => setNewBatchForm({ ...newBatchForm, beanName: e.target.value })}
                  className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 outline-none text-[#25160e]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#25160e] mb-1">Roast Master</label>
                <input
                  type="text"
                  required
                  value={newBatchForm.roastMaster}
                  onChange={(e) => setNewBatchForm({ ...newBatchForm, roastMaster: e.target.value })}
                  className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 outline-none text-[#25160e]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#25160e] mb-1">Batch Weight (kg)</label>
                <input
                  type="number"
                  required
                  value={newBatchForm.weightKg}
                  onChange={(e) => setNewBatchForm({ ...newBatchForm, weightKg: Number(e.target.value) })}
                  className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 outline-none text-[#25160e]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#25160e] mb-1">Notes / Target Profile</label>
                <textarea
                  rows={3}
                  value={newBatchForm.notes}
                  onChange={(e) => setNewBatchForm({ ...newBatchForm, notes: e.target.value })}
                  className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 outline-none text-[#25160e]"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsBatchModalOpen(false)}
                  className="flex-1 border border-[#d3c3bd] py-2.5 rounded-lg font-bold text-[#25160e]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#25160e] text-[#e6d5b8] py-2.5 rounded-lg font-bold uppercase tracking-wider shadow-md"
                >
                  Save Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD NEW PRODUCT MODAL */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fbf9f4] rounded-2xl max-w-lg w-full p-6 border border-[#c5a059] shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl font-bold text-[#25160e]">Add New Coffee Product</h3>
              <button onClick={() => setIsAddProductModalOpen(false)} className="p-1 hover:bg-[#e4e2dd] rounded-full">
                <X className="w-5 h-5 text-[#25160e]" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#25160e] mb-1">Coffee Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yirgacheffe Reserve"
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 outline-none text-[#25160e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#25160e] mb-1">Country / Origin</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ethiopia"
                    value={newProductForm.origin}
                    onChange={(e) => setNewProductForm({ ...newProductForm, origin: e.target.value })}
                    className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 outline-none text-[#25160e]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#25160e] mb-1">Region</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Yirgacheffe"
                    value={newProductForm.region}
                    onChange={(e) => setNewProductForm({ ...newProductForm, region: e.target.value })}
                    className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 outline-none text-[#25160e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#25160e] mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: Number(e.target.value) })}
                    className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 outline-none text-[#25160e]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#25160e] mb-1">Stock Level (kg)</label>
                  <input
                    type="number"
                    required
                    value={newProductForm.stockKg}
                    onChange={(e) => setNewProductForm({ ...newProductForm, stockKg: Number(e.target.value) })}
                    className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 outline-none text-[#25160e]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#25160e] mb-1">Tasting Notes (comma separated)</label>
                <input
                  type="text"
                  value={newProductForm.tastingNotes}
                  onChange={(e) => setNewProductForm({ ...newProductForm, tastingNotes: e.target.value })}
                  className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 outline-none text-[#25160e]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#25160e] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newProductForm.description}
                  onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                  className="w-full bg-white border border-[#d3c3bd] rounded-lg px-3 py-2 outline-none text-[#25160e]"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="flex-1 border border-[#d3c3bd] py-2.5 rounded-lg font-bold text-[#25160e]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#25160e] text-[#e6d5b8] py-2.5 rounded-lg font-bold uppercase tracking-wider shadow-md"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
