import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  ArrowRight, 
  Check,
  ChevronDown 
} from 'lucide-react';
import { SEO } from '@/components/global/SEO';
import { useCart } from '@/context/CartContext';
import { RiceHeroBanner } from '@/components/products/RiceHeroBanner';
import { RiceShowcaseSection } from '@/components/products/RiceShowcaseSection';

// --- TYPES ---
export interface StoreProduct {
  id: string;
  name: string;
  category: 'Vegetables' | 'Fruits' | 'Grains & Superfoods';
  rating: number;
  unit: string;
  image: string;
  fallbackImage: string;
}

// --- ONLY AVAILABLE PRODUCTS (Chilly, Pomegranate, Coconut, Makhana, Rice, Guavas, Grapes) ---
const AVAILABLE_PRODUCTS: StoreProduct[] = [
  {
    id: 'prod-chilly',
    name: 'Fresh Green Chilly (G4 / Pungent)',
    category: 'Vegetables',
    rating: 4.9,
    unit: '10 MT MOQ · Air Sample Available',
    image: '/images/green_chilly.webp',
    fallbackImage: '/images/chilly.webp',
  },
  {
    id: 'prod-pomegranate',
    name: 'Ruby Red Pomegranates (Bhagwa)',
    category: 'Fruits',
    rating: 5.0,
    unit: '10 MT MOQ · 5 Kg CFB Cartons',
    image: '/images/pomegranate.webp',
    fallbackImage: '/images/pomegranate.webp',
  },
  {
    id: 'prod-coconut',
    name: 'Fresh Semi-Husked & Tender Coconuts',
    category: 'Fruits',
    rating: 4.9,
    unit: '1x40ft FCL · 25-50 Pcs/Bag',
    image: 'https://images.unsplash.com/photo-1544378730-8b5104b18790?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/guava.webp',
  },
  {
    id: 'prod-makhana',
    name: 'Organic Popped Makhana (Foxnuts)',
    category: 'Grains & Superfoods',
    rating: 5.0,
    unit: '5 MT MOQ · Retail & Bulk Bags',
    image: '/images/makhana.webp',
    fallbackImage: '/images/rice.webp',
  },
  {
    id: 'prod-rice',
    name: 'Traditional 1121 Basmati Rice',
    category: 'Grains & Superfoods',
    rating: 5.0,
    unit: '25 MT FCL · 25-50 Kg BOPP Bags',
    image: '/images/rice.webp',
    fallbackImage: '/images/rice.webp',
  },
  {
    id: 'prod-guava',
    name: 'Fresh Pink Guavas (Taiwan Pink)',
    category: 'Fruits',
    rating: 4.8,
    unit: '10 MT MOQ · Foam Net Export Pack',
    image: '/images/guava.webp',
    fallbackImage: '/images/guava.webp',
  },
  {
    id: 'prod-grapes',
    name: 'Thompson Seedless Green Grapes',
    category: 'Fruits',
    rating: 4.9,
    unit: '12 MT Reefer · 500g Punnets',
    image: '/images/grapes.webp',
    fallbackImage: '/images/grapes.webp',
  },
];

// Featured Highlights (4 of the 7 products, with NO prices and NO offers)
const FEATURED_HIGHLIGHTS: StoreProduct[] = [
  AVAILABLE_PRODUCTS[1], // Pomegranate
  AVAILABLE_PRODUCTS[0], // Green Chilly
  AVAILABLE_PRODUCTS[4], // Basmati Rice
  AVAILABLE_PRODUCTS[3], // Makhana
];

const FILTER_TABS = [
  'All Products',
  'Fruits',
  'Vegetables',
  'Grains & Superfoods',
];

