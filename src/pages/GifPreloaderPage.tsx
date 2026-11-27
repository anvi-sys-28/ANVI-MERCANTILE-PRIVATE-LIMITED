import { useState, useEffect } from 'react';
import { AnviGroupsPreloader } from '@/components/global/AnviGroupsPreloader';
import { SEO } from '@/components/global/SEO';
import { Play, RotateCcw, ShieldCheck, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';

export default function GifPreloaderPage() {
  const [key, setKey] = useState(1);
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  const [exitCount, setExitCount] = useState(0);

  const handleReplay = () => {
    try {
      sessionStorage.removeItem('anvi_groups_preloader_seen_v4');
    } catch {
      // ignore
    }
    setIsPreloaderActive(true);
    setKey((prev) => prev + 1);
  };

  const handleComplete = () => {
    setIsPreloaderActive(false);
    setExitCount((prev) => prev + 1);
  };

  useEffect(() => {
    // Clear session storage on initial mount so visiting /gif ALWAYS tests the preloader fresh
    try {
      sessionStorage.removeItem('anvi_groups_preloader_seen_v4');
    } catch {
      // ignore
    }
  }, []);

  return (
    <>
      <SEO
        title="Luxury Splash Screen / Preloader Testing Studio | ANVI GROUPS"
        description="Interactive laboratory for testing, customizing, and previewing the Anvi Groups luxury cinematic preloader component."
      />

      {/* The Active Luxury Cinematic Preloader Component */}
      {isPreloaderActive && (
        <AnviGroupsPreloader
          key={`preloader-instance-${key}`}
          forceShow={true}
          onComplete={handleComplete}
        />
      )}

      {/* Laboratory & Testing Workbench (Visible when preloader exits or in background) */}
      <div className="min-h-screen bg-[#070b14] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#ff7a1a] selection:text-white">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest bg-gradient-to-r from-[#ff7a1a] to-[#d9480f] text-white px-2.5 py-0.5 rounded-full font-mono">
                  DEV LAB · /gif
                </span>
                <span className="text-xs text-white/50 font-mono">
                  Completed Runs: {exitCount}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-headline text-white">
                Luxury Splash Screen Testing Studio
              </h1>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                Test, inspect, and modify the luxury cinematic preloader component here in real-time before rolling out across other pages.
              </p>
            </div>

            <button
              onClick={handleReplay}
              className="px-6 py-3.5 bg-gradient-to-r from-[#ff7a1a] to-[#d9480f] hover:from-[#ff8c3a] hover:to-[#e0531a] text-white rounded-xl font-bold text-sm flex items-center gap-2.5 shadow-lg shadow-orange-950/40 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              Replay Splash Screen
            </button>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400">
                <Sparkles className="w-4 h-4" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-white">Brand Monogram</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                SVG monogram with 1203x788 viewBox. Path length 100 with stroke-dashoffset animation (0.4s to 1.65s) and fill fade (1.5s).
              </p>
            </div>

            <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#ff7a1a]">
                <Sliders className="w-4 h-4" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-white">7 Shutter Panels</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vertical shutter exit split: even panels slide up (-102%), odd panels slide down (102%) with 45ms staggered delay.
              </p>
            </div>

            <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-white">Failsafe &amp; Safety</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                6000ms safety timeout, sessionStorage persistence, URL bypass (?intro / ?preloader), and prefers-reduced-motion support.
              </p>
            </div>
          </div>

          {/* Keyframes & Specification Checklist */}
          <div className="bg-[#0f172a]/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white font-headline flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Preloader Specification Checklist
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-white/5">
                <div className="text-[#ff7a1a] font-bold">1. BRANDING &amp; TYPOGRAPHY</div>
                <div className="text-slate-300">✓ Company: "ANVI GROUPS" in luxury serif</div>
                <div className="text-slate-300">✓ Soft glow: text-shadow 0 0 24px rgba(255,255,255,0.45)</div>
                <div className="text-slate-300">✓ Dividers: 1px glowing gradient horizontal lines</div>
                <div className="text-slate-300">✓ Subsidiaries: Tech India &amp; Mercantile in Plus Jakarta Sans</div>
                <div className="text-slate-300">✓ Monogram: Exact SVG path (viewBox 0 0 1203 788)</div>
              </div>

              <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-white/5">
                <div className="text-[#ff7a1a] font-bold">2. BACKGROUND &amp; PANELS</div>
                <div className="text-slate-300">✓ Palette: #7A2406, #D9480F, #FF7A1A, #FFB36B, #FFFFFF</div>
                <div className="text-slate-300">✓ 7 Vertical Panel Strips (width: calc(100% / 7 + 1px))</div>
                <div className="text-slate-300">✓ Specular highlight streaks across panels</div>
                <div className="text-slate-300">✓ Radial dark edge vignette (35% to 100%)</div>
                <div className="text-slate-300">✓ Inline SVG turbulence noise grain overlay</div>
              </div>

              <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-white/5">
                <div className="text-[#ff7a1a] font-bold">3. ANIMATION TIMINGS</div>
                <div className="text-slate-300">✓ 0.40s – 1.65s: Monogram stroke draw</div>
                <div className="text-slate-300">✓ 1.50s – 2.25s: Monogram fill fade</div>
                <div className="text-slate-300">✓ 1.60s – 2.70s: Title settle (translateY: 12px → 0)</div>
                <div className="text-slate-300">✓ 2.20s &amp; 2.90s: Top &amp; bottom divider line expansions</div>
                <div className="text-slate-300">✓ 2.50s &amp; 2.75s: Sub 1 &amp; Sub 2 fade-up</div>
                <div className="text-slate-300">✓ 0.00s – 3.60s: Tabular progress 00% → 100%</div>
              </div>

              <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-white/5">
                <div className="text-[#ff7a1a] font-bold">4. EXIT &amp; RELIABILITY</div>
                <div className="text-slate-300">✓ Shutter split: even panels slide up (-102%)</div>
                <div className="text-slate-300">✓ Shutter split: odd panels slide down (102%)</div>
                <div className="text-slate-300">✓ Staggered exit delay: index * 45ms</div>
                <div className="text-slate-300">✓ Scroll lock: anvi-preloader-active on html/body</div>
                <div className="text-slate-300">✓ Session: anvi_groups_preloader_seen_v4</div>
                <div className="text-slate-300">✓ Safety timeout failsafe at 6000ms</div>
              </div>
            </div>
          </div>

          {/* Test Buttons Toolbar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleReplay}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold font-headline flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Re-Trigger Sequence
            </button>
            <a
              href="/gif?intro"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white rounded-xl text-xs font-bold font-mono transition-all"
            >
              Test with ?intro bypass
            </a>
            <a
              href="/gif?preloader"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white rounded-xl text-xs font-bold font-mono transition-all"
            >
              Test with ?preloader bypass
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
