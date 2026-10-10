import { Link } from 'react-router-dom';
import { ArrowUpRight, Calculator } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';

export function MobileStickyQuoteCTA() {
  const isScrolled = useScrolled(250);

  if (!isScrolled) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a1e] border-t border-white/10 p-3 lg:hidden backdrop-blur-md shadow-2xl animate-slide-up">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-2 text-white">
          <Calculator className="w-5 h-5 text-[#d04918]" />
          <div className="flex flex-col">
            <span className="text-xs font-bold font-headline uppercase tracking-wider text-white">
              Instant Freight Estimate
            </span>
            <span className="text-[10px] text-white/70">Door-to-door DDP & Port rates</span>
          </div>
        </div>
        <Link
          to="/quote"
          className="bg-[#d04918] hover:bg-[#b53d10] text-white font-bold text-xs tracking-wider uppercase px-4 py-2 rounded flex items-center gap-1 shrink-0 shadow-md"
        >
          <span>Get Quote</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
