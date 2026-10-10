// 1. MSC (Mediterranean Shipping Company - Switzerland)
function LogoMSC() {
  return (
    <div className="flex items-center justify-center shrink-0 px-6 py-2 transition-transform hover:scale-105 select-none" title="MSC (Mediterranean Shipping Company)">
      <svg className="h-9 w-auto" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="44" height="44" y="3" rx="6" fill="#FDB913" />
        <path d="M 8 30 C 8 20, 16 16, 22 22 C 28 16, 36 20, 36 30" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <text x="10" y="24" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="13" fill="#000000">m</text>
        <text x="22" y="38" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="13" fill="#000000">sc</text>
        <text x="56" y="34" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="26" fill="currentColor" className="fill-slate-900 dark:fill-white transition-colors duration-300" letterSpacing="0.5">MSC</text>
      </svg>
    </div>
  );
}

// 2. MAERSK (Denmark)
function LogoMaersk() {
  return (
    <div className="flex items-center justify-center shrink-0 px-6 py-2 transition-transform hover:scale-105 select-none" title="Maersk Line">
      <svg className="h-9 w-auto" viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="44" height="44" y="3" rx="4" fill="#42B0D5" />
        <polygon points="22,9 25,18 34,16 28.5,23 35,29 26,29.5 25,38 20,31 13.5,36 15.5,27.5 8.5,23 16.5,20" fill="#FFFFFF" />
        <text x="56" y="34" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="24" fill="currentColor" className="fill-slate-900 dark:fill-white transition-colors duration-300" letterSpacing="2">MAERSK</text>
      </svg>
    </div>
  );
}

// 3. CMA CGM (France)
function LogoCMACGM() {
  return (
    <div className="flex items-center justify-center shrink-0 px-6 py-2 transition-transform hover:scale-105 select-none" title="CMA CGM">
      <svg className="h-9 w-auto" viewBox="0 0 190 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 8 13 Q 95 1 180 13" stroke="#E60012" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <text x="8" y="38" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="26" fill="currentColor" className="fill-[#0B2545] dark:fill-white transition-colors duration-300" letterSpacing="1">CMA CGM</text>
      </svg>
    </div>
  );
}

