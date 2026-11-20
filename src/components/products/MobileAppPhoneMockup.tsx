import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  ShoppingBag, 
  MapPin, 
  ArrowRight,
  Wifi,
  Ship,
  CheckCircle2,
  Smartphone
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface MobileAppPhoneMockupProps {
  className?: string;
  onSelectCategory?: (id: string) => void;
  showHeader?: boolean;
}

const CATEGORIES = [
  { id: 'rice', label: 'Rice', img: '/images/rice.webp' },
  { id: 'chilly', label: 'Chilly', img: '/images/green_chilly.webp' },
  { id: 'fruits', label: 'Fruits', img: '/images/pomegranate.webp' },
  { id: 'makhana', label: 'Makhana', img: '/images/makhana.webp' },
  { id: 'grapes', label: 'Grapes', img: '/images/grapes.webp' },
];

export function MobileAppPhoneMockup({ 
  className = '', 
  onSelectCategory,
  showHeader = true,
}: MobileAppPhoneMockupProps) {
  const navigate = useNavigate();
  const { openCart, totalCount } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('rice');

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      navigate('/products');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={`relative select-none group/phone flex flex-col items-center ${className}`}
      aria-label="Anvi Mercantile Mobile B2B Platform Preview"
    >
      {/* 100% Centered Unboxed Header directly above mobile chassis in the middle */}
      {showHeader && (
        <div className="mb-2.5 flex items-center justify-center gap-2 text-white pointer-events-none select-none text-center">
          <Smartphone className="w-4 h-4 text-emerald-400 shrink-0 drop-shadow" />
          <span className="text-xs sm:text-sm font-bold tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
            Mobile App Coming Soon
          </span>
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
        </div>
      )}

      {/* Ambient Glow behind the Phone */}
      <div className="absolute top-8 -inset-x-4 bottom-0 bg-gradient-to-r from-emerald-500/25 via-teal-500/15 to-emerald-600/25 rounded-[56px] blur-2xl opacity-75 group-hover/phone:opacity-100 transition-opacity pointer-events-none" />

      {/* iPhone Outer Chassis / Bezel - Decreased length by 5% (585px -> 555px) */}
      <div className="w-[285px] sm:w-[300px] xl:w-[315px] h-[555px] sm:h-[584px] xl:h-[608px] rounded-[46px] border-[7px] border-slate-900 bg-[#F5F8F6] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden relative flex flex-col justify-between ring-1 ring-white/20">
        
        {/* Dynamic Island Capsule & Status Bar */}
        <div className="relative pt-2.5 px-4 flex items-center justify-between z-20 shrink-0">
          {/* Time (9:41) */}
          <span className="text-[10px] font-bold text-gray-900 tracking-tight pl-1">9:41</span>

          {/* Dynamic Island Pill */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-24 h-5 bg-black rounded-full flex items-center justify-end px-2.5 shadow-inner">
            {/* Front Camera Lens Reflection */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#1A2333] border border-gray-800/80 mr-1" />
            {/* Sensor Dot */}
            <div className="w-1 h-1 rounded-full bg-gray-900" />
          </div>

          {/* Status Bar Connectivity Icons (5G, Wifi, Battery) */}
          <div className="flex items-center gap-1.5 pr-1">
            <span className="text-[8.5px] font-black text-gray-900 tracking-tighter">5G</span>
            <Wifi className="w-3 h-3 text-gray-900" />
            <div className="w-4 h-2 border border-gray-900 rounded-[2px] p-[1px] flex items-center">
              <div className="h-full w-2.5 bg-gray-900 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Inner Phone Screen Content */}
        <div className="flex-1 flex flex-col justify-between px-3.5 pt-2 pb-2 overflow-hidden space-y-1.5">
          
          {/* 1. Partner Profile Header */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              {/* Partner Avatar */}
              <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-br from-[#135E38] to-emerald-800 flex items-center justify-center text-white text-[11px] font-black shadow-xs ring-2 ring-emerald-600/30 shrink-0">
                AM
              </div>
              <div className="flex flex-col">
                <span className="text-[11.5px] font-extrabold text-gray-950 leading-tight">Anvi Export Desk</span>
                <span className="text-[9px] text-gray-500 font-medium flex items-center gap-0.5">
                  <MapPin className="w-2.5 h-2.5 text-emerald-600" />
                  Jebel Ali · Dubai Port
                </span>
              </div>
            </div>

            {/* Header Action Buttons (Filter & Cart) */}
            <div className="flex items-center gap-1.5">
              <button 
                type="button"
                onClick={() => navigate('/products')}
                className="w-7.5 h-7.5 rounded-full bg-white border border-gray-200/90 shadow-2xs flex items-center justify-center text-gray-700 hover:text-emerald-700 transition-colors cursor-pointer"
                aria-label="Filter"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
              <button 
                type="button"
                onClick={openCart}
                className="w-7.5 h-7.5 rounded-full bg-white border border-gray-200/90 shadow-2xs flex items-center justify-center text-gray-700 relative hover:text-emerald-700 transition-colors cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                {totalCount > 0 ? (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#135E38] text-white text-[8px] font-bold flex items-center justify-center">
                    {totalCount}
                  </span>
                ) : (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#135E38]" />
                )}
              </button>
            </div>
          </div>

          {/* 2. Search Input */}
          <div>
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="w-full bg-white rounded-xl px-3 py-2.5 border border-gray-200/80 shadow-2xs flex items-center gap-2 text-left cursor-pointer hover:border-emerald-300 transition-colors group/search"
            >
              <Search className="w-3.5 h-3.5 text-gray-400 group-hover/search:text-emerald-600 transition-colors shrink-0" />
              <span className="text-[10px] text-gray-400 font-medium truncate">
                Search commodities, grades, ports...
              </span>
            </button>
          </div>

          {/* 3. Categories Row */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-extrabold text-gray-900">Categories</span>
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="text-[9.5px] font-bold text-[#135E38] hover:underline cursor-pointer"
              >
                See All
              </button>
            </div>
            <div className="grid grid-cols-5 gap-1.5 text-center">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryClick(cat.id)}
                    className="flex flex-col items-center group/cat focus:outline-hidden cursor-pointer"
                  >
                    <div 
                      className={`w-9.5 h-9.5 rounded-full bg-white shadow-2xs p-0.5 overflow-hidden flex items-center justify-center transition-all ${
                        isActive 
                          ? 'border-2 border-[#135E38] ring-2 ring-emerald-400/30 scale-105' 
                          : 'border border-gray-200/90 group-hover/cat:border-emerald-300'
                      }`}
                    >
                      <img 
                        src={cat.img} 
                        alt={cat.label} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <span 
                      className={`text-[8.5px] font-semibold mt-1 truncate w-full transition-colors ${
                        isActive ? 'text-[#135E38] font-bold' : 'text-gray-700'
                      }`}
                    >
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Featured B2B App Announcement Card (Seamless Order Placement) */}
          <div className="bg-gradient-to-br from-[#FFF8EE] via-[#FFF3DE] to-[#F1F8F4] border border-amber-200/90 rounded-2xl p-3 sm:p-3.5 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between gap-2.5">
              <div className="flex-1 pr-1">
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#135E38] text-white text-[7.5px] font-black tracking-wider uppercase shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
                  <span>COMING SOON</span>
                </div>
                <h4 className="text-[12px] font-black text-gray-950 leading-tight mt-1">
                  Seamless Order Placement
                </h4>
                <p className="text-[8.5px] text-gray-600 font-medium leading-snug mt-1">
                  Direct mill-to-port allocation, instant proforma quotes & live tracking.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/quote')}
                  className="mt-2 inline-flex items-center gap-1 text-[9px] font-bold text-[#135E38] hover:underline cursor-pointer"
                >
                  <span>Instant Proforma Quotes</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Product Thumbnail in Card */}
              <div className="w-15 h-15 rounded-xl bg-white border border-amber-200/80 shadow-2xs overflow-hidden shrink-0">
                <img 
                  src="/images/rice.webp" 
                  alt="Rice Export" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 5. Live Container Tracking Mini-Status Card */}
          <div className="bg-white/95 rounded-xl border border-gray-200/80 p-2.5 sm:p-3 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[8.5px] font-extrabold uppercase tracking-wide text-gray-500">
                Container Allocation #AM-8840
              </span>
              <span className="inline-flex items-center gap-1 text-[8px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                Transit Ready
              </span>
            </div>
            <div className="flex items-center justify-between text-[9.5px] font-bold text-gray-900">
              <div className="flex items-center gap-1.5">
                <Ship className="w-3.5 h-3.5 text-[#135E38]" />
                <span>1x40ft HC Basmati Rice</span>
              </div>
              <span className="text-gray-500 font-medium text-[8.5px]">Mundra ➔ Jebel Ali</span>
            </div>

            {/* Simulated Transit Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-[#135E38] h-full rounded-full w-[65%]" />
            </div>
          </div>

          {/* 6. Bottom Micro Tag */}
          <div className="pt-0.5 flex items-center justify-between text-[8px] text-gray-500 font-medium px-1">
            <span className="flex items-center gap-1 text-[#135E38] font-bold">
              <Smartphone className="w-2.5 h-2.5" />
              iOS &amp; Android Edition
            </span>
            <span>Early Access Open</span>
          </div>

        </div>

        {/* iPhone Bottom Home Bar Indicator */}
        <div className="w-full pb-2 pt-1 flex justify-center z-20 shrink-0">
          <div className="w-26 h-1 bg-gray-400/80 rounded-full" />
        </div>

      </div>
    </motion.div>
  );
}

export default MobileAppPhoneMockup;
