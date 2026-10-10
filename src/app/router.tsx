import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/app/Layout';

// Direct static imports to eliminate any loading screens or chunk fetch delays
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import TradePage from '@/pages/TradePage';
import AboutPage from '@/pages/AboutPage';
import TrackPage from '@/pages/TrackPage';
import QuotePage from '@/pages/QuotePage';
import ContactPage from '@/pages/ContactPage';
import InsightsPage from '@/pages/InsightsPage';
import InsightDetailPage from '@/pages/InsightDetailPage';
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';
import NotFoundPage from '@/pages/NotFoundPage';

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
        element: <ServicesPage />,
      },
      {
        path: 'services/:slug',
        element: <ServiceDetailPage />,
      },
      {
        path: 'trade',
        element: <TradePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'track',
        element: <TrackPage />,
      },
      {
        path: 'quote',
        element: <QuotePage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'insights',
        element: <InsightsPage />,
      },
      {
        path: 'insights/:slug',
        element: <InsightDetailPage />,
      },
      {
        path: 'privacy',
        element: <PrivacyPage />,
      },
      {
        path: 'terms',
        element: <TermsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
