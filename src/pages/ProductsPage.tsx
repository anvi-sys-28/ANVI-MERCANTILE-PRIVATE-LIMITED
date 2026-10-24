import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronDown, 
  Check, 
  X, 
  Star, 
  ShoppingBag, 
  ChevronUp,
  ArrowRight
} from 'lucide-react';
import { SEO } from '@/components/global/SEO';
import { useCart } from '@/context/CartContext';
import { 
  organicProductsList, 
  trustBarItems,
  type OrganicProduct,
  type ProductVariant 
} from '@/data/organicProductsData';

type CategoryFilter = 'All' | 'Fresh Fruits' | 'Vegetables & Roots' | 'Grains & Superfoods';

export default function ProductsPage() {
  const { addItem, totalCount, openCart } = useCart();

  const [selectedProduct, setSelectedProduct] = useState<OrganicProduct>(organicProductsList[0]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(organicProductsList[0].variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [openAccordion, setOpenAccordion] = useState<string>('description');
  const [showReview, setShowReview] = useState<boolean>(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const topSectionRef = useRef<HTMLDivElement>(null);

  // Filtered commodities for Section 2
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return organicProductsList;
    return organicProductsList.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // Switch spotlight product when clicked from bottom grid
  const handleSelectProduct = (product: OrganicProduct) => {
    setSelectedProduct(product);
    setSelectedVariant(product.variants[0]);
    setQuantity(1);
    setOpenAccordion('description');
    
    // Smooth scroll to top spotlight section
    if (topSectionRef.current) {
      topSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Add to cart handler
  const handleAddToCart = () => {
    const variantName = selectedVariant.label !== 'Choose an option' 
      ? selectedVariant.label 
      : (selectedProduct.variants[1]?.label || 'Standard Order');

    const variantPrice = selectedVariant.price || selectedProduct.variants[1]?.price || selectedProduct.priceRange;

    addItem({
      productId: selectedProduct.id,
      name: selectedProduct.name,
      image: selectedProduct.image,
      variantLabel: variantName,
      priceDisplay: variantPrice,
      unitPriceUsd: 0,
      quantity,
      category: selectedProduct.category,
    });
  };

  return (
    <>
      <SEO
        title="Explore Agro Export Commodities & Fresh Produce | Anvi Mercantile"
        description="Explore fresh fruits, vegetables, Basmati rice, and agro commodities. Order retail packs, export air sample boxes, or full refrigerated container loads (FCL) directly from verified Indian packhouses."
      />

      <div className="w-full font-sans antialiased selection:bg-[#807562]/20 selection:text-[#1F1E1B]">
        
        {/* ========================================================= */}
        {/* SECTION 1: TOP SPOTLIGHT / PRODUCT DETAIL & ORDERING      */}
        {/* ========================================================= */}
        <section 
          ref={topSectionRef}
          style={{ backgroundColor: '#F1E5C8' }} 
          className="pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-12 text-[#1F1E1B] transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
              
              {/* LEFT COLUMN: TITLE, PRICE, VARIANT, QUANTITY, BREADCRUMB, STAT */}
              <div className="lg:col-span-4 flex flex-col justify-between pt-2">
                <div>
                  {/* Category Pill Tag */}
                  <div className="inline-block bg-[#807562]/15 text-[#6D6352] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                    {selectedProduct.category}
                  </div>

                  {/* Big Headline */}
                  <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#1F1E1B] leading-[1.12] tracking-tight">
                    {selectedProduct.name}
                  </h1>

                  {/* Price Range */}
                  <div className="text-xl sm:text-2xl font-medium text-[#222222] mt-3 sm:mt-4 mb-6">
                    {selectedVariant.price ? selectedVariant.price : selectedProduct.priceRange}
                  </div>

                  {/* Amount / Variant Selector */}
                  <div className="mb-5">
                    <label 
                      htmlFor="amount-select" 
                      className="block text-xs font-normal text-[#5A554D] mb-1.5"
                    >
                      Amount / Pack Size
                    </label>
                    <div className="relative inline-block w-full max-w-[320px]">
                      <select
                        id="amount-select"
                        value={selectedVariant.label}
                        onChange={(e) => {
                          const found = selectedProduct.variants.find(v => v.label === e.target.value);
                          if (found) setSelectedVariant(found);
                        }}
                        className="w-full appearance-none bg-white border border-[#D5CBC0] text-[#333333] text-xs sm:text-sm rounded-full py-2.5 pl-4 pr-10 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#807562] cursor-pointer"
                      >
                        {selectedProduct.variants.map((v) => (
                          <option key={v.label} value={v.label}>
                            {v.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown 
                        size={16} 
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A746B] pointer-events-none" 
                      />
                    </div>
                  </div>

                  {/* Quantity Stepper & Add To Cart Button */}
                  <div className="flex items-center gap-3 mb-6">
                    {/* Stepper Pill */}
                    <div className="bg-white border border-[#D5CBC0] rounded-full px-3 py-1.5 flex items-center gap-2 shadow-xs">
                      <span className="text-xs sm:text-sm font-semibold text-[#222222] w-5 text-center select-none">
                        {quantity}
                      </span>
                      <div className="flex flex-col gap-0.5 border-l border-stone-200 pl-1.5">
                        <button
                          type="button"
                          onClick={() => setQuantity(q => q + 1)}
                          className="text-[#555] hover:text-black p-0.5 leading-none transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <ChevronUp size={11} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuantity(q => Math.max(1, q - 1))}
                          className="text-[#555] hover:text-black p-0.5 leading-none transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <ChevronDown size={11} />
                        </button>
                      </div>
                    </div>

                    {/* Add To Cart Pill Button */}
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      style={{ backgroundColor: '#807562' }}
                      className="hover:opacity-90 active:scale-98 text-white text-xs sm:text-sm font-medium px-7 py-2.5 rounded-full shadow-xs transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <ShoppingBag size={14} />
                      <span>Add To Cart</span>
                    </button>
                  </div>

                  {/* Breadcrumb line */}
                  <nav aria-label="Breadcrumb" className="text-xs text-[#7A746B] mb-10 leading-relaxed font-normal">
                    {selectedProduct.breadcrumb}
                  </nav>
                </div>

                {/* Big Stat Highlight */}
                <div className="mt-4 sm:mt-8">
                  <div className="text-5xl sm:text-6xl font-bold text-[#6D6352] tracking-tight leading-none">
                    {selectedProduct.statNumber}
                  </div>
                  <div className="text-sm font-medium text-[#7A746B] mt-1.5">
                    {selectedProduct.statLabel}
                  </div>
                </div>
              </div>

              {/* CENTER COLUMN: WHITE ROUNDED CARD WITH PRODUCE IMAGE */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <div className="relative w-full max-w-[430px] aspect-square bg-white rounded-[32px] sm:rounded-[36px] shadow-sm border border-[#E5DACD]/60 flex items-center justify-center p-6 sm:p-8 overflow-hidden group">
                  
                  {/* Magnifying Glass Icon (top right) */}
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute top-5 right-5 p-2 text-[#7A746B] hover:text-[#1F1E1B] transition-colors rounded-full hover:bg-stone-50 cursor-pointer z-10"
                    aria-label="Zoom image"
                  >
                    <Search size={18} strokeWidth={2} />
                  </button>

                  {/* Product Image */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedProduct.id}
                      src={selectedProduct.image}
                      alt={selectedProduct.altText}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="w-full h-full object-contain p-2 group-hover:scale-104 transition-transform duration-500 ease-out select-none"
                    />
                  </AnimatePresence>
                </div>
              </div>

              {/* RIGHT COLUMN: ACCORDION LIST & FLOATING REVIEW BADGE */}
              <div className="lg:col-span-3 flex flex-col justify-between pt-1">
                {/* Minimalist Accordion */}
                <div className="divide-y divide-[#DCD2C4] border-t border-b border-[#DCD2C4]">
                  
                  {/* 1. Description */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(openAccordion === 'description' ? '' : 'description')}
                      className="w-full py-3 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#1F1E1B] hover:text-[#000] cursor-pointer"
                    >
                      <span>Description</span>
                      <span className="text-base font-light text-[#555] ml-2">
                        {openAccordion === 'description' ? '−' : '+'}
                      </span>
                    </button>
                    {openAccordion === 'description' && (
                      <p className="text-xs sm:text-[13px] text-[#5A554D] leading-relaxed pb-3.5 pt-0.5">
                        {selectedProduct.accordion.description}
                      </p>
                    )}
                  </div>

                  {/* 2. Ingredients / Variety */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(openAccordion === 'ingredients' ? '' : 'ingredients')}
                      className="w-full py-3 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#1F1E1B] hover:text-[#000] cursor-pointer"
                    >
                      <span>Grade & Origin</span>
                      <span className="text-base font-light text-[#555] ml-2">
                        {openAccordion === 'ingredients' ? '−' : '+'}
                      </span>
                    </button>
                    {openAccordion === 'ingredients' && (
                      <p className="text-xs sm:text-[13px] text-[#5A554D] leading-relaxed pb-3.5 pt-0.5">
                        {selectedProduct.accordion.ingredients}
                      </p>
                    )}
                  </div>

                  {/* 3. Port Loading & Logistics */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(openAccordion === 'freePickup' ? '' : 'freePickup')}
                      className="w-full py-3 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#1F1E1B] hover:text-[#000] cursor-pointer"
                    >
                      <span>Port Loading & Shipping</span>
                      <span className="text-base font-light text-[#555] ml-2">
                        {openAccordion === 'freePickup' ? '−' : '+'}
                      </span>
                    </button>
                    {openAccordion === 'freePickup' && (
                      <p className="text-xs sm:text-[13px] text-[#5A554D] leading-relaxed pb-3.5 pt-0.5">
                        {selectedProduct.accordion.freePickup}
                      </p>
                    )}
                  </div>

                  {/* 4. Quality & APEDA Standards */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(openAccordion === 'premiumQuality' ? '' : 'premiumQuality')}
                      className="w-full py-3 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#1F1E1B] hover:text-[#000] cursor-pointer"
                    >
                      <span>Quality & Inspection</span>
                      <span className="text-base font-light text-[#555] ml-2">
                        {openAccordion === 'premiumQuality' ? '−' : '+'}
                      </span>
                    </button>
                    {openAccordion === 'premiumQuality' && (
                      <p className="text-xs sm:text-[13px] text-[#5A554D] leading-relaxed pb-3.5 pt-0.5">
                        {selectedProduct.accordion.premiumQuality}
                      </p>
                    )}
                  </div>

                  {/* 5. Packaging & Cold Chain */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(openAccordion === 'organicFairTrade' ? '' : 'organicFairTrade')}
                      className="w-full py-3 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#1F1E1B] hover:text-[#000] cursor-pointer"
                    >
                      <span>Packaging & Cold Chain</span>
                      <span className="text-base font-light text-[#555] ml-2">
                        {openAccordion === 'organicFairTrade' ? '−' : '+'}
                      </span>
                    </button>
                    {openAccordion === 'organicFairTrade' && (
                      <p className="text-xs sm:text-[13px] text-[#5A554D] leading-relaxed pb-3.5 pt-0.5">
                        {selectedProduct.accordion.organicFairTrade}
                      </p>
                    )}
                  </div>

                </div>

                {/* Floating Testimonial Card */}
                {showReview && selectedProduct.review && (
                  <div className="mt-8 sm:mt-10 self-end w-full max-w-[270px]">
                    <div className="bg-white rounded-2xl p-3 shadow-md border border-[#E5DACD]/80 relative transition-transform hover:scale-[1.02]">
                      <button
                        type="button"
                        onClick={() => setShowReview(false)}
                        className="absolute top-2.5 right-2.5 text-[#999] hover:text-[#333] transition-colors p-0.5 cursor-pointer"
                        aria-label="Dismiss review"
                      >
                        <X size={13} />
                      </button>

                      <div className="flex items-center gap-2.5 mb-1.5">
                        <img 
                          src={selectedProduct.review.avatar} 
                          alt={selectedProduct.review.author} 
                          className="w-7 h-7 rounded-full object-cover border border-stone-200"
                        />
                        <div>
                          <div className="text-xs font-semibold text-[#1F1E1B] leading-none">
                            {selectedProduct.review.author}
                          </div>
                          <div className="flex items-center gap-0.5 mt-0.5 text-emerald-700">
                            {[...Array(selectedProduct.review.rating)].map((_, i) => (
                              <Star key={i} size={9} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-[#666666] leading-snug line-clamp-2">
                        {selectedProduct.review.text}
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* VALUE PROPS / TRUST DIVIDER BAR                           */}
        {/* ========================================================= */}
        <section 
          style={{ backgroundColor: '#1F2420' }} 
          className="text-stone-100 py-4 px-4 sm:px-6 lg:px-8 border-y border-stone-800"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
              {trustBarItems.map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs sm:text-[13px] font-normal tracking-wide text-stone-200">
                  <Check size={14} className="text-emerald-400 shrink-0 stroke-[2.5]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: "Do you also have" / EXPLORE PRODUCTS GRID     */}
        {/* ========================================================= */}
        <section 
          style={{ backgroundColor: '#FAF4F1' }} 
          className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-[#1F1E1B]"
        >
          <div className="max-w-7xl mx-auto">
            
            {/* Centered Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#1F1E1B] text-center mb-6 tracking-tight">
              Do you also have
            </h2>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
              {(['All', 'Fresh Fruits', 'Vegetables & Roots', 'Grains & Superfoods'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#242623] text-white shadow-xs'
                      : 'bg-stone-200/60 hover:bg-stone-300/80 text-stone-700'
                  }`}
                >
                  {cat === 'All' ? `All Products (${organicProductsList.length})` : cat}
                </button>
              ))}
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
              {filteredProducts.map((product) => {
                const isCurrentActive = selectedProduct.id === product.id;
                return (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    style={{ backgroundColor: '#F0E1CA' }}
                    className={`rounded-[26px] p-3 text-center flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer ${
                      isCurrentActive ? 'ring-2 ring-[#807562] shadow-md' : 'shadow-xs'
                    }`}
                  >
                    {/* White Rounded Square for Image */}
                    <div className="bg-white rounded-[20px] aspect-square flex items-center justify-center p-3 mb-3 shadow-inner overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.altText}
                        className="w-full h-full object-contain hover:scale-106 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Product Name */}
                    <h3 className="text-xs sm:text-sm font-semibold text-[#1F1E1B] line-clamp-2 leading-snug px-1 mb-1 min-h-[36px] flex items-center justify-center">
                      {product.name}
                    </h3>

                    {/* Price Range */}
                    <div className="text-xs sm:text-[13px] font-normal text-[#444444] mb-3">
                      {product.priceRange}
                    </div>

                    {/* Select Options Pill Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectProduct(product);
                      }}
                      style={{ backgroundColor: '#242623' }}
                      className="w-full text-white text-[11px] sm:text-xs font-semibold py-2 px-3 rounded-full hover:bg-black active:scale-98 transition-all cursor-pointer"
                    >
                      Select Options
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Quick Link to Anvi Trade Routes */}
            <div className="mt-14 text-center">
              <p className="text-xs sm:text-sm text-[#7A746B] mb-3">
                Need customized chartering, multi-container contracts, or special port discharge arrangements?
              </p>
              <a
                href="/trade"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1F1E1B] hover:text-[#807562] underline underline-offset-4 transition-colors"
              >
                <span>Explore International Maritime Shipping Routes</span>
                <ArrowRight size={14} />
              </a>
            </div>

          </div>
        </section>

      </div>

      {/* ========================================================= */}
      {/* FLOATING QUICK CART PILL BUTTON                           */}
      {/* ========================================================= */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={openCart}
          className="bg-[#242623] hover:bg-black text-white text-xs sm:text-sm font-semibold py-3 px-5 rounded-full shadow-2xl border border-stone-700 flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer"
        >
          <ShoppingBag size={16} />
          <span>View Export Cart</span>
          {totalCount > 0 && (
            <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {totalCount}
            </span>
          )}
        </button>
      </div>

      {/* ========================================================= */}
      {/* HIGH RESOLUTION LIGHTBOX                                  */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div 
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-5 right-5 text-stone-500 hover:text-stone-900 p-2 cursor-pointer"
                aria-label="Close zoom"
              >
                <X size={20} />
              </button>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.altText}
                className="w-full max-h-[70vh] object-contain mx-auto"
              />
              <div className="text-center mt-4">
                <h4 className="text-lg font-bold text-stone-900">{selectedProduct.name}</h4>
                <p className="text-xs text-stone-500 mt-1">{selectedProduct.priceRange}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
