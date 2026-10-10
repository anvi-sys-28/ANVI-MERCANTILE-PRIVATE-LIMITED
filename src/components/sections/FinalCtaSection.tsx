import { Link } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export function FinalCtaSection() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    'Hello Anvi Mercantile, I would like to request an instant quote for my cargo.'
  )}`;

  return (
    <section className="relative py-24 bg-[#071c35] text-white overflow-hidden border-b border-white/10">
      {/* Background ocean image */}
      <img
        src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=2000&q=80"
        alt="Container Cargo Liner at Sea"
        width="2000"
        height="1000"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#071c35] via-[#0a2540]/90 to-[#071c35]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <span className="text-[#f39c12] text-xs font-bold font-headline uppercase tracking-widest inline-block px-4 py-1 bg-[#0d2a4a] rounded-full border border-white/15">
          ZERO-DELAY GLOBAL FREIGHT FACILITATION
        </span>

        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none font-headline">
          READY TO MOVE YOUR CARGO ACROSS BORDERS?
        </h2>

        <p className="text-sm sm:text-lg text-white/80 max-w-2xl mx-auto font-sans leading-relaxed">
          Contact our senior trade logistics specialists today for competitive ocean & air freight quotes, customs clearance advisory, and DDP door-to-door solutions.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/quote"
            className="inline-flex items-center justify-center gap-2 bg-[#f39c12] hover:bg-[#e67e22] text-[#0a2540] font-bold text-sm tracking-wider px-8 py-4 rounded-full shadow-2xl transition-all transform hover:scale-105"
          >
            <span>Request a Free Quote</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm tracking-wider px-8 py-4 rounded-full shadow-2xl transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Send via WhatsApp</span>
          </a>

          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wider px-8 py-4 rounded-full border border-white/20 transition-colors"
          >
            <Phone className="w-5 h-5 text-[#f39c12]" />
            <span>Call {siteConfig.contact.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
