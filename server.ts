import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// Initial Mock Data
let productsList = [
  {
    id: 'moka-pot-blend',
    name: 'Moka Pot Blend',
    origin: 'Guatemala & Colombia',
    region: 'Antigua & Huila',
    roastLevel: 'Medium',
    brewMethods: ['Moka Pot', 'Espresso', 'French Press'],
    price: 590.00,
    originalPrice: 690.00,
    description: 'Specially crafted for stove-top extraction. Delivers a thick crema-like body with balanced chocolate sweetness.',
    tastingNotes: ['Dark Cocoa', 'Roasted Hazelnut', 'Brown Sugar'],
    process: 'Washed & Honey Processed',
    altitude: '1,400 - 1,800m',
    varietal: 'Bourbon & Typica Blend',
    producer: 'Cooperative Smallholders',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBya7wXbh4gEbOysiKDNHYNw0aK5dlt6Lm2jloUK_zWrjAOAcAdaggeeaptxoGOfOJwx7bNrIjlDG06QkmLH30m1py7lLXt5MLmkbsL27Tpgqn1zcDoRnsrlMJ5SyZx8ClKKyh0znR9cOz_M-vEG9c17O-w92gATVuBCWSXrOHfQ-j4-mADSb6f7X3gQX7lLfsoRyh-FAE1i5KROb4aozTdbRS46qn49UmsNEdZCI9lvrEj_TEhvGYC0dkufBz5ArR8Vsa4wpEEePaS',
    badge: 'Artisanal Roast',
    inStock: true,
    rating: 4.9,
    reviewsCount: 142,
    category: 'Whole Bean',
    stockKg: 124,
    profitMarginPercent: 68,
  },
  {
    id: 'konga-sedie',
    name: 'Konga Sedie Reserve',
    origin: 'Ethiopia',
    region: 'Yirgacheffe',
    roastLevel: 'Light',
    brewMethods: ['Pour Over', 'Aeropress'],
    price: 650.00,
    description: 'An exquisite single-origin heirloom Ethiopian lot displaying vibrant floral aromatics and delicate stone fruit notes.',
    tastingNotes: ['Jasmine', 'Peach', 'Bergamot'],
    process: 'Washed',
    altitude: '1,900 - 2,200m',
    varietal: 'Ethiopian Heirloom',
    producer: 'Konga Washing Station',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-kjDroXthElX31-HNQWCBN7j3-046E8WUCJ4pRHlt3XtDvREcBYM4T2003ibDCcI66LXxELjEOC6TjXWUvsCTOHSbEsuzSzg0xNLQ6a8x-iups7npZH1OfkZUSnHskYjLn-NkOmJse3KjApWTfeiVtuQ7e7yMFcVmbF1C0GFeg06RPIY6hYIqqGFDdgQ6bHf78PIDjuGYyqqC9zWWCYzaK5GdwSa3qB7Oj4rc5J8V2kheVXD1FBPXuAyvtFvHjYlzm0vr1yqxxZCR',
    badge: 'Direct Trade',
    inStock: true,
    rating: 5.0,
    reviewsCount: 98,
    category: 'Whole Bean',
    stockKg: 85,
    profitMarginPercent: 72,
  },
  {
    id: 'huila-midnight',
    name: 'Huila Midnight Bloom',
    origin: 'Colombia',
    region: 'Huila',
    roastLevel: 'Dark',
    brewMethods: ['Espresso', 'Moka Pot'],
    price: 540.00,
    description: 'Rich dark roasted micro-lot grown on volcanic slopes with rich soil, yielding exceptional chocolate caramel warmth.',
    tastingNotes: ['Milk Chocolate', 'Red Apple', 'Caramel'],
    process: 'Honey Processed',
    altitude: '1,500m',
    varietal: 'Red Bourbon',
    producer: 'Fernando Alfaro',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiBKO0VTvY9MD8QsZHmkaZab6n0HPclmn_JQxcyYtwWjWPjy9jFHLuyWfgGggFgutU-Y0QQphG5nH5p3wXTeCGPfpnmboxGnItqEDN_V0AtVKG3hgQrDr38gO7KaxcDfDfhY1uzHNYqr4-LM_rPDweGUEEldwZj6-N6mTr5Uduv_2QX8bNsfXNLZV7fMjpIvDShV02L_KafKPfkHP_iygMq4VSPxEFqdDcHenDYB-lvlcY-UfTqv54yLDYRGYUnl6SwyiA4ZJqE53e',
    badge: 'Low Stock',
    inStock: true,
    rating: 4.8,
    reviewsCount: 76,
    category: 'Whole Bean',
    stockKg: 8,
    profitMarginPercent: 62,
  },
  {
    id: 'black-satin-sumatra',
    name: 'Black Satin Sumatra',
    origin: 'Sumatra',
    region: 'Gayo Highlands',
    roastLevel: 'Dark',
    brewMethods: ['French Press', 'Moka Pot'],
    price: 680.00,
    description: 'Full-bodied and deeply aromatic with heavy mouthfeel, dark chocolate notes, and spice hints.',
    tastingNotes: ['Earthy Cacao', 'Cedar', 'Spiced Plum'],
    process: 'Wet-Hulled (Giling Basah)',
    altitude: '1,600m',
    varietal: 'Catimor & Typica',
    producer: 'Gayo Organic Farmers',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYwyhYA_w0PhDb1J0yATGRzvw---qD2L64brxBjv7_NvaBnjViDFP-87k9w37Pb1o0m98MW2dTyP3JoLWqYYYCRxndGhk4pBfCBlwj57YenfFM-rPOsxsz8JK3cCFkOQxofthXF4mSoYAZiTjH7GDuTFfG0qbqYeQkrCMMlaunw98uEjbobxZ1ssdey5e7LVro1BPNRsDWCeqS9TCEmdT6H4ucRBTJTuKNYruQVG56ieRKhWhImnqCBlkHjpVaIJ7kdXrAKBKPTkh1',
    badge: 'In Season',
    inStock: true,
    rating: 4.9,
    reviewsCount: 64,
    category: 'Whole Bean',
    stockKg: 42,
    profitMarginPercent: 65,
  }
];

