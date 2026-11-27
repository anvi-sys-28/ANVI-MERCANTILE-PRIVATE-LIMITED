import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  ArrowRight, 
  Sliders, 
  Ship, 
  Scale, 
  ShoppingBag, 
  ExternalLink, 
  Layers, 
  ChevronRight, 
  ChevronDown, 
  Droplets, 
  Wheat, 
  Box, 
  Package, 
  MapPin, 
  CheckCircle2,
  FileText,
  BarChart3
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

// --- TYPES ---
export interface RiceGrade {
  id: string;
  gradeLabel: string;
  name: string;
  code: string;
  grainLength: string;
  purity: string;
  moisture: string;
  broken: string;
  description: string;
  image: string;
  fallbackImage: string;
  rating: number;
  reviewCount: string;
  isCustom?: boolean;
}

export interface DestinationPort {
  id: string;
  name: string;
  country: string;
  transitDays: string;
}

// --- 5 AVAILABLE RICE GRADES + 1 CUSTOM MILL SPECIFICATION ---
const RICE_GRADES: RiceGrade[] = [
  {
    id: 'sona-masoori-steam',
    gradeLabel: 'Grade 1',
    name: 'Sona Masoori Steam',
    code: 'SMS-STM',
    grainLength: '5.20 mm',
    purity: '95%+',
    moisture: '≤ 12.5%',
    broken: '≤ 1.0%',
    description: 'Premium, long-grain, lightweight and versatile — ideal for export.',
    image: '/r/Sona Masoori Steam.webp',
    fallbackImage: '/images/rice/sona_masoori_steam.jpg',
    rating: 5.0,
    reviewCount: '5.2k Audited',
  },
  {
    id: 'sona-masoori-raw-aged',
    gradeLabel: 'Grade 2',
    name: '1 year old Raw Sona Masoori',
    code: 'SMS-RAW-1YR',
    grainLength: '5.20 mm',
    purity: '96%+',
    moisture: '≤ 11.5%',
    broken: '≤ 1.0%',
    description: 'Naturally aged 12+ months in monitored silos. Non-sticky, authentic sweet taste.',
    image: '/r/Raw Sona Masoori.webp',
    fallbackImage: '/images/rice/sona_masoori_raw_aged.jpg',
    rating: 4.9,
    reviewCount: '4.8k Audited',
  },
  {
    id: 'sona-masoori-boiled',
    gradeLabel: 'Grade 3',
    name: 'Boiled Sona Masoori',
    code: 'SMS-BLD',
    grainLength: '5.15 mm',
    purity: '94%+',
    moisture: '≤ 12.0%',
    broken: '≤ 1.0%',
    description: 'Nutritive parboiled golden grains, firm texture with high volumetric yield.',
    image: '/r/Boiled Sona.webp',
    fallbackImage: '/images/rice/sona_masoori_boiled.jpg',
    rating: 4.8,
    reviewCount: '3.9k Audited',
  },
  {
    id: 'hmt-sona-raw-aged',
    gradeLabel: 'Grade 4',
    name: '1 year old HMT Sona Raw',
    code: 'HMT-RAW-1YR',
    grainLength: '5.40 mm',
    purity: '96%+',
    moisture: '≤ 11.5%',
    broken: '≤ 1.0%',
    description: 'Super-slender heirloom HMT variety aged 1 year. Distinct pearl-sheen and delicate texture.',
    image: '/r/HMT Sona Raw.webp',
    fallbackImage: '/images/rice/hmt_sona_raw_aged.jpg',
    rating: 5.0,
    reviewCount: '4.6k Audited',
  },
  {
    id: 'kolam-steam',
    gradeLabel: 'Grade 5',
    name: 'Kolam Steam',
    code: 'KLM-STM',
    grainLength: '4.90 mm',
    purity: '93%+',
    moisture: '≤ 12.5%',
    broken: '≤ 1.5%',
    description: 'Silky smooth small-to-medium grains with steam-white polish. Non-greasy fluffy cooking.',
    image: '/r/Kolam Steam.webp',
    fallbackImage: '/images/rice/kolam_steam.jpg',
    rating: 4.8,
    reviewCount: '3.4k Audited',
  },
  {
    id: 'custom-mill-spec',
    gradeLabel: 'Grade 6',
    name: 'Custom Mill Specification',
    code: 'CUSTOM-OEM',
    grainLength: 'Custom Specs',
    purity: 'Up to 98%',
    moisture: 'Tailored',
    broken: '1% - 5%',
    description: 'Customized polish, single/double sortex clean, private label packaging (5kg–50kg BOPP).',
    image: '/r/Custom Mill Specification.webp',
    fallbackImage: '/images/rice/sona_masoori_steam.jpg',
    rating: 5.0,
    reviewCount: 'Private Label',
    isCustom: true,
  },
];

