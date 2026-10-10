import { SEO } from '@/components/global/SEO';
import { HeroSection } from '@/components/sections/HeroSection';
import { ShippingCompaniesTickerSection } from '@/components/sections/ShippingCompaniesTickerSection';
import { StickyScrollFeatureSection } from '@/components/sections/StickyScrollFeatureSection';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Moving Business Across Borders"
        description="Premier import/export facilitation, sea freight forwarding, air cargo, and customs clearance logistics."
      />
      <main className="w-full overflow-x-clip">
        <HeroSection />
        <ShippingCompaniesTickerSection />
        <StickyScrollFeatureSection />
      </main>
    </>
  );
}