// 4. COSCO SHIPPING (China)
function LogoCOSCO() {
  return (
    <div className="flex items-center justify-center shrink-0 px-6 py-2 transition-transform hover:scale-105 select-none" title="COSCO Shipping">
      <svg className="h-9 w-auto" viewBox="0 0 170 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="34" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="28" fill="currentColor" className="fill-[#002D62] dark:fill-white transition-colors duration-300" letterSpacing="2">COSCO</text>
        <rect x="22" y="39" width="80" height="4" fill="#D32F2F" rx="2" />
      </svg>
    </div>
  );
}

// 5. Hapag-Lloyd (Germany)
function LogoHapagLloyd() {
  return (
    <div className="flex items-center justify-center shrink-0 px-6 py-2 transition-transform hover:scale-105 select-none" title="Hapag-Lloyd">
      <svg className="h-9 w-auto" viewBox="0 0 215 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 6 10 L 20 25 L 6 40 L 14 40 L 28 25 L 14 10 Z" className="fill-[#002855] dark:fill-sky-400 transition-colors duration-300" />
        <path d="M 20 10 L 34 25 L 20 40 L 28 40 L 42 25 L 28 10 Z" className="fill-[#002855] dark:fill-sky-400 transition-colors duration-300" />
        <text x="48" y="34" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="22" fill="currentColor" className="fill-[#002855] dark:fill-white transition-colors duration-300" letterSpacing="0.5">Hapag-Lloyd</text>
      </svg>
    </div>
  );
}

// 6. ONE - Ocean Network Express (Japan)
function LogoONE() {
  return (
    <div className="flex items-center justify-center shrink-0 px-6 py-2 transition-transform hover:scale-105 select-none" title="Ocean Network Express (ONE)">
      <svg className="h-9 w-auto" viewBox="0 0 165 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="44" height="44" y="3" rx="5" fill="#E4007F" />
        <text x="7" y="32" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="20" fill="#FFFFFF">ONE</text>
        <text x="56" y="30" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="26" className="brand-pink" letterSpacing="1">ONE</text>
        <text x="56" y="42" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="7.5" className="brand-pink" letterSpacing="0.5">OCEAN NETWORK EXPRESS</text>
      </svg>
    </div>
  );
}

// 7. EVERGREEN (Taiwan)
function LogoEvergreen() {
  return (
    <div className="flex items-center justify-center shrink-0 px-6 py-2 transition-transform hover:scale-105 select-none" title="Evergreen Marine">
      <svg className="h-9 w-auto" viewBox="0 0 215 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="25" r="16" fill="none" stroke="#006837" strokeWidth="4" className="stroke-[#006837] dark:stroke-emerald-400 transition-colors duration-300" />
        <circle cx="22" cy="25" r="6" className="fill-[#006837] dark:fill-emerald-400 transition-colors duration-300" />
        <rect x="20" y="5" width="4" height="6" className="fill-[#006837] dark:fill-emerald-400 transition-colors duration-300" />
        <rect x="20" y="39" width="4" height="6" className="fill-[#006837] dark:fill-emerald-400 transition-colors duration-300" />
        <rect x="2" y="23" width="6" height="4" className="fill-[#006837] dark:fill-emerald-400 transition-colors duration-300" />
        <rect x="36" y="23" width="6" height="4" className="fill-[#006837] dark:fill-emerald-400 transition-colors duration-300" />
        <text x="48" y="34" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="22" className="fill-[#006837] dark:fill-emerald-400 transition-colors duration-300" letterSpacing="1">EVERGREEN</text>
      </svg>
    </div>
  );
}

// 8. HMM (South Korea)
function LogoHMM() {
  return (
    <div className="flex items-center justify-center shrink-0 px-6 py-2 transition-transform hover:scale-105 select-none" title="Hyundai Merchant Marine (HMM)">
      <svg className="h-9 w-auto" viewBox="0 0 155 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="8" y="28" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="28" className="brand-red" letterSpacing="1">HMM</text>
        <path d="M 4 34 L 140 34 L 120 42 L 24 42 Z" className="fill-[#002B49] dark:fill-sky-400 transition-colors duration-300" />
      </svg>
    </div>
  );
}

// 9. YANG MING (Taiwan)
function LogoYangMing() {
  return (
    <div className="flex items-center justify-center shrink-0 px-6 py-2 transition-transform hover:scale-105 select-none" title="Yang Ming Marine Transport">
      <svg className="h-9 w-auto" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" y="5" rx="4" fill="#E30613" />
        <path d="M 10 15 L 20 27 L 30 15 M 20 27 L 20 38" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <text x="50" y="33" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="22" className="brand-red" letterSpacing="1">YANG MING</text>
      </svg>
    </div>
  );
}

// 10. ZIM (Israel)
function LogoZIM() {
  return (
    <div className="flex items-center justify-center shrink-0 px-6 py-2 transition-transform hover:scale-105 select-none" title="Zim Integrated Shipping">
      <svg className="h-9 w-auto" viewBox="0 0 135 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="fill-[#051C3E] dark:fill-sky-400 transition-colors duration-300">
          <polygon points="18,6 20,11 25,11 21,14 23,19 18,16 13,19 15,14 11,11 16,11" />
          <polygon points="32,6 34,11 39,11 35,14 37,19 32,16 27,19 29,14 25,11 30,11" />
          <polygon points="46,6 48,11 53,11 49,14 51,19 46,16 41,19 43,14 39,11 44,11" />
          <polygon points="60,6 62,11 67,11 63,14 65,19 60,16 55,19 57,14 53,11 58,11" />
        </g>
        <text x="8" y="42" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="28" fill="currentColor" className="fill-[#051C3E] dark:fill-white transition-colors duration-300" letterSpacing="2">ZIM</text>
      </svg>
    </div>
  );
}

const TOP_SHIPPING_COMPANIES = [
  { id: 'msc', name: 'MSC', component: LogoMSC },
  { id: 'maersk', name: 'MAERSK', component: LogoMaersk },
  { id: 'cma-cgm', name: 'CMA CGM', component: LogoCMACGM },
  { id: 'cosco', name: 'COSCO', component: LogoCOSCO },
  { id: 'hapag-lloyd', name: 'Hapag-Lloyd', component: LogoHapagLloyd },
  { id: 'one', name: 'ONE', component: LogoONE },
  { id: 'evergreen', name: 'EVERGREEN', component: LogoEvergreen },
  { id: 'hmm', name: 'HMM', component: LogoHMM },
  { id: 'yang-ming', name: 'YANG MING', component: LogoYangMing },
  { id: 'zim', name: 'ZIM', component: LogoZIM },
];

export function ShippingCompaniesTickerSection() {
  return (
    <section className="shipping-ticker-section relative w-full bg-[#f8f9fa] dark:bg-[#05080e] border-y border-slate-200/80 dark:border-white/10 py-10 overflow-hidden text-slate-800 dark:text-white transition-colors duration-300">
      {/* Centered Header Text matching original reference image */}
      <div className="text-center mb-8 px-4">
        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 font-sans transition-colors duration-300">
          ENGINEERED WITH INDUSTRY-LEADING BRANDS
        </h3>
      </div>

      {/* Continuous Right-to-Left Infinite Scrolling Ticker (Unboxed Standalone Logos) */}
      <div className="relative w-full overflow-hidden group">
        <div className="flex w-max items-center gap-10 sm:gap-16 animate-ticker-left group-hover:[animation-play-state:paused]">
          {/* Set 1 */}
          {TOP_SHIPPING_COMPANIES.map((item) => {
            const LogoComp = item.component;
            return <LogoComp key={`set1-${item.id}`} />;
          })}
          {/* Set 2 (for continuous loop) */}
          {TOP_SHIPPING_COMPANIES.map((item) => {
            const LogoComp = item.component;
            return <LogoComp key={`set2-${item.id}`} />;
          })}
          {/* Set 3 (to guarantee seamless loop on ultra-wide screens) */}
          {TOP_SHIPPING_COMPANIES.map((item) => {
            const LogoComp = item.component;
            return <LogoComp key={`set3-${item.id}`} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default ShippingCompaniesTickerSection;
