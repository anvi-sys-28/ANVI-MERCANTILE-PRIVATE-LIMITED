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
  category: 'Fresh Fruits' | 'Vegetables & Roots' | 'Grains & Superfoods';
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
  // --- ANVI MERCANTILE SIGNATURE COMMODITIES ---
  {
    id: "pomegranate",
    name: "Fresh Ruby Red Pomegranates (Bhagwa)",
    priceRange: "$ 1.250 - $ 1.450 / MT",
    category: "Fresh Fruits",
    breadcrumb: "Home / Fresh Fruits / Ruby Red Bhagwa Pomegranates",
    statNumber: "16°+",
    statLabel: "Brix Sugar Sweetness",
    image: "/images/pomegranate.webp",
    altText: "Fresh Ruby Red Bhagwa Pomegranates from Solapur, India",
    review: {
      author: "Hassan Al-Mansoor",
      rating: 5,
      text: "Exceptional deep ruby arils with soft chewable seeds. Delivered to Jebel Ali in refrigerated containers within 5 days with 0% decay.",
      avatar: "/images/products/avatar.png",
    },
    accordion: {
      description: "Direct farm-sourced Bhagwa (Sindhuri) export-grade pomegranates from the GI-belt of Solapur and Nashik. Glossy red rind with juicy deep-crimson arils and soft edible seeds.",
      ingredients: "100% Fresh Indian Bhagwa Pomegranates. Chemical-free cold wash, GlobalGAP certified with zero harmful pesticide residue.",
      freePickup: "Direct ocean reefer stuffing at JNPT Nhava Sheva (INNSA), Mumbai. Express APEDA phytosanitary air-cargo courier samples dispatched within 48h.",
      premiumQuality: "Export Grade A sorted into 200g-300g, 300g-400g, and 400g+ categories. Sugar Brix guaranteed 16° minimum. Pre-shipment SGS inspection available.",
      organicFairTrade: "5-ply ventilated corrugated CFB cartons (3.5 kg / 5 kg) with anti-fungal paper liners. 60-day shelf life at 5°C to 7°C controlled atmosphere."
    },
    variants: [
      { label: "Choose an option", price: "", type: "retail" },
      { label: "5 kg Air Courier Sample Box (Phytosanitary Inspected) ($ 25,00)", price: "$ 25,00", type: "sample" },
      { label: "10 MT (1 x 20ft Reefer FCL Container) ($ 12.800,00)", price: "$ 12.800,00", type: "bulk" },
      { label: "18 MT (1 x 40ft High Cube Reefer FCL) ($ 23.400,00)", price: "$ 23.400,00", type: "bulk" },
      { label: "3.5 kg Master Carton ($ 12,00)", price: "$ 12,00", type: "retail" },
      { label: "5 kg CFB Export Box ($ 16,50)", price: "$ 16,50", type: "retail" }
    ]
  },
  {
    id: "grapes",
    name: "Thompson Seedless Green Grapes",
    priceRange: "$ 1.350 - $ 1.650 / MT",
    category: "Fresh Fruits",
    breadcrumb: "Home / Fresh Fruits / Thompson Seedless Table Grapes",
    statNumber: "18mm+",
    statLabel: "Berry Caliber & Crispness",
    image: "/images/grapes.webp",
    altText: "Premium Thompson Seedless Green Grapes Nashik",
    review: {
      author: "Klaus Weber",
      rating: 5,
      text: "Consignment arrived at Rotterdam port in immaculate condition. Green stems and crisp texture fully preserved with dual-release SO2 pads.",
      avatar: "/images/products/avatar.png",
    },
    accordion: {
      description: "Sun-ripened, elongated Thompson Seedless table grapes from Nashik & Dindori. High natural brix, thin edible skin, and firm crisp crunch.",
      ingredients: "100% Fresh Thompson Seedless table grapes (Vitis vinifera). EU MRL compliant and APEDA GrapeNet tracked.",
      freePickup: "Continuous cold-chain dispatch at 0°C from packhouse to vessel gate at JNPT Nhava Sheva (INNSA).",
      premiumQuality: "Berry diameter 16mm-18mm+, natural sugar Brix 16-18°, zero water berries or sulfur burn. Pre-cooled within 4 hours of harvest.",
      organicFairTrade: "500g transparent carry punnets inside 4.5kg / 5kg ventilated master cartons with dual-release SO2 preservation pads. 45-60 day cold transit life."
    },
    variants: [
      { label: "Choose an option", price: "", type: "retail" },
      { label: "4.5 kg Express Air Sample Box ($ 28,00)", price: "$ 28,00", type: "sample" },
      { label: "12 MT (1 x 20ft Reefer FCL) ($ 16.200,00)", price: "$ 16.200,00", type: "bulk" },
      { label: "16 MT (1 x 40ft Reefer FCL) ($ 21.600,00)", price: "$ 21.600,00", type: "bulk" },
      { label: "500g Punnet Carry Pack ($ 3,50)", price: "$ 3,50", type: "retail" }
    ]
  },
  {
    id: "guava",
    name: "Export Quality Fresh Pink Guava",
    priceRange: "$ 1.100 - $ 1.350 / MT",
    category: "Fresh Fruits",
    breadcrumb: "Home / Fresh Fruits / Export Pink Guava (Taiwan Pink)",
    statNumber: "100%",
    statLabel: "Foam Mesh Cushion Protection",
    image: "/images/guava.webp",
    altText: "Export Quality Fresh Pink Guavas",
    review: {
      author: "Rashid Al-Nuaimi",
      rating: 5,
      text: "Vibrant pink pulp with incredible tropical aroma. Our supermarket chain in Dubai sold out the entire container in 3 days.",
      avatar: "/images/products/avatar.png",
    },
    accordion: {
      description: "Thick crunchy outer flesh with an intense rosy-pink interior and a soft, low-seed core. Hand-harvested in Maharashtra and Andhra Pradesh.",
      ingredients: "100% Fresh Taiwan Pink / VNR Bihi Guava. Non-waxed, zero chemical ripening agents.",
      freePickup: "Direct container loading at JNPT Mumbai with temperature set strictly at 8°C to 10°C.",
      premiumQuality: "Fruit weight 300g to 600g+; zero transit bruising guaranteed via individual protective foam sleeves.",
      organicFairTrade: "4 kg / 6 kg telescopic heavy-duty cartons. 21-28 day shelf life in ventilated refrigerated maritime reefer transit."
    },
    variants: [
      { label: "Choose an option", price: "", type: "retail" },
      { label: "5 kg Air Courier Sample Box ($ 22,00)", price: "$ 22,00", type: "sample" },
      { label: "10 MT (1 x 20ft Reefer FCL) ($ 11.000,00)", price: "$ 11.000,00", type: "bulk" },
      { label: "20 MT (1 x 40ft High Cube Reefer) ($ 21.000,00)", price: "$ 21.000,00", type: "bulk" },
      { label: "4 kg Telescopic Master Carton ($ 14,00)", price: "$ 14,00", type: "retail" }
    ]
  },
  {
    id: "onion",
    name: "Farm Fresh Nashik Red Onions",
    priceRange: "$ 480 - $ 640 / MT",
    category: "Vegetables & Roots",
    breadcrumb: "Home / Vegetables & Roots / Nashik Red Garwa Onions",
    statNumber: "60-90",
    statLabel: "Days Ambient Shelf-Life",
    image: "/images/onion.webp",
    altText: "Farm Fresh Nashik Red & Golden Onions",
    review: {
      author: "Tan Wei Ming",
      rating: 5,
      text: "Firm, thick outer skin layers and very low moisture. The shipment arrived at Port Klang with zero sprouting or rot.",
      avatar: "/images/products/avatar.png",
    },
    accordion: {
      description: "High-pungency, low-moisture Garwa summer red onions from Lasalgaon, Asia's largest onion market. Naturally sun-cured for extra storage resilience.",
      ingredients: "100% Natural Nashik Red Onions (Allium cepa). Non-irradiated, naturally cured.",
      freePickup: "FOB JNPT Nhava Sheva or Mundra Port. Ambient ventilated container or dry reefer container available.",
      premiumQuality: "Calibrated sorting into 45mm+, 50mm+, and 55mm+ grades. Clean dry skin, tight necks, zero double bulbs.",
      organicFairTrade: "5 kg, 10 kg, 25 kg, and 50 kg red breathable leno mesh bags. 60-90 days storage life."
    },
    variants: [
      { label: "Choose an option", price: "", type: "retail" },
      { label: "10 kg Inspection Sample Sack ($ 18,00)", price: "$ 18,00", type: "sample" },
      { label: "25 MT (1 x 40ft FCL Ventilated Container) ($ 12.500,00)", price: "$ 12.500,00", type: "bulk" },
      { label: "50 MT (2 x 40ft FCL Consignment) ($ 24.000,00)", price: "$ 24.000,00", type: "bulk" },
      { label: "25 kg Red Leno Mesh Bag ($ 15,00)", price: "$ 15,00", type: "retail" }
    ]
  },
  {
    id: "chilly",
    name: "Premium Fresh Green Chillies (G4)",
    priceRange: "$ 1.050 - $ 1.300 / MT",
    category: "Vegetables & Roots",
    breadcrumb: "Home / Vegetables & Roots / Fresh Green G4 Chillies",
    statNumber: "12cm",
    statLabel: "Max Length & High Pungency",
    image: "/images/green_chilly.webp",
    altText: "Export Grade Fresh Green Chillies G4 Jwala",
    review: {
      author: "David Miller",
      rating: 5,
      text: "The green calyx and glossy skin remained intact upon arrival at London Gateway. Pungency and heat level are world class.",
      avatar: "/images/products/avatar.png",
    },
    accordion: {
      description: "Dark green, crisp, and intensely spicy G4 / Jwala chillies from Maharashtra and Gujarat. Harvested with intact green stalks for extended freshness.",
      ingredients: "100% Fresh Indian Green Chillies (Capsicum annuum). APEDA certified packhouse grading.",
      freePickup: "Direct dispatch from APMC cold stores to Nhava Sheva Reefer terminals or air-cargo at CSMI Airport, Mumbai.",
      premiumQuality: "Length 8cm to 12cm; uniform straight thickness; zero insect punctures, mechanical wounds, or discoloration.",
      organicFairTrade: "3.5 kg / 4 kg perforated corrugated cartons with moisture-absorbing food-grade liners. 21-25 days at 7°C to 9°C."
    },
    variants: [
      { label: "Choose an option", price: "", type: "retail" },
      { label: "4 kg Air Express Sample Carton ($ 20,00)", price: "$ 20,00", type: "sample" },
      { label: "10 MT (1 x 20ft Reefer FCL) ($ 11.500,00)", price: "$ 11.500,00", type: "bulk" },
      { label: "18 MT (1 x 40ft Reefer FCL) ($ 19.800,00)", price: "$ 19.800,00", type: "bulk" },
      { label: "4 kg Master Carton ($ 10,00)", price: "$ 10,00", type: "retail" }
    ]
  },
  {
    id: "rice",
    name: "Traditional 1121 Basmati Rice",
    priceRange: "$ 950 - $ 1.280 / MT",
    category: "Grains & Superfoods",
    breadcrumb: "Home / Grains & Superfoods / 1121 Long Grain Basmati Rice",
    statNumber: "8.35mm",
    statLabel: "Extra-Long Aged Slender Grain",
    image: "/images/rice.webp",
    altText: "Traditional 1121 Steam & Sella Basmati Rice",
    review: {
      author: "Ahmed Bin Salim",
      rating: 5,
      text: "Cooks up to 18mm with zero sticking. The aged aroma is authentic Indo-Gangetic Basmati. Very competitive price per MT.",
      avatar: "/images/products/avatar.png",
    },
    accordion: {
      description: "Extra-long slender grain 1121 Basmati Rice (Steam, Sella, Golden, and Raw). Naturally aged for 12+ months to maximize aroma and 2.5x cooked elongation.",
      ingredients: "100% Pure Indian Basmati Rice (GI-certified Indo-Gangetic Punjab & Haryana plains). Purity: 95%+.",
      freePickup: "FOB Mundra Port / JNPT Nhava Sheva. 1 x 20ft container carries 25 MT heavy cargo load.",
      premiumQuality: "Raw grain length 8.35mm+; cooked length 18mm+; moisture under 12.5%; broken grain under 1%; sortex cleaned 100%.",
      organicFairTrade: "5 kg, 10 kg, 20 kg, 25 kg, and 50 kg non-woven, BOPP, or heavy multi-wall laminated bags."
    },
    variants: [
      { label: "Choose an option", price: "", type: "retail" },
      { label: "5 kg Quality Jute Sample Bag ($ 15,00)", price: "$ 15,00", type: "sample" },
      { label: "25 MT (1 x 20ft Heavy FCL Container) ($ 24.500,00)", price: "$ 24.500,00", type: "bulk" },
      { label: "50 MT (2 x 20ft Heavy FCL Consignment) ($ 48.000,00)", price: "$ 48.000,00", type: "bulk" },
      { label: "25 kg BOPP Moisture-Proof Bag ($ 26,00)", price: "$ 26,00", type: "retail" }
    ]
  },
  {
    id: "makhana",
    name: "Organic Popped Makhana (Jumbo Fox Nuts)",
    priceRange: "$ 7.200 - $ 9.500 / MT",
    category: "Grains & Superfoods",
    breadcrumb: "Home / Grains & Superfoods / Jumbo Fox Nuts (Makhana)",
    statNumber: "6+ Sutta",
    statLabel: "Jumbo Handpicked Grade",
    image: "/images/makhana.webp",
    altText: "Organic Popped Makhana Fox Nuts",
    review: {
      author: "Jennifer Ross",
      rating: 5,
      text: "Crisp, airy texture and snow-white appearance with no black seed husk residue. Excellent high-protein superfood quality.",
      avatar: "/images/products/avatar.png",
    },
    accordion: {
      description: "Naturally organic popped foxnuts (Euryale Ferox) handpicked in the wetlands of Mithila, Bihar. Nutrient-dense superfood rich in protein, magnesium, and antioxidants.",
      ingredients: "100% Naturally Organic Popped Lotus Seeds (Foxnuts). Gluten-free, zero chemicals or artificial bleaching.",
      freePickup: "Dispatched in high-cube maritime containers or express air-cargo shipments directly from Mumbai.",
      premiumQuality: "Jumbo 4 to 6+ Sutta (14mm-18mm diameter); 100% crisp puffy texture; zero dark outer shell inclusions.",
      organicFairTrade: "5 kg / 10 kg nitrogen-flushed metallic barrier bags inside heavy-duty 5-ply cartons to preserve crispness for 12 months."
    },
    variants: [
      { label: "Choose an option", price: "", type: "retail" },
      { label: "2 kg Nitrogen-Flushed Sample Box ($ 28,00)", price: "$ 28,00", type: "sample" },
      { label: "5 MT Volume Container Load ($ 36.000,00)", price: "$ 36.000,00", type: "bulk" },
      { label: "10 MT Commercial FCL ($ 70.000,00)", price: "$ 70.000,00", type: "bulk" },
      { label: "500g Metallic Stand-Up Pouch ($ 7,50)", price: "$ 7,50", type: "retail" }
    ]
  },

  // --- ORGANIC PACKHOUSE PRODUCE (FROM UI DESIGN) ---
  {
    id: "radishes",
    name: "Organic Radishes with Leaves",
    priceRange: "$ 2,00 - $ 4,00",
    category: "Vegetables & Roots",
    breadcrumb: "Home / Vegetables & Roots / Organic Radishes with Leaves",
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
      { label: "10 MT (1 x 20ft Reefer FCL) ($ 12.000,00)", price: "$ 12.000,00", type: "bulk" },
      { label: "20 MT (1 x 40ft High Cube Reefer) ($ 22.000,00)", price: "$ 22.000,00", type: "bulk" }
    ]
  },
  {
    id: "ginger",
    name: "Organic Fresh Ginger Root",
    priceRange: "$ 4,00 - $ 16,00",
    category: "Vegetables & Roots",
    breadcrumb: "Home / Vegetables & Roots / Organic Fresh Ginger Root",
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
      { label: "10 MT (1 x 20ft Ventilated FCL) ($ 14.500,00)", price: "$ 14.500,00", type: "bulk" },
      { label: "25 MT Bulk Ocean Reefer Container ($ 32.000,00)", price: "$ 32.000,00", type: "bulk" }
    ]
  },
  {
    id: "blueberries",
    name: "Organic American Blueberries",
    priceRange: "$ 2,00 - $ 7,00",
    category: "Fresh Fruits",
    breadcrumb: "Home / Fresh Fruits / Organic American Blueberries",
    statNumber: "92%",
    statLabel: "Cold-Chain Integrity",
    image: "/images/products/blueberries.jpg",
    altText: "Organic American Blueberries",
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
      { label: "5 MT Controlled Atmosphere Reefer ($ 18.000,00)", price: "$ 18.000,00", type: "bulk" }
    ]
  },
  {
    id: "potatoes",
    name: "Organic Yellow Potatoes",
    priceRange: "$ 5,00 - $ 15,00",
    category: "Vegetables & Roots",
    breadcrumb: "Home / Vegetables & Roots / Organic Yellow Potatoes",
    statNumber: "100%",
    statLabel: "Zero Plastic Used",
    image: "/images/products/potatoes.jpg",
    altText: "Organic Yellow Potatoes",
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
      { label: "25 MT (1 x 40ft Ventilated Reefer Container) ($ 8.500,00)", price: "$ 8.500,00", type: "bulk" }
    ]
  },
  {
    id: "carrots",
    name: "Organic Purple Carrots",
    priceRange: "$ 3,00 - $ 7,00",
    category: "Vegetables & Roots",
    breadcrumb: "Home / Vegetables & Roots / Organic Purple Carrots",
    statNumber: "88%",
    statLabel: "Antioxidant Anthocyanin",
    image: "/images/products/carrots.jpg",
    altText: "Organic Purple Carrots",
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
      { label: "10 MT (1 x 20ft Refrigerated Container) ($ 11.000,00)", price: "$ 11.000,00", type: "bulk" }
    ]
  },
  {
    id: "apple",
    name: "Organic Apples Golden Delicious",
    priceRange: "$ 5,00 - $ 14,00",
    category: "Fresh Fruits",
    breadcrumb: "Home / Fresh Fruits / Organic Golden Delicious Apples",
    statNumber: "95%",
    statLabel: "Sun-Ripened Quality",
    image: "/images/products/apple.jpg",
    altText: "Organic Apples Golden Delicious",
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
