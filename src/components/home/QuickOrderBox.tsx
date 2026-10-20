import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface QuickOrderBoxProps {
  position: 'right' | 'left';
  className?: string;
}

const COMMODITIES = [
  { name: 'Fresh Green Chilly', slug: 'fresh-g4-green-chillies-pungent', defaultMt: 10, price: '$1,650/MT' },
  { name: 'Ruby Pomegranates (Bhagwa)', slug: 'fresh-ruby-red-pomegranates-bhagwa', defaultMt: 18, price: '$1,450/MT' },
  { name: '1121 Basmati Rice', slug: 'traditional-1121-basmati-rice', defaultMt: 25, price: '$980/MT' },
  { name: 'Nashik Red Onions', slug: 'fresh-nashik-red-onions-garwa', defaultMt: 25, price: '$480/MT' },
  { name: 'Seedless Grapes', slug: 'fresh-thompson-seedless-grapes', defaultMt: 12, price: '$1,850/MT' },
  { name: 'Pink Guavas', slug: 'fresh-pink-guavas-taiwan-pink', defaultMt: 10, price: '$1,150/MT' },
  { name: 'Organic Makhana', slug: 'organic-popped-makhana-foxnuts', defaultMt: 5, price: '$8,400/MT' },
];

const PORTS = [
  'Dubai (Jebel Ali)',
  'Rotterdam (Netherlands)',
  'Singapore Port',
  'London Gateway (UK)',
  'Jeddah (Saudi Arabia)',
  'Hamburg (Germany)',
  'New York / NJ',
  'Other Port',
];

export function QuickOrderBox({ position, className = '' }: QuickOrderBoxProps) {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState<'bulk' | 'sample'>('bulk');
  const [commodity, setCommodity] = useState(COMMODITIES[0]);
  const [quantity, setQuantity] = useState<string>('18 MT (40ft Reefer)');
  const [port, setPort] = useState(PORTS[0]);
  const [contact, setContact] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qtyVal = orderType === 'bulk' ? quantity : '5 Kg Sample';
    navigate(
      `/quote?product=${encodeURIComponent(commodity.name)}&qty=${encodeURIComponent(qtyVal)}&type=${orderType}&port=${encodeURIComponent(port)}&contact=${encodeURIComponent(contact)}`
    );
  };

  const getWhatsAppUrl = () => {
    const text =
      orderType === 'bulk'
        ? `Hi Anvi Mercantile, I want to order:\n- Produce: ${commodity.name}\n- Volume: ${quantity}\n- Port: ${port}\n- Contact: ${contact || 'Buyer'}`
        : `Hi Anvi Mercantile, I want a Quality Sample Box:\n- Produce: ${commodity.name} (Air Courier)\n- Port/City: ${port}\n- Contact: ${contact || 'Buyer'}`;

    return `https://wa.me/918328246413?text=${encodeURIComponent(text)}`;
  };

  return (
    <motion.div
      layout
      data-position={position}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
      className={`w-[320px] sm:w-[340px] bg-black/60 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-2xl text-white text-left ${className}`}
    >
      {/* Sleek Mode Switcher */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
        <div className="flex items-center gap-1.5 p-0.5 bg-white/10 rounded-lg text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => {
              setOrderType('bulk');
              setQuantity('18 MT (40ft Reefer)');
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
              orderType === 'bulk'
                ? 'bg-[#c9a46b] text-[#0b3a40] font-bold shadow'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Package className="w-3 h-3" />
            <span>Bulk (MT)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setOrderType('sample');
              setQuantity('5 Kg Air Sample');
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
              orderType === 'sample'
                ? 'bg-[#c9a46b] text-[#0b3a40] font-bold shadow'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Sample</span>
          </button>
        </div>

        <span className="text-[10px] text-[#c9a46b] font-medium font-mono">
          {commodity.price}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        {/* Commodity Select */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-white/60 tracking-wider mb-1">
            Commodity
          </label>
          <select
            value={commodity.slug}
            onChange={(e) => {
              const found = COMMODITIES.find((c) => c.slug === e.target.value);
              if (found) setCommodity(found);
            }}
            className="w-full bg-white/10 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#c9a46b] transition-colors"
          >
            {COMMODITIES.map((c) => (
              <option key={c.slug} value={c.slug} className="bg-slate-900 text-white">
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* 2-Column Row: Volume + Port */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] uppercase font-bold text-white/60 tracking-wider mb-1">
              {orderType === 'bulk' ? 'Volume' : 'Sample Size'}
            </label>
            {orderType === 'bulk' ? (
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-white/10 border border-white/15 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[#c9a46b]"
              >
                <option value="10 MT (Min MOQ)" className="bg-slate-900 text-white">10 MT (Min MOQ)</option>
                <option value="18 MT (40ft Reefer)" className="bg-slate-900 text-white">18 MT (40ft Reefer)</option>
                <option value="25 MT (FCL Container)" className="bg-slate-900 text-white">25 MT (FCL Container)</option>
                <option value="50 MT (2 Containers)" className="bg-slate-900 text-white">50 MT (2 Containers)</option>
              </select>
            ) : (
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-white/10 border border-white/15 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[#c9a46b]"
              >
                <option value="5 Kg Air Courier" className="bg-slate-900 text-white">5 Kg Box</option>
                <option value="10 Kg Air Courier" className="bg-slate-900 text-white">10 Kg Box</option>
                <option value="20 Kg Test Carton" className="bg-slate-900 text-white">20 Kg Carton</option>
              </select>
            )}
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-white/60 tracking-wider mb-1">
              Destination
            </label>
            <select
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="w-full bg-white/10 border border-white/15 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[#c9a46b] truncate"
            >
              {PORTS.map((p) => (
                <option key={p} value={p} className="bg-slate-900 text-white">
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Minimal Contact Input */}
        <div>
          <input
            type="text"
            placeholder="Your Email or WhatsApp Phone"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full bg-white/10 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#c9a46b]"
          />
        </div>

        {/* Single Row Actions */}
        <div className="flex items-center gap-1.5 pt-1">
          <button
            type="submit"
            className="flex-1 bg-[#c9a46b] hover:bg-[#b59057] text-[#0b3a40] py-2 rounded-lg font-bold font-headline uppercase text-[11px] shadow transition-colors flex items-center justify-center gap-1"
          >
            <span>{orderType === 'bulk' ? 'Place MT Order' : 'Order Sample'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            title="Order directly on WhatsApp"
            className="px-2.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </form>
    </motion.div>
  );
}
