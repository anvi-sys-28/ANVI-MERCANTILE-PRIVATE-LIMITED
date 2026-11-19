import { useState, useEffect, useRef } from 'react';
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
  const [isSlidePaused, setIsSlidePaused] = useState<boolean>(false);
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll slides horizontally every 4.5s
  useEffect(() => {
    if (isSlidePaused) {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
      return;
    }

    slideTimerRef.current = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % PRODUCT_SLIDES.length);
    }, 4500);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [isSlidePaused]);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % PRODUCT_SLIDES.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + PRODUCT_SLIDES.length) % PRODUCT_SLIDES.length);
  };

  return (
    <section 
      className="w-full relative bg-white border-b border-gray-200/80 shadow-2xs select-none group overflow-hidden h-[195px] sm:h-[220px] lg:h-[235px]"
      onMouseEnter={() => setIsSlidePaused(true)}
      onMouseLeave={() => setIsSlidePaused(false)}
      aria-label="Export Commodity Featured Showcase"
    >
      {/* Horizontal Continuous Sliding Track */}
      <div 
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      >
        {PRODUCT_SLIDES.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full shrink-0 relative flex items-center overflow-hidden"
          >
            {/* Background Panoramic Commodity Image stretching to the far right */}
            <img
              src={slide.image}
              alt={slide.label}
              onError={(e) => {
                e.currentTarget.src = slide.fallbackImage;
              }}
              className="absolute right-0 top-0 bottom-0 w-full lg:w-[68%] xl:w-[62%] h-full object-cover object-right pointer-events-none"
              loading="eager"
            />

            {/* Smooth Gradient Overlay across full width for high typography contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-35% sm:via-white/90 sm:via-45% to-transparent pointer-events-none z-1" />

            {/* Centered Content Container matching the 12-column layout grid */}
            <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center space-y-1.5 sm:space-y-2 z-10">
              {/* Category Badge (NO EMOJIS) */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAF5EF] border border-[#CDE8D8] text-[#135E38] text-[10px] sm:text-[11px] font-bold tracking-wide uppercase w-fit">
                <Leaf className="w-3 h-3 text-[#135E38]" />
                <span>{slide.categoryBadge}</span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-[27px] font-extrabold text-gray-900 tracking-tight leading-tight">
                {slide.titlePrefix}{' '}
                <span className="text-[#135E38]">{slide.titleHighlight}</span>
              </h1>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-gray-600 max-w-lg font-normal leading-relaxed line-clamp-2">
                {slide.description}
              </p>

              {/* 3 Verification Pills (NO EMOJIS, CLEAN SVG ICONS) */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <span className="inline-flex items-center gap-1 bg-white border border-gray-200/90 rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-gray-700 shadow-2xs">
                  <Leaf className="w-3 h-3 text-[#135E38]" />
                  <span>Export Grade</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-white border border-gray-200/90 rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-gray-700 shadow-2xs">
                  <ShieldCheck className="w-3 h-3 text-[#135E38]" />
                  <span>Verified Purity</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-white border border-gray-200/90 rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-gray-700 shadow-2xs">
                  <Package className="w-3 h-3 text-[#135E38]" />
                  <span>Container Ready</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Jump Pill Selector (R, C, P, M, G, GU) */}
      <div className="absolute bottom-2.5 left-4 sm:left-6 lg:left-8 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-gray-200/90 shadow-2xs">
        {PRODUCT_SLIDES.map((slide, sIdx) => {
          const isActive = slideIndex === sIdx;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setSlideIndex(sIdx)}
              className={`text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                isActive 
                  ? 'bg-[#135E38] text-white shadow-2xs' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title={slide.label}
            >
              {slide.code}
            </button>
          );
        })}
      </div>

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
