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
          <div className="relative z-10 w-full max-w-[96vw] xl:max-w-[1440px] mx-auto my-auto flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center px-2">
            
            {/* Line 1: ANVI MERCANTILE PVT. LTD. (Big, prominent masked video text) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex justify-center overflow-hidden"
            >
              <MaskedHeading
                text="ANVI MERCANTILE PVT. LTD."
                mediaType="video"
                src="/fruits.mp4"
                poster="/images/pomegranate.jpg"
                reveal="rise"
                trigger="mount"
                duration={1.6}
                stagger={0.06}
                fillScale={1.35}
                parallax={30}
                textScale={0.072}
                align="center"
                weight={900}
                className="font-headline font-black uppercase text-white drop-shadow-2xl whitespace-nowrap tracking-wide"
              />
            </motion.div>

            {/* Line 2: By ANVI GROUPS (Bold and prominent masked video text) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex justify-center overflow-hidden"
            >
              <MaskedHeading
                text="By ANVI GROUPS"
                mediaType="video"
                src="/fruits.mp4"
                poster="/images/pomegranate.jpg"
                reveal="rise"
                trigger="mount"
                duration={1.4}
                stagger={0.06}
                fillScale={1.35}
                parallax={20}
                textScale={0.048}
                align="center"
                weight={900}
                className="font-headline font-black uppercase text-white/95 drop-shadow-xl whitespace-nowrap tracking-wider"
              />
            </motion.div>

            {/* Sub-Tagline: Larger and clearly visible */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-sm sm:text-base md:text-lg font-mono uppercase tracking-[0.25em] sm:tracking-[0.32em] text-white/90 max-w-2xl font-bold pt-3"
            >
              PREMIUM AGRI COMMODITIES · SPICES · FRESH PRODUCE
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
