import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/global/Navbar';
import { Footer } from '@/components/global/Footer';
import { MobileStickyQuoteCTA } from '@/components/global/MobileStickyQuoteCTA';
import { ThemeToggle } from '@/components/global/ThemeToggle';
import { ScrollToTop } from '@/app/ScrollToTop';
import { IntroSplashScreen } from '@/components/global/IntroSplashScreen';

export function Layout() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#030712] text-white relative">
      {/* Intro Opening Animation */}
      {showIntro && <IntroSplashScreen onComplete={() => setShowIntro(false)} />}

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

      {/* Floating Widgets */}
      <ThemeToggle />
      <MobileStickyQuoteCTA />
    </div>
  );
}
