import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  ArrowRight, 
  Check 
} from 'lucide-react';
import { SEO } from '@/components/global/SEO';
import { useCart } from '@/context/CartContext';

// --- TYPES ---
export interface StoreCategory {
  id: string;
  name: string;
  count: string;
  filterKey: string;
  image: string;
  fallbackImage: string;
  pillBg: string;
  pillText: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  category: 'Vegetables' | 'Fruits' | 'Dairy' | 'Meat' | 'Fresh Fish' | 'Bakery' | 'Snacks';
  price: string;
  originalPrice: string;
  discountBadge: string;
  rating: number;
  unit: string;
  image: string;
  fallbackImage: string;
}

// --- CATEGORIES LIST (Shop by Category) ---
const CATEGORIES: StoreCategory[] = [
  {
    id: 'cat-veg',
    name: 'Vegetables',
    count: '(50 items)',
    filterKey: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80',
    fallbackImage: '/images/products/carrots.png',
    pillBg: 'bg-[#EBF7EE]',
    pillText: 'text-[#1E3A20]',
  },
  {
    id: 'cat-fruit',
    name: 'Fruits',
    count: '(30 items)',
    filterKey: 'Fruits',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=300&q=80',
    fallbackImage: '/images/products/apple.png',
    pillBg: 'bg-[#FFF5E6]',
    pillText: 'text-[#4A3215]',
  },
  {
    id: 'cat-dairy',
    name: 'Dairy',
    count: '(17 items)',
    filterKey: 'Dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80',
    fallbackImage: '/images/rice.webp',
    pillBg: 'bg-[#EBF3FE]',
    pillText: 'text-[#1D3557]',
  },
  {
    id: 'cat-meat',
    name: 'Meat',
    count: '(140 items)',
    filterKey: 'Meat',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=300&q=80',
    fallbackImage: '/images/pomegranate.webp',
    pillBg: 'bg-[#FDEEEC]',
    pillText: 'text-[#5C2424]',
  },
  {
    id: 'cat-fish',
    name: 'Fresh Fish',
    count: '(110 items)',
    filterKey: 'Fresh Fish',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=300&q=80',
    fallbackImage: '/images/grapes.webp',
    pillBg: 'bg-[#FFF0E6]',
    pillText: 'text-[#5C3218]',
  },
  {
    id: 'cat-bakery',
    name: 'Bakery',
    count: '(140 items)',
    filterKey: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80',
    fallbackImage: '/images/rice.webp',
    pillBg: 'bg-[#EFEBFE]',
    pillText: 'text-[#3D2C58]',
  },
  {
    id: 'cat-snacks',
    name: 'Snacks',
    count: '(78 items)',
    filterKey: 'Snacks',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=300&q=80',
    fallbackImage: '/images/makhana.webp',
    pillBg: 'bg-[#FEF5EB]',
    pillText: 'text-[#543818]',
  },
];

// --- TODAY'S BEST DEALS ---
const BEST_DEALS: StoreProduct[] = [
  {
    id: 'deal-strawberries-1',
    name: 'Organic Red Strawberries',
    category: 'Fruits',
    price: '$16.00',
    originalPrice: '$24.00',
    discountBadge: '40% OFF',
    rating: 5.0,
    unit: '500gm',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/products/apple.png',
  },
  {
    id: 'deal-apples-2',
    name: 'Farm-Fresh McIntosh Apples',
    category: 'Fruits',
    price: '$16.00',
    originalPrice: '$24.00',
    discountBadge: '40% OFF',
    rating: 5.0,
    unit: '500gm',
    image: '/images/products/apple.png',
    fallbackImage: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'deal-strawberries-3',
    name: 'Organic Red Strawberries',
    category: 'Fruits',
    price: '$4.99',
    originalPrice: '$6.99',
    discountBadge: '20% OFF',
    rating: 5.0,
    unit: '300gm',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/products/blueberries.png',
  },
  {
    id: 'deal-bread-4',
    name: 'Artisan Sourdough Bread',
    category: 'Bakery',
    price: '$3.80',
    originalPrice: '$4.50',
    discountBadge: '15% OFF',
    rating: 5.0,
    unit: '500gm',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/rice.webp',
  },
];

