import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/data/siteConfig';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  schema?: object;
}

export function SEO({
  title,
  description = "By ANVI GROUPS — India's premier fresh fruits and agricultural commodities exporters. Farm-direct ruby pomegranates, sweet seedless grapes, pink guavas, onions & green chillies. Bulk export MOQ 10 MT.",
  keywords = "fresh fruits exporters, fresh fruits exporters in india, fresh produce exporters, bulk fruit export suppliers, pomegranate exporters india, fresh grapes export, vegetable exporters india, agricultural commodity export, anvi mercantile, anvi groups, global fruit suppliers, reefer fruit shipment",
  canonical,
  ogImage = 'https://www.anvimercantile.in/bs.png?v=20261014',
  ogType = 'website',
  schema,
}: SEOProps) {
  const fullTitle = title ? `${title} | By ANVI GROUPS` : "ANVI MERCANTILE PRIVATE LIMITED | By ANVI GROUPS";
  const url = canonical ? canonical : typeof window !== 'undefined' ? window.location.href : 'https://www.anvimercantile.in';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="icon" type="image/png" href="/bs.png?v=20261014" />
      <link rel="shortcut icon" href="/bs.png?v=20261014" />
      <link rel="apple-touch-icon" href="/bs.png?v=20261014" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="600" />
      <meta property="og:image:alt" content="ANVI MERCANTILE PRIVATE LIMITED - By ANVI GROUPS" />
      <meta property="og:site_name" content={siteConfig.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="canonical" href={url} />
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
