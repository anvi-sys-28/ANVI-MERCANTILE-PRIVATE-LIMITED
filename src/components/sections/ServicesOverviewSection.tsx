import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ship, Plane, FileCheck, Search, Warehouse, Truck, ArrowRight } from 'lucide-react';
import { servicesData } from '@/data/servicesData';

const iconMap = {
  Ship: Ship,
  Plane: Plane,
  FileCheck: FileCheck,
  Search: Search,
  Warehouse: Warehouse,
  Truck: Truck,
};

export function ServicesOverviewSection() {
  return (
    <section className="py-24 bg-[#071c35] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[#f39c12] text-xs font-bold font-headline uppercase tracking-widest block">
              WORLD-CLASS LOGISTICS CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight text-white leading-none">
              OUR CORE TRADE SERVICES
            </h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed pt-1 font-sans">
              End-to-end global trade management engineered for seamless ocean, air, and customs execution.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f39c12] hover:text-white group shrink-0"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 text-[#f39c12] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.iconName];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#0a2540] p-8 rounded-3xl border border-white/10 hover:border-[#f39c12] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-6">
                  {/* Icon & Title */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-[#0d2a4a] text-[#f39c12] flex items-center justify-center shadow-md group-hover:bg-[#f39c12] group-hover:text-[#0a2540] transition-colors">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono font-bold text-white/30 group-hover:text-[#f39c12] transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-headline uppercase tracking-wide text-white group-hover:text-[#f39c12] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#f39c12] transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 text-[#f39c12] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
