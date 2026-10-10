export interface HeroSlide {
  id: string;
  number: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "china",
    number: "01",
    shortLabel: "Shipping to China",
    title: "MOVING BUSINESS ACROSS BORDERS",
    subtitle: "End-to-end import/export logistics connecting India, China, UAE, USA & Europe with uncompromised precision.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=85",
    ctaText: "GET A FREE QUOTE",
    ctaLink: "/quote",
    secondaryCtaText: "TRACK SHIPMENT",
    secondaryCtaLink: "/track",
  },
  {
    id: "sea",
    number: "02",
    shortLabel: "Sea Freight",
    title: "GLOBAL MARITIME FREIGHT NETWORK",
    subtitle: "Full Container Load (FCL) & Less than Container Load (LCL) with direct ocean liner vessel contracts.",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=2000&q=85",
    ctaText: "EXPLORE SEA FREIGHT",
    ctaLink: "/services/sea-freight",
    secondaryCtaText: "VIEW TRADE ROUTES",
    secondaryCtaLink: "/trade",
  },
  {
    id: "air",
    number: "03",
    shortLabel: "Air Cargo",
    title: "EXPEDITED AIR CARGO SOLUTIONS",
    subtitle: "Priority air freight chartering, temperature-sensitive shipments, and express customs delivery worldwide.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=85",
    ctaText: "AIR CARGO SOLUTIONS",
    ctaLink: "/services/air-cargo",
    secondaryCtaText: "REQUEST QUOTE",
    secondaryCtaLink: "/quote",
  },
  {
    id: "customs",
    number: "04",
    shortLabel: "Customs Clearance",
    title: "COMPLIANCE & CUSTOMS MASTERY",
    subtitle: "Zero-delay customs clearance, AD code registration, duty classification, and regulatory documentation.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85",
    ctaText: "CUSTOMS SERVICES",
    ctaLink: "/services/customs-clearance",
    secondaryCtaText: "TALK TO AN EXPERT",
    secondaryCtaLink: "/contact",
  },
];
