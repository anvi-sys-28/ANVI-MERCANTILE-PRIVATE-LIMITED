import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Sparkles,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface QuickOrderBoxProps {
  position: 'right' | 'left';
  className?: string;
}

const COMMODITIES = [
  { name: 'Fresh Ruby Red Pomegranates (Bhagwa)', slug: 'fresh-ruby-red-pomegranates-bhagwa', moq: 10, defaultPrice: 1450, unit: 'MT' },
  { name: 'Fresh Thompson Seedless Grapes', slug: 'fresh-thompson-seedless-grapes', moq: 12, defaultPrice: 1850, unit: 'MT' },
  { name: 'Fresh Pink Guavas (Taiwan Pink / VNR)', slug: 'fresh-pink-guavas-taiwan-pink', moq: 10, defaultPrice: 1150, unit: 'MT' },
  { name: 'Fresh Nashik Red Onions (Garwa)', slug: 'fresh-nashik-red-onions-garwa', moq: 25, defaultPrice: 480, unit: 'MT' },
  { name: 'Fresh G4 Green Chillies (Pungent)', slug: 'fresh-g4-green-chillies-pungent', moq: 10, defaultPrice: 1650, unit: 'MT' },
  { name: 'Traditional 1121 Basmati Rice', slug: 'traditional-1121-basmati-rice', moq: 25, defaultPrice: 980, unit: 'MT' },
  { name: 'Organic Popped Makhana (Foxnuts)', slug: 'organic-popped-makhana-foxnuts', moq: 5, defaultPrice: 8400, unit: 'MT' },
];

const PORTS = [
  'Jebel Ali Port (AEJEA), Dubai, UAE',
  'Port of Rotterdam (NLRTM), Netherlands',
  'Singapore Port (SGSIN), Singapore',
  'London Gateway (GBLGP), United Kingdom',
  'Jeddah Islamic Port (SAJED), Saudi Arabia',
  'Port of Hamburg (DEHAM), Germany',
  'Dammam / King Abdulaziz (SADMM), Saudi Arabia',
  'Port Klang (MYPKG), Malaysia',
  'Other / Custom Port',
];

