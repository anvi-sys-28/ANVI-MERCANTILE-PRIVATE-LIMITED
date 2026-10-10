export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: "Ship" | "Plane" | "FileCheck" | "Search" | "Warehouse" | "Truck";
  image: string;
  features: string[];
  processSteps: { step: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  specs: { label: string; value: string }[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "sea-freight",
    slug: "sea-freight",
    title: "Sea Freight Forwarding",
    shortDescription: "Ocean shipping solutions including FCL, LCL, breakbulk, and reefer containers across major global maritime routes.",
    fullDescription: "Anvi Mercantile provides comprehensive sea freight forwarding services connecting manufacturers and trade businesses with key commercial ports across Asia, the Middle East, Europe, and the Americas. Leveraging long-standing contracts with leading shipping lines (Maersk, MSC, COSCO, CMA CGM), we ensure guaranteed container space, competitive port-to-port and door-to-door rates, and complete bill of lading oversight.",
    iconName: "Ship",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80",
    features: [
      "FCL (Full Container Load) & LCL (Less than Container Load) consolidation",
      "Temperature-controlled Reefer Container Management for agricultural & perishable goods",
      "Breakbulk & Oversized Heavy Industrial Cargo Handling",
      "Direct Vessel Carrier Contracts with guaranteed shipping slots",
      "Real-time GPS Container Location tracking from origin port to destination berth"
    ],
    processSteps: [
      { step: "01", title: "Booking & Vessel Slot Allocation", desc: "Selecting optimal maritime carrier schedule & reserving container capacity." },
      { step: "02", title: "Origin Container Loading", desc: "Stuffing, sealing, and port drayage under strict inspection protocols." },
      { step: "03", title: "Export Customs & Ocean Transit", desc: "Customs declaration, manifest filing, and ocean voyage tracking." },
      { step: "04", title: "Destination Port Clearance & Delivery", desc: "Import duty clearance, de-consolidation, and final factory/warehouse delivery." }
    ],
    faqs: [
      { question: "What is the difference between FCL and LCL?", answer: "FCL (Full Container Load) reserves an entire container (20ft/40ft/40HC) exclusively for your shipment. LCL (Less than Container Load) consolidates smaller cargo volumes from multiple shippers into a shared container, reducing costs for smaller shipments." },
      { question: "How early should we book sea freight cargo?", answer: "We recommend booking 2 to 3 weeks prior to the target Cargo Ready Date (CRD) to lock in carrier allocation and prevent container detention during peak trade seasons." },
      { question: "Do you handle hazardous or dangerous cargo (DG)?", answer: "Yes, our team is certified in IMDG (International Maritime Dangerous Goods) code compliance, handling MSDS verification, DG packaging, and carrier approvals." }
    ],
    specs: [
      { label: "Container Sizes", value: "20GP, 40GP, 40HC, 45HC, Open Top, Flat Rack, Reefer" },
      { label: "Average Transit", value: "India ↔ UAE (4-7 Days), India ↔ China (12-18 Days), India ↔ USA (24-32 Days)" },
      { label: "Incoterms Covered", value: "FOB, CIF, CFR, DDP, DAP, EXW" }
    ]
  },
  {
    id: "air-cargo",
    slug: "air-cargo",
    title: "Air Cargo Expedited",
    shortDescription: "Rapid air freight chartering, priority courier consolidations, and time-critical supply chain movements worldwide.",
    fullDescription: "When speed to market is non-negotiable, Anvi Mercantile delivers high-speed air cargo logistics. Operating through key airport hubs (Mumbai BOM, Delhi DEL, Dubai DXB, Shanghai PVG, Frankfurt FRA), we offer scheduled IATA carrier flights, full and partial aircraft charters, and express customs clearance for high-value electronics, pharmaceuticals, fashion textiles, and urgent industrial machinery parts.",
    iconName: "Plane",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Express Priority & Standard Economy Air Cargo options",
      "Full & Partial Air Chartering for oversized or bulk time-critical cargo",
      "Temperature-sensitive cold-chain logistics for pharmaceuticals & perishables",
      "Bonded airport warehouse storage and airport-to-door shuttle services",
      "Pre-clearance documentation for instant clearance upon flight landing"
    ],
    processSteps: [
      { step: "01", title: "Cargo Acceptance & Flight Booking", desc: "Dimensional check, airway bill (AWB) generation, and airline slot confirmation." },
      { step: "02", title: "Screening & Export Customs", desc: "Airport security X-ray screening, dangerous goods clearance, and export shipping approval." },
      { step: "03", title: "Air Flight Transit", desc: "Direct or priority transfer air routing with live flight status updates." },
      { step: "04", title: "Import Clearance & Express Delivery", desc: "Immediate customs entry, tax settlement, and door-step air delivery." }
    ],
    faqs: [
      { question: "How is air freight volumetric weight calculated?", answer: "Air freight charges are based on whichever is greater: actual gross weight in kg or volumetric weight calculated using the standard formula: (Length x Width x Height in cm) / 6000." },
      { question: "What is the typical transit time for air cargo?", answer: "Direct priority flights deliver within 24–48 hours. Economy air freight transit takes 3–5 days depending on destination customs clearance." }
    ],
    specs: [
      { label: "Flight Carrier Type", value: "Passenger Commercial Cargo (Belly Capacity) & Dedicated Freighter Transports" },
      { label: "Transit Window", value: "24 Hours to 4 Days Globally" },
      { label: "Cargo Types", value: "High-value, Perishable, Electronics, Textiles, Urgent Machinery" }
    ]
  },
  {
    id: "customs-clearance",
    slug: "customs-clearance",
    title: "Customs Clearance & Compliance",
    shortDescription: "Expert regulatory customs brokerage, tariff classification, AD code registration, and duty drawback management.",
    fullDescription: "Navigating international trade regulations, customs tariffs, and import duties requires specialized compliance mastery. Anvi Mercantile acts as your authorized Customs Brokerage partner in India and overseas. We handle HS Code classification, ICEGATE e-filing, duty optimization under Free Trade Agreements (FTAs/CEPA), AD code linking, and clearance of complex restricted categories.",
    iconName: "FileCheck",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Authorized Customs Brokerage across major Indian ports, ICDs, and Airports",
      "Harmonized System (HS Code) tariff classification & Duty Drawback claims",
      "AD Code & Bank Realization Certificate (e-BRC) customs registration",
      "Free Trade Agreement (CEPA / AIFTA) duty exemption documentation",
      "FSSAI, BIS, Plant Quarantine, and EPR regulatory compliance approvals"
    ],
    processSteps: [
      { step: "01", title: "Document Review & Classification", desc: "Verifying Commercial Invoice, Packing List, Certificate of Origin, and HS Codes." },
      { step: "02", title: "ICEGATE E-Filing & Bill of Entry", desc: "Pre-lodgement of Bill of Entry / Shipping Bill on national customs portal." },
      { step: "03", title: "Physical Assessment & Duty Payment", desc: "Handling customs officer inspection, assessment duty payment, and query resolutions." },
      { step: "04", title: "Out-of-Charge & Cargo Release", desc: "Securing final Out of Charge (OOC) order and releasing cargo from port terminals." }
    ],
    faqs: [
      { question: "What documents are compulsory for customs clearance in India?", answer: "Essential documents include Commercial Invoice, Packing List, Bill of Lading / Airway Bill, IEC Copy, GST Certificate, AD Code letter, and Certificate of Origin (if claiming FTA tariff concessions)." },
      { question: "How long does customs clearance take?", answer: "Standard clearance takes 24 to 48 hours after vessel discharge if documentation is accurate and no physical customs query is raised." }
    ],
    specs: [
      { label: "Systems Integrated", value: "ICEGATE 2.0, Customs EDI, DGFT Portal" },
      { label: "Coverage Ports", value: "JNPT (Nhava Sheva), Mundra, Chennai, Hazira, Kolkata, BOM Airport, DEL Airport" },
      { label: "Certifications Managed", value: "BIS, FSSAI, WPC, CDSCO, Phyto-Sanitary" }
    ]
  },
  {
    id: "sourcing-procurement",
    slug: "sourcing-procurement",
    title: "Global Sourcing & Procurement",
    shortDescription: "End-to-end vendor verification, factory audits, quality control inspections, and contract negotiation across Asia.",
    fullDescription: "Expanding your business requires reliable overseas manufacturers and verified supplier networks. Anvi Mercantile bridges buyers with audited factories across India, China, Vietnam, Thailand, and the UAE. We eliminate supplier risk by conducting rigorous pre-shipment inspections, factory capability audits, sample verification, and transparent price negotiations.",
    iconName: "Search",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Verified Supplier Identification and Factory Background Check",
      "On-site Quality Assurance & Pre-Shipment Inspection (PSI)",
      "Bilingual Trade Contract Negotiation & Incoterm Clause structuring",
      "Sample Evaluation, Prototyping oversight, and Tech Pack verification",
      "Escrow & Letter of Credit (L/C) safe payment structuring"
    ],
    processSteps: [
      { step: "01", title: "Sourcing Brief & Target Identification", desc: "Analyzing product technical specs and shortlisting 3–5 audited manufacturers." },
      { step: "02", title: "Supplier Audit & Sample Verification", desc: "Inspecting factory capacity, quality systems, and approving production samples." },
      { step: "03", title: "Production Monitoring & Quality Control", desc: "During-production (DUPRO) and final pre-shipment quality inspection." },
      { step: "04", title: "Export Packaging & Loading Oversight", desc: "Supervising container loading, container sealing, and export handover." }
    ],
    faqs: [
      { question: "How do you guarantee product quality before shipping?", answer: "Our certified quality inspectors conduct AQL (Acceptable Quality Limit) 2.5 random sampling audits at the factory before cargo is sealed for export." }
    ],
    specs: [
      { label: "Sourcing Hubs", value: "India, China (Guangzhou, Yiwu, Shenzhen), Vietnam, Thailand, UAE" },
      { label: "Inspection Standard", value: "ISO 2859-1 (ANSI/ASQ Z1.4) Sampling" },
      { label: "Product Categories", value: "Industrial Machinery, Electronics, Textiles, Spices, Agri-products" }
    ]
  },
  {
    id: "warehousing-storage",
    slug: "warehousing-storage",
    title: "Warehousing & Storage Solutions",
    shortDescription: "Strategic Free Trade Warehousing Zones (FTWZ), ambient and cold-chain facilities, and fulfillment distribution.",
    fullDescription: "Optimize inventory velocity with Anvi Mercantile's bonded and non-bonded warehousing infrastructure. Positioned strategically near major port terminals and transport hubs, our state-of-the-art facilities offer climate-controlled storage, palletized rack storage, Pick-and-Pack fulfillment, cross-docking, and customs-exempt duty deferment storage in Free Trade Warehousing Zones (FTWZ).",
    iconName: "Warehouse",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    features: [
      "FTWZ (Free Trade Warehousing Zone) Duty Deferment Storage",
      "Temperature-controlled (-20°C to +25°C) Cold Storage Facilities",
      "WMS-integrated Real-time Inventory Management & Barcode Tracking",
      "Kitting, Repackaging, Labeling, and Barcode Tagging Services",
      "24/7 CCTV Surveillance, Fire Protection & High-Security Access Control"
    ],
    processSteps: [
      { step: "01", title: "Inbound Receiving & Barcode Scanning", desc: "Unloading containers, SKU verification, and WMS system intake." },
      { step: "02", title: "Strategic Staging & Racking", desc: "Segregated high-density racking, cold storage, or bonded zone placement." },
      { step: "03", title: "Pick, Pack & Order Assembly", desc: "Automated pick-list execution, custom packaging, and palletization." },
      { step: "04", title: "Outbound Dispatch & Transportation", desc: "Loading onto regional trucks or export containers with transport manifests." }
    ],
    faqs: [
      { question: "What is the benefit of storing cargo in an FTWZ?", answer: "FTWZ allows importers to defer customs duty payments until cargo is pulled into the domestic market. Re-exports from FTWZ incur zero import duties." }
    ],
    specs: [
      { label: "Warehouse Capacity", value: "Over 250,000 Sq. Ft. across Mumbai, Mundra & Dubai" },
      { label: "Storage Types", value: "Ambient, Chilled, Frozen, Hazmat Bonded" },
      { label: "WMS Platform", value: "Cloud WMS with API integrations" }
    ]
  },
  {
    id: "door-to-door",
    slug: "door-to-door",
    title: "Door-to-Door Multimodal Logistics",
    shortDescription: "Turnkey single-window logistics taking complete responsibility from supplier factory floor to final destination doorstep.",
    fullDescription: "Simplify global trade with our hassle-free Door-to-Door (DDP/DAP) logistics solution. Anvi Mercantile acts as your single point of accountability—managing factory pickup, export customs, ocean/air long-haul freight, import clearance, and final mile truck transport. Eliminating multiple vendor handoffs gives you total visibility and fixed price predictability.",
    iconName: "Truck",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Single All-Inclusive Price Quote with zero hidden destination fees",
      "Complete Incoterm execution: DDP (Delivered Duty Paid) & DAP",
      "Dedicated Trade Account Manager handling all logistics milestones",
      "Multimodal Sea-Air-Road-Rail seamlessly integrated routing",
      "Full Cargo Transit Insurance coverage against marine damage and loss"
    ],
    processSteps: [
      { step: "01", title: "Origin Factory Pickup", desc: "Dispatching trucks to load goods directly from manufacturer floor." },
      { step: "02", title: "Export Customs & Ocean/Air Freight", desc: "Managing export filings and main line vessel/flight haulage." },
      { step: "03", title: "Destination Customs & Tax Settlement", desc: "Paying local duties/taxes and releasing cargo at arrival port." },
      { step: "04", title: "Final Mile Doorstep Delivery", desc: "Unloading at your buyer's warehouse with signed Proof of Delivery (POD)." }
    ],
    faqs: [
      { question: "Who pays customs duty on DDP shipments?", answer: "Under DDP (Delivered Duty Paid) terms, Anvi Mercantile handles and pays all import duties, taxes, and port handling costs upfront on your behalf." }
    ],
    specs: [
      { label: "Service Mode", value: "Door-to-Door DDP / DAP / EXW" },
      { label: "Tracking Level", value: "Milestone status alerts via WhatsApp, SMS & Online Portal" },
      { label: "Coverage", value: "Over 120+ countries worldwide" }
    ]
  }
];
