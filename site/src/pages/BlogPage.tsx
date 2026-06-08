import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Twitter, Send, MoreHorizontal } from 'lucide-react';
import AdBannerSticky from '../components/AdBannerSticky';
import AdBanner from '../components/AdBanner';
import Header from '../components/Header';

export const blogPosts = [
  { id: 'top-5-faucets', date: 'June 07, 2026', category: 'Faucets', title: 'Top 5 High-Paying Faucets to Watch This Month', excerpt: 'Discover which platforms are offering the best rewards and bonuses for active users in June.', content: 'Detailed content about top faucets...' },
  { id: 'maximize-mining', date: 'June 05, 2026', category: 'Mining', title: 'How to Maximize Your Passive Income with Cloud Mining', excerpt: 'A comprehensive guide on setting up your first passive crypto stream with zero upfront costs.', content: 'Detailed content about mining...' },
  { id: 'micro-wallets', date: 'June 03, 2026', category: 'Faucets', title: 'The Rise of Micro-Wallets: Why FaucetPay is Essential', excerpt: 'Learn why micro-wallets are the backbone of the faucet industry and how to use them safely.', content: 'Detailed content about micro-wallets...' },
  { id: 'bitcoin-trends', date: 'June 01, 2026', category: 'Market', title: 'Bitcoin Price Trends and Their Impact on Faucet Payouts', excerpt: 'Understanding the relationship between market volatility and the amount of satoshis you can claim.', content: 'Detailed content about bitcoin trends...' },
  { id: 'new-ptc-sites', date: 'May 28, 2026', category: 'Passive', title: 'New PTC Sites: Are They Worth Your Time?', excerpt: 'We review the latest Paid-To-Click platforms to see which ones are legitimate and which to avoid.', content: 'Detailed content about PTC sites...' },
  { id: 'security-tips', date: 'May 25, 2026', category: 'Security', title: 'Security Tips: How to Protect Your Crypto Earnings', excerpt: 'Essential practices to keep your micro-wallet and personal wallet safe from common online threats.', content: 'Detailed content about security tips...' },
  { id: 'future-of-crypto', date: 'May 22, 2026', category: 'Market', title: 'The Future of Free Crypto: What to Expect in Late 2026', excerpt: 'An analysis of where the free cryptocurrency ecosystem is heading and how to stay ahead.', content: 'Detailed content about future of crypto...' },
  { id: 'referral-programs', date: 'May 19, 2026', category: 'Passive', title: 'Referral Programs: Turning Your Claims into a Network', excerpt: 'Strategies for building a robust referral network to multiply your daily crypto earnings.', content: 'Detailed content about referral programs...' },
  { id: 'captcha-solving', date: 'May 16, 2026', category: 'Security', title: 'Best Practices for Fast Captcha Solving', excerpt: 'Tips and tools to help you navigate faucet security checks more efficiently and save time.', content: 'Detailed content about captcha solving...' },
  { id: 'eth-vs-sol', date: 'May 13, 2026', category: 'Faucets', title: 'Comparing Ethereum and Solana Faucets: Which is Better?', excerpt: 'A detailed comparison of rewards and network fees for the two most popular altcoin faucets.', content: 'Detailed content about eth vs sol...' },
  { id: 'sustainable-mining', date: 'May 10, 2026', category: 'Mining', title: 'Sustainable Mining: Green Energy Platforms in 2026', excerpt: 'Exploring eco-friendly cloud mining options that don\'t compromise on rewards.', content: 'Detailed content about sustainable mining...' },
  { id: 'avoiding-scams', date: 'May 07, 2026', category: 'Security', title: 'Avoiding Phishing Scams in the Faucet Industry', excerpt: 'How to identify and stay away from fake earning sites that try to steal your credentials.', content: 'Detailed content about avoiding scams...' },
  { id: 'stablecoins-vs-volatile', date: 'May 04, 2026', category: 'Market', title: 'Stablecoins vs Volatile Assets: Where to Store Claims?', excerpt: 'Deciding whether to keep your earnings in BTC or swap them for stable assets during market dips.', content: 'Detailed content about stablecoins...' },
  { id: 'faucet-aggregators', date: 'May 01, 2026', category: 'Faucets', title: 'Faucet Aggregators: Saving Time on Your Daily Routine', excerpt: 'Using aggregator tools to manage multiple faucet claims from a single dashboard.', content: 'Detailed content about aggregators...' },
  { id: 'bandwidth-sharing', date: 'April 28, 2026', category: 'Passive', title: 'Sharing Your Bandwidth for Crypto: Is It Safe?', excerpt: 'A deep dive into bandwidth-sharing apps that pay you in crypto for your unused internet.', content: 'Detailed content about bandwidth sharing...' },
  { id: 'mobile-mining-apps', date: 'April 25, 2026', category: 'Mining', title: 'Mobile Mining Apps: Legit vs Scam Review', excerpt: 'We test the most popular mobile apps that claim to mine crypto without draining your battery.', content: 'Detailed content about mobile mining...' },
  { id: 'two-factor-auth', date: 'April 22, 2026', category: 'Security', title: 'Two-Factor Authentication: Why You Need It Everywhere', excerpt: 'Setting up 2FA on all your earning platforms to ensure your funds are always protected.', content: 'Detailed content about 2FA...' },
  { id: 'halving-impact', date: 'April 19, 2026', category: 'Market', title: 'The Impact of Halving on Micro-Earnings', excerpt: 'Analyzing how historical halving events have shaped the reward structures of modern faucets.', content: 'Detailed content about halving impact...' },
  { id: 'loyalty-bonuses', date: 'April 16, 2026', category: 'Faucets', title: 'Loyalty Bonuses: The Key to Long-Term Earning', excerpt: 'How staying consistent with one platform can lead to significant reward multipliers.', content: 'Detailed content about loyalty bonuses...' },
  { id: 'staking-earnings', date: 'April 13, 2026', category: 'Passive', title: 'Staking Your Faucet Earnings for Compound Growth', excerpt: 'Learn how to move your micro-earnings into staking pools for long-term wealth building.', content: 'Detailed content about staking...' }
];

export default function BlogPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Faucets', 'Mining', 'Passive', 'Security', 'Market'];

  const filteredPosts = useMemo(() => blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }), [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8fafc]">
      <AdBannerSticky />
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="w-full md:w-80 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
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
                    ? 'bg-[#2e1065] text-white' 
                    : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full overflow-hidden">
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-purple-500 uppercase tracking-wider">{post.date}</span>
                  <span className="bg-purple-50 text-purple-600 text-[10px] font-black px-2 py-1 rounded uppercase">{post.category}</span>
                </div>
                <h2 
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="text-lg font-bold text-gray-900 mb-4 hover:text-purple-600 cursor-pointer transition-colors leading-tight"
                >
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                  <button onClick={() => navigate(`/blog/${post.id}`)} className="text-sm font-bold text-gray-900 hover:text-purple-600 transition-colors flex items-center gap-1">
                    Read More <ArrowLeft className="w-3 h-3 rotate-180" />
                  </button>
                  <div className="flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-gray-400 hover:text-black cursor-pointer" />
                    <Send className="w-4 h-4 text-gray-400 hover:text-blue-500 cursor-pointer" />
                    <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-purple-600 cursor-pointer" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="bg-[#1f0b45] text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">&copy; 2026 Earn and Claim Coins Free. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
