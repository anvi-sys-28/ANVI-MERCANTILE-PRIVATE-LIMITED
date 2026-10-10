import { motion } from 'framer-motion';
import { FileText, Calculator, ShieldCheck, CheckCircle2 } from 'lucide-react';

const processSteps = [
  {
    step: "01",
    title: "Trade Inquiry & Analysis",
    description: "Submit cargo details, origin/destination ports, target ready dates, and Incoterm preferences.",
    icon: FileText
  },
  {
    step: "02",
    title: "Guaranteed Quote & Booking",
    description: "Receive itemized freight rates, carrier schedules, and custom clearance costs with no hidden fees.",
    icon: Calculator
  },
  {
    step: "03",
    title: "Documentation & Customs",
    description: "Our licensed customs brokers process ICEGATE filings, bill of entry, and export compliance approvals.",
    icon: ShieldCheck
  },
  {
    step: "04",
    title: "Real-Time Transit & Delivery",
    description: "Track shipment milestones from vessel loading to final doorstep delivery with POD confirmation.",
    icon: CheckCircle2
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-[#071c35] text-white relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[#f39c12] text-xs font-bold font-headline uppercase tracking-widest block">
            FOUR-STEP TRADE LOGISTICS PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight text-white">
            HOW WE MOVE YOUR CARGO
          </h2>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
            A streamlined, single-window operating procedure designed for maximum reliability and speed.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-0.5 bg-gradient-to-r from-white/10 via-[#f39c12] to-white/10 z-0" />

          {processSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative z-10 bg-[#0a2540] p-6 rounded-3xl border border-white/10 hover:border-[#f39c12] transition-all space-y-4 group shadow-xl"
              >
                {/* Step Circle */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#0d2a4a] border-2 border-[#f39c12] text-[#f39c12] flex items-center justify-center font-extrabold font-headline text-lg group-hover:bg-[#f39c12] group-hover:text-[#0a2540] transition-colors shadow-lg">
                    {item.step}
                  </div>
                  <Icon className="w-6 h-6 text-white/40 group-hover:text-[#f39c12] transition-colors" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-headline uppercase tracking-wide text-white group-hover:text-[#f39c12] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
