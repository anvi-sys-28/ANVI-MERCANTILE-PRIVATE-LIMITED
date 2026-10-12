import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/data/siteConfig';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
}

export function SEO({
  title,
  description = siteConfig.subTagline,
  canonical,
  ogImage = 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
  ogType = 'website',
}: SEOProps) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | ${siteConfig.tagline}`;
  const url = canonical ? canonical : typeof window !== 'undefined' ? window.location.href : 'https://anvimercantile.com';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="icon" type="image/png" href="/a.png" />
      <link rel="apple-touch-icon" href="/a.png" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteConfig.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="canonical" href={url} />
    </Helmet>
  );
}