export default function ProductsPage() {
  const { addItem, openCart } = useCart();

  // Active category filter tab (Default 'All Products' so all 7 are shown)
  const [activeCategory, setActiveCategory] = useState<string>('All Products');

  // Wishlist heart toggle set
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  // Recently added animation indicator
  const [addedItem, setAddedItem] = useState<StoreProduct | null>(null);

  const availableRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState<boolean>(true);

  // Monitor scroll position so the indicator is visible until user reaches the Available Export Products section
  useEffect(() => {
    const handleScroll = () => {
      if (!availableRef.current) return;
      const rect = availableRef.current.getBoundingClientRect();
      // Once Available Export Products enters within 70% of the viewport, hide the indicator
      if (rect.top <= window.innerHeight * 0.7) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToAvailableProducts = () => {
    if (availableRef.current) {
      availableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter products for Section 4
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All Products') {
      return AVAILABLE_PRODUCTS;
    }
    return AVAILABLE_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const handleAddToCart = (product: StoreProduct) => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      variantLabel: product.unit,
      priceDisplay: 'Export Quote',
      unitPriceUsd: 0,
      quantity: 1,
      category: product.category,
    });

    setAddedItem(product);
    setTimeout(() => {
      setAddedItem((current) => (current?.id === product.id ? null : current));
    }, 2800);
  };

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    if (availableRef.current) {
      availableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <SEO
        title="Available Export Produce & Commodities | Anvi Mercantile"
        description="Explore fresh export commodities directly sourced from certified Indian farms: Green Chilly, Pomegranate, Coconut, Makhana, Basmati Rice, Guava, and Grapes."
      />

      <div className="products-page min-h-screen bg-[#F6F7F6] text-gray-900 font-sans antialiased pt-16 sm:pt-20 pb-16 selection:bg-emerald-100 selection:text-emerald-900">
        {/* ========================================================================= */}
        {/* TOP DIV: FULL-WIDTH HORIZONTAL HERO SLIDER (EDGE-TO-EDGE, NO BOX)        */}
        {/* ========================================================================= */}
        <RiceHeroBanner />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 mt-6 sm:mt-8">

          {/* ========================================================================= */}
          {/* SECTION 1: RICE SHOWCASE (GRADES 1-6, SLIDERS, METRICS, & PLACE ORDER)   */}
          {/* ========================================================================= */}
          <RiceShowcaseSection />

          {/* Shop by Category - commented out as requested */}
          {/*
          <section className="space-y-6">
            ... Shop by Category ...
          </section>
          */}

          {/* ========================================================= */}
          {/* SECTION 2: FEATURED COMMODITIES (NO PRICES, NO OFFERS)   */}
          {/* ========================================================= */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Featured Commodities
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Direct farm harvests packed for international container export.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCategoryClick('All Products')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer group"
              >
                <span>View All ({AVAILABLE_PRODUCTS.length})</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 4 Cards Grid (Prices and Discount Offers Removed) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {FEATURED_HIGHLIGHTS.map((item) => {
                const isFavorite = wishlist.has(item.id);
                const isJustAdded = addedItem?.id === item.id;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-150 rounded-2xl p-4 shadow-xs hover:shadow-lg hover:border-gray-300 transition-all flex flex-col justify-between group relative"
                  >
                    {/* Top Row: Clean Category Tag & Wishlist Heart (No Offer Badges) */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                        {item.category}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => toggleWishlist(item.id, e)}
                        className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-label="Save to Wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Centered Image */}
                    <div className="h-36 sm:h-44 w-full flex items-center justify-center p-2 my-1 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.src = item.fallbackImage;
                        }}
                        className="max-h-full max-w-full object-contain group-hover:scale-106 transition-transform duration-300 drop-shadow-xs"
                        loading="lazy"
                      />
                    </div>

                    {/* Details (Prices Removed) */}
                    <div className="space-y-2 pt-2">
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                        {item.name}
                      </h3>

                      {/* Quality Rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>({item.rating.toFixed(1)})</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          APEDA Verified
                        </span>
                      </div>

                      {/* Bottom Action Row: Unit + Add to Cart (No Price Tags) */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-500 font-medium truncate max-w-[55%]">
                          {item.unit}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAddToCart(item)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                            isJustAdded
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-emerald-500/30 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================= */}
          {/* SECTION 3: PROMOTIONAL BANNERS (NO PRICES)                */}
          {/* ========================================================= */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Banner: Fresh & Organic Fruits */}
            <div className="bg-gradient-to-br from-[#FFF9EA] via-[#FFF5DE] to-[#FDF0CE] border border-amber-200/50 rounded-3xl p-6 sm:p-8 flex items-center justify-between overflow-hidden relative shadow-xs group">
              <div className="space-y-2 z-10 max-w-[58%]">
                <span className="inline-block text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Farm Direct Exports
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight">
                  Fresh &amp; Organic Fruits
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  Ruby Pomegranates, Pink Guavas, Seedless Grapes, and Coconuts.
                </p>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('Fruits')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Explore Fruits
                  </button>
                </div>
              </div>

              {/* Right Fruit Arrangement */}
              <div className="w-[42%] flex items-center justify-end z-10">
                <img
                  src="/images/pomegranate.webp"
                  alt="Fresh & Organic Fruits"
                  onError={(e) => {
                    e.currentTarget.src = '/images/grapes.webp';
                  }}
                  className="max-h-36 sm:max-h-48 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-amber-300/20 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Right Banner: Farm-Fresh Vegetables & Superfoods */}
            <div className="bg-gradient-to-br from-[#EFF9F1] via-[#E6F6E9] to-[#DCF5E1] border border-emerald-200/50 rounded-3xl p-6 sm:p-8 flex items-center justify-between overflow-hidden relative shadow-xs group">
              <div className="space-y-2 z-10 max-w-[58%]">
                <span className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Reefer Cold-Chain
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight">
                  Export Vegetables &amp; Grains
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  Green Chillies, 1121 Basmati Rice, and Organic Popped Makhana.
                </p>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('All Products')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Explore Commodities
                  </button>
                </div>
              </div>

              {/* Right Vegetables Arrangement */}
              <div className="w-[42%] flex items-center justify-end z-10">
                <img
                  src="/images/green_chilly.webp"
                  alt="Export Green Chillies"
                  onError={(e) => {
                    e.currentTarget.src = '/images/rice.webp';
                  }}
                  className="max-h-36 sm:max-h-48 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none" />
            </div>

          </section>

          {/* ========================================================= */}
          {/* SECTION 4: ALL AVAILABLE PRODUCTS (7 REQUESTED COMMODITIES) */}
          {/* ========================================================= */}
          <section ref={availableRef} className="space-y-6 pt-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Available Export Products
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Showing {filteredProducts.length} certified export commodities.
                </p>
              </div>

              {/* Filter Tabs Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {FILTER_TABS.map((tab) => {
                  const isActive = activeCategory === tab;

                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveCategory(tab)}
                      className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'border border-emerald-600 bg-[#EBF7EE] text-emerald-700 shadow-2xs'
                          : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filtered Products Grid (Strictly the 7 Commodities, No Prices, No Offers) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  const isFavorite = wishlist.has(product.id);
                  const isJustAdded = addedItem?.id === product.id;

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white border border-gray-150 rounded-2xl p-4 shadow-xs hover:shadow-lg hover:border-gray-300 transition-all flex flex-col justify-between group relative"
                    >
                      {/* Top Row: Clean Category Badge & Wishlist Heart (No Offer Badges) */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                          {product.category}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => toggleWishlist(product.id, e)}
                          className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors cursor-pointer"
                          aria-label="Save to Wishlist"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Centered Image */}
                      <div className="h-36 sm:h-44 w-full flex items-center justify-center p-2 my-1 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          onError={(e) => {
                            e.currentTarget.src = product.fallbackImage;
                          }}
                          className="max-h-full max-w-full object-contain group-hover:scale-106 transition-transform duration-300 drop-shadow-xs"
                          loading="lazy"
                        />
                      </div>

                      {/* Details (No Prices, No Offers) */}
                      <div className="space-y-2 pt-2">
                        <h3 className="font-bold text-sm sm:text-base text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                          {product.name}
                        </h3>

                        {/* Quality Rating */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>({product.rating.toFixed(1)})</span>
                          </div>
                          <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            Export Certified
                          </span>
                        </div>

                        {/* Bottom Action Row: Unit + Add to Cart (No Price Tags) */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-500 font-medium truncate max-w-[55%]">
                            {product.unit}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAddToCart(product)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                              isJustAdded
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-emerald-500/30 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700'
                            }`}
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Add to Cart</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </section>

        </div>

        {/* Floating Scroll Down Indicator (Visible on right side bottom until user reaches Available Export Products) */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.button
              type="button"
              onClick={scrollToAvailableProducts}
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ duration: 0.25 }}
              className="fixed bottom-20 lg:bottom-8 right-5 lg:right-8 z-40 bg-[#0B2C1B] hover:bg-[#135E38] text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-xl hover:shadow-2xl border border-white/20 flex items-center gap-2 text-xs font-bold tracking-wide transition-all cursor-pointer group select-none"
              aria-label="Scroll down to Available Export Products"
            >
              <span className="hidden sm:inline">Scroll Down</span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors stroke-[2.5]" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating Cart Toast notification (No Prices) */}
        <AnimatePresence>
          {addedItem && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white rounded-2xl p-4 shadow-2xl border border-white/10 flex items-center gap-4 max-w-sm"
            >
              <img
                src={addedItem.image}
                alt={addedItem.name}
                onError={(e) => {
                  e.currentTarget.src = addedItem.fallbackImage;
                }}
                className="w-12 h-12 object-contain rounded-xl bg-white/10 p-1 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-emerald-400">Added to Cart!</p>
                <p className="text-sm font-bold truncate text-white">{addedItem.name}</p>
                <p className="text-xs text-gray-300 font-mono">{addedItem.unit}</p>
              </div>
              <button
                type="button"
                onClick={openCart}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                View Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
