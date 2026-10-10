import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Anchor } from 'lucide-react';

interface TradeHub {
  id: string;
  name: string;
  country: string;
  coords: { x: number; y: number };
  isHq?: boolean;
  transitDays: string;
  topExports: string;
}

const tradeHubs: TradeHub[] = [
  { id: 'bom', name: 'Mumbai (JNPT)', country: 'India', coords: { x: 670, y: 240 }, isHq: true, transitDays: 'HQ Hub', topExports: 'Spices, Textiles, Engineering Goods' },
  { id: 'dxb', name: 'Dubai (Jebel Ali)', country: 'UAE', coords: { x: 600, y: 220 }, transitDays: '3-5 Days Sea', topExports: 'Re-exports, Electronics, Gold' },
  { id: 'pvg', name: 'Shanghai', country: 'China', coords: { x: 820, y: 210 }, transitDays: '12-16 Days Sea', topExports: 'Electronics, Machinery, Polymers' },
  { id: 'rot', name: 'Rotterdam', country: 'Netherlands (EU)', coords: { x: 490, y: 150 }, transitDays: '20-25 Days Sea', topExports: 'Industrial Equipment, Automotive Parts' },
  { id: 'nyc', name: 'New York (JFK/NYNJ)', country: 'USA', coords: { x: 260, y: 170 }, transitDays: '22-28 Days Sea', topExports: 'Pharmaceuticals, Consumer Goods' },
  { id: 'sin', name: 'Singapore', country: 'Southeast Asia', coords: { x: 770, y: 280 }, transitDays: '5-8 Days Sea', topExports: 'Agri Commodities, Energy Products' },
];

export function WorldMap() {
  const [activeHub, setActiveHub] = useState<TradeHub | null>(tradeHubs[0]);
  const hq = tradeHubs.find((h) => h.isHq)!;

  return (
    <div className="relative w-full bg-[#0a2540] rounded-3xl p-6 lg:p-8 border border-white/10 shadow-2xl overflow-hidden text-white">
      {/* Map Header Controls */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <span className="text-[#f39c12] text-xs font-bold font-headline uppercase tracking-widest block">
            INTERACTIVE TRADE CORRIDORS
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-headline tracking-wide text-white">
            GLOBAL NETWORK & ROUTE ARCS
          </h3>
        </div>

        {/* Hub Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {tradeHubs.map((hub) => (
            <button
              key={hub.id}
              onClick={() => setActiveHub(hub)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeHub?.id === hub.id
                  ? 'bg-[#f39c12] text-[#0a2540] font-bold shadow-md'
                  : 'bg-[#0d2a4a] text-white/70 hover:bg-[#f39c12]/80 hover:text-[#0a2540]'
              }`}
            >
              {hub.isHq && <Anchor className="w-3 h-3 inline mr-1" />}
              {hub.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative w-full aspect-[2/1] bg-[#071c35] rounded-2xl overflow-hidden border border-white/10 shadow-inner">
        <svg viewBox="0 0 1000 500" className="w-full h-full object-cover select-none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f39c12" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.5" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <g opacity="0.25" fill="#1b4169" stroke="#071c35" strokeWidth="1">
            <path d="M120,80 L280,70 L340,160 L240,240 L160,200 L100,120 Z" />
            <path d="M280,260 L380,280 L340,420 L270,440 L260,340 Z" />
            <path d="M460,80 L560,70 L580,150 L480,180 L440,130 Z" />
            <path d="M470,200 L590,200 L610,340 L520,410 L450,280 Z" />
            <path d="M600,60 L880,70 L920,240 L760,280 L620,220 Z" />
            <path d="M800,320 L920,320 L900,430 L800,420 Z" />
          </g>

          <g opacity="0.08" stroke="#ffffff" strokeDasharray="3,6">
            <line x1="0" y1="125" x2="1000" y2="125" />
            <line x1="0" y1="250" x2="1000" y2="250" />
            <line x1="0" y1="375" x2="1000" y2="375" />
            <line x1="250" y1="0" x2="250" y2="500" />
            <line x1="500" y1="0" x2="500" y2="500" />
            <line x1="750" y1="0" x2="750" y2="500" />
          </g>

          {tradeHubs
            .filter((h) => !h.isHq)
            .map((hub) => {
              const dx = hub.coords.x - hq.coords.x;
              const dy = hub.coords.y - hq.coords.y;
              const cx = hq.coords.x + dx / 2;
              const cy = hq.coords.y + dy / 2 - Math.abs(dx) * 0.25;

              const dPath = `M ${hq.coords.x} ${hq.coords.y} Q ${cx} ${cy} ${hub.coords.x} ${hub.coords.y}`;
              const isHighlighted = activeHub?.id === hub.id;

              return (
                <g key={`arc-${hub.id}`}>
                  <path
                    d={dPath}
                    fill="none"
                    stroke={isHighlighted ? '#f39c12' : 'url(#routeGradient)'}
                    strokeWidth={isHighlighted ? 3 : 1.5}
                    strokeDasharray={isHighlighted ? 'none' : '4,4'}
                    opacity={isHighlighted ? 1 : 0.6}
                  />

                  <circle r={isHighlighted ? 4 : 3} fill="#f39c12" filter="url(#glow)">
                    <animateMotion
                      path={dPath}
                      dur={isHighlighted ? '2s' : '4s'}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}

          {tradeHubs.map((hub) => {
            const isSelected = activeHub?.id === hub.id;

            return (
              <g
                key={`hub-${hub.id}`}
                transform={`translate(${hub.coords.x}, ${hub.coords.y})`}
                onClick={() => setActiveHub(hub)}
                className="cursor-pointer group"
              >
                {hub.isHq ? (
                  <circle r="16" fill="none" stroke="#f39c12" strokeWidth="1.5" opacity="0.6">
                    <animate attributeName="r" values="8;24;8" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
                  </circle>
                ) : (
                  isSelected && (
                    <circle r="14" fill="none" stroke="#f39c12" strokeWidth="1.5" opacity="0.8">
                      <animate attributeName="r" values="6;18;6" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )
                )}

                <circle
                  r={hub.isHq ? 8 : 6}
                  fill={hub.isHq ? '#f39c12' : isSelected ? '#f39c12' : '#ffffff'}
                  stroke="#071c35"
                  strokeWidth="2"
                  filter="url(#glow)"
                  className="transition-all transform group-hover:scale-125"
                />

                <text
                  x="0"
                  y={hub.isHq ? -14 : 16}
                  textAnchor="middle"
                  fill={hub.isHq ? '#f39c12' : isSelected ? '#ffffff' : 'rgba(255,255,255,0.7)'}
                  fontSize={hub.isHq ? '12' : '10'}
                  fontWeight={hub.isHq || isSelected ? 'bold' : 'normal'}
                  fontFamily="Inter, sans-serif"
                >
                  {hub.name.split(' ')[0]} {hub.isHq ? '(HQ)' : ''}
                </text>
              </g>
            );
          })}
        </svg>

        {activeHub && (
          <motion.div
            key={activeHub.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-[#0d2a4a]/95 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-[#f39c12]" />
              <h4 className="font-bold text-sm uppercase text-white tracking-wide">
                {activeHub.name} ({activeHub.country})
              </h4>
            </div>
            <div className="space-y-1 text-xs text-white/80 font-sans">
              <p>
                <span className="text-[#f39c12] font-medium">Logistics Lead Time:</span>{' '}
                {activeHub.transitDays}
              </p>
              <p>
                <span className="text-[#f39c12] font-medium">Key Commodity Lines:</span>{' '}
                {activeHub.topExports}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
