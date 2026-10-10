import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import InkBlotCarousel from '@/components/ui/ink-blot-carousel';
import CountUp from '@/components/ui/CountUp';

const CAROUSEL_SLIDES = [
  {
    image: "/images/green_chilly.jpg",
    title: "Fresh Premium Green Chilly",
    caption: "All grades available. Starting from just $1.26/kg (30% below international market rate).",
    alt: "Fresh Premium Green Chilly export",
  },
  {
    image: "/images/pomegranate.jpg",
    title: "Fresh Ruby Pomegranates",
    caption: "All grades available. Starting from just $2.45/kg (30% below international market rate).",
    alt: "Fresh Pomegranates export",
  },
  {
    image: "/images/onion.jpg",
    title: "Farm Fresh Onions",
    caption: "All grades available. Starting from just $0.56/kg (30% below international market rate).",
    alt: "Fresh Onions export",
  },
  {
    image: "/images/makhana.jpg",
    title: "Organic Popped Makhana",
    caption: "All grades available. Starting from just $8.40/kg (30% below international market rate).",
    alt: "Organic Makhana export",
  },
  {
    image: "/images/guava.jpg",
    title: "Fresh Pink Guava",
    caption: "All grades available. Starting from just $1.54/kg (30% below international market rate).",
    alt: "Fresh Guava export",
  },
  {
    image: "/images/grapes.jpg",
    title: "Sweet Seedless Grapes",
    caption: "All grades available. Starting from just $1.96/kg (30% below international market rate).",
    alt: "Fresh Grapes export",
  },
];

export function HeroSection() {
  const [showCarousel, setShowCarousel] = useState(false);
  const [resetKey] = useState(0);

  // Automatically switch Hero UI to InkBlotCarousel view after 10 seconds
  useEffect(() => {
    if (showCarousel) return;

    const timer = setTimeout(() => {
      setShowCarousel(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [showCarousel]);

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden font-sans">
      
      {/* 10-Second Live Countdown Badge positioned at TOP RIGHT SIDE */}
      <AnimatePresence>
        {!showCarousel && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-24 sm:top-28 right-6 lg:right-12 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-2xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span className="text-xs font-mono text-white/90">
              Switching UI in{' '}
              <span className="font-bold text-sky-400">
                <CountUp
                  key={resetKey}
                  from={0}
                  to={10}
                  duration={10}
                  direction="down"
                  onEnd={() => setShowCarousel(true)}
                />
                s
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showCarousel ? (
          /* CLEAN & PROFESSIONAL HERO UI */
          <motion.section
            key="standard-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
            className="relative w-full min-h-screen pt-28 lg:pt-36 pb-16 flex flex-col justify-between"
          >
            {/* b.png Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src="/b.png"
                alt="Anvi Mercantile Ocean Cargo Ship"
                width="2400"
                height="1400"
                fetchPriority="high"
                loading="eager"
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/45 backdrop-brightness-95 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
            </div>

            {/* Main Center Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full my-auto flex flex-col justify-between min-h-[calc(100vh-180px)]">
              
              {/* Upper Content: Headline + CTA & Social Proof */}
              <div className="space-y-8 max-w-3xl pt-6 sm:pt-10">

                {/* Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="text-5xl sm:text-7xl lg:text-[82px] font-normal text-white tracking-tight leading-[1.04] font-sans"
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
                  {/* Clean Pill Button */}
                  <Link
                    to="/quote"
                    className="inline-flex items-center gap-3 bg-white hover:bg-slate-100 text-slate-950 font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-lg transition-all transform hover:scale-105 group"
                  >
                    <span>Get a Quote</span>
                    <div className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>

                  {/* Social Proof Avatars + CountUp */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-2 overflow-hidden">
                      <img
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                        alt="Leader"
                      />
                      <img
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover"
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                        alt="Leader"
                      />
                      <img
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover"
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                        alt="Leader"
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

              </div>

              {/* Lower Content: Paragraph Description at Bottom Left */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="pt-12"
              >
                <p className="text-xs sm:text-sm text-white/80 max-w-lg font-normal leading-relaxed">
                  Exporting premium quality agricultural commodities — including red chilly, red & golden onions, ruby pomegranates, pink guavas, sweet grapes, and organic makhana — delivered reliably across international trade routes.
                </p>
              </motion.div>

            </div>
          </motion.section>
        ) : (
          /* INK BLOT CAROUSEL HERO UI (Featuring Pure White Text ink="#FFFFFF") */
          <motion.section
            key="carousel-hero"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-screen"
          >
            <InkBlotCarousel
              slides={CAROUSEL_SLIDES}
              height="100vh"
              duration={2200}
              bleed={95}
              autoplay={5000}
              ink="#FFFFFF"
            />
          </motion.section>
        )}
      </AnimatePresence>

    </div>
  );
}
