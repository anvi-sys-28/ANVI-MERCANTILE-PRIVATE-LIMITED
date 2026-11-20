export interface ProductItem {
  id: string;
  category: "Spices & Foodstuff" | "Fresh Fruits & Agri" | "Agri Commodities" | "Nuts & Superfoods";
  name: string;
  description: string;
  image: string;
  hsCodeRange: string;
  topDestinations: string[];
  handlingSpecs: string;
}

export const productsData: ProductItem[] = [
  {
    id: "rice",
    category: "Agri Commodities",
    name: "Premium Long-Grain Basmati Rice",
    description: "All grades available (1121 Steam, Sella, Golden & Pusa). Export-grade quality with verified purity and container-ready standards. Aromatic extra-long grains with superior elongation.",
    image: "/images/rice.webp",
    hsCodeRange: "1006 - 3020",
    topDestinations: ["Saudi Arabia", "UAE", "Iran", "Iraq", "USA", "UK"],
    handlingSpecs: "FSSAI & APEDA Certified, Non-GMO, Moisture-proof BOPP Bags"
  },
  {
    id: "chilly",
    category: "Spices & Foodstuff",
    name: "Premium Fresh Green Chilly",
    description: "All export grades available (G4 & Jwala). Direct from certified farms, sortex graded, pre-cooled and packed in ventilated reefer export cartons with high pungency.",
    image: "/images/green_chilly.webp",
    hsCodeRange: "0904 - 2100",
    topDestinations: ["UAE", "USA", "UK", "Saudi Arabia", "Singapore"],
    handlingSpecs: "APEDA & FSSAI Certified, Desiccant-lined Reefer Containers"
  },
  {
    id: "onion",
    category: "Fresh Fruits & Agri",
    name: "Farm Fresh Red & Golden Onions",
    description: "All export grades available (Garwa / Summer crop). Superior quality sorted red and golden onions with optimum dry matter and skin retention.",
    image: "/images/onion.webp",
    hsCodeRange: "0703 - 1010",
    topDestinations: ["Malaysia", "UAE", "Bangladesh", "Sri Lanka", "Vietnam"],
    handlingSpecs: "Temperature-controlled Ventilated Reefer Shipping"
  },
  {
    id: "pomegranate",
    category: "Fresh Fruits & Agri",
    name: "Fresh Ruby Red Pomegranates",
    description: "All export grades available (Bhagwa variety). Premium juicy pomegranates with rich ruby-red seeds and high Brix sweetness, packed in export master boxes.",
    image: "/images/pomegranate.webp",
    hsCodeRange: "0810 - 9010",
    topDestinations: ["Netherlands", "UAE", "Saudi Arabia", "UK", "Thailand"],
    handlingSpecs: "GlobalGAP & APEDA Certified Cold Chain Shipment"
  },
  {
    id: "guava",
    category: "Fresh Fruits & Agri",
    name: "Export Quality Fresh Pink Guava",
    description: "All export grades available (Taiwan Pink & Allahabad Safeda). Farm-fresh tropical guavas with delicious crisp pink pulp and rich natural aroma.",
    image: "/images/guava.webp",
    hsCodeRange: "0804 - 5010",
    topDestinations: ["UAE", "Kuwait", "Qatar", "Oman", "Singapore"],
    handlingSpecs: "Shock-absorbent Protective Foam Grid Packaging"
  },
  {
    id: "grapes",
    category: "Fresh Fruits & Agri",
    name: "Premium Sweet Green & Dark Grapes",
    description: "All export grades available (Thompson Seedless & Sharad Dark). Crisp seedless green and dark purple grapes harvested at optimum Brix with cold-chain protection.",
    image: "/images/grapes.webp",
    hsCodeRange: "0806 - 1000",
    topDestinations: ["UK", "Germany", "Netherlands", "Canada", "UAE"],
    handlingSpecs: "Sulphur Pad Protected & 0°C Cold Chain Transit"
  },
  {
    id: "makhana",
    category: "Nuts & Superfoods",
    name: "Organic Popped Makhana (Fox Nuts)",
    description: "All export grades available (Jumbo 4 to 6+ sutta). Naturally organic, gluten-free, premium quality roasted white makhana lotus seeds in food-grade packaging.",
    image: "/images/makhana.webp",
    hsCodeRange: "1904 - 1090",
    topDestinations: ["USA", "UK", "Australia", "Canada", "Singapore"],
    handlingSpecs: "Nitrogen-flushed Moisture-proof Vacuum Packaging"
  }
];
