import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Phone, 
  FileText, 
  ShieldCheck, 
  Anchor, 
  CheckCircle2 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

const PORTS = [
  'Jebel Ali (Dubai, UAE)',
  'Rotterdam (Netherlands / EU)',
  'Singapore (SGSIN)',
  'London Gateway / Felixstowe (UK)',
  'Dammam / Jeddah (Saudi Arabia)',
  'New York / Newark (USA)',
  'Port Klang (Malaysia)',
  'Sohar (Oman)',
  'Hamad (Qatar)'
];

export function CartDrawer() {
  const { 
    items, 
    totalCount, 
    totalEstimatedUsd, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    clearCart,
    selectedPort,
    setSelectedPort,
    selectedIncoterm,
    setSelectedIncoterm
  } = useCart();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState({
    companyName: '',
    contactPerson: '',
    country: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [orderGenerated, setOrderGenerated] = useState<{ orderNo: string; date: string } | null>(null);

  // Format currency
  const formatUsd = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(val);
  };

  // WhatsApp checkout message generator
  const getWhatsAppOrderUrl = () => {
    let text = `*ANVI MERCANTILE — B2B REQUISITION ORDER*\n\n`;
    text += `*Destination Port:* ${selectedPort}\n`;
    text += `*Incoterm:* ${selectedIncoterm}\n`;
    text += `*Total Items:* ${totalCount}\n\n`;
    text += `*ORDERED COMMODITIES:*\n`;

    items.forEach((item, idx) => {
      text += `${idx + 1}. *${item.name}*\n`;
      text += `   - Variant/Pack: ${item.variantLabel}\n`;
      text += `   - Quantity: ${item.quantity}\n`;
      text += `   - Price: ${item.priceDisplay}\n\n`;
    });

    if (totalEstimatedUsd > 0) {
      text += `*Estimated Subtotal:* ${formatUsd(totalEstimatedUsd)}\n\n`;
    }

    text += `Please issue the official proforma invoice and advise vessel schedule from JNPT Nhava Sheva.`;

    return `https://wa.me/918328246413?text=${encodeURIComponent(text)}`;
  };

  // Handle Proforma submit
  const handleProformaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNo = `AM-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderGenerated({
      orderNo,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Slide-over Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="relative w-full max-w-md bg-[#FAF5EE] text-[#1F1E1B] shadow-2xl h-full flex flex-col z-10 border-l border-[#D5CBC0]"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#E5DACD] flex items-center justify-between bg-white/70 backdrop-blur-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#807562]/15 text-[#807562] flex items-center justify-center">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#1F1E1B]">Export Order Cart</h2>
                    <p className="text-xs text-[#7A746B]">
                      {totalCount} {totalCount === 1 ? 'item' : 'items'} selected
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {items.length > 0 && (
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1 transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={closeCart}
                    className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                    aria-label="Close cart"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-[#EFE6DA] flex items-center justify-center text-[#7A746B] mb-3">
                      <ShoppingBag size={28} />
                    </div>
                    <h3 className="text-base font-semibold text-[#1F1E1B]">Your cart is empty</h3>
                    <p className="text-xs text-[#7A746B] mt-1 max-w-[240px]">
                      Explore our farm-direct commodities and add sample boxes or bulk containers.
                    </p>
                    <button
                      type="button"
                      onClick={closeCart}
                      className="mt-5 bg-[#242623] text-white text-xs font-semibold py-2.5 px-6 rounded-full hover:bg-black transition-colors cursor-pointer"
                    >
                      Explore Products
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Item Cards */}
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl p-3.5 border border-[#E5DACD]/80 shadow-xs flex gap-3 relative group"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-contain rounded-xl bg-stone-50 p-1.5 border border-stone-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0 pr-6">
                          <h4 className="text-xs sm:text-sm font-bold text-[#1F1E1B] truncate">
                            {item.name}
                          </h4>
                          <div className="text-[11px] text-[#7A746B] font-medium truncate mt-0.5">
                            {item.variantLabel}
                          </div>
                          <div className="text-xs font-semibold text-[#807562] mt-1">
                            {item.priceDisplay}
                          </div>

                          {/* Stepper & Line Total */}
                          <div className="flex items-center justify-between mt-2.5">
                            <div className="flex items-center border border-stone-200 rounded-full bg-stone-50 px-1 py-0.5">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-black transition-colors cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="text-xs font-semibold w-6 text-center select-none">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-black transition-colors cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus size={11} />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Shipping & Incoterm Box */}
                    <div className="bg-white rounded-2xl p-4 border border-[#E5DACD]/80 shadow-xs space-y-3 mt-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#1F1E1B]">
                        <Anchor size={14} className="text-[#807562]" />
                        <span>Discharge Port & Incoterm</span>
                      </div>

                      {/* Port Selector */}
                      <div>
                        <label 
                          htmlFor="cart-port-select"
                          className="block text-[11px] text-[#7A746B] mb-1 font-medium"
                        >
                          Destination Port
                        </label>
                        <select
                          id="cart-port-select"
                          value={selectedPort}
                          onChange={(e) => setSelectedPort(e.target.value)}
                          className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#807562]"
                        >
                          {PORTS.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>

                      {/* Incoterm Radio Pills */}
                      <div>
                        <div className="text-[11px] text-[#7A746B] mb-1.5 font-medium">Incoterm Term</div>
                        <div className="grid grid-cols-3 gap-1.5">
                          {(['CIF', 'FOB', 'CFR'] as const).map((term) => (
                            <button
                              key={term}
                              type="button"
                              onClick={() => setSelectedIncoterm(term)}
                              className={`text-xs py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                                selectedIncoterm === term
                                  ? 'bg-[#242623] text-white shadow-xs'
                                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                              }`}
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-center gap-2 text-[11px] text-emerald-800">
                        <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                        <span>APEDA Inspection & Phytosanitary Included</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer Checkout Actions */}
              {items.length > 0 && (
                <div className="p-5 border-t border-[#E5DACD] bg-white space-y-3">
                  {totalEstimatedUsd > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#7A746B] font-medium">Estimated Order Total:</span>
                      <span className="text-base font-bold text-[#1F1E1B]">
                        {formatUsd(totalEstimatedUsd)}
                      </span>
                    </div>
                  )}

                  {/* WhatsApp Direct Order Button */}
                  <a
                    href={getWhatsAppOrderUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs sm:text-sm font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Phone size={15} />
                    <span>Order via WhatsApp Trade Desk</span>
                  </a>

                  {/* Request Official Proforma Invoice */}
                  <button
                    type="button"
                    onClick={() => setIsCheckoutModalOpen(true)}
                    className="w-full bg-[#242623] hover:bg-black active:scale-98 text-white text-xs sm:text-sm font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <FileText size={15} />
                    <span>Request Official Proforma Invoice (PI)</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PROFORMA INVOICE GENERATOR MODAL */}
      <AnimatePresence>
        {isCheckoutModalOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-[#1F1E1B] relative max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => {
                  setIsCheckoutModalOpen(false);
                  setOrderGenerated(null);
                }}
                className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              >
                <X size={18} />
              </button>

              {!orderGenerated ? (
                <>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#807562]/15 text-[#807562] flex items-center justify-center">
                      <FileText size={16} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-stone-900">Request Official Proforma Invoice</h3>
                      <p className="text-xs text-stone-500">Issued by ANVI MERCANTILE PRIVATE LIMITED</p>
                    </div>
                  </div>

                  <form onSubmit={handleProformaSubmit} className="space-y-3.5 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label 
                          htmlFor="buyer-company-name"
                          className="block text-stone-700 font-medium mb-1"
                        >
                          Company Legal Name *
                        </label>
                        <input
                          id="buyer-company-name"
                          required
                          type="text"
                          placeholder="e.g. Al-Madina Foodstuffs LLC"
                          value={buyerInfo.companyName}
                          onChange={(e) => setBuyerInfo({ ...buyerInfo, companyName: e.target.value })}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#807562]"
                        />
                      </div>
                      <div>
                        <label 
                          htmlFor="buyer-contact-person"
                          className="block text-stone-700 font-medium mb-1"
                        >
                          Contact Person *
                        </label>
                        <input
                          id="buyer-contact-person"
                          required
                          type="text"
                          placeholder="e.g. Tariq Mansoor"
                          value={buyerInfo.contactPerson}
                          onChange={(e) => setBuyerInfo({ ...buyerInfo, contactPerson: e.target.value })}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#807562]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label 
                          htmlFor="buyer-country"
                          className="block text-stone-700 font-medium mb-1"
                        >
                          Destination Country *
                        </label>
                        <input
                          id="buyer-country"
                          required
                          type="text"
                          placeholder="e.g. United Arab Emirates"
                          value={buyerInfo.country}
                          onChange={(e) => setBuyerInfo({ ...buyerInfo, country: e.target.value })}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#807562]"
                        />
                      </div>
                      <div>
                        <label 
                          htmlFor="buyer-port"
                          className="block text-stone-700 font-medium mb-1"
                        >
                          Discharge Port *
                        </label>
                        <input
                          id="buyer-port"
                          type="text"
                          readOnly
                          value={selectedPort}
                          className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 text-stone-700 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label 
                          htmlFor="buyer-work-email"
                          className="block text-stone-700 font-medium mb-1"
                        >
                          Corporate Email *
                        </label>
                        <input
                          id="buyer-work-email"
                          required
                          type="email"
                          placeholder="procurement@company.com"
                          value={buyerInfo.email}
                          onChange={(e) => setBuyerInfo({ ...buyerInfo, email: e.target.value })}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#807562]"
                        />
                      </div>
                      <div>
                        <label 
                          htmlFor="buyer-whatsapp-phone"
                          className="block text-stone-700 font-medium mb-1"
                        >
                          WhatsApp / Phone *
                        </label>
                        <input
                          id="buyer-whatsapp-phone"
                          required
                          type="tel"
                          placeholder="+971 50 123 4567"
                          value={buyerInfo.phone}
                          onChange={(e) => setBuyerInfo({ ...buyerInfo, phone: e.target.value })}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#807562]"
                        />
                      </div>
                    </div>

                    {/* Order Summary Snapshot */}
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80">
                      <div className="font-semibold text-stone-800 mb-1">
                        Order Summary ({totalCount} items)
                      </div>
                      <div className="space-y-1 text-[11px] text-stone-600 max-h-24 overflow-y-auto">
                        {items.map(item => (
                          <div key={item.id} className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="font-medium">{item.priceDisplay}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#807562] hover:bg-[#6D6352] text-white font-semibold py-3 px-4 rounded-full text-xs sm:text-sm shadow-md transition-all cursor-pointer mt-2"
                    >
                      Generate Official Proforma Invoice
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">Proforma Invoice Generated!</h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Reference Number: <strong className="text-stone-900 font-mono">{orderGenerated.orderNo}</strong>
                    </p>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-left text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Exporter:</span>
                      <span className="font-semibold text-stone-900">ANVI MERCANTILE PRIVATE LIMITED</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Port of Loading:</span>
                      <span className="font-semibold text-stone-900">JNPT Nhava Sheva (INNSA), India</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Discharge Port:</span>
                      <span className="font-semibold text-stone-900">{selectedPort}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Payment Terms:</span>
                      <span className="font-semibold text-stone-900">30% Advance TT / Irrevocable LC</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <a
                      href={getWhatsAppOrderUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-full text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <Phone size={15} />
                      <span>Send to Anvi Trade Desk on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        clearCart();
                        setIsCheckoutModalOpen(false);
                        closeCart();
                      }}
                      className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium py-2.5 px-4 rounded-full text-xs transition-colors cursor-pointer"
                    >
                      Done & Return to Catalog
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
