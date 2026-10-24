import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/global/Navbar';
import { Footer } from '@/components/global/Footer';
import { MobileStickyQuoteCTA } from '@/components/global/MobileStickyQuoteCTA';
import { ThemeToggle } from '@/components/global/ThemeToggle';
import { ScrollToTop } from '@/app/ScrollToTop';
import { IntroSplashScreen } from '@/components/global/IntroSplashScreen';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function Layout() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return !sessionStorage.getItem('anvi_intro_seen');
      } catch {
        return true;
      }
    }
    return true;
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem('anvi_intro_seen', 'true');
    } catch {
      // ignore
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col justify-between bg-[#030712] text-white relative">
        {/* Intro Opening Animation */}
        {showIntro && <IntroSplashScreen onComplete={handleIntroComplete} />}

        <ScrollToTop />
        
        {/* Skip to content accessibility link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-sky-600 text-white px-4 py-2 rounded font-bold text-xs"
        >
          Skip to main content
        </a>

        <Navbar isIntroActive={showIntro} />

        <div id="main-content" className="flex-1 w-full">
          <Outlet />
        </div>

        <Footer />

        {/* Global Cart Slide-Over Drawer */}
        <CartDrawer />

        {/* Floating Widgets */}
        <ThemeToggle />
        <MobileStickyQuoteCTA />
      </div>
    </CartProvider>
  );
}
