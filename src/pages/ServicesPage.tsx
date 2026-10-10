import { Link } from 'react-router-dom';
import { SEO } from '@/components/global/SEO';
import { servicesData } from '@/data/servicesData';
import { Ship, Plane, FileCheck, Search, Warehouse, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

const iconMap = {
  Ship: Ship,
  Plane: Plane,
  FileCheck: FileCheck,
  Search: Search,
  Warehouse: Warehouse,
  Truck: Truck,
};

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Global Freight & Customs Services"
        description="Explore our complete range of ocean freight, air cargo, customs clearance, global sourcing, and warehousing solutions."
      />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#0b3a40] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#0f5c66_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[#c9a46b] text-xs font-bold font-headline uppercase tracking-widest block">
            END-TO-END SUPPLY CHAIN SOLUTIONS
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-headline uppercase tracking-tight text-white leading-none">
            OUR TRADE & LOGISTICS SERVICES
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl font-sans">
            From single pallet LCL air freights to full vessel chartering and complex customs brokerage, ANVI MERCANTILE PRIVATE LIMITED provides specialized international freight management.
          </p>
        </div>
      </section>

      {/* Main Services Grid List */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.iconName];
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                className={`bg-white rounded-2xl p-8 lg:p-12 border border-[#0b3a40]/10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Col (5 cols) */}
                <div className={`lg:col-span-5 rounded-xl overflow-hidden shadow-md ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    width="1200"
                    height="800"
                    loading="lazy"
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Col (7 cols) */}
                <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#0b3a40] text-[#c9a46b] flex items-center justify-center shadow">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold font-headline uppercase tracking-widest text-[#0f5c66]">
                      SERVICE 0{index + 1}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold font-headline uppercase text-[#0b3a40]">
                      {service.title}
                    </h2>
                    <p className="text-sm text-[#1a1f23]/80 leading-relaxed">
                      {service.fullDescription}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#0b3a40] font-medium pt-2">
                    {service.features.slice(0, 4).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#c9a46b] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#0b3a40]/10 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 bg-[#0b3a40] hover:bg-[#0f5c66] text-white text-xs font-bold font-headline uppercase tracking-wider px-6 py-3 rounded shadow transition-colors"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="w-4 h-4 text-[#c9a46b]" />
                    </Link>
                    <Link
                      to="/quote"
                      className="inline-flex items-center gap-2 bg-[#c9a46b] hover:bg-[#b59057] text-[#0b3a40] text-xs font-bold font-headline uppercase tracking-wider px-6 py-3 rounded shadow transition-colors"
                    >
                      <span>Request Quote</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}
