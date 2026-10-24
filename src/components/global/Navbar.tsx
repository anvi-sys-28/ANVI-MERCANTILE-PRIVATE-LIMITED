import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { X, ArrowUpRight, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { useScrolled } from '@/hooks/useScrolled';
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
  const location = useLocation();

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
            ? 'bg-[#030712]/90 backdrop-blur-md shadow-2xl border-b border-white/10 py-3.5'
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
                className="p-1 text-white/80 hover:text-white transition-colors cursor-pointer group focus:outline-none"
                aria-label="Open Navigation Menu"
              >
                <div className="flex flex-col space-y-1.5 w-5">
                  <span className="h-0.5 w-5 bg-current rounded-full transition-colors group-hover:bg-white" />
                  <span className="h-0.5 w-5 bg-current rounded-full transition-colors group-hover:bg-white" />
                  <span className="h-0.5 w-5 bg-current rounded-full transition-colors group-hover:bg-white" />
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
                      key={isIntroActive ? 'intro-pending' : 'hero-entered'}
                      text="ANVI MERCANTILE"
                      strokeColor="#38BDF8"
                      fillColor="#FFFFFF"
                      strokeWidth={1.4}
                      fontSize={54}
                      fontWeight={800}
                      letterSpacing={-1}
                      drawDuration={1.4}
                      fillDelay={0.1}
                      trigger="mount"
                      fillMode="wipe"
                    />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-orange-400 tracking-[0.2em] uppercase leading-none mt-0.5">
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
                  `text-xs sm:text-sm font-normal tracking-wide transition-colors ${
                    isActive ? 'text-white font-medium' : 'text-white/80 hover:text-white'
                  }`
                }
              >
                Platform
              </NavLink>

              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-normal tracking-wide transition-colors ${
                    isActive ? 'text-white font-medium' : 'text-white/80 hover:text-white'
                  }`
                }
              >
                Products
              </NavLink>

              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-normal tracking-wide transition-colors ${
                    isActive ? 'text-white font-medium' : 'text-white/80 hover:text-white'
                  }`
                }
              >
                Solutions
              </NavLink>

              <NavLink
                to="/trade"
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-normal tracking-wide transition-colors ${
                    isActive ? 'text-white font-medium' : 'text-white/80 hover:text-white'
                  }`
                }
              >
                Resources
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-normal tracking-wide transition-colors ${
                    isActive ? 'text-white font-medium' : 'text-white/80 hover:text-white'
                  }`
                }
              >
                Company
              </NavLink>
            </nav>

            {/* Header Right Action */}
            <Link
              to="/quote"
              className="inline-flex items-center gap-2.5 bg-white hover:bg-slate-100 text-slate-950 font-medium text-xs sm:text-sm px-4 py-2 rounded-full shadow-lg transition-all transform hover:scale-105 group"
            >
              <span>Get a Quote</span>
              <div className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0">
                <ChevronRight className="w-3 h-3 stroke-[2.5]" />
              </div>
            </Link>

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
                    {overlayNavItems.map((item) => (
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
                    ))}
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
    </>
  );
}
