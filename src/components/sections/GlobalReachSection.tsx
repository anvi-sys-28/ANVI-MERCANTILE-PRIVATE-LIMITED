import { WorldMap } from '@/components/ui/WorldMap';

export function GlobalReachSection() {
  return (
    <section className="py-24 bg-[#071c35] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[#f39c12] text-xs font-bold font-headline uppercase tracking-widest block">
            STRATEGIC CORRIDORS & MARITIME ARCS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight text-white">
            OUR GLOBAL REACH & TRADE HUB MAP
          </h2>
          <p className="text-xs sm:text-sm text-white/70 font-sans">
            Interactive view of primary vessel corridors connecting Mumbai HQ with East Asia, Middle East, Europe, and the Americas.
          </p>
        </div>

        <WorldMap />
      </div>
    </section>
  );
}
