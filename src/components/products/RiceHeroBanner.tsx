import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, ShieldCheck, Package, ChevronLeft, ChevronRight } from 'lucide-react';

export interface ProductSlide {
  id: string;
  code: string;
  label: string;
  categoryBadge: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  image: string;
  fallbackImage: string;
}

const PRODUCT_SLIDES: ProductSlide[] = [
  {
    id: 'r',
    code: 'R',
    label: 'Rice',
    categoryBadge: 'APEDA CERTIFIED EXPORT GRAINS',
    titlePrefix: 'Featured Brand Products —',
    titleHighlight: 'Premium Indian Rice',
    description: 'Direct-from-mill Sona Masoori & Kolam varieties, export-grade quality with verified purity, moisture control and container-ready standards.',
    image: '/r.png',
    fallbackImage: '/images/rice_hero_banner.jpg',
  },
  {
    id: 'c',
    code: 'C',
    label: 'Chilly',
    categoryBadge: 'APEDA CERTIFIED FRESH SPICES',
    titlePrefix: 'Featured Brand Products —',
    titleHighlight: 'Fresh Green Chilly',
    description: 'Farm-fresh G4 & pungent green chillies, sortex graded, pre-cooled and packed in ventilated reefer export cartons.',
    image: '/c.png',
    fallbackImage: '/images/green_chilly.webp',
  },
  {
    id: 'p',
    code: 'P',
    label: 'Pomegranate',
    categoryBadge: 'GLOBALGAP & APEDA CERTIFIED FRUITS',
    titlePrefix: 'Featured Brand Products —',
    titleHighlight: 'Ruby Red Pomegranates',
    description: 'Direct-from-orchard Bhagwa variety with deep red arils, high Brix sweetness, packed in 3.5kg / 5kg export CFB master boxes.',
    image: '/p.png',
    fallbackImage: '/images/pomegranate.webp',
  },
  {
    id: 'm',
    code: 'M',
    label: 'Makhana',
    categoryBadge: '100% ORGANIC CERTIFIED SUPERFOOD',
    titlePrefix: 'Featured Brand Products —',
    titleHighlight: 'Organic Popped Makhana',
    description: 'Jumbo 5-6 sutta graded lotus foxnuts, roasted white, moisture-sealed in nitrogen-flushed food-grade export packaging.',
    image: '/m.png',
    fallbackImage: '/images/makhana.webp',
  },
  {
    id: 'g',
    code: 'G',
    label: 'Grapes',
    categoryBadge: 'GLOBALGAP CERTIFIED FRESH PRODUCE',
    titlePrefix: 'Featured Brand Products —',
    titleHighlight: 'Sweet Seedless Grapes',
    description: 'Thompson seedless & Sharad dark purple table grapes, harvested at optimum Brix with sulphur-pad cold chain protection.',
    image: '/g.png',
    fallbackImage: '/images/grapes.webp',
  },
  {
    id: 'gu',
    code: 'GU',
    label: 'Guava',
    categoryBadge: 'FARM-DIRECT TROPICAL EXPORTS',
    titlePrefix: 'Featured Brand Products —',
    titleHighlight: 'Farm-Fresh Pink Guavas',
    description: 'Taiwan Pink and Allahabad Safeda guavas, individually foam-netted with crisp texture, high vitamin C and rich aroma.',
    image: '/gu.png',
    fallbackImage: '/images/guava.webp',
  },
];

export function RiceHeroBanner() {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isSlidePaused, setIsSlidePaused] = useState<boolean>(false);
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isSlidePaused) {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
      return;
    }

    slideTimerRef.current = setInterval(() => {
      setDirection(1);
      setSlideIndex((prev) => (prev + 1) % PRODUCT_SLIDES.length);
    }, 4500);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [isSlidePaused]);

  const activeSlide = PRODUCT_SLIDES[slideIndex];

  const nextSlide = () => {
    setDirection(1);
    setSlideIndex((prev) => (prev + 1) % PRODUCT_SLIDES.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setSlideIndex((prev) => (prev - 1 + PRODUCT_SLIDES.length) % PRODUCT_SLIDES.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0.75,
    }),
    center: {
      x: '0%',
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0.75,
    }),
  };

  return (
    <section 
      className="w-full relative bg-white border-b border-gray-200/80 shadow-2xs select-none group overflow-hidden h-[200px] sm:h-[225px] lg:h-[245px]"
      onMouseEnter={() => setIsSlidePaused(true)}
      onMouseLeave={() => setIsSlidePaused(false)}
      aria-label="Export Commodity Featured Showcase"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={activeSlide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 260, damping: 28 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* True Full Background Image spanning 100% of the entire banner */}
          <img
            src={activeSlide.image}
            alt={activeSlide.label}
            onError={(e) => {
              e.currentTarget.src = activeSlide.fallbackImage;
            }}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            loading="eager"
          />

          {/* Enhanced white-to-transparent gradient wash ensuring 100% text readability against any green or rich background imagery */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 via-40% sm:via-white/50 sm:via-55% to-transparent pointer-events-none z-1" />

          {/* Centered Content Container matching the 12-column layout grid */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center space-y-1.5 sm:space-y-2 z-10">
            {/* Category Badge (APEDA / GlobalGAP Certified - High-Contrast Charcoal Text) */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-gray-200/90 text-gray-900 text-[10px] sm:text-[11px] font-bold tracking-wide uppercase w-fit shadow-xs">
              <Leaf className="w-3.5 h-3.5 text-[#0F6F3E]" />
              <span>{activeSlide.categoryBadge}</span>
            </div>

            {/* Title - Bold High-Contrast Black/Charcoal Text (No Green Blending) */}
            <h1 className="text-xl sm:text-2xl lg:text-[28px] font-extrabold tracking-tight leading-tight">
              <span className="text-gray-700">{activeSlide.titlePrefix} </span>
              <span className="text-gray-950 font-black">{activeSlide.titleHighlight}</span>
            </h1>

            {/* Description */}
            <p className="text-[11px] sm:text-xs text-gray-700 font-medium max-w-lg leading-relaxed line-clamp-2">
              {activeSlide.description}
            </p>

            {/* 3 Verification Pills (High-Contrast Charcoal Text) */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-full px-3 py-0.5 text-[10px] sm:text-[11px] font-semibold text-gray-900 shadow-xs">
                <Leaf className="w-3 h-3 text-[#0F6F3E]" />
                <span>Export Grade</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-full px-3 py-0.5 text-[10px] sm:text-[11px] font-semibold text-gray-900 shadow-xs">
                <ShieldCheck className="w-3 h-3 text-[#0F6F3E]" />
                <span>Verified Purity</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-full px-3 py-0.5 text-[10px] sm:text-[11px] font-semibold text-gray-900 shadow-xs">
                <Package className="w-3 h-3 text-[#0F6F3E]" />
                <span>Container Ready</span>
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next Slide Arrows on Hover */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-gray-200/90 shadow-xs flex items-center justify-center text-gray-700 hover:text-[#135E38] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-gray-200/90 shadow-xs flex items-center justify-center text-gray-700 hover:text-[#135E38] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </section>
  );
}

export default RiceHeroBanner;
