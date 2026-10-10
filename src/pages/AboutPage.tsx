import { SEO } from '@/components/global/SEO';
import { siteConfig } from '@/data/siteConfig';
import { ShieldCheck, Award, Globe, Users } from 'lucide-react';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

const values = [
  {
    title: "Uncompromising Regulatory Compliance",
    description: "Every import declaration and customs document is audited for 100% DGFT, ICEGATE, and IMDG statutory adherence.",
    icon: ShieldCheck
  },
  {
    title: "100% Price Transparency",
    description: "No hidden destination port surcharges or sudden demurrage fees. Guaranteed itemized invoicing upfront.",
    icon: Award
  },
  {
    title: "Single Point of Accountability",
    description: "Dedicated trade account managers who monitor container status from factory pickup to doorstep delivery.",
    icon: Users
  },
  {
    title: "Global Network Strength",
    description: "Direct liner carrier contracts with Maersk, MSC, COSCO, and Emirates SkyCargo across 65+ trade corridors.",
    icon: Globe
  }
];


export default function AboutPage() {
  return (
    <>
      <SEO
        title="About ANVI MERCANTILE PRIVATE LIMITED | Premier Global Trade Partner"
        description="Learn about ANVI MERCANTILE PRIVATE LIMITED history, founding story, IEC & FIATA certifications, and leadership team in global import/export."
      />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#071c35] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#0a2540_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[#f39c12] text-xs font-bold font-headline uppercase tracking-widest block">
            ESTABLISHED IN {siteConfig.foundingYear}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-headline uppercase tracking-tight text-white leading-none">
            ABOUT ANVI MERCANTILE
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl font-sans">
            Moving business across borders with speed, security, and uncompromised regulatory mastery.
          </p>
        </div>
      </section>

      {/* Story & Mission Split */}
      <section className="py-20 bg-[#071c35] border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-[#f39c12] text-xs font-bold font-headline uppercase tracking-widest block">
                OUR JOURNEY & VISION
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-headline uppercase text-white">
                BRIDGING INDIAN MANUFACTURERS WITH GLOBAL MARKETS
              </h2>
              <div className="space-y-4 text-sm text-white/80 leading-relaxed font-sans">
                <p>
                  Founded in {siteConfig.foundingYear} in Mumbai, India, <strong>ANVI MERCANTILE PRIVATE LIMITED</strong> was established with a singular mission: to strip away the opacity and regulatory complexity of international freight forwarding for growing enterprises.
                </p>
                <p>
                  Over the past decade, we have evolved from a specialized customs brokerage into a full-scale global trade logistics provider, clearing over 14,800+ TEUs and air cargo tonnage across 65+ international trade lanes annually.
                </p>
                <p>
                  Whether facilitating zero-tariff spice exports under the India-UAE CEPA agreement or managing time-critical semiconductor air charters from Shanghai, our commitment remains constant: precision, transparency, and personal accountability.
                </p>
              </div>

              {/* Stats Highlight Bar */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#0b3a40]/10">
                <div>
                  <span className="text-2xl font-extrabold font-headline text-[#0b3a40] block">65+</span>
                  <span className="text-[11px] text-[#1a1f23]/70 font-semibold uppercase">Countries Served</span>
                </div>
                <div>
                  <span className="text-2xl font-extrabold font-headline text-[#0b3a40] block">14,800+</span>
                  <span className="text-[11px] text-[#1a1f23]/70 font-semibold uppercase">TEUs Cleared</span>
                </div>
                <div>
                  <span className="text-2xl font-extrabold font-headline text-[#0b3a40] block">1,250+</span>
                  <span className="text-[11px] text-[#1a1f23]/70 font-semibold uppercase">Active Clients</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#0b3a40]/20">
              <img
                src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80"
                alt="Container Port Ship"
                width="1200"
                height="800"
                loading="lazy"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b3a40]/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs text-[#c9a46b] font-headline font-bold uppercase tracking-widest">
                  HEADQUARTERS LOCATION
                </span>
                <h3 className="text-xl font-bold font-headline uppercase">
                  {siteConfig.location.address}, {siteConfig.location.city}
                </h3>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-white border-b border-[#0b3a40]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[#c9a46b] text-xs font-bold font-headline uppercase tracking-widest block">
              OPERATIONAL PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-headline uppercase text-[#0b3a40]">
              OUR CORE TRADE VALUES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#f7f5f0] p-6 rounded-xl border border-[#0b3a40]/10 space-y-4 hover:border-[#c9a46b] transition-colors"
                >
                  <div className="w-12 h-12 rounded bg-[#0b3a40] text-[#c9a46b] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-headline uppercase text-[#0b3a40]">
                    {v.title}
                  </h3>
                  <p className="text-xs text-[#1a1f23]/80 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications Strip */}
      <section className="py-16 bg-[#0b3a40] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-[#c9a46b] text-xs font-bold font-headline uppercase tracking-widest">
              STATUTORY AUTHORIZATIONS & ACCREDITATIONS
            </span>
            <h2 className="text-2xl font-bold font-headline uppercase text-white">
              CERTIFIED GLOBAL TRADE COMPLIANCE
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {siteConfig.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="bg-[#0f5c66]/50 p-4 rounded border border-white/10 text-center space-y-1"
              >
                <Award className="w-6 h-6 text-[#c9a46b] mx-auto mb-2" />
                <h4 className="font-bold font-headline uppercase text-sm text-white">
                  {cert.title}
                </h4>
                <p className="text-[11px] text-[#c9a46b] font-mono font-semibold">
                  {cert.code}
                </p>
                <p className="text-[10px] text-white/60">
                  {cert.issuer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <FinalCtaSection />
    </>
  );
}
