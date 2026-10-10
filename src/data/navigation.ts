export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "SERVICES", href: "/services" },
  { label: "TRADE ROUTES", href: "/trade" },
  { label: "TRACKING", href: "/track" },
  { label: "ABOUT", href: "/about" },
  { label: "INSIGHTS", href: "/insights" },
  { label: "CONTACT", href: "/contact" },
];

export const footerQuickLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Trade Routes", href: "/trade" },
  { label: "Track Shipment", href: "/track" },
  { label: "Get a Quote", href: "/quote" },
  { label: "Latest Insights", href: "/insights" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export const footerServicesLinks: NavItem[] = [
  { label: "Sea Freight Forwarding", href: "/services/sea-freight" },
  { label: "Air Cargo Expedited", href: "/services/air-cargo" },
  { label: "Customs Clearance & Advisory", href: "/services/customs-clearance" },
  { label: "Sourcing & Procurement", href: "/services/sourcing-procurement" },
  { label: "Warehousing & Storage", href: "/services/warehousing-storage" },
  { label: "Door-to-Door Logistics", href: "/services/door-to-door" },
];