// --- DESTINATION PORTS ---
const DESTINATION_PORTS: DestinationPort[] = [
  { id: 'jebel-ali', name: 'Jebel Ali Port', country: 'Dubai, UAE', transitDays: '4–6 Days' },
  { id: 'jeddah', name: 'Jeddah Islamic Port', country: 'Saudi Arabia', transitDays: '7–9 Days' },
  { id: 'houston', name: 'Port of Houston', country: 'Texas, USA', transitDays: '24–28 Days' },
  { id: 'rotterdam', name: 'Port of Rotterdam', country: 'Netherlands', transitDays: '18–22 Days' },
  { id: 'klang', name: 'Port Klang', country: 'Malaysia', transitDays: '8–10 Days' },
  { id: 'felixstowe', name: 'Port of Felixstowe', country: 'United Kingdom', transitDays: '20–24 Days' },
];

export function RiceShowcaseSection() {
  const { addItem, openCart } = useCart();

  // --- RICE GRADES SHOWCASE STATE (AUTO-CHANGING IN SYNC) ---
  const [activeGradeIndex, setActiveGradeIndex] = useState<number>(0);
  const [isAutoPaused, setIsAutoPaused] = useState<boolean>(false);
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-change active rice grade every 3.8 seconds, keeping boxes and middle card in sync
  useEffect(() => {
    if (isAutoPaused) {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      return;
    }

    autoTimerRef.current = setInterval(() => {
      setActiveGradeIndex((prev) => (prev + 1) % RICE_GRADES.length);
    }, 3800);

    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [isAutoPaused]);

  const selectedGrade = useMemo(() => RICE_GRADES[activeGradeIndex], [activeGradeIndex]);

  // Left column: 3 Sona Masoori grades (0, 1, 2)
  const leftGrades = useMemo(() => RICE_GRADES.slice(0, 3), []);

  // Right column: HMT Sona Raw, Kolam Steam, Custom Mill Spec (3, 4, 5)
  const rightGrades = useMemo(() => RICE_GRADES.slice(3, 6), []);

  // --- ORDER CONFIGURATION STATE ---
  const [volumeMt, setVolumeMt] = useState<number>(10);
  const [bagSize, setBagSize] = useState<number>(25);
  const [selectedPortId, setSelectedPortId] = useState<string>('jebel-ali');
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  const selectedPort = useMemo(
    () => DESTINATION_PORTS.find((p) => p.id === selectedPortId) || DESTINATION_PORTS[0],
    [selectedPortId]
  );

  const calculatedBags = useMemo(() => {
    return Math.round((volumeMt * 1000) / bagSize);
  }, [volumeMt, bagSize]);

  const containerEstimate = useMemo(() => {
    if (volumeMt <= 25) {
      return '1 x 40ft High-Cube';
    }
    const fclCount = Math.ceil(volumeMt / 25);
    return `${fclCount} x 40ft High-Cube`;
  }, [volumeMt]);

  const handlePlaceOrder = () => {
    addItem({
      productId: `rice-${selectedGrade.id}`,
      name: `${selectedGrade.name} (${selectedGrade.code})`,
      image: selectedGrade.image,
      variantLabel: `${volumeMt} MT · ${calculatedBags.toLocaleString()} x ${bagSize}kg Bags · Port: ${selectedPort.name} (${selectedPort.country})`,
      priceDisplay: 'Export Allocation',
      unitPriceUsd: 0,
      quantity: 1,
      category: 'Grains & Superfoods',
    });

    setOrderPlaced(true);
    openCart();

    setTimeout(() => {
      setOrderPlaced(false);
    }, 4000);
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('order-configuration-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="space-y-4 sm:space-y-5 relative">

      {/* ========================================================================= */}
      {/* 2. MIDDLE ROW: 3-COLUMN SHOWCASE (AUTO-CHANGING IN SYNC WITH MIDDLE BOX)  */}
      {/* [ LEFT (3 Cols) ] | [ CENTER (6 Cols) ] | [ RIGHT (3 Cols) ] = 12 Cols   */}
      {/* ========================================================================= */}
      <div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch"
        onMouseEnter={() => setIsAutoPaused(true)}
        onMouseLeave={() => setIsAutoPaused(false)}
      >
        
        {/* ---------------------------------------------------- */}
        {/* LEFT COLUMN: OUR RICE PRODUCTS (GRADES 1, 2, 3)     */}
        {/* ---------------------------------------------------- */}
        <div className="lg:col-span-3 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center gap-2 px-1 pb-1.5">
            <span className="text-[#135E38]">
              <Layers className="w-4 h-4 stroke-[2.4]" />
            </span>
            <h2 className="text-sm font-extrabold text-gray-900 tracking-tight">
              Our Rice Products
            </h2>
          </div>

          {/* 3 Grade Items separated by normal ordinary line (No Boxes) */}
          <div className="flex flex-col flex-1 justify-between">
            {leftGrades.map((grade, idx) => {
              const isSelected = activeGradeIndex === idx;
              return (
                <div key={grade.id} className="flex flex-col justify-center">
                  <div
                    onClick={() => {
                      setActiveGradeIndex(idx);
                      setIsAutoPaused(true);
                    }}
                    className={`py-3 px-3 transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 group relative rounded-2xl ${
                      isSelected 
                        ? 'bg-[#EAF5EF] text-gray-950 shadow-2xs' 
                        : 'hover:bg-gray-50/70 text-gray-700'
                    }`}
                  >
                    {/* Left: Thumbnail in clean bowl */}
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-150 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={grade.image}
                        alt={grade.name}
                        onError={(e) => {
                          e.currentTarget.src = grade.fallbackImage;
                        }}
                        className="w-full h-full object-cover object-right rounded-lg group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                    </div>

                    {/* Middle: Name + Star Rating (NO EMOJIS) */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h3 className={`text-xs sm:text-sm line-clamp-1 transition-colors ${
                        isSelected ? 'text-gray-950 font-extrabold' : 'text-gray-900 font-semibold group-hover:text-[#135E38]'
                      }`}>
                        {grade.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-gray-500 text-[10px] font-medium">{grade.reviewCount}</span>
                      </div>
                    </div>

                    {/* Right: Grade Pill + Chevron */}
                    <div className="flex items-center gap-1 shrink-0">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-colors ${
                        isSelected ? 'bg-[#135E38] text-white shadow-2xs' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {grade.gradeLabel}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'text-[#135E38] translate-x-0.5' : 'text-gray-400 group-hover:text-gray-600'
                      }`} />
                    </div>
                  </div>

                  {/* Normal ordinary separation line between grades */}
                  {idx < leftGrades.length - 1 && (
                    <div className="border-b border-gray-200/90 my-1 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* CENTER COLUMN: FEATURE CARD WITH BACKGROUND IMAGE FROM /public/r  */}
        {/* ----------------------------------------------------------------- */}
        <div className="lg:col-span-6">
          <div className="h-full min-h-[310px] bg-[#072013] border border-[#17462C] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between text-white relative overflow-hidden group">
            
            {/* Background Image from /public/r with smooth cross-fade transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedGrade.id}
                initial={{ opacity: 0.25 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.25 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={selectedGrade.image}
                  alt={selectedGrade.name}
                  onError={(e) => {
                    e.currentTarget.src = selectedGrade.fallbackImage;
                  }}
                  className="w-full h-full object-cover object-right pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>

            {/* Dark green gradient overlay on the left side to ensure 100% text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#072013] via-[#092B1A]/95 via-50% sm:via-[#092B1A]/80 sm:via-55% to-transparent pointer-events-none z-1" />

            {/* Top Badges Row */}
            <div className="flex items-center gap-2 z-10">
              <span className="bg-[#1E7D4E] text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-2xs">
                {selectedGrade.gradeLabel}
              </span>
              <span className="bg-white/10 text-white/90 border border-white/20 text-[10px] font-bold px-3 py-0.5 rounded-full backdrop-blur-xs tracking-wider uppercase">
                100% EXPORT GRADE • SORTEX CLEANED
              </span>
            </div>

            {/* Title & Subtitle with smooth motion */}
            <motion.div 
              key={`text-${selectedGrade.id}`}
              initial={{ opacity: 0.7, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-1.5 z-10 pt-2 max-w-[62%] sm:max-w-[58%]"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
                {selectedGrade.name}
              </h2>
              <p className="text-xs sm:text-sm text-white/85 font-normal leading-relaxed drop-shadow-xs">
                {selectedGrade.description}
              </p>
            </motion.div>

            {/* 4 Specs Icons Row (NO EMOJIS, CLEAN SVG ICONS) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 z-10 pt-3 max-w-[70%] sm:max-w-[65%]">
              <div className="flex items-center gap-1.5 text-[11px] text-white/90">
                <Wheat className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Grain Length <strong>{selectedGrade.grainLength}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-white/90">
                <Droplets className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Purity <strong>{selectedGrade.purity}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-white/90">
                <Droplets className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Moisture <strong>{selectedGrade.moisture}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-white/90">
                <Wheat className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Broken <strong>{selectedGrade.broken}</strong></span>
              </div>
            </div>

            {/* Configure Shipment White Button */}
            <div className="z-10 pt-4">
              <button
                type="button"
                onClick={scrollToCalculator}
                className="bg-white hover:bg-gray-100 active:scale-98 text-gray-900 font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Configure Shipment</span>
                <ArrowRight className="w-4 h-4 text-gray-900" />
              </button>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* RIGHT COLUMN: GRADES 4, 5, 6 (MATCHING LEFT COLUMN)  */}
        {/* ---------------------------------------------------- */}
        <div className="lg:col-span-3 flex flex-col justify-between">
          {/* Spacer to align with Left Column's title */}
          <div className="h-6 hidden lg:block" />

          {/* 3 Grade Items separated by normal ordinary line (No Boxes) */}
          <div className="flex flex-col flex-1 justify-between">
            {rightGrades.map((grade, rIdx) => {
              const actualIdx = rIdx + 3;
              const isSelected = activeGradeIndex === actualIdx;
              return (
                <div key={grade.id} className="flex flex-col justify-center">
                  <div
                    onClick={() => {
                      setActiveGradeIndex(actualIdx);
                      setIsAutoPaused(true);
                    }}
                    className={`py-3 px-3 transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 group relative rounded-2xl ${
                      isSelected 
                        ? 'bg-[#EAF5EF] text-gray-950 shadow-2xs' 
                        : 'hover:bg-gray-50/70 text-gray-700'
                    }`}
                  >
                    {/* Left: Thumbnail in clean bowl / bag */}
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-150 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                      {grade.isCustom ? (
                        <div className="w-full h-full bg-emerald-50 rounded flex flex-col items-center justify-center text-emerald-800">
                          <Package className="w-5 h-5 stroke-[1.8]" />
                        </div>
                      ) : (
                        <img
                          src={grade.image}
                          alt={grade.name}
                          onError={(e) => {
                            e.currentTarget.src = grade.fallbackImage;
                          }}
                          className="w-full h-full object-cover object-right rounded-lg group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Middle: Name + Star Rating / Private Label (NO EMOJIS) */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h3 className={`text-xs sm:text-sm line-clamp-1 transition-colors ${
                        isSelected ? 'text-gray-950 font-extrabold' : 'text-gray-900 font-semibold group-hover:text-[#135E38]'
                      }`}>
                        {grade.name}
                      </h3>
                      {grade.isCustom ? (
                        <span className="text-gray-500 text-[10px] font-medium block">
                          (Private Label)
                        </span>
                      ) : (
                        <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-gray-500 text-[10px] font-medium">{grade.reviewCount}</span>
                        </div>
                      )}
                    </div>

                    {/* Right: Grade Pill + Chevron */}
                    <div className="flex items-center gap-1 shrink-0">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-colors ${
                        isSelected ? 'bg-[#135E38] text-white shadow-2xs' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {grade.gradeLabel}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'text-[#135E38] translate-x-0.5' : 'text-gray-400 group-hover:text-gray-600'
                      }`} />
                    </div>
                  </div>

                  {/* Normal ordinary separation line between grades */}
                  {rIdx < rightGrades.length - 1 && (
                    <div className="border-b border-gray-200/90 my-1 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM ROW: OPEN COLUMN LAYOUT WITH DOTTED DIVIDER LINES (NO BOXES)    */}
      {/* [ ORDER CONFIG (4 Cols) ] : [ METRIC & DESTINATION (5) ] : [ ALLOC (3) ]   */}
      {/* ========================================================================= */}
      <div 
        id="order-configuration-section"
        className="w-full border-t-2 border-dotted border-gray-300 pt-6 sm:pt-7"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-dotted divide-gray-300">
          
          {/* ---------------------------------------------------- */}
          {/* SECTION 1 (LEFT): ORDER CONFIGURATION (4 COLS)       */}
          {/* ---------------------------------------------------- */}
          <div className="lg:col-span-4 pb-6 lg:pb-0 lg:pr-6 sm:lg:pr-8 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-900 font-extrabold text-sm sm:text-base">
                <Sliders className="w-4 h-4 text-[#135E38]" />
                <span>Order Configuration</span>
              </div>
              <p className="text-xs text-gray-500 font-normal">
                Set your order volume and bag size.
              </p>
            </div>

            {/* Volume (MT) Slider */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-800">
                  Volume (MT)
                </span>
                <span className="font-mono text-xs font-extrabold text-[#135E38] bg-[#EAF5EF] border border-[#CDE8D8] px-3 py-0.5 rounded-full">
                  {volumeMt} MT
                </span>
              </div>

              <input
                type="range"
                min={10}
                max={250}
                step={5}
                value={volumeMt}
                onChange={(e) => setVolumeMt(Number(e.target.value))}
                className="w-full h-2 bg-gray-150 rounded-full appearance-none cursor-pointer accent-[#0B2C1B]"
              />

              {/* Presets Row - Smooth Pills */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {[10, 25, 50, 100].map((mt) => (
                  <button
                    key={mt}
                    type="button"
                    onClick={() => setVolumeMt(mt)}
                    className={`text-xs font-bold py-1.5 px-2 rounded-full transition-all cursor-pointer text-center ${
                      volumeMt === mt 
                        ? 'bg-[#0B2C1B] text-white shadow-xs' 
                        : 'bg-gray-50 border border-gray-200/90 text-gray-700 hover:bg-gray-100 hover:text-gray-950'
                    }`}
                  >
                    {mt} MT
                  </button>
                ))}
              </div>
            </div>

            {/* Bag Unit Size Stepped Buttons - Smooth Pills */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-gray-800 block">
                Bag Unit Size
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {[5, 10, 20, 25, 50].map((kg) => (
                  <button
                    key={kg}
                    type="button"
                    onClick={() => setBagSize(kg)}
                    className={`py-1.5 text-center text-xs font-bold rounded-full border transition-all cursor-pointer ${
                      bagSize === kg
                        ? 'bg-[#0B2C1B] border-[#0B2C1B] text-white shadow-xs'
                        : 'bg-gray-50 border-gray-200/90 text-gray-700 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-950'
                    }`}
                  >
                    {kg} kg
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 2 (CENTER): OVERVIEW OF METRIC & DESTINATION */}
          {/* ---------------------------------------------------- */}
          <div className="lg:col-span-5 py-6 lg:py-0 lg:px-6 sm:lg:px-8 flex flex-col justify-between space-y-4">
            {/* Header Row (NO EMOJIS) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-gray-900 font-extrabold text-sm sm:text-base">
                <BarChart3 className="w-4 h-4 text-[#135E38]" />
                <span>Overview of Metric &amp; Destination Details</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#135E38] bg-[#EAF5EF] border border-[#CDE8D8] px-2.5 py-0.5 rounded-full">
                <Ship className="w-3 h-3 text-[#135E38]" />
                <span>Ocean Freight Ready</span>
              </span>
            </div>

            {/* 3 Metric Stats - Clean Open Stat Displays (NO BOX BORDERS) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 py-1">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#EAF5EF] flex items-center justify-center text-[#135E38] shrink-0">
                  <Box className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-gray-500 font-medium block">Total Volume</span>
                  <span className="text-sm sm:text-base font-extrabold text-gray-900 block leading-tight">{volumeMt} MT</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#EAF5EF] flex items-center justify-center text-[#135E38] shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-gray-500 font-medium block">Total Bag Units</span>
                  <span className="text-sm sm:text-base font-extrabold text-gray-900 block leading-tight">{calculatedBags.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#EAF5EF] flex items-center justify-center text-[#135E38] shrink-0">
                  <Ship className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-gray-500 font-medium block">Container Load</span>
                  <span className="text-xs sm:text-sm font-extrabold text-gray-900 block leading-tight whitespace-nowrap" title={containerEstimate}>
                    {volumeMt <= 25 ? '1 × 40ft HC' : `${Math.ceil(volumeMt / 25)} × 40ft HC`}
                  </span>
                </div>
              </div>
            </div>

            {/* Destination Port Select - Clean Dropdown */}
            <div className="space-y-1">
              <label htmlFor="destination-port-select" className="text-xs font-bold text-gray-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                <span>Discharge Destination Port</span>
              </label>
              <div className="relative">
                <select
                  id="destination-port-select"
                  value={selectedPortId}
                  onChange={(e) => setSelectedPortId(e.target.value)}
                  className="w-full bg-white border border-gray-250 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#135E38]/20 focus:border-[#135E38] cursor-pointer appearance-none pr-8 shadow-2xs transition-all"
                >
                  {DESTINATION_PORTS.map((port) => (
                    <option key={port.id} value={port.id}>
                      {port.name} ({port.country}) — Transit ~{port.transitDays}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 3 Verification Pills at Bottom (NO EMOJIS, CLEAN SVG ICONS) */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px] text-gray-700">
              <span className="inline-flex items-center gap-1 bg-[#F2F8F4] text-[#135E38] font-bold px-3 py-1 rounded-full border border-[#D5EADB]">
                <CheckCircle2 className="w-3 h-3 text-[#135E38]" />
                <span>APEDA &amp; SGS Inspected</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-700 font-bold px-3 py-1 rounded-full border border-gray-200">
                <FileText className="w-3 h-3 text-gray-500" />
                <span>FOB Mundra / CIF Discharge</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 font-bold px-3 py-1 rounded-full border border-amber-200">
                <Scale className="w-3 h-3 text-amber-600" />
                <span>Tare Weight Certified</span>
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 3 (RIGHT): SELECTED RICE ALLOCATION (3 COLS) */}
          {/* ---------------------------------------------------- */}
          <div className="lg:col-span-3 pt-6 lg:pt-0 lg:pl-6 sm:lg:pl-8 flex flex-col justify-between space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2 text-gray-900 font-extrabold text-sm sm:text-base">
              <Layers className="w-4 h-4 text-[#135E38]" />
              <span>Selected Rice Allocation</span>
            </div>

            {/* Selected Summary Details - Clean Open Layout (NO BOX BORDER) */}
            <div className="space-y-1.5 py-1">
              <h4 className="font-extrabold text-base text-gray-950 tracking-tight line-clamp-1">
                {selectedGrade.name}
              </h4>
              <p className="text-xs text-gray-600 font-medium">
                {volumeMt} MT · {selectedPort.name}
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-1 text-[11px] font-semibold text-[#135E38]">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  Zero Brokerage
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  Direct Farm Sourcing
                </span>
              </div>
            </div>

            {/* Place Order CTA Button - Smooth Full Pill Button */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full bg-[#0B2C1B] hover:bg-[#135E38] active:scale-98 text-white font-extrabold text-sm sm:text-base py-3.5 px-5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Place Order</span>
              </button>

              <Link
                to="/quote"
                className="w-full inline-flex items-center justify-center gap-1 text-xs font-bold text-gray-600 hover:text-[#0B2C1B] py-0.5 transition-colors"
              >
                <span>Request Custom Proforma Quote</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Success Toast notification when placed */}
      <AnimatePresence>
        {orderPlaced && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3 bg-[#0B2C1B] text-white rounded-xl flex items-center justify-between text-xs font-semibold shadow-lg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 stroke-[3]" />
              <span>
                Order configuration for <strong>{volumeMt} MT of {selectedGrade.name}</strong> staged in Cart!
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOrderPlaced(false)}
              className="text-emerald-200 hover:text-white text-xs ml-2 cursor-pointer"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
