import { useState } from 'react';
import { SEO } from '@/components/global/SEO';
import { tradeRoutesData } from '@/data/tradeRoutesData';
import { productsData } from '@/data/productsData';
import { Search, MapPin, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

export default function TradePage() {
  const [routeCategory, setRouteCategory] = useState<string>('ALL');
  const [productCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRoutes = tradeRoutesData.filter((route) => {
    const matchesCategory = routeCategory === 'ALL' || route.category === routeCategory;
    const matchesSearch =
      route.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.topProducts.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = productCategory === 'ALL' || product.category === productCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.hsCodeRange.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Global Trade Routes & Product Catalog"
        description="Comprehensive trade corridor lead times, customs documentation requirements, and product categories for international shipping."
      />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#0b3a40] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#0f5c66_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[#c9a46b] text-xs font-bold font-headline uppercase tracking-widest block">
            INTERNATIONAL CORRIDORS & COMMODITIES
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-headline uppercase tracking-tight text-white leading-none">
            TRADE ROUTES & PRODUCTS
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl font-sans">
            Inspect lead times, key sea/air ports, required customs documents, and handling specifications for primary trade lanes connecting India with global markets.
          </p>

          <div className="pt-4 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search route (e.g. UAE, China), product, or HS code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0f5c66] text-white placeholder-white/60 text-xs sm:text-sm px-4 py-3.5 pl-11 rounded-lg border border-white/20 focus:outline-none focus:border-[#c9a46b]"
              />
              <Search className="w-5 h-5 text-[#c9a46b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Trade Corridors Matrix */}
      <section className="py-20 bg-[#f7f5f0] border-b border-[#0b3a40]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[#c9a46b] text-xs font-bold font-headline uppercase tracking-widest block">
                MARITIME & AIR LANES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-headline uppercase text-[#0b3a40]">
                KEY TRADE ROUTES & TRANSIT LEAD TIMES
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { label: 'ALL ROUTES', val: 'ALL' },
                { label: 'ASIA - MIDDLE EAST', val: 'Asia-MiddleEast' },
                { label: 'INTRA-ASIA', val: 'IntraAsia' },
                { label: 'ASIA - NORTH AMERICA', val: 'Asia-NorthAmerica' },
                { label: 'ASIA - EUROPE', val: 'Asia-Europe' },
              ].map((btn) => (
                <button
                  key={btn.val}
                  onClick={() => setRouteCategory(btn.val)}
                  className={`px-3 py-1.5 rounded text-xs font-bold font-headline uppercase tracking-wider transition-all ${
                    routeCategory === btn.val
                      ? 'bg-[#0b3a40] text-[#c9a46b] shadow'
                      : 'bg-white text-[#0b3a40] border border-[#0b3a40]/10 hover:border-[#c9a46b]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-white rounded-xl p-6 border border-[#0b3a40]/10 shadow-sm hover:shadow-lg transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#0b3a40]/10">
                    <div className="flex items-center gap-2 text-[#0b3a40]">
                      <MapPin className="w-5 h-5 text-[#c9a46b] shrink-0" />
                      <h3 className="font-extrabold font-headline text-lg uppercase">
                        {route.origin} ➔ {route.destination}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold font-headline uppercase bg-[#f7f5f0] text-[#0f5c66] px-2.5 py-1 rounded border border-[#0f5c66]/20">
                      {route.frequency}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-[#f7f5f0] p-3 rounded-lg text-xs">
                    <div>
                      <span className="text-gray-500 text-[10px] uppercase block font-semibold">Sea Freight Lead Time</span>
                      <span className="font-bold text-[#0b3a40]">{route.seaTransitDays}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[10px] uppercase block font-semibold">Air Cargo Express</span>
                      <span className="font-bold text-[#0f5c66]">{route.airTransitDays}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold font-headline uppercase text-[#c9a46b]">
                      Key Ports Served
                    </span>
                    <p className="text-xs text-[#1a1f23]/80">
                      {route.keyPorts.join(' • ')}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold font-headline uppercase text-[#c9a46b]">
                      Top Commodities Shipped
                    </span>
                    <p className="text-xs text-[#1a1f23]/80">
                      {route.topProducts.join(', ')}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold font-headline uppercase text-[#0b3a40] flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-[#c9a46b]" />
                      Compulsory Customs Documents
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {route.requiredDocs.map((doc, dIdx) => (
                        <span
                          key={dIdx}
                          className="bg-[#0b3a40]/5 text-[#0b3a40] text-[10px] font-medium px-2 py-0.5 rounded border border-[#0b3a40]/10"
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#0b3a40]/10">
                  <Link
                    to={`/quote?origin=${encodeURIComponent(route.origin)}&destination=${encodeURIComponent(route.destination)}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0b3a40] hover:bg-[#0f5c66] text-white text-xs font-bold font-headline uppercase py-2.5 rounded shadow transition-colors"
                  >
                    <span>Request Rate for this Route</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#c9a46b]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Section 2: Product Catalog Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div>
            <span className="text-[#c9a46b] text-xs font-bold font-headline uppercase tracking-widest block">
              CARGO SPECIFICATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-headline uppercase text-[#0b3a40]">
              COMMODITY HANDLING CATALOG
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#f7f5f0] rounded-xl overflow-hidden border border-[#0b3a40]/10 shadow-sm space-y-4"
              >
                <div className="relative h-48">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    width="600"
                    height="400"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#0b3a40] text-[#c9a46b] text-[10px] font-bold font-headline uppercase px-2.5 py-1 rounded shadow">
                    HS Code: {prod.hsCodeRange}
                  </span>
                </div>

                <div className="p-6 space-y-3 pt-0">
                  <span className="text-xs font-bold font-headline uppercase text-[#0f5c66]">
                    {prod.category}
                  </span>
                  <h3 className="text-lg font-bold font-headline uppercase text-[#0b3a40]">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#1a1f23]/80 leading-relaxed">
                    {prod.description}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-[#0b3a40]/10 text-xs">
                    <p>
                      <span className="font-bold text-[#0b3a40]">Primary Trade Buyers:</span>{' '}
                      {prod.topDestinations.join(', ')}
                    </p>
                    <p className="text-[11px] text-[#1a1f23]/70">
                      <span className="font-bold text-[#c9a46b]">Handling Protocol:</span>{' '}
                      {prod.handlingSpecs}
                    </p>
                  </div>

                  <Link
                    to={`/quote?product=${encodeURIComponent(prod.name)}`}
                    className="w-full inline-flex items-center justify-center gap-1 bg-[#c9a46b] hover:bg-[#b59057] text-[#0b3a40] text-xs font-bold font-headline uppercase py-2.5 rounded shadow mt-2 transition-colors"
                  >
                    <span>Inquire Cargo Freight</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}
