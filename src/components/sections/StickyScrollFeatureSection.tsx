import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Ship, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ArrowUpRight, 
  Thermometer, 
  FileCheck 
} from 'lucide-react';

interface StickyScrollFeatureSectionProps {
  /** Video source URL. Defaults to premier ocean freight cargo video */
  videoUrl?: string;
  /** Fallback poster image path */
  posterUrl?: string;
}

const PRODUCE_ITEMS = [
  'FRESH GREEN CHILLI',
  'RED & GOLDEN ONIONS',
  'RUBY POMEGRANATES',
  'SWEET SEEDLESS GRAPES',
  'ORGANIC POPPED MAKHANA',
  'FRESH PINK GUAVA',
];

export function StickyScrollFeatureSection({
  videoUrl = '/b.mp4',
  posterUrl = '/b.png',
}: StickyScrollFeatureSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure b.mp4 starts instantly and smoothly
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = isMuted;

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo, { once: true });
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full bg-[#05080e] text-white pt-4 sm:pt-6 pb-20 sm:pb-32 border-b border-white/10 overflow-visible font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: 2 Columns on Desktop, Normal Flow on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">

          {/* LEFT COLUMN: STICKY MEDIA PANEL (Responsive Viewport Scaled) */}
          <div className="lg:col-span-7 xl:col-span-7 lg:sticky lg:top-24 w-full z-20 self-start">
            <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[clamp(420px,calc(100vh-140px),550px)] rounded-[28px] lg:rounded-[32px] overflow-hidden bg-[#0d111a] border border-white/10 shadow-2xl group">
              
              {/* HTML5 Fast Local b.mp4 Video */}
              <video
                ref={videoRef}
                src={videoUrl}
                poster={posterUrl}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>

              {/* Dark subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20 pointer-events-none" />

              {/* Floating SHOWREEL 25/26 Pill Badge matching Phenomenon Studio reference image */}
              <div className="absolute top-[52%] right-6 -translate-y-1/2 z-10">
                <div className="inline-flex items-center gap-2 bg-black/75 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full shadow-2xl text-xs font-mono tracking-wider text-white uppercase group-hover:bg-white group-hover:text-black transition-all">
                  <span className="underline underline-offset-4 font-semibold">SHOWREEL 25/26</span>
                  <span className="text-[10px]">▶</span>
                </div>
              </div>

              {/* Bottom Video Controls */}
              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-white/90 font-mono">
                  <Ship className="w-4 h-4 text-sky-400" />
                  <span>ANVI MERCANTILE FLEET</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    aria-label={isPlaying ? "Pause Video" : "Play Video"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    aria-label={isMuted ? "Unmute Video" : "Mute Video"}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

            </div>
          </div>


          {/* RIGHT COLUMN: SCROLLING CONTENT (Matches Video Height in First Viewport) */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-start">
            
            {/* INITIAL VIEWPORT LOCKUP: Matches Left Video Box Height 1-to-1 on All Screen Sizes */}
            <div className="min-h-[360px] sm:min-h-[440px] lg:h-[clamp(420px,calc(100vh-140px),550px)] flex flex-col justify-between py-1">
              
              {/* Editorial Statement */}
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-normal leading-[1.22] text-white tracking-tight">
                  From Our Own Farms to Global Markets — Fresh Produce, Packed for Export.
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans pt-0.5">
                  Freshly harvested fruits and vegetables sourced directly from our own farms, with quality maintained throughout harvesting, packing, and export. We serve international buyers with dependable bulk supply and a minimum order quantity of 10 MT.
                </p>
              </div>

              {/* BLOCK 1: FRUITS & VEGETABLES EXPORTED - MONOCHROME WHITE TICKER */}
              <div className="space-y-3 pt-3">
                <div className="text-[11px] font-bold font-mono uppercase tracking-[0.2em] text-slate-400">
                  DIRECT FARM SOURCING · FRESH HARVEST · EXPORT-READY QUALITY
                </div>

                {/* Monochrome White Right-to-Left Infinite Ticker */}
                <div className="relative w-full overflow-hidden border-y border-white/10 py-3.5 bg-[#080b12] group">
                  <div className="flex w-max items-center gap-0 animate-ticker-left group-hover:[animation-play-state:paused]">
                    {[1, 2, 3].map((setIndex) => (
                      <div key={`produce-set-${setIndex}`} className="flex items-center">
                        {PRODUCE_ITEMS.map((item, idx) => (
                          <div
                            key={`produce-${setIndex}-${idx}`}
                            className="px-6 py-1.5 border-r border-white/15 flex items-center justify-center shrink-0 cursor-default"
                          >
                            <span className="text-white font-mono font-extrabold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* SCROLLING EXPANSION CONTENT (Follows Naturally as User Scrolls Down) */}
            <div className="mt-12 sm:mt-16 space-y-12 sm:space-y-16">

              {/* BLOCK 2: ANVI MERCANTILE IN NUMBERS */}
              <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="text-[11px] font-bold font-mono uppercase tracking-[0.2em] text-slate-400">
                ANVI MERCANTILE IN NUMBERS
              </div>

              {/* 4-Column Numbers Grid matching Phenomenon Studio style */}
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-y border-white/10 py-5 text-center">
                <div className="px-3 py-2">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-sans">65+</div>
                  <div className="text-[11px] text-slate-400 mt-1 uppercase font-mono">Countries Served</div>
                </div>
                <div className="px-3 py-2">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-sans">14,800+</div>
                  <div className="text-[11px] text-slate-400 mt-1 uppercase font-mono">TEUs Delivered</div>
                </div>
                <div className="px-3 py-2">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-sans">12+ Yrs</div>
                  <div className="text-[11px] text-slate-400 mt-1 uppercase font-mono">Freight Excellence</div>
                </div>
                <div className="px-3 py-2">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-sans">99.4%</div>
                  <div className="text-[11px] text-slate-400 mt-1 uppercase font-mono">On-Time Delivery</div>
                </div>
              </div>
            </div>

            {/* BLOCK 3: CORE CAPABILITIES & SERVICES */}
            <div className="pt-6 border-t border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-bold font-mono uppercase tracking-[0.2em] text-slate-400">
                  OUR CORE TRADE LOGISTICS SERVICES
                </div>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:text-slate-300 transition-colors"
                >
                  <span>VIEW ALL SERVICES</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {/* Capability Item 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-2xl bg-[#0a0d14] border border-white/10 hover:border-white/30 transition-colors space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
                      <Ship className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-white">Sea Freight &amp; FCL/LCL Container Forwarding</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    Guaranteed vessel space and fixed-rate container allocations across major global ocean trade routes.
                  </p>
                </motion.div>

                {/* Capability Item 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-2xl bg-[#0a0d14] border border-white/10 hover:border-white/30 transition-colors space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
                      <Thermometer className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-white">Reefer Cold-Chain Commodity Transport</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    Precision temperature-controlled logistics for agricultural commodities (chili, onions, pomegranates, grapes).
                  </p>
                </motion.div>

                {/* Capability Item 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-2xl bg-[#0a0d14] border border-white/10 hover:border-white/30 transition-colors space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-white">Single-Window Export &amp; Import Customs Clearance</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    Zero-delay customs bonding, HS tariff classification, Bill of Lading, and phytosanitary regulatory filing.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* BLOCK 4: CTA ACTION BAR */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-white">Start Your Container Freight Booking</h4>
                <p className="text-xs text-slate-400">Instant rate calculation &amp; vessel slot reservation.</p>
              </div>

              <Link
                to="/quote"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-200 text-black font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
              >
                <span>Get a Quote</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </Link>
            </div>
          </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default StickyScrollFeatureSection;
