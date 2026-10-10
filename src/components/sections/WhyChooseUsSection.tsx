import { motion } from 'framer-motion';
import { DollarSign, ShieldCheck, Search, UserCheck, Headset } from 'lucide-react';

const differentiators = [
  {
    title: "100% Transparent All-Inclusive Pricing",
    description: "Zero surprise destination charges or hidden demurrage bills. You receive itemized freight quotes upfront.",
    icon: DollarSign,
  },
  {
    title: "Strict International Compliance Expertise",
    description: "Licensed Customs Brokerage handling DGFT regulations, AD Code linking, ICEGATE e-filing, and CEPA origin certificates.",
    icon: ShieldCheck,
  },
  {
    title: "Real-Time Container & Flight Tracking",
    description: "Milestone status updates delivered via WhatsApp, SMS, and client portal from vessel berth to final warehouse.",
    icon: Search,
  },
  {
    title: "Dedicated Single Account Manager",
    description: "Direct cell phone & email access to a senior trade specialist assigned exclusively to your business account.",
    icon: UserCheck,
  },
  {
    title: "24/7 Global Port Operations Support",
    description: "Around-the-clock shift support across Asian, European, and American time zones for urgent customs issues.",
    icon: Headset,
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-[#071c35] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with Floating Experience Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15"
          >
            <img
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80"
              alt="Global Freight Operations"
              width="1200"
              height="800"
              loading="lazy"
              className="w-full h-[520px] object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#071c35] via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-[#0a2540]/95 backdrop-blur-md p-5 rounded-3xl border border-white/20 text-white flex items-center gap-4 shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-[#f39c12] text-[#0a2540] font-headline font-bold text-2xl flex items-center justify-center shrink-0 shadow-lg">
                12+
              </div>
              <div>
                <h4 className="font-bold font-headline uppercase text-base text-white tracking-wide">
                  YEARS OF PROVEN TRADE TRUST
                </h4>
                <p className="text-xs text-white/70 font-sans">
                  Trusted by over 1,250+ manufacturers, importers & trade businesses worldwide.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Differentiators */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-[#f39c12] text-xs font-bold font-headline uppercase tracking-widest block">
                THE ANVI MERCANTILE ADVANTAGE
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline uppercase tracking-tight text-white">
                WHY TRADE PARTNERS CHOOSE US
              </h2>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                We combine deep customs regulatory authority with global carrier contracts to eliminate trade risk.
              </p>
            </div>

            <div className="space-y-4">
              {differentiators.map((diff, idx) => {
                const Icon = diff.icon;
                return (
                  <motion.div
                    key={diff.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[#0a2540] border border-white/10 hover:border-[#f39c12] transition-all group shadow-md"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0d2a4a] text-[#f39c12] flex items-center justify-center shrink-0 group-hover:bg-[#f39c12] group-hover:text-[#0a2540] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold font-headline uppercase tracking-wide text-white group-hover:text-[#f39c12] transition-colors">
                        {diff.title}
                      </h3>
                      <p className="text-xs text-white/70 leading-relaxed font-sans">
                        {diff.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
