import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronDown, 
  Check, 
  X, 
  Star, 
  ShoppingBag, 
  ArrowRight, 
  Phone, 
  ShieldCheck,
  ChevronUp
} from 'lucide-react';
import { SEO } from '@/components/global/SEO';
import { 
  organicProductsList, 
  trustBarItems,
  type OrganicProduct,
  type ProductVariant 
} from '@/data/organicProductsData';

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<OrganicProduct>(organicProductsList[0]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(organicProductsList[0].variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [openAccordion, setOpenAccordion] = useState<string>('description');
  const [showReview, setShowReview] = useState<boolean>(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [cartToast, setCartToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);

  const topSectionRef = useRef<HTMLDivElement>(null);

  // Switch product when clicked from bottom "Do you also have" grid
  const handleSelectProduct = (product: OrganicProduct) => {
    setSelectedProduct(product);
    setSelectedVariant(product.variants[0]);
    setQuantity(1);
    setOpenAccordion('description');
    
    // Smooth scroll to spotlight section
    if (topSectionRef.current) {
      topSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Add to cart handler
  const handleAddToCart = () => {
    const variantName = selectedVariant.label !== 'Choose an option' ? selectedVariant.label : 'Standard Order';
    const message = `Added ${quantity}x ${selectedProduct.name} (${variantName}) to cart!`;
    setCartToast({ message, visible: true });
    setIsOrderModalOpen(true);

    setTimeout(() => {
      setCartToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  // Generate WhatsApp order link
  const getWhatsAppOrderUrl = () => {
    const variantText = selectedVariant.label !== 'Choose an option' ? `Variant: ${selectedVariant.label}` : '';
    const text = `Hello Anvi Mercantile Trade Desk,
I would like to place an order from the Products catalog:
Product: ${selectedProduct.name}
${variantText}
Quantity: ${quantity}
Estimated Price: ${selectedVariant.price || selectedProduct.priceRange}

Please share proforma invoice and export shipment details.`;
    return `https://wa.me/918328246413?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <SEO
        title="Explore Organic Export Products | Anvi Mercantile"
        description="Explore fresh organic fruits, vegetables, and agro commodities. Order retail packs, export quality air sample boxes, or full refrigerated container loads (FCL) directly from verified Indian packhouses."
      />

      <div className="w-full font-sans antialiased selection:bg-[#807562]/20 selection:text-[#1F1E1B]">
        
        {/* ========================================================= */}
        {/* SECTION 1: TOP SPOTLIGHT / PRODUCT DETAIL & ORDERING      */}
        {/* ========================================================= */}
        <section 
          ref={topSectionRef}
          style={{ backgroundColor: '#F1E5C8' }} 
          className="pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-12 text-[#1F1E1B] transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
              
              {/* LEFT COLUMN: TITLE, PRICE, VARIANT, QUANTITY, BREADCRUMB, STAT */}
              <div className="lg:col-span-4 flex flex-col justify-between pt-2">
                <div>
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
                      Amount
                    </label>
                    <div className="relative inline-block w-full max-w-[280px]">
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

                  {/* 2. Ingredients */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(openAccordion === 'ingredients' ? '' : 'ingredients')}
                      className="w-full py-3 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#1F1E1B] hover:text-[#000] cursor-pointer"
                    >
                      <span>Ingredients</span>
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

                  {/* 3. Free In-Store Pickup */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(openAccordion === 'freePickup' ? '' : 'freePickup')}
                      className="w-full py-3 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#1F1E1B] hover:text-[#000] cursor-pointer"
                    >
                      <span>Free In-Store Pickup</span>
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

                  {/* 4. Premium Quality */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(openAccordion === 'premiumQuality' ? '' : 'premiumQuality')}
                      className="w-full py-3 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#1F1E1B] hover:text-[#000] cursor-pointer"
                    >
                      <span>Premium Quality</span>
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

                  {/* 5. Organic & Fair Trade */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(openAccordion === 'organicFairTrade' ? '' : 'organicFairTrade')}
                      className="w-full py-3 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#1F1E1B] hover:text-[#000] cursor-pointer"
                    >
                      <span>Organic & Fair Trade</span>
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
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#1F1E1B] text-center mb-10 sm:mb-14 tracking-tight">
              Do you also have
            </h2>

            {/* 5 Product Cards in a Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
              {organicProductsList.slice(1, 6).map((product) => {
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

            {/* Quick Link to Anvi Bulk Commodities */}
            <div className="mt-14 text-center">
              <p className="text-xs sm:text-sm text-[#7A746B] mb-3">
                Looking for 10 MT to 500 MT container shipments (Pomegranates, Basmati Rice, Grapes, Onions, Green Chillies, Makhana)?
              </p>
              <a
                href="/trade"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1F1E1B] hover:text-[#807562] underline underline-offset-4 transition-colors"
              >
                <span>View Full B2B Agro Commodity Catalog</span>
                <ArrowRight size={14} />
              </a>
            </div>

          </div>
        </section>

      </div>

      {/* ========================================================= */}
      {/* FLOATING CART TOAST NOTIFICATION                          */}
      {/* ========================================================= */}
      <AnimatePresence>
        {cartToast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#1F2420] text-white px-5 py-3 rounded-2xl shadow-2xl border border-stone-700 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShoppingBag size={16} />
            </div>
            <div>
              <div className="text-xs font-semibold">{cartToast.message}</div>
              <div className="text-[11px] text-stone-400">Order ready to checkout</div>
            </div>
            <button
              type="button"
              onClick={() => setCartToast(prev => ({ ...prev, visible: false }))}
              className="text-stone-400 hover:text-white ml-2 p-1 cursor-pointer"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* QUICK ORDER MODAL / DRAWER                                */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isOrderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-stone-200 text-[#1F1E1B] relative"
            >
              <button
                type="button"
                onClick={() => setIsOrderModalOpen(false)}
                className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-stone-100">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.altText}
                  className="w-16 h-16 object-contain rounded-xl bg-stone-50 p-2 border border-stone-100"
                />
                <div>
                  <h3 className="text-base font-bold text-stone-900 leading-tight">
                    {selectedProduct.name}
                  </h3>
                  <div className="text-xs text-[#807562] font-semibold mt-0.5">
                    {selectedVariant.price || selectedProduct.priceRange}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Quantity: {quantity} unit(s)
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6 text-xs text-stone-600 bg-stone-50 p-3.5 rounded-2xl border border-stone-200/60">
                <div className="flex items-center gap-2 text-emerald-800 font-medium">
                  <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                  <span>100% Export Grade Quality & Phytosanitary Inspected</span>
                </div>
                <div className="text-[11px] text-stone-500 pl-6">
                  Dispatched from APMC Navi Mumbai or JNPT Nhava Sheva (INNSA). Air sample orders dispatched within 48 hours.
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                {/* 1-Tap WhatsApp Checkout */}
                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Phone size={16} />
                  <span>Confirm Order via WhatsApp Trade Desk</span>
                </a>

                {/* Continue Shopping */}
                <button
                  type="button"
                  onClick={() => setIsOrderModalOpen(false)}
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium py-2.5 px-4 rounded-full text-xs transition-colors cursor-pointer"
                >
                  Continue Exploring Products
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* HIGH RESOLUTION LIGHTBOX                                  */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div 
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
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
