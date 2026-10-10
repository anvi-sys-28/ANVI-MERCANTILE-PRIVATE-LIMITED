export interface TradeRoute {
  id: string;
  origin: string;
  destination: string;
  category: "Asia-MiddleEast" | "Asia-NorthAmerica" | "Asia-Europe" | "IntraAsia";
  seaTransitDays: string;
  airTransitDays: string;
  keyPorts: string[];
  topProducts: string[];
  requiredDocs: string[];
  frequency: string;
}

export const tradeRoutesData: TradeRoute[] = [
  {
    id: "in-uae",
    origin: "India (JNPT / Mundra)",
    destination: "UAE (Jebel Ali / Dubai)",
    category: "Asia-MiddleEast",
    seaTransitDays: "3 - 5 Days",
    airTransitDays: "1 Day (Direct)",
    keyPorts: ["JNPT Nhava Sheva", "Mundra Port", "Jebel Ali Port", "Dubai Air Cargo Terminal"],
    topProducts: ["Spices & Agri-Commodities", "Jewelry & Gold", "Textiles", "Industrial Machinery"],
    requiredDocs: ["Commercial Invoice", "Packing List", "CEPA Certificate of Origin", "Bill of Lading", "AD Code Registration"],
    frequency: "Daily Sailings & Flights"
  },
  {
    id: "cn-in",
    origin: "China (Shanghai / Ningbo)",
    destination: "India (JNPT / Chennai / Delhi)",
    category: "IntraAsia",
    seaTransitDays: "12 - 16 Days",
    airTransitDays: "2 - 3 Days",
    keyPorts: ["Shanghai Port", "Ningbo-Zhoushan", "Shenzhen", "JNPT", "Chennai Port"],
    topProducts: ["Electronics & Components", "Solar Panels", "Chemicals & Polymers", "Machinery Spare Parts"],
    requiredDocs: ["Bill of Entry", "BIS Certificate", "Form-A Origin Cert", "Packing List", "MSDS (if chemical)"],
    frequency: "5 Vessels / Week"
  },
  {
    id: "in-usa",
    origin: "India (JNPT / Hazira)",
    destination: "USA (New York / Los Angeles)",
    category: "Asia-NorthAmerica",
    seaTransitDays: "22 - 28 Days",
    airTransitDays: "2 - 4 Days",
    keyPorts: ["JNPT", "Mundra", "Port of NY/NJ", "Port of Los Angeles", "JFK Air Cargo"],
    topProducts: ["Garments & Apparel", "Organic Spices & Tea", "Pharmaceuticals", "Handicrafts & Leather"],
    requiredDocs: ["ISF 10+2 Filing", "FDA Registration (for agri/pharma)", "US Customs Entry 3461", "Commercial Invoice"],
    frequency: "3 Direct Express Vessels / Week"
  },
  {
    id: "in-eu",
    origin: "India (JNPT / Mundra)",
    destination: "Europe (Rotterdam / Hamburg)",
    category: "Asia-Europe",
    seaTransitDays: "20 - 25 Days",
    airTransitDays: "2 - 3 Days",
    keyPorts: ["Mundra Port", "Rotterdam Port", "Hamburg Port", "Antwerp", "Frankfurt Airport"],
    topProducts: ["Engineering Goods", "Auto Components", "Organic Agricultural Commodities", "Textiles"],
    requiredDocs: ["EUR.1 Movement Cert", "REACH Compliance declaration", "Phytosanitary Cert", "Bill of Lading"],
    frequency: "4 Sailings / Week"
  },
  {
    id: "in-sea",
    origin: "India (Chennai / Visakhapatnam)",
    destination: "Southeast Asia (Singapore / Port Klang)",
    category: "IntraAsia",
    seaTransitDays: "5 - 8 Days",
    airTransitDays: "1 - 2 Days",
    keyPorts: ["Chennai Port", "Port of Singapore", "Port Klang Malaysia", "Bangkok Port"],
    topProducts: ["Rice & Grains", "Refined Petroleum", "Iron & Steel", "Consumer Packaged Goods"],
    requiredDocs: ["AIFTA Certificate of Origin", "Customs Shipping Bill", "Phytosanitary Cert", "Ocean B/L"],
    frequency: "Daily Feeder Services"
  }
];
