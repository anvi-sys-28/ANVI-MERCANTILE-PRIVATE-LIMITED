import { useState, useEffect } from 'react';
import { SEO } from '@/components/global/SEO';
import { tradeRoutesData } from '@/data/tradeRoutesData';
import { productsData } from '@/data/productsData';
import { api, type CatalogProduct } from '@/lib/api';
import {
  Search,
  MapPin,
  FileText,
  ArrowRight,
  ShieldCheck,
  Scale,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

export default function TradePage() {
  const [routeCategory, setRouteCategory] = useState<string>('ALL');
  const [productCategory, setProductCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIncoterm, setSelectedIncoterm] = useState<string>('ALL');

  // Live database backed products with graceful fallback
  const [dbProducts, setDbProducts] = useState<CatalogProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

  // Comparison State
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);
  const [comparedProducts, setComparedProducts] = useState<CatalogProduct[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoadingProducts(true);
        const res = await api.getCatalog({
          search: searchQuery || undefined,
          incoterm: selectedIncoterm !== 'ALL' ? selectedIncoterm : undefined,
        });
        if (res.data && res.data.length > 0) {
          setDbProducts(res.data);
        } else {
          // If empty in DB yet, fallback to local data
          setDbProducts(
            productsData.map((p) => ({
              id: p.id,
              name: p.name,
              slug: p.id,
              description: p.description,
              originCountry: 'India',
              harvestMonths: ['ALL_YEAR'],
              packaging: p.handlingSpecs,
              minOrderMt: 10,
              pricePerMtUsd: 1450,
              incoterms: ['FOB', 'CIF', 'CFR'],
              certifications: ['APEDA', 'FSSAI'],
              status: 'ACTIVE',
              images: [{ fileKey: p.image, sortOrder: 0 }],
              category: { id: p.id, name: p.category, slug: p.category.toLowerCase().replace(/ /g, '-') },
              exporterCompany: {
                id: 'comp-anvi',
                legalName: 'ANVI MERCANTILE PRIVATE LIMITED',
                country: 'India',
                verificationStatus: 'VERIFIED',
              },
            }))
          );
        }
      } catch {
        // Fallback for offline / cold development
        setDbProducts(
          productsData.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.id,
            description: p.description,
            originCountry: 'India',
            harvestMonths: ['ALL_YEAR'],
            packaging: p.handlingSpecs,
            minOrderMt: 10,
            pricePerMtUsd: 1450,
            incoterms: ['FOB', 'CIF', 'CFR'],
            certifications: ['APEDA', 'FSSAI'],
            status: 'ACTIVE',
            images: [{ fileKey: p.image, sortOrder: 0 }],
            category: { id: p.id, name: p.category, slug: p.category.toLowerCase().replace(/ /g, '-') },
            exporterCompany: {
              id: 'comp-anvi',
              legalName: 'ANVI MERCANTILE PRIVATE LIMITED',
              country: 'India',
              verificationStatus: 'VERIFIED',
            },
          }))
        );
      } finally {
        setLoadingProducts(false);
      }
    }

    const timer = setTimeout(fetchProducts, 200);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedIncoterm]);

  const filteredRoutes = tradeRoutesData.filter((route) => {
    const matchesCategory = routeCategory === 'ALL' || route.category === routeCategory;
    const matchesSearch =
      route.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.topProducts.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredProducts = dbProducts.filter((product) => {
    const matchesCategory =
      productCategory === 'ALL' ||
      (product.category?.name && product.category.name.toLowerCase().includes(productCategory.toLowerCase()));
    return matchesCategory;
  });

  const toggleCompare = (idOrSlug: string) => {
    setCompareList((prev) => {
      if (prev.includes(idOrSlug)) {
        return prev.filter((item) => item !== idOrSlug);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 commodities at a time.');
        return prev;
      }
      return [...prev, idOrSlug];
    });
  };

  const openComparisonModal = () => {
    const matched = dbProducts.filter((p) => compareList.includes(p.id) || compareList.includes(p.slug));
    setComparedProducts(matched);
    setShowCompareModal(true);
  };

  return (
    <>
      <SEO
        title="Global Trade Routes & Product Catalog | Bulk Agro Export"
        description="Live commodity export catalog with MOQ 10 MT, bulk pricing in USD, transit lead times, APEDA standards, and verified Indian exporters."
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
                placeholder="Search route (e.g. UAE, Europe), commodity, or variety..."
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

      {/* Section 2: Product Catalog Grid with B2B Bulk Marketplace Gating */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#0b3a40]/10">
            <div>
              <span className="text-[#c9a46b] text-xs font-bold font-headline uppercase tracking-widest block">
                EXPORT COMMODITY INVENTORY
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-headline uppercase text-[#0b3a40]">
                BULK PRODUCE & COMMODITY CATALOG
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Verified Indian exporters • Minimum order quantity 10 MT • Cold chain reefer transit
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {['ALL', 'Fruits', 'Commodities', 'Spices', 'Superfoods'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProductCategory(cat)}
                    className={`px-3 py-1 rounded text-xs font-bold uppercase transition-all ${
                      productCategory === cat
                        ? 'bg-[#0b3a40] text-[#c9a46b] shadow'
                        : 'bg-[#f7f5f0] text-[#0b3a40] hover:bg-[#eae3de]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-1.5 border-t sm:border-t-0 sm:border-l border-[#0b3a40]/10 pt-2 sm:pt-0 sm:pl-3">
                <span className="text-[11px] font-bold uppercase text-gray-500 mr-1">Terms:</span>
                {['ALL', 'FOB', 'CIF', 'CFR'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSelectedIncoterm(term)}
                    className={`px-2.5 py-1 rounded text-xs font-bold uppercase transition-all ${
                      selectedIncoterm === term
                        ? 'bg-[#c9a46b] text-[#0b3a40] shadow'
                        : 'bg-[#f7f5f0] text-[#0b3a40] hover:bg-[#eae3de]'
                    }`}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loadingProducts ? (
            <div className="py-12 flex justify-center">
              <div className="w-8 h-8 border-2 border-[#0b3a40] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((prod) => {
                const imgUrl = prod.images?.[0]?.fileKey || '/images/pomegranate.webp';
                const isCompared = compareList.includes(prod.id) || compareList.includes(prod.slug);

                return (
                  <div
                    key={prod.id}
                    className="bg-[#f7f5f0] rounded-xl overflow-hidden border border-[#0b3a40]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image header */}
                      <div className="relative h-48 bg-slate-900">
                        <img
                          src={imgUrl}
                          alt={prod.name}
                          width="600"
                          height="400"
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="bg-[#0b3a40] text-[#c9a46b] text-[10px] font-bold font-headline uppercase px-2.5 py-1 rounded shadow">
                            MOQ: {prod.minOrderMt} MT
                          </span>
                        </div>

                        {/* Compare toggle button */}
                        <button
                          type="button"
                          onClick={() => toggleCompare(prod.slug || prod.id)}
                          className={`absolute top-3 right-3 text-[10px] font-bold font-headline uppercase px-2.5 py-1 rounded shadow flex items-center gap-1 transition-colors ${
                            isCompared
                              ? 'bg-[#c9a46b] text-[#0b3a40]'
                              : 'bg-black/60 text-white hover:bg-black/80'
                          }`}
                        >
                          <Scale className="w-3 h-3" />
                          <span>{isCompared ? 'Compared' : 'Compare'}</span>
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold font-headline uppercase text-[#0f5c66]">
                            {prod.category?.name || 'Agri Commodity'}
                          </span>
                          {prod.exporterCompany?.verificationStatus === 'VERIFIED' && (
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              Verified Exporter
                            </span>
                          )}
                        </div>

                        <Link to={`/products/${prod.slug}`}>
                          <h3 className="text-lg font-bold font-headline uppercase text-[#0b3a40] hover:text-[#0f5c66] transition-colors">
                            {prod.name}
                          </h3>
                        </Link>

                        <p className="text-xs text-[#1a1f23]/80 leading-relaxed line-clamp-2">
                          {prod.description}
                        </p>

                        {/* Price & Incoterms */}
                        <div className="pt-3 border-t border-[#0b3a40]/10 flex items-center justify-between">
                          <div>
                            <span className="text-lg font-extrabold text-[#0b3a40]">
                              ${prod.pricePerMtUsd.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-gray-500 block uppercase font-medium">
                              Per Metric Ton (USD)
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-[#0f5c66] block">
                              {prod.incoterms.join(' / ')}
                            </span>
                            <span className="text-[10px] text-gray-500 block">
                              Incoterms
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-6 pt-0 space-y-2">
                      <Link
                        to={`/products/${prod.slug}`}
                        className="w-full inline-flex items-center justify-center gap-1 bg-[#0b3a40] hover:bg-[#0f5c66] text-white text-xs font-bold font-headline uppercase py-2.5 rounded shadow transition-colors"
                      >
                        <span>View Specifications</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#c9a46b]" />
                      </Link>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* Sticky Compare Bottom Drawer */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0b3a40] text-white px-6 py-3.5 rounded-full shadow-2xl border border-[#c9a46b]/40 flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-headline">
            <Scale className="w-4 h-4 text-[#c9a46b]" />
            <span>Comparing {compareList.length} / 4 Products</span>
          </div>

          <button
            type="button"
            onClick={openComparisonModal}
            className="bg-[#c9a46b] hover:bg-[#b59057] text-[#0b3a40] text-xs font-bold font-headline uppercase px-4 py-1.5 rounded-full shadow transition-colors"
          >
            Open Comparison
          </button>

          <button
            type="button"
            onClick={() => setCompareList([])}
            className="text-white/60 hover:text-white p-1"
            aria-label="Clear Compare"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0d14] border border-white/10 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#c9a46b]" />
                <h3 className="text-xl font-bold font-headline uppercase">
                  Side-by-Side Commodity Comparison
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCompareModal(false)}
                className="text-white/60 hover:text-white p-1 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {comparedProducts.map((p) => (
                <div key={p.id} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-4 text-xs">
                  <div className="h-32 rounded-lg overflow-hidden bg-black">
                    <img
                      src={p.images?.[0]?.fileKey || '/images/pomegranate.webp'}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white uppercase font-headline">
                      {p.name}
                    </h4>
                    <span className="text-[#c9a46b] font-extrabold text-base block mt-1">
                      ${p.pricePerMtUsd.toLocaleString()} / MT
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10 text-[11px]">
                    <p><span className="text-slate-400">MOQ:</span> <span className="font-bold text-white">{p.minOrderMt} MT</span></p>
                    <p><span className="text-slate-400">Incoterms:</span> <span className="font-bold text-white">{p.incoterms.join(', ')}</span></p>
                    <p><span className="text-slate-400">Packaging:</span> <span className="text-white">{p.packaging || 'Reefer'}</span></p>
                    <p><span className="text-slate-400">Exporter:</span> <span className="text-emerald-400 font-semibold">{p.exporterCompany?.legalName || 'Anvi'}</span></p>
                  </div>

                  <Link
                    to={`/quote?product=${encodeURIComponent(p.name)}`}
                    className="w-full inline-block text-center bg-[#c9a46b] text-[#0b3a40] font-bold uppercase py-2 rounded font-headline"
                  >
                    Request Quote
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <FinalCtaSection />
    </>
  );
}
