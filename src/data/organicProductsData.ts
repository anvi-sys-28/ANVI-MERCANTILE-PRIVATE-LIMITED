export interface ProductVariant {
  label: string;
  price: string;
  type: 'retail' | 'sample' | 'bulk';
}

export interface AccordionContent {
  description: string;
  ingredients: string;
  freePickup: string;
  premiumQuality: string;
  organicFairTrade: string;
}

export interface OrganicProduct {
  id: string;
  name: string;
  priceRange: string;
  category: string;
  breadcrumb: string;
  statNumber: string;
  statLabel: string;
  image: string;
  altText: string;
  review?: {
    author: string;
    rating: number;
    text: string;
    avatar: string;
  };
  accordion: AccordionContent;
  variants: ProductVariant[];
}

export const organicProductsList: OrganicProduct[] = [
  {
    id: "radishes",
    name: "Organic radishes with leaves",
    priceRange: "$ 2,00 - $ 4,00",
    category: "Fruit & Vegetables",
    breadcrumb: "Home / Fruit & Vegetables / Organic radishes with leaves",
    statNumber: "78%",
    statLabel: "Plastic Reduction",
    image: "/images/products/radishes.jpg",
    altText: "Organic fresh red radishes with leaves",
    review: {
      author: "Jenna B",
      rating: 5,
      text: "Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      avatar: "/images/products/avatar.png",
    },
    accordion: {
      description: "Fresh wholefoods & eco lifestyle products, free from wasteful packaging. Shop instore & online. Buy a little or a lot, it's up to you.",
      ingredients: "100% Organically grown French breakfast and round red radishes with crisp leafy tops. Zero synthetic pesticides or chemical fertilizers. Certified APEDA / NPOP organic standards.",
      freePickup: "Free packhouse pickup in Navi Mumbai / Nashik. Fast air-cargo dispatch for export quality samples within 48 hours. Temperature controlled reefer dispatch available.",
      premiumQuality: "Every harvest is manually sorted for uniform color, bulb firmness (25mm-35mm), and fresh crisp leaves before nitrogen-assisted packing.",
      organicFairTrade: "Grown by certified smallholder farmer clusters with direct trade fair compensation and 100% compostable, plastic-free ventilated packaging."
    },
    variants: [
      { label: "Choose an option", price: "", type: "retail" },
      { label: "250g Bunch ($ 2,00)", price: "$ 2,00", type: "retail" },
      { label: "500g Bunch ($ 3,50)", price: "$ 3,50", type: "retail" },
      { label: "1 kg Pack ($ 4,00)", price: "$ 4,00", type: "retail" },
      { label: "5 kg Air Sample Box ($ 25,00)", price: "$ 25,00", type: "sample" },
      { label: "10 MT (1 x 20ft Reefer FCL)", price: "$ 12.000,00", type: "bulk" },
      { label: "20 MT (1 x 40ft High Cube Reefer)", price: "$ 22.000,00", type: "bulk" }
    ]
  },
  {
    id: "ginger",
    name: "Organic fresh ginger root",
    priceRange: "$ 4,00 - $ 16,00",
    category: "Fruit & Vegetables",
    breadcrumb: "Home / Fruit & Vegetables / Organic fresh ginger root",
    statNumber: "84%",
    statLabel: "Bio-Degradable Packaging",
    image: "/images/products/ginger.jpg",
    altText: "Organic fresh ginger root",
    review: {
      author: "Marcus L",
      rating: 5,
      text: "Outstanding aroma and zero fibrous waste. Superb export packaging and fast dispatch.",
      avatar: "/images/products/avatar.png",
    },
    accordion: {
      description: "High-curcumin farm-cured ginger roots with thick skin, intense aroma, and zero chemical wash. Ideal for wholesale, culinary processing, and wellness products.",
      ingredients: "100% Fresh ginger rhizome (Zingiber officinale), ozone-cleaned and naturally air-dried without chemical bleaching.",
      freePickup: "Free pickup at APMC warehouse or direct port dispatch from JNPT Nhava Sheva (INNSA), Mumbai.",
      premiumQuality: "Strict moisture control (<12%), no mildew, plump rhizomes with high essential oil content and certified residue limits.",
      organicFairTrade: "Sourced from certified organic tribal grower belts in Wayanad & Northeast India under fair-trade contracts."
    },
    variants: [
      { label: "Choose an option", price: "", type: "retail" },
      { label: "500g Pack ($ 4,00)", price: "$ 4,00", type: "retail" },
      { label: "1 kg Pouch ($ 7,50)", price: "$ 7,50", type: "retail" },
      { label: "5 kg Master Box ($ 16,00)", price: "$ 16,00", type: "retail" },
      { label: "10 kg Quality Air Sample ($ 45,00)", price: "$ 45,00", type: "sample" },
      { label: "10 MT (1 x 20ft Ventilated FCL)", price: "$ 14.500,00", type: "bulk" },
      { label: "25 MT Bulk Ocean Reefer Container", price: "$ 32.000,00", type: "bulk" }
    ]
  },
  {
    id: "blueberries",
    name: "Organic American blueberries",
    priceRange: "$ 2,00 - $ 7,00",
    category: "Fruit & Vegetables",
    breadcrumb: "Home / Fruit & Vegetables / Organic American blueberries",
    statNumber: "92%",
    statLabel: "Cold-Chain Integrity",
    image: "/images/products/blueberries.jpg",
    altText: "Organic American blueberries",
    review: {
      author: "Elena R",
      rating: 5,
      text: "The berries arrived in perfect condition with natural silver bloom completely intact. Amazing sweetness!",
      avatar: "/images/products/avatar.png",
    },
    accordion: {
      description: "Plump, sweet, antioxidant-rich dark blueberries with natural silver bloom intact. Hand-harvested and chilled immediately at 0°C to guarantee long shelf-life.",
      ingredients: "100% Organic fresh blueberries. No added preservatives, sulfur, or artificial waxes.",
      freePickup: "Refrigerated local dispatch and cold-chain air cargo export with continuous data-logger temperature tracking.",
      premiumQuality: "Brix sweetness 12°+, berry diameter 14mm-18mm, packed in breathable macro-perforated punnets.",
      organicFairTrade: "GlobalGAP certified organic farming with sustainable water recycling and bee-friendly pollination."
    },
    variants: [
      { label: "Choose an option", price: "", type: "retail" },
      { label: "125g Punnet ($ 2,00)", price: "$ 2,00", type: "retail" },
      { label: "250g Clamshell ($ 3,80)", price: "$ 3,80", type: "retail" },
      { label: "500g Family Pack ($ 7,00)", price: "$ 7,00", type: "retail" },
      { label: "2 kg Air Express Quality Box ($ 28,00)", price: "$ 28,00", type: "sample" },
      { label: "5 MT Controlled Atmosphere Reefer", price: "$ 18.000,00", type: "bulk" }
    ]
  },
  {
    id: "potatoes",
    name: "Organic yellow potatoes",
    priceRange: "$ 5,00 - $ 15,00",
    category: "Fruit & Vegetables",
    breadcrumb: "Home / Fruit & Vegetables / Organic yellow potatoes",
    statNumber: "100%",
    statLabel: "Zero Plastic Used",
    image: "/images/products/potatoes.jpg",
    altText: "Organic yellow potatoes",
    review: {
      author: "David K",
      rating: 5,
      text: "Beautiful smooth yellow skin, delicious buttery flavor, and absolutely zero sprout damage.",
      avatar: "/images/products/avatar.png",
    },
    accordion: {
      description: "Creamy, golden-fleshed organic potatoes with rich buttery taste. Naturally cured for thick skin and prolonged natural storage without anti-sprouting chemicals.",
      ingredients: "100% Organic yellow potatoes (Solanum tuberosum), non-GMO, zero chemical sprout inhibitors.",
      freePickup: "Available in 5kg, 10kg, and 25kg breathable natural jute sacks. Direct vessel stuffing at JNPT / Mundra.",
      premiumQuality: "Calibrated grading (45mm-65mm), firm flesh, washed or dry-cured as per destination import regulations.",
      organicFairTrade: "Grown using regenerative soil health practices and organic compost by farmer cooperatives."
    },
    variants: [
      { label: "Choose an option", price: "", type: "retail" },
      { label: "2 kg Eco Paper Bag ($ 5,00)", price: "$ 5,00", type: "retail" },
      { label: "5 kg Jute Sack ($ 9,50)", price: "$ 9,50", type: "retail" },
      { label: "10 kg Sack ($ 15,00)", price: "$ 15,00", type: "retail" },
      { label: "25 kg Commercial Mesh Bag ($ 32,00)", price: "$ 32,00", type: "retail" },
      { label: "25 MT (1 x 40ft Ventilated Reefer Container)", price: "$ 8.500,00", type: "bulk" }
    ]
  },
  {
    id: "carrots",
    name: "Organic purple carrots",
    priceRange: "$ 3,00 - $ 7,00",
    category: "Fruit & Vegetables",
    breadcrumb: "Home / Fruit & Vegetables / Organic purple carrots",
    statNumber: "88%",
    statLabel: "Antioxidant Anthocyanin",
    image: "/images/products/carrots.jpg",
    altText: "Organic purple carrots",
    review: {
      author: "Sophia W",
      rating: 5,
      text: "The deep purple color and sweet crunch are exceptional. The twine bundling looks so authentic and premium.",
      avatar: "/images/products/avatar.png",
    },
    accordion: {
      description: "Heritage purple carrots with intense anthocyanin pigments and sweet crunchy taste. Tied in authentic rustic bundles with fresh green tops.",
      ingredients: "100% Organic purple heirloom carrots with edible fresh leafy tops, naturally rich in vitamins A & C.",
      freePickup: "Cold-chain dispatch from packhouse, express air cargo sample boxes or marine reefer shipments.",
      premiumQuality: "Straight, tender roots, 15cm-20cm uniform length, high natural sugar and antioxidant potency.",
      organicFairTrade: "Heritage heirloom seed preservation, certified organic farm management, fair grower trade."
    },
    variants: [
      { label: "Choose an option", price: "", type: "retail" },
      { label: "500g Tied Bunch ($ 3,00)", price: "$ 3,00", type: "retail" },
      { label: "1 kg Bundle ($ 5,20)", price: "$ 5,20", type: "retail" },
      { label: "2 kg Box ($ 7,00)", price: "$ 7,00", type: "retail" },
      { label: "5 kg Air Courier Sample Box ($ 22,00)", price: "$ 22,00", type: "sample" },
      { label: "10 MT (1 x 20ft Refrigerated Container)", price: "$ 11.000,00", type: "bulk" }
    ]
  },
  {
    id: "apple",
    name: "Organic apples Golden Delicious",
    priceRange: "$ 5,00 - $ 14,00",
    category: "Fruit & Vegetables",
    breadcrumb: "Home / Fruit & Vegetables / Organic apples Golden Delicious",
    statNumber: "95%",
    statLabel: "Sun-Ripened Quality",
    image: "/images/products/apple.jpg",
    altText: "Organic apples Golden Delicious",
    review: {
      author: "Thomas H",
      rating: 5,
      text: "Finest quality Golden Delicious apples I have imported. Sweet, crisp, and no transit bruising whatsoever.",
      avatar: "/images/products/avatar.png",
    },
    accordion: {
      description: "Crisp, honey-sweet Golden Delicious apples with smooth yellow skin and subtle russeting. Harvested from high-altitude orchards with pure glacial meltwater.",
      ingredients: "100% Organic Golden Delicious apples. Non-GMO, naturally ripened, unwaxed and unpolished.",
      freePickup: "Direct dispatch from controlled atmosphere cold storage facilities. Ocean reefer containers to GCC & Europe.",
      premiumQuality: "Fruit firmness 14-16 lbs, Brix 13°+, individual tray pack with shock-absorbing foam fruit sleeves.",
      organicFairTrade: "Certified mountain orchards, GlobalGAP, and APEDA certified export with full harvest traceability."
    },
    variants: [
      { label: "Choose an option", price: "", type: "retail" },
      { label: "1 kg Tray (4-5 apples) ($ 5,00)", price: "$ 5,00", type: "retail" },
      { label: "2 kg Basket ($ 9,00)", price: "$ 9,00", type: "retail" },
      { label: "4 kg Master Carton ($ 14,00)", price: "$ 14,00", type: "retail" },
      { label: "10 kg Export Air Sample ($ 38,00)", price: "$ 38,00", type: "sample" },
      { label: "20 MT 40ft High Cube Reefer ($ 19.500,00)", price: "$ 19.500,00", type: "bulk" }
    ]
  }
];

export const trustBarItems = [
  "CO2 Neutral Plastic Free Shipping",
  "Free Delivery On Domestic Orders Over $99",
  "100% Premium Locally Sourced Organic Shop",
  "Support Small Local Business & Brands"
];
