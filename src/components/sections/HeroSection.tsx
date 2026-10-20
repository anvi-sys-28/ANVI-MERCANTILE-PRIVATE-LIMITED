import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import InkBlotCarousel from '@/components/ui/ink-blot-carousel';
import CountUp from '@/components/ui/CountUp';
import { QuickOrderBox } from '@/components/home/QuickOrderBox';

const CAROUSEL_SLIDES = [
  {
    image: "/images/green_chilly.webp",
    title: "Fresh Premium Green Chilly",
    caption: "Export Grade G4 / Jwala pungent green chillies direct from Maharashtra farms. Starting from $1.26/kg (MOQ 10 MT).",
    alt: "Fresh Premium Green Chilly export",
  },
  {
    image: "/images/pomegranate.webp",
    title: "Fresh Ruby Pomegranates",
    caption: "Bhagwa variety, Brix 16%+, export graded in 3.5kg / 5kg ventilated CFB cartons. Starting from $2.45/kg.",
    alt: "Fresh Pomegranates export",
  },
  {
    image: "/images/rice.webp",
    title: "Premium Indian Basmati Rice",
    caption: "Traditional 1121 XXL Steam & Sella Basmati. Starting from $0.98/kg (MOQ 25 MT FCL).",
    alt: "Premium Indian Basmati Rice export",
  },
  {
    image: "/images/onion.webp",
    title: "Farm Fresh Nashik Red Onions",
    caption: "Garwa / Summer crop fresh red onions (45mm - 55mm+). Starting from $0.48/kg in mesh bags.",
    alt: "Fresh Onions export",
  },
  {
    image: "/images/makhana.webp",
    title: "Organic Popped Makhana",
    caption: "Jumbo handpicked foxnuts (4 to 6+ sutta), naturally organic & gluten-free. Starting from $8.40/kg.",
    alt: "Organic Makhana export",
  },
  {
    image: "/images/guava.webp",
    title: "Fresh Pink Guavas",
    caption: "Taiwan Pink / VNR variety, crisp texture and aromatic sweet pulp. Starting from $1.15/kg.",
    alt: "Fresh Guava export",
  },
  {
    image: "/images/grapes.webp",
    title: "Sweet Seedless Grapes",
    caption: "Thompson Seedless export grade, Berry size 16mm-18mm+. Starting from $1.85/kg.",
    alt: "Fresh Grapes export",
  },
];

export function HeroSection() {
  const [showCarousel, setShowCarousel] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // 10-Second Live Integer Countdown (10 -> 0)
  useEffect(() => {
    if (showCarousel) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowCarousel(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showCarousel]);

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden font-sans">
      
      {/* Countdown Indicator during first 10 seconds */}
      <AnimatePresence mode="wait">
        {!showCarousel && (
          <motion.div
            key={countdown}
            initial={{ opacity: 0.5, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.2 }}
            className="absolute top-24 sm:top-28 right-6 lg:right-12 z-40 font-sans text-right select-none pointer-events-none"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a46b] block">
              Agri Catalog in
            </span>
            <span className="font-extrabold text-3xl sm:text-4xl text-white drop-shadow-md">
              {countdown}s
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showCarousel ? (
          /* STATE 1: OCEAN CARGO SHIP (First 10 seconds) - ORDER BOX ON THE RIGHT SIDE */
          <motion.section
            key="standard-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
            className="relative w-full min-h-screen pt-28 lg:pt-36 pb-16 flex flex-col justify-between"
          >
            {/* b.webp Ocean Ship Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src="/b.webp"
                alt="Anvi Mercantile Ocean Cargo Ship"
                width="2400"
                height="1400"
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/45 backdrop-brightness-95 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
            </div>

            {/* Main Center Container: Headline on Left, Ordering Box on Right */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full my-auto flex flex-col lg:flex-row items-center justify-between gap-10 min-h-[calc(100vh-180px)]">
              
              {/* Left Column: Headline, CTA & Social Proof */}
              <div className="space-y-8 max-w-2xl pt-4 lg:pt-0">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="text-4xl sm:text-6xl lg:text-[76px] font-normal text-white tracking-tight leading-[1.04] font-sans"
                >
                  Built for Oceans. <br />
                  Trusted by fleets.
                </motion.h1>

                {/* CTA Button + Social Proof Row */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="flex flex-wrap items-center gap-5 pt-1"
                >
                  <Link
                    to="/trade"
                    className="inline-flex items-center gap-3 bg-white hover:bg-slate-100 text-slate-950 font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-lg transition-all transform hover:scale-105 group"
                  >
                    <span>Browse Catalog</span>
                    <div className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>

                  {/* Social Proof */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-2 overflow-hidden">
                      <img
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                        alt="Leader"
                        width="28"
                        height="28"
                        loading="lazy"
                        decoding="async"
                      />
                      <img
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover"
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                        alt="Leader"
                        width="28"
                        height="28"
                        loading="lazy"
                        decoding="async"
                      />
                      <img
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover"
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                        alt="Leader"
                        width="28"
                        height="28"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <span className="text-xs text-white/80 font-normal">
                      Trusted by{' '}
                      <span className="font-semibold text-white">
                        <CountUp from={0} to={500} duration={2.5} separator="," />+
                      </span>{' '}
                      industry leaders
                    </span>
                  </div>
                </motion.div>

                {/* Paragraph Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="pt-6"
                >
                  <p className="text-xs sm:text-sm text-white/80 max-w-lg font-normal leading-relaxed">
                    Exporting premium quality agricultural commodities — including premium Indian Basmati rice, fresh green chilly, red &amp; golden onions, ruby pomegranates, pink guavas, sweet grapes, and organic makhana — delivered reliably across international trade routes.
                  </p>
                </motion.div>
              </div>

              {/* Right Column: ORDER BOX ON THE RIGHT SIDE */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-auto flex justify-center lg:justify-end shrink-0"
              >
                <QuickOrderBox position="right" />
              </motion.div>

            </div>
          </motion.section>
        ) : (
          /* STATE 2: PRODUCE CAROUSEL (After 10 seconds) - ORDER BOX SHIFTS TOWARDS THE LEFT SIDE */
          <motion.section
            key="carousel-hero"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-screen"
          >
            {/* Background Ink Blot Carousel with Produce Slides */}
            <InkBlotCarousel
              slides={CAROUSEL_SLIDES}
              height="100vh"
              duration={2200}
              bleed={95}
              autoplay={5000}
              ink="#FFFFFF"
            />

            {/* ORDER BOX ON THE LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute z-30 top-24 sm:top-28 lg:top-32 left-4 sm:left-6 lg:left-12"
            >
              <QuickOrderBox position="left" />
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

    </div>
  );
}