export function QuickOrderBox({ position, className = '' }: QuickOrderBoxProps) {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState<'bulk' | 'sample'>('bulk');
  const [selectedCommodity, setSelectedCommodity] = useState(COMMODITIES[0]);
  const [quantityMt, setQuantityMt] = useState<number>(18);
  const [sampleKg, setSampleKg] = useState<number>(10);
  const [destinationPort, setDestinationPort] = useState(PORTS[0]);
  const [incoterm, setIncoterm] = useState<'CIF' | 'FOB' | 'CFR'>('CIF');
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic container estimation
  const getContainerEstimate = () => {
    if (quantityMt <= 14) return '1 x 20ft Reefer Container';
    if (quantityMt <= 26) return '1 x 40ft High Cube Reefer (Standard FCL)';
    const count = Math.ceil(quantityMt / 24);
    return `${count} x 40ft High Cube Reefer Containers`;
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.trim()) {
      alert('Please enter your contact email or WhatsApp number to receive your instant proforma quotation.');
      return;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      // Navigate to quote or confirmation
      navigate(
        `/quote?product=${encodeURIComponent(selectedCommodity.name)}&qty=${orderType === 'bulk' ? quantityMt : sampleKg}&type=${orderType}&port=${encodeURIComponent(destinationPort)}&incoterm=${incoterm}&contact=${encodeURIComponent(contactInfo)}`
      );
    }, 1200);
  };

  const getWhatsAppOrderUrl = () => {
    const text =
      orderType === 'bulk'
        ? `Hello Anvi Mercantile! I want to order bulk commodities:\n- Commodity: ${selectedCommodity.name}\n- Volume: ${quantityMt} MT (${getContainerEstimate()})\n- Destination: ${destinationPort}\n- Incoterm: ${incoterm}\n- Contact: ${contactInfo || 'Buyer'}`
        : `Hello Anvi Mercantile! I want to request a Quality Sample Box:\n- Commodity: ${selectedCommodity.name}\n- Sample Size: ${sampleKg} Kg (Air Courier Express)\n- Destination: ${destinationPort}\n- Contact: ${contactInfo || 'Buyer'}`;

    return `https://wa.me/918328246413?text=${encodeURIComponent(text)}`;
  };

  return (
    <motion.div
      layout
      data-position={position}
      transition={{ type: 'spring', damping: 25, stiffness: 120, mass: 0.9 }}
      className={`w-full max-w-[420px] bg-slate-950/85 backdrop-blur-xl ${position === 'left' ? 'border-emerald-500/40' : 'border-white/20'} border rounded-2xl shadow-2xl p-5 sm:p-6 text-white text-left ${className}`}
    >
      {/* Top Header & Mode Toggle */}
      <div className="space-y-3 pb-3 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#c9a46b] font-headline">
              Instant B2B Order Desk
            </span>
          </div>
          <span className="text-[10px] text-white/60 font-mono">MOQ: 10 MT / Sample Box</span>
        </div>

        {/* Toggle between Bulk (MT) and Sample Box */}
        <div className="grid grid-cols-2 p-1 bg-white/10 rounded-xl">
          <button
            type="button"
            onClick={() => setOrderType('bulk')}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold font-headline uppercase transition-all ${
              orderType === 'bulk'
                ? 'bg-[#c9a46b] text-[#0b3a40] shadow'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Order in MT</span>
          </button>

          <button
            type="button"
            onClick={() => setOrderType('sample')}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold font-headline uppercase transition-all ${
              orderType === 'sample'
                ? 'bg-[#c9a46b] text-[#0b3a40] shadow'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sample Order</span>
          </button>
        </div>
      </div>

      {isSubmitted ? (
        <div className="py-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
          <h4 className="text-base font-bold font-headline uppercase text-white">
            Order Request Initialized!
          </h4>
          <p className="text-xs text-white/70">
            Connecting you to our export logistics terminal...
          </p>
        </div>
      ) : (
        <form onSubmit={handleQuickSubmit} className="space-y-3.5 pt-3">
          
          {/* Commodity Dropdown */}
          <div>
            <label className="block text-[11px] font-semibold text-white/70 uppercase mb-1">
              Select Indian Commodity
            </label>
            <select
              value={selectedCommodity.slug}
              onChange={(e) => {
                const found = COMMODITIES.find((c) => c.slug === e.target.value);
                if (found) {
                  setSelectedCommodity(found);
                  if (orderType === 'bulk' && quantityMt < found.moq) {
                    setQuantityMt(found.moq);
                  }
                }
              }}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c9a46b] transition-colors"
            >
              {COMMODITIES.map((c) => (
                <option key={c.slug} value={c.slug} className="bg-slate-900 text-white">
                  {c.name} (${c.defaultPrice}/MT)
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Selector: MT vs Sample Kg */}
          {orderType === 'bulk' ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <label className="font-semibold text-white/70 uppercase">
                  Order Volume (Metric Tons)
                </label>
                <span className="text-[#c9a46b] font-bold text-xs">{quantityMt} MT</span>
              </div>

              {/* Quick chips */}
              <div className="grid grid-cols-4 gap-1.5">
                {[10, 18, 25, 50].map((mt) => (
                  <button
                    key={mt}
                    type="button"
                    onClick={() => setQuantityMt(mt)}
                    className={`py-1 rounded text-[11px] font-bold transition-colors ${
                      quantityMt === mt
                        ? 'bg-[#0f5c66] text-white border border-[#c9a46b]'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {mt} MT
                  </button>
                ))}
              </div>

              {/* Slider for precision */}
              <input
                type="range"
                min="10"
                max="100"
                step="1"
                value={quantityMt}
                onChange={(e) => setQuantityMt(Number(e.target.value))}
                className="w-full accent-[#c9a46b] h-1.5 bg-white/20 rounded-lg cursor-pointer"
              />

              <div className="flex items-center justify-between text-[10px] text-white/60 pt-0.5">
                <span>{getContainerEstimate()}</span>
                <span className="font-mono text-emerald-400">
                  Est. ${(quantityMt * selectedCommodity.defaultPrice).toLocaleString()}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <label className="font-semibold text-white/70 uppercase">
                  Air Courier Sample Box
                </label>
                <span className="text-[#c9a46b] font-bold text-xs">{sampleKg} Kg</span>
              </div>

              {/* Sample Size Quick Chips */}
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 20].map((kg) => (
                  <button
                    key={kg}
                    type="button"
                    onClick={() => setSampleKg(kg)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      sampleKg === kg
                        ? 'bg-[#0f5c66] text-white border border-[#c9a46b]'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {kg} Kg Box
                  </button>
                ))}
              </div>

              <div className="p-2 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-[10px] text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Includes APEDA Phytosanitary & Brix sugar test certificate.</span>
              </div>
            </div>
          )}

          {/* Destination Port & Incoterms */}
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-[11px] font-semibold text-white/70 uppercase mb-1">
                Destination Port
              </label>
              <div className="relative">
                <select
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#c9a46b] truncate"
                >
                  {PORTS.map((p) => (
                    <option key={p} value={p} className="bg-slate-900 text-white">
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-white/70 uppercase mb-1">
                Incoterm
              </label>
              <select
                value={incoterm}
                onChange={(e) => setIncoterm(e.target.value as any)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#c9a46b]"
              >
                <option value="CIF" className="bg-slate-900 text-white">CIF (Recommended)</option>
                <option value="FOB" className="bg-slate-900 text-white">FOB (JNPT)</option>
                <option value="CFR" className="bg-slate-900 text-white">CFR</option>
              </select>
            </div>
          </div>

          {/* Buyer Email / Phone */}
          <div>
            <label className="block text-[11px] font-semibold text-white/70 uppercase mb-1">
              Your Email or WhatsApp Phone
            </label>
            <input
              type="text"
              placeholder="e.g. buyer@company.com or +971 50..."
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#c9a46b]"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-1 space-y-2">
            <button
              type="submit"
              className="w-full bg-[#c9a46b] hover:bg-[#b59057] text-[#0b3a40] py-2.5 rounded-xl font-bold font-headline uppercase text-xs shadow-lg transition-all flex items-center justify-center gap-1.5 hover:scale-[1.01]"
            >
              <span>{orderType === 'bulk' ? 'Request Rate & Book MT Order' : 'Order Sample Box'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={getWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct WhatsApp Order (+91 8328246413)</span>
            </a>
          </div>

        </form>
      )}

      {/* Trust Micro-badge */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-[#c9a46b]" />
          APEDA & FSSAI Certified Export
        </span>
        <span>Cold Chain JNPT Mumbai</span>
      </div>
    </motion.div>
  );
}