let ordersList = [
  {
    id: '#RO-10294',
    customer: 'Eleanor Shellstrop',
    initials: 'ES',
    status: 'Shipped',
    amount: 1450.00,
    items: '2x Moka Pot Blend (250g)',
    date: 'Today, 14:32',
    paymentMethod: 'UPI / GPay'
  },
  {
    id: '#RO-10293',
    customer: 'Chidi Anagonye',
    initials: 'CA',
    status: 'Processing',
    amount: 2190.00,
    items: '1x Konga Sedie + 1x Borosilicate French Press',
    date: 'Today, 11:15',
    paymentMethod: 'Credit Card **** 4242'
  },
  {
    id: '#RO-10292',
    customer: 'Tahani Al-Jamil',
    initials: 'TA',
    status: 'Delivered',
    amount: 3200.00,
    items: '4x Pink Bourbon Rare Lot',
    date: 'Yesterday, 16:50',
    paymentMethod: 'Apple Pay'
  },
  {
    id: '#RO-10291',
    customer: 'Jason Mendoza',
    initials: 'JM',
    status: 'Delivered',
    amount: 590.00,
    items: '1x Moka Pot Blend',
    date: 'Yesterday, 09:22',
    paymentMethod: 'UPI'
  },
  {
    id: '#RO-10290',
    customer: 'Michael B.',
    initials: 'MB',
    status: 'Processing',
    amount: 1890.00,
    items: '1x Classic Moka Pot Maker',
    date: '24 Oct, 18:10',
    paymentMethod: 'NetBanking'
  }
];

let brandIdentity = {
  displayName: 'Third Wave - Brew & Roast',
  logoVariant: 'Primary Wordmark',
  tagline: 'ARTISANAL ROASTERY & MICRO-LOT DISTRIBUTOR',
  primaryColor: '#25160E',
  goldLeafColor: '#C5A059',
  cremaBeigeColor: '#E6D5B8',
  forestAccentColor: '#1B3022',
  headlineFont: 'Playfair Display',
  bodyFont: 'Montserrat'
};

let batchesList = [
  {
    id: 'BATCH-892',
    beanName: 'Ethiopia Yirgacheffe G1',
    roastMaster: 'Julian V.',
    date: '2026-07-25',
    weightKg: 50,
    status: 'Rested & Gas Sealed',
    notes: 'Development time ratio 14.8%, light floral roast.'
  },
  {
    id: 'BATCH-891',
    beanName: 'Guatemala Antigua & Colombia Huila',
    roastMaster: 'Julian V.',
    date: '2026-07-24',
    weightKg: 100,
    status: 'Packaged & Ready',
    notes: 'Signature Moka Pot roast profile. Rich crema balance.'
  }
];

