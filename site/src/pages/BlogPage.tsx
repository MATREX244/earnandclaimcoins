import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Home, ArrowLeft, Share2, Twitter, Send, MoreHorizontal, Star } from 'lucide-react';
import AdBannerSticky from '../components/AdBannerSticky';
import AdBanner from '../components/AdBanner';

export default function BlogPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Faucets', 'Mining', 'Passive', 'Security', 'Market'];

  const posts = [
    { date: 'June 07, 2026', category: 'Faucets', title: 'Top 5 High-Paying Faucets to Watch This Month', excerpt: 'Discover which platforms are offering the best rewards and bonuses for active users in June.' },
    { date: 'June 05, 2026', category: 'Mining', title: 'How to Maximize Your Passive Income with Cloud Mining', excerpt: 'A comprehensive guide on setting up your first passive crypto stream with zero upfront costs.' },
    { date: 'June 03, 2026', category: 'Faucets', title: 'The Rise of Micro-Wallets: Why FaucetPay is Essential', excerpt: 'Learn why micro-wallets are the backbone of the faucet industry and how to use them safely.' },
    { date: 'June 01, 2026', category: 'Market', title: 'Bitcoin Price Trends and Their Impact on Faucet Payouts', excerpt: 'Understanding the relationship between market volatility and the amount of satoshis you can claim.' },
    { date: 'May 28, 2026', category: 'Passive', title: 'New PTC Sites: Are They Worth Your Time?', excerpt: 'We review the latest Paid-To-Click platforms to see which ones are legitimate and which to avoid.' },
    { date: 'May 25, 2026', category: 'Security', title: 'Security Tips: How to Protect Your Crypto Earnings', excerpt: 'Essential practices to keep your micro-wallet and personal wallet safe from common online threats.' },
    { date: 'May 22, 2026', category: 'Market', title: 'The Future of Free Crypto: What to Expect in Late 2026', excerpt: 'An analysis of where the free cryptocurrency ecosystem is heading and how to stay ahead.' },
    { date: 'May 19, 2026', category: 'Passive', title: 'Referral Programs: Turning Your Claims into a Network', excerpt: 'Strategies for building a robust referral network to multiply your daily crypto earnings.' },
    { date: 'May 16, 2026', category: 'Security', title: 'Best Practices for Fast Captcha Solving', excerpt: 'Tips and tools to help you navigate faucet security checks more efficiently and save time.' },
    { date: 'May 13, 2026', category: 'Faucets', title: 'Comparing Ethereum and Solana Faucets: Which is Better?', excerpt: 'A detailed comparison of rewards and network fees for the two most popular altcoin faucets.' },
    { date: 'May 10, 2026', category: 'Mining', title: 'Sustainable Mining: Green Energy Platforms in 2026', excerpt: 'Exploring eco-friendly cloud mining options that don\'t compromise on rewards.' },
    { date: 'May 07, 2026', category: 'Security', title: 'Avoiding Phishing Scams in the Faucet Industry', excerpt: 'How to identify and stay away from fake earning sites that try to steal your credentials.' },
    { date: 'May 04, 2026', category: 'Market', title: 'Stablecoins vs Volatile Assets: Where to Store Claims?', excerpt: 'Deciding whether to keep your earnings in BTC or swap them for stable assets during market dips.' },
    { date: 'May 01, 2026', category: 'Faucets', title: 'Faucet Aggregators: Saving Time on Your Daily Routine', excerpt: 'Using aggregator tools to manage multiple faucet claims from a single dashboard.' },
    { date: 'April 28, 2026', category: 'Passive', title: 'Sharing Your Bandwidth for Crypto: Is It Safe?', excerpt: 'A deep dive into bandwidth-sharing apps that pay you in crypto for your unused internet.' },
    { date: 'April 25, 2026', category: 'Mining', title: 'Mobile Mining Apps: Legit vs Scam Review', excerpt: 'We test the most popular mobile apps that claim to mine crypto without draining your battery.' },
    { date: 'April 22, 2026', category: 'Security', title: 'Two-Factor Authentication: Why You Need It Everywhere', excerpt: 'Setting up 2FA on all your earning platforms to ensure your funds are always protected.' },
    { date: 'April 19, 2026', category: 'Market', title: 'The Impact of Halving on Micro-Earnings', excerpt: 'Analyzing how historical halving events have shaped the reward structures of modern faucets.' },
    { date: 'April 16, 2026', category: 'Faucets', title: 'Loyalty Bonuses: The Key to Long-Term Earning', excerpt: 'How staying consistent with one platform can lead to significant reward multipliers.' },
    { date: 'April 13, 2026', category: 'Passive', title: 'Staking Your Faucet Earnings for Compound Growth', excerpt: 'Learn how to move your micro-earnings into staking pools for long-term wealth building.' }
  ];

  const filteredPosts = useMemo(() => posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }), [searchQuery, selectedCategory]);

  const recommendations = [
    { name: 'FaucetPay', desc: 'The #1 Micro-wallet for all your claims.' },
    { name: 'FreeBitco.in', desc: 'Oldest and most trusted BTC faucet.' },
    { name: 'Cointiply', desc: 'Highest paying multi-currency platform.' }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8fafc]">
      <AdBannerSticky />
      
      {/* Navbar - Matching Header Print */}
      <header className="sticky top-0 z-50 transition-all duration-300 bg-[#2e1065] text-white py-3.5 shadow-xl">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <button onClick={() => navigate('/')} className="flex items-center gap-2.5 group">
            <img src="/assets/icon.webp" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="text-[17px] font-medium tracking-wide">Earn and Claim Coins Free</span>
          </button>
          <nav className="hidden lg:flex items-center gap-8 text-[15px] text-gray-300 font-semibold tracking-wide">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors">All Sites</button>
            <button onClick={() => navigate('/faucet')} className="hover:text-white transition-colors">Faucets</button>
            <button onClick={() => navigate('/ptc')} className="hover:text-white transition-colors">PTC Sites</button>
            <button onClick={() => navigate('/freemining')} className="hover:text-white transition-colors">Free Mining</button>
            <button onClick={() => navigate('/passive')} className="hover:text-white transition-colors">Passive Income</button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full border border-purple-400/30 transition-all shadow-sm">
              Blog
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
              <div className="w-full md:w-80 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  placeholder="Search news..."
                  className="block w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all outline-none shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      selectedCategory === cat 
                        ? 'bg-[#2e1065] text-white shadow-md' 
                        : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post, idx) => (
                <article key={idx} className="bg-white rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col">
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold text-purple-500 uppercase tracking-wider">{post.date}</span>
                      <span className="bg-purple-50 text-purple-600 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-tight">{post.category}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                      <button className="text-sm font-bold text-gray-900 hover:text-purple-600 transition-colors flex items-center gap-1">
                        Read More <ArrowLeft className="w-3 h-3 rotate-180" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button title="Share on X" className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-100 transition-all">
                          <Twitter className="w-4 h-4" />
                        </button>
                        <button title="Share on Telegram" className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all">
                          <Send className="w-4 h-4" />
                        </button>
                        <button title="More Options" className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="sticky top-28 space-y-8">
              <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Recommended
                </h3>
                <div className="space-y-4">
                  {recommendations.map((rec, i) => (
                    <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-purple-200 transition-colors cursor-pointer group">
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{rec.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{rec.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-purple-600 rounded-[24px] p-8 text-white shadow-lg shadow-purple-900/20 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3">Want more coins?</h3>
                  <p className="text-purple-100 text-sm mb-6 leading-relaxed">Join our Telegram channel for exclusive high-paying faucets and alerts.</p>
                  <button className="w-full bg-white text-purple-600 font-bold py-3 rounded-xl hover:bg-purple-50 transition-colors">
                    Join Telegram
                  </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500 rounded-full opacity-20 blur-2xl"></div>
              </div>

              <AdBanner variant="inline" />
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1f0b45] text-white py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-2.5">
              <img src="/assets/icon.webp" alt="Logo" className="w-7 h-7 object-contain" />
              <span className="font-heading font-bold text-xl tracking-tight">Earn and Claim Coins Free</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-400">
              <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
              <button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors">Privacy</button>
              <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">Terms</button>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-purple-400/20 text-center text-gray-400 text-sm">
            &copy; 2026 Earn and Claim Coins Free. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
