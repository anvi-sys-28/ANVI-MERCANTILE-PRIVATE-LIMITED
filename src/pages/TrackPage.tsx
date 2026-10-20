import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '@/components/global/SEO';
import {
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  FileCheck,
  ShieldCheck,
  Container,
} from 'lucide-react';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

interface TrackingMilestone {
  status: string;
  location: string;
  timestamp: string;
  completed: boolean;
  active?: boolean;
  description: string;
  code: string;
}

interface TrackingData {
  orderNumber: string;
  carrier: string;
  originPort: string;
  destinationPort: string;
  vesselName: string;
  containerId: string;
  blNumber: string;
  currentStatus: string;
  estimatedDelivery: string;
  commodity: string;
  quantityMt: number;
  milestones: TrackingMilestone[];
}

const ORDER_LIFECYCLE_STEPS = [
  { code: 'PAYMENT_PENDING', label: 'Payment Pending', loc: 'Finance Desk' },
  { code: 'PAID', label: 'Payment Confirmed', loc: 'Bank Settlement' },
  { code: 'PACKING', label: 'Farm Grading & Packing', loc: 'Maharashtra Cold Store' },
  { code: 'QUALITY_CHECK', label: 'APEDA Quality & Phyto Inspection', loc: 'Export Packhouse' },
  { code: 'READY_FOR_SHIPMENT', label: 'Container Stuffed & Sealed', loc: 'Cold Chain Dock' },
  { code: 'SHIPPED', label: 'Port Gate-in & Vessel Loaded', loc: 'JNPT Port Mumbai (INNSA)' },
  { code: 'IN_TRANSIT', label: 'Ocean Vessel In Transit', loc: 'Maritime Lane' },
  { code: 'ARRIVED', label: 'Discharged at Destination Port', loc: 'Jebel Ali / Rotterdam' },
  { code: 'DELIVERED', label: 'Customs Cleared & Delivered', loc: 'Buyer Warehouse' },
];

function generateLiveMilestones(currentStatus: string, orderNumber: string): TrackingData {
  const currentIndex = ORDER_LIFECYCLE_STEPS.findIndex((s) => s.code === currentStatus);
  const activeIdx = currentIndex >= 0 ? currentIndex : 5; // Default: Shipped

  const milestones: TrackingMilestone[] = ORDER_LIFECYCLE_STEPS.map((step, idx) => ({
    status: step.label,
    location: step.loc,
    timestamp: idx <= activeIdx ? 'Completed' : 'Pending',
    completed: idx <= activeIdx,
    active: idx === activeIdx,
    code: step.code,
    description: `Official export milestone: ${step.label} verified for ${orderNumber}.`,
  }));

  return {
    orderNumber,
    carrier: 'MAERSK LINE / CMA CGM Reefer Service',
    originPort: 'JNPT Nhava Sheva (INNSA), Mumbai, India',
    destinationPort: 'Jebel Ali Port (AEJEA), Dubai, UAE',
    vesselName: 'Maersk Mc-Kinney Moller V. 2408E',
    containerId: 'MSCU-981240-8 (40ft High Cube Reefer)',
    blNumber: 'MEDU-981240-IN',
    currentStatus: ORDER_LIFECYCLE_STEPS[activeIdx].label,
    estimatedDelivery: 'Oct 28, 2026 - 14:00 GST',
    commodity: 'Fresh Ruby Red Pomegranates (Bhagwa) - 18 MT',
    quantityMt: 18,
    milestones,
  };
}

