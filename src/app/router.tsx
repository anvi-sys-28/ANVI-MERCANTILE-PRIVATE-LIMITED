import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/app/Layout';

// Immediate static import for HomePage to ensure zero-delay first paint
import HomePage from '@/pages/HomePage';

// Code-split secondary routes to shrink initial bundle and accelerate first-time visitor load
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'));
const TradePage = lazy(() => import('@/pages/TradePage'));
const ProductsPage = lazy(() => import('@/pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const TrackPage = lazy(() => import('@/pages/TrackPage'));
const QuotePage = lazy(() => import('@/pages/QuotePage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const InsightsPage = lazy(() => import('@/pages/InsightsPage'));
const InsightDetailPage = lazy(() => import('@/pages/InsightDetailPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const TermsPage = lazy(() => import('@/pages/TermsPage'));
const AdminDashboardPage = lazy(() => import('@/pages/AdminDashboardPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'services',
        element: withSuspense(ServicesPage),
      },
      {
        path: 'services/:slug',
        element: withSuspense(ServiceDetailPage),
      },
      {
        path: 'trade',
        element: withSuspense(TradePage),
      },
      {
        path: 'trade/:slug',
        element: withSuspense(ProductDetailPage),
      },
      {
        path: 'products',
        element: withSuspense(ProductsPage),
      },
      {
        path: 'products/:slug',
        element: withSuspense(ProductDetailPage),
      },
      {
        path: 'about',
        element: withSuspense(AboutPage),
      },
      {
        path: 'track',
        element: withSuspense(TrackPage),
      },
      {
        path: 'quote',
        element: withSuspense(QuotePage),
      },
      {
        path: 'contact',
        element: withSuspense(ContactPage),
      },
      {
        path: 'insights',
        element: withSuspense(InsightsPage),
      },
      {
        path: 'insights/:slug',
        element: withSuspense(InsightDetailPage),
      },
      {
        path: 'privacy',
        element: withSuspense(PrivacyPage),
      },
      {
        path: 'terms',
        element: withSuspense(TermsPage),
      },
      {
        path: 'admin',
        element: withSuspense(AdminDashboardPage),
      },
      {
        path: '*',
        element: withSuspense(NotFoundPage),
      },
    ],
  },
]);
