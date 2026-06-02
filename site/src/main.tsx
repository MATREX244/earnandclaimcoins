import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import CategoryPage from './pages/CategoryPage.tsx';
import RedirectPage from './pages/RedirectPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import PrivacyPage from './pages/PrivacyPage.tsx';
import TermsPage from './pages/TermsPage.tsx';
import PoliticsPage from './pages/PoliticsPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/faucet" element={<CategoryPage category="FAUCET" />} />
        <Route path="/freemining" element={<CategoryPage category="MINING" />} />
        <Route path="/ptc" element={<CategoryPage category="PTC" />} />
        <Route path="/passive" element={<CategoryPage category="PASSIVE" />} />
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
