import { SEO } from '@/components/global/SEO';
import { HeroSection } from '@/components/sections/HeroSection';
import { ShippingCompaniesTickerSection } from '@/components/sections/ShippingCompaniesTickerSection';
import { StickyScrollFeatureSection } from '@/components/sections/StickyScrollFeatureSection';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Fresh Fruits & Basmati Rice Exporters India | Agri Commodities"
        description="India's leading agricultural exporters. ANVI Mercantile supplies export-grade Indian Basmati rice, ruby pomegranates, seedless grapes, pink guavas, onions, green chillies & commodities directly from our farms to international markets. Minimum order quantity 10 MT with guaranteed cold-chain delivery."
        keywords="basmati rice exporters india, fresh fruits exporters, fresh fruits exporters in india, bulk fruit exporters, fresh produce exporters, pomegranate exporters india, fresh grapes exporters, guava exporters, onion exporters, agricultural commodity export, anvi mercantile"
      />
      <main className="w-full overflow-x-clip">
        <HeroSection />
        <ShippingCompaniesTickerSection />
        <StickyScrollFeatureSection />
      </main>
    </>
  );
}