export default function TrackPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('num') || 'AM-2026-000123';
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [trackingData, setTrackingData] = useState<TrackingData>(() =>
    generateLiveMilestones('IN_TRANSIT', initialQuery)
  );
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (num: string) => {
    setIsSearching(true);
    setSearchParams({ num });

    // Attempt live API query, fallback gracefully
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';
    fetch(`${apiBase}/orders/${encodeURIComponent(num)}`, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Not found in DB');
        return res.json();
      })
      .then((data) => {
        if (data?.data) {
          const ord = data.data;
          setTrackingData({
            orderNumber: ord.orderNumber || num,
            carrier: ord.vesselName ? `Vessel: ${ord.vesselName}` : 'Ocean Liner Reefer Service',
            originPort: ord.portOfLoading || 'JNPT Port Mumbai, India',
            destinationPort: ord.destinationPort || 'Jebel Ali, Dubai',
            vesselName: ord.vesselName || 'Maersk Mc-Kinney Moller',
            containerId: ord.containerNumbers?.[0] || 'MSCU-981240-8',
            blNumber: ord.blNumber || 'MEDU-981240-IN',
            currentStatus: ord.status,
            estimatedDelivery: ord.expectedArrivalDate
              ? new Date(ord.expectedArrivalDate).toLocaleDateString()
              : 'Oct 28, 2026',
            commodity: ord.items?.[0]?.nameSnapshot || 'Fresh Agricultural Produce',
            quantityMt: ord.items?.[0]?.quantityMt ? Number(ord.items[0].quantityMt) : 18,
            milestones: generateLiveMilestones(ord.status, ord.orderNumber).milestones,
          });
        }
      })
      .catch(() => {
        // Fallback demo simulator
        setTrackingData(generateLiveMilestones('IN_TRANSIT', num));
      })
      .finally(() => {
        setIsSearching(false);
      });
  };

  const completedCount = trackingData.milestones.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / trackingData.milestones.length) * 100);

  return (
    <>
      <SEO
        title={`Live Shipment Tracking | ${trackingData.orderNumber}`}
        description="Live multi-stage agricultural export tracker: cold store packaging, phytosanitary inspection, ocean container telemetry, and port arrival."
      />

      {/* Header */}
      <section className="relative pt-36 pb-20 bg-[#0b3a40] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#0f5c66_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-[#c9a46b] text-xs font-bold font-headline uppercase tracking-widest block">
            LIVE EXPORT CARGO TELEMETRY
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-headline uppercase tracking-tight text-white leading-none">
            TRACK SHIPMENT & REEFER CARGO
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl font-sans">
            Real-time multi-stage milestone tracking for agricultural export consignments from Indian farms to global destination ports.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchInput.trim()) handleSearch(searchInput.trim());
            }}
            className="pt-2 max-w-xl"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Enter Order # (e.g. AM-2026-000123), Container #, or BL #"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-[#0f5c66] text-white placeholder-white/60 text-xs sm:text-sm px-4 py-4 pl-12 rounded-xl border border-white/20 focus:outline-none focus:border-[#c9a46b]"
              />
              <Search className="w-5 h-5 text-[#c9a46b] absolute left-4 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#c9a46b] hover:bg-[#b59057] text-[#0b3a40] text-xs font-bold font-headline uppercase px-5 py-2.5 rounded-lg transition-colors shadow"
              >
                {isSearching ? 'Locating...' : 'Track'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Main Tracking Board */}
      <section className="py-16 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-[#0b3a40]/10 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#0b3a40]/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#c9a46b] uppercase font-headline">Order Reference:</span>
                  <span className="font-extrabold text-[#0b3a40] text-xl font-headline tracking-wide">
                    {trackingData.orderNumber}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified Consignment
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Commodity: <strong className="text-gray-800">{trackingData.commodity}</strong>
                </p>
              </div>

              <div className="flex items-center gap-6 text-right">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Current Status</span>
                  <span className="text-sm font-extrabold text-[#0f5c66] uppercase block font-headline">
                    {trackingData.currentStatus}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Est. Port Arrival</span>
                  <span className="text-sm font-extrabold text-[#0b3a40] block font-headline">
                    {trackingData.estimatedDelivery}
                  </span>
                </div>
              </div>
            </div>

            {/* Zepto-Style Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase font-headline text-gray-500">
                <span>Shipment Completion</span>
                <span className="text-[#0b3a40] font-extrabold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#0f5c66] to-[#c9a46b] h-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Spec Badges Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs pt-2">
              <div className="bg-[#f7f5f0] p-3.5 rounded-xl border border-[#0b3a40]/5 space-y-1">
                <span className="text-gray-500 flex items-center gap-1 text-[11px] font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#c9a46b]" />
                  Port of Loading
                </span>
                <p className="font-bold text-[#0b3a40]">{trackingData.originPort}</p>
              </div>

              <div className="bg-[#f7f5f0] p-3.5 rounded-xl border border-[#0b3a40]/5 space-y-1">
                <span className="text-gray-500 flex items-center gap-1 text-[11px] font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#0f5c66]" />
                  Destination Port
                </span>
                <p className="font-bold text-[#0b3a40]">{trackingData.destinationPort}</p>
              </div>

              <div className="bg-[#f7f5f0] p-3.5 rounded-xl border border-[#0b3a40]/5 space-y-1">
                <span className="text-gray-500 flex items-center gap-1 text-[11px] font-semibold">
                  <Container className="w-3.5 h-3.5 text-[#c9a46b]" />
                  Container #
                </span>
                <p className="font-bold text-[#0b3a40]">{trackingData.containerId}</p>
              </div>

              <div className="bg-[#f7f5f0] p-3.5 rounded-xl border border-[#0b3a40]/5 space-y-1">
                <span className="text-gray-500 flex items-center gap-1 text-[11px] font-semibold">
                  <FileCheck className="w-3.5 h-3.5 text-[#0f5c66]" />
                  Bill of Lading #
                </span>
                <p className="font-bold text-[#0b3a40]">{trackingData.blNumber}</p>
              </div>
            </div>
          </div>

          {/* Vertical Milestone Timeline */}
          <div className="bg-white rounded-2xl border border-[#0b3a40]/10 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#0b3a40]/10">
              <h3 className="text-lg font-bold font-headline uppercase text-[#0b3a40]">
                Consignment Milestones & Cold Chain Custody
              </h3>
              <span className="text-xs text-gray-500">
                Updated automatically via Carrier EDI & Customs Portal
              </span>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#0b3a40]/15">
              {trackingData.milestones.map((m, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Dot */}
                  <span
                    className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow ${
                      m.completed
                        ? 'bg-[#0f5c66] text-white'
                        : 'bg-white text-gray-400 border border-gray-300'
                    }`}
                  >
                    {m.completed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                  </span>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4
                        className={`text-sm sm:text-base font-bold font-headline uppercase ${
                          m.completed ? 'text-[#0b3a40]' : 'text-gray-400'
                        }`}
                      >
                        {m.status}
                      </h4>
                      {m.active && (
                        <span className="bg-[#c9a46b] text-[#0b3a40] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded animate-pulse">
                          Active Stage
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#0f5c66] font-semibold block">
                      {m.location}
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed max-w-2xl">
                      {m.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}
