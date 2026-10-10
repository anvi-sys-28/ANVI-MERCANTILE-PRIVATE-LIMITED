import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '@/components/global/SEO';
import { Search, Ship, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

interface TrackingStatus {
  trackingNumber: string;
  carrier: string;
  originPort: string;
  destinationPort: string;
  vesselName: string;
  containerId: string;
  currentStatus: 'BOOKED' | 'IN_TRANSIT' | 'CUSTOMS' | 'DELIVERED';
  estimatedDelivery: string;
  milestones: {
    status: string;
    location: string;
    timestamp: string;
    completed: boolean;
    active?: boolean;
    description: string;
  }[];
}

function mockTrackingQuery(queryNum: string): TrackingStatus {
  const cleanNum = queryNum.trim().toUpperCase();

  return {
    trackingNumber: cleanNum || 'ANVI-892104-IN',
    carrier: 'MAERSK LINE (Vessel: MAERSK MC-KINNEY MOLLER)',
    originPort: 'JNPT Nhava Sheva (INNSA), India',
    destinationPort: 'Jebel Ali Port (AEJEA), Dubai, UAE',
    vesselName: 'Maersk Mc-Kinney Moller V. 2408E',
    containerId: 'MSCU-981240-8 / 40ft High Cube Reefer',
    currentStatus: 'IN_TRANSIT',
    estimatedDelivery: 'Oct 08, 2026 - 14:00 GST',
    milestones: [
      {
        status: 'Shipment Booking Confirmed',
        location: 'Mumbai HQ, India',
        timestamp: 'Oct 02, 2026 - 09:30 IST',
        completed: true,
        description: 'Export booking confirmed with carrier line. Booking reference #BKG-981204.'
      },
      {
        status: 'Gate-in & Port Drayage Completed',
        location: 'JNPT Container Terminal 2, Mumbai',
        timestamp: 'Oct 03, 2026 - 16:45 IST',
        completed: true,
        description: 'Container sealed and accepted at port gate. Custom EDI Shipping Bill filed.'
      },
      {
        status: 'Export Customs Out-of-Charge (OOC)',
        location: 'Customs House Nhava Sheva',
        timestamp: 'Oct 04, 2026 - 11:20 IST',
        completed: true,
        description: 'Physical inspection completed. Out-of-Charge order issued by customs.'
      },
      {
        status: 'Vessel Departure & Ocean Voyage',
        location: 'Arabian Sea Corridor (Lat: 19.01, Long: 68.45)',
        timestamp: 'Oct 04, 2026 - 20:00 IST',
        completed: true,
        active: true,
        description: 'Vessel departed JNPT berth. En route to Jebel Ali Port. Average speed 18.4 knots.'
      },
      {
        status: 'Arrival at Destination Port & Customs Entry',
        location: 'Jebel Ali Terminal 3, Dubai',
        timestamp: 'Estimated: Oct 07, 2026',
        completed: false,
        description: 'Pre-lodgement of Dubai Customs entry under CEPA notification code.'
      },
      {
        status: 'Final Doorstep Delivery',
        location: 'Dubai Industrial City Warehouse, UAE',
        timestamp: 'Estimated: Oct 08, 2026',
        completed: false,
        description: 'Final mile truck dispatch with signed Proof of Delivery (POD).'
      }
    ]
  };
}

export default function TrackPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('num') || '';
  
  const [trackingInput, setTrackingInput] = useState(initialQuery);
  const [result, setResult] = useState<TrackingStatus | null>(
    initialQuery ? mockTrackingQuery(initialQuery) : null
  );

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      setResult(mockTrackingQuery(trackingInput));
    }
  };

  return (
    <>
      <SEO
        title="Real-Time Container & Air Cargo Shipment Tracking"
        description="Track your container B/L or airway bill number for live status updates, port milestones, and estimated delivery times."
      />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#0b3a40] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#0f5c66_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-[#c9a46b] text-xs font-bold font-headline uppercase tracking-widest block">
            LIVE CARGO VISIBILITY
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-headline uppercase tracking-tight text-white leading-none">
            TRACK SHIPMENT
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl font-sans">
            Enter your Bill of Lading (B/L), Airway Bill (AWB), or Booking reference number below for real-time vessel status and customs clearance alerts.
          </p>

          <form onSubmit={handleTrackSubmit} className="pt-4 max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  required
                  placeholder="Enter B/L number or Container ID (e.g. ANVI-892104-IN)..."
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  className="w-full bg-[#0f5c66] text-white placeholder-white/60 text-xs sm:text-sm px-4 py-3.5 pl-11 rounded-lg border border-white/20 focus:outline-none focus:border-[#c9a46b]"
                />
                <Search className="w-5 h-5 text-[#c9a46b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="bg-[#c9a46b] hover:bg-[#b59057] text-[#0b3a40] font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg shadow-lg shrink-0 transition-all"
              >
                Track Now
              </button>
            </div>
            <p className="text-[11px] text-white/60 pt-2">
              Try sample numbers: <button type="button" onClick={() => { setTrackingInput('ANVI-892104-IN'); setResult(mockTrackingQuery('ANVI-892104-IN')); }} className="underline text-[#c9a46b]">ANVI-892104-IN</button> or <button type="button" onClick={() => { setTrackingInput('MSCU-981240-8'); setResult(mockTrackingQuery('MSCU-981240-8')); }} className="underline text-[#c9a46b]">MSCU-981240-8</button>
            </p>
          </form>
        </div>
      </section>

      {/* Tracking Result View */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {result ? (
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#0b3a40]/10 shadow-xl space-y-10">
              
              <div className="bg-[#0b3a40] text-white p-6 rounded-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] text-[#c9a46b] font-headline font-bold uppercase tracking-widest block">
                      SHIPMENT REFERENCE
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold font-headline uppercase text-white">
                      {result.trackingNumber}
                    </h2>
                  </div>
                  <span className="bg-[#0f5c66] text-[#c9a46b] text-xs font-bold font-headline uppercase px-3 py-1.5 rounded border border-[#c9a46b]/40 self-start sm:self-center">
                    STATUS: {result.currentStatus.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-white/60 block text-[10px] uppercase font-semibold">Origin Port</span>
                    <span className="font-bold text-white">{result.originPort}</span>
                  </div>
                  <div>
                    <span className="text-white/60 block text-[10px] uppercase font-semibold">Destination Port</span>
                    <span className="font-bold text-white">{result.destinationPort}</span>
                  </div>
                  <div>
                    <span className="text-white/60 block text-[10px] uppercase font-semibold">Est. Final Delivery</span>
                    <span className="font-bold text-[#c9a46b]">{result.estimatedDelivery}</span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-white/70 flex flex-wrap items-center gap-4 border-t border-white/10">
                  <span>Vessel: <strong>{result.vesselName}</strong></span>
                  <span>Container: <strong>{result.containerId}</strong></span>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold font-headline uppercase text-[#0b3a40]">
                  LIVE SHIPMENT MILESTONE PROGRESS
                </h3>

                <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#0b3a40]/20">
                  {result.milestones.map((m, idx) => (
                    <div key={idx} className="relative flex items-start gap-4 group">
                      <div
                        className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          m.completed
                            ? m.active
                              ? 'bg-[#c9a46b] text-[#0b3a40] ring-4 ring-[#c9a46b]/30 animate-pulse'
                              : 'bg-[#0b3a40] text-[#c9a46b]'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {m.completed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                      </div>

                      <div className={`p-4 rounded-lg border w-full space-y-1 ${
                        m.active
                          ? 'bg-[#f7f5f0] border-[#c9a46b] shadow-md'
                          : 'bg-white border-[#0b3a40]/10'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className={`font-bold font-headline uppercase text-sm ${
                            m.completed ? 'text-[#0b3a40]' : 'text-gray-400'
                          }`}>
                            {m.status}
                          </h4>
                          <span className="text-[11px] font-mono text-[#0f5c66]">
                            {m.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 font-sans">
                          {m.description}
                        </p>
                        <div className="flex items-center gap-1 text-[11px] text-[#c9a46b] font-medium pt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{m.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#0b3a40]/10 shadow-sm space-y-4">
              <Ship className="w-16 h-16 text-[#0b3a40]/30 mx-auto" />
              <h3 className="text-2xl font-bold font-headline uppercase text-[#0b3a40]">
                ENTER YOUR SHIPMENT NUMBER ABOVE
              </h3>
              <p className="text-sm text-[#1a1f23]/70 max-w-md mx-auto">
                Tracking numbers are provided on your House Bill of Lading (HBL) or Master Airway Bill (MAWB) booking confirmation receipt.
              </p>
            </div>
          )}

        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}
