import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MaskedHeading from '@/components/ui/MaskedHeading';

interface IntroSplashScreenProps {
  onComplete?: () => void;
  autoHideDuration?: number; // in seconds
}

export function IntroSplashScreen({ onComplete, autoHideDuration = 4.2 }: IntroSplashScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, autoHideDuration * 1000);

    return () => clearTimeout(timer);
  }, [autoHideDuration, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] bg-black text-white flex flex-col justify-center items-center px-4 sm:px-8 py-12 overflow-hidden font-sans"
        >
          {/* Center Masked Heading Container */}
          <div className="relative z-10 max-w-7xl w-full mx-auto my-auto flex flex-col items-center justify-center space-y-2 sm:space-y-4 text-center">
            
            {/* Line 1: ANVI MERCANTILE PVT. LTD. (Guaranteed single line) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex justify-center overflow-hidden"
            >
              <MaskedHeading
                text="ANVI MERCANTILE PVT. LTD."
                mediaType="image"
                src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=2000&auto=format&fit=crop"
                reveal="rise"
                trigger="mount"
                duration={1.6}
                stagger={0.06}
                fillScale={1.3}
                parallax={30}
                textScale={0.052}
                align="center"
                weight={900}
                className="font-headline font-black uppercase text-white drop-shadow-2xl whitespace-nowrap"
              />
            </motion.div>

            {/* Line 2: By ANVI GROUPS (40% smaller text scale: 0.052 * 0.6 = 0.031) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex justify-center overflow-hidden"
            >
              <MaskedHeading
                text="By ANVI GROUPS"
                mediaType="image"
                src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=2000&auto=format&fit=crop"
                reveal="rise"
                trigger="mount"
                duration={1.4}
                stagger={0.06}
                fillScale={1.3}
                parallax={20}
                textScale={0.031}
                align="center"
                weight={800}
                className="font-headline font-bold uppercase text-white/90 drop-shadow-xl whitespace-nowrap"
              />
            </motion.div>

            {/* Sub-Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-white/70 max-w-xl font-medium pt-4"
            >
              PREMIUM AGRI COMMODITIES · SPICES · FRESH PRODUCE
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
