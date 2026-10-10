export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  quote: string;
  avatar: string;
  routeUsed: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "t1",
    clientName: "Rajesh Singhania",
    role: "Managing Director",
    company: "Vanguard Spices & Agri Exports",
    location: "Gujarat, India",
    rating: 5,
    quote: "Anvi Mercantile transformed our export operations to the Middle East. Their customs clearance team handled our FSSAI and CEPA certificates without a single hitch. Our containers now arrive in Dubai in under 4 days!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    routeUsed: "India ↔ UAE Sea Freight & Customs"
  },
  {
    id: "t2",
    clientName: "Elena Rostova",
    role: "Head of Global Supply Chain",
    company: "Apex Precision Components",
    location: "Frankfurt, Germany",
    rating: 5,
    quote: "Finding a reliable freight forwarding partner in India was critical for our European manufacturing plants. Anvi Mercantile provides flawless air cargo tracking and zero-delay customs clearance.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    routeUsed: "India ↔ EU Air Cargo Expedited"
  },
  {
    id: "t3",
    clientName: "Chen Wei",
    role: "Chief Procurement Officer",
    company: "Sino-Indo Industrial Tech",
    location: "Shenzhen, China",
    rating: 5,
    quote: "Their door-to-door DDP services from Ningbo port to Mumbai factories give us total cost certainty. No unexpected demurrage fees, no clearance hold-ups. Outstanding partner!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    routeUsed: "China ↔ India Multimodal Door-to-Door"
  }
];
