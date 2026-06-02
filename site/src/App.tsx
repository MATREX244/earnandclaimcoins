import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, X, ChevronUp, Droplet, Star, List, Settings, Gift as GiftIcon, ShieldCheck, Zap, Activity, Coins, Home } from 'lucide-react';
import { SiteData, sites, Category } from './data';
import { SiteCard } from './components/SiteCard';
import AdBanner from './components/AdBanner';
import AdBannerSticky from './components/AdBannerSticky';

// Animated Counter — easeOutExpo, no layout thrash
const AnimatedCounter = ({ endValue, duration, decimals = 0 }: { endValue: number; duration: number; decimals?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(endValue * easeProgress);
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration]);

  return <>{count.toFixed(decimals)}</>;
};

const cryptoSymbols = ['btc', 'eth', 'doge', 'trx', 'sol', 'bnb', 'xrp', 'ton', 'shib'];

// Route map for category → path
const categoryRoutes: Record<string, string> = {
  ALL: '/',
  FAUCET: '/faucet',
  PTC: '/ptc',
  MINING: '/freemining',
  PASSIVE: '/passive',
};

export default function App() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cryptoIndex, setCryptoIndex] = useState(0);
  const [cryptoIndex2, setCryptoIndex2] = useState(2);

  useEffect(() => {
    // Load favorites from localStorage safely (JSON parse wrapped)
    try {
      const saved = localStorage.getItem('cfh_favorites');
      if (saved) setFavorites(new Set(JSON.parse(saved)));
    } catch {
      // Ignore parse errors — treat as empty
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const updateEarnIcon = () => {
      setCryptoIndex((prev) => (prev + 1) % cryptoSymbols.length);
      timeoutId = setTimeout(updateEarnIcon, Math.random() * 1000 + 4000);
    };
    timeoutId = setTimeout(updateEarnIcon, Math.random() * 1000 + 4000);
    const interval18 = setInterval(() => {
      setCryptoIndex2((prev) => (prev + 1) % cryptoSymbols.length);
    }, 3000);
    return () => { clearTimeout(timeoutId); clearInterval(interval18); };
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      try { localStorage.setItem('cfh_favorites', JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });
  };

  const filteredSites = useMemo(() => sites.filter((site) => {
    const matchesCategory = activeCategory === 'ALL' || site.type === activeCategory;
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [activeCategory, searchQuery]);

  const categories: { id: Category; label: string }[] = useMemo(() => [
    { id: 'ALL', label: 'All Sites' },
    { id: 'FAUCET', label: 'Faucets' },
    { id: 'PTC', label: 'PTC Sites' },
    { id: 'MINING', label: 'Free Mining' },
    { id: 'PASSIVE', label: 'Passive Income' },
  ], []);

  const popularSites = useMemo(() => sites.filter((s) => s.featured).slice(0, 3), []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: sites.map((site, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: { '@type': 'WebSite', name: site.name, url: site.url },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Free Crypto Faucets 2026',
    description: 'Discover the best high-paying crypto faucets, PTC sites, and free mining platforms in 2026.',
    author: { '@type': 'Organization', name: 'Earn and Claim Coins Free' },
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8fafc]">
      <AdBannerSticky />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Navbar */}
      <header aria-label="Main Navigation" className={`sticky top-0 z-50 transition-all duration-300 bg-[#2e1065] text-white ${isScrolled ? 'shadow-xl shadow-purple-900/10 py-3' : 'py-3.5'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2.5 group" aria-label="Home — Earn and Claim Coins Free">
            <img src="/assets/icon.webp" alt="Earn and Claim Coins Free logo" className="w-8 h-8 object-contain" />
            <span className="text-[17px] font-medium tracking-wide">Earn and Claim Coins Free</span>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-[14.5px] text-gray-300 font-medium tracking-wide" aria-label="Category navigation">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href="#"
                onClick={(e) => { e.preventDefault(); navigate(categoryRoutes[cat.id] ?? '/'); window.scrollTo({ top: 0 }); }}
                className={`flex items-center gap-1.5 transition-colors ${activeCategory === cat.id ? 'text-white' : 'hover:text-white'}`}
                aria-current={activeCategory === cat.id ? 'page' : undefined}
              >
                {cat.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 w-full z-40 bg-[#2e1065] border-t border-purple-800/50 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(0,0,0,0.2)]" aria-label="Mobile navigation">
        <div className="flex justify-around items-center h-[68px]">
          {[
            { id: 'ALL' as Category, icon: <Home className="w-5 h-5" />, label: 'Home' },
            { id: 'FAUCET' as Category, icon: <Droplet className="w-5 h-5" />, label: 'Faucets' },
            { id: 'PTC' as Category, icon: <List className="w-5 h-5" />, label: 'PTC' },
            { id: 'MINING' as Category, icon: <Activity className="w-5 h-5" />, label: 'Mining' },
          ].map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => { navigate(categoryRoutes[id] ?? '/'); setMobileMenuOpen(false); window.scrollTo({ top: 0 }); }}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-colors ${activeCategory === id && !mobileMenuOpen ? 'text-white' : 'text-purple-300 hover:text-purple-100'}`}
              aria-label={label}
              aria-pressed={activeCategory === id && !mobileMenuOpen}
            >
              {icon}
              <span className="text-[10px] font-bold tracking-wide">{label}</span>
            </button>
          ))}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-colors ${mobileMenuOpen ? 'text-white' : 'text-purple-300 hover:text-purple-100'}`}
            aria-label="More categories"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="text-[10px] font-bold tracking-wide">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/40 backdrop-blur-sm lg:hidden pointer-events-auto"
          onClick={() => setMobileMenuOpen(false)}
          role="presentation"
        >
          <div
            className="absolute bottom-[68px] left-0 right-0 bg-white rounded-t-3xl shadow-[0_-20px_40px_rgba(0,0,0,0.1)] p-6 animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">More Categories</h3>
            <button
              onClick={() => { navigate('/passive'); setMobileMenuOpen(false); window.scrollTo({ top: 0 }); }}
              className={`flex items-center gap-3 p-4 rounded-2xl w-full ${activeCategory === 'PASSIVE' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50 text-gray-700'}`}
            >
              <GiftIcon className="w-5 h-5" />
              <span className="text-[15px] font-medium">Passive Income</span>
            </button>
          </div>
        </div>
      )}

      <main aria-label="Main Content" className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-24">
        {activeCategory === 'ALL' && (
          <section aria-label="Hero" className="pt-16 pb-16 lg:pt-24 lg:pb-24 relative border-b border-gray-100/60 mb-12 flex flex-col items-center justify-center min-h-[400px] xl:min-h-[500px] w-full">
            {/* Left year indicator */}
            <div className="hidden xl:flex w-full xl:w-[120px] xl:absolute xl:-left-8 2xl:-left-16 xl:top-1/2 xl:-translate-y-1/2 shrink-0 mt-12 xl:mt-0 z-20 justify-center">
              <div className="flex flex-col items-center">
                <div className="h-[40px] flex items-center justify-center mb-1">
                  <span className="text-4xl font-heading font-bold text-gray-900">2026</span>
                </div>
                <div className="flex items-center gap-2 mt-2 mb-4">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Updated</span>
                </div>
                <div className="flex items-center justify-center -space-x-2">
                  {['btc', 'eth', 'doge', 'trx'].map((coin, i) => (
                    <div key={coin} className="w-7 h-7 rounded-full bg-white flex items-center justify-center p-1 shadow-sm ring-2 ring-white" style={{ zIndex: 10 - i }}>
                      <img src={`https://assets.coincap.io/assets/icons/${coin}@2x.png`} alt={coin.toUpperCase()} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero text */}
            <div className="flex flex-col justify-center items-center text-center w-full max-w-5xl px-4 z-10 mx-auto">
              <div className="xl:hidden inline-block text-purple-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 opacity-70">
                Updated for 2026
              </div>
              <h1 className="font-heading font-bold tracking-tight mb-8 leading-[1.1]">
                <span className="block text-[32px] sm:text-4xl md:text-5xl lg:text-[56px] xl:text-6xl 2xl:text-7xl text-gray-900 mb-4 px-4 xl:px-8">
                  Best Free Crypto Faucets 2026
                </span>
                <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-3xl md:text-3xl lg:text-4xl xl:text-[46px] 2xl:text-[52px] font-medium mt-2 text-purple-500">
                  Earn
                  <span className="inline-flex items-center justify-center min-w-[2.5em] min-h-[1em] mx-1">
                    <img
                      src={`https://assets.coincap.io/assets/icons/${cryptoSymbols[cryptoIndex]}@2x.png`}
                      className="w-[1.2em] h-[1.2em] object-contain animate-in fade-in zoom-in duration-500"
                      alt={cryptoSymbols[cryptoIndex].toUpperCase()}
                      key={cryptoSymbols[cryptoIndex]}
                    />
                  </span>
                  & More
                </span>
              </h1>
              {/* Ad Banner below title */}
              <AdBanner />
            </div>

            {/* Right stats */}
            <div className="w-full xl:w-[120px] xl:absolute xl:-right-8 2xl:-right-16 xl:top-1/2 xl:-translate-y-1/2 shrink-0 mt-8 xl:mt-0 z-20 mx-auto xl:mx-0">
              <div className="flex flex-row flex-wrap xl:flex-col justify-center gap-6 sm:gap-10 xl:gap-10 w-full px-4">
                <div className="flex flex-col items-center">
                  <div className="h-[32px] xl:h-[40px] flex items-center justify-center">
                    <span className="text-3xl xl:text-4xl font-heading font-bold text-gray-900">
                      <AnimatedCounter endValue={2.4} duration={4000} decimals={1} />M+
                    </span>
                  </div>
                  <span className="text-[10px] xl:text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1 xl:mt-2">Active Users</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-[32px] xl:h-[40px] flex items-center justify-center">
                    <span className="text-3xl xl:text-4xl font-heading font-bold text-purple-500">100%</span>
                  </div>
                  <span className="text-[10px] xl:text-[11px] font-bold text-purple-500 uppercase tracking-widest mt-1 xl:mt-2">Free to Join</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 xl:gap-3 h-[32px] xl:h-[40px] justify-center">
                    <span className="text-3xl xl:text-4xl font-heading font-bold text-gray-900">18+</span>
                    <div className="w-7 h-7 xl:w-9 xl:h-9 rounded-full bg-emerald-50/80 flex items-center justify-center p-1 xl:p-1.5 ring-[2px] xl:ring-[3px] ring-emerald-50/50">
                      <img
                        src={`https://assets.coincap.io/assets/icons/${cryptoSymbols[cryptoIndex2]}@2x.png`}
                        alt={`${cryptoSymbols[cryptoIndex2]} icon`}
                        className="w-full h-full object-contain animate-in fade-in zoom-in duration-500"
                        key={cryptoSymbols[cryptoIndex2]}
                      />
                    </div>
                  </div>
                  <span className="text-[10px] xl:text-[11px] font-bold text-emerald-500 uppercase tracking-widest mt-1 xl:mt-2">Cryptos</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Category filter bar */}
        <div className={`mb-12 ${activeCategory !== 'ALL' ? 'pt-12' : ''}`}>
          {activeCategory !== 'ALL' && (
            <div className="mb-10 px-2 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900">
                {categories.find((c) => c.id === activeCategory)?.label}
              </h1>
            </div>
          )}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 px-2">
            {/* Search + inline ad side by side */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <div className="w-full sm:w-[400px] relative group shrink-0">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" aria-hidden="true" />
                </div>
                <input
                  type="search"
                  placeholder="Search sites..."
                  className="block w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-[14px] text-base text-gray-900 focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all outline-none shadow-sm font-medium placeholder:font-normal"
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

            <section aria-label="Category Filters" className="flex flex-wrap justify-center lg:justify-end gap-3 w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { navigate(categoryRoutes[cat.id] ?? '/'); window.scrollTo({ top: 0 }); }}
                  className={`px-6 py-2.5 rounded-[12px] text-[14px] font-bold transition-all duration-300 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#2e1065] text-white shadow-lg shadow-purple-900/20 transform scale-[1.02]'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 shadow-sm'
                  }`}
                  aria-pressed={activeCategory === cat.id}
                >
                  {cat.label}
                </button>
              ))}
            </section>
          </div>
        </div>

        {/* Listings */}
        <section id="directory" aria-label="Directory Listings">
          {(['FAUCET', 'PTC', 'MINING', 'PASSIVE'] as const).map((catId) => {
            if (activeCategory !== 'ALL' && activeCategory !== catId) return null;
            const sectionSites = filteredSites.filter((s) => s.type === catId);
            if (sectionSites.length === 0) return null;

            const titleMap: Record<string, string> = {
              FAUCET: 'High Paying Faucets',
              PTC: 'PTC (Paid to Click)',
              MINING: 'Free Cloud Mining',
              PASSIVE: 'Passive Income',
            };

            return (
              <div key={catId} className="mb-20">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900">{titleMap[catId]}</h2>
                  <span className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-[10px] shadow-sm">
                    {sectionSites.length} Sites
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {sectionSites.map((site) => (
                    <SiteCard key={site.id} site={site} isFavorite={favorites.has(site.id)} onToggleFavorite={toggleFavorite} />
                  ))}
                  {/* Card-sized ad banner at the end of each section grid */}
                  <AdBanner variant="card" />
                </div>
              </div>
            );
          })}

          {filteredSites.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[24px] border border-gray-100 shadow-sm mt-8">
              <p className="text-xl text-gray-500 font-medium">No sites found matching your search.</p>
              <button
                onClick={() => { setSearchQuery(''); navigate('/'); }}
                className="mt-4 text-purple-600 font-bold hover:text-purple-700 underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {activeCategory === 'ALL' && (
          <>
            {/* Why Trust Us */}
            <section id="why-trust-us" aria-label="Why Trust Us" className="mb-24 mt-4 bg-white rounded-[32px] p-8 md:p-14 border border-gray-100 shadow-sm">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">Why Trust Us</h2>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">We filter out the noise and scams so you only interact with legitimate platforms.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                {[
                  { icon: <ShieldCheck className="w-6 h-6" />, color: 'bg-amber-100 text-amber-600', title: 'Verified Payouts', desc: 'Every site listed here has been actively tested to ensure they actually process withdrawals reliably.' },
                  { icon: <Activity className="w-6 h-6" />, color: 'bg-emerald-100 text-emerald-600', title: 'Regular Updates', desc: 'We constantly monitor the status of these platforms and remove scams or defunct sites immediately.' },
                  { icon: <Zap className="w-6 h-6" />, color: 'bg-blue-100 text-blue-600', title: 'High Earnings', desc: 'We prioritize faucets and PTC sites with the highest return on your invested time.' },
                  { icon: <ShieldCheck className="w-6 h-6" />, color: 'bg-purple-100 text-purple-600', title: 'Safe & Secure', desc: 'We only list sites that respect user security and don\'t require intrusive personal information.' },
                ].map(({ icon, color, title, desc }) => (
                  <div key={title} className="flex gap-5 items-start bg-gray-50/50 p-6 rounded-[20px] border border-gray-100">
                    <div className={`${color} p-3.5 rounded-[14px] shrink-0`}>{icon}</div>
                    <div>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">{title}</h3>
                      <p className="text-gray-500 text-[14.5px] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" aria-label="How It Works" className="mb-24 scroll-mt-24">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">How It Works</h2>
                <p className="text-gray-500 text-lg">Start earning in three ridiculously simple steps.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
                {[
                  { n: 1, title: 'Sign Up', desc: 'Create a free account on trusted platforms or set up a micro-wallet like FaucetPay to receive funds.' },
                  { n: 2, title: 'Claim & Earn', desc: 'Click claim buttons, view ads via PTC, or leave your computer running to generate passive yields.' },
                  { n: 3, title: 'Withdraw', desc: 'Transfer your earnings instantly to your personal crypto wallet once you hit the minimum.' },
                ].map(({ n, title, desc }) => (
                  <div key={n} className="bg-white p-10 rounded-[24px] border border-gray-100 shadow-sm relative pt-14 hover:-translate-y-1 transition-transform">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#2e1065] border-4 border-[#f8fafc] rounded-[16px] shadow-sm flex items-center justify-center font-bold text-white font-heading text-xl" aria-hidden="true">{n}</div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{title}</h3>
                    <p className="text-gray-500 text-[14.5px] leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Most Popular */}
            <section aria-label="Most Popular Sites" className="mb-24 bg-gradient-to-br from-purple-50 to-[rgba(243,232,255,0.5)] rounded-[32px] p-8 md:p-14 border border-purple-100">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Most Popular Right Now</h2>
                <p className="text-gray-600 max-w-2xl mx-auto font-medium">The community's top picks for fast and reliable earnings this month.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {popularSites.map((site) => (
                  <SiteCard key={`pop-${site.id}`} site={site} isFavorite={favorites.has(site.id)} onToggleFavorite={toggleFavorite} />
                ))}
              </div>
              {/* Ad Banner below popular sites */}
              <AdBanner />
            </section>

            {/* FAQ */}
            <section id="faq" aria-label="Frequently Asked Questions" className="max-w-3xl mx-auto scroll-mt-24 mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {faqData.map((faq, i) => (
                  <details key={i} className="group bg-white border border-gray-100 rounded-[20px] p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900 list-none">
                      <span className="pr-6">{faq.q}</span>
                      <span className="transition duration-300 group-open:rotate-180 bg-gray-50 p-2 rounded-full shrink-0">
                        <ChevronUp className="w-5 h-5 text-gray-500" aria-hidden="true" />
                      </span>
                    </summary>
                    <div className="pt-4 mt-2 border-t border-gray-50">
                      <p className="text-gray-500 leading-relaxed font-medium">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
            {/* Ad Banner at the end of the main content */}
            <AdBanner />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#1f0b45] text-white py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-12 pb-12 border-b border-purple-400/20">
            <div className="max-w-sm">
              <a href="#" className="flex items-center gap-2.5 mb-4" aria-label="Home — Earn and Claim Coins Free">
                <img src="/assets/icon.webp" alt="Logo" className="w-7 h-7 object-contain" />
                <span className="font-heading font-bold text-xl tracking-tight">Earn and Claim Coins Free</span>
              </a>
              <p className="text-gray-400 text-sm leading-relaxed">Connecting you with the most reliable, tested, and highest paying crypto faucets safely across the web.</p>
            </div>
<nav className="flex flex-wrap gap-x-8 gap-y-4 text-[14px] text-gray-300 font-medium" aria-label="Footer navigation">
                <button onClick={() => { navigate('/'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Home</button>
                <button onClick={() => { navigate('/faucet'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Faucets</button>
                <button onClick={() => { navigate('/ptc'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">PTC Sites</button>
                <button onClick={() => { navigate('/freemining'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Mining</button>
                <button onClick={() => { navigate('/about'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">About</button>
                <button onClick={() => { navigate('/privacy'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Privacy Policy</button>
                <button onClick={() => { navigate('/terms'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Terms</button>
                <button onClick={() => { navigate('/politics'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Politics</button>
              </nav>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-gray-500">
            <p>Copyright &copy; 2026 Earn and Claim Coins Free. All rights reserved.</p>
            <p className="text-center md:text-right max-w-xl">
              <strong>Disclaimer:</strong> We may earn affiliate commissions from links on this page.<br className="hidden md:block" />
              Always verify sites and do your own research before investing your personal time or funds.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 lg:bottom-8 right-6 p-3.5 bg-[#2e1065] text-white rounded-full shadow-[0_4px_24px_rgba(46,16,101,0.25)] transition-all duration-300 z-50 hover:bg-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-200 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  );
}

const faqData = [
  {
    q: 'What is a crypto faucet?',
    a: 'A crypto faucet is a website or application that rewards users with small amounts of cryptocurrency for completing simple tasks, like solving captchas, playing small games, viewing advertisements, or simply clicking a claim button on a recurring timer.',
  },
  {
    q: 'How much can I earn from faucets?',
    a: 'Earnings generally vary by website and current market prices. While individual claims are relatively small (fractions of a cent), consistent usage across multiple tabs, utilizing PTC (Paid to Click) sections, and participating in referral programs can accumulate into meaningful amounts over time.',
  },
  {
    q: 'Which faucet pays the most?',
    a: "Payouts fluctuate heavily based on the current market price of the coin. Historically, established sites like FreeBitco.in have maintained reliable payouts and attractive bonuses. Our 'Featured' tags highlight the currently most reliable and rewarding platforms.",
  },
  {
    q: 'Is FaucetPay safe?',
    a: 'Yes, FaucetPay is heavily considered the industry standard micro-wallet designed specifically to collect tiny payments from thousands of faucets with zero or minimal transaction fees. It acts as a secure intermediary layer before you withdraw the bulk sum to your personal hardware or software wallet.',
  },
  {
    q: 'How do I withdraw my earnings?',
    a: "Once your balance reaches a platform's specified minimum withdrawal threshold, you can request a standard transfer. Most sites allow withdrawals either to a micro-wallet (like FaucetPay) or directly to your personal crypto wallet address depending on the site's rules.",
  },
];
