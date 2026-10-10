import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { productsData } from '@/data/productsData';

export function ProductsGridSection() {
  return (
    <section className="py-24 bg-[#071c35] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[#f39c12] text-xs font-bold font-headline uppercase tracking-widest block">
              SPECIALIZED CARGO CATEGORIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight text-white">
              PRODUCTS & COMMODITIES WE HANDLE
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-sans">
              Deep expertise in handling temperature-sensitive agri goods, high-value electronics, hazardous chemicals, and garments.
            </p>
          </div>

          <Link
            to="/trade"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f39c12] hover:text-white group shrink-0"
          >
            <span>Explore Trade Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#f39c12] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsData.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative h-80 rounded-3xl overflow-hidden shadow-2xl cursor-pointer border border-white/10 hover:border-[#f39c12] transition-colors"
            >
              {/* Background Photo */}
              <img
                src={product.image}
                alt={product.name}
                width="800"
                height="600"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071c35] via-[#071c35]/80 to-transparent group-hover:via-[#071c35]/90 transition-colors" />

              {/* Card Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-headline uppercase tracking-widest bg-[#f39c12] text-[#0a2540] px-3 py-1 rounded-full shadow">
                    HS {product.hsCodeRange}
                  </span>
                  <Tag className="w-4 h-4 text-[#f39c12]" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs text-[#f39c12] uppercase tracking-wider font-semibold font-headline">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-bold font-headline uppercase tracking-wide group-hover:text-[#f39c12] transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-white/70 line-clamp-2 font-sans">
                    {product.description}
                  </p>
                  
                  <div className="pt-2 flex items-center gap-1.5 text-[11px] text-white/60 font-sans">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#f39c12]" />
                    <span>{product.handlingSpecs}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
