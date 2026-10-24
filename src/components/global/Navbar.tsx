import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { X, ChevronRight, ShoppingBag, ArrowUpRight, Sparkles, Clock, ShieldCheck, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { useScrolled } from '@/hooks/useScrolled';
import { useCart } from '@/context/CartContext';
import StrokeText from '@/components/ui/StrokeText';

const overlayNavItems = [
  { number: '/01', label: 'Home', href: '/' },
  { number: '/02', label: 'Products', href: '/products' },
  { number: '/03', label: 'Services', href: '/services' },
  { number: '/04', label: 'Trade Routes', href: '/trade' },
  { number: '/05', label: 'Track Shipment', href: '/track' },
  { number: '/06', label: 'About Us', href: '/about' },
  { number: '/07', label: 'Latest Insights', href: '/insights' },
  { number: '/08', label: 'Contact Us', href: '/contact' },
];

interface NavbarProps {
  isIntroActive?: boolean;
}

export function Navbar({ isIntroActive = false }: NavbarProps) {
  const isScrolled = useScrolled(30);
  const [exploreMenuOpen, setExploreMenuOpen] = useState(false);
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const location = useLocation();
  const { totalCount, openCart } = useCart();

  const isProductsPage = location.pathname.startsWith('/products');

  // Close menu on route change
  useEffect(() => {
    setExploreMenuOpen(false);
  }, [location]);

  // Lock body scroll when overlay menu is open
  useEffect(() => {
    if (exploreMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [exploreMenuOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExploreMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? isProductsPage
              ? 'bg-[#F1E5C8]/95 backdrop-blur-md shadow-sm border-b border-[#D5CBC0] py-3.5'
              : 'bg-[#030712]/90 backdrop-blur-md shadow-2xl border-b border-white/10 py-3.5'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left Group: 3-Lines Menu Icon + Animated StrokeText Logo */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <button
                type="button"
                onClick={() => setExploreMenuOpen(true)}
                className={`p-1 transition-colors cursor-pointer group focus:outline-none ${
                  isProductsPage
                    ? 'text-stone-900 hover:text-black'
                    : 'text-white/80 hover:text-white'
                }`}
                aria-label="Open Navigation Menu"
              >
                <div className="flex flex-col space-y-1.5 w-5">
                  <span className={`h-0.5 w-5 rounded-full transition-colors ${
                    isProductsPage ? 'bg-stone-900 group-hover:bg-black' : 'bg-current group-hover:bg-white'
                  }`} />
                  <span className={`h-0.5 w-5 rounded-full transition-colors ${
                    isProductsPage ? 'bg-stone-900 group-hover:bg-black' : 'bg-current group-hover:bg-white'
                  }`} />
                  <span className={`h-0.5 w-5 rounded-full transition-colors ${
                    isProductsPage ? 'bg-stone-900 group-hover:bg-black' : 'bg-current group-hover:bg-white'
                  }`} />
                </div>
              </button>

              <Link to="/" className="flex items-center gap-2.5 group">
                <img
                  src="/bs.png"
                  alt="Anvi Mercantile Logo"
                  className="h-8 sm:h-9 w-auto object-contain rounded shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex flex-col justify-center">
                  <div className="w-44 sm:w-52 h-6 sm:h-7 flex items-center">
                    <StrokeText
                      key={isIntroActive ? 'intro-pending' : (isProductsPage ? 'products-theme' : 'hero-entered')}
                      text="ANVI MERCANTILE"
                      strokeColor={isProductsPage ? '#0284C7' : '#38BDF8'}
                      fillColor={isProductsPage ? '#0F172A' : '#FFFFFF'}
                      strokeWidth={isProductsPage ? 1.6 : 1.4}
                      fontSize={54}
                      fontWeight={800}
                      letterSpacing={-1}
                      drawDuration={1.4}
                      fillDelay={0.1}
                      trigger="mount"
                      fillMode="wipe"
                    />
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase leading-none mt-0.5 ${
                    isProductsPage ? 'text-orange-600' : 'text-orange-400'
                  }`}>
                    By ANVI GROUPS
                  </span>
                </div>
              </Link>
            </div>

            {/* Center Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-medium tracking-wide transition-colors ${
                    isProductsPage
                      ? isActive
                        ? 'text-stone-950 font-bold border-b-2 border-stone-950 pb-0.5'
                        : 'text-stone-800 hover:text-black font-semibold'
                      : isActive
                        ? 'text-white font-medium'
                        : 'text-white/80 hover:text-white'
                  }`
                }
              >
                Platform
              </NavLink>

              {/* Products (Disabled navigation -> Opens Upcoming Platform Announcement Modal) */}
              <button
                type="button"
                onClick={() => setIsLaunchModalOpen(true)}
                className={`text-xs sm:text-sm font-medium tracking-wide transition-colors inline-flex items-center gap-1.5 cursor-pointer focus:outline-none ${
                  isProductsPage
                    ? 'text-stone-800 hover:text-black font-semibold'
                    : 'text-white/80 hover:text-white'
                }`}
                title="New B2B Agro-Export Platform Launching Soon"
              >
                <span>Products</span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider leading-none">
                  Soon
                </span>
              </button>

              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-medium tracking-wide transition-colors ${
                    isProductsPage
                      ? isActive
                        ? 'text-stone-950 font-bold border-b-2 border-stone-950 pb-0.5'
                        : 'text-stone-800 hover:text-black font-semibold'
                      : isActive
                        ? 'text-white font-medium'
                        : 'text-white/80 hover:text-white'
                  }`
                }
              >
                Solutions
              </NavLink>

              <NavLink
                to="/trade"
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-medium tracking-wide transition-colors ${
                    isProductsPage
                      ? isActive
                        ? 'text-stone-950 font-bold border-b-2 border-stone-950 pb-0.5'
                        : 'text-stone-800 hover:text-black font-semibold'
                      : isActive
                        ? 'text-white font-medium'
                        : 'text-white/80 hover:text-white'
                  }`
                }
              >
                Resources
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-medium tracking-wide transition-colors ${
                    isProductsPage
                      ? isActive
                        ? 'text-stone-950 font-bold border-b-2 border-stone-950 pb-0.5'
                        : 'text-stone-800 hover:text-black font-semibold'
                      : isActive
                        ? 'text-white font-medium'
                        : 'text-white/80 hover:text-white'
                  }`
                }
              >
                Company
              </NavLink>
            </nav>

            {/* Header Right Action Group: Cart Button + Get a Quote */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Order Cart Button */}
              <button
                type="button"
                onClick={openCart}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isProductsPage
                    ? 'bg-[#807562] hover:bg-[#6D6352] text-white shadow-xs'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
                aria-label="View Order Cart"
              >
                <ShoppingBag size={15} />
                <span className="hidden sm:inline">Cart</span>
                {totalCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Get a Quote Action Button */}
              <Link
                to="/quote"
                className={`inline-flex items-center gap-2 font-medium text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-full shadow-lg transition-all transform hover:scale-105 group ${
                  isProductsPage
                    ? 'bg-[#242623] hover:bg-black text-white'
                    : 'bg-white hover:bg-slate-100 text-slate-950'
                }`}
              >
                <span>Get a Quote</span>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  isProductsPage ? 'bg-white/20 text-white' : 'bg-slate-950 text-white'
                }`}>
                  <ChevronRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* FULL-SCREEN TRANSLUCENT GLASS OVERLAY MENU */}
      <AnimatePresence>
        {exploreMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#030712]/95 backdrop-blur-2xl text-white overflow-y-auto flex flex-col justify-between"
          >
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(20,20,20,0.5),transparent_60%)] pointer-events-none" />

            {/* Top Bar inside Overlay */}
            <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-white/10">
              
              {/* Left Logo / Close Indicator */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setExploreMenuOpen(false)}
                  className="flex items-center gap-2 text-xs font-bold font-headline uppercase tracking-widest text-white/80 hover:text-sky-400 transition-colors cursor-pointer bg-white/5 border border-white/10 px-4 py-2 rounded-full"
                >
                  <X className="w-4 h-4 text-sky-400" />
                  <span>CLOSE</span>
                </button>
                <div className="hidden sm:flex items-center gap-2.5 pl-4 border-l border-white/15">
                  <img src="/bs.png" alt="Logo" className="h-6 w-auto object-contain rounded" />
                  <span className="font-extrabold text-sm text-white tracking-wider uppercase font-headline">
                    ANVI MERCANTILE PRIVATE LIMITED
                  </span>
                </div>
              </div>

              {/* Quick Action Button */}
              <Link
                to="/quote"
                onClick={() => setExploreMenuOpen(false)}
                className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full shadow-xl transition-transform hover:scale-105"
              >
                Start Quote
              </Link>
            </div>

            {/* Main Center Overlay Content */}
            <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex-1 flex flex-col justify-center">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                
                {/* Left 7 Columns: EXPLORE NAVIGATION List */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-white/15 pb-3">
                    <span className="text-xs font-bold font-headline uppercase tracking-widest text-sky-400">
                      EXPLORE NAVIGATION
                    </span>
                    <span className="text-xs font-mono text-white/40">
                      [7 SECTIONS]
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                    {overlayNavItems.map((item) => {
                      if (item.label === 'Products') {
                        return (
                          <button
                            key={item.href}
                            type="button"
                            onClick={() => {
                              setExploreMenuOpen(false);
                              setIsLaunchModalOpen(true);
                            }}
                            className="group flex items-center justify-between py-4 border-b border-white/10 transition-all text-white hover:text-sky-400 hover:pl-2 text-left cursor-pointer w-full"
                          >
                            <span className="text-xl sm:text-2xl font-extrabold font-headline uppercase tracking-wide transition-colors flex items-center gap-2.5">
                              <span>{item.label}</span>
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                                Launching Soon
                              </span>
                            </span>
                            <span className="text-xs font-mono text-white/40 group-hover:text-sky-400 transition-colors">
                              {item.number}
                            </span>
                          </button>
                        );
                      }
                      return (
                        <NavLink
                          key={item.href}
                          to={item.href}
                          onClick={() => setExploreMenuOpen(false)}
                          className={({ isActive }) =>
                            `group flex items-center justify-between py-4 border-b border-white/10 transition-all ${
                              isActive
                                ? 'text-sky-400 border-sky-400/50 pl-2'
                                : 'text-white hover:text-sky-400 hover:pl-2'
                            }`
                          }
                        >
                          <span className="text-xl sm:text-2xl font-extrabold font-headline uppercase tracking-wide transition-colors">
                            {item.label}
                          </span>
                          <span className="text-xs font-mono text-white/40 group-hover:text-sky-400 transition-colors">
                            {item.number}
                          </span>
                        </NavLink>
                      );
                    })}
                  </div>

                </div>

                {/* Right 5 Columns: Glass Contact Box */}
                <div className="lg:col-span-5">
                  <div className="bg-[#0a0d14]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="space-y-2">
                      <span className="text-xs font-bold font-headline uppercase tracking-widest text-sky-400 block">
                        DIRECT CONTACT
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold font-headline uppercase text-white tracking-tight">
                        {siteConfig.legalName}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                        Ready to move your global cargo across borders? Reach out to our trade and logistics advisors.
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/10 text-xs font-mono text-white/80">
                      <div className="flex items-center justify-between">
                        <span className="text-white/40 uppercase">EMAIL:</span>
                        <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-sky-400 transition-colors">
                          {siteConfig.contact.email}
                        </a>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/40 uppercase">LOCATION:</span>
                        <span>{siteConfig.location.city}, {siteConfig.location.country}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/40 uppercase">PHONE:</span>
                        <span>{siteConfig.contact.phone}</span>
                      </div>
                    </div>

                    <Link
                      to="/quote"
                      onClick={() => setExploreMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-extrabold font-headline text-xs sm:text-sm uppercase tracking-wider py-4 rounded-xl shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>INITIATE ENGAGEMENT</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </Link>

                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Footer inside Overlay */}
            <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 font-sans gap-2">
              <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
              <p className="font-mono text-[11px]">GLOBAL TRADE · SEA FREIGHT · AIR CARGO · CUSTOMS</p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* UPCOMING B2B PLATFORM LAUNCH ANNOUNCEMENT MODAL */}
      <AnimatePresence>
        {isLaunchModalOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-lg bg-[#080d1a] border border-sky-500/30 text-white rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(56,189,248,0.2)] overflow-hidden"
            >
              {/* Radial ambient glow */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsLaunchModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer z-10"
                aria-label="Close announcement"
              >
                <X size={18} />
              </button>

              {/* Glowing Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold tracking-wide uppercase mb-4">
                <Sparkles size={14} className="text-sky-400" />
                <span>Next-Gen Platform Launching Soon</span>
              </div>

              {/* Header */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
                Seamless B2B Agro-Export in Just 5 Minutes
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                We are launching an industry-first online export marketplace for international importers and buyers. Browse farm-direct produce, choose container volumes, get instant FOB/CIF pricing, and place orders with zero friction.
              </p>

              {/* Key Platform Highlights */}
              <div className="space-y-3 mb-6 text-xs sm:text-[13px]">
                <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-white">5-Minute Order Placement</div>
                    <div className="text-slate-400 text-[11px] sm:text-xs mt-0.5">
                      No more waiting days for email quotes. Select commodities (MOQ 10 MT to 500 MT) and request samples in minutes.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-white">Verified Exporters & Direct Farm Sourcing</div>
                    <div className="text-slate-400 text-[11px] sm:text-xs mt-0.5">
                      Pomegranates, Basmati rice, Grapes, Onions, Green chillies, and Makhana backed by APEDA & Phytosanitary certifications.
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={`https://wa.me/918328246413?text=${encodeURIComponent(
                    'Hello Anvi Mercantile Trade Desk, I would like to register for early priority access to your upcoming 5-minute B2B Agro-Export platform.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-5 rounded-full text-xs sm:text-sm shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Phone size={15} />
                  <span>Join Priority Waitlist</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsLaunchModalOpen(false)}
                  className="inline-flex items-center justify-center py-3 px-5 rounded-full bg-white/10 hover:bg-white/15 text-white/90 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>Close</span>
                </button>
              </div>

              {/* Direct Trade Desk Line */}
              <div className="mt-5 pt-4 border-t border-white/10 text-center">
                <p className="text-[11px] text-slate-400">
                  Need an immediate container booking or air sample right now? Call our 24/7 trade desk:{' '}
                  <a href="tel:+918328246413" className="text-sky-400 font-semibold hover:underline">
                    +91 8328246413
                  </a>
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
