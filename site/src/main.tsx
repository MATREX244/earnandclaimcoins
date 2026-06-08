import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import CategoryPage from './pages/CategoryPage';
import BlogPage from './pages/BlogPage';
import NewsPage from './pages/NewsPage';
import RedirectPage from './pages/RedirectPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import PoliticsPage from './pages/PoliticsPage';
import NotFoundPage from './pages/NotFoundPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/faucet" element={<CategoryPage category="FAUCET" />} />
        <Route path="/freemining" element={<CategoryPage category="MINING" />} />
        <Route path="/ptc" element={<CategoryPage category="PTC" />} />
        <Route path="/passive" element={<CategoryPage category="PASSIVE" />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:postId" element={<NewsPage />} />
        <Route path="/redirect/:siteId" element={<RedirectPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/politics" element={<PoliticsPage />} />
        {/* FIX: explicit /404 route so RedirectPage can navigate there for invalid IDs */}
        <Route path="/404" element={<NotFoundPage />} />
        {/* Catch-all wildcard */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
