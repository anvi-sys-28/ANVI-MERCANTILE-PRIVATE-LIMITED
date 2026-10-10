import { SEO } from '@/components/global/SEO';
import { siteConfig } from '@/data/siteConfig';

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy | ANVI MERCANTILE PRIVATE LIMITED"
        description="Privacy policy and data protection guidelines for ANVI MERCANTILE PRIVATE LIMITED import/export clients."
      />

      <section className="relative pt-36 pb-16 bg-[#071c35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-4xl font-extrabold font-headline uppercase">PRIVACY POLICY</h1>
          <p className="text-xs text-white/70">Last Updated: January 2026</p>
        </div>
      </section>

      <section className="py-16 bg-[#071c35]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0a2540] p-8 sm:p-12 rounded-2xl border border-white/10 shadow-sm text-xs text-white/80 space-y-6 font-sans leading-relaxed">
            <h2 className="text-lg font-bold font-headline uppercase text-[#f39c12]">1. Information Collection</h2>
            <p>
              ANVI MERCANTILE PRIVATE LIMITED collects personal and commercial trade information (including company name, IEC registration, contact emails, phone numbers, and shipping invoice manifests) strictly to process freight quotes, customs filings, and container tracking.
            </p>

            <h2 className="text-lg font-bold font-headline uppercase text-[#0b3a40]">2. Data Utilization & Customs Reporting</h2>
            <p>
              Trade documentation is shared exclusively with authorized port authorities, customs departments (e.g. Indian Customs ICEGATE, Dubai Customs), and ocean/air freight carriers to satisfy statutory clearance rules.
            </p>

            <h2 className="text-lg font-bold font-headline uppercase text-[#0b3a40]">3. Data Security & Storage</h2>
            <p>
              All digital communications and quote requests are encrypted using industry-standard SSL/TLS protocols. We do not sell or rent client contact information to third-party marketing brokers.
            </p>

            <h2 className="text-lg font-bold font-headline uppercase text-[#0b3a40]">4. Contact Officer</h2>
            <p>
              For privacy inquiries or data removal requests, contact our Compliance Officer at <strong>{siteConfig.contact.email}</strong>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
