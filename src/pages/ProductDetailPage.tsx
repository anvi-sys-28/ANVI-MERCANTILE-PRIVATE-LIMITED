import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/global/SEO';
import { api, type CatalogProduct } from '@/lib/api';
import { productsData } from '@/data/productsData';
import {
  ShieldCheck,
  Package,
  Anchor,
  Clock,
  ArrowRight,
  CheckCircle,
  Truck,
  ExternalLink,
} from 'lucide-react';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<CatalogProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadProduct() {
      try {
        if (!slug) return;
        const res = await api.getProductBySlug(slug);
        setProduct(res.data);
      } catch {
        // Fallback to local hardcoded productsData if offline/dev
        const fallback = productsData.find((p) => p.id === slug || p.name.toLowerCase().includes(slug?.toLowerCase() || ''));
        if (fallback) {
          setProduct({
            id: fallback.id,
            name: fallback.name,
            slug: fallback.id,
            description: fallback.description,
            pricePerMtUsd: 1850,
            minOrderMt: 10,
            originCountry: 'India',
            originState: 'Maharashtra',
            harvestMonths: ['OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR'],
            packaging: fallback.handlingSpecs,
            incoterms: ['FOB', 'CIF', 'CFR'],
            portOfLoading: 'JNPT Mumbai',
            leadTimeDays: 5,
            certifications: ['APEDA', 'FSSAI', 'GlobalGAP'],
            status: 'ACTIVE',
            images: [{ fileKey: fallback.image, sortOrder: 0 }],
            exporterCompany: {
              id: 'comp-anvi',
              legalName: 'ANVI MERCANTILE PRIVATE LIMITED',
              tradeName: 'Anvi Mercantile',
              country: 'India',
              state: 'Maharashtra',
              verificationStatus: 'VERIFIED',
            },
          });
        }
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05080e] pt-36 pb-20 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#05080e] pt-36 pb-20 text-center text-white space-y-4">
        <h2 className="text-3xl font-headline font-bold">Product Listing Not Found</h2>
        <p className="text-white/70">The commodity you are looking for is currently unavailable or inactive.</p>
        <Link to="/trade" className="inline-block bg-[#0f5c66] text-[#c9a46b] px-6 py-2.5 rounded font-bold">
          Return to Trade Catalog
        </Link>
      </div>
    );
  }

  const primaryImage = product.images?.[0]?.fileKey || '/images/pomegranate.webp';

  return (
    <>
      <SEO
        title={`${product.name} | Bulk Export from India (MOQ ${product.minOrderMt} MT)`}
        description={`Import ${product.name} directly from verified Indian agricultural exporters. Starting at $${product.pricePerMtUsd}/MT with Incoterms ${product.incoterms.join('/')}.`}
      />

      <div className="bg-[#05080e] text-white pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-white/60">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link to="/trade" className="hover:text-white">Trade Catalog</Link>
            <span>/</span>
            <span className="text-[#c9a46b]">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left: Commodity Media Preview */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0d14] h-96 sm:h-[480px]">
                <img
                  src={primaryImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-[#0b3a40]/90 backdrop-blur-md text-[#c9a46b] text-xs font-bold font-headline uppercase px-3 py-1.5 rounded border border-[#c9a46b]/30">
                    MOQ: {product.minOrderMt} Metric Tons
                  </span>
                  {product.variety && (
                    <span className="bg-black/70 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded border border-white/10">
                      {product.variety}
                    </span>
                  )}
                </div>
              </div>

              {/* Certifications Bar */}
              <div className="bg-[#0a0d14] p-4 rounded-xl border border-white/10 flex flex-wrap items-center gap-3">
                <span className="text-xs uppercase font-bold text-[#c9a46b] font-headline">Certifications:</span>
                {product.certifications.map((cert, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10"
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Commercial Specs & Bulk Quote Action */}
            <div className="space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0f5c66] bg-[#0f5c66]/20 px-2.5 py-1 rounded border border-[#0f5c66]/40">
                    {product.category?.name || 'Fresh Produce'}
                  </span>
                  {product.exporterCompany?.verificationStatus === 'VERIFIED' && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Exporter
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold font-headline uppercase text-white leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Pricing Box */}
              <div className="bg-[#0b3a40]/40 border border-[#0b3a40] p-6 rounded-2xl space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold font-headline text-[#c9a46b]">
                    ${product.pricePerMtUsd.toLocaleString()}
                  </span>
                  <span className="text-sm text-white/70 font-sans">
                    / Metric Ton (USD)
                  </span>
                </div>
                <p className="text-xs text-white/60">
                  Bulk trade benchmark pricing. Final CIF/CFR rate calculated upon port destination inquiry.
                </p>
              </div>

              {/* Export Specifications Matrix */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-[#0a0d14] p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Anchor className="w-3.5 h-3.5 text-[#c9a46b]" />
                    Incoterms Available
                  </span>
                  <p className="font-bold text-white text-sm">
                    {product.incoterms.join(' • ')}
                  </p>
                </div>

                <div className="bg-[#0a0d14] p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#c9a46b]" />
                    Port of Loading
                  </span>
                  <p className="font-bold text-white text-sm">
                    {product.portOfLoading || 'JNPT Mumbai'}
                  </p>
                </div>

                <div className="bg-[#0a0d14] p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Package className="w-3.5 h-3.5 text-[#c9a46b]" />
                    Packaging Protocol
                  </span>
                  <p className="font-bold text-white text-sm">
                    {product.packaging || 'Reefer Ventilated CFB'}
                  </p>
                </div>

                <div className="bg-[#0a0d14] p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#c9a46b]" />
                    Lead Time to Port
                  </span>
                  <p className="font-bold text-white text-sm">
                    {product.leadTimeDays ? `${product.leadTimeDays} Days` : '3-7 Days'}
                  </p>
                </div>
              </div>

              {/* Exporter Info Card */}
              {product.exporterCompany && (
                <div className="bg-[#0a0d14] p-5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#c9a46b] font-headline block">
                      SUPPLIED BY
                    </span>
                    <h4 className="font-bold text-white text-sm">
                      {product.exporterCompany.legalName}
                    </h4>
                    <span className="text-xs text-slate-400">
                      {product.exporterCompany.state}, {product.exporterCompany.country}
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold inline-flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    APEDA Verified
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/quote?product=${encodeURIComponent(product.name)}&moq=${product.minOrderMt}`}
                  className="flex-1 bg-[#c9a46b] hover:bg-[#b59057] text-[#0b3a40] text-sm font-bold font-headline uppercase py-4 rounded-xl shadow-lg inline-flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Request Export Quote (RFQ)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/918328246413?text=${encodeURIComponent(`Hi Anvi Mercantile, I would like to inquire about importing bulk ${product.name} (MOQ ${product.minOrderMt} MT).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0b3a40] hover:bg-[#0f5c66] text-white text-sm font-bold font-headline uppercase px-6 py-4 rounded-xl border border-white/10 inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="w-4 h-4 text-[#c9a46b]" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>

      <FinalCtaSection />
    </>
  );
}
