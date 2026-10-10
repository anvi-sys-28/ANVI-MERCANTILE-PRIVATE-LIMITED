export interface TrustStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  subtext: string;
}

export interface PartnerLine {
  name: string;
  code: string;
  svgIcon: string;
}

export const trustStats: TrustStat[] = [
  {
    id: "countries",
    label: "Countries Served",
    value: 65,
    suffix: "+",
    subtext: "Global Trade Corridors"
  },
  {
    id: "shipments",
    label: "Shipments Delivered",
    value: 14800,
    suffix: "+",
    subtext: "TEUs & Air Tons Cleared"
  },
  {
    id: "years",
    label: "Years of Experience",
    value: 12,
    suffix: " Yrs",
    subtext: "Proven Freight Excellence"
  },
  {
    id: "clients",
    label: "Satisfied Clients",
    value: 1250,
    suffix: "+",
    subtext: "SMEs & Enterprises"
  }
];

export const shippingLinePartners: PartnerLine[] = [
  { name: "MAERSK LINE", code: "MAEU", svgIcon: "M" },
  { name: "MSC MEDITERRANEAN", code: "MSCU", svgIcon: "MSC" },
  { name: "COSCO SHIPPING", code: "COSU", svgIcon: "COSCO" },
  { name: "CMA CGM", code: "CMDU", svgIcon: "CMA" },
  { name: "HAPAG-LLOYD", code: "HLCU", svgIcon: "HL" },
  { name: "OCEAN NETWORK EXPRESS", code: "ONEU", svgIcon: "ONE" },
  { name: "EMIRATES SKYCARGO", code: "EK", svgIcon: "EK" },
  { name: "QATAR CARGO", code: "QR", svgIcon: "QR" }
];