// --- ALL BEST SELLING PRODUCTS (Grouped by Category) ---
const BEST_SELLING_PRODUCTS: StoreProduct[] = [
  // FRUITS (Matches Screenshot)
  {
    id: 'prod-lemon-1',
    name: 'Brightfarms Lemon Seedless',
    category: 'Fruits',
    price: '$6.00',
    originalPrice: '$12.00',
    discountBadge: '50% OFF',
    rating: 5.0,
    unit: '500gm',
    image: 'https://images.unsplash.com/photo-1536510233921-8e5043fce771?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/guava.webp',
  },
  {
    id: 'prod-papaya-2',
    name: 'Naturally Sweet Papaya',
    category: 'Fruits',
    price: '$4.00',
    originalPrice: '$8.00',
    discountBadge: '50% OFF',
    rating: 4.5,
    unit: '1 Piece',
    image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/pomegranate.webp',
  },
  {
    id: 'prod-banana-3',
    name: 'Farm Fresh Banana',
    category: 'Fruits',
    price: '$20.00',
    originalPrice: '$24.00',
    discountBadge: '10% OFF',
    rating: 4.0,
    unit: '500gm',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/guava.webp',
  },
  {
    id: 'prod-orange-4',
    name: 'Sweet & Fresh Oranges',
    category: 'Fruits',
    price: '$12.00',
    originalPrice: '$24.00',
    discountBadge: '50% OFF',
    rating: 5.0,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/products/apple.png',
  },
  {
    id: 'prod-pomegranate-5',
    name: 'Ruby Red Bhagwa Pomegranates',
    category: 'Fruits',
    price: '$14.00',
    originalPrice: '$18.00',
    discountBadge: '22% OFF',
    rating: 4.9,
    unit: '1 kg',
    image: '/images/pomegranate.webp',
    fallbackImage: '/images/products/apple.png',
  },
  {
    id: 'prod-grapes-6',
    name: 'Thompson Seedless Green Grapes',
    category: 'Fruits',
    price: '$8.50',
    originalPrice: '$11.00',
    discountBadge: '25% OFF',
    rating: 4.8,
    unit: '500gm',
    image: '/images/grapes.webp',
    fallbackImage: '/images/products/blueberries.png',
  },

  // VEGETABLES
  {
    id: 'prod-veg-broccoli',
    name: 'Organic Crisp Broccoli',
    category: 'Vegetables',
    price: '$3.50',
    originalPrice: '$5.00',
    discountBadge: '30% OFF',
    rating: 4.9,
    unit: '500gm',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/products/carrots.png',
  },
  {
    id: 'prod-veg-carrots',
    name: 'Farm-Fresh Sweet Carrots',
    category: 'Vegetables',
    price: '$2.40',
    originalPrice: '$3.20',
    discountBadge: '25% OFF',
    rating: 4.8,
    unit: '1 kg',
    image: '/images/products/carrots.png',
    fallbackImage: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'prod-veg-onions',
    name: 'Nashik Garwa Red Onions',
    category: 'Vegetables',
    price: '$2.00',
    originalPrice: '$3.00',
    discountBadge: '33% OFF',
    rating: 4.7,
    unit: '1 kg',
    image: '/images/onion.webp',
    fallbackImage: '/images/products/potatoes.png',
  },
  {
    id: 'prod-veg-chillies',
    name: 'Fresh Pungent Green Chillies',
    category: 'Vegetables',
    price: '$1.80',
    originalPrice: '$2.50',
    discountBadge: '28% OFF',
    rating: 4.9,
    unit: '250gm',
    image: '/images/green_chilly.webp',
    fallbackImage: '/images/chilly.webp',
  },

  // DAIRY
  {
    id: 'prod-dairy-milk',
    name: 'Farm Fresh Organic Whole Milk',
    category: 'Dairy',
    price: '$3.20',
    originalPrice: '$4.00',
    discountBadge: '20% OFF',
    rating: 4.9,
    unit: '1 Litre',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/rice.webp',
  },
  {
    id: 'prod-dairy-butter',
    name: 'Grass-Fed Churned Butter',
    category: 'Dairy',
    price: '$4.50',
    originalPrice: '$6.00',
    discountBadge: '25% OFF',
    rating: 5.0,
    unit: '500gm',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/rice.webp',
  },
  {
    id: 'prod-dairy-cheese',
    name: 'Artisan Mature Cheddar',
    category: 'Dairy',
    price: '$5.80',
    originalPrice: '$7.50',
    discountBadge: '22% OFF',
    rating: 4.8,
    unit: '250gm',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/rice.webp',
  },
  {
    id: 'prod-dairy-yogurt',
    name: 'Greek Plain Probiotic Yogurt',
    category: 'Dairy',
    price: '$3.90',
    originalPrice: '$5.00',
    discountBadge: '22% OFF',
    rating: 4.9,
    unit: '400gm',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/rice.webp',
  },

  // BAKERY
  {
    id: 'prod-bake-sourdough',
    name: 'Rustic Artisan Sourdough Loaf',
    category: 'Bakery',
    price: '$3.80',
    originalPrice: '$4.50',
    discountBadge: '15% OFF',
    rating: 5.0,
    unit: '500gm',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/rice.webp',
  },
  {
    id: 'prod-bake-croissant',
    name: 'Flaky French Butter Croissants',
    category: 'Bakery',
    price: '$4.20',
    originalPrice: '$6.00',
    discountBadge: '30% OFF',
    rating: 4.9,
    unit: '4 Pieces',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/rice.webp',
  },
  {
    id: 'prod-bake-baguette',
    name: 'Stone-Baked French Baguette',
    category: 'Bakery',
    price: '$2.80',
    originalPrice: '$3.50',
    discountBadge: '20% OFF',
    rating: 4.7,
    unit: '1 Piece',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/rice.webp',
  },
  {
    id: 'prod-bake-brioche',
    name: 'Soft Golden Brioche Buns',
    category: 'Bakery',
    price: '$3.90',
    originalPrice: '$5.00',
    discountBadge: '22% OFF',
    rating: 4.8,
    unit: '6 Pieces',
    image: 'https://images.unsplash.com/photo-1620921575116-b8cb837c7ce3?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/rice.webp',
  },

  // FRESH FISH
  {
    id: 'prod-fish-salmon',
    name: 'Fresh Atlantic Salmon Fillet',
    category: 'Fresh Fish',
    price: '$14.50',
    originalPrice: '$18.00',
    discountBadge: '19% OFF',
    rating: 5.0,
    unit: '500gm',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/rice.webp',
  },
  {
    id: 'prod-fish-seabass',
    name: 'Wild Mediterranean Sea Bass',
    category: 'Fresh Fish',
    price: '$12.00',
    originalPrice: '$15.00',
    discountBadge: '20% OFF',
    rating: 4.8,
    unit: '800gm',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/rice.webp',
  },
  {
    id: 'prod-fish-prawns',
    name: 'Jumbo Ocean Tiger Prawns',
    category: 'Fresh Fish',
    price: '$16.00',
    originalPrice: '$20.00',
    discountBadge: '20% OFF',
    rating: 4.9,
    unit: '500gm',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/rice.webp',
  },
  {
    id: 'prod-fish-pomfret',
    name: 'Whole Cleaned Silver Pomfret',
    category: 'Fresh Fish',
    price: '$11.50',
    originalPrice: '$14.00',
    discountBadge: '18% OFF',
    rating: 4.8,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/rice.webp',
  },

  // MEAT
  {
    id: 'prod-meat-steak',
    name: 'Prime Grass-Fed Beef Ribeye',
    category: 'Meat',
    price: '$16.00',
    originalPrice: '$24.00',
    discountBadge: '40% OFF',
    rating: 5.0,
    unit: '500gm',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/pomegranate.webp',
  },
  {
    id: 'prod-meat-chicken',
    name: 'Free-Range Tender Chicken Breast',
    category: 'Meat',
    price: '$8.50',
    originalPrice: '$11.00',
    discountBadge: '22% OFF',
    rating: 4.9,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/pomegranate.webp',
  },
  {
    id: 'prod-meat-lamb',
    name: 'Tender Cut Lamb Chops',
    category: 'Meat',
    price: '$15.00',
    originalPrice: '$20.00',
    discountBadge: '25% OFF',
    rating: 4.8,
    unit: '500gm',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/pomegranate.webp',
  },
  {
    id: 'prod-meat-veal',
    name: 'Prime Veal Escalopes',
    category: 'Meat',
    price: '$16.50',
    originalPrice: '$21.00',
    discountBadge: '21% OFF',
    rating: 4.9,
    unit: '600gm',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/pomegranate.webp',
  },

  // SNACKS
  {
    id: 'prod-snack-makhana',
    name: 'Organic Roasted Foxnuts (Makhana)',
    category: 'Snacks',
    price: '$4.50',
    originalPrice: '$6.00',
    discountBadge: '25% OFF',
    rating: 5.0,
    unit: '200gm',
    image: '/images/makhana.webp',
    fallbackImage: '/images/rice.webp',
  },
  {
    id: 'prod-snack-almonds',
    name: 'California Salted Roasted Almonds',
    category: 'Snacks',
    price: '$6.00',
    originalPrice: '$8.00',
    discountBadge: '25% OFF',
    rating: 4.9,
    unit: '250gm',
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/makhana.webp',
  },
  {
    id: 'prod-snack-chips',
    name: 'Crispy Kerala Banana Wafers',
    category: 'Snacks',
    price: '$3.20',
    originalPrice: '$4.50',
    discountBadge: '28% OFF',
    rating: 4.8,
    unit: '200gm',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/makhana.webp',
  },
  {
    id: 'prod-snack-nuts',
    name: 'Dried Fruit & Nut Medley Pack',
    category: 'Snacks',
    price: '$7.00',
    originalPrice: '$9.50',
    discountBadge: '26% OFF',
    rating: 4.9,
    unit: '300gm',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=500&q=80',
    fallbackImage: '/images/makhana.webp',
  },
];