let transactionsList = [
  {
    id: '#TXN-94012',
    date: 'Oct 24, 14:32',
    customer: 'Elena Richardson',
    method: 'Apple Pay',
    status: 'Succeeded',
    amount: 1840.00
  },
  {
    id: '#TXN-94011',
    date: 'Oct 24, 11:15',
    customer: 'Jameson Coffee Co.',
    method: 'Visa **** 4242',
    status: 'Succeeded',
    amount: 8420.00
  },
  {
    id: '#TXN-93988',
    date: 'Oct 23, 16:50',
    customer: 'Marcella V.',
    method: 'Google Pay',
    status: 'Refunded',
    amount: -590.00
  },
  {
    id: '#TXN-93985',
    date: 'Oct 23, 09:22',
    customer: 'Artisanal Brew Bar',
    method: 'ACH Transfer',
    status: 'Processing',
    amount: 14500.00
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', serverTime: new Date().toISOString() });
  });

  // PRODUCTS API
  app.get('/api/products', (req, res) => {
    res.json({ success: true, data: productsList });
  });

  app.post('/api/products', (req, res) => {
    const newProd = {
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      inStock: true,
      stockKg: Number(req.body.stockKg) || 50,
      profitMarginPercent: 65,
      image: req.body.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBya7wXbh4gEbOysiKDNHYNw0aK5dlt6Lm2jloUK_zWrjAOAcAdaggeeaptxoGOfOJwx7bNrIjlDG06QkmLH30m1py7lLXt5MLmkbsL27Tpgqn1zcDoRnsrlMJ5SyZx8ClKKyh0znR9cOz_M-vEG9c17O-w92gATVuBCWSXrOHfQ-j4-mADSb6f7X3gQX7lLfsoRyh-FAE1i5KROb4aozTdbRS46qn49UmsNEdZCI9lvrEj_TEhvGYC0dkufBz5ArR8Vsa4wpEEePaS',
      ...req.body
    };
    productsList.unshift(newProd);
    res.status(201).json({ success: true, data: newProd });
  });

  app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const index = productsList.findIndex(p => p.id === id);
    if (index !== -1) {
      productsList[index] = { ...productsList[index], ...req.body };
      res.json({ success: true, data: productsList[index] });
    } else {
      res.status(404).json({ success: false, error: 'Product not found' });
    }
  });

  app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    productsList = productsList.filter(p => p.id !== id);
    res.json({ success: true, message: 'Product deleted successfully' });
  });

  // ORDERS API
  app.get('/api/orders', (req, res) => {
    const totalRevenue = ordersList.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.amount : 0), 0);
    const totalOrders = ordersList.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        avgOrderValue
      },
      data: ordersList
    });
  });

  app.post('/api/orders', (req, res) => {
    const newOrder = {
      id: `#RO-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Processing',
      date: 'Just now',
      initials: (req.body.customer || 'Guest User').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2),
      amount: Number(req.body.amount) || 590,
      customer: req.body.customer || 'Walk-in Customer',
      items: req.body.items || 'Artisanal Coffee',
      paymentMethod: req.body.paymentMethod || 'Credit Card'
    };
    ordersList.unshift(newOrder);
    res.status(201).json({ success: true, data: newOrder });
  });

  app.patch('/api/orders/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const order = ordersList.find(o => o.id === id);
    if (order) {
      order.status = status;
      res.json({ success: true, data: order });
    } else {
      res.status(404).json({ success: false, error: 'Order not found' });
    }
  });

  // PAYMENTS & FINANCIALS API
  app.get('/api/payments/summary', (req, res) => {
    res.json({
      success: true,
      data: {
        totalPayouts: 428500.00,
        pendingBalance: 82405.50,
        processingFees: 12951.20,
        netRevenue: 333143.80,
        nextTransferDate: 'Oct 28',
        nextTransferEstimate: 41202.50,
        monthlyGrowthPercent: 18.4,
        revenueTrend: [
          { month: 'Jan', amount: 120000 },
          { month: 'Feb', amount: 180000 },
          { month: 'Mar', amount: 240000 },
          { month: 'Apr', amount: 160000 },
          { month: 'May', amount: 220000 },
          { month: 'Jun', amount: 280000 }
        ]
      }
    });
  });

  app.get('/api/payments/transactions', (req, res) => {
    res.json({ success: true, data: transactionsList });
  });

  // BRAND SETTINGS API
  app.get('/api/brand', (req, res) => {
    res.json({ success: true, data: brandIdentity });
  });

  app.post('/api/brand', (req, res) => {
    brandIdentity = { ...brandIdentity, ...req.body };
    res.json({ success: true, data: brandIdentity });
  });

  // BATCHES API
  app.get('/api/batches', (req, res) => {
    res.json({ success: true, data: batchesList });
  });

  app.post('/api/batches', (req, res) => {
    const newBatch = {
      id: `BATCH-${Math.floor(800 + Math.random() * 200)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Roasting Completed',
      ...req.body
    };
    batchesList.unshift(newBatch);
    res.status(201).json({ success: true, data: newBatch });
  });

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
});
