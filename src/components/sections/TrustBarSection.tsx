import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { trustStats, shippingLinePartners } from '@/data/statsData';

function CounterItem({ value, suffix, label, subtext }: { value: number; suffix: string; label: string; subtext: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-6 bg-[#0a2540] rounded-3xl border border-white/10 shadow-xl hover:border-[#f39c12] transition-all">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline text-white tracking-tight">
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div className="text-xs font-bold font-headline uppercase tracking-wider text-[#f39c12] mt-1">
        {label}
      </div>
      <div className="text-xs text-white/60 font-sans mt-1">
        {subtext}
      </div>
    </div>
  );
}

export function TrustBarSection() {
  return (
    <section className="py-20 bg-[#071c35] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustStats.map((stat) => (
            <CounterItem key={stat.id} {...stat} />
          ))}
        </div>

        {/* Shipping Line & Airline Carrier Logo Strip */}
        <div className="pt-8 border-t border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-headline uppercase tracking-widest text-[#f39c12]">
              DIRECT CARRIER CONTRACTS & SHIPPING LINES
            </span>
            <span className="text-xs text-white/50 hidden sm:block">Guaranteed vessel slots & priority air space</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
            {shippingLinePartners.map((partner) => (
              <div
                key={partner.code}
                className="bg-[#0a2540] border border-white/10 rounded-2xl p-3.5 text-center hover:border-[#f39c12] transition-colors group cursor-default shadow-md"
              >
                <span className="text-xs font-bold font-headline text-white group-hover:text-[#f39c12] tracking-wider uppercase block">
                  {partner.name}
                </span>
                <span className="text-[10px] text-white/40 block font-mono">
                  {partner.code}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
