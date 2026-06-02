import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Droplet, List, Activity, ChevronUp, Home, Gift as GiftIcon } from 'lucide-react';
import { sites, Category } from '../data';
import { SiteCard } from '../components/SiteCard';
import AdBanner from '../components/AdBanner';
import AdBannerSticky from '../components/AdBannerSticky';

interface CategoryPageProps {
  category: Exclude<Category, 'ALL'>;
}

const titleMap: Record<string, string> = {
  FAUCET: 'High Paying Faucets',
  PTC: 'PTC — Paid to Click',
  MINING: 'Free Cloud Mining',
  PASSIVE: 'Passive Income',
};

const descMap: Record<string, string> = {
  FAUCET: 'Earn free crypto every hour — the best paying faucets, verified and updated for 2026.',
  PTC: 'Get paid to view ads and complete simple tasks — top PTC sites with daily limits.',
  MINING: 'Mine crypto for free in the cloud — deploy virtual miners without any hardware.',
  PASSIVE: 'Earn while you sleep — share bandwidth or resources and get paid automatically.',
};

export default function CategoryPage({ category }: CategoryPageProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  // FIX: reset search when category prop changes (navigating between category pages)
  useEffect(() => { setSearchQuery(''); }, [category]);

  const categorySites = useMemo(
    () =>
      sites.filter(
        (s) =>
          s.type === category &&
          s.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [category, searchQuery]
  );

  const categories: { id: string; label: string; path: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { id: 'FAUCET', label: 'Faucets', path: '/faucet', icon: <Droplet className="w-4 h-4" /> },
    { id: 'PTC', label: 'PTC Sites', path: '/ptc', icon: <List className="w-4 h-4" /> },
    { id: 'MINING', label: 'Free Mining', path: '/freemining', icon: <Activity className="w-4 h-4" /> },
    { id: 'PASSIVE', label: 'Passive', path: '/passive', icon: <GiftIcon className="w-4 h-4" /> },
  ];

  // FIX: ChevronUp was used as the Passive icon — it made no sense visually; replaced with GiftIcon

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8fafc]">
      <AdBannerSticky />
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#2e1065] text-white py-3 shadow-xl">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            className="flex items-center gap-2.5"
            aria-label="Home — Earn and Claim Coins Free"
          >
            <img src="/assets/icon.webp" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="text-[17px] font-medium tracking-wide">Earn and Claim Coins Free</span>
          </a>
          <nav className="hidden lg:flex items-center gap-6 text-[14.5px] text-gray-300 font-medium" aria-label="Category navigation">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={cat.path}
                onClick={(e) => { e.preventDefault(); navigate(cat.path); window.scrollTo({ top: 0 }); }}
                className={`flex items-center gap-1.5 transition-colors ${
                  cat.id === category ? 'text-white' : 'hover:text-white'
                }`}
                aria-current={cat.id === category ? 'page' : undefined}
              >
                {cat.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 w-full z-40 bg-[#2e1065] border-t border-purple-800/50 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(0,0,0,0.2)]" aria-label="Mobile navigation">
        <div className="flex justify-around items-center h-[68px]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { navigate(cat.path); window.scrollTo({ top: 0 }); }}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-colors ${
                cat.id === category ? 'text-white' : 'text-purple-300 hover:text-purple-100'
              }`}
              aria-label={cat.label}
              aria-pressed={cat.id === category}
            >
              {cat.icon}
              <span className="text-[10px] font-bold tracking-wide">{cat.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-24">
        {/* Page header */}
        <div className="pt-12 pb-10 border-b border-gray-100 mb-10">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-3 tracking-tight">
            {titleMap[category]}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">{descMap[category]}</p>
        </div>

        {/* Search + inline ad + count */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-[380px] relative group shrink-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" aria-hidden="true" />
              </div>
              <input
                type="search"
                placeholder="Search sites..."
                className="block w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-[14px] text-base text-gray-900 focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all outline-none shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search sites"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            {/* Inline ad — ao lado da pesquisa em sm+, largura total abaixo em mobile */}
            <AdBanner variant="inline" className="w-full sm:w-auto" />
          </div>
          <span className="bg-white border border-gray-200 text-gray-600 text-sm font-bold px-4 py-2 rounded-[10px] shadow-sm shrink-0">
            {categorySites.length} sites
          </span>
        </div>

        {/* Site grid */}
        {categorySites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categorySites.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
            {/* Card-sized ad at end of grid */}
            <AdBanner variant="card" />
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[24px] border border-gray-100 shadow-sm">
            <p className="text-xl text-gray-500 font-medium">No sites found.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-purple-600 font-bold hover:text-purple-700 underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Horizontal banner at the bottom of the listing */}
        <AdBanner className="mt-8" />
      </main>

      {/* Footer */}
      <footer className="bg-[#1f0b45] text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8 pb-8 border-b border-purple-400/20">
            <div className="flex items-center gap-2.5">
              <img src="/assets/icon.webp" alt="Logo" className="w-6 h-6 object-contain" />
              <span className="font-bold text-lg">Earn and Claim Coins Free</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[13px] text-gray-300 font-medium" aria-label="Footer navigation">
              <button onClick={() => { navigate('/'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Home</button>
              <button onClick={() => { navigate('/about'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">About</button>
              <button onClick={() => { navigate('/privacy'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Privacy</button>
              <button onClick={() => { navigate('/terms'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Terms</button>
              <button onClick={() => { navigate('/politics'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Politics</button>
            </nav>
          </div>
          <div className="text-center text-[12px] text-gray-400">
            <p>Copyright &copy; 2026 Earn and Claim Coins Free. All rights reserved.</p>
            <p className="mt-2 opacity-60">Disclaimer: We may earn affiliate commissions from links on this page.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
