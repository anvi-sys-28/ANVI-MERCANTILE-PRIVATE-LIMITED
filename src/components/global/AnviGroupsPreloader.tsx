import { useEffect, useState, useRef } from 'react';
import './AnviGroupsPreloader.css';

const SESSION_KEY = 'anvi_groups_preloader_seen_v4';
const SCROLL_LOCK_CLASS = 'anvi-preloader-active';
const MONOGRAM_PATH =
  'M 3.0 679.0 L 8.0 695.0 L 24.0 722.0 L 40.0 739.0 L 63.0 755.0 L 102.0 769.0 L 117.0 771.0 L 154.0 769.0 L 191.0 756.0 L 217.0 739.0 L 232.0 725.0 L 370.0 540.0 L 384.0 526.0 L 667.0 526.0 L 672.0 521.0 L 630.0 448.0 L 622.0 442.0 L 237.0 442.0 L 191.0 449.0 L 156.0 460.0 L 115.0 481.0 L 86.0 503.0 L 59.0 531.0 L 27.0 574.0 L 8.0 610.0 L 0.0 648.0 Z M 275.0 528.0 L 268.0 536.0 L 263.0 544.0 L 259.0 548.0 L 257.0 552.0 L 253.0 556.0 L 246.0 567.0 L 240.0 573.0 L 235.0 582.0 L 231.0 586.0 L 217.0 605.0 L 210.0 616.0 L 206.0 620.0 L 201.0 628.0 L 191.0 640.0 L 187.0 647.0 L 180.0 655.0 L 173.0 666.0 L 165.0 676.0 L 152.0 689.0 L 142.0 696.0 L 136.0 699.0 L 127.0 702.0 L 115.0 702.0 L 107.0 699.0 L 101.0 695.0 L 94.0 688.0 L 86.0 674.0 L 83.0 663.0 L 83.0 649.0 L 85.0 640.0 L 88.0 632.0 L 95.0 619.0 L 105.0 608.0 L 107.0 604.0 L 133.0 574.0 L 153.0 554.0 L 162.0 547.0 L 180.0 537.0 L 205.0 529.0 L 224.0 526.0 Z M 195.0 411.0 L 296.0 405.0 L 507.0 117.0 L 543.0 91.0 L 583.0 88.0 L 621.0 106.0 L 878.0 507.0 L 927.0 537.0 L 991.0 533.0 L 1033.0 500.0 L 1049.0 466.0 L 1053.0 113.0 L 1070.0 87.0 L 1100.0 86.0 L 1119.0 112.0 L 1119.0 618.0 L 1101.0 663.0 L 1061.0 695.0 L 1020.0 707.0 L 968.0 706.0 L 930.0 691.0 L 892.0 659.0 L 627.0 227.0 L 595.0 200.0 L 562.0 194.0 L 522.0 209.0 L 378.0 410.0 L 475.0 407.0 L 562.0 295.0 L 790.0 676.0 L 833.0 728.0 L 877.0 759.0 L 951.0 784.0 L 1018.0 787.0 L 1085.0 773.0 L 1162.0 719.0 L 1200.0 633.0 L 1195.0 75.0 L 1162.0 27.0 L 1099.0 3.0 L 1033.0 16.0 L 986.0 60.0 L 968.0 108.0 L 968.0 436.0 L 956.0 460.0 L 706.0 61.0 L 665.0 24.0 L 590.0 0.0 L 512.0 10.0 L 447.0 54.0 Z';

interface AnviGroupsPreloaderProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export function AnviGroupsPreloader({ onComplete, forceShow = false }: AnviGroupsPreloaderProps) {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    const hasBypass = urlParams.has('intro') || urlParams.has('preloader');
    if (hasBypass || forceShow) return true;
    try {
      return !sessionStorage.getItem(SESSION_KEY);
    } catch {
      return true;
    }
  });

  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const exitTriggeredRef = useRef(false);

  useEffect(() => {
    if (!isVisible) return;

    // 1. Scroll Lock
    document.documentElement.classList.add(SCROLL_LOCK_CLASS);
    document.body.classList.add(SCROLL_LOCK_CLASS);

    // 2. Check for prefers-reduced-motion
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setProgress(100);
      const reducedTimer = setTimeout(() => {
        triggerExit();
      }, 1000);
      return () => clearTimeout(reducedTimer);
    }

    // 3. Smooth counter from 00% to 100% across 3600ms
    const totalDuration = 3600;
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / totalDuration) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        triggerExit();
      }
    }, 25);

    // 4. Failsafe safety timeout (6000ms max)
    const failsafe = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      triggerExit();
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(failsafe);
    };
  }, [isVisible]);

  const triggerExit = () => {
    if (exitTriggeredRef.current) return;
    exitTriggeredRef.current = true;

    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // ignore
    }

    setIsExiting(true);

    // Wait for exit transition (1000ms + panel stagger)
    setTimeout(() => {
      document.documentElement.classList.remove(SCROLL_LOCK_CLASS);
      document.body.classList.remove(SCROLL_LOCK_CLASS);
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1300);
  };

  if (!isVisible) return null;

  const formattedProgress = progress < 10 ? `0${progress}%` : `${progress}%`;

  return (
    <div
      className={`anvi-preloader-container ${isExiting ? 'anvi-exiting' : ''}`}
      onClick={triggerExit}
      title="Click anywhere to skip"
    >
      {/* 7 Vertical Panel Strips */}
      <div className="anvi-preloader-panels" aria-hidden="true">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={`anvi-panel-${index}`} className="anvi-preloader-panel" />
        ))}
      </div>

      {/* Radial Dark Edge Vignette */}
      <div className="anvi-preloader-vignette" aria-hidden="true" />

      {/* Inline SVG Turbulence Noise Grain Overlay */}
      <svg className="anvi-preloader-noise" aria-hidden="true">
        <filter id="anviGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#anviGrain)" />
      </svg>

      {/* Center Brand Stack */}
      <div className="anvi-brand-stack">
        {/* Monogram SVG */}
        <div className="anvi-monogram-wrap">
          <svg
            className="anvi-monogram-svg"
            viewBox="0 0 1203 788"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="anvi-monogram-path"
              d={MONOGRAM_PATH}
              pathLength="100"
            />
          </svg>
        </div>

        {/* Company Title */}
        <h1 className="anvi-company-title">ANVI GROUPS</h1>

        {/* Top Divider */}
        <div className="anvi-divider-line anvi-divider-top" />

        {/* Subsidiaries Stack */}
        <div className="anvi-subsidiaries-stack">
          <p className="anvi-sub-name anvi-sub-1">ANVI TECH INDIA PVT. LTD.</p>
          <p className="anvi-sub-name anvi-sub-2">ANVI MERCANTILE PVT. LTD.</p>
        </div>

        {/* Bottom Divider */}
        <div className="anvi-divider-line anvi-divider-bottom" />
      </div>

      {/* Progress Counter Section */}
      <div className="anvi-progress-section">
        <div className="anvi-progress-track">
          <div className="anvi-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="anvi-progress-counter">{formattedProgress}</span>
      </div>
    </div>
  );
}

export default AnviGroupsPreloader;
