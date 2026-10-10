import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '@/components/global/SEO';
import { servicesData } from '@/data/servicesData';
import { Ship, Plane, FileCheck, Search, Warehouse, Truck, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

const iconMap = {
  Ship: Ship,
  Plane: Plane,
  FileCheck: FileCheck,
  Search: Search,
  Warehouse: Warehouse,
  Truck: Truck,
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData.find((s) => s.slug === slug);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = iconMap[service.iconName];
  const relatedServices = servicesData.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <SEO
        title={service.title}
        description={service.shortDescription}
        ogImage={service.image}
      />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#0b3a40] text-white overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          width="2000"
          height="1000"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#0f5c66] border border-[#c9a46b] text-[#c9a46b] flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-[#c9a46b] text-xs font-bold font-headline uppercase tracking-widest">
              LOGISTICS SERVICE OVERVIEW
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-headline uppercase tracking-tight text-white leading-none">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-white/90 max-w-3xl font-sans leading-relaxed">
            {service.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/quote"
              className="bg-[#c9a46b] hover:bg-[#b59057] text-[#0b3a40] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded shadow-lg"
            >
              Get Custom Service Quote
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded border border-white/30"
            >
              Speak to Specialist
            </Link>
          </div>
        </div>
      </section>

      {/* Main Service Content */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Content Col (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Detailed Description */}
              <div className="bg-white p-8 rounded-xl border border-[#0b3a40]/10 shadow-sm space-y-4">
                <h2 className="text-2xl font-bold font-headline uppercase text-[#0b3a40]">
                  Service Overview & Operational Capabilities
                </h2>
                <p className="text-sm text-[#1a1f23]/80 leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Key Features List */}
              <div className="bg-white p-8 rounded-xl border border-[#0b3a40]/10 shadow-sm space-y-6">
                <h3 className="text-xl font-bold font-headline uppercase text-[#0b3a40]">
                  Key Service Features & SLA Standards
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded bg-[#f7f5f0] border border-[#0b3a40]/10">
                      <CheckCircle2 className="w-5 h-5 text-[#c9a46b] shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-[#0b3a40] leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Step Timeline */}
              <div className="bg-white p-8 rounded-xl border border-[#0b3a40]/10 shadow-sm space-y-6">
                <h3 className="text-xl font-bold font-headline uppercase text-[#0b3a40]">
                  Standard Operating Procedure (SOP)
                </h3>
                <div className="space-y-6">
                  {service.processSteps.map((step) => (
                    <div key={step.step} className="flex items-start gap-4 p-4 rounded-lg bg-[#f7f5f0] border border-[#0b3a40]/10">
                      <div className="w-10 h-10 rounded bg-[#0b3a40] text-[#c9a46b] font-headline font-bold text-base flex items-center justify-center shrink-0">
                        {step.step}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold font-headline uppercase text-sm text-[#0b3a40]">
                          {step.title}
                        </h4>
                        <p className="text-xs text-[#1a1f23]/75 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs Accordion */}
              <div className="bg-white p-8 rounded-xl border border-[#0b3a40]/10 shadow-sm space-y-6">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#c9a46b]" />
                  <h3 className="text-xl font-bold font-headline uppercase text-[#0b3a40]">
                    Frequently Asked Questions
                  </h3>
                </div>

                <div className="space-y-3">
                  {service.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-[#0b3a40]/10 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full p-4 text-left font-bold font-headline uppercase text-xs sm:text-sm text-[#0b3a40] bg-[#f7f5f0] flex items-center justify-between gap-4 focus:outline-none"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-[#c9a46b] shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#0b3a40]/50 shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="p-4 bg-white text-xs text-[#1a1f23]/80 leading-relaxed border-t border-[#0b3a40]/10">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Sidebar Specs (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Service Specifications Card */}
              <div className="bg-[#0b3a40] text-white p-6 rounded-xl border border-[#c9a46b]/40 shadow-xl space-y-6">
                <h3 className="text-lg font-bold font-headline uppercase tracking-wider text-[#c9a46b] pb-2 border-b border-white/10">
                  Service Specifications
                </h3>

                <div className="space-y-4">
                  {service.specs.map((spec, idx) => (
                    <div key={idx} className="space-y-1">
                      <span className="text-[11px] text-white/60 font-semibold uppercase tracking-wider block">
                        {spec.label}
                      </span>
                      <p className="text-xs font-semibold text-white">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  to="/quote"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#c9a46b] hover:bg-[#b59057] text-[#0b3a40] font-bold text-xs uppercase tracking-wider py-3 rounded shadow transition-colors"
                >
                  <span>Request Instant Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Related Services */}
              <div className="bg-white p-6 rounded-xl border border-[#0b3a40]/10 shadow-sm space-y-4">
                <h4 className="text-sm font-bold font-headline uppercase tracking-wider text-[#0b3a40]">
                  Related Trade Solutions
                </h4>

                <div className="space-y-3">
                  {relatedServices.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/services/${rel.slug}`}
                      className="flex items-center justify-between p-3 rounded bg-[#f7f5f0] hover:bg-[#0b3a40] hover:text-white transition-colors group text-xs font-bold font-headline uppercase"
                    >
                      <span className="text-[#0b3a40] group-hover:text-white">{rel.title}</span>
                      <ArrowRight className="w-4 h-4 text-[#c9a46b]" />
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}
