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
    id: "chilly",
    category: "Spices & Foodstuff",
    name: "Premium Fresh Green Chilly",
    description: "All grades available. Starting from just $1.26/kg (30% below international market rate). Export-grade crisp green chillies with high pungency.",
    image: "/images/green_chilly.jpg",
    hsCodeRange: "0904 - 2100",
    topDestinations: ["UAE", "USA", "UK", "Saudi Arabia", "Singapore"],
    handlingSpecs: "APEDA & FSSAI Certified, Desiccant-lined Reefer Containers"
  },
  {
    id: "onion",
    category: "Fresh Fruits & Agri",
    name: "Farm Fresh Red & Golden Onions",
    description: "All grades available. Starting from just $0.56/kg (30% below international market rate). Superior quality sorted red and golden onions.",
    image: "/images/onion.jpg",
    hsCodeRange: "0703 - 1010",
    topDestinations: ["Malaysia", "UAE", "Bangladesh", "Sri Lanka", "Vietnam"],
    handlingSpecs: "Temperature-controlled Ventilated Reefer Shipping"
  },
  {
    id: "pomegranate",
    category: "Fresh Fruits & Agri",
    name: "Fresh Ruby Red Pomegranates",
    description: "All grades available. Starting from just $2.45/kg (30% below international market rate). Premium juicy pomegranates with rich ruby-red seeds.",
    image: "/images/pomegranate.jpg",
    hsCodeRange: "0810 - 9010",
    topDestinations: ["Netherlands", "UAE", "Saudi Arabia", "UK", "Thailand"],
    handlingSpecs: "GlobalGAP & APEDA Certified Cold Chain Shipment"
  },
  {
    id: "guava",
    category: "Fresh Fruits & Agri",
    name: "Export Quality Fresh Pink Guava",
    description: "All grades available. Starting from just $1.54/kg (30% below international market rate). Farm-fresh tropical guavas with delicious pink pulp.",
    image: "/images/guava.jpg",
    hsCodeRange: "0804 - 5010",
    topDestinations: ["UAE", "Kuwait", "Qatar", "Oman", "Singapore"],
    handlingSpecs: "Shock-absorbent Protective Foam Grid Packaging"
  },
  {
    id: "grapes",
    category: "Fresh Fruits & Agri",
    name: "Premium Sweet Green & Dark Grapes",
    description: "All grades available. Starting from just $1.96/kg (30% below international market rate). Crisp seedless green and dark purple grapes.",
    image: "/images/grapes.jpg",
    hsCodeRange: "0806 - 1000",
    topDestinations: ["UK", "Germany", "Netherlands", "Canada", "UAE"],
    handlingSpecs: "Sulphur Pad Protected & 0°C Cold Chain Transit"
  },
  {
    id: "makhana",
    category: "Nuts & Superfoods",
    name: "Organic Popped Makhana (Fox Nuts)",
    description: "All grades available. Starting from just $8.40/kg (30% below international market rate). Premium quality roasted white makhana lotus seeds.",
    image: "/images/makhana.jpg",
    hsCodeRange: "1904 - 1090",
    topDestinations: ["USA", "UK", "Australia", "Canada", "Singapore"],
    handlingSpecs: "Nitrogen-flushed Moisture-proof Vacuum Packaging"
  }
];
