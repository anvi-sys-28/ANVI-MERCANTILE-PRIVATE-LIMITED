import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SlidersHorizontal, 
  ShoppingBag, 
  Search, 
  MapPin, 
  X, 
  Sparkles, 
  Bell, 
  Check, 
  ArrowRight,
  Send
} from 'lucide-react';

export function AppLaunchSection({ className = '' }: { className?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'Google Play' | 'App Store'>('Google Play');
  const [contactInput, setContactInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOpenModal = (platform: 'Google Play' | 'App Store') => {
    setSelectedPlatform(platform);
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Main Cream Rounded Card */}
        <div className="relative bg-[#F7F8EE] rounded-[32px] sm:rounded-[40px] pt-10 sm:pt-14 px-6 sm:px-12 lg:px-16 overflow-hidden shadow-lg border border-amber-100/70">
          
          {/* Sunny Warm Yellow Organic Wave Accent in Top-Right Corner */}
          <div 
            className="absolute -top-16 -right-16 w-80 sm:w-96 lg:w-[460px] h-80 sm:h-96 lg:h-[460px] bg-[#FEE9B8] rounded-full blur-2xl pointer-events-none opacity-85" 
          />
          <div 
            className="absolute top-0 right-0 w-64 sm:w-80 lg:w-[380px] h-full bg-gradient-to-l from-[#FEEBB8]/70 via-[#FEE8B2]/40 to-transparent pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-end relative z-10">
            
            {/* Left 7 Columns: Text Content & Download Badges */}
            <div className="lg:col-span-7 space-y-6 pb-10 sm:pb-14 lg:pb-16 text-left">
              
              {/* Early Access Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-600/10 border border-emerald-600/20 text-emerald-800 text-xs font-bold tracking-wide uppercase">
                <Sparkles size={14} className="text-emerald-600" />
                <span>Mobile App · Launching Soon</span>
              </div>

              {/* Headline (Matching Reference Image) */}
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#1E231C] tracking-tight leading-[1.12]">
                Shop Groceries<br />Anytime, Anywhere
              </h2>

              {/* Subtitle / Description */}
              <p className="text-sm sm:text-base text-[#4A4E46] max-w-lg leading-relaxed font-medium">
                Download the mobile app and get easy order placing, instant farm-direct quotes, and 24/7 shipment tracking at your fingertips. Available soon on iOS and Android.
              </p>

              {/* App Store & Google Play Download Badges (Exact styling from reference) */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                
                {/* 1. Google Play Button (Green Pill) */}
                <button
                  type="button"
                  onClick={() => handleOpenModal('Google Play')}
                  className="bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2.5 rounded-xl flex items-center gap-3 shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer text-left"
                >
                  {/* Google Play Multi-color Icon */}
                  <svg className="w-6 h-6 shrink-0" viewBox="0 0 512 512">
                    <path fill="#00D3FF" d="M38.8 10.1C34.4 14.8 32 22.2 32 32.1v447.8c0 9.9 2.4 17.3 6.8 22L258.4 282.3 38.8 10.1z"/>
                    <path fill="#FFD200" d="M366.1 174.5L258.4 282.3 366.1 390l3.8-2.2 127.8-72.7c36.5-20.8 36.5-54.8 0-75.6L369.9 166.8l-3.8 7.7z"/>
                    <path fill="#FF3333" d="M258.4 282.3L38.8 501.9c12.2 12.9 32.5 14.7 56.4 1.1l270.9-154.1L258.4 282.3z"/>
                    <path fill="#00E676" d="M366.1 163.6L95.2 9.4C71.3-4.2 51-2.4 38.8 10.5L258.4 282.3 366.1 163.6z"/>
                  </svg>
                  <div className="flex flex-col leading-none">
                    <span className="text-[10px] font-medium opacity-90 tracking-wide uppercase">Download</span>
                    <span className="text-sm sm:text-base font-bold mt-0.5">Google Play</span>
                  </div>
                </button>

                {/* 2. Apple App Store Button (White Pill) */}
                <button
                  type="button"
                  onClick={() => handleOpenModal('App Store')}
                  className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200/90 px-5 py-2.5 rounded-xl flex items-center gap-3 shadow-xs hover:shadow-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer text-left"
                >
                  {/* Apple Logo Icon */}
                  <svg className="w-6 h-6 shrink-0 fill-current text-gray-900" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.66-7.81-11.91-14.3-5.26-8.03-9.64-17.75-13.14-29.15-3.5-11.4-5.25-22.09-5.25-32.06 0-14.56 3.69-26.6 11.07-36.12 7.38-9.53 16.5-14.38 27.36-14.56 5.58 0 11.4 1.41 17.47 4.23 6.07 2.82 10.15 4.3 12.24 4.45 1.58-.15 5.89-1.68 12.92-4.59 7.03-2.91 13.16-4.14 18.39-3.7 13.52.88 24.36 5.86 32.53 14.93-11.77 7.15-17.51 16.89-17.21 29.23.29 9.69 4.09 17.84 11.39 24.45 7.3 6.61 16.14 10.45 26.51 11.53-2.3 7.04-5.2 14.31-8.7 21.82zM119.22 33.15c0-6.9 2.51-13.43 7.54-19.59 5.03-6.16 11.37-10.42 19.03-12.79.88 5.48-.3 11.43-3.54 17.84-3.24 6.41-8.15 11.32-14.73 14.74-.75-.06-1.5-.12-2.25-.17-.89-.02-1.78-.03-2.67-.03-1.89 0-3.02-.03-3.38 0z" />
                  </svg>
                  <div className="flex flex-col leading-none">
                    <span className="text-[10px] font-medium text-gray-500 tracking-wide uppercase">Download</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 mt-0.5">App Store</span>
                  </div>
                </button>

              </div>

            </div>

            {/* Right 5 Columns: Pixel-Perfect iPhone Mockup Peeking from Bottom */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              
              {/* iPhone 16 Frame */}
              <div className="w-[280px] sm:w-[310px] h-[360px] sm:h-[410px] bg-white rounded-t-[44px] border-t-[8px] border-x-[8px] border-black shadow-[0_-15px_35px_rgba(0,0,0,0.18)] overflow-hidden relative flex flex-col">
                
                {/* Dynamic Island Header */}
                <div className="relative pt-2.5 pb-1 px-5 flex items-center justify-between text-[11px] font-bold text-gray-900 select-none bg-[#EBF7EE]">
                  <span>9:41</span>
                  
                  {/* Dynamic Island Pill */}
                  <div className="w-20 h-5 bg-black rounded-full flex items-center justify-end px-2">
                    <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700" />
                  </div>

                  {/* Cellular, WiFi, Battery */}
                  <div className="flex items-center gap-1.5 text-gray-800 text-[10px]">
                    <span className="text-[10px]">5G</span>
                    <div className="w-4 h-2 border border-gray-800 rounded-xs p-0.5 flex items-center">
                      <div className="w-full h-full bg-gray-800 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Inside App Content (Matches Reference Image UI) */}
                <div className="bg-[#F5FBF6] flex-1 px-3.5 pt-2 pb-4 overflow-hidden flex flex-col space-y-2.5">
                  
                  {/* User Profile Bar */}
                  <div className="flex items-center justify-between pt-0.5">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                        alt="Ripon Ahmed"
                        className="w-8 h-8 rounded-full object-cover border border-emerald-500/30"
                      />
                      <div className="text-left">
                        <div className="font-bold text-[11px] text-gray-900 leading-tight">Ripon Ahmed</div>
                        <div className="flex items-center gap-0.5 text-[9px] text-gray-500">
                          <MapPin className="w-2.5 h-2.5 text-emerald-600" />
                          <span>New York, USA</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="w-7 h-7 rounded-full bg-white shadow-2xs flex items-center justify-center text-gray-700">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                      </div>
                      <div className="w-7 h-7 rounded-full bg-white shadow-2xs flex items-center justify-center text-gray-700">
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Search Bar Input */}
                  <div className="w-full bg-white rounded-full py-1.5 px-3 shadow-2xs flex items-center gap-2 text-[10px] text-gray-400 border border-gray-100">
                    <Search className="w-3 h-3 text-gray-400 shrink-0" />
                    <span className="truncate">Search for food, grocery etc ...</span>
                  </div>

                  {/* Categories Row */}
                  <div className="space-y-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[10px] text-gray-900">Categories</span>
                      <span className="text-[9px] text-emerald-600 font-semibold">See All</span>
                    </div>

                    {/* Circular Category Icons */}
                    <div className="flex items-center justify-between gap-1 pt-0.5">
                      {[
                        { name: 'Bakery', bg: 'bg-[#FFF5E6]', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=100&q=80' },
                        { name: 'Vegetables', bg: 'bg-[#EBF7EE]', img: '/images/products/carrots.png' },
                        { name: 'Fruits', bg: 'bg-[#FFF5E6]', img: '/images/products/apple.png' },
                        { name: 'Dairy', bg: 'bg-[#EBF3FE]', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=100&q=80' },
                        { name: 'Meat', bg: 'bg-[#FDEEEC]', img: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=100&q=80' },
                      ].map((c) => (
                        <div key={c.name} className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full ${c.bg} flex items-center justify-center p-1 shadow-2xs`}>
                            <img src={c.img} alt={c.name} className="w-full h-full object-contain" />
                          </div>
                          <span className="text-[8px] text-gray-600 mt-0.5 font-medium">{c.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mini Promo Banner Inside Mobile Screen */}
                  <div className="w-full bg-gradient-to-r from-[#FFF8E7] to-[#FDF1CE] rounded-xl p-2.5 flex items-center justify-between shadow-2xs border border-amber-200/40 text-left">
                    <div className="space-y-0.5 max-w-[60%]">
                      <div className="font-extrabold text-[10px] text-gray-900 leading-tight">Fresh &amp; Organic Fruits</div>
                      <div className="text-[8px] text-gray-500">100% Farm-to-Table Quality</div>
                      <div className="font-bold text-[9px] text-gray-900 pt-0.5">$14.99 <span className="text-[7px] text-gray-400 font-normal">/Only</span></div>
                    </div>
                    <div className="w-[38%] flex items-center justify-end">
                      <img
                        src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=200&q=80"
                        alt="Fruit Basket"
                        className="max-h-12 w-auto object-contain"
                      />
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      {/* VIP Early Access Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              className="relative w-full max-w-md bg-[#0c1220] border border-emerald-500/30 text-white rounded-3xl p-6 sm:p-8 shadow-2xl text-left overflow-hidden"
            >
              {/* Radial glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase mb-4">
                <Bell size={13} className="text-emerald-400" />
                <span>{selectedPlatform} · Priority Access</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white tracking-tight leading-tight mb-2">
                Get Notified First When the App Launches
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Be the first to download the app for 5-minute easy order placing, live vessel tracking, and priority sample dispatch.
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Enter your Email or WhatsApp Phone"
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Join Early Priority Access</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-4 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check size={20} className="stroke-[3]" />
                  </div>
                  <div className="font-bold text-white text-sm">You are on the VIP Waitlist!</div>
                  <p className="text-xs text-slate-300">
                    We'll notify you as soon as the app goes live on {selectedPlatform}.
                  </p>
                </div>
              )}

              {/* Direct WhatsApp Line */}
              <div className="mt-5 pt-4 border-t border-white/10 text-center">
                <p className="text-[11px] text-slate-400">
                  Need to place an immediate bulk order right now?{' '}
                  <a
                    href="https://wa.me/918328246413?text=Hello%20Anvi%20Mercantile,%20I%20want%20to%20place%20an%20order."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>Chat on WhatsApp</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default AppLaunchSection;
