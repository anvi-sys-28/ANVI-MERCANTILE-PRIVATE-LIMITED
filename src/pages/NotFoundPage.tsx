import { Link } from 'react-router-dom';
import { SEO } from '@/components/global/SEO';
import { Compass, Anchor, ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="404 - Page Not Found" description="The requested trade route or page could not be located." />

      <section className="min-h-[80vh] bg-[#0b3a40] text-white flex items-center justify-center p-6 pt-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#0f5c66_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-lg mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#0f5c66] border border-[#c9a46b] text-[#c9a46b] flex items-center justify-center mx-auto shadow-2xl">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>

          <div className="space-y-2">
            <span className="text-4xl sm:text-6xl font-extrabold font-headline text-[#c9a46b] block">
              404 ERROR
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline uppercase text-white">
              TRADE ROUTE NOT FOUND
            </h1>
            <p className="text-xs sm:text-sm text-white/70">
              The page or shipment parameter you requested seems to have drifted off course.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#c9a46b] hover:bg-[#b59057] text-[#0b3a40] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded shadow"
            >
              <Anchor className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded border border-white/30"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
