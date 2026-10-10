import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsData } from '@/data/testimonialsData';

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const active = testimonialsData[activeIndex];

  return (
    <section className="py-24 bg-[#071c35] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[#f39c12] text-xs font-bold font-headline uppercase tracking-widest block">
            CLIENT ENDORSEMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight text-white">
            WHAT OUR TRADE PARTNERS SAY
          </h2>
          <p className="text-xs sm:text-sm text-white/70 font-sans">
            Real experiences from business leaders moving cargo across international borders with Anvi Mercantile.
          </p>
        </div>

        {/* Featured Testimonial Carousel Card */}
        <div className="max-w-4xl mx-auto bg-[#0a2540] rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative">
          <Quote className="w-16 h-16 text-[#f39c12]/20 absolute top-6 right-8 pointer-events-none" />

          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 relative z-10"
          >
            {/* Rating Stars */}
            <div className="flex items-center space-x-1 text-[#f39c12]">
              {[...Array(active.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            {/* Quote Body */}
            <p className="text-base sm:text-xl text-white font-sans italic leading-relaxed">
              "{active.quote}"
            </p>

            {/* Author details */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4">
                <img
                  src={active.avatar}
                  alt={active.clientName}
                  width="100"
                  height="100"
                  loading="lazy"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#f39c12] shadow-md"
                />
                <div>
                  <h3 className="font-bold font-headline text-lg uppercase text-white">
                    {active.clientName}
                  </h3>
                  <p className="text-xs text-white/60 font-sans">
                    {active.role}, <span className="text-[#f39c12]">{active.company}</span> ({active.location})
                  </p>
                </div>
              </div>

              <span className="inline-block bg-[#f39c12] text-[#0a2540] text-[11px] font-bold font-headline uppercase px-4 py-1.5 rounded-full self-start sm:self-center shadow">
                {active.routeUsed}
              </span>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center justify-end gap-3 pt-6">
            <button
              onClick={prevTestimonial}
              className="p-2.5 rounded-full bg-[#0d2a4a] border border-white/10 text-white hover:bg-[#f39c12] hover:text-[#0a2540] transition-colors shadow"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2.5 rounded-full bg-[#0d2a4a] border border-white/10 text-white hover:bg-[#f39c12] hover:text-[#0a2540] transition-colors shadow"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
