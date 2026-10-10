import { SEO } from '@/components/global/SEO';

export default function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service | ANVI MERCANTILE PRIVATE LIMITED"
        description="Standard terms of service and trade freight forwarding conditions for ANVI MERCANTILE PRIVATE LIMITED."
      />

      <section className="relative pt-36 pb-16 bg-[#071c35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-4xl font-extrabold font-headline uppercase">TERMS OF SERVICE</h1>
          <p className="text-xs text-white/70">Last Updated: January 2026</p>
        </div>
      </section>

      <section className="py-16 bg-[#071c35]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0a2540] p-8 sm:p-12 rounded-2xl border border-white/10 shadow-sm text-xs text-white/80 space-y-6 font-sans leading-relaxed">
            <h2 className="text-lg font-bold font-headline uppercase text-[#f39c12]">1. Standard Trading Conditions</h2>
            <p>
              All freight forwarding, customs clearance, and logistics operations performed by ANVI MERCANTILE PRIVATE LIMITED are subject to Standard FIATA Trading Conditions and international maritime carriage conventions (Hague-Visby Rules / Hamburg Rules).
            </p>

            <h2 className="text-lg font-bold font-headline uppercase text-[#0b3a40]">2. Quotation Validity & Surcharges</h2>
            <p>
              Freight rate quotations are subject to bunker adjustment factors (BAF), peak season surcharges (PSS), and vessel space availability at time of booking confirmation.
            </p>

            <h2 className="text-lg font-bold font-headline uppercase text-[#0b3a40]">3. Regulatory Compliance & Accuracy</h2>
            <p>
              The shipper/client is solely responsible for providing true and accurate commodity descriptions, HS codes, and MSDS chemical classifications. Any fines resulting from misdeclared cargo remain the liability of the shipper.
            </p>

            <h2 className="text-lg font-bold font-headline uppercase text-[#0b3a40]">4. Jurisdiction</h2>
            <p>
              These terms are governed by the laws of India. Any legal disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
