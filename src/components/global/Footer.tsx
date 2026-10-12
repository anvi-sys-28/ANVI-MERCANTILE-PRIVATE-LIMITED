import HalftoneWordmarkFooter, { type FooterColumn } from '@/components/ui/halftone-wordmark-footer';
import { siteConfig } from '@/data/siteConfig';

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Solutions",
    links: [
      { label: "Sea Freight Forwarding", href: "/services" },
      { label: "Air Cargo Logistics", href: "/services" },
      { label: "Customs Clearance", href: "/services" },
      { label: "Reefer Cold Chain", href: "/services" },
      { label: "Produce Calendar", href: "/trade" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us & IEC", href: "/about" },
      { label: "Trade Routes", href: "/trade" },
      { label: "Track Shipment", href: "/track" },
      { label: "Instant Quote", href: "/quote" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "Inquiries & WhatsApp",
    links: [
      { 
        label: `WhatsApp: ${siteConfig.contact.whatsappDisplay}`, 
        href: `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent("Hello Anvi Mercantile, I have an export/logistics inquiry.")}` 
      },
      { label: `Call: ${siteConfig.contact.phone}`, href: `tel:${siteConfig.contact.phone.replace(/\s+/g, '')}` },
      { label: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
      { label: "Trade Centre, BKC, Mumbai", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <HalftoneWordmarkFooter
      wordmark="ANVI GROUPS"
      label="ANVI MERCANTILE PVT. LTD. · BY ANVI GROUPS"
      meta="© 2026 ANVI GROUPS · GLOBAL TRADE & LOGISTICS"
      columns={FOOTER_COLUMNS}
      backToTop={true}
      preset="night"
      palette={{
        background: "#05080e",
        ink: "#e2e8f0",
        warm: "#ff5a1f",
      }}
      crop={0.2}
      grain={0.4}
      height="540px"
      dotGap={6}
      radius={90}
    />
  );
}

export default Footer;