const FILTER_TABS = [
  'All Products',
  'Vegetables',
  'Fruits',
  'Dairy',
  'Bakery',
  'Fresh Fish',
  'Meat',
];

export default function ProductsPage() {
  const { addItem, openCart } = useCart();

  // Active category filter tab (Matches the screenshot where 'Fruits' is active)
  const [activeCategory, setActiveCategory] = useState<string>('Fruits');

  // Wishlist heart toggle set
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  // Recently added animation indicator
  const [addedItem, setAddedItem] = useState<StoreProduct | null>(null);

  const bestSellingRef = useRef<HTMLDivElement>(null);

  // Filter products for Section 4
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All Products') {
      return BEST_SELLING_PRODUCTS;
    }
    return BEST_SELLING_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const handleAddToCart = (product: StoreProduct) => {
    const numericPrice = parseFloat(product.price.replace('$', '')) || 0;
    
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      variantLabel: product.unit,
      priceDisplay: product.price,
      unitPriceUsd: numericPrice,
      quantity: 1,
      category: product.category,
    });

    setAddedItem(product);
    setTimeout(() => {
      setAddedItem((current) => (current?.id === product.id ? null : current));
    }, 2800);
  };

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    if (bestSellingRef.current) {
      bestSellingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <SEO
        title="Fresh Produce & Grocery Store | Anvi Mercantile"
        description="Shop fresh fruits, vegetables, dairy, artisan bakery, fresh fish, and premium groceries directly from certified farms with fast delivery."
      />

      <div className="min-h-screen bg-white text-gray-900 font-sans antialiased pt-24 sm:pt-28 pb-20 selection:bg-emerald-100 selection:text-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">

          {/* ========================================================= */}
          {/* SECTION 1: SHOP BY CATEGORY                               */}
          {/* ========================================================= */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                Shop by Category
              </h2>
              <button
                type="button"
                onClick={() => handleCategoryClick('All Products')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer group"
              >
                <span>All Categories</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 7 Category Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.filterKey)}
                  className="bg-white border border-gray-100/90 rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-between shadow-xs hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group hover:-translate-y-1"
                >
                  {/* Category Image */}
                  <div className="h-16 sm:h-20 w-full flex items-center justify-center p-1 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      onError={(e) => {
                        e.currentTarget.src = cat.fallbackImage;
                      }}
                      className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300 drop-shadow-xs"
                      loading="lazy"
                    />
                  </div>

                  {/* Category Pill with Name & Count */}
                  <div
                    className={`w-full text-center py-1.5 px-1 rounded-xl mt-2 transition-colors ${cat.pillBg} ${cat.pillText}`}
                  >
                    <span className="font-bold text-xs block leading-tight">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-gray-500 font-normal block mt-0.5 leading-none">
                      {cat.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================= */}
          {/* SECTION 2: TODAY'S BEST DEALS                             */}
          {/* ========================================================= */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                Today's Best Deals
              </h2>
              <button
                type="button"
                onClick={() => handleCategoryClick('All Products')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer group"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {BEST_DEALS.map((deal) => {
                const isFavorite = wishlist.has(deal.id);
                const isJustAdded = addedItem?.id === deal.id;

                return (
                  <div
                    key={deal.id}
                    className="bg-white border border-gray-150 rounded-2xl p-4 shadow-xs hover:shadow-lg hover:border-gray-300 transition-all flex flex-col justify-between group relative"
                  >
                    {/* Top Row: Discount Badge & Wishlist Heart */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-[#EA4B48] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                        {deal.discountBadge}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => toggleWishlist(deal.id, e)}
                        className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-label="Save to Wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Centered Image */}
                    <div className="h-36 sm:h-44 w-full flex items-center justify-center p-2 my-1 overflow-hidden">
                      <img
                        src={deal.image}
                        alt={deal.name}
                        onError={(e) => {
                          e.currentTarget.src = deal.fallbackImage;
                        }}
                        className="max-h-full max-w-full object-contain group-hover:scale-106 transition-transform duration-300 drop-shadow-xs"
                        loading="lazy"
                      />
                    </div>

                    {/* Details */}
                    <div className="space-y-1.5 pt-2">
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                        {deal.name}
                      </h3>

                      {/* Price and Rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-extrabold text-gray-900 text-sm sm:text-base">
                            {deal.price}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            {deal.originalPrice}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>({deal.rating.toFixed(1)})</span>
                        </div>
                      </div>

                      {/* Bottom Action Row: Unit + Add to Cart */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-gray-400 font-medium">
                          {deal.unit}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAddToCart(deal)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                            isJustAdded
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-emerald-500/30 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================= */}
          {/* SECTION 3: PROMOTIONAL BANNERS (2 Cards Side-by-Side)     */}
          {/* ========================================================= */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Banner: Fresh & Organic Fruits */}
            <div className="bg-gradient-to-br from-[#FFF9EA] via-[#FFF5DE] to-[#FDF0CE] border border-amber-200/50 rounded-3xl p-6 sm:p-8 flex items-center justify-between overflow-hidden relative shadow-xs group">
              <div className="space-y-2 z-10 max-w-[58%]">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight">
                  Fresh &amp; Organic Fruits
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  100% Farm-to-Table Quality
                </p>
                <div className="pt-2">
                  <span className="text-lg sm:text-xl font-black text-gray-950">
                    $14.99
                  </span>
                  <span className="text-xs text-gray-500 font-medium ml-1">
                    /Only
                  </span>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('Fruits')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs sm:text-sm shadow-sm transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              </div>

              {/* Right Fruit Arrangement */}
              <div className="w-[42%] flex items-center justify-end z-10">
                <img
                  src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80"
                  alt="Fresh & Organic Fruits Basket"
                  onError={(e) => {
                    e.currentTarget.src = '/images/products/apple.png';
                  }}
                  className="max-h-36 sm:max-h-48 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Subtle ambient circle */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-amber-300/20 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Right Banner: Shop the Best Organic Vegetables */}
            <div className="bg-gradient-to-br from-[#EFF9F1] via-[#E6F6E9] to-[#DCF5E1] border border-emerald-200/50 rounded-3xl p-6 sm:p-8 flex items-center justify-between overflow-hidden relative shadow-xs group">
              <div className="space-y-2 z-10 max-w-[58%]">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight">
                  Shop the Best Organic Vegetables
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  Pure taste and nutrition in every bite.
                </p>
                <div className="pt-2">
                  <span className="text-lg sm:text-xl font-black text-gray-950">
                    $12.99
                  </span>
                  <span className="text-xs text-gray-500 font-medium ml-1">
                    /Only
                  </span>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('Vegetables')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs sm:text-sm shadow-sm transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              </div>

              {/* Right Vegetables Arrangement */}
              <div className="w-[42%] flex items-center justify-end z-10">
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
                  alt="Organic Crisp Vegetables"
                  onError={(e) => {
                    e.currentTarget.src = '/images/products/carrots.png';
                  }}
                  className="max-h-36 sm:max-h-48 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Subtle ambient circle */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none" />
            </div>

          </section>

          {/* ========================================================= */}
          {/* SECTION 4: BEST SELLING PRODUCTS                          */}
          {/* ========================================================= */}
          <section ref={bestSellingRef} className="space-y-6 pt-4">
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
              Best Selling Products
            </h2>

            {/* Filter Tabs Bar (Matches Screenshot) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {FILTER_TABS.map((tab) => {
                const isActive = activeCategory === tab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveCategory(tab)}
                    className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'border border-emerald-600 bg-[#EBF7EE] text-emerald-700 shadow-2xs'
                        : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Filtered Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  const isFavorite = wishlist.has(product.id);
                  const isJustAdded = addedItem?.id === product.id;

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white border border-gray-150 rounded-2xl p-4 shadow-xs hover:shadow-lg hover:border-gray-300 transition-all flex flex-col justify-between group relative"
                    >
                      {/* Top Row: Discount Badge & Wishlist Heart */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-[#EA4B48] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                          {product.discountBadge}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => toggleWishlist(product.id, e)}
                          className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors cursor-pointer"
                          aria-label="Save to Wishlist"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Centered Image */}
                      <div className="h-36 sm:h-44 w-full flex items-center justify-center p-2 my-1 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          onError={(e) => {
                            e.currentTarget.src = product.fallbackImage;
                          }}
                          className="max-h-full max-w-full object-contain group-hover:scale-106 transition-transform duration-300 drop-shadow-xs"
                          loading="lazy"
                        />
                      </div>

                      {/* Details */}
                      <div className="space-y-1.5 pt-2">
                        <h3 className="font-bold text-sm sm:text-base text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                          {product.name}
                        </h3>

                        {/* Price and Rating */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-extrabold text-gray-900 text-sm sm:text-base">
                              {product.price}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              {product.originalPrice}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>({product.rating.toFixed(1)})</span>
                          </div>
                        </div>

                        {/* Bottom Action Row: Unit + Add to Cart */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-gray-400 font-medium">
                            {product.unit}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAddToCart(product)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                              isJustAdded
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-emerald-500/30 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700'
                            }`}
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Add to Cart</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </section>

        </div>

        {/* Floating Cart Toast notification */}
        <AnimatePresence>
          {addedItem && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white rounded-2xl p-4 shadow-2xl border border-white/10 flex items-center gap-4 max-w-sm"
            >
              <img
                src={addedItem.image}
                alt={addedItem.name}
                onError={(e) => {
                  e.currentTarget.src = addedItem.fallbackImage;
                }}
                className="w-12 h-12 object-contain rounded-xl bg-white/10 p-1 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-emerald-400">Added to Cart!</p>
                <p className="text-sm font-bold truncate text-white">{addedItem.name}</p>
                <p className="text-xs text-gray-300 font-mono">{addedItem.price}</p>
              </div>
              <button
                type="button"
                onClick={openCart}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                View Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
