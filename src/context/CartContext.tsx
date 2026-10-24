import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string; // unique key (productId + variantLabel)
  productId: string;
  name: string;
  image: string;
  variantLabel: string;
  priceDisplay: string;
  unitPriceUsd: number;
  quantity: number;
  category: string;
}

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  totalEstimatedUsd: number;
  isOpen: boolean;
  selectedPort: string;
  selectedIncoterm: 'CIF' | 'FOB' | 'CFR';
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  setSelectedPort: (port: string) => void;
  setSelectedIncoterm: (incoterm: 'CIF' | 'FOB' | 'CFR') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to parse numeric USD price from string like "$ 12.500,00" or "$ 25,00" or "$ 2,00"
function parseUsd(priceStr: string): number {
  if (!priceStr) return 0;
  const cleaned = priceStr
    .replace('$', '')
    .replace(/\s+/g, '')
    .replace('/MT', '')
    .replace('/kg', '')
    .trim();
  
  // Format with thousand dot: e.g. "12.500,00" -> 12500
  if (cleaned.includes('.') && cleaned.includes(',')) {
    const standardized = cleaned.replace(/\./g, '').replace(',', '.');
    const val = parseFloat(standardized);
    return isNaN(val) ? 0 : val;
  }
  // Format with comma as decimal: e.g. "2,50" -> 2.50
  if (cleaned.includes(',')) {
    const val = parseFloat(cleaned.replace(',', '.'));
    return isNaN(val) ? 0 : val;
  }
  const val = parseFloat(cleaned);
  return isNaN(val) ? 0 : val;
}

const STORAGE_KEY = 'anvi_b2b_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore fallback
      }
    }
    return [];
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPort, setSelectedPort] = useState<string>('Jebel Ali (Dubai, UAE)');
  const [selectedIncoterm, setSelectedIncoterm] = useState<'CIF' | 'FOB' | 'CFR'>('CIF');

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalEstimatedUsd = items.reduce((sum, item) => {
    const itemPrice = item.unitPriceUsd > 0 ? item.unitPriceUsd : parseUsd(item.priceDisplay);
    return sum + (itemPrice * item.quantity);
  }, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(prev => !prev);

  const addItem = (item: Omit<CartItem, 'id'>) => {
    const id = `${item.productId}-${item.variantLabel}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, id }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const next = item.quantity + delta;
            return next > 0 ? { ...item, quantity: next } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        totalEstimatedUsd,
        isOpen,
        selectedPort,
        selectedIncoterm,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        setSelectedPort,
        setSelectedIncoterm,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
