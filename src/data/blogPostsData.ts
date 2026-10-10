export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Customs & Compliance" | "Trade Routes" | "Logistics Strategy";
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export const blogPostsData: BlogPost[] = [
  {
    id: "post-1",
    slug: "navigating-india-uae-cepa-trade-agreement",
    title: "Navigating the India-UAE CEPA: How SMEs Can Unlock 0% Import Tariff Concessions",
    excerpt: "Comprehensive guide to leveraging the Comprehensive Economic Partnership Agreement (CEPA) to eliminate import tariffs and reduce customs duties between India and Dubai.",
    content: `
# Understanding the India-UAE CEPA Trade Agreement

The Comprehensive Economic Partnership Agreement (CEPA) signed between India and the United Arab Emirates represents a landmark milestone in bilateral trade relations. Effective since May 2022, CEPA provides preferential tariff access on over 90% of trade lines.

## Key Tariff Benefits for Importers & Exporters

Under CEPA, key Indian exports—including textiles, gems and jewelry, agricultural products, leather, and engineering goods—enjoy immediate zero-duty access into the UAE. Conversely, UAE exports of petrochemicals, metals, and dates enter India with duty concessions.

### Step-by-Step Compliance Checklist for CEPA Duty Exemption:

1. **Verify HS Code Eligibility**: Check the official CEPA tariff schedule to confirm your product's specific reduced duty rate.
2. **Meet Rules of Origin (RoO)**: Ensure the goods meet the minimum value addition requirement (typically 35% local value addition).
3. **Obtain Certificate of Origin (CoO)**: Apply via the DGFT portal in India or Dubai Customs in the UAE prior to shipment dispatch.
4. **Customs ICEGATE Pre-Lodgement**: Submit the digital CoO during Bill of Entry filing under notification code 022/2022-Cus.

Partnering with an experienced trade facilitator like Anvi Mercantile guarantees that your documentation strictly complies with customs inspection rules, preventing tariff rejection penalties.
    `,
    category: "Customs & Compliance",
    author: "Vikram Malhotra",
    authorRole: "Director of Regulatory Compliance",
    date: "October 12, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    tags: ["CEPA", "UAE Trade", "Customs Duties", "Export Certification", "DGFT"]
  },
  {
    id: "post-2",
    slug: "ocean-freight-vs-air-cargo-choosing-optimal-incoterms",
    title: "Ocean Freight vs Air Cargo: How to Optimize Transport Costs & Incoterms 2020",
    excerpt: "A tactical comparison of FCL ocean shipping versus priority air cargo for mid-size manufacturers balancing speed, cost per kg, and liability risk.",
    content: `
# Ocean Freight vs Air Cargo: A Tactical Guide for Trade Executives

Choosing between sea shipping and air transportation is more than a cost calculation—it directly impacts inventory velocity, working capital, and supply chain vulnerability.

## Financial Comparison: Cost per CBM / Kilogram

| Logistics Mode | Average Transit Time | Relative Cost Index | Optimal Cargo Type |
| :--- | :--- | :--- | :--- |
| **Sea Freight (FCL)** | 14 - 30 Days | $ (Base Level) | Bulk, Heavy Machinery, Spices, Polymers |
| **Sea Freight (LCL)** | 16 - 32 Days | $$ | Small Batch Shipments (1 - 10 CBM) |
| **Air Cargo Expedited** | 1 - 3 Days | $$$$$ | High-Value Electronics, Fashion, Pharma |

## Selecting the Right Incoterm for Your Freight Strategy

Using **DDP (Delivered Duty Paid)** shifts all destination port handling, customs risk, and inland drayage liability to the logistics provider. For buyers who want predictable landing costs without dealing with foreign customs brokers, DDP remains the gold standard.

Conversely, **FOB (Free on Board)** allows buyers to control ocean freight contracts and choose their preferred shipping line, ideal for high-volume traders with pre-negotiated carrier rates.
    `,
    category: "Logistics Strategy",
    author: "Ananya Sharma",
    authorRole: "Head of Supply Chain Analytics",
    date: "November 04, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80",
    tags: ["Freight Forwarding", "Incoterms 2020", "Ocean Freight", "Air Cargo", "DDP"]
  },
  {
    id: "post-3",
    slug: "top-10-global-ports-and-how-to-avoid-demurrage",
    title: "The Ten Most Important Ports We Ship Through & How to Avoid Demurrage Fees",
    excerpt: "Inside look at port congestion, free storage days, and proactive logistics strategies at Shanghai, JNPT Nhava Sheva, Jebel Ali, and Rotterdam.",
    content: `
# Understanding Global Port Logistics & Demurrage Mitigation

Demurrage and detention fees are among the most frustrating hidden costs in global trade. When container ships arrive at mega-hub ports like Shanghai, JNPT, or Jebel Ali, importers have a strict window of 'free days' to clear customs and pull containers out of the terminal berth.

## Top Ports Connecting Asian Trade Corridors

1. **Shanghai Port (China)** - World's busiest container terminal, handling over 47 million TEUs annually.
2. **JNPT Nhava Sheva (India)** - Gateway for 55% of India's containerized ocean freight.
3. **Jebel Ali Port (UAE)** - The Middle East's largest deep-water transshipment hub.
4. **Port of Rotterdam (Netherlands)** - Europe's primary sea trade artery.

## Proactive Strategies to Zero-Out Demurrage Costs

- **Pre-Clearance File Submission**: File your Bill of Entry on ICEGATE 48 hours prior to vessel arrival (Vessel Inward Date).
- **Extended Free Time Negotiation**: Secure 14 days of container detention free time at origin from carriers like Maersk or MSC.
- **Direct Port Delivery (DPD)**: Register for DPD status at JNPT to bypass CFS (Container Freight Station) holding delays.
    `,
    category: "Trade Routes",
    author: "Rohan Varma",
    authorRole: "VP of Global Port Operations",
    date: "December 18, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Port Operations", "Demurrage", "JNPT", "Jebel Ali", "Container Freight"]
  }
];
